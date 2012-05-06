
(function() {

   /**
    *
    * @constructor
    */
   function LocalStorage() {
   }

   LocalStorage._items = {};

   LocalStorage._itemKeys = [];

   /**
    * The current length of the number of items in the storage
    * @type {Number}
    */
   LocalStorage.prototype.length = 0;

   /**
    *
    * @param {String} key
    * @param {String} item
    */
   LocalStorage.prototype.setItem = function(key, item) {
      if(LocalStorage._itemKeys.indexOf(key) < 0) {
         LocalStorage._itemKeys.push(key);
         this.length = LocalStorage._itemKeys.length;
      }
      LocalStorage._items[key] = '' + item;
   };

   /**
    * Gets the item with the specified key, when the key is not found the return value is null.
    *
    * @param {String} key
    * @return {*}
    */
   LocalStorage.prototype.getItem = function(key) {
      return (LocalStorage._itemKeys.indexOf(key) < 0) ? null : LocalStorage._items[key];
   };

   /**
    * Removes all items from the store
    */
   LocalStorage.prototype.clear = function() {
      this.length = LocalStorage._itemKeys.length = 0;
      LocalStorage._items = {};
   };

   /**
    *
    * @param {Number} index
    * @return {String}
    */
   LocalStorage.prototype.key = function(index) {
      return index >= 0 && index < LocalStorage._itemKeys.length ? LocalStorage._itemKeys[index] : null;
   };

   /**
    * Removes th item with the specified key. All subsequent calls to key must now use the new index.
    * @param key
    */
   LocalStorage.prototype.removeItem = function(key) {
      var index = LocalStorage._itemKeys.indexOf(key);
      if(index >= 0) {
         delete LocalStorage._items[key];
         LocalStorage._itemKeys.splice(index,1);
         this.length = LocalStorage._itemKeys.length;
      }
   };

   if(typeof localStorage === 'undefined') {
      localStorage = new LocalStorage();
   }
   if(typeof module !== 'undefined' && module.exports) {
      module.exports = localStorage;
   }

}());

