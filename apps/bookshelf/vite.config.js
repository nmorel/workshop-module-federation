/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-unsupported-features/es-syntax */
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
const deps = require('./package.json').dependencies

const isProd = true

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    assetsDir: '.',
  },
  plugins: [
    react(),
    federation({
      name: 'bookshelf',
      remotes: {
        booklist: `${isProd ? '/remote/booklist' : '//localhost:3001'}/remoteEntry.js`,
        book: `${isProd ? '/remote/book' : '//localhost:3002'}/remoteEntry.js`,
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
