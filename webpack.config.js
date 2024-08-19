const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./src/app.js'], // Entry point for the application
  target: 'node', // Specifies that we're targeting Node.js environment
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  mode: 'development', // Set mode to development for better debugging and performance
  devtool: 'inline-source-map', // Source maps for easier debugging
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply the rule to JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel to transpile modern JavaScript
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable hot module replacement
  ],
};
