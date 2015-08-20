var webpack = require('webpack');

module.exports = {

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client.js'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot', 'babel?stage=0'], exclude: /node_modules/ },
      { test: /\.js$/, loaders: ['babel?stage=0'], exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }

};