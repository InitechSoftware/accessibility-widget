import html from "./accessibility.html";
import AccessibilityStyle from "./accessibility.css";
import translationKeys from "./configs/translation-keys.json";
import OverrideStyles from "./configs/class.styles.json";
import {configHebrew, configEnglish} from "./configs/default.config";


const localStorageKey = 'classes';

class AccessibilityPlugin {
  constructor(config) {
    let savedClasses = window.localStorage.getItem(localStorageKey);

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
        hebrew: configHebrew,
        english: configEnglish
      }
    };

    this._documetnReadyFunc = (fn, config=configEnglish) => {
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
    let querySelector;

    if (toElement !== null && !("querySelector" in toElement)) {
      throw new Error(`Property passed to toElement: ${toElement} is not an element`);
    }

    document.body.appendChild(this._pluginElement);
    querySelector = (toElement !== null && !!toElement.querySelector) ? `${pluginPath}` : `body > ${pluginPath}`;
    this._pluginElement = document.querySelector(querySelector);
    this._pluginElement.addEventListener("click", this._accessibilityPluginClicked.bind(this));
    this._pluginElement.querySelector(".accessibility-plugin_tab").addEventListener("click", this._openTab.bind(this));

    return this;
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
        } else if (this._translationKeys[key].type  == "span") {
          this._pluginElement.querySelector(this._translationKeys[key].path).textContent = translationObject[key];
        } else {
          console.error(`Unsupported translation type ${this._translationKeys[key].type}`);
        }
      } else {
        console.error(`Unsupported trnslation key ${key}`);
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
      (className) => this._setStyle(
        document.querySelectorAll(OverrideStyles[className].elements), false, OverrideStyles[className].style
      )
    );

    this._savedClasses = [];
    window.localStorage.removeItem(localStorageKey);
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
    } else if (target.dataset.addClass !== undefined) {
      this._setClass(target.dataset.addClass);
    }
  }

  _setClass(classToAdd, fromLocal=false) {
    const styleDef = OverrideStyles[classToAdd];
    const elements = document.querySelectorAll(styleDef.elements);

    if (fromLocal === true) {
      this._setStyle(elements, true, styleDef.style);
    } else if (this._savedClasses.includes(classToAdd)) {
      this._setStyle(elements, false, styleDef.style);
      this._savedClasses.splice(this._savedClasses.findIndex((elem) => elem === classToAdd), 1);
    } else {
      this._setStyle(elements, true, styleDef.style);
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

  _setStyle(elements, add=false, style) {
    elements.forEach((elem) => {
      const elementStyle = elem.getAttribute('style') || ''; // Check if the style attr is no null.
      if (add === true) {
        elem.setAttribute('style', elementStyle + style);
      } else {
        elem.setAttribute('style', elementStyle.replace(style, ''));
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
