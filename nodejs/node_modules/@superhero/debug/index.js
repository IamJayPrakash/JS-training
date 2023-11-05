const
util       = require('util'),
dateformat = require('dateformat'),
output     = function(args, cb)
{
  this.sn = this.sn < Number.MAX_SAFE_INTEGER ? this.sn + 1 : 0
  this.config.debug && cb(
    [ this.config.date   && dateformat(new Date(), this.config.dateFormat),
      this.config.prefix,
      this.config.index  && this.sn
    ].filter(_=>_).concat(args).map((arg) =>
      typeof arg == 'object'
      ? util.inspect(arg, this.getInspectOptions())
      : this.colorize(this.escape(arg))).join(this.config.separator))
},
Debug = module.exports = class
{
  constructor(options)
  {
    // log messages counter, serial number
    this.sn     = 0
    this.config = Object.assign(
    {
      maxArrayLength  : 10,
      maxObjectDepth  : 10,
      maxStringLength : 300,
      color           : false,
      colors          : true,
      date            : true,
      dateFormat      : 'yyyy-mm-dd HH:MM:ss',
      debug           : true,
      index           : false,
      prefix          : false,
      separator       : '\t'
    }, options)

    this.color(this.config.color)

    this.console = this.config.stdout && this.config.stderr
    ? new console.Console(this.config.stdout, this.config.stderr)
    : console
  }

  color(color)
  {
    switch (color)
    {
      case 'black'    : this._color = '30'; break
      case 'blue'     : this._color = '34'; break
      case 'cyan'     : this._color = '36'; break
      case 'green'    : this._color = '32'; break
      case 'magenta'  : this._color = '35'; break
      case 'red'      : this._color = '31'; break
      case 'yellow'   : this._color = '33'; break
      case 'white'    : this._color = '37'; break
      case false      :
      case undefined  : delete this._color
    }

    return this
  }

  colorize(s)
  {
    return this._color
    ? '\x1b[' + this._color + 'm' + s + '\x1b[0m'
    : s
  }

  escape(s)
  {
    if(Object.prototype.toString.call(s) === '[object String]')
    {
      s = s.replace(/[\x00-\x09\x10-\x1F]/g, '')
      if(this.config.maxStringLength && s.length > this.config.maxStringLength)
      {
        const segment = Math.floor(this.config.maxStringLength / 2)
        s =
        [ s.substr(0, segment).trim(),
          s.substr(  -segment).trim()
        ].join(' ... ')
      }
    }

    return s
  }

  getInspectOptions()
  {
    const options =
    {
      depth          : this.config.maxObjectDepth,
      colors         : this.config.colors,
      maxArrayLength : this.config.maxArrayLength
    }

    return options
  }

  log(...args)
  {
    output.call(this, args, this.console.log.bind(this.console))
  }

  info(...args)
  {
    output.call(this, args, this.console.log.bind(this.console))
  }

  error(...args)
  {
    output.call(this, args, this.console.error.bind(this.console))
  }

  trace(...args)
  {
    output.call(this, args, this.console.trace.bind(this.console))
  }

  table(...args)
  {
    output.call(this, args, this.console.table.bind(this.console))
  }
}

const static_debug    = new Debug()
module.exports.color  = static_debug.color.bind(static_debug)
module.exports.log    = static_debug.log  .bind(static_debug)
module.exports.info   = static_debug.info .bind(static_debug)
module.exports.error  = static_debug.error.bind(static_debug)
module.exports.trace  = static_debug.trace.bind(static_debug)
module.exports.table  = static_debug.table.bind(static_debug)
