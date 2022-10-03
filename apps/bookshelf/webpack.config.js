const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('node:path')
const {ModuleFederationPlugin} = require('webpack').container
const deps = require('./package.json').dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const resolveRemote = ({key, url}) => {
  return isProd
    ? `http://localhost:4000/remote/${key}/remoteEntry.js`
    : `((resolve) => {
    const params = new URLSearchParams(window.location.search)
    let remoteUrl = '${url}/remoteEntry.js'
    const devs = params.get('dev')?.split(',').map(_ => _.trim())
    if(devs?.length && !devs.includes('${key}')) {
      remoteUrl = 'http://localhost:4000/remote/${key}/remoteEntry.js'
    } 

    const script = document.createElement('script')
    script.src = remoteUrl
    script.onload = () => {
      const proxy = {
        get: (request) => window.${key}.get(request),
        init: (arg) => {
          try {
            return window.${key}.init(arg)
          } catch (e) {
            console.log('remote container already initialized')
          }
        },
      }
      resolve(proxy)
    }
    document.head.appendChild(script)
  })`
}

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
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'bookshelf',
      remotes: {
        booklist: `promise new Promise(${resolveRemote({
          key: 'booklist',
          url: 'http://localhost:3001',
        })})`,
        book: `book@${isProd ? '/remote/book' : `//localhost:3002`}/remoteEntry.js`,
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
          requiredVersion: deps['react-router-dom'],
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
    new MiniCssExtractPlugin(),
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.lightningCssMinify,
      }),
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    symlinks: true,
  },
}
