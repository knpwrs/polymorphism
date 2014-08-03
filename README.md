# polymorphism

[![Build Status](https://travis-ci.org/KenPowers/polymorphism.png)](https://travis-ci.org/KenPowers/polymorphism)

This is a *very* small [node.js][node] module which adds a non-enumerable
`extend` property to `Function.prototype`. The `extend` property is a function
which creates a prototype for the function it is called on using a function
which is passed to it. The created prototype is automatically attached to the
function which `extend` is called on. In order to remain compatible with
[node's `util.inherits`][node-ui] it also creates a property `super_` on the
function it was called on pointing at the function which was passed to it. It
works out of the box in both [node.js][node] and [browserify][bfy].

## Installation

`npm i polymorphism`

## Usage

The following works in both [node.js][node] and [browserify][bfy]:

```javascript
require('polymorphism'); // No need to save the value, a non-enumerable property is added to `Function.prototype`

// Define Constructors
var Parent = function (data) {
  this.data = data;
};
var Child = function (data) {
  Child.super_.call(this, data); // Call super constructor passing in data
};

// Important: this overwrites the prototype. Make sure you make this call before defining any methods.
Child.extend(Parent);

// Define method for child.
Child.prototype.logData = function () {
  console.log(this.data);
};

// Do stuff
var c = new Child('foo');
console.log(c instanceof Child); // true
console.log(c instanceof Parent); // true
c.logData(); // 'foo'
```

## Differences from Other Modules
Much like the [`inherits`][inherits] module this module is meant to be used
with both [node.js][node] and [browserify][bfy] so you don't have to export
node's entire [`util` module][util] to the browser when sharing code between
the server and browser. Unlike the [`inherits`][inherits] module and the
[`util.inherits`][node-ui] function this module defines its functionality
as a non-enumerable property on `Function.prototype` (more information
[here][so]).

## Compatibility

This module assumes the existence of [`Object.create`][oc] and
[`Object.defineProperty`][odp]. This means that it will work with
[node.js][node] and the following browsers:

| IE | Chrome | Firefox | Safari | Opera |
| --- | --- | --- | --- | --- |
| 9+ | 5+ | 4+ | 5+ | 12+ |

## License

**The MIT License**

Copyright (c) 2014 Kenneth Powers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

  [node]: http://nodejs.org/ "Node"
  [node-ui]: http://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor "util.inherits"
  [bfy]: http://browserify.org/ "Browserify"
  [util]: http://nodejs.org/api/util.html "`util` Module"
  [inherits]: https://github.com/isaacs/inherits "Inherits"
  [so]: http://stackoverflow.com/questions/15620482/is-it-ok-to-define-a-prototype-function-on-object-in-javascript "Is it ok to define a prototype function on Object in Javascript?"
  [oc]: http://kangax.github.io/es5-compat-table/#Object.create "Object.create"
  [odp]: http://kangax.github.io/es5-compat-table/#Object.defineProperty "Object.defineProperty"
