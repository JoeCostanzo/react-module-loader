# React Module Loader

Loads ES6 modules (functions, etc) into interactive React component views.

Allows bootstrapping a set of functions (properly exported as ES6 modules & documented with a JSDOC AST), into an auto-generated input interface, which is reusable & composable for myriad use-cases.

Linted with [ESLint](http://eslint.org/) and tested with [Mocha](https://mochajs.org/), [Enzyme](http://airbnb.io/enzyme/) and [JSDOM](https://github.com/tmpvar/jsdom).

There is also ES6 transpilation.

## Usage

#### via NPM
1. Install the package `npm install --save react-module-loader`
2. Include package into your app with: `import ReactModuleLoader from 'react-module-loader`
3. Add `ReactModuleLoader` to your render() method.
4. You must pass the element 3 props:
    - A `mount` prop (the parent object that is a properly exported ES6 module)
    - A `functionsKeyName` prop (the keyname of the child object of `mount` that holds the actual functions themselves).
    - A `astKeyName` prop (the keyname of a the child object of `mount` that is a jsdoc-generated JSON AST, exported as a module).

## Relevant blog post:

- Auto-Generating React Components from ES6 Modules (blog post coming soon.)

## Also check out:

- [ES6 Module Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- more coming soon...

## License

MIT
