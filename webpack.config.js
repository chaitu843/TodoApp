const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `./public/js/index.js`,
  devtool: "cheap-eval-source-map",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  mode: "production",
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: "/node_modules/" },
      { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader'], exclude: "/node_modules/" },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: __dirname+ '/public/index.html'})
  ]
};