let path = require('path');

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
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            }
        ]
    }
};
