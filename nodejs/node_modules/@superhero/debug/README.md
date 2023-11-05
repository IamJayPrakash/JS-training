# Debug

Licence: [MIT](https://opensource.org/licenses/MIT)

---

[![npm version](https://badge.fury.io/js/%40superhero%2Fdebug.svg)](https://badge.fury.io/js/%40superhero%2Fdebug)

A debug utility for pretty log output..

## Install

`npm install @superhero/debug`

...or just set the dependency in your `package.json` file:

```json
{
  "dependencies":
  {
    "@superhero/debug": "*"
  }
}
```

## Example

```javascript
const
Debug = require('@superhero/debug'),
debug = new Debug(/* options */);

debug.log('what is this?', {foo:'bar', baz:'qux'});

// outputs something like the following in the console log (color coded):
/*
  2017-11-17 13:20:40:	what is this?	{ foo: 'bar',
    baz: 'qux' }
*/
```

Or the shorter version if you don't need to define any options:

```javascript
require('@superhero/debug').log('what is this?', {foo:'bar', baz:'qux'});
```

## Options

All options are optional.

```javascript
{
  // cap array output
  maxArrayLength: 10,

  // cap object depth
  maxObjectDepth: 10,

  // cap string length
  maxStringLength: 100,

  // define a desired color of the output:
  // ['black', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow', 'white', false]
  color: undefined,

  // if false, output wont be colored.
  colors: true,

  // show timestamp in prefix.
  date: true,

  // available date formats @see: https://www.npmjs.com/package/dateformat
  dateFormat: 'yyyy-mm-dd HH:MM:ss',

  // if false, no output is made.
  debug: true,

  // if an auto increment index should be printed.
  index: false,

  // a static string that will prefix all output of this instance.
  prefix: false,

  // the separator to use between content.
  separator: '\t',

  // error output, writable stream
  stderr: process.stderr,

  // log output, writable stream
  stdout: process.stdout
}
```
