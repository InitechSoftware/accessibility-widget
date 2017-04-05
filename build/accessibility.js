!function(i){function __webpack_require__(e){if(t[e])return t[e].exports;var n=t[e]={exports:{},id:e,loaded:!1};return i[e].call(n.exports,n,n.exports,__webpack_require__),n.loaded=!0,n.exports}var t={};return __webpack_require__.m=i,__webpack_require__.c=t,__webpack_require__.p="",__webpack_require__(0)}([function(i,t,e){"use strict";function _interopRequireDefault(i){return i&&i.__esModule?i:{default:i}}function _classCallCheck(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(i,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}return function(i,t,e){return t&&defineProperties(i.prototype,t),e&&defineProperties(i,e),i}}(),s=e(1),a=_interopRequireDefault(s),l=e(9),r=(_interopRequireDefault(l),e(13)),c=_interopRequireDefault(r),o=e(14),u=_interopRequireDefault(o),p=e(15),g="classes",y=function(){function AccessibilityPlugin(i){var t=this;_classCallCheck(this,AccessibilityPlugin);var e=window.localStorage.getItem(g);if(this.documentReady,this._pluginElement=document.createRange().createContextualFragment(a.default),this._translationKeys=c.default,this._savedClasses=null!==e?JSON.parse(e):[],this._possibleClasses=["enlarge-font","low-contrast","high-contrast","underline-links","disable-animations","readable-font"],this.constants={configs:{hebrew:p.configHebrew,english:p.configEnglish}},this._documetnReadyFunc=function(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:p.configEnglish;t.setConfig(e),t._savedClasses.length>0&&t._savedClasses.forEach(function(i){return t._setClass(i,!0)}),"function"==typeof t.documentReady&&(t.documentReady.bind(t),t.documentReady())},void 0!==window.AccessibilityPlugin&&"AccessibilityPlugin"==typeof window.AccessibilityPlugin)return window.AccessibilityPlugin}return n(AccessibilityPlugin,[{key:"append",value:function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t="#accessibility-plugin",e=void 0;if(null!==i&&!("querySelector"in i))throw new Error("Property passed to toElement: "+i+" is not an element");return document.body.appendChild(this._pluginElement),e=null!==i&&i.querySelector?""+t:"body > "+t,this._pluginElement=document.querySelector(e),this._pluginElement.addEventListener("click",this._accessibilityPluginClicked.bind(this)),this._pluginElement.querySelector(".accessibility-plugin_tab").addEventListener("click",this._openTab.bind(this)),this}},{key:"setConfig",value:function(i){"translation"in i&&this.translate(i.translation),"direction"in i&&this.changeDirection(i.direction),"appendToElement"in i?this.append(i.appendToElement):this.append()}},{key:"translate",value:function(i){if(0===Object.keys(i))throw new Error("Argument translationObject should be an object with keys");for(var t in i)this._translationKeys[t]?"img"==this._translationKeys[t].type?this._pluginElement.querySelector(this._translationKeys[t].path).setAttribute("alt",i[t]):"span"==this._translationKeys[t].type?this._pluginElement.querySelector(this._translationKeys[t].path).textContent=i[t]:console.error("Unsupported translation type "+this._translationKeys[t].type):console.error("Unsupported trnslation key "+t);return this}},{key:"changeDirection",value:function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ltr";if(!i||"ltr"!==i&&"rtl"!==i)throw new Error('dir argument should be set to either "ltr" or "rtl" not "'+i+'"');return this._pluginElement.setAttribute?this._pluginElement.setAttribute("dir",i):this._pluginElement.firstChild.setAttribute("dir",i),this}},{key:"resetConfiguration",value:function(){var i=this;this._savedClasses.forEach(function(t){return i._setStyle(document.querySelectorAll(u.default[t].elements),!1,u.default[t].style)}),this._savedClasses=[],window.localStorage.removeItem(g),("jQuery"in window||"$"in window)&&(window.jQuery.fx.off=!1)}},{key:"_accessibilityPluginClicked",value:function(i){var t=i.target;t=t.classList.contains("control")&&t.dataset.addClass?t:t.parentNode,"reset"===t.id?this.resetConfiguration():void 0!==t.dataset.addClass&&this._setClass(t.dataset.addClass)}},{key:"_setClass",value:function(i){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=u.default[i],n=document.querySelectorAll(e.elements);t===!0?this._setStyle(n,!0,e.style):this._savedClasses.includes(i)?(this._setStyle(n,!1,e.style),this._savedClasses.splice(this._savedClasses.findIndex(function(t){return t===i}),1)):(this._setStyle(n,!0,e.style),this._savedClasses.push(i)),window.localStorage.setItem(g,JSON.stringify(this._savedClasses)),"jQuery"in window&&(this._savedClasses.includes("disable-animations")?window.jQuery.fx.off=!0:window.jQuery.fx.off===!0&&this._savedClasses.includes("disable-animations")===!1?window.jQuery.fx.off=!1:window.jQuery.fx.off=!1)}},{key:"_setStyle",value:function(i){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments[2];i.forEach(function(i){var n=i.getAttribute("style")||"";t===!0?i.setAttribute("style",n+e):i.setAttribute("style",n.replace(e,""))})}},{key:"_openTab",value:function(){var i="open";this._pluginElement.classList.contains(i)?this._pluginElement.classList.remove(i):this._pluginElement.classList.add(i)}}]),AccessibilityPlugin}();"AccessibilityPlugin"in window?console.error('\n    Property AccessibilityPlugin is already defined on window.\n    Please change the name of the added "AccessibilityPlugin" and retry.\n  '):window.AccessibilityPlugin=new y,document.addEventListener("DOMContentLoaded",function(i){return window.AccessibilityPlugin._documetnReadyFunc()}),t.default=y},function(i,t,e){i.exports="<div id=accessibility-plugin dir=ltr class=accessibility-plugin_wrapper> <div class=accessibility-plugin_tab> <img src="+e(2)+' alt="" class=accessibility-plugin_img /> </div> <h3 class=accessibility-plugin_header></h3> <div id=font class=accessibility-plugin_control data-add-class=enlarge-font> <span class=accessibility-plugin_text></span> <img src='+e(3)+' alt="" class=accessibility-plugin_img /> </div> <div id=contrast-high class=accessibility-plugin_control data-add-class=high-contrast> <span class=accessibility-plugin_text></span> <img src='+e(4)+' alt="" class=accessibility-plugin_img /> </div> <div id=links class=accessibility-plugin_control data-add-class=underline-links> <span class=accessibility-plugin_text></span> <img src='+e(5)+' alt="" class=accessibility-plugin_img /> </div> <div id=animation class=accessibility-plugin_control data-add-class=disable-animations> <span class=accessibility-plugin_text></span> <img src='+e(6)+' alt="" class=accessibility-plugin_img /> </div> <div id=readable class=accessibility-plugin_control data-add-class=readable-font> <span class=accessibility-plugin_text></span> <img src='+e(7)+' alt="" class=accessibility-plugin_img /> </div> <div id=reset class=accessibility-plugin_control> <span class=accessibility-plugin_text></span> <img src='+e(8)+' alt="" class=accessibility-plugin_img /> </div> </div> '},function(i,t){i.exports="data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iNCIgcj0iMiIvPgogICAgPHBhdGggZD0iTTE5IDEzdi0yYy0xLjU0LjAyLTMuMDktLjc1LTQuMDctMS44M2wtMS4yOS0xLjQzYy0uMTctLjE5LS4zOC0uMzQtLjYxLS40NS0uMDEgMC0uMDEtLjAxLS4wMi0uMDFIMTNjLS4zNS0uMi0uNzUtLjMtMS4xOS0uMjZDMTAuNzYgNy4xMSAxMCA4LjA0IDEwIDkuMDlWMTVjMCAxLjEuOSAyIDIgMmg1djVoMnYtNS41YzAtMS4xLS45LTItMi0yaC0zdi0zLjQ1YzEuMjkgMS4wNyAzLjI1IDEuOTQgNSAxLjk1em0tNi4xNyA1Yy0uNDEgMS4xNi0xLjUyIDItMi44MyAyLTEuNjYgMC0zLTEuMzQtMy0zIDAtMS4zMS44NC0yLjQxIDItMi44M1YxMi4xYy0yLjI4LjQ2LTQgMi40OC00IDQuOSAwIDIuNzYgMi4yNCA1IDUgNSAyLjQyIDAgNC40NC0xLjcyIDQuOS00aC0yLjA3eiIvPgo8L3N2Zz4="},function(i,t){i.exports="data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik05IDR2M2g1djEyaDNWN2g1VjRIOXptLTYgOGgzdjdoM3YtN2gzVjlIM3YzeiIvPgo8L3N2Zz4="},function(i,t){i.exports="data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0yMCA4LjY5VjRoLTQuNjlMMTIgLjY5IDguNjkgNEg0djQuNjlMLjY5IDEyIDQgMTUuMzFWMjBoNC42OUwxMiAyMy4zMSAxNS4zMSAyMEgyMHYtNC42OUwyMy4zMSAxMiAyMCA4LjY5ek0xMiAxOGMtMy4zMSAwLTYtMi42OS02LTZzMi42OS02IDYtNiA2IDIuNjkgNiA2LTIuNjkgNi02IDZ6bTAtMTBjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00eiIvPgo8L3N2Zz4="},function(i,t){i.exports="data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAxN2MzLjMxIDAgNi0yLjY5IDYtNlYzaC0yLjV2OGMwIDEuOTMtMS41NyAzLjUtMy41IDMuNVM4LjUgMTIuOTMgOC41IDExVjNINnY4YzAgMy4zMSAyLjY5IDYgNiA2em0tNyAydjJoMTR2LTJINXoiLz4KPC9zdmc+"},function(i,t){i.exports="data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek00IDEyYzAtNC40MiAzLjU4LTggOC04IDEuODUgMCAzLjU1LjYzIDQuOSAxLjY5TDUuNjkgMTYuOUM0LjYzIDE1LjU1IDQgMTMuODUgNCAxMnptOCA4Yy0xLjg1IDAtMy41NS0uNjMtNC45LTEuNjlMMTguMzEgNy4xQzE5LjM3IDguNDUgMjAgMTAuMTUgMjAgMTJjMCA0LjQyLTMuNTggOC04IDh6Ii8+Cjwvc3ZnPg=="},function(i,t){i.exports="data:image/svg+xml;charset=utf-8;base64,PHN2ZyBiYXNlUHJvZmlsZT0idGlueSIgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik05LjkzIDEzLjVoNC4xNEwxMiA3Ljk4ek0yMCAySDRjLTEuMSAwLTIgLjktMiAydjE2YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTQuMDUgMTYuNWwtMS4xNC0zSDkuMTdsLTEuMTIgM0g1Ljk2bDUuMTEtMTNoMS44Nmw1LjExIDEzaC0yLjA5eiIvPgo8L3N2Zz4="},function(i,t){i.exports="data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xOS40MyAxMi45OGMuMDQtLjMyLjA3LS42NC4wNy0uOThzLS4wMy0uNjYtLjA3LS45OGwyLjExLTEuNjVjLjE5LS4xNS4yNC0uNDIuMTItLjY0bC0yLTMuNDZjLS4xMi0uMjItLjM5LS4zLS42MS0uMjJsLTIuNDkgMWMtLjUyLS40LTEuMDgtLjczLTEuNjktLjk4bC0uMzgtMi42NUMxNC40NiAyLjE4IDE0LjI1IDIgMTQgMmgtNGMtLjI1IDAtLjQ2LjE4LS40OS40MmwtLjM4IDIuNjVjLS42MS4yNS0xLjE3LjU5LTEuNjkuOThsLTIuNDktMWMtLjIzLS4wOS0uNDkgMC0uNjEuMjJsLTIgMy40NmMtLjEzLjIyLS4wNy40OS4xMi42NGwyLjExIDEuNjVjLS4wNC4zMi0uMDcuNjUtLjA3Ljk4cy4wMy42Ni4wNy45OGwtMi4xMSAxLjY1Yy0uMTkuMTUtLjI0LjQyLS4xMi42NGwyIDMuNDZjLjEyLjIyLjM5LjMuNjEuMjJsMi40OS0xYy41Mi40IDEuMDguNzMgMS42OS45OGwuMzggMi42NWMuMDMuMjQuMjQuNDIuNDkuNDJoNGMuMjUgMCAuNDYtLjE4LjQ5LS40MmwuMzgtMi42NWMuNjEtLjI1IDEuMTctLjU5IDEuNjktLjk4bDIuNDkgMWMuMjMuMDkuNDkgMCAuNjEtLjIybDItMy40NmMuMTItLjIyLjA3LS40OS0uMTItLjY0bC0yLjExLTEuNjV6TTEyIDE1LjVjLTEuOTMgMC0zLjUtMS41Ny0zLjUtMy41czEuNTctMy41IDMuNS0zLjUgMy41IDEuNTcgMy41IDMuNS0xLjU3IDMuNS0zLjUgMy41eiIvPgo8L3N2Zz4="},function(i,t,e){var n=e(10);"string"==typeof n&&(n=[[i.id,n,""]]);e(12)(n,{});n.locals&&(i.exports=n.locals)},function(i,t,e){t=i.exports=e(11)(),t.push([i.id,".accessibility-plugin_wrapper h1,.accessibility-plugin_wrapper h2,.accessibility-plugin_wrapper h3,.accessibility-plugin_wrapper h4,.accessibility-plugin_wrapper h5,.accessibility-plugin_wrapper h6{margin:0;padding:0;font-weight:400;font-family:Arial,Helvetica,sans-serif}.accessibility-plugin_wrapper a,.accessibility-plugin_wrapper abbr,.accessibility-plugin_wrapper acronym,.accessibility-plugin_wrapper blockquote,.accessibility-plugin_wrapper dd,.accessibility-plugin_wrapper dt,.accessibility-plugin_wrapper input,.accessibility-plugin_wrapper li,.accessibility-plugin_wrapper ol,.accessibility-plugin_wrapper p,.accessibility-plugin_wrapper q,.accessibility-plugin_wrapper select,.accessibility-plugin_wrapper td,.accessibility-plugin_wrapper textarea,.accessibility-plugin_wrapper th,.accessibility-plugin_wrapper ul{margin:0;padding:0;font:normal normal normal 1em/1.25 Arial,Helvetica,sans-serif}.accessibility-plugin_wrapper blockquote{margin:1.25em;padding:1.25em}.accessibility-plugin_wrapper q{font-style:italic}.accessibility-plugin_wrapper abbr,.accessibility-plugin_wrapper acronym{cursor:help;border-bottom:1px dashed}.accessibility-plugin_wrapper small{font-size:.85em}.accessibility-plugin_wrapper big{font-size:1.2em}.accessibility-plugin_wrapper a,.accessibility-plugin_wrapper a:active,.accessibility-plugin_wrapper a:hover,.accessibility-plugin_wrapper a:link,.accessibility-plugin_wrapper a:visited{text-decoration:underline}.accessibility-plugin_wrapper img{border:none}.accessibility-plugin_wrapper table{margin:0;padding:0;border:none}.accessibility-plugin_wrapper form{margin:0;padding:0;display:inline}.accessibility-plugin_wrapper label{cursor:pointer}.accessibility-plugin_wrapper *,:after,:before{box-sizing:border-box}.accessibility-plugin_wrapper{position:fixed;top:45%;height:auto;width:280px;border:1px solid #4157af;padding:10px;box-sizing:border-box!important;left:-280px;transition:left .5s,right .5s;background:#fff}.accessibility-plugin_wrapper.open{left:0}.accessibility-plugin_wrapper>.accessibility-plugin_tab{position:absolute;cursor:pointer;height:40px;width:40px;top:-1px;right:-40px}.accessibility-plugin_wrapper>.accessibility-plugin_tab>.accessibility-plugin_img{height:100%;width:100%;text-align:center;background:#4157af!important}.accessibility-plugin_wrapper>.accessibility-plugin_header{text-align:center}.accessibility-plugin_wrapper>.accessibility-plugin_control{cursor:pointer;overflow:hidden;margin:10px 0}.accessibility-plugin_wrapper>.accessibility-plugin_control>.accessibility-plugin_img{display:block}.accessibility-plugin_wrapper>.accessibility-plugin_control>.accessibility-plugin_text{display:block;line-height:22px}.accessibility-plugin_wrapper[dir=rtl]{left:auto;right:-280px}.accessibility-plugin_wrapper[dir=rtl].open{right:0}.accessibility-plugin_wrapper[dir=rtl] .accessibility-plugin_tab{right:auto;left:-40px}.accessibility-plugin_wrapper[dir=ltr]>.accessibility-plugin_control>.accessibility-plugin_img{float:right}.accessibility-plugin_wrapper[dir=ltr]>.accessibility-plugin_control>.accessibility-plugin_text,.accessibility-plugin_wrapper[dir=rtl]>.accessibility-plugin_control>.accessibility-plugin_img{float:left}.accessibility-plugin_wrapper[dir=rtl]>.accessibility-plugin_control>.accessibility-plugin_text{float:right}body.high-contrast .accessibility-plugin_wrapper{background:#000!important}body.high-contrast .accessibility-plugin_wrapper img{background:#fff}",""])},function(i,t){i.exports=function(){var i=[];return i.toString=function(){for(var i=[],t=0;t<this.length;t++){var e=this[t];e[2]?i.push("@media "+e[2]+"{"+e[1]+"}"):i.push(e[1])}return i.join("")},i.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},s=0;s<this.length;s++){var a=this[s][0];"number"==typeof a&&(n[a]=!0)}for(s=0;s<t.length;s++){var l=t[s];"number"==typeof l[0]&&n[l[0]]||(e&&!l[2]?l[2]=e:e&&(l[2]="("+l[2]+") and ("+e+")"),i.push(l))}},i}},function(i,t,e){function addStylesToDom(i,t){for(var e=0;e<i.length;e++){var s=i[e],a=n[s.id];if(a){a.refs++;for(var l=0;l<a.parts.length;l++)a.parts[l](s.parts[l]);for(;l<s.parts.length;l++)a.parts.push(addStyle(s.parts[l],t))}else{for(var r=[],l=0;l<s.parts.length;l++)r.push(addStyle(s.parts[l],t));n[s.id]={id:s.id,refs:1,parts:r}}}}function listToStyles(i){for(var t=[],e={},n=0;n<i.length;n++){var s=i[n],a=s[0],l=s[1],r=s[2],c=s[3],o={css:l,media:r,sourceMap:c};e[a]?e[a].parts.push(o):t.push(e[a]={id:a,parts:[o]})}return t}function insertStyleElement(i,t){var e=l(),n=o[o.length-1];if("top"===i.insertAt)n?n.nextSibling?e.insertBefore(t,n.nextSibling):e.appendChild(t):e.insertBefore(t,e.firstChild),o.push(t);else{if("bottom"!==i.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");e.appendChild(t)}}function removeStyleElement(i){i.parentNode.removeChild(i);var t=o.indexOf(i);t>=0&&o.splice(t,1)}function createStyleElement(i){var t=document.createElement("style");return t.type="text/css",insertStyleElement(i,t),t}function createLinkElement(i){var t=document.createElement("link");return t.rel="stylesheet",insertStyleElement(i,t),t}function addStyle(i,t){var e,n,s;if(t.singleton){var a=c++;e=r||(r=createStyleElement(t)),n=applyToSingletonTag.bind(null,e,a,!1),s=applyToSingletonTag.bind(null,e,a,!0)}else i.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=createLinkElement(t),n=updateLink.bind(null,e),s=function(){removeStyleElement(e),e.href&&URL.revokeObjectURL(e.href)}):(e=createStyleElement(t),n=applyToTag.bind(null,e),s=function(){removeStyleElement(e)});return n(i),function(t){if(t){if(t.css===i.css&&t.media===i.media&&t.sourceMap===i.sourceMap)return;n(i=t)}else s()}}function applyToSingletonTag(i,t,e,n){var s=e?"":n.css;if(i.styleSheet)i.styleSheet.cssText=u(t,s);else{var a=document.createTextNode(s),l=i.childNodes;l[t]&&i.removeChild(l[t]),l.length?i.insertBefore(a,l[t]):i.appendChild(a)}}function applyToTag(i,t){var e=t.css,n=t.media;if(n&&i.setAttribute("media",n),i.styleSheet)i.styleSheet.cssText=e;else{for(;i.firstChild;)i.removeChild(i.firstChild);i.appendChild(document.createTextNode(e))}}function updateLink(i,t){var e=t.css,n=t.sourceMap;n&&(e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var s=new Blob([e],{type:"text/css"}),a=i.href;i.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}var n={},s=function(i){var t;return function(){return"undefined"==typeof t&&(t=i.apply(this,arguments)),t}},a=s(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),l=s(function(){return document.head||document.getElementsByTagName("head")[0]}),r=null,c=0,o=[];i.exports=function(i,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=a()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var e=listToStyles(i);return addStylesToDom(e,t),function(i){for(var s=[],a=0;a<e.length;a++){var l=e[a],r=n[l.id];r.refs--,s.push(r)}if(i){var c=listToStyles(i);addStylesToDom(c,t)}for(var a=0;a<s.length;a++){var r=s[a];if(0===r.refs){for(var o=0;o<r.parts.length;o++)r.parts[o]();delete n[r.id]}}}};var u=function(){var i=[];return function(t,e){return i[t]=e,i.filter(Boolean).join("\n")}}()},function(i,t){i.exports={accessibility_text:{type:"span",path:"#accessibility-plugin > .accessibility-plugin_header"},accessibility_alt:{type:"img",path:"#accessibility-plugin > .accessibility-plugin_tab > .accessibility-plugin_img"},font_resize_text:{type:"span",path:"#accessibility-plugin > .accessibility-plugin_control#font > .accessibility-plugin_text"},font_resize_alt:{type:"img",path:"#accessibility-plugin > .accessibility-plugin_control#font > .accessibility-plugin_img"},contrast_high_text:{type:"span",path:"#accessibility-plugin > .accessibility-plugin_control#contrast-high > .accessibility-plugin_text"},contrast_high_alt:{type:"img",path:"#accessibility-plugin > .accessibility-plugin_control#contrast-high > .accessibility-plugin_img"},links_underline_text:{type:"span",path:"#accessibility-plugin > .accessibility-plugin_control#links > .accessibility-plugin_text"},links_underline_alt:{type:"img",path:"#accessibility-plugin > .accessibility-plugin_control#links > .accessibility-plugin_img"},animation_block_text:{type:"span",path:"#accessibility-plugin > .accessibility-plugin_control#animation > .accessibility-plugin_text"},animation_block_alt:{type:"img",path:"#accessibility-plugin > .accessibility-plugin_control#animation > .accessibility-plugin_img"},readable_font_text:{type:"span",path:"#accessibility-plugin > .accessibility-plugin_control#readable > .accessibility-plugin_text"},readable_font_alt:{type:"img",path:"#accessibility-plugin > .accessibility-plugin_control#readable > .accessibility-plugin_img"},reset_configuration_text:{type:"span",path:"#accessibility-plugin > .accessibility-plugin_control#reset > .accessibility-plugin_text"},reset_configuration_alt:{type:"img",path:"#accessibility-plugin > .accessibility-plugin_control#reset > .accessibility-plugin_img"}}},function(i,t){i.exports={"enlarge-font":{elements:"body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)",style:";font-size: 110% !important;"},"high-contrast":{elements:"body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)",style:";background-color: #000000 !important; color: rgb(30, 255, 35) !important;"},"underline-links":{elements:"body a[href]",style:";text-decoration: underline !important;"},"disable-animations":{elements:"body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)",style:";-o-transition-property: none !important;-moz-transition-property: none !important;-ms-transition-property: none !important;-webkit-transition-property: none !important;transition-property: none !important;-o-transform: none !important;-moz-transform: none !important;-ms-transform: none !important;-webkit-transform: none !important;transform: none !important;-webkit-animation: none !important;-moz-animation: none !important;-o-animation: none !important;-ms-animation: none !important;animation: none !important;"},"readable-font":{elements:"body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)",style:";font-family: initial !important;"}}},function(i,t,e){"use strict";function _interopRequireDefault(i){return i&&i.__esModule?i:{default:i}}Object.defineProperty(t,"__esModule",{value:!0}),t.configEnglish=t.configHebrew=void 0;var n=e(16),s=_interopRequireDefault(n),a=e(17),l=_interopRequireDefault(a);t.configHebrew={translation:s.default,direction:"rtl"},t.configEnglish={translation:l.default,direction:"ltr"}},function(i,t){i.exports={accessibility_text:"תפריט הנגשה",accessibility_alt:"תפריט הנגשה",font_resize_text:"הגדלת פונט",font_resize_alt:"הגדלת פונט",contrast_high_text:"ניגודיות גבוהה",contrast_high_alt:"ניגודיות גבוהה",links_underline_text:"הדגשת קישורים",links_underline_alt:"הדגשת קישורים",animation_block_text:"חסימת אנימציות",animation_block_alt:"חסימת אנימציות",readable_font_text:"פונט קריא",readable_font_alt:"פונט קריא",reset_configuration_text:"איפוס הגדרות",reset_configuration_alt:"איפוס הגדרות"}},function(i,t){i.exports={accessibility_text:"Accessibility",accessibility_alt:"Accessibility",font_resize_text:"Font Resize",font_resize_alt:"Font Resize",contrast_high_text:"High Contrast",contrast_high_alt:"High Contrast",links_underline_text:"Undeline Links",links_underline_alt:"Undeline Links",animation_block_text:"Block Animations",animation_block_alt:"Block Animations",readable_font_text:"Readable Fonts",readable_font_alt:"Readable Fonts",reset_configuration_text:"Reset Configuration",reset_configuration_alt:"Reset Configuration"}}]);
//# sourceMappingURL=accessibility.js.map