const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const pkg = require('./package.json');
const wpHelpers = require('./wp.helpers');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin('[name].css');
let extractLESS = new ExtractTextPlugin('[name].less');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style: [
    path.join(__dirname, 'public', 'font-awesome-4.6.3', 'css', 'font-awesome.min.css'),
    path.join(__dirname, 'public', 'bootstrap', 'css', 'bootstrap.min.css'),
    path.join(__dirname, 'public', 'css', 'AdminLTE.min.css'),
    path.join(__dirname, 'public', 'css', 'skins', 'skin-blue.min.css'),
    path.join(__dirname, 'assets', 'style', 'main.less'),
    path.join(__dirname, 'public', 'js', 'plugins', 'iCheck', 'square', 'blue.css')
  ],
  images: [
    path.join(__dirname, 'public', 'img'),
    path.join(__dirname, 'assets', 'img'),
    path.join(__dirname, 'public', 'js', 'plugins', 'iCheck', 'square')
  ],
  fonts: [
    path.join(__dirname, 'public', 'bootstrap', 'fonts', 'glpyhicons-halflings-regular.eot'),
  ]
}

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app,
    vendor: Object.keys(pkg.dependencies)
  },
  devServer: {
    port: 4000
  },
  module: {
    preLoaders: [
      {
        test: /\.json$/,
        loader: 'json',
        include: PATHS.app,
        exclude: [__dirname + '/node_modules', __dirname + '/build']
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        include: PATHS.app
      },
      {
        test: /\.json$/, 
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less', /* extractLESS.extract(['css', 'less']),*/
        include: PATHS.style
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract(['css']),
        include: PATHS.style
      }, 
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=10000',
        include: PATHS.images
      },
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].[hash].js'
  },
  plugins: [
    HtmlWebpackPluginConfig, /* this will copy index.html from source and inject the output js references to dist */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    extractCSS,
    extractLESS
  ]
} 

var config = {};

switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common, 
      {
        devtool: 'source-map',
      },
      wpHelpers.clean(PATHS.build)
    );
    break;
  default:
    config = merge(
      common, 
      {
        devtool: 'eval-source-map'
      },
      wpHelpers.clean(PATHS.build)
    );
}

module.exports = validate(config);