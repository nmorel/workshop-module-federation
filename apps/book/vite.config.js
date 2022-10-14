/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-unsupported-features/es-syntax */
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
const deps = require('./package.json').dependencies

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 3002,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    assetsDir: '.',
  },
  plugins: [
    react(),
    federation({
      name: 'book',
      filename: 'remoteEntry.js',
      exposes: {
        './Book': './src/Book.tsx',
        './BooklistItem': './src/BooklistItem.tsx',
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
