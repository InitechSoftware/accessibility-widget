const path = require("path");

module.exports = {
  entry: './src/script.js',
  output: {
    path: 'build',
    filename: 'accessibility.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules|webpack.congif.js|webpack.dev.config.js/,
        loader: "babel-loader" ,
        query: { presets: ['babel-preset-es2015', 'babel-preset-stage-2'] }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.html$/, loader: "html-loader" },
      { test: /\.jpe?g$|\.gif$|\.png$/i, loader: "file-loader" },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'base64-inline-loader'}
    ]
  },
  htmlLoader: {
    root: path.resolve(__dirname, 'images'),
    attrs: ['img:src']
  }
};
