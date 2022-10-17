const {createConfig, resolveRemote, isProd} = require('webpack-config')
const {ModuleFederationPlugin} = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = createConfig('Booklist', {
  output: {
    publicPath: 'auto',
  },
  devServer: {
    port: 3001,
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
      name: 'booklist',
      filename: 'remoteEntry.js',
      exposes: {
        './Booklist': './src/Booklist',
      },
      remotes: {
        book: `promise new Promise(${resolveRemote({
          key: 'book',
          url: 'http://localhost:3002',
        })})`,
      },
      shared: {
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
