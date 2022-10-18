const {createConfig, resolveRemote, isProd} = require('webpack-config')
const {ModuleFederationPlugin} = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = createConfig('Bookshelf', {
  output: {
    publicPath: '/',
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'bookshelf',
      remotes: {
        booklist: resolveRemote({
          key: 'booklist',
          dev: 'http://localhost:3001',
        }),
        book: resolveRemote({
          key: 'book',
          dev: 'http://localhost:3002',
        }),
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
      },
    }),
  ],
})
