const {createConfig, resolveRemote} = require('webpack-config')
const {ModuleFederationPlugin} = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = createConfig('Bookshelf', {
  devServer: {
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'bookshelf',
      remotes: {
        booklist: `promise new Promise(${resolveRemote({
          key: 'booklist',
          devUrl: 'http://localhost:3001',
        })})`,
        book: `promise new Promise(${resolveRemote({
          key: 'book',
          devUrl: 'http://localhost:3002',
        })})`,
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
          requiredVersion: deps['react-router-dom'],
        },
      },
    }),
  ],
})
