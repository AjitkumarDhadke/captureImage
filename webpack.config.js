const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/register");
require("@babel/polyfill");

module.exports = {
  entry: {
    entry: ['@babel/polyfill','./index.js']
  },
  output: {
    path: __dirname + './.tmp/public',
    filename: 'bundle.js',
    //publicPath: '/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
		    exclude: [/node_modules/, /api/, /config/]
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
	  }
    ],
  
  },
  devServer: {
    historyApiFallback: false,
    hot: true,
    inline: true,
    //filename: 'bundle.js',
    //index: './assets/index.html'
    //port: 2002,
    //contentBase: 'assets/index.html',
    //publicPath: __dirname + './.tmp/public'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    })
  ]
};