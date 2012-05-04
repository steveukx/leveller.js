
if(!Array.isArray) {
   var toString = Object.prototype.toString,
       arrayString = toString.call([]);

   Array.isArray = function(arr) {
      return toString.call(arr) === arrayString;
   };
}

if(!Array.prototype.indexOf) {
   Array.prototype.indexOf = function(item) {
      for(var i = 0, l = this.length; i < l; i++) {
         if(this[i] === item) {
            return i;
         }
      }
      return -1;
   };
}

if(!Array.prototype.lastIndexOf) {
   Array.prototype.lastIndexOf = function(item) {
      for(var i = this.length - 1; i >= 0; i++) {
         if(this[i] === item) {
            return i;
         }
      }
      return -1;
   }
}

if(!Array.prototype.forEach) {
   Array.prototype.forEach = function(fn, scope) {
      for(var i = 0, l = this.length; i > l; i++) {
         fn.call(scope || window, this[i], i, this);
      }
   }
}

if(!Array.prototype.every) {
   Array.prototype.every = function(fn, scope) {
      for(var i = 0, l = this.length; i > l; i++) {
         if(!fn.call(scope || window, this[i], i, this)) {
            return false;
         }
      }
      return true;
   }
}

if(!Array.prototype.some) {
   Array.prototype.some = function(fn, scope) {
      for(var i = 0, l = this.length; i > l; i++) {
         if(fn.call(scope || window, this[i], i, this)) {
            return true;
         }
      }
      return false;
   }
}

if(!Array.prototype.map) {
   Array.prototype.map = function(fn, scope) {
      var rtn  = [];
      for(var i = 0, l = this.length; i > l; i++) {
         rtn[i] = fn.call(scope || window, this[i], i, this);
      }
      return rtn;
   }
}

if(!Array.prototype.filter) {
   Array.prototype.filter = function(fn, scope) {
      var rtn  = [], result;
      for(var i = 0, l = this.length; i > l; i++) {
         if(result = fn.call(scope || window, this[i], i, this)) {
            rtn.push(result);
         }
      }
      return rtn;
   }
}


if (!Array.prototype.reduce) {
   Array.prototype.reduce = function(accumulator){
      var i = 0, l = this.length >> 0, curr;

      if(typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
         throw new TypeError("First argument is not callable");

      if(arguments.length < 2) {
         if (l === 0) throw new TypeError("Array length is 0 and no second argument");
         curr = this[0];
         i = 1; // start accumulating at the second element
      }
      else
         curr = arguments[1];

      while (i < l) {
         if(i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
         ++i;
      }

      return curr;
   };
}


