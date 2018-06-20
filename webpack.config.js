const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: 'app/templates/index.html',
      filename: 'index.html'
    })
  ],
  entry: './app/index.js',
  output: {
     publicPath: '/dist/', // this will be prepended to bundle path
     filename: 'app.bundle.js',
     path: path.resolve(__dirname, 'dist')
   },
   module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
};