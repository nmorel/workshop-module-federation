const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('node:path')
const {ModuleFederationPlugin} = require('webpack').container

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',

  entry: ['./src/index'],

  output: {
    filename: `[name]-[contenthash].js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },

  experiments: {
    topLevelAwait: true,
  },

  devServer: {
    liveReload: true,
    hot: false,
    historyApiFallback: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              targets: {
                esmodules: true,
              },
              assumptions: {
                setPublicClassFields: true,
              },
              presets: [
                ['@babel/preset-env', {modules: false}],
                ['@babel/preset-react'],
                ['@babel/preset-typescript'],
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'bookshelf',
      remotes: {
        booklist: `booklist@//localhost:3001/remoteEntry.js`,
        book: `book@//localhost:3002/remoteEntry.js`,
      },
      shared: {
        'react': {
          singleton: true,
          eager: false,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          eager: false,
          requiredVersion: '^18.2.0',
        },
        'react-router-dom': {
          singleton: true,
          eager: false,
          requiredVersion: '^6.4.0',
        },
        'react-query': {
          requiredVersion: '^3.39.2',
        },
      },
    }),
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, 'favicon.png'),
      templateContent: () => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <title>Bookshelf</title>
        </head>
        <body>
            <div id="root"></div>
        </body>
        </html>
    `,
    }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    symlinks: true,
  },
}
