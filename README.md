# Accessibility widget

### An open source implementation of an accessibility widget

#### GET started:

1. Get the code (clone repo) `git clone git@github.com:InitechSoftware/accessibility-widget.git`
2. `npm i`, install node_modules.
3. `npm run build`, to get lastest build, there is a good chance the build directory will not be up to date.
4. Add the build and source map to your project.

#### Inheriting and extending.
In the src directory, the module could be imported by - `import AccessibilityPlugin from 'AccessibilityPlugin';` or `require('AccessibilityPlugin');`.
You can inherit from the `AccessibilityPlugin` class and easily extend it.

#### Internationalization

Internationalization
1. Add config for desired language in `src/translations/` folder (i.e russian.json).
2. In file `src/translations/default.config.js` add variable for your language with corresponding direction (ltr either rlt).
3. Import declared variable in `src/translations/default.config.js` in `src/script.js` and add it to config in constructor method.

Now widget has support for English and Hebrew.

#### 3rd party resources

Accessibility widget is build with help of material design icons https://materialdesignicons.com/.
