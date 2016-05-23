var webpack = require('webpack'),
    path = require('path');

module.exports = {
    // Entry point for the bundle
    entry: './src/index',

    // Bundle location
    output: {
        path: path.join(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },

    // Pass all *.js files through Babel transpiling
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
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
