!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=1)}([function(e,n,t){var r,o;!function(s){if(void 0===(o="function"==typeof(r=s)?r.call(n,t,n,e):r)||(e.exports=o),!0,e.exports=s(),!!0){var i=window.Cookies,a=window.Cookies=s();a.noConflict=function(){return window.Cookies=i,a}}}((function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var r in t)n[r]=t[r]}return n}function n(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function t(r){function o(){}function s(n,t,s){if("undefined"!=typeof document){"number"==typeof(s=e({path:"/"},o.defaults,s)).expires&&(s.expires=new Date(1*new Date+864e5*s.expires)),s.expires=s.expires?s.expires.toUTCString():"";try{var i=JSON.stringify(t);/^[\{\[]/.test(i)&&(t=i)}catch(e){}t=r.write?r.write(t,n):encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var a="";for(var c in s)s[c]&&(a+="; "+c,!0!==s[c]&&(a+="="+s[c].split(";")[0]));return document.cookie=n+"="+t+a}}function i(e,t){if("undefined"!=typeof document){for(var o={},s=document.cookie?document.cookie.split("; "):[],i=0;i<s.length;i++){var a=s[i].split("="),c=a.slice(1).join("=");t||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var u=n(a[0]);if(c=(r.read||r)(c,u)||n(c),t)try{c=JSON.parse(c)}catch(e){}if(o[u]=c,e===u)break}catch(e){}}return e?o[e]:o}}return o.set=s,o.get=function(e){return i(e,!1)},o.getJSON=function(e){return i(e,!0)},o.remove=function(n,t){s(n,"",e(t,{expires:-1}))},o.defaults={},o.withConverter=t,o}((function(){}))}))},function(e,n,t){t(2),e.exports=t(3)},function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r);function s(e,n){for(var t,r=0;r<n.length;r++)(t=n[r]).enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}new(function(){function e(n){(function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")})(this,e),this.cookie=this.sanitizeCookie(),this.settings=this.sanitizeSettings(n),this.consent={},this.consent.necessary=!0,this.consent.statistics=!1,this.consent.marketing=!1,this.consent.external_media=!1,!this.hasValidConsent()&&this.hasNoDNT()&&this.showBanner(),console.log(this)}return function(e,n,t){n&&s(e.prototype,n),t&&s(e,t)}(e,[{key:"sanitizeCookie",value:function(){var e,n,t,r,s;if(!o.a.get("privacywire"))return null;var i=JSON.parse(decodeURIComponent(o.a.get("privacywire"))),a={};return a.version=null!==(e=parseInt(i.version))&&void 0!==e?e:null,a.consent={},a.consent.necessary=null!==(n=!!i.consent.necessary)&&void 0!==n?n:null,a.consent.statistics=null!==(t=!!i.consent.statistics)&&void 0!==t?t:null,a.consent.marketing=null!==(r=!!i.consent.marketing)&&void 0!==r?r:null,a.consent.external_media=null!==(s=!!i.consent.external_media)&&void 0!==s?s:null,a}},{key:"sanitizeSettings",value:function(e){return{dnt:!!parseInt(e.dnt),version:parseInt(e.version),options:!!parseInt(e.options)}}},{key:"hasValidConsent",value:function(){return null!=this.cookie&&this.cookie.version===this.settings.version}},{key:"hasNoDNT",value:function(){return!0!==this.settings.dnt||"1"!==navigator.doNotTrack||(this.consent.necessary=!0,this.consent.statistics=!1,this.consent.marketing=!1,this.consent.external_media=!1,this.savePreferences(!0),!1)}},{key:"showBanner",value:function(){this.banner={},this.banner.wrapper=document.querySelector(".privacywire-wrapper"),this.banner.button_accept_all=this.banner.wrapper.querySelector("button.allow-all"),this.banner.button_accept_necessary=this.banner.wrapper.querySelector("button.allow-necessary"),this.banner.button_choose=this.banner.wrapper.querySelector("button.choose"),this.banner.button_save=this.banner.wrapper.querySelector("button.save"),this.banner.wrapper.classList.add("show-banner"),this.handleButtons()}},{key:"hideBanner",value:function(){this.banner.wrapper.classList.remove("show-banner"),this.banner.wrapper.classList.remove("show-options")}},{key:"showMessage",value:function(){var e=this;this.banner.wrapper.classList.add("show-message"),setTimeout((function(){e.banner.wrapper.classList.remove("show-message")}),1500)}},{key:"handleButtons",value:function(){var e=this;this.banner.button_accept_all.onclick=function(){e.consent.necessary=!0,e.consent.statistics=!0,e.consent.marketing=!0,e.consent.external_media=!0,e.savePreferences()},this.banner.button_accept_necessary.onclick=function(){e.consent.necessary=!0,e.consent.statistics=!1,e.consent.marketing=!1,e.consent.external_media=!1,e.savePreferences()},this.banner.button_choose.onclick=function(){e.banner.wrapper.classList.remove("show-banner"),e.banner.wrapper.classList.add("show-options")},this.banner.button_save.onclick=function(){console.log("Save Preferences")}}},{key:"savePreferences",value:function(){var e=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0],n={};n.version=this.settings.version,n.consent=this.consent,o.a.set("privacywire",n,{expires:365}),this.hideBanner(),e||this.showMessage()}}]),e}())(PrivacyWireSettings)},function(e,n){}]);