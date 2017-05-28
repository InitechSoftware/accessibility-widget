# Accessibility widget

### An open source implementation of an accessibility widget

#### GET started:

1. Get the code (clone repo) `git clone git@github.com:InitechSoftware/accessibility-widget.git`
2. `npm i`
3. `npm build` (to get lastest build, there is a good chance the build directory will not be updat to date)
4. Bundle the `js` file with you code, also, the basic implmentation is exported and can be called by - `import AccessibilityPlugin from 'AccessibilityPlugin';` or `require('AccessibilityPlugin');`.
5. Add the build and source map to your project.
6. Optional you can include widget in your project via submodule
https://github.com/blog/2104-working-with-submodules

#### Internationalization 

Internationalization
1. Add config for desired language in `src/translations/` folder (i.e russian.json).
2. In file `src/translations/default.config.js` add variable for your language with corresponding direction (ltr either rlt).
3. Import declared variable in `src/translations/default.config.js` in `src/script.js` and add it to config in constructor method.
4. After importing widget to you project you can change translation for widget by calling function translate with desired language.
```
    window.AccessibilityPlugin.documentReady = function () {
        this.changeDirection("rtl").translate(this.constants.configs.hebrew.translation);
    };
```
