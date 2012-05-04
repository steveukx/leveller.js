
console.log('LocalStorage tests');

var localStorage = require('../lib/levellers/localstorage.js');

require('assert').equal(typeof localStorage, 'object');
require('assert').equal(localStorage.length, 0);

localStorage.setItem('foo', 'bar');
require('assert').equal(localStorage.length, 1);
require('assert').equal(localStorage.getItem('foo'), 'bar');
require('assert').equal(localStorage.key(0), 'foo');

localStorage.setItem('foo2', {toString: function() {return 'bar2'} });
require('assert').equal(localStorage.length, 2);
require('assert').equal(localStorage.getItem('foo2'), 'bar2');
require('assert').equal(localStorage.getItem('foo'), 'bar');
require('assert').equal(localStorage.key(0), 'foo');
require('assert').equal(localStorage.key(1), 'foo2');

localStorage.removeItem('foo');
require('assert').equal(localStorage.length, 1);
require('assert').equal(localStorage.getItem('foo2'), 'bar2');
require('assert').equal(localStorage.getItem('foo'), null);
require('assert').equal(localStorage.key(0), 'foo2');
require('assert').equal(localStorage.key(1), null);

localStorage.clear();
require('assert').equal(localStorage.length, 0);
require('assert').equal(localStorage.getItem('foo2'), null);
require('assert').equal(localStorage.key(0), null);

