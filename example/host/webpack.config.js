const HtmlWebpackPlugin = require('html-webpack-plugin')
const {ModuleFederationPlugin} = require('webpack').container
const path = require('path')

module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    liveReload: true,
    hot: false,
    port: 3030,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote1: `remote1@//localhost:3031/remoteEntry.js`,
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: '18.1.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.1.0',
        },
      },
    }),
    new HtmlWebpackPlugin({
      templateContent: () => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <title>Host</title>
        </head>
        <body style="background-color: lightblue;">
            <div id="root"></div>
        </body>
        </html>
      `,
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
