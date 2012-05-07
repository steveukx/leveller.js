
console.log('string ecma5 tests');

var trimLeft = String.prototype.trimLeft,
    trimRight = String.prototype.trimRight,
    trim = String.prototype.trim;

String.prototype.trimLeft =
   String.prototype.trimRight =
   String.prototype.trim = null;

var Assert = require('assert'),
    string = require('../lib/levellers/ecma5-string.js');

Assert.notEqual(String.prototype.trim, trim);
require('assert').equal(typeof String.prototype.trimLeft, 'function');
require('assert').equal(typeof String.prototype.trimRight, 'function');
require('assert').equal(typeof String.prototype.trim, 'function');

(function() {
   function equal(source, expected) {
      Assert.equal(trim.call(source), expected, "Calling native trim for '" + source + "'");
      Assert.equal(String.prototype.trim.call(source), expected, "Calling leveller trim for '" + source + "'");
   }
   equal('\n blah', 'blah');
   equal('blah\t', 'blah');
   equal('  blah \t', 'blah');
}());

(function() {
   function equal(source, expected) {
      Assert.equal(trimLeft.call(source), expected, "Calling native trimLeft for '" + source + "'");
      Assert.equal(String.prototype.trimLeft.call(source), expected, "Calling leveller trimLeft for '" + source + "'");
   }

   equal('\n blah', 'blah');
   equal('blah\t', 'blah\t');
   equal('  blah \t', 'blah \t');
}());

(function() {
   function equal(source, expected) {
      Assert.equal(trimRight.call(source), expected, "Calling native trimRight for '" + source + "'");
      Assert.equal(String.prototype.trimRight.call(source), expected, "Calling leveller trimRight for '" + source + "'");
   }

   equal('\n blah', '\n blah');
   equal('blah\t', 'blah');
   equal('  blah \t', '  blah');
}());

String.prototype.trimLeft = trimLeft;
String.prototype.trimRight = trimRight;
String.prototype.trim = trim;