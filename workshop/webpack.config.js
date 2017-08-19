let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve('src'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            fetch:
                'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        })
    ]
};

// 'imports?this=>global!exports?global.fetch!whatwg-fetch'
// 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
