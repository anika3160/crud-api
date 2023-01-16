const path = require('path');
const { DefinePlugin, NormalModuleReplacementPlugin } = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  target: 'node',
  optimization: {
    minimize: false
  },
  // context: path.resolve(__dirname, '/'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new NormalModuleReplacementPlugin(new RegExp(/^\..+\.js$/), function (resource) {
      resource.request = resource.request.replace(new RegExp(/\.js$/), '');
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      "http": false,
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  //  module: true,
  },
};