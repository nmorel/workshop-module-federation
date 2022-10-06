const path = require('node:path')
const rootDir = path.join(__dirname, '../..')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [`${rootDir}/{apps,packages}/*/src/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {},
  },
  plugins: [],
}
