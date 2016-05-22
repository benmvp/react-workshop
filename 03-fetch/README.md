# Step 3 - Fetching from server

## Setup

Add dependencies for API server:

```sh
npm install --save express body-parser lodash
```

Add `start:api` script to [package.json](package.json) to run API server:

```json
{
  "scripts": {
    "build": "webpack --progress --colors --devtool source-map",
    "build:watch": "webpack --watch --progress --colors --devtool source-map",
    "eslint": "eslint .",
    "lint": "npm run eslint",
    "start:api": "node api-server.js",
    "test": "npm run lint"
  }
}
```

Run API server:

```sh
npm run start:api
```

Install [`whatwg-fetch`](https://github.com/github/fetch) & [`es6-promise`](https://github.com/stefanpenner/es6-promise) libraries to polyfill [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

```sh
npm install --save whatwg-fetch es6-promise
```

Install [`imports-loader`](https://github.com/webpack/imports-loader) & [`exports-loader`](https://github.com/webpack/exports-loader) to shim `whatwg-fetch`:

```sh
npm install --save-dev imports-loader exports-loader
```

Update [webpack.config.js](webpack.config.js) to shim `fetch` with `imports-loader` & `exports-loader`:

```js
var webpack = require('webpack'),
    path = require('path');

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
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};
```

Rerun `build:watch` task:

```sh
npm run build:watch
```

## Tasks

- Remove `emails` constant in [App.js](src/containers/App.js), and replace with new `emails` property on [state](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html) that is set from `fetch` call to the API inside [`componentDidMount`](https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount)

## Next

Coming soon...
