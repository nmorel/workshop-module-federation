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
    .map((key) => require.resolve(`${key}/webpack.config.js`))
    .map(async (webpackConfigPath) => {
      const webpackConfig = require(webpackConfigPath)
      const publicPath: string = webpackConfig.output.publicPath

      const destDir = path.join(distFolder, publicPath)
      await $`mkdir -p ${destDir}`

      const packageDist = path.join(
        webpackConfigPath.substring(0, webpackConfigPath.length - '/webpack.config.js'.length),
        'dist'
      )
      await $`cp ${packageDist}/* ${destDir}`
    })
)
