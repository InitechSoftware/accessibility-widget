const path = require("path");
const webpack = require("webpack");
const webpackBase = require("./webpack.config");

module.exports = Object.assign(webpackBase, {
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
          screw_ie8: true,
          keep_fnames: true
      },
      compress: {
          screw_ie8: true
      },
      comments: false
    })
  ]
});

