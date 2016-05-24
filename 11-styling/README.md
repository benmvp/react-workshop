# Step 11 - Styling

## Setup

Install webpack loaders ([`style-loader`](https://github.com/webpack/style-loader), [`css-loader`](https://github.com/webpack/css-loader), [`sass-loader`](https://github.com/jtangelder/sass-loader) & [`node-sass`](https://github.com/sass/node-sass)) to support importing SCSS files:

```sh
npm install --save-dev style-loader css-loader sass-loader node-sass
```

Update [webpack.config.js](webpack.config.js) to use these loaders for `*.scss` files:

```js
{
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: path.join(__dirname, 'src')
            }
        ]
    }
}
```

Install [`classnames`](https://github.com/JedWatson/classnames) for handling dynamic class name strings:

```sh
npm install --save classnames
```

## Tasks

- Add styling to each component by importing a companion `.*.scss` for each component and adding `classNames` to appropriate elements within it

## Next

Coming soon...

## Resources

- [`classnames`](https://github.com/JedWatson/classnames)
- [Inline Styles](https://facebook.github.io/react/tips/inline-styles.html)
- [CSS Modules: Welcome to the Future](http://glenmaddern.com/articles/css-modules)
- [Sass: Syntactically Awesome Style Sheets](http://sass-lang.com/)
- [Using CSS flexible boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
- [`style-loader`](https://github.com/webpack/style-loader), [`css-loader`](https://github.com/webpack/css-loader), [`sass-loader`](https://github.com/jtangelder/sass-loader) & [`node-sass`](https://github.com/sass/node-sass)
