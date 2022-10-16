const {createConfig} = require('webpack-config')
const {ModuleFederationPlugin} = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = createConfig('Booklist', {
  output: {
    publicPath: 'auto',
  },
  devServer: {
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'booklist',
      filename: 'remoteEntry.js',
      exposes: {
        './Booklist': './src/Booklist',
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
      },
    }),
  ],
})
