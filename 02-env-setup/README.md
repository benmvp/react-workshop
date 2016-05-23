# Step 2 - Environment setup

## Setup

Create a [package.json](https://docs.npmjs.com/files/package.json) to manage dependencies:

```sh
npm init -y
```

Replace [package.json](package.json) contents so it looks like:

```json
{
  "private": true,
  "scripts": {}
}
```

Install React dependencies:

```sh
npm install --save react react-dom
```

Install [webpack](https://webpack.github.io/) module builder:

```sh
npm install --save-dev webpack
```

Install [Babel](http://babeljs.io/) dependencies for ES6+ & JSX transpiling:

```sh
npm install --save-dev babel-cli babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-loader
```

Install [ESLint](http://eslint.org/) linting utility for JavaScript:

```sh
npm install --save-dev eslint babel-eslint eslint-plugin-react eslint-config-benmvp
```

Update [package.json](package.json) contents to add Babel configuration:

```json
{
  "private": true,
  "scripts": {},
  "dependencies": ...,
  "devDependencies": ...,
  "babel": {
    "presets": [
      "es2015",
      "react",
      "stage-0"
    ]
  }
}
```

Create a simple [webpack.config.js](webpack.config.js):

```js
var path = require('path');

module.exports = {
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: path.join(__dirname, 'src')
            }
        ]
    }
};
```

Create a simple [.eslintrc.json](src/.eslintrc.json) that uses [`eslint-config-benmvp`](https://github.com/benmvp/eslint-config-benmvp) to put in [src](src/) directory:

```json
{
    "extends": "benmvp"
}
```

Don't accidentally lint the bundle by adding [.eslintignore](.eslintignore) in root directory:

```bash
# Ignore built files
/src/dist/
```

Build a one-time bundle with webpack (including a source map):

```sh
./node_modules/.bin/webpack --progress --colors --devtool source-map
```

Or instead, set webpack to watch on file changes for continuous building:

```sh
./node_modules/.bin/webpack --watch --progress --colors --devtool source-map
```

Add scripts to [package.json](package.json) to make building and linting easier:

```json
{
  "scripts": {
      "build": "webpack --progress --colors --devtool source-map",
      "build:watch": "webpack --watch --progress --colors --devtool source-map",
      "eslint": "eslint .",
      "lint": "npm run eslint",
      "test": "npm run lint"
  }
}
```

Run `build:watch` script for webpack continuous building:

```sh
npm run build:watch
```

Run `test` script to lint:

```sh
npm test
```

## Tasks

- Replace the `<script>` tags in [index.html](src/index.html) to point to webpack bundle
- Add React dependencies to the top of [index.js](src/index.js)
- Separate the components into their own files ([index.js](src/index.js), [App.js](src/containers/App.js), [EmailForm.js](src/components/EmailForm.js), [EmailView.js](src/components/EmailView.js), [EmailList.js](src/components/EmailList.js) & [EmailListItem.js](src/components/EmailListItem.js)), and use [ES6 imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to pull in dependencies
- Add [`propTypes`](https://facebook.github.io/react/docs/reusable-components.html) to each of the components

## Next

Go to [Step 3 - Fetching from server](https://github.com/benmvp/react-workshop/tree/master/03-fetch).

## Resources

- [React Developer Tools](https://github.com/facebook/react-devtools)
- [Reusable Components](https://facebook.github.io/react/docs/reusable-components.html)
- [ES6 imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Getting Started with webpack](http://webpack.github.io/docs/tutorials/getting-started/)
- [Babel](http://babeljs.io/)
- [ESLint](http://eslint.org/)
- [package.json](https://docs.npmjs.com/files/package.json) & [`npm init`](https://docs.npmjs.com/cli/init)
