var path = require('path');

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
    }
};
