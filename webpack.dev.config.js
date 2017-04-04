const webpackBase = require("./webpack.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign(webpackBase, {
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    contentBase: './src/',
    historyApiFallback: {
      index: './index.html'
    }
  }
});