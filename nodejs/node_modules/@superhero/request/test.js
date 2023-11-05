describe('request tests', async () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  Request = require('.'),
  request = new Request({ debug:false })

  after(() =>
  {
    console.log('\n')
    process.env.HTTP_PROXY
    ? console.log(`HTTP_PROXY env variable is set to: ${process.env.HTTP_PROXY}`)
    : console.log('HTTP_PROXY env variable is not set')
  })

  it('simple GET http request', async () =>
  {
    const response = await request.get('http://httpbin.org/get?foo=bar')
    expect(response.status).to.be.equal(200)
    expect(response.data.args.foo).to.be.equal('bar')
  })

  it('simple GET https request', async () =>
  {
    const response = await request.get('https://httpbin.org/get?foo=bar')
    expect(response.status).to.be.equal(200)
    expect(response.data.args.foo).to.be.equal('bar')
  })

  it('simple POST http request', async () =>
  {
    const
    url       = 'http://httpbin.org/post',
    data      = { foo:'bar' },
    response  = await request.post({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple POST https request', async () =>
  {
    const
    url       = 'https://httpbin.org/post',
    data      = { foo:'bar' },
    response  = await request.post({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple PUT http request', async () =>
  {
    const
    url       = 'http://httpbin.org/put',
    data      = { foo:'bar' },
    response  = await request.put({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple PUT https request', async () =>
  {
    const
    url       = 'https://httpbin.org/put',
    data      = { foo:'bar' },
    response  = await request.put({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple DELETE http request', async () =>
  {
    const
    url       = 'http://httpbin.org/delete',
    data      = { foo:'bar' },
    response  = await request.delete({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple DELETE https request', async () =>
  {
    const
    url       = 'https://httpbin.org/delete',
    data      = { foo:'bar' },
    response  = await request.delete({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple GET http request', async () =>
  {
    const
    url       = 'http://httpbin.org/get?foo=bar',
    headers   = { 'content-type':'json/application' },
    response  = await request.get({ url, headers })

    expect(response.status).to.be.equal(200)
    expect(response.data.args.foo).to.be.equal('bar')
  })

  it('204 status test', async () =>
  {
    const
    url       = 'http://httpbin.org/status/204',
    headers   = { 'content-type':'json/application', accept:'json/application' },
    response  = await request.put({ url, headers, retry:3 })

    expect(response.status).to.be.equal(204)
  })

  it('500 error test', async () =>
  {
    const
    url       = 'http://httpbin.org/status/500',
    headers   = { 'content-type':'json/application' },
    response  = await request.get({ url, headers, retry:3 })

    expect(response.status).to.be.equal(500)
  })

  it('408 error test', async () =>
  {
    const
    url     = 'http://httpbin.org/delay/2',
    headers = { 'content-type':'json/application' }

    try
    {
      const response = await request.get({ url, headers, timeout:10 })
      expect(response).to.be.equal('should never happen')
    }
    catch(error)
    {
      expect(error.code).to.be.equal('E_REQUEST_CLIENT_TIMEOUT')
    }
  })
})
