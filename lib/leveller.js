/**
 * @class
 */
Leveller = (function () {

   "use strict";

   /**
    *
    * @constructor
    * @name Leveller
    */
   function Leveller() {
   }

   Leveller.prototype.loadScript = function(source) {
      console.log('Levller:loadScript::', source);
      document.write(decodeURIComponent("%3Cscript%20data-leveller%3D%22true%22%20src%3D%22" + source + "%22%20type%3D%22text%2Fjavascript%22%3E%3C%2Fscript%3E"));
   };

   Leveller.requirements = {
      localstorage: ['ecma5-array'],
      xhr: ['ecma5-function']
   };

   Leveller.tests = {
      'ecma5-array': function() {
         var arrayProto = Array.prototype;
         if(!Array.isArray) return true;
         for(var search in {'indexOf':1,'forEach':1,'reduce':1,'reduceRight':1,'lastIndexOf':1,'every':1,'some':1,'map':1,'filter':1}) { if(!arrayProto[search]) return true;  }
      },
      'ecma5-date': function() {
         return !Date.prototype.now;
      },
      'ecma5-function': function() {
         return !Function.prototype.bind;
      },
      'ecma5-object': function() {
         if(!Object.prototype.hasOwnProperty) return true;
         for(var search in {'create':1,'keys':1}) { if(!Object[search]) return true;  }
      },
      'ecma5-string': function() {
         var stringProto = String.prototype;
         for(var search in {'trim':1,'trimLeft':1,'trimRight':1}) { if(!stringProto[search]) return true;  }
      },
      'json': function() {
         return typeof JSON != 'object';
      },
      'localstorage': function() {
         return typeof localStorage != 'object';
      },
      'xhr': function() {
         return typeof XMLHttpRequest == 'undefined';
      }
   };

   if(typeof document != 'undefined') {
      return (function(scripts) {

         var i, l,
             leveller = new Leveller(),
             levellerTag = scripts[scripts.length - 1],
             requirements = levellerTag.getAttribute('data-requirements'),
             // loadAsXhr = levellerTag.hasAttribute('data-load-as-xhr'),
             levellerBasePath = levellerTag.getAttribute('data-base-path') || levellerTag.getAttribute('src').replace(/\/leveller\.js(?!\/)/, '/levellers/'),
             tests = [],
             executedTests = {},
             failedTests = [];

         if(requirements && (requirements = requirements.toLowerCase().split(/\s+/))) {
            for(i = 0, l = requirements.length; i < l; i++) {
               if(Leveller.requirements[requirements[i]]) {
                  tests = tests.concat(Leveller.requirements[requirements[i]]);
               }
               if(Leveller.tests[requirements[i]]) {
                  tests.push(requirements[i]);
               }
            }
         }

//         if(loadAsXhr) {
//            tests.unshift('xhr');
//         }

         for(i = 0, l = tests.length; i < l; i++) {
            if(!executedTests[tests[i]]) {
               executedTests[tests[i]] = true;
               if(Leveller.tests[tests[i]]()) {
                  failedTests.push(tests[i]);
               }
            }
         }

         for(i = 0, l = failedTests.length; i < l; i++) {
            leveller.loadScript(levellerBasePath + failedTests[i] + '.js');
         }

      }(document.getElementsByTagName('script')))
   }
   else {
      return new Leveller;
   }

}());

