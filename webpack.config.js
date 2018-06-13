const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: './app/index.js',
  plugins: [
    new webpack.DefinePlugin({
      "APP_HOST_URL": JSON.stringify('http://localhost')
    })
  ],
  output: {
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
    ]
  },
  watch: true,
   watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  mode: 'none'
};