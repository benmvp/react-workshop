# Step 5 - Email View

## Setup

Install [`webpack-dev-server`](https://webpack.github.io/docs/webpack-dev-server.html) & [`react-hot-loader`](https://github.com/gaearon/react-hot-loader):

```sh
npm install --save-dev webpack-dev-server react-hot-loader
```

Update [webpack.config.js](webpack.config.js) to update `entry`, `output` & `loaders`:

```js
var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'src/dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
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

Add `start:server` script to [package.json](package.json):

```json
{
  "scripts": {
    "build": "webpack --progress --colors --devtool source-map",
    "build:watch": "webpack --watch --progress --colors --devtool source-map",
    "eslint": "eslint .",
    "lint": "npm run eslint",
    "start:api": "node api-server.js",
    "start:server": "webpack-dev-server --content-base src/ --hot --inline --open",
    "test": "npm run lint"
  }
}
```

## Tasks

- Clicking an [`EmailListItem`](src/components/EmailListItem.js) displays the corresponding email information in [`EmailView`](src/components/EmailView.js), which now doesn't show unless there is a selected email item
- Add a close button to [`EmailView`](src/components/EmailView.js) which hides `EmailView` and deselects the selected [`EmailListItem`](src/components/EmailListItem.js)

## Next

Go to [Step 6 - Email Form](https://github.com/benmvp/react-workshop/tree/master/06-email-form).

## Resources

- [webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html)
- [React Hot Loader Getting Started](http://gaearon.github.io/react-hot-loader/getstarted/)
- [Event System](https://facebook.github.io/react/docs/events.html)
- [Dangerously Set innerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html)
