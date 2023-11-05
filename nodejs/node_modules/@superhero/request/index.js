const
  Debug       = require('@superhero/debug'),
  url         = require('url'),
  querystring = require('querystring'),
  sleep       = (delay) => new Promise((go) => setTimeout(go, delay))

module.exports = class
{
  constructor(config)
  {
    this.config = Object.assign(
    {
      rejectUnauthorized: true,
      debug             : false,
      debug_color       : 'cyan',
      debug_date        : true,
      debug_prefix      : 'debug request:',
      debug_separator   : ' ',
      headers           : {},
      retry             : 0,
      timeout           : 30e3,
      url               : '',
      proxy             : process.env.HTTP_PROXY
    }, config)

    this.debug = new Debug(
    {
      color     : this.config.debug_color,
      date      : this.config.debug_date,
      prefix    : this.config.debug_prefix,
      separator : this.config.debug_separator,
      debug     : this.config.debug
    })
  }

  get(...args)
  {
    return this.fetch('GET', ...args)
  }

  put(...args)
  {
    return this.fetch('PUT', ...args)
  }

  post(...args)
  {
    return this.fetch('POST', ...args)
  }

  delete(...args)
  {
    return this.fetch('DELETE', ...args)
  }

  async fetch(method, options)
  {
    if(typeof options == 'string')
    {
      options = { url:options }
    }

    options = Object.assign(
    {
      method,
      headers : {},
      timeout : this.config.timeout,
      url     : '',
      port    : this.config.port,
      retry   : this.config.retry
    }, options)

    const result = await this.resolveThroughRetryLoop(options)

    return result
  }

  async resolveThroughRetryLoop(options)
  {
    let result, retry, i = 0

    do
    {
      try
      {
        result  = await this.resolve(options.method, options)
        retry   = false
      }
      catch(error)
      {
        const
          isClientError         = error.code === 'E_REQUEST_CLIENT_ERROR',
          isClientTimeoutError  = error.code === 'E_REQUEST_CLIENT_TIMEOUT',
          isInRetryLoopSpan     = ++i < options.retry

        retry = isInRetryLoopSpan && (isClientError || (options.retryOnClientTimeout && isClientTimeoutError))
        
        if(!retry)
        {
          throw error
        }
      }
      if(retry)
      {
        await sleep(200)
      }
    }
    while(retry)

    return result
  }

  resolve(method, options)
  {
    return new Promise((fulfill, reject) =>
    {
      this.debug.log('incoming options:', options)

      const
        assigned    = Object.assign({}, this.config.headers, options.headers),
        objectKeys  = Object.keys(assigned),
        headers     = objectKeys.reduce((c, k) => (c[k.toLowerCase()] = assigned[k], c), {}),
        body        = typeof (options.data || '') == 'string'
                      ? options.data
                      : ( headers['content-type'] || '' ).startsWith('application/json')
                        ? JSON.stringify(options.data)
                        : querystring.stringify(options.data),
        composedUrl = this.config.url + options.url,
        parsedUrl   = url.parse(composedUrl, false, true),
        parsedProxy = url.parse(this.config.proxy || '', false, true),
        config      = this.config.proxy
                    ?
                    {
                      auth  : parsedProxy.auth,
                      host  : parsedProxy.hostname,
                      path  : parsedUrl.href,
                      port  : parsedProxy.port,
                    }
                    :
                    {
                      auth  : parsedUrl.auth,
                      host  : parsedUrl.hostname,
                      port  : parsedUrl.port,
                      path  : parsedUrl.path,
                    }

        config.rejectUnauthorized = options.rejectUnauthorized
        config.timeout            = options.timeout
        config.method             = method
        config.headers            = (() =>
        {
          headers['content-length'] = Buffer.byteLength(body || '', 'utf8')
          return headers
        })()

      // removes null valued keys from the config object
      for(const key in config)
        if(config[key] === null)
          delete config[key]

      const
        path    = `${method} ${parsedUrl.href}`,
        request = ( this.config.proxy || parsedUrl.protocol === 'http:'
                  ? require('http')
                  : require('https')).request(config, this.onResult.bind(this, fulfill, options, composedUrl))

      this.debug.log('parsed config:', config)

      // writing body, if one is declared
      if(body)
      {
        this.debug.log('writing request body:', body)
        request.write(body)
      }

      request.on('error', (clientError) =>
      {
        const
          msg   = `client error -> ${path}`,
          error = new Error(msg)

        this.debug.error(msg, options)

        error.code      = 'E_REQUEST_CLIENT_ERROR'
        error.previous  = clientError

        reject(error)
      })

      request.on('timeout', () =>
      {
        const
          msg   = `client timeout (${config.timeout / 1000}s) -> ${path}`,
          error = new Error(msg)

        this.debug.error(msg, options)

        error.code = 'E_REQUEST_CLIENT_TIMEOUT'

        reject(error)

        request.destroy()
      })

      request.end()
    })
  }

  onResult(fulfill, options, url, result)
  {
    this.debug.log('response recieved')

    let data = ''

    if(options.pipe || options.stream)
    {
      this.debug.log('piping the result')
      result.pipe(options.pipe || options.stream)

      fulfill(
      {
        url     : url,
        status  : result.statusCode,
        headers : result.headers,
        stream  : result
      })
    }
    else if(result.readableEnded)
    {
      fulfill(
      {
        url     : url,
        status  : result.statusCode,
        headers : result.headers,
        data    : data
      })
    }
    else
    {
      result.on('data', (chunk) => data += chunk)
      result.on('end',  () =>
      {
        try
        {
          data = JSON.parse(data)
        }
        catch (e) 
        {
          this.debug.log('tried and failed to parse content as json:', e.message)
        }

        this.debug.log('options:', options)
        this.debug.log('status:',  result.statusCode)
        this.debug.log('headers:', result.headers)
        this.debug.log('data:',    data)

        fulfill(
        {
          url     : url,
          status  : result.statusCode,
          headers : result.headers,
          data    : data
        })
      })
    }
  }
}
