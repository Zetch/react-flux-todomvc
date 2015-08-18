var webpack = require('webpack');

module.exports = {

  entry: [
    'webpack/hot/only-dev-server',
    './src/client.js'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }

};