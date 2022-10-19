const {createConfig} = require('webpack-config')
const {ModuleFederationPlugin} = require('webpack').container

module.exports = createConfig('Bookshelf', {
  output: {
    publicPath: '/',
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'TODO',
      remotes: {
        TODO: 'TODO',
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: '18.1.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.1.0',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.4.2',
        },
        'react-query': {
          singleton: true,
          requiredVersion: '^3.39.2',
        },
      },
    }),
  ],
})
