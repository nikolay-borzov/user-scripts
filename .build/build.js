const path = require('path')
const rollup = require('rollup')
const config = require('./config')()

const root = path.resolve(__dirname, '../')
const scriptFolder = path.resolve(root, `${config.scriptName}`)

// Add common plugins
const commonPlugins = require('./common-rollup-plugins')(scriptFolder)
config.rollupOptions.input.plugins = config.rollupOptions.input.plugins.concat(
  commonPlugins
)
// Set input and output
config.rollupOptions.input.input = path.resolve(scriptFolder, 'main.js')
config.rollupOptions.output = {
  file: path.resolve(root, `dist/${config.scriptName}.user.js`),
  format: 'iife',
  sourcemap: false
}

const log = console.log.bind(console)

// TODO: Add more verbose info
async function build() {
  try {
    log('Building...')
    const bundle = await rollup.rollup(config.rollupOptions.input)
    await bundle.write(config.rollupOptions.output)
    log('Building done!')
  } catch (e) {
    console.error(e)
  }
}

if (config.watch) {
  require('./watch')(
    {
      root,
      scriptFolder: config.scriptName
    },
    build
  )
} else {
  build()
}
