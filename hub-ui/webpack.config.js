const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pkg = require('./package.json');
const wpHelpers = require('./wp.helpers');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin({
  filename: "[name].css",
  disable: false,
  allChunks: true
});
let extractLESS = new ExtractTextPlugin({
  filename: "[name].less",
  disable: false,
  allChunks: true
});

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  style: [
    path.join(__dirname, 'public', 'font-awesome-4.6.3', 'css', 'font-awesome.min.css'),
    path.join(__dirname, 'public', 'bootstrap', 'css', 'bootstrap.min.css'),
    path.join(__dirname, 'public', 'css', 'AdminLTE.min.css'),
    path.join(__dirname, 'public', 'css', 'skins', 'skin-blue.min.css'),
    path.join(__dirname, 'assets', 'style', 'main.less'),
    path.join(__dirname, 'public', 'js', 'plugins', 'iCheck', 'square', 'blue.css'),
    path.join(__dirname, 'node_modules', 'antd', 'dist', 'antd.css')
  ],
  images: [
    path.join(__dirname, 'public', 'img'),
    path.join(__dirname, 'assets', 'img'),
    path.join(__dirname, 'public', 'js', 'plugins', 'iCheck', 'square')
  ],
  fonts: [
    path.join(__dirname, 'public', 'bootstrap', 'fonts', 'glpyhicons-halflings-regular.eot'),
  ]
};

let HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app,
    vendor: Object.keys(pkg.dependencies)
  },
  devServer: {
    port: 4001
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
        include: PATHS.app
      },
      {
        test: /\.less$/,
        use: extractLESS.extract(['css-loader', 'less-loader']),
        include: PATHS.style
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader']),
        include: PATHS.style
      }, 
      {
        test: /\.(jpg|png)$/,
        use: 'url-loader?limit=10000',
        include: PATHS.images
      },
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=image/svg+xml" }
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
    extractLESS,
    //TODO: use DllPlugin to further optimize build time
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ]
};

let config = {};

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

module.exports = config;