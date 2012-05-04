
if(!Date.prototype.now) {
   Date.prototype.now = function() {
      return +new Date();
   };
}

