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
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'], exclude: "/node_modules/" },
      {
        test: /\.hbs$/, use: {
          loader: 'handlebars-loader',
          options: {
            helperDirs: [__dirname + "/public/hbs/helpers"],
            partialDirs: [__dirname + "/public/hbs/partials"]
          },
        },
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: __dirname + '/public/index.html' })
  ]
};