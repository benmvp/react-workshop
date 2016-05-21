# Step 2 - Environment setup

## TODO

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

Install [Webpack](https://webpack.github.io/) module builder:

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
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel'
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

Don't lint the bundle by adding [.eslintignore](.eslintignore) in root directory:

```bash
# Ignore built files
/src/dist/
```

Add React dependencies to the top of [index.js](src/index.js):

```js
import React from 'react';
import ReactDOM from 'react-dom';

class EmailListItem extends React.Component {
```

Replace the `<script>` tags in [index.html](src/index.html) to point to Webpack bundle:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>React Email</title>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body>
        <div id="app"></div>
        <script src="dist/bundle.js"></script>
    </body>
</html>
```

Build bundle with Webpack (including a source map):

```sh
./node_modules/.bin/webpack --progress --colors --devtool source-map
```

Run `serve` on port `8080` in [`src`](src/) directory:

```sh
./node_modules/.bin/serve src --port 8080
```

Visit [http://localhost:8080/](http://localhost:8080/) and you should see the components.

Separate the components into their own files: [index.js](src/index.js), [App.js](src/containers/App.js), [EmailForm.js](src/components/EmailForm.js), [EmailView.js](src/components/EmailView.js), [EmailList.js](src/components/EmailList.js) & [EmailListItem.js](src/components/EmailListItem.js).

In a separate console window/tab, set Webpack to watch on file changes for continuous building:

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

Run `build:watch` script:

```sh
npm run build:watch
```

Run `test` script to lint:

```sh
npm test
```

Lastly, add [`propTypes`](https://facebook.github.io/react/docs/reusable-components.html) to each of the components.

## Next

Coming soon...
