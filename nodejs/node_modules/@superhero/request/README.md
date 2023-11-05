# Request

Licence: [MIT](https://opensource.org/licenses/MIT)

---

[![npm version](https://badge.fury.io/js/%40superhero%2Frequest.svg)](https://badge.fury.io/js/%40superhero%2Frequest)

A wrapper for the http and https modules request function. I put this together to be able to simplify my api requests..

## Install

`npm install @superhero/request`

...or just set the dependency in your `package.json` file:

```json
{
  "dependencies":
  {
    "@superhero/request": "*"
  }
}
```

## Example

```javascript
const
Request = require('@superhero/request'),
request = new Request();

request.post('example.com/foobar').then((result) => console.log(result.status, result.headers, result.data));
request.post({url:'https://example.com/foobar', data: {foo:'bar',baz:'qux'}}).then(console.log);
```

## Options

Options for the constructor.

```javascript
{
  // if true, some output for debugging is logged to the console
  debug: false,

  // debug console color
  debug_color: 'cyan',

  // if the debug console should be prefixed with the date time
  debug_date: true',

  // the debug prefix message
  debug_prefix: 'debug request:',

  // a seperator between debug message
  debug_separator: ' ',

  // this url will be used to resolve any provided url in the fetch call
  url: '',

  // optional proxy url (example: http://user:password@www.example.com:666)
  proxy: '',

  // headers that will be used in every request
  headers: {},

  // retries amount of specified times if a none 2XX response is returned
  retry: 0,

  // timeout
  timeout: 30e3,

  // specifies if you want the ssl unauthorization to be rejected or not
  rejectUnauthorized: true
}
```

Options for each request

```javascript
{
  // the url to make the request to, relative paths will be resolved against
  // the provided url in the constructor
  url: '',

  // an object map of the data to send with the request
  data: undefined,

  // an object map of headers to send with the request
  headers: {},

  // amount of retries on the request level
  retry: 0,

  // timeout, inherit from setting in the constructor
  timeout: ?,

  // https://nodejs.org/api/stream.html#stream_writable_streams
  pipe: Writable,

  // alias for pipe
  stream: Writable
}
```
