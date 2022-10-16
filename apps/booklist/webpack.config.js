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
      remotes: {
        book: 'book@//localhost:3002/remoteEntry.js',
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: deps['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
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
