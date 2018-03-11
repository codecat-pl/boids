const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        boids: ['./index.js']
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        publicPath: "/"
    },
    devtool: "eval-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devServer: {
        port: 8000
    }
};