/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(1);
	module.exports = __webpack_require__(19);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _accessibility = __webpack_require__(2);
	
	var _accessibility2 = _interopRequireDefault(_accessibility);
	
	var _accessibility3 = __webpack_require__(10);
	
	var _accessibility4 = _interopRequireDefault(_accessibility3);
	
	var _translationKeys = __webpack_require__(14);
	
	var _translationKeys2 = _interopRequireDefault(_translationKeys);
	
	var _classStyles = __webpack_require__(15);
	
	var _classStyles2 = _interopRequireDefault(_classStyles);
	
	var _default = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var localStorageKey = 'classes';
	
	var AccessibilityPlugin = function () {
	  function AccessibilityPlugin(config) {
	    var _this = this;
	
	    _classCallCheck(this, AccessibilityPlugin);
	
	    var savedClasses = window.localStorage.getItem(localStorageKey);
	    this.documentReady;
	    this._pluginElement = document.createRange().createContextualFragment(_accessibility2.default);
	    this._translationKeys = _translationKeys2.default;
	    this._savedClasses = savedClasses !== null ? JSON.parse(savedClasses) : [];
	    this._possibleClasses = ["enlarge-font", "low-contrast", "high-contrast", "underline-links", "disable-animations", "readable-font"];
	
	    this.constants = {
	      configs: {
	        hebrew: _default.configHebrew,
	        english: _default.configEnglish
	      }
	    };
	
	    this._documetnReadyFunc = function (fn) {
	      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _default.configEnglish;
	
	      _this.setConfig(config);
	      if (_this._savedClasses.length > 0) {
	        _this._savedClasses.forEach(function (className) {
	          return _this._setClass(className, true);
	        });
	      }
	
	      if (typeof _this.documentReady === 'function') {
	        _this.documentReady.bind(_this);
	        _this.documentReady();
	      }
	    };
	
	    if (window.AccessibilityPlugin !== undefined && typeof window.AccessibilityPlugin === 'AccessibilityPlugin') {
	      return window.AccessibilityPlugin;
	    }
	  }
	  // TODO: Implement appending to element other than `body`
	
	
	  _createClass(AccessibilityPlugin, [{
	    key: "append",
	    value: function append() {
	      var toElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	      var pluginPath = "#accessibility-plugin";
	      var querySelector = void 0;
	
	      if (toElement !== null && !("querySelector" in toElement)) {
	        throw new Error("Property passed to toElement: " + toElement + " is not an element");
	      }
	
	      document.body.appendChild(this._pluginElement);
	      querySelector = toElement !== null && !!toElement.querySelector ? "" + pluginPath : "body > " + pluginPath;
	      this._pluginElement = document.querySelector(querySelector);
	      this._pluginElement.addEventListener("click", this._accessibilityPluginClicked.bind(this));
	      this._pluginElement.querySelector(".accessibility-plugin_tab").addEventListener("click", this._openTab.bind(this));
	
	      return this;
	    }
	  }, {
	    key: "setConfig",
	    value: function setConfig(config) {
	      if ("translation" in config) {
	        this.translate(config.translation);
	      }
	
	      if ("direction" in config) {
	        this.changeDirection(config.direction);
	      }
	
	      if ("appendToElement" in config) {
	        this.append(config.appendToElement);
	      } else {
	        this.append();
	      }
	    }
	  }, {
	    key: "translate",
	    value: function translate(translationObject) {
	      if (Object.keys(translationObject) === 0) {
	        throw new Error("Argument translationObject should be an object with keys");
	      }
	
	      for (var key in translationObject) {
	        if (this._translationKeys[key]) {
	          if (this._translationKeys[key].type == "img") {
	            this._pluginElement.querySelector(this._translationKeys[key].path).setAttribute("alt", translationObject[key]);
	          } else if (this._translationKeys[key].type == "span") {
	            this._pluginElement.querySelector(this._translationKeys[key].path).textContent = translationObject[key];
	          } else {
	            console.error("Unsupported translation type " + this._translationKeys[key].type);
	          }
	        } else {
	          console.error("Unsupported trnslation key " + key);
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: "changeDirection",
	    value: function changeDirection() {
	      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ltr";
	
	      if (!!dir && (dir === "ltr" || dir === "rtl")) {
	        if (this._pluginElement.setAttribute) {
	          this._pluginElement.setAttribute("dir", dir);
	        } else {
	          this._pluginElement.firstChild.setAttribute("dir", dir);
	        }
	      } else {
	        throw new Error("dir argument should be set to either \"ltr\" or \"rtl\" not \"" + dir + "\"");
	      }
	
	      return this;
	    }
	  }, {
	    key: "resetConfiguration",
	    value: function resetConfiguration() {
	      var _this2 = this;
	
	      this._savedClasses.forEach(function (className) {
	        _classStyles2.default[className].forEach(function (element) {
	          if (element.hasOwnProperty('enlarge')) {
	            _this2._enlargeProperty(document.querySelectorAll(element.elements), false, element.enlarge);
	          } else {
	            _this2._setStyle(document.querySelectorAll(element.elements), false, element.style);
	          }
	        });
	      });
	
	      this._savedClasses = [];
	      window.localStorage.removeItem(localStorageKey);
	      //TODO: Remove hardcoded jQuery test and add a full sweep over third party libraries
	      if ("jQuery" in window || "$" in window) {
	        window.jQuery.fx.off = false;
	      }
	    }
	  }, {
	    key: "_accessibilityPluginClicked",
	    value: function _accessibilityPluginClicked(event) {
	      var target = event.target;
	
	      target = target.classList.contains("control") && !!target.dataset.addClass ? target : target.parentNode;
	
	      if (target.id === "reset") {
	        this.resetConfiguration();
	      } else if (target.dataset.addClass !== undefined) {
	        this._setClass(target.dataset.addClass);
	      }
	    }
	  }, {
	    key: "_setClass",
	    value: function _setClass(classToAdd) {
	      var _this3 = this;
	
	      var fromLocal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	      var styleDefs = _classStyles2.default[classToAdd];
	      styleDefs.forEach(function (styleDef) {
	        var elements = document.querySelectorAll(styleDef.elements);
	        if (styleDef.hasOwnProperty('enlarge')) {
	          if (fromLocal === true) {
	            _this3._enlargeProperty(elements, true, styleDef.enlarge);
	          } else if (_this3._savedClasses.includes(classToAdd)) {
	            _this3._enlargeProperty(elements, false, styleDef.enlarge);
	          } else {
	            _this3._enlargeProperty(elements, true, styleDef.enlarge);
	          }
	        } else {
	          if (fromLocal === true) {
	            _this3._setStyle(elements, true, styleDef.style);
	          } else if (_this3._savedClasses.includes(classToAdd)) {
	            _this3._setStyle(elements, false, styleDef.style);
	          } else {
	            _this3._setStyle(elements, true, styleDef.style);
	          }
	        }
	      });
	
	      if (fromLocal === true) {} else if (this._savedClasses.includes(classToAdd)) {
	        this._savedClasses.splice(this._savedClasses.findIndex(function (elem) {
	          return elem === classToAdd;
	        }), 1);
	      } else {
	        this._savedClasses.push(classToAdd);
	      }
	
	      window.localStorage.setItem(localStorageKey, JSON.stringify(this._savedClasses));
	      //TODO: Remove hardcoded jQuery test and add a full sweep over third party libraries
	      if ("jQuery" in window) {
	        if (this._savedClasses.includes("disable-animations")) {
	          window.jQuery.fx.off = true;
	        } else if (window.jQuery.fx.off === true && this._savedClasses.includes("disable-animations") === false) {
	          window.jQuery.fx.off = false;
	        } else {
	          window.jQuery.fx.off = false;
	        }
	      }
	    }
	  }, {
	    key: "_enlargeProperty",
	    value: function _enlargeProperty(elements) {
	      var enlarge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var attrs_dict = arguments[2];
	
	      elements.forEach(function (elem) {
	        if (enlarge === true) {
	          var cssAttrValue = parseFloat(window.getComputedStyle(elem).getPropertyValue(attrs_dict['attr']));
	          elem.style.setProperty(attrs_dict['attr'], parseFloat(cssAttrValue) + parseFloat(cssAttrValue) * attrs_dict['value'] + 'px');
	        } else {
	          elem.style.removeProperty(attrs_dict['attr']);
	        }
	      });
	    }
	  }, {
	    key: "_setStyle",
	    value: function _setStyle(elements) {
	      var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var style = arguments[2];
	
	      elements.forEach(function (elem) {
	        for (var key in style) {
	          if (add === true) {
	            elem.style.setProperty(key, style[key]);
	          } else {
	            elem.style.removeProperty(key);
	          }
	        }
	      });
	    }
	  }, {
	    key: "_openTab",
	    value: function _openTab() {
	      var className = "open";
	
	      if (this._pluginElement.classList.contains(className)) {
	        this._pluginElement.classList.remove(className);
	      } else {
	        this._pluginElement.classList.add(className);
	      }
	    }
	  }]);
	
	  return AccessibilityPlugin;
	}();
	
	if ("AccessibilityPlugin" in window) {
	  console.error("\n    Property AccessibilityPlugin is already defined on window.\n    Please change the name of the added \"AccessibilityPlugin\" and retry.\n  ");
	} else {
	  window.AccessibilityPlugin = new AccessibilityPlugin();
	}
	
	document.addEventListener("DOMContentLoaded", function (event) {
	  return window.AccessibilityPlugin._documetnReadyFunc();
	});
	
	exports.default = AccessibilityPlugin;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = "<div id=\"accessibility-plugin\" dir=\"ltr\" class=\"accessibility-plugin_wrapper\">\n    <div class=\"accessibility-plugin_tab\">\n        <img src=\"" + __webpack_require__(3) + "\" alt=\"\" class=\"accessibility-plugin_img\"/>\n    </div>\n    <h3 class=\"accessibility-plugin_header\"></h3>\n    <div id=\"font\" class=\"accessibility-plugin_control\" data-add-class=\"enlarge-font\">\n        <span class=\"accessibility-plugin_text\"></span>\n        <img src=\"" + __webpack_require__(4) + "\" alt=\"\" class=\"accessibility-plugin_img\"/>\n    </div>\n    <div id=\"contrast-high\" class=\"accessibility-plugin_control\" data-add-class=\"high-contrast\">\n        <span class=\"accessibility-plugin_text\"></span>\n        <img src=\"" + __webpack_require__(5) + "\" alt=\"\" class=\"accessibility-plugin_img\"/>\n    </div>\n    <div id=\"links\" class=\"accessibility-plugin_control\" data-add-class=\"underline-links\">\n        <span class=\"accessibility-plugin_text\"></span>\n        <img src=\"" + __webpack_require__(6) + "\" alt=\"\" class=\"accessibility-plugin_img\"/>\n    </div>\n    <div id=\"animation\" class=\"accessibility-plugin_control\" data-add-class=\"disable-animations\">\n        <span class=\"accessibility-plugin_text\"></span>\n        <img src=\"" + __webpack_require__(7) + "\" alt=\"\" class=\"accessibility-plugin_img\"/>\n    </div>\n    <div id=\"readable\" class=\"accessibility-plugin_control\" data-add-class=\"readable-font\">\n        <span class=\"accessibility-plugin_text\"></span>\n        <img src=\"" + __webpack_require__(8) + "\" alt=\"\" class=\"accessibility-plugin_img\"/>\n    </div>\n    <div id=\"reset\" class=\"accessibility-plugin_control\">\n        <span class=\"accessibility-plugin_text\"></span>\n        <img src=\"" + __webpack_require__(9) + "\" alt=\"\" class=\"accessibility-plugin_img\"/>\n    </div>\n</div>\n";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iNCIgcj0iMiIvPgogICAgPHBhdGggZD0iTTE5IDEzdi0yYy0xLjU0LjAyLTMuMDktLjc1LTQuMDctMS44M2wtMS4yOS0xLjQzYy0uMTctLjE5LS4zOC0uMzQtLjYxLS40NS0uMDEgMC0uMDEtLjAxLS4wMi0uMDFIMTNjLS4zNS0uMi0uNzUtLjMtMS4xOS0uMjZDMTAuNzYgNy4xMSAxMCA4LjA0IDEwIDkuMDlWMTVjMCAxLjEuOSAyIDIgMmg1djVoMnYtNS41YzAtMS4xLS45LTItMi0yaC0zdi0zLjQ1YzEuMjkgMS4wNyAzLjI1IDEuOTQgNSAxLjk1em0tNi4xNyA1Yy0uNDEgMS4xNi0xLjUyIDItMi44MyAyLTEuNjYgMC0zLTEuMzQtMy0zIDAtMS4zMS44NC0yLjQxIDItMi44M1YxMi4xYy0yLjI4LjQ2LTQgMi40OC00IDQuOSAwIDIuNzYgMi4yNCA1IDUgNSAyLjQyIDAgNC40NC0xLjcyIDQuOS00aC0yLjA3eiIvPgo8L3N2Zz4="

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik05IDR2M2g1djEyaDNWN2g1VjRIOXptLTYgOGgzdjdoM3YtN2gzVjlIM3YzeiIvPgo8L3N2Zz4="

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0yMCA4LjY5VjRoLTQuNjlMMTIgLjY5IDguNjkgNEg0djQuNjlMLjY5IDEyIDQgMTUuMzFWMjBoNC42OUwxMiAyMy4zMSAxNS4zMSAyMEgyMHYtNC42OUwyMy4zMSAxMiAyMCA4LjY5ek0xMiAxOGMtMy4zMSAwLTYtMi42OS02LTZzMi42OS02IDYtNiA2IDIuNjkgNiA2LTIuNjkgNi02IDZ6bTAtMTBjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00eiIvPgo8L3N2Zz4="

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAxN2MzLjMxIDAgNi0yLjY5IDYtNlYzaC0yLjV2OGMwIDEuOTMtMS41NyAzLjUtMy41IDMuNVM4LjUgMTIuOTMgOC41IDExVjNINnY4YzAgMy4zMSAyLjY5IDYgNiA2em0tNyAydjJoMTR2LTJINXoiLz4KPC9zdmc+"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek00IDEyYzAtNC40MiAzLjU4LTggOC04IDEuODUgMCAzLjU1LjYzIDQuOSAxLjY5TDUuNjkgMTYuOUM0LjYzIDE1LjU1IDQgMTMuODUgNCAxMnptOCA4Yy0xLjg1IDAtMy41NS0uNjMtNC45LTEuNjlMMTguMzEgNy4xQzE5LjM3IDguNDUgMjAgMTAuMTUgMjAgMTJjMCA0LjQyLTMuNTggOC04IDh6Ii8+Cjwvc3ZnPg=="

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBiYXNlUHJvZmlsZT0idGlueSIgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik05LjkzIDEzLjVoNC4xNEwxMiA3Ljk4ek0yMCAySDRjLTEuMSAwLTIgLjktMiAydjE2YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTQuMDUgMTYuNWwtMS4xNC0zSDkuMTdsLTEuMTIgM0g1Ljk2bDUuMTEtMTNoMS44Nmw1LjExIDEzaC0yLjA5eiIvPgo8L3N2Zz4="

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xOS40MyAxMi45OGMuMDQtLjMyLjA3LS42NC4wNy0uOThzLS4wMy0uNjYtLjA3LS45OGwyLjExLTEuNjVjLjE5LS4xNS4yNC0uNDIuMTItLjY0bC0yLTMuNDZjLS4xMi0uMjItLjM5LS4zLS42MS0uMjJsLTIuNDkgMWMtLjUyLS40LTEuMDgtLjczLTEuNjktLjk4bC0uMzgtMi42NUMxNC40NiAyLjE4IDE0LjI1IDIgMTQgMmgtNGMtLjI1IDAtLjQ2LjE4LS40OS40MmwtLjM4IDIuNjVjLS42MS4yNS0xLjE3LjU5LTEuNjkuOThsLTIuNDktMWMtLjIzLS4wOS0uNDkgMC0uNjEuMjJsLTIgMy40NmMtLjEzLjIyLS4wNy40OS4xMi42NGwyLjExIDEuNjVjLS4wNC4zMi0uMDcuNjUtLjA3Ljk4cy4wMy42Ni4wNy45OGwtMi4xMSAxLjY1Yy0uMTkuMTUtLjI0LjQyLS4xMi42NGwyIDMuNDZjLjEyLjIyLjM5LjMuNjEuMjJsMi40OS0xYy41Mi40IDEuMDguNzMgMS42OS45OGwuMzggMi42NWMuMDMuMjQuMjQuNDIuNDkuNDJoNGMuMjUgMCAuNDYtLjE4LjQ5LS40MmwuMzgtMi42NWMuNjEtLjI1IDEuMTctLjU5IDEuNjktLjk4bDIuNDkgMWMuMjMuMDkuNDkgMCAuNjEtLjIybDItMy40NmMuMTItLjIyLjA3LS40OS0uMTItLjY0bC0yLjExLTEuNjV6TTEyIDE1LjVjLTEuOTMgMC0zLjUtMS41Ny0zLjUtMy41czEuNTctMy41IDMuNS0zLjUgMy41IDEuNTcgMy41IDMuNS0xLjU3IDMuNS0zLjUgMy41eiIvPgo8L3N2Zz4="

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./accessibility.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./accessibility.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "/*defaults*/\n.accessibility-plugin_wrapper h1, .accessibility-plugin_wrapper h2, .accessibility-plugin_wrapper h3, .accessibility-plugin_wrapper h4, .accessibility-plugin_wrapper h5, .accessibility-plugin_wrapper h6 {margin: 0;padding: 0;font-weight: normal;font-family: Arial, Helvetica, sans-serif;}.accessibility-plugin_wrapper p, .accessibility-plugin_wrapper th, .accessibility-plugin_wrapper td, .accessibility-plugin_wrapper li, .accessibility-plugin_wrapper dd, .accessibility-plugin_wrapper dt, .accessibility-plugin_wrapper ul, .accessibility-plugin_wrapper ol, .accessibility-plugin_wrapper blockquote, .accessibility-plugin_wrapper q, .accessibility-plugin_wrapper acronym, .accessibility-plugin_wrapper abbr, .accessibility-plugin_wrapper a, .accessibility-plugin_wrapper input, .accessibility-plugin_wrapper select, .accessibility-plugin_wrapper textarea {margin: 0;padding: 0;font: normal normal normal 1em/1.25 Arial, Helvetica, sans-serif;}.accessibility-plugin_wrapper blockquote {margin: 1.25em;padding: 1.25em;}.accessibility-plugin_wrapper q {font-style: italic;}.accessibility-plugin_wrapper acronym, .accessibility-plugin_wrapper abbr {cursor: help;border-bottom: 1px dashed;}.accessibility-plugin_wrapper small {font-size: .85em;}.accessibility-plugin_wrapper big {font-size: 1.2em;}.accessibility-plugin_wrapper a, .accessibility-plugin_wrapper a:link, .accessibility-plugin_wrapper a:visited, .accessibility-plugin_wrapper a:active, .accessibility-plugin_wrapper a:hover {text-decoration: underline;}.accessibility-plugin_wrapper img {border: none;}.accessibility-plugin_wrapper table {margin: 0;padding: 0;border: none;}.accessibility-plugin_wrapper form {margin: 0;padding: 0;display: inline;}.accessibility-plugin_wrapper label {cursor: pointer;} .accessibility-plugin_wrapper *, *:before, *:after {box-sizing: border-box;}\n\n.accessibility-plugin_wrapper {\n  position: fixed;\n  top: 45%;\n  height: auto;\n  width: 280px;\n  border: 1px solid #4157AF;\n  padding: 10px;\n  box-sizing: border-box !important;\n  left: -280px;\n  transition: left 0.5s, right 0.5s;\n  background: #FFF;\n  z-index: 1;\n}\n\n.accessibility-plugin_wrapper.open {\n  left: 0;\n}\n\n.accessibility-plugin_wrapper > .accessibility-plugin_tab {\n  position: absolute;\n  cursor: pointer;\n  height: 40px;\n  width: 40px;\n  top: -1px;\n  right: -40px;\n}\n\n.accessibility-plugin_wrapper > .accessibility-plugin_tab > .accessibility-plugin_img {\n  height: 100%;\n  width: 100%;\n  text-align: center;\n  background: #4157AF !important;\n}\n\n.accessibility-plugin_wrapper > .accessibility-plugin_header {\n  text-align: center;\n}\n\n.accessibility-plugin_wrapper > .accessibility-plugin_control {\n  cursor: pointer;\n  overflow: hidden;\n  margin: 10px 0;\n}\n\n.accessibility-plugin_wrapper > .accessibility-plugin_control > .accessibility-plugin_img {\n  display: block;\n}\n\n.accessibility-plugin_wrapper > .accessibility-plugin_control > .accessibility-plugin_text {\n  display: block;\n  line-height: 22px;\n}\n\n.accessibility-plugin_wrapper[dir=\"rtl\"] {\n  left: initial;\n  right: -280px;\n}\n\n.accessibility-plugin_wrapper[dir=\"rtl\"].open {\n  right: 0px;\n}\n\n.accessibility-plugin_wrapper[dir=\"rtl\"] .accessibility-plugin_tab {\n  right: initial;\n  left: -40px;\n}\n\n.accessibility-plugin_wrapper[dir=\"ltr\"] > .accessibility-plugin_control > .accessibility-plugin_img {\n  float: right;\n}\n\n.accessibility-plugin_wrapper[dir=\"ltr\"] > .accessibility-plugin_control > .accessibility-plugin_text {\n  float: left;\n}\n\n.accessibility-plugin_wrapper[dir=\"rtl\"] > .accessibility-plugin_control > .accessibility-plugin_img {\n  float: left;\n}\n\n.accessibility-plugin_wrapper[dir=\"rtl\"] > .accessibility-plugin_control > .accessibility-plugin_text {\n  float: right;\n}\n\nbody.high-contrast .accessibility-plugin_wrapper {\n  background: #000000 !important;\n}\n\nbody.high-contrast .accessibility-plugin_wrapper img {\n  background: #FFF;\n}\n", ""]);
	
	// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = {
		"accessibility_text": {
			"type": "span",
			"path": "#accessibility-plugin > .accessibility-plugin_header"
		},
		"accessibility_alt": {
			"type": "img",
			"path": "#accessibility-plugin > .accessibility-plugin_tab > .accessibility-plugin_img"
		},
		"font_resize_text": {
			"type": "span",
			"path": "#accessibility-plugin > .accessibility-plugin_control#font > .accessibility-plugin_text"
		},
		"font_resize_alt": {
			"type": "img",
			"path": "#accessibility-plugin > .accessibility-plugin_control#font > .accessibility-plugin_img"
		},
		"contrast_high_text": {
			"type": "span",
			"path": "#accessibility-plugin > .accessibility-plugin_control#contrast-high > .accessibility-plugin_text"
		},
		"contrast_high_alt": {
			"type": "img",
			"path": "#accessibility-plugin > .accessibility-plugin_control#contrast-high > .accessibility-plugin_img"
		},
		"links_underline_text": {
			"type": "span",
			"path": "#accessibility-plugin > .accessibility-plugin_control#links > .accessibility-plugin_text"
		},
		"links_underline_alt": {
			"type": "img",
			"path": "#accessibility-plugin > .accessibility-plugin_control#links > .accessibility-plugin_img"
		},
		"animation_block_text": {
			"type": "span",
			"path": "#accessibility-plugin > .accessibility-plugin_control#animation > .accessibility-plugin_text"
		},
		"animation_block_alt": {
			"type": "img",
			"path": "#accessibility-plugin > .accessibility-plugin_control#animation > .accessibility-plugin_img"
		},
		"readable_font_text": {
			"type": "span",
			"path": "#accessibility-plugin > .accessibility-plugin_control#readable > .accessibility-plugin_text"
		},
		"readable_font_alt": {
			"type": "img",
			"path": "#accessibility-plugin > .accessibility-plugin_control#readable > .accessibility-plugin_img"
		},
		"reset_configuration_text": {
			"type": "span",
			"path": "#accessibility-plugin > .accessibility-plugin_control#reset > .accessibility-plugin_text"
		},
		"reset_configuration_alt": {
			"type": "img",
			"path": "#accessibility-plugin > .accessibility-plugin_control#reset > .accessibility-plugin_img"
		}
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = {
		"enlarge-font": [
			{
				"elements": "body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)",
				"enlarge": {
					"attr": "font-size",
					"value": 0.1
				}
			}
		],
		"high-contrast": [
			{
				"elements": "body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)",
				"style": {
					"background-color": "#000000",
					"color": "rgb(30, 255, 35)",
					"background-image": "none"
				}
			},
			{
				"elements": "button",
				"style": {
					"border": "solid 2px rgb(30, 255, 35)"
				}
			}
		],
		"underline-links": [
			{
				"elements": "body a[href]",
				"style": {
					"text-decoration": "underline"
				}
			}
		],
		"disable-animations": [
			{
				"elements": "body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)",
				"style": {
					"-o-transition-property": "none",
					"-moz-transition-property": "none",
					"-ms-transition-property": "none",
					"-webkit-transition-property": "none",
					"transition-property": "none",
					"-o-transform": "none",
					"-moz-transform": "none",
					"-ms-transform": "none",
					"-webkit-transform": "none",
					"transform": "none",
					"-webkit-animation": "none",
					"-moz-animation": "none",
					"-o-animation": "none",
					"-ms-animation": "none",
					"animation": "none"
				}
			}
		],
		"readable-font": [
			{
				"elements": "body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img):not(.fa)",
				"style": {
					"font-family": "initial"
				}
			}
		]
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configEnglish = exports.configHebrew = undefined;
	
	var _hebrew = __webpack_require__(17);
	
	var _hebrew2 = _interopRequireDefault(_hebrew);
	
	var _english = __webpack_require__(18);
	
	var _english2 = _interopRequireDefault(_english);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var configHebrew = exports.configHebrew = {
	  "translation": _hebrew2.default,
	  "direction": "rtl"
	};
	
	var configEnglish = exports.configEnglish = {
	  "translation": _english2.default,
	  "direction": "ltr"
	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = {
		"accessibility_text": "תפריט הנגשה",
		"accessibility_alt": "תפריט הנגשה",
		"font_resize_text": "הגדלת פונט",
		"font_resize_alt": "הגדלת פונט",
		"contrast_high_text": "ניגודיות גבוהה",
		"contrast_high_alt": "ניגודיות גבוהה",
		"links_underline_text": "הדגשת קישורים",
		"links_underline_alt": "הדגשת קישורים",
		"animation_block_text": "חסימת אנימציות",
		"animation_block_alt": "חסימת אנימציות",
		"readable_font_text": "פונט קריא",
		"readable_font_alt": "פונט קריא",
		"reset_configuration_text": "איפוס הגדרות",
		"reset_configuration_alt": "איפוס הגדרות"
	};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = {
		"accessibility_text": "Accessibility",
		"accessibility_alt": "Accessibility",
		"font_resize_text": "Font Resize",
		"font_resize_alt": "Font Resize",
		"contrast_high_text": "High Contrast",
		"contrast_high_alt": "High Contrast",
		"links_underline_text": "Undeline Links",
		"links_underline_alt": "Undeline Links",
		"animation_block_text": "Block Animations",
		"animation_block_alt": "Block Animations",
		"readable_font_text": "Readable Fonts",
		"readable_font_alt": "Readable Fonts",
		"reset_configuration_text": "Reset Configuration",
		"reset_configuration_alt": "Reset Configuration"
	};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	"use strict";
	
	!function (i) {
	  function __webpack_require__(t) {
	    if (e[t]) return e[t].exports;var n = e[t] = { exports: {}, id: t, loaded: !1 };return i[t].call(n.exports, n, n.exports, __webpack_require__), n.loaded = !0, n.exports;
	  }var e = {};return __webpack_require__.m = i, __webpack_require__.c = e, __webpack_require__.p = "", __webpack_require__(0);
	}([function (i, e, t) {
	  "use strict";
	  function _interopRequireDefault(i) {
	    return i && i.__esModule ? i : { default: i };
	  }function _classCallCheck(i, e) {
	    if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function");
	  }Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
	    function defineProperties(i, e) {
	      for (var t = 0; t < e.length; t++) {
	        var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(i, n.key, n);
	      }
	    }return function (i, e, t) {
	      return e && defineProperties(i.prototype, e), t && defineProperties(i, t), i;
	    };
	  }(),
	      s = t(1),
	      a = _interopRequireDefault(s),
	      l = t(9),
	      r = (_interopRequireDefault(l), t(13)),
	      o = _interopRequireDefault(r),
	      c = t(14),
	      u = _interopRequireDefault(c),
	      p = t(15),
	      g = "classes",
	      y = function () {
	    function AccessibilityPlugin(i) {
	      var e = this;_classCallCheck(this, AccessibilityPlugin);var t = window.localStorage.getItem(g);if (this.documentReady, this._pluginElement = document.createRange().createContextualFragment(a.default), this._translationKeys = o.default, this._savedClasses = null !== t ? JSON.parse(t) : [], this._possibleClasses = ["enlarge-font", "low-contrast", "high-contrast", "underline-links", "disable-animations", "readable-font"], this.constants = { configs: { hebrew: p.configHebrew, english: p.configEnglish } }, this._documetnReadyFunc = function (i) {
	        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p.configEnglish;e.setConfig(t), e._savedClasses.length > 0 && e._savedClasses.forEach(function (i) {
	          return e._setClass(i, !0);
	        }), "function" == typeof e.documentReady && (e.documentReady.bind(e), e.documentReady());
	      }, void 0 !== window.AccessibilityPlugin && "AccessibilityPlugin" == typeof window.AccessibilityPlugin) return window.AccessibilityPlugin;
	    }return n(AccessibilityPlugin, [{ key: "append", value: function value() {
	        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
	            e = "#accessibility-plugin",
	            t = void 0;if (null !== i && !("querySelector" in i)) throw new Error("Property passed to toElement: " + i + " is not an element");return document.body.appendChild(this._pluginElement), t = null !== i && i.querySelector ? "" + e : "body > " + e, this._pluginElement = document.querySelector(t), this._pluginElement.addEventListener("click", this._accessibilityPluginClicked.bind(this)), this._pluginElement.querySelector(".accessibility-plugin_tab").addEventListener("click", this._openTab.bind(this)), this;
	      } }, { key: "setConfig", value: function value(i) {
	        "translation" in i && this.translate(i.translation), "direction" in i && this.changeDirection(i.direction), "appendToElement" in i ? this.append(i.appendToElement) : this.append();
	      } }, { key: "translate", value: function value(i) {
	        if (0 === Object.keys(i)) throw new Error("Argument translationObject should be an object with keys");for (var e in i) {
	          this._translationKeys[e] ? "img" == this._translationKeys[e].type ? this._pluginElement.querySelector(this._translationKeys[e].path).setAttribute("alt", i[e]) : "span" == this._translationKeys[e].type ? this._pluginElement.querySelector(this._translationKeys[e].path).textContent = i[e] : console.error("Unsupported translation type " + this._translationKeys[e].type) : console.error("Unsupported trnslation key " + e);
	        }return this;
	      } }, { key: "changeDirection", value: function value() {
	        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "ltr";if (!i || "ltr" !== i && "rtl" !== i) throw new Error('dir argument should be set to either "ltr" or "rtl" not "' + i + '"');return this._pluginElement.setAttribute ? this._pluginElement.setAttribute("dir", i) : this._pluginElement.firstChild.setAttribute("dir", i), this;
	      } }, { key: "resetConfiguration", value: function value() {
	        var i = this;this._savedClasses.forEach(function (e) {
	          u.default[e].forEach(function (e) {
	            e.hasOwnProperty("enlarge") ? i._enlargeProperty(document.querySelectorAll(e.elements), !1, e.enlarge) : i._setStyle(document.querySelectorAll(e.elements), !1, e.style);
	          });
	        }), this._savedClasses = [], window.localStorage.removeItem(g), ("jQuery" in window || "$" in window) && (window.jQuery.fx.off = !1);
	      } }, { key: "_accessibilityPluginClicked", value: function value(i) {
	        var e = i.target;e = e.classList.contains("control") && e.dataset.addClass ? e : e.parentNode, "reset" === e.id ? this.resetConfiguration() : void 0 !== e.dataset.addClass && this._setClass(e.dataset.addClass);
	      } }, { key: "_setClass", value: function value(i) {
	        var e = this,
	            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
	            n = u.default[i];n.forEach(function (n) {
	          var s = document.querySelectorAll(n.elements);n.hasOwnProperty("enlarge") ? t === !0 ? e._enlargeProperty(s, !0, n.enlarge) : e._savedClasses.includes(i) ? e._enlargeProperty(s, !1, n.enlarge) : e._enlargeProperty(s, !0, n.enlarge) : t === !0 ? e._setStyle(s, !0, n.style) : e._savedClasses.includes(i) ? e._setStyle(s, !1, n.style) : e._setStyle(s, !0, n.style);
	        }), t === !0 || (this._savedClasses.includes(i) ? this._savedClasses.splice(this._savedClasses.findIndex(function (e) {
	          return e === i;
	        }), 1) : this._savedClasses.push(i)), window.localStorage.setItem(g, JSON.stringify(this._savedClasses)), "jQuery" in window && (this._savedClasses.includes("disable-animations") ? window.jQuery.fx.off = !0 : window.jQuery.fx.off === !0 && this._savedClasses.includes("disable-animations") === !1 ? window.jQuery.fx.off = !1 : window.jQuery.fx.off = !1);
	      } }, { key: "_enlargeProperty", value: function value(i) {
	        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
	            t = arguments[2];i.forEach(function (i) {
	          if (e === !0) {
	            var n = parseFloat(window.getComputedStyle(i).getPropertyValue(t.attr));i.style.setProperty(t.attr, parseFloat(n) + parseFloat(n) * t.value + "px");
	          } else i.style.removeProperty(t.attr);
	        });
	      } }, { key: "_setStyle", value: function value(i) {
	        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
	            t = arguments[2];i.forEach(function (i) {
	          for (var n in t) {
	            e === !0 ? i.style.setProperty(n, t[n]) : i.style.removeProperty(n);
	          }
	        });
	      } }, { key: "_openTab", value: function value() {
	        var i = "open";this._pluginElement.classList.contains(i) ? this._pluginElement.classList.remove(i) : this._pluginElement.classList.add(i);
	      } }]), AccessibilityPlugin;
	  }();"AccessibilityPlugin" in window ? console.error('\n    Property AccessibilityPlugin is already defined on window.\n    Please change the name of the added "AccessibilityPlugin" and retry.\n  ') : window.AccessibilityPlugin = new y(), document.addEventListener("DOMContentLoaded", function (i) {
	    return window.AccessibilityPlugin._documetnReadyFunc();
	  }), e.default = y;
	}, function (i, e, t) {
	  i.exports = "<div id=accessibility-plugin dir=ltr class=accessibility-plugin_wrapper> <div class=accessibility-plugin_tab> <img src=" + t(2) + ' alt="" class=accessibility-plugin_img /> </div> <h3 class=accessibility-plugin_header></h3> <div id=font class=accessibility-plugin_control data-add-class=enlarge-font> <span class=accessibility-plugin_text></span> <img src=' + t(3) + ' alt="" class=accessibility-plugin_img /> </div> <div id=contrast-high class=accessibility-plugin_control data-add-class=high-contrast> <span class=accessibility-plugin_text></span> <img src=' + t(4) + ' alt="" class=accessibility-plugin_img /> </div> <div id=links class=accessibility-plugin_control data-add-class=underline-links> <span class=accessibility-plugin_text></span> <img src=' + t(5) + ' alt="" class=accessibility-plugin_img /> </div> <div id=animation class=accessibility-plugin_control data-add-class=disable-animations> <span class=accessibility-plugin_text></span> <img src=' + t(6) + ' alt="" class=accessibility-plugin_img /> </div> <div id=readable class=accessibility-plugin_control data-add-class=readable-font> <span class=accessibility-plugin_text></span> <img src=' + t(7) + ' alt="" class=accessibility-plugin_img /> </div> <div id=reset class=accessibility-plugin_control> <span class=accessibility-plugin_text></span> <img src=' + t(8) + ' alt="" class=accessibility-plugin_img /> </div> </div> ';
	}, function (i, e) {
	  i.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iNCIgcj0iMiIvPgogICAgPHBhdGggZD0iTTE5IDEzdi0yYy0xLjU0LjAyLTMuMDktLjc1LTQuMDctMS44M2wtMS4yOS0xLjQzYy0uMTctLjE5LS4zOC0uMzQtLjYxLS40NS0uMDEgMC0uMDEtLjAxLS4wMi0uMDFIMTNjLS4zNS0uMi0uNzUtLjMtMS4xOS0uMjZDMTAuNzYgNy4xMSAxMCA4LjA0IDEwIDkuMDlWMTVjMCAxLjEuOSAyIDIgMmg1djVoMnYtNS41YzAtMS4xLS45LTItMi0yaC0zdi0zLjQ1YzEuMjkgMS4wNyAzLjI1IDEuOTQgNSAxLjk1em0tNi4xNyA1Yy0uNDEgMS4xNi0xLjUyIDItMi44MyAyLTEuNjYgMC0zLTEuMzQtMy0zIDAtMS4zMS44NC0yLjQxIDItMi44M1YxMi4xYy0yLjI4LjQ2LTQgMi40OC00IDQuOSAwIDIuNzYgMi4yNCA1IDUgNSAyLjQyIDAgNC40NC0xLjcyIDQuOS00aC0yLjA3eiIvPgo8L3N2Zz4=";
	}, function (i, e) {
	  i.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik05IDR2M2g1djEyaDNWN2g1VjRIOXptLTYgOGgzdjdoM3YtN2gzVjlIM3YzeiIvPgo8L3N2Zz4=";
	}, function (i, e) {
	  i.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0yMCA4LjY5VjRoLTQuNjlMMTIgLjY5IDguNjkgNEg0djQuNjlMLjY5IDEyIDQgMTUuMzFWMjBoNC42OUwxMiAyMy4zMSAxNS4zMSAyMEgyMHYtNC42OUwyMy4zMSAxMiAyMCA4LjY5ek0xMiAxOGMtMy4zMSAwLTYtMi42OS02LTZzMi42OS02IDYtNiA2IDIuNjkgNiA2LTIuNjkgNi02IDZ6bTAtMTBjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00eiIvPgo8L3N2Zz4=";
	}, function (i, e) {
	  i.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAxN2MzLjMxIDAgNi0yLjY5IDYtNlYzaC0yLjV2OGMwIDEuOTMtMS41NyAzLjUtMy41IDMuNVM4LjUgMTIuOTMgOC41IDExVjNINnY4YzAgMy4zMSAyLjY5IDYgNiA2em0tNyAydjJoMTR2LTJINXoiLz4KPC9zdmc+";
	}, function (i, e) {
	  i.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek00IDEyYzAtNC40MiAzLjU4LTggOC04IDEuODUgMCAzLjU1LjYzIDQuOSAxLjY5TDUuNjkgMTYuOUM0LjYzIDE1LjU1IDQgMTMuODUgNCAxMnptOCA4Yy0xLjg1IDAtMy41NS0uNjMtNC45LTEuNjlMMTguMzEgNy4xQzE5LjM3IDguNDUgMjAgMTAuMTUgMjAgMTJjMCA0LjQyLTMuNTggOC04IDh6Ii8+Cjwvc3ZnPg==";
	}, function (i, e) {
	  i.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBiYXNlUHJvZmlsZT0idGlueSIgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik05LjkzIDEzLjVoNC4xNEwxMiA3Ljk4ek0yMCAySDRjLTEuMSAwLTIgLjktMiAydjE2YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTQuMDUgMTYuNWwtMS4xNC0zSDkuMTdsLTEuMTIgM0g1Ljk2bDUuMTEtMTNoMS44Nmw1LjExIDEzaC0yLjA5eiIvPgo8L3N2Zz4=";
	}, function (i, e) {
	  i.exports = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xOS40MyAxMi45OGMuMDQtLjMyLjA3LS42NC4wNy0uOThzLS4wMy0uNjYtLjA3LS45OGwyLjExLTEuNjVjLjE5LS4xNS4yNC0uNDIuMTItLjY0bC0yLTMuNDZjLS4xMi0uMjItLjM5LS4zLS42MS0uMjJsLTIuNDkgMWMtLjUyLS40LTEuMDgtLjczLTEuNjktLjk4bC0uMzgtMi42NUMxNC40NiAyLjE4IDE0LjI1IDIgMTQgMmgtNGMtLjI1IDAtLjQ2LjE4LS40OS40MmwtLjM4IDIuNjVjLS42MS4yNS0xLjE3LjU5LTEuNjkuOThsLTIuNDktMWMtLjIzLS4wOS0uNDkgMC0uNjEuMjJsLTIgMy40NmMtLjEzLjIyLS4wNy40OS4xMi42NGwyLjExIDEuNjVjLS4wNC4zMi0uMDcuNjUtLjA3Ljk4cy4wMy42Ni4wNy45OGwtMi4xMSAxLjY1Yy0uMTkuMTUtLjI0LjQyLS4xMi42NGwyIDMuNDZjLjEyLjIyLjM5LjMuNjEuMjJsMi40OS0xYy41Mi40IDEuMDguNzMgMS42OS45OGwuMzggMi42NWMuMDMuMjQuMjQuNDIuNDkuNDJoNGMuMjUgMCAuNDYtLjE4LjQ5LS40MmwuMzgtMi42NWMuNjEtLjI1IDEuMTctLjU5IDEuNjktLjk4bDIuNDkgMWMuMjMuMDkuNDkgMCAuNjEtLjIybDItMy40NmMuMTItLjIyLjA3LS40OS0uMTItLjY0bC0yLjExLTEuNjV6TTEyIDE1LjVjLTEuOTMgMC0zLjUtMS41Ny0zLjUtMy41czEuNTctMy41IDMuNS0zLjUgMy41IDEuNTcgMy41IDMuNS0xLjU3IDMuNS0zLjUgMy41eiIvPgo8L3N2Zz4=";
	}, function (i, e, t) {
	  var n = t(10);"string" == typeof n && (n = [[i.id, n, ""]]);t(12)(n, {});n.locals && (i.exports = n.locals);
	}, function (i, e, t) {
	  e = i.exports = t(11)(), e.push([i.id, ".accessibility-plugin_wrapper h1,.accessibility-plugin_wrapper h2,.accessibility-plugin_wrapper h3,.accessibility-plugin_wrapper h4,.accessibility-plugin_wrapper h5,.accessibility-plugin_wrapper h6{margin:0;padding:0;font-weight:400;font-family:Arial,Helvetica,sans-serif}.accessibility-plugin_wrapper a,.accessibility-plugin_wrapper abbr,.accessibility-plugin_wrapper acronym,.accessibility-plugin_wrapper blockquote,.accessibility-plugin_wrapper dd,.accessibility-plugin_wrapper dt,.accessibility-plugin_wrapper input,.accessibility-plugin_wrapper li,.accessibility-plugin_wrapper ol,.accessibility-plugin_wrapper p,.accessibility-plugin_wrapper q,.accessibility-plugin_wrapper select,.accessibility-plugin_wrapper td,.accessibility-plugin_wrapper textarea,.accessibility-plugin_wrapper th,.accessibility-plugin_wrapper ul{margin:0;padding:0;font:normal normal normal 1em/1.25 Arial,Helvetica,sans-serif}.accessibility-plugin_wrapper blockquote{margin:1.25em;padding:1.25em}.accessibility-plugin_wrapper q{font-style:italic}.accessibility-plugin_wrapper abbr,.accessibility-plugin_wrapper acronym{cursor:help;border-bottom:1px dashed}.accessibility-plugin_wrapper small{font-size:.85em}.accessibility-plugin_wrapper big{font-size:1.2em}.accessibility-plugin_wrapper a,.accessibility-plugin_wrapper a:active,.accessibility-plugin_wrapper a:hover,.accessibility-plugin_wrapper a:link,.accessibility-plugin_wrapper a:visited{text-decoration:underline}.accessibility-plugin_wrapper img{border:none}.accessibility-plugin_wrapper table{margin:0;padding:0;border:none}.accessibility-plugin_wrapper form{margin:0;padding:0;display:inline}.accessibility-plugin_wrapper label{cursor:pointer}.accessibility-plugin_wrapper *,:after,:before{box-sizing:border-box}.accessibility-plugin_wrapper{position:fixed;top:45%;height:auto;width:280px;border:1px solid #4157af;padding:10px;box-sizing:border-box!important;left:-280px;transition:left .5s,right .5s;background:#fff;z-index:1}.accessibility-plugin_wrapper.open{left:0}.accessibility-plugin_wrapper>.accessibility-plugin_tab{position:absolute;cursor:pointer;height:40px;width:40px;top:-1px;right:-40px}.accessibility-plugin_wrapper>.accessibility-plugin_tab>.accessibility-plugin_img{height:100%;width:100%;text-align:center;background:#4157af!important}.accessibility-plugin_wrapper>.accessibility-plugin_header{text-align:center}.accessibility-plugin_wrapper>.accessibility-plugin_control{cursor:pointer;overflow:hidden;margin:10px 0}.accessibility-plugin_wrapper>.accessibility-plugin_control>.accessibility-plugin_img{display:block}.accessibility-plugin_wrapper>.accessibility-plugin_control>.accessibility-plugin_text{display:block;line-height:22px}.accessibility-plugin_wrapper[dir=rtl]{left:auto;right:-280px}.accessibility-plugin_wrapper[dir=rtl].open{right:0}.accessibility-plugin_wrapper[dir=rtl] .accessibility-plugin_tab{right:auto;left:-40px}.accessibility-plugin_wrapper[dir=ltr]>.accessibility-plugin_control>.accessibility-plugin_img{float:right}.accessibility-plugin_wrapper[dir=ltr]>.accessibility-plugin_control>.accessibility-plugin_text,.accessibility-plugin_wrapper[dir=rtl]>.accessibility-plugin_control>.accessibility-plugin_img{float:left}.accessibility-plugin_wrapper[dir=rtl]>.accessibility-plugin_control>.accessibility-plugin_text{float:right}body.high-contrast .accessibility-plugin_wrapper{background:#000!important}body.high-contrast .accessibility-plugin_wrapper img{background:#fff}", ""]);
	}, function (i, e) {
	  i.exports = function () {
	    var i = [];return i.toString = function () {
	      for (var i = [], e = 0; e < this.length; e++) {
	        var t = this[e];t[2] ? i.push("@media " + t[2] + "{" + t[1] + "}") : i.push(t[1]);
	      }return i.join("");
	    }, i.i = function (e, t) {
	      "string" == typeof e && (e = [[null, e, ""]]);for (var n = {}, s = 0; s < this.length; s++) {
	        var a = this[s][0];"number" == typeof a && (n[a] = !0);
	      }for (s = 0; s < e.length; s++) {
	        var l = e[s];"number" == typeof l[0] && n[l[0]] || (t && !l[2] ? l[2] = t : t && (l[2] = "(" + l[2] + ") and (" + t + ")"), i.push(l));
	      }
	    }, i;
	  };
	}, function (i, e, t) {
	  function addStylesToDom(i, e) {
	    for (var t = 0; t < i.length; t++) {
	      var s = i[t],
	          a = n[s.id];if (a) {
	        a.refs++;for (var l = 0; l < a.parts.length; l++) {
	          a.parts[l](s.parts[l]);
	        }for (; l < s.parts.length; l++) {
	          a.parts.push(addStyle(s.parts[l], e));
	        }
	      } else {
	        for (var r = [], l = 0; l < s.parts.length; l++) {
	          r.push(addStyle(s.parts[l], e));
	        }n[s.id] = { id: s.id, refs: 1, parts: r };
	      }
	    }
	  }function listToStyles(i) {
	    for (var e = [], t = {}, n = 0; n < i.length; n++) {
	      var s = i[n],
	          a = s[0],
	          l = s[1],
	          r = s[2],
	          o = s[3],
	          c = { css: l, media: r, sourceMap: o };t[a] ? t[a].parts.push(c) : e.push(t[a] = { id: a, parts: [c] });
	    }return e;
	  }function insertStyleElement(i, e) {
	    var t = l(),
	        n = c[c.length - 1];if ("top" === i.insertAt) n ? n.nextSibling ? t.insertBefore(e, n.nextSibling) : t.appendChild(e) : t.insertBefore(e, t.firstChild), c.push(e);else {
	      if ("bottom" !== i.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");t.appendChild(e);
	    }
	  }function removeStyleElement(i) {
	    i.parentNode.removeChild(i);var e = c.indexOf(i);e >= 0 && c.splice(e, 1);
	  }function createStyleElement(i) {
	    var e = document.createElement("style");return e.type = "text/css", insertStyleElement(i, e), e;
	  }function createLinkElement(i) {
	    var e = document.createElement("link");return e.rel = "stylesheet", insertStyleElement(i, e), e;
	  }function addStyle(i, e) {
	    var t, n, s;if (e.singleton) {
	      var a = o++;t = r || (r = createStyleElement(e)), n = applyToSingletonTag.bind(null, t, a, !1), s = applyToSingletonTag.bind(null, t, a, !0);
	    } else i.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (t = createLinkElement(e), n = updateLink.bind(null, t), s = function s() {
	      removeStyleElement(t), t.href && URL.revokeObjectURL(t.href);
	    }) : (t = createStyleElement(e), n = applyToTag.bind(null, t), s = function s() {
	      removeStyleElement(t);
	    });return n(i), function (e) {
	      if (e) {
	        if (e.css === i.css && e.media === i.media && e.sourceMap === i.sourceMap) return;n(i = e);
	      } else s();
	    };
	  }function applyToSingletonTag(i, e, t, n) {
	    var s = t ? "" : n.css;if (i.styleSheet) i.styleSheet.cssText = u(e, s);else {
	      var a = document.createTextNode(s),
	          l = i.childNodes;l[e] && i.removeChild(l[e]), l.length ? i.insertBefore(a, l[e]) : i.appendChild(a);
	    }
	  }function applyToTag(i, e) {
	    var t = e.css,
	        n = e.media;if (n && i.setAttribute("media", n), i.styleSheet) i.styleSheet.cssText = t;else {
	      for (; i.firstChild;) {
	        i.removeChild(i.firstChild);
	      }i.appendChild(document.createTextNode(t));
	    }
	  }function updateLink(i, e) {
	    var t = e.css,
	        n = e.sourceMap;n && (t += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */");var s = new Blob([t], { type: "text/css" }),
	        a = i.href;i.href = URL.createObjectURL(s), a && URL.revokeObjectURL(a);
	  }var n = {},
	      s = function s(i) {
	    var e;return function () {
	      return "undefined" == typeof e && (e = i.apply(this, arguments)), e;
	    };
	  },
	      a = s(function () {
	    return (/msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
	    );
	  }),
	      l = s(function () {
	    return document.head || document.getElementsByTagName("head")[0];
	  }),
	      r = null,
	      o = 0,
	      c = [];i.exports = function (i, e) {
	    e = e || {}, "undefined" == typeof e.singleton && (e.singleton = a()), "undefined" == typeof e.insertAt && (e.insertAt = "bottom");var t = listToStyles(i);return addStylesToDom(t, e), function (i) {
	      for (var s = [], a = 0; a < t.length; a++) {
	        var l = t[a],
	            r = n[l.id];r.refs--, s.push(r);
	      }if (i) {
	        var o = listToStyles(i);addStylesToDom(o, e);
	      }for (var a = 0; a < s.length; a++) {
	        var r = s[a];if (0 === r.refs) {
	          for (var c = 0; c < r.parts.length; c++) {
	            r.parts[c]();
	          }delete n[r.id];
	        }
	      }
	    };
	  };var u = function () {
	    var i = [];return function (e, t) {
	      return i[e] = t, i.filter(Boolean).join("\n");
	    };
	  }();
	}, function (i, e) {
	  i.exports = { accessibility_text: { type: "span", path: "#accessibility-plugin > .accessibility-plugin_header" }, accessibility_alt: { type: "img", path: "#accessibility-plugin > .accessibility-plugin_tab > .accessibility-plugin_img" }, font_resize_text: { type: "span", path: "#accessibility-plugin > .accessibility-plugin_control#font > .accessibility-plugin_text" }, font_resize_alt: { type: "img", path: "#accessibility-plugin > .accessibility-plugin_control#font > .accessibility-plugin_img" }, contrast_high_text: { type: "span", path: "#accessibility-plugin > .accessibility-plugin_control#contrast-high > .accessibility-plugin_text" }, contrast_high_alt: { type: "img", path: "#accessibility-plugin > .accessibility-plugin_control#contrast-high > .accessibility-plugin_img" }, links_underline_text: { type: "span", path: "#accessibility-plugin > .accessibility-plugin_control#links > .accessibility-plugin_text" }, links_underline_alt: { type: "img", path: "#accessibility-plugin > .accessibility-plugin_control#links > .accessibility-plugin_img" }, animation_block_text: { type: "span", path: "#accessibility-plugin > .accessibility-plugin_control#animation > .accessibility-plugin_text" }, animation_block_alt: { type: "img", path: "#accessibility-plugin > .accessibility-plugin_control#animation > .accessibility-plugin_img" }, readable_font_text: { type: "span", path: "#accessibility-plugin > .accessibility-plugin_control#readable > .accessibility-plugin_text" }, readable_font_alt: { type: "img", path: "#accessibility-plugin > .accessibility-plugin_control#readable > .accessibility-plugin_img" }, reset_configuration_text: { type: "span", path: "#accessibility-plugin > .accessibility-plugin_control#reset > .accessibility-plugin_text" }, reset_configuration_alt: { type: "img", path: "#accessibility-plugin > .accessibility-plugin_control#reset > .accessibility-plugin_img" } };
	}, function (i, e) {
	  i.exports = { "enlarge-font": [{ elements: "body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)", enlarge: { attr: "font-size", value: .1 } }], "high-contrast": [{ elements: "body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)", style: { "background-color": "#000000", color: "rgb(30, 255, 35)", "background-image": "none" } }, { elements: "button", style: { border: "solid 2px rgb(30, 255, 35)" } }], "underline-links": [{ elements: "body a[href]", style: { "text-decoration": "underline" } }], "disable-animations": [{ elements: "body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img)", style: { "-o-transition-property": "none", "-moz-transition-property": "none", "-ms-transition-property": "none", "-webkit-transition-property": "none", "transition-property": "none", "-o-transform": "none", "-moz-transform": "none", "-ms-transform": "none", "-webkit-transform": "none", transform: "none", "-webkit-animation": "none", "-moz-animation": "none", "-o-animation": "none", "-ms-animation": "none", animation: "none" } }], "readable-font": [{ elements: "body *:not(.accessibility-plugin_wrapper):not(.accessibility-plugin_tab):not(.accessibility-plugin_header):not(.accessibility-plugin_control):not(.accessibility-plugin_text):not(.accessibility-plugin_img):not(.fa)", style: { "font-family": "initial" } }] };
	}, function (i, e, t) {
	  "use strict";
	  function _interopRequireDefault(i) {
	    return i && i.__esModule ? i : { default: i };
	  }Object.defineProperty(e, "__esModule", { value: !0 }), e.configEnglish = e.configHebrew = void 0;var n = t(16),
	      s = _interopRequireDefault(n),
	      a = t(17),
	      l = _interopRequireDefault(a);e.configHebrew = { translation: s.default, direction: "rtl" }, e.configEnglish = { translation: l.default, direction: "ltr" };
	}, function (i, e) {
	  i.exports = { accessibility_text: "תפריט הנגשה", accessibility_alt: "תפריט הנגשה", font_resize_text: "הגדלת פונט", font_resize_alt: "הגדלת פונט", contrast_high_text: "ניגודיות גבוהה", contrast_high_alt: "ניגודיות גבוהה", links_underline_text: "הדגשת קישורים", links_underline_alt: "הדגשת קישורים", animation_block_text: "חסימת אנימציות", animation_block_alt: "חסימת אנימציות", readable_font_text: "פונט קריא", readable_font_alt: "פונט קריא", reset_configuration_text: "איפוס הגדרות", reset_configuration_alt: "איפוס הגדרות" };
	}, function (i, e) {
	  i.exports = { accessibility_text: "Accessibility", accessibility_alt: "Accessibility", font_resize_text: "Font Resize", font_resize_alt: "Font Resize", contrast_high_text: "High Contrast", contrast_high_alt: "High Contrast", links_underline_text: "Undeline Links", links_underline_alt: "Undeline Links", animation_block_text: "Block Animations", animation_block_alt: "Block Animations", readable_font_text: "Readable Fonts", readable_font_alt: "Readable Fonts", reset_configuration_text: "Reset Configuration", reset_configuration_alt: "Reset Configuration" };
	}]);
	//# sourceMappingURL=accessibility.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=accessibility.js.map