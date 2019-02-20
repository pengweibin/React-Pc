var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/root.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
  devServer: { 
    host: '127.0.0.1',
    port: 8088,
    watchOptions: {
      poll: true
    }
  },
  output: {
    path: __dirname,
    filename: "./src/bundle.js"
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: {
      '@': resolve('src'),
    }
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
