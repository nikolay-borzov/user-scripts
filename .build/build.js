
const rollup = require('rollup')
const config = require('./config')()

// Add common plugins
config.rollupOptions.input.plugins = config.rollupOptions.input.plugins.concat(require('./common-rollup-plugins'))
// Do not generate source map
config.rollupOptions.output.sourcemap = false

const log = console.log.bind(console)

// TODO: Add more verbose info
async function build () {
  try {
    log('Building...')
    const bundle = await rollup.rollup(config.rollupOptions.input)
    await bundle.write(config.rollupOptions.output)
    log('Building done!')
  } catch(e) {
    console.error(e)
  }
}

if (config.watch) {
  require('./watch')({
    scriptFolder: config.scriptFolder
  }, build)
} else {
  build()
}
