const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('node:path')
const {ModuleFederationPlugin} = require('webpack').container

const isProd = process.env.NODE_ENV === 'production'
const isFastRefreshEnabled = process.env.FAST_REFRESH === 'true'

module.exports = {
  mode: isProd ? 'production' : 'development',

  entry: ['./src/index'],

  output: {
    filename: `[name]-[contenthash].js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    clean: true,
  },

  experiments: {
    topLevelAwait: true,
  },

  devServer: {
    liveReload: !isFastRefreshEnabled,
    hot: isFastRefreshEnabled,
    historyApiFallback: true,
    port: 3001,
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
              plugins: [...(isFastRefreshEnabled ? ['react-refresh/babel'] : [])],
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
      name: 'list',
      filename: 'remoteEntry.js',
      exposes: {
        './List': './src/List',
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
      },
    }),
    new HtmlWebpackPlugin({
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
    ...(isFastRefreshEnabled ? [new ReactRefreshWebpackPlugin()] : []),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    symlinks: true,
  },
}
