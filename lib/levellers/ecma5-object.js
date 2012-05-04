
if(!Object.prototype.hasOwnProperty) {
   Object.prototype.hasOwnProperty = function(name) {
      return name in this;
   };
}

if(!Object.keys) {
   Object.keys = function(obj) {
      var rtn = [];
      for(var el in obj) {
         if(obj.hasOwnProperty(el)) {
            rtn.push(el);
         }
      }
      return rtn;
   };
}

if(!Object.create) {
   Object.create = function(obj) {
      if(obj) {
         function Clone() {}
         Clone.prototype = obj.prototype || obj;
         return new Clone();
      }
   };
}
