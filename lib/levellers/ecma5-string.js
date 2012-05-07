
if(!String.prototype.trim) {
   String.prototype.trim = function() {
      return this.trimLeft().trimRight();
   };
}

if(!String.prototype.trimLeft) {
   String.prototype.trimLeft = function() {
      return this.replace(/^\s+/, '');
   };
}

if(!String.prototype.trimRight) {
   String.prototype.trimRight = function() {
      return this.replace(/\s+$/, '');
   };
}
