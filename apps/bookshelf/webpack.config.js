const {createConfig} = require('webpack-config')

module.exports = createConfig('Bookshelf', {
  devServer: {
    port: 3000,
  },
  plugins: [],
})
