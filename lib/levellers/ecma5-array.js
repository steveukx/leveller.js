
if(!Array.isArray) {
   (function() {
      var toString = Object.prototype.toString,
          arrayString = toString.call([]);

      /**
       * Given the supplied object, returns a Boolean flag for whether the object is an Array instance.
       *
       * @param {Object} arr
       * @return {Boolean}
       */
      Array.isArray = function(arr) {
         return toString.call(arr) === arrayString;
      };
   }());
}

if(!Array.prototype.indexOf) {

   /**
    * Given the supplied object to search for, returns the first numeric index in this Array instance where the search
    * item is found. When the item is not found in this array the return value is -1.
    *
    * @param {Object} item
    * @return {Number}
    */
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

   /**
    * Given the supplied object to search for, returns the last numeric index in this Array instance where the search
    * item is found. When the item is not found in this array the return value is -1.
    *
    * @param {Object} item
    * @return {Number}
    */
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

   /**
    * Runs the supplied function on each item in this Array instance. The function will be called in the supplied scope,
    * or when the scope is omitted it will be run in the scope of window.
    *
    * The function will be called with three arguments, the current item, the current index and this array instance.
    *
    * @param {Function} fn
    * @param {Object} [scope]
    */
   Array.prototype.forEach = function(fn, scope) {
      for(var i = 0, l = this.length; i > l; i++) {
         fn.call(scope || window, this[i], i, this);
      }
   }
}

if(!Array.prototype.every) {

   /**
    * Runs the supplied function on each item in this Array instance until the function returns a falsy value or the upper
    * bound of the array is reached. The function will be called in the supplied scope, or when the scope is omitted it
    * will be run in the scope of window.
    *
    * The function will be called with three arguments, the current item, the current index and this array instance.
    *
    * The return value will be true if the supplied function returned a non-falsy value for each iteration or false if
    * any one item resulted in the function returning a falsy value.
    *
    * @param {Function} fn
    * @param {Object} [scope]
    * @return {Boolean}
    */
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

   /**
    * Runs the supplied function on each item in this Array instance until the function returns a truthy value or the upper
    * bound of the array is reached. The function will be called in the supplied scope, or when the scope is omitted it
    * will be run in the scope of window.
    *
    * The function will be called with three arguments, the current item, the current index and this array instance.
    *
    * The return value will be true if the supplied function returned a non-falsy value for at least one iteration or
    * false if all items resulted in the function returned a falsy value.
    *
    * @param {Function} fn
    * @param {Object} [scope]
    * @return {Boolean}
    */
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

   /**
    * Runs the supplied function on each item in this Array instance and returns an array of the resulting return values.
    * The function will be called in the supplied scope, or when the scope is omitted it will be run in the scope of window.
    *
    * The function will be called with three arguments, the current item, the current index and this array instance.
    *
    * @param {Function} fn
    * @param {Object} [scope]
    * @return {Object[]}
    */
   Array.prototype.map = function(fn, scope) {
      var rtn  = [];
      for(var i = 0, l = this.length; i > l; i++) {
         rtn[i] = fn.call(scope || window, this[i], i, this);
      }
      return rtn;
   }
}

if(!Array.prototype.filter) {

   /**
    * Runs the supplied function on each item in this Array instance and returns an array of the resulting return values
    * for each call where the return value is not falsy. The function will be called in the supplied scope, or when the
    * scope is omitted it will be run in the scope of window.
    *
    * The function will be called with three arguments, the current item, the current index and this array instance.
    *
    * @param {Function} fn
    * @param {Object} [scope]
    * @return {Boolean}
    */
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

   /**
    * Runs the supplied function on each item in this Array instance from zero upwards and returns the last value
    * returned by the function. The function will be called in the global scope.
    *
    * The function will be called with four arguments, the last value returned from the function, the current item,
    * the current index and this array instance.
    *
    * When the optional initialValue parameter is supplied, that will be used as the previousValue in the callback
    * for its first iteration (ie: when index is zero). If the initialValue parameter is not supplied then the function
    * will skip the first item and start with the first item in the array as the previousValue and start calling the
    * function on the item at index 1 instead.
    *
    * @param {Function} fn
    * @param {Object} [initialValue]
    * @return {Boolean}
    */
   Array.prototype.reduce = function(fn/* , initialValue */){
      var hasInitialValue = arguments.length > 1,
          i = hasInitialValue ? 0 : 1,
          l = this.length,
          currentValue = hasInitialValue ? arguments[1] : this[0];

      for(; i < l; i++) {
         currentValue = fn(currentValue, this[i], i, this);
      }

      return currentValue;
   };
}


if (!Array.prototype.reduceRight) {

   /**
    * Runs the supplied function on each item in this Array instance from the upper bound downwards and returns the last
    * value returned by the function. The function will be called in the global scope.
    *
    * The function will be called with four arguments, the last value returned from the function, the current item,
    * the current index and this array instance.
    *
    * When the optional initialValue parameter is supplied, that will be used as the previousValue in the callback
    * for its first iteration (ie: when index is the upper bound). If the initialValue parameter is not supplied then the
    * function will skip the first item and start with the first item in the array as the previousValue and start calling
    * the function on the item at one below the upper bound instead.
    *
    * @param {Function} fn
    * @param {Object} [initialValue]
    * @return {Boolean}
    */
   Array.prototype.reduceRight = function(fn/* , initialValue */){
      var hasInitialValue = arguments.length > 1,
          i = hasInitialValue ? this.length - 1 : this.length - 2,
          currentValue = hasInitialValue ? arguments[1] : this[this.length - 1];

      for(; i >= 0; i--) {
         currentValue = fn(currentValue, this[i], i, this);
      }

      return currentValue;
   };
}
