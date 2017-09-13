import html from "./accessibility.html";
import AccessibilityStyle from "./accessibility.css";
import translationKeys from "./configs/translation-keys.json";
import OverrideStyles from "./configs/class.styles.json";
import {configHebrew, configEnglish} from "./configs/default.config";


const localStorageKey = 'classes';

class AccessibilityPlugin {
  constructor(config) {

    if(this._checkLocalStorage()) {
      var savedClasses = window.localStorage.getItem(localStorageKey);
    } else {
      var savedClasses = this._getCookie(localStorageKey);
    }

    this.documentReady;
    this._pluginElement = document.createRange().createContextualFragment(html);
    this._translationKeys = translationKeys;
    this._savedClasses = (savedClasses !== null) ? JSON.parse(savedClasses) : [];
    this._possibleClasses = [
      "enlarge-font",
      "low-contrast",
      "high-contrast",
      "underline-links",
      "disable-animations",
      "readable-font"
    ];

    this.constants = {
      configs: {
        he: configHebrew,
        'en-US': configEnglish
      }
    };

    this._documetnReadyFunc = (fn) => {
      var language = document.getElementsByTagName("html")[0].lang;
      if (typeof language === 'undefined') {
        language = window.navigator.language || window.navigator.userLanguage;
      }
      config = this.constants.configs[language] || configEnglish;
      this.setConfig(config);
      if (this._savedClasses.length > 0) {
          this._savedClasses.forEach((className) => this._setClass(className, true));
      }

      if (typeof this.documentReady === 'function') {
        this.documentReady.bind(this);
        this.documentReady();
      }
    };

    if (window.AccessibilityPlugin !== undefined && typeof window.AccessibilityPlugin === 'AccessibilityPlugin') {
      return window.AccessibilityPlugin;
    }
  }
  // TODO: Implement appending to element other than `body`
  append(toElement=null) {
    const pluginPath = "#accessibility-plugin";
    const dialogPath = ".accessibility-plugin-statement";
    let querySelector;

    if (toElement !== null && !("querySelector" in toElement)) {
      throw new Error(`Property passed to toElement: ${toElement} is not an element`);
    }

    document.body.appendChild(this._pluginElement);
    querySelector = (toElement !== null && !!toElement.querySelector) ? `${pluginPath}` : `body > ${pluginPath}`;
    this._pluginElement = document.querySelector(querySelector);
    this._dialogElement = document.querySelector(dialogPath);
    this._pluginElement.addEventListener("click", this._accessibilityPluginClicked.bind(this));
    this._dialogElement.querySelector(".accessibility-plugin-statement-button").addEventListener("click", this._closeDialog.bind(this));
    this._pluginElement.querySelector(".accessibility-plugin_tab").addEventListener("click", this._openTab.bind(this));

    return this;
  }

  _setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";" + "expires=" + d.toUTCString() + ";path=/";
  }

  _getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
  }

  _checkLocalStorage() {
    try {
      localStorage.setItem('localstorage', 'localstorage');
      localStorage.removeItem('localstorage');
      return true;
    } catch(e) {
      return false;
    }
  }

  setConfig(config) {
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

  translate(translationObject) {
    if (Object.keys(translationObject) === 0) {
      throw new Error(`Argument translationObject should be an object with keys`);
    }

    for (let key in translationObject) {
      if (this._translationKeys[key]) {
        if (this._translationKeys[key].type == "img") {
          this._pluginElement.querySelector(this._translationKeys[key].path).setAttribute("alt", translationObject[key]);
        } else if (["span", "p", "h3", "button"].indexOf(this._translationKeys[key].type)  !== -1 ) {
          this._pluginElement.querySelector(this._translationKeys[key].path).innerHTML = translationObject[key];
        } else {
          console.error(`Unsupported translation type ${this._translationKeys[key].type}`);
        }
      } else {
        console.error(`Unsupported translation key ${key}`);
      }
    }

    return this;
  }

  changeDirection(dir="ltr") {
    if (!!dir && (dir === "ltr" || dir === "rtl")) {
      if (this._pluginElement.setAttribute) {
        this._pluginElement.setAttribute("dir", dir);
      } else {
        this._pluginElement.firstChild.setAttribute("dir", dir);
      }
    } else {
      throw new Error(`dir argument should be set to either "ltr" or "rtl" not "${dir}"`);
    }

    return this;
  }

  resetConfiguration() {
    this._savedClasses.forEach(
      (className) => {
        OverrideStyles[className].forEach((element) => {
          if(element.hasOwnProperty('enlarge')){
            this._enlargeProperty(document.querySelectorAll(element.elements), false, element.enlarge);
          } else {
            this._setStyle(
              document.querySelectorAll(element.elements), false, element.style
            );
          }
        });
      }
    );

    this._savedClasses = [];
    if(this._checkLocalStorage()) {
      window.localStorage.removeItem(localStorageKey);
    } else {
      this._setCookie(localStorageKey, '', 0);
    }

    //TODO: Remove hardcoded jQuery test and add a full sweep over third party libraries
    if ("jQuery" in window || "$" in window) {
      window.jQuery.fx.off = false;
    }
  }

  _accessibilityPluginClicked(event) {
    let target = event.target;

    target = target.classList.contains("control") && !!target.dataset.addClass ? target : target.parentNode;
    if (target.id === "reset") {
      this.resetConfiguration();
      const active_icons = this._pluginElement.querySelectorAll('.accessibility-plugin_control.active');
      active_icons.forEach((element) => {
        element.classList.remove('active');
      });
    } else if(target.id === "statement") {
      this._dialogElement.classList.remove('hidden');
    } else if (target.dataset.addClass !== undefined) {
      this._setClass(target.dataset.addClass);
    }
  }

  _setClass(classToAdd, fromLocal=false) {
    const styleDefs = OverrideStyles[classToAdd];
    this._pluginElement.querySelector(`.accessibility-plugin_control[data-add-class=${classToAdd}]`).classList.toggle('active');
    styleDefs.forEach((styleDef) => {
      const elements = document.querySelectorAll(styleDef.elements);
      if(styleDef.hasOwnProperty('enlarge')) {
        if (fromLocal === true) {
          this._enlargeProperty(elements, true, styleDef.enlarge);
        } else if (this._savedClasses.includes(classToAdd)) {
          this._enlargeProperty(elements, false, styleDef.enlarge);
        } else {
          this._enlargeProperty(elements, true, styleDef.enlarge);
        }
      } else {
        if (fromLocal === true) {
          this._setStyle(elements, true, styleDef.style);
        } else if (this._savedClasses.includes(classToAdd)) {
          this._setStyle(elements, false, styleDef.style);
        } else {
          this._setStyle(elements, true, styleDef.style);
        }
      }
    });


    if (fromLocal === true) {
    } else if (this._savedClasses.includes(classToAdd)) {
      this._savedClasses.splice(this._savedClasses.findIndex((elem) => elem === classToAdd), 1);
    } else {
      this._savedClasses.push(classToAdd);
    }
    if(this._checkLocalStorage()) {
      window.localStorage.setItem(localStorageKey, JSON.stringify(this._savedClasses));
    } else {
      this._setCookie(localStorageKey, JSON.stringify(this._savedClasses), 1000);
    }

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

  _enlargeProperty(elements, enlarge=false, attrs_dict) {
    elements.forEach((elem) => {
      if(enlarge === true) {
        const cssAttrValue = parseFloat(window.getComputedStyle(elem).getPropertyValue(attrs_dict['attr']));
        elem.style.setProperty(attrs_dict['attr'], parseFloat(cssAttrValue) + (parseFloat(cssAttrValue) * attrs_dict['value']) + 'px');
      } else {
        elem.style.removeProperty(attrs_dict['attr']);
      }
    });
  }

  _setStyle(elements, add=false, style) {
    elements.forEach((elem) => {
      for(let key in style) {
        if(add === true) {
          elem.style.setProperty(key, style[key]);
        } else {
          elem.style.removeProperty(key);
        }
      }
    });
  }

  _openTab() {
    const className = "open";

    if (this._pluginElement.classList.contains(className)) {
      this._pluginElement.classList.remove(className);
    } else {
      this._pluginElement.classList.add(className);
    }
  }

  _closeDialog(event) {
    this._dialogElement.classList.add("hidden");
  }
}

if ("AccessibilityPlugin" in window) {
  console.error(`
    Property AccessibilityPlugin is already defined on window.
    Please change the name of the added "AccessibilityPlugin" and retry.
  `);
} else {
  window.AccessibilityPlugin = new AccessibilityPlugin();
}

document.addEventListener("DOMContentLoaded", (event) => window.AccessibilityPlugin._documetnReadyFunc());

export default AccessibilityPlugin;
