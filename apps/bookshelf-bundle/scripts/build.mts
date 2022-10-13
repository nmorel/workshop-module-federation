import {$} from 'zx'
import path from 'node:path'
import fs from 'node:fs/promises'
import {createRequire} from 'module'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const require = createRequire(import.meta.url)

const distFolder = path.join(__dirname, '../dist')
await $`mkdir -p ${distFolder}`
await $`rm -rf ${distFolder}/*`

const packageJson = JSON.parse(await fs.readFile(path.join(__dirname, '../package.json'), 'utf8'))

await Promise.all(
  Object.keys(packageJson.dependencies)
    .map((key) => {
      // Using require.resolve to resolve the path of the module in case the module is hoist to the root node_modules
      const packageJson = require.resolve(`${key}/package.json`)
      return {
        sourceFolder: path.join(
          packageJson.substring(0, packageJson.length - '/package.json'.length),
          'dist'
        ),
        distFolder: path.join(distFolder, key === 'bookshelf' ? '/' : `/remote/${key}`),
      }
    })
    .map(async (folders) => {
      await $`mkdir -p ${folders.distFolder}`
      await $`cp ${folders.sourceFolder}/* ${folders.distFolder}`
    })
)
