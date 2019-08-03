var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = 'development';
var getPlugins = function (env) {
  var plugins = [new webpack.optimize.OccurenceOrderPlugin(), new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  }), new ExtractTextPlugin('bundle.css')];

  return plugins;
};

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    index: './src/main/webapp/js/index.js',
  },
  output: {
    path: path.join(__dirname, './src/main/resources/static/dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/dist/',

  },
  module: {
    noParse: [/autoit.js/],
    loaders: [{
      test: /\.js$/,
      loader: ['babel'],
      query: {
        presets: ['es2015', 'stage-0', 'react']
      },
      //exclude: /node_modules/,
      include: [path.resolve(__dirname, 'src/main/webapp/js'), path.resolve(__dirname, "src/main/webapp/less")]
    },
      {
        test: /\.less$|\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: getPlugins(env),
  devServer: {
    port: 3000,
    proxy: {
      '*': {
        target: 'http://localhost:5000',
        secure: false,
        // node-http-proxy option - don't add /localhost:8080/ to proxied request paths
        prependPath: false,
        prependPath: false,
      },
    },
    publicPath: 'http://localhost:3000/dist/',
  },

};

