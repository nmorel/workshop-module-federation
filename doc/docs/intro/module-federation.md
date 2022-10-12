---
sidebar_position: 1
---

# Module Federation

https://webpack.js.org/concepts/module-federation/  
Principal développeur : https://twitter.com/ScriptedAlchemy  
Qu'est-ce que c'est ?

## Exemple

TODO faire un simple exemple inspiré de https://github.com/module-federation/module-federation-examples/tree/master/basic-host-remote

```js title="remote/webpack.config.js"
const {ModuleFederationPlugin} = require('webpack').container

module.exports = {
  // ...,
  devServer: {
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        'react': {singleton: true, requiredVersion: '^18.0.0'},
        'react-dom': {singleton: true, requiredVersion: '^18.0.0'},
      },
    }),
  ],
}
```

```js title="host/webpack.config.js"
const {ModuleFederationPlugin} = require('webpack').container

module.exports = {
  // ...,
  devServer: {
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote: `remote@//localhost:3001/remoteEntry.js`,
      },
      shared: {
        'react': {singleton: true, requiredVersion: '^18.0.0'},
        'react-dom': {singleton: true, requiredVersion: '^18.0.0'},
      },
    }),
  ],
}
```
