import {$} from 'zx'
import path from 'node:path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distFolder = path.join(__dirname, '../dist')
// Create dist folder
await $`mkdir -p ${distFolder}`
// Clear previous build
await $`rm -rf ${distFolder}/*`

// Copy Bookshelf
await $`cp ${path.join(__dirname, '../../bookshelf/dist')}/* ${distFolder}`

// Copy Booklist
const booklistDistFolder = path.join(distFolder, 'remote', 'booklist')
await $`mkdir -p ${booklistDistFolder}`
await $`cp ${path.join(__dirname, '../../booklist/dist')}/* ${booklistDistFolder}`

// Copy Book
const bookDistFolder = path.join(distFolder, 'remote', 'book')
await $`mkdir -p ${bookDistFolder}`
await $`cp ${path.join(__dirname, '../../book/dist')}/* ${bookDistFolder}`
