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
      name: 'book',
      filename: 'remoteEntry.js',
      exposes: {
        './Book': './src/Book',
        './BooklistItem': './src/BooklistItem',
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
