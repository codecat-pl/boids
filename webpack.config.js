const path = require('path');

module.exports = {
    entry: {
        boids: ['./index.js', './lib/babylon.custom.js']
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    externals: {
        './lib/babylon.custom.js': {
            commonjs: './lib/babylon.custom.js',
            commonjs2: './lib/babylon.custom.js',
            amd: './lib/babylon.custom.js',
            root: 'BABYLON'
        }
    }
};