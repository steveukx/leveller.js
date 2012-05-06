
console.log('function ecma5 tests');

var bind = Function.prototype.bind;

Function.prototype.bind = null;

var Assert = require('assert'),
    localStorage = require('../lib/levellers/ecma5-function.js');

Assert.notEqual(Function.prototype.bind, bind);
require('assert').equal(typeof Function.prototype.bind, 'function');

(function() {
   function foo(a, b) { return (a + b) + ''; }

   [].slice.call(arguments).forEach(function(bindFn) {
      var foo_a = bindFn.call(foo, this, 1, 2),
          foo_b = bindFn.call(foo, this, 4);

      Assert.equal(foo_a(),      '3');
      Assert.equal(foo_a(1),     '3');
      Assert.equal(foo_a(1,2),   '3');
      Assert.equal(foo_a(1,2,4), '3');

      Assert.equal(foo_b(),      'NaN');
      Assert.equal(foo_b(1),     '5');
      Assert.equal(foo_b(1,2),   '5');
      Assert.equal(foo_b(1,2,4), '5');
   });

}(Function.prototype.bind, bind));

(function() {
   function foo() { return [].slice.call(arguments).concat(this.name).join(' '); }

   [].slice.call(arguments).forEach(function(bindFn) {
      var foo_a = bindFn.call(foo, {name: 'blah'}, 1, 2),
          foo_b = bindFn.call(foo, {}, 4);

      Assert.equal(foo_a(),      '1 2 blah');
      Assert.equal(foo_a(4),     '1 2 4 blah');
      Assert.equal(foo_a(4,8),   '1 2 4 8 blah');

      Assert.equal(foo_b(),      '4 ');
      Assert.equal(foo_b(1),     '4 1 ');
   });

}(Function.prototype.bind, bind));

(function() {
   var currentScope;
   function foo(isCurrentScope) { Assert[isCurrentScope ? 'equal' : 'notEqual'](this, currentScope); }

   [].slice.call(arguments).forEach(function(bindFn) {
      var scopeA = {},
          scopeB = {};

      currentScope = scopeA;
      bindFn.call(foo, scopeA)(1);
      bindFn.call(foo, scopeB)(0);

      currentScope = scopeB;
      bindFn.call(foo, scopeA)(0);
      bindFn.call(foo, scopeB)(1);
   });

}(Function.prototype.bind, bind));

Function.prototype.bind = bind;