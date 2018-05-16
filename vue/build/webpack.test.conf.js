'use strict'
// This is the webpack config used for unit tests.

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const webpackConfig = merge(baseWebpackConfig, {
  resolve: {
    alias: {
      'test-utils': '@vue/test-utils'
    }
  },
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  externals: [
    require('webpack-node-externals')()
  ]
})

module.exports = webpackConfig
