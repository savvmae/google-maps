var webpack = require('webpack');
var path = require('path');
var DotenvPlugin = require('webpack-dotenv-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  context: path.join(__dirname, 'react-google-maps'),
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: APP_DIR + '/data/spots.json',
      },
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader',
      }
    ]
  },
  plugins: [
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    })
  ]
};

module.exports = config;
