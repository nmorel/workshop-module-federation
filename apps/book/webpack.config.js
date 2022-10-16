const {createConfig} = require('webpack-config')
const {ModuleFederationPlugin} = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = createConfig('Book', {
  output: {
    publicPath: 'auto',
  },
  devServer: {
    port: 3002,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'book',
      filename: 'remoteEntry.js',
      exposes: {
        './Book': './src/Book',
      },
      shared: {
        'react': {
          requiredVersion: '^18.1.0',
        },
        'react-dom': {
          requiredVersion: '^18.1.0',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
        'react-query': {
          singleton: true,
          requiredVersion: deps['react-query'],
        },
        'api': {
          singleton: true,
          requiredVersion: false,
        },
      },
    }),
  ],
})
