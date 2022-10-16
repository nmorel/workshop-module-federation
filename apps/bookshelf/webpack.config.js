const {createConfig} = require('webpack-config')
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
        booklist: 'booklist@//localhost:3001/remoteEntry.js',
        book: 'book@//localhost:3002/remoteEntry.js',
      },
      shared: {
        'react': {
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
