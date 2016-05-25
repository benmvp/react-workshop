var webpack = require('webpack'),
    path = require('path');

module.exports = {
    // Entry point for the bundle with dev-server hot-loading
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index'
    ],

    // Bundle location
    output: {
        path: path.join(__dirname, 'src/dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },

    // Pass all *.js files through Babel transpiling & React hot reloading
    // Pass all *.scss files through SASS transpiling & include via <style> tag
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
    },

    // Shim fetch API with whatwg-fetch
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};
