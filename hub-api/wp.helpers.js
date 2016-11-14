const CleanWebpackPlugin = require('clean-webpack-plugin');

// Due to hashing suffix of files on build, we need to clean the build dir before build.
exports.clean = function (path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without 'root' CleanWebpackPlugin won't point to our
        // our project and wil fail to work??
        root: process.cwd()
      })
    ]
  }
};