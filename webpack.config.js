var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var distPath = path.join(__dirname, 'dist');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.jsx'
    ],
    target: 'web',
    output: {
        path: distPath,
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/index.tpl',
            minify: {
                minifyCSS: true,
                minifyJS: true
            },
            favicon: __dirname + '/favicon.ico',
            chunksSortMode: 'dependency'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.css?$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader?sourceMap")
            },
            {
                test: /\.less?$/,
                loader:  ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap"),
                include: __dirname
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader',
                query: {limit: 10240}
            }
        ]
    }
};
