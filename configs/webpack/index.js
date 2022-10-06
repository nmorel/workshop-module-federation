const HtmlWebpackPlugin = require('html-webpack-plugin')
const parentModule = require('parent-module')
const path = require('node:path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const {mergeWithRules} = require('webpack-merge')

const isProd = process.env.NODE_ENV === 'production'

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
        filename: `[name]-[contenthash].js`,
        path: path.join(path.dirname(parentModule()), 'dist'),
        clean: true,
      },

      experiments: {
        topLevelAwait: true,
      },

      devServer: {
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
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
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

exports.resolveRemote = ({key, devUrl}) => {
  return `((resolve) => {
    const {host, search} = window.location
    const params = new URLSearchParams(search)
    let remoteUrl = '${devUrl}/remoteEntry.js'
    const devs = params.get('dev')?.split(',').map(_ => _.trim())
    if (!devs?.length || !devs.includes('${key}')) {
      let prefixUrl = '/'
      if (host.startsWith('localhost:300')) {
        // Host is in dev mode, redirecting to local prod server
        prefixUrl = 'http://localhost:4000/'
      }
      remoteUrl = prefixUrl + 'remote/${key}/remoteEntry.js'
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
