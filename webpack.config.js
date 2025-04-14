const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(defaultConfig, {
    entry: {
        index: path.resolve(process.cwd(), 'src', 'index.js'),
        frontend: path.resolve(process.cwd(), 'src', 'frontend.js')
    }
});
