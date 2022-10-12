const {createConfig} = require('webpack-config')

module.exports = createConfig('Bookshelf', {
  output: {
    publicPath: '/',
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    // Add Module Federation plugin configuration here
  ],
})
