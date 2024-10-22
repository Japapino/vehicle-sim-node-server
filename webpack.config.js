const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./app.js'], 
  target: 'node', 
  externals: [nodeExternals()], 
  mode: 'development', 
  devtool: 'inline-source-map', 
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js', 
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};
