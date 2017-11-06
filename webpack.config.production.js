const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const rootPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'build');

module.exports = {
    entry: [
        './node_modules/fabric/dist/fabric.js',
        `${rootPath}/index.js`
    ],
    output: {
        //filename: '[name].[hash].js',
        filename: '[name].js',
        path: distPath,
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(rootPath, 'index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        })
    ]
}
