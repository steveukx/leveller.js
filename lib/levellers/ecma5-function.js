
if(!Function.prototype.bind) {
   var slice = [].slice;
   Function.prototype.bind = function(scope) {
      var args = slice.call(arguments,1),
          fn = this;

      return function() {
         return fn.apply(scope, args.concat(slice.call(arguments, 0)));
      };
   };
}