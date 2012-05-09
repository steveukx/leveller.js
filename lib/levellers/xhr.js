
if(typeof XMLHttpRequest === 'undefined' && typeof ActiveXObject !== 'undefined') {

   /**
    *
    * @constructor
    */
   function XMLHttpRequest() {
      this._xhr = XMLHttpRequest._createInstance();
      this._xhr.onreadystatechange = XMLHttpRequest._onReadyStateChange.bind(this);
   }

   /**
    * Gets a new instance of the installed XMLHttpRequest ActiveXObject
    *
    * @return {ActiveXObject}
    */
   XMLHttpRequest._createInstance = (function() {
      var definitionsList = ['Microsoft.XMLHTTP',
                              'Msxml2.XMLHTTP',
                              'Msxml2.XMLHTTP.6.0'];
      for(var i = 0; i < definitionsList.length; i++) {
         try {
            var transport = new ActiveXObject(definitionsList[i]);
            if(transport) {
               return new Function('return new ActiveXObject("' + definitionsList[i] + '");');
            }
         }
         catch (e) {}
      }
      throw new Error('Warning, XMLHttpRequest leveller cannot be created - no supported ActiveXObject is installed');
   }());

   /**
    * Handler for the readyState changing in the underlying ActiveXObject instance, passes on to the onreadystatechange
    * handler attached to the leveller.
    */
   XMLHttpRequest._onReadyStateChange = function() {
      this.readyState = this._xhr.readyState;

      switch(this.readyState) {

         case XMLHttpRequest.OPENED: // 1
         case XMLHttpRequest.LOADING: // 3
            this.onreadystatechange();
            break;

         case XMLHttpRequest.HEADERS_RECEIVED: // 2
            this.onreadystatechange();
            this.onprogress();
            break;

         case XMLHttpRequest.DONE: // 4
            XMLHttpRequest._onDone.call(this);
            this.onprogress();
            this.onreadystatechange();
            this.onload();
            this.onloadend();
            break;
      }
   };

   /**
    * When the load operation has completed, copy useful fields from the ActiveXObject onto this XMLHttpRequest instance
    */
   XMLHttpRequest._onDone = function() {
      var fields = ['readyState', 'response', 'responseText', 'responseXML', 'status', 'statusText'];
      for(var i = 0, l = fields.length; i < l; i++) {
         try { this[fields[i]] = this._xhr[fields[i]]; } catch (e) {}
      }
   };

   XMLHttpRequest.prototype.readyState = 0;
   XMLHttpRequest.prototype.response = null;
   XMLHttpRequest.prototype.responseText = '';
   XMLHttpRequest.prototype.responseXML = null;
   XMLHttpRequest.prototype.status = 0;
   XMLHttpRequest.prototype.statusText = '';

   /**
    * Abort the current request
    */
   XMLHttpRequest.prototype.abort = function() {
      this._xhr.abort();
      if(this.onabort) {
         this.onabort();
      }
   };

//   XMLHttpRequest.prototype.addEventListener = function() {
//
//   };

//   XMLHttpRequest.prototype.dispatchEvent = function() {
//
//   };

   /**
    * Gets all response headers, return value is the raw string sent back from the server, each header will be on a new
    * line in the string and the names/values are separated with a colon and space.
    *
    * @return {String}
    */
   XMLHttpRequest.prototype.getAllResponseHeaders = function() {
      return this._xhr.getAllResponseHeaders();
   };

   /**
    * Gets the header with the specified name - note tht the header search is case insensitive.
    *
    * @param {String} headerName
    * @return {String}
    */
   XMLHttpRequest.prototype.getResponseHeader = function(headerName) {
      return this._xhr.getResponseHeader(headerName);
   };

   /**
    * Opens the request channel
    *
    * @param {String} method One of GET, POST, HEAD, DELETE or PUT
    * @param {String} url The relative or absolute URL to send the request to
    * @param {Boolean} async Set to true for asynchronous requests or false for synchronous
    * @param {String} [username=null]
    * @param {String} [password=null]
    */
   XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
      this._xhr.open(method, url, async, username || null, password || null);
      this.onloadstart();
   };

//   XMLHttpRequest.prototype.removeEventListener = function() {
//
//   };

   /**
    * Sets the named header to the supplied value
    * @param {String} headerName
    * @param {String} headerValue
    */
   XMLHttpRequest.prototype.setRequestHeader = function(headerName, headerValue) {
      this._xhr.setRequestHeader(headerName, headerValue);
   };

   /**
    * Sends the request to the server, if the data parameter is supplied then the data will be used as the message body
    * of the request. Note that if the method was set to either GET or HEAD then the data will be ignored as there is
    * no Content-Length for either of these requests.
    *
    * @param {String} [data=null]
    */
   XMLHttpRequest.prototype.send = function(data) {
      this._xhr.send(data);
   };

   XMLHttpRequest.prototype.onreadystatechange = function() {};

   XMLHttpRequest.prototype.onloadstart = function() {};
   XMLHttpRequest.prototype.onload = function() {};
   XMLHttpRequest.prototype.onloadend = function() {};

   XMLHttpRequest.prototype.onprogress = function() {};

   XMLHttpRequest.DONE = 4;

   XMLHttpRequest.HEADERS_RECEIVED = 2;

   XMLHttpRequest.LOADING = 3;

   XMLHttpRequest.OPENED = 1;

   XMLHttpRequest.UNSENT = 0;
}
else if(typeof XMLHttpRequest === 'undefined') {
   throw new Error('Warning, XMLHttpRequest leveller cannot be created - ActiveXObject is not supported');
}