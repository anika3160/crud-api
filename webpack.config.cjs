const path = require('path')
const { DefinePlugin, NormalModuleReplacementPlugin } = require('webpack')
const dotenv = require('dotenv')

module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      PORT: JSON.stringify(dotenv.config().parsed.PORT),
    }),
    new NormalModuleReplacementPlugin(new RegExp(/^\..+\.js$/), function (resource) {
      resource.request = resource.request.replace(new RegExp(/\.js$/), '')
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      fs: false,
      path: false,
      os: false,
      http: false,
    },
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    chunkFormat: 'module',
  },
}
