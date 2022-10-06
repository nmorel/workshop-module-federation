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
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'esnext',
          },
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
        './BookItem': './src/BookItem',
      },
      shared: [
        {
          'react': {
            singleton: true,
            requiredVersion: false,
            version: '0',
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
            version: '0',
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: false,
            version: '0',
          },
          'react-query': {
            requiredVersion: deps['react-query'],
          },
          'api': {
            singleton: true,
            requiredVersion: false,
          },
        },
      ],
    }),
  ],
})
