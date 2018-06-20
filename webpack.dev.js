const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [],
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    devServer: {
        port: 3000
    }
});