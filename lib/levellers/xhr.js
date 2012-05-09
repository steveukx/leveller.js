if(typeof XMLHttpRequest === 'undefined' && typeof ActiveXObject !== 'undefined') {

   /**
    *
    * @constructor
    */
   function XHR() {
      this._xhr = XHR._createInstance();
      this._xhr.onreadystatechange = XHR._onReadyStateChange.bind(this);
   }

   /**
    * Gets a new instance of the installed XMLHttpRequest ActiveXObject
    *
    * @return {ActiveXObject}
    */
   XHR._createInstance = (function() {
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
   XHR._onReadyStateChange = function() {
      this.readyState = this._xhr.readyState;

      switch(this.readyState) {

         case XHR.OPENED: // 1
         case XHR.LOADING: // 3
            this.onreadystatechange();
            break;

         case XHR.HEADERS_RECEIVED: // 2
            this.onreadystatechange();
            this.onprogress();
            break;

         case XHR.DONE: // 4
            XHR._onDone.call(this);
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
   XHR._onDone = function() {
      var fields = ['readyState', 'response', 'responseText', 'responseXML', 'status', 'statusText'];
      for(var i = 0, l = fields.length; i < l; i++) {
         try { this[fields[i]] = this._xhr[fields[i]]; } catch (e) {}
      }
   };

   XHR.prototype.readyState = 0;
   XHR.prototype.response = null;
   XHR.prototype.responseText = '';
   XHR.prototype.responseXML = null;
   XHR.prototype.status = 0;
   XHR.prototype.statusText = '';

   /**
    * Abort the current request
    */
   XHR.prototype.abort = function() {
      this._xhr.abort();
      if(this.onabort) {
         this.onabort();
      }
   };

//   XHR.prototype.addEventListener = function() {
//
//   };

//   XHR.prototype.dispatchEvent = function() {
//
//   };

   /**
    * Gets all response headers, return value is the raw string sent back from the server, each header will be on a new
    * line in the string and the names/values are separated with a colon and space.
    *
    * @return {String}
    */
   XHR.prototype.getAllResponseHeaders = function() {
      return this._xhr.getAllResponseHeaders();
   };

   /**
    * Gets the header with the specified name - note tht the header search is case insensitive.
    *
    * @param {String} headerName
    * @return {String}
    */
   XHR.prototype.getResponseHeader = function(headerName) {
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
   XHR.prototype.open = function(method, url, async, username, password) {
      this._xhr.open(method, url, async, username || null, password || null);
      this.onloadstart();
   };

//   XHR.prototype.removeEventListener = function() {
//
//   };

   /**
    * Sets the named header to the supplied value
    * @param {String} headerName
    * @param {String} headerValue
    */
   XHR.prototype.setRequestHeader = function(headerName, headerValue) {
      this._xhr.setRequestHeader(headerName, headerValue);
   };

   /**
    * Sends the request to the server, if the data parameter is supplied then the data will be used as the message body
    * of the request. Note that if the method was set to either GET or HEAD then the data will be ignored as there is
    * no Content-Length for either of these requests.
    *
    * @param {String} [data=null]
    */
   XHR.prototype.send = function(data) {
      this._xhr.send(data);
   };

   XHR.prototype.onreadystatechange = function() {};

   XHR.prototype.onloadstart = function() {};
   XHR.prototype.onload = function() {};
   XHR.prototype.onloadend = function() {};

   XHR.prototype.onprogress = function() {};

   XHR.DONE = 4;

   XHR.HEADERS_RECEIVED = 2;

   XHR.LOADING = 3;

   XHR.OPENED = 1;

   XHR.UNSENT = 0;
   
   XMLHttpRequest = XHR;
}
else if(typeof XMLHttpRequest === 'undefined') {
   throw new Error('Warning, XMLHttpRequest leveller cannot be created - ActiveXObject is not supported');
}