const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack');


module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv()
  ]
};