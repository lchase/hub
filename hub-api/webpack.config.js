const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const validate = require('webpack-validator');
const merge = require('webpack-merge');

const wpHelpers = require('./wp.helpers');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = {
  // entry: {
  //   app: PATHS.app,
  //   vendor: Object.keys(pkg.dependencies)
  // },
  entry: './src/index.js',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  // devServer: {
  //   port: 4000
  // },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.json$/,
    //     loader: 'json',
    //     include: PATHS.app,
    //     exclude: [__dirname + '/node_modules', __dirname + '/build']
    //   }
    // ],
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
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },

  output: {
    path: PATHS.build,
    filename: 'server.js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  devtool: 'eval-source-map'
};

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