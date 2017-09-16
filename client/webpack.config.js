// var webpack = require('webpack');
// var path = require('path');
// var DotenvPlugin = require('webpack-dotenv-plugin');

// var BUILD_DIR = path.resolve(__dirname, 'public');
// var APP_DIR = path.resolve(__dirname, 'app');

// var config = {
//   context: path.join(__dirname, 'react-google-maps'),
//   entry: APP_DIR + '/index.js',
//   output: {
//     path: BUILD_DIR,
//     filename: 'bundle.js'
//   },
//   module : {
//     loaders : [
//       {
//         test: /\.json$/,
//         loader: 'json-loader',
//         include: APP_DIR + '/data/spots.json',
//       },
//       {
//         test : /\.js?/,
//         include : APP_DIR,
//         loader : 'babel-loader',
//       }
//     ]
//   },
//   plugins: [
//     new DotenvPlugin({
//       sample: './.env.example',
//       path: './.env'
//     })
//   ]
// };

// module.exports = config;

const webpack = require('webpack')
const nodeEnv = process.env.NODE_ENV || 'development'
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

console.log('loading webpack.config.dev.js')
module.exports = {
  devtool : 'inline-source-map',
  entry:   { filename: './app/index.js' },
  output : { filename: './bundle.js', path: `${__dirname}/public`  },
  context : `${__dirname}` ,
  module: {
    loaders: [
         {
          test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
          query: {
             presets: ['es2015', 'react', 'stage-0']
          }
         },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
         }
     ]
  },
  plugins: [
     //env plugin
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
      }),
     //env plugin -- css
  ]
}
