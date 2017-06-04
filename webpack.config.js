var webpack = require('webpack');
var arr = process.argv[2];
var flag = true;
var plugins = [
    new webpack.SourceMapDevToolPlugin({
        columns: false
    }),
    new webpack.HotModuleReplacementPlugin()
];
var filename = 'react.js';
if (arr) {
    flag = arr.split('=')[1];
    if (flag) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));
        filename = 'react.min.js';
    }
}

// app: [
//     'webpack-dev-server/client',
//     'webpack/hot/dev-server',
//     './src/app.js'
// ],
module.exports = {
    entry: {

        real: [
            'webpack-dev-server/client',
            'webpack/hot/dev-server',
            './src/real.js'
        ]
    },

    output: {
        path: 'dist',
        filename: filename
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ["babel-preset-es2015"]
                }

            }
        ]
    },
    plugins: plugins
};