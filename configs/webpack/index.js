const HtmlWebpackPlugin = require('html-webpack-plugin')
const parentModule = require('parent-module')
const path = require('node:path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const {mergeWithRules} = require('webpack-merge')

const isProd = process.env.NODE_ENV === 'production'

exports.isProd = isProd

exports.createConfig = (label = 'App', overrideConfig = {}) => {
  return mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'replace',
        exclude: 'replace',
      },
    },
  })(
    {
      mode: isProd ? 'production' : 'development',

      entry: ['./src/index'],

      output: {
        publicPath: '/',
        filename: `[name]-[contenthash].js`,
        path: path.join(path.dirname(parentModule()), 'dist'),
        clean: true,
      },

      experiments: {
        topLevelAwait: true,
      },

      devServer: {
        port: 3000,
        liveReload: true,
        hot: false,
        historyApiFallback: true,
        allowedHosts: ['workshop-module-federation.vercel.app'],
        client: {
          webSocketURL: {
            hostname: 'localhost',
          },
        },
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
                loader: require.resolve('babel-loader'),
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
            use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
          favicon: path.join(__dirname, 'favicon.ico'),
          templateContent: () => `
              <!DOCTYPE html>
              <html>
              <head>
                  <meta charset="utf-8" />
                  <title>${label}</title>
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
    },
    overrideConfig
  )
}

const devToProdUrl = 'http://localhost:4000'

exports.resolveRemote = ({key, dev}) => {
  return `promise new Promise((resolve) => {
    const {host, search} = window.location
    const params = (new URLSearchParams(search)).get('dev')
    const devs = params ? params.split(',').map(_ => _.trim()) : []

    let remoteUrl

    // BONUS
    const isHostDev = host.startsWith('localhost:300') 
    if(isHostDev) {
      if(!devs.length) remoteUrl = '${dev}/remoteEntry.js' 
      else if(devs.includes('${key}')) remoteUrl = '${dev}/remoteEntry.js' 
      else remoteUrl = '${devToProdUrl}/remote/${key}/remoteEntry.js'

    // EXERCICE
    } else {
      if(devs.includes('${key}')) remoteUrl = '${dev}/remoteEntry.js' 
      else remoteUrl = '/remote/${key}/remoteEntry.js'
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
