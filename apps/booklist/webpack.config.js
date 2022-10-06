const {createConfig, resolveRemote} = require('webpack-config')
const {ModuleFederationPlugin} = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = createConfig('List', {
  output: {
    publicPath: 'auto',
  },
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'booklist',
      filename: 'remoteEntry.js',
      exposes: {
        './Booklist': './src/Booklist',
      },
      remotes: {
        book: `promise new Promise(${resolveRemote({
          key: 'book',
          devUrl: 'http://localhost:3002',
        })})`,
      },
      shared: [
        {
          'react': {
            singleton: true,
            requiredVersion: false,
            version: '0',
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
            version: '0',
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: false,
            version: '0',
          },
          'react-query': {
            requiredVersion: deps['react-query'],
          },
          'api': {
            singleton: true,
            requiredVersion: false,
          },
        },
      ],
    }),
  ],
})
