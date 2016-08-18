const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = [{
  // Entry points to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/App.js')
  ],
  // Server Configuration options
  devServer: {
    contentBase: 'src/www', // Relative directory for base of server
    devtool: 'eval',
    hot: true, // Live-reload
    inline: true,
    port: 4000, // Port Number
    host: 'localhost' // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    path: buildPath, // Path of output file
    filename: 'App.js'
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    // Moves files
    new TransferWebpackPlugin([
      { from: 'www' }
    ], path.resolve(__dirname, 'src'))
  ],
  module: {
    loaders: [
      {
        // React-hot loader and
        // All .js files
        test: /\.js$/,
        // react-hot is like browser sync and babel loads jsx and es6-7
        loaders: ['react-hot', 'babel-loader'],
        exclude: [nodeModulesPath]
      }
    ]
  }
}, {
  name: 'server-side rendering',
  entry: path.join(__dirname, 'src/server/page.js'),
  target: 'node',
  output: {
    path: buildPath,
    filename: 'server/page.generated.js',
    publicPath: buildPath
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: [
      {
        // React-hot loader and
        // All .js files
        test: /\.js$/,
        // react-hot is like browser sync and babel loads jsx and es6-7
        loaders: ['react-hot', 'babel-loader'],
        exclude: [nodeModulesPath]
      }
    ]
  }
}];

module.exports = config;
