leveller.js
===========

Selection of ECMA5 polyfills to level the playing field a bit for JavaScript applications running in old browsers

Creating a web app is more fun (not to mention more functional) when modern APIs are available to you. This library takes away some of the pain in catering for older browsers by adding new APIs to old browsers when required by your application.

It's simple to use, just add a single line to your HTML:

    <script src="http://mydev.co/levllers.js/lib/leveller.js" data-requirements=""></script>

Add as many of the features you require out of the following as a space separated list:

**ecma5-array** all of the Array extensions otherwise available in libraries such as underscore, but native when supported.

**ecma5-date** quick access timestamps with Date.now

**ecma5-function** Function's most useful extension - bind, somewhat lacking in iOS

**ecma5-object** a (currently incomplete) Object prototype polyfill, support for the hasOwnProperty prototype method and of course, Object.create

**ecma5-string** support for the String prototype methods trim, trimLeft and trimRight

**JSON** library from json.org, a full JSON parser for browsers without the native implementation

**localStorage** the full localStorage API, note that there is no persistence when the user switches page though.

**xhr** use the standard XMLHttpRequest object on any browser - note that if the user agent doesn't support native XMLHttpRequest and doesn't support ActiveXObject then an error will still be thrown.

Some of the levellers will automatically add other levellers (for example, localStorage requires the array leveller) but those dependencies are managed for you automatically. All you need do do is list the things you are using, for example:

    <script src="path/to/leveller.js" data-requirements="json localStorage ecma5-function"></script>

