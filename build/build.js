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
config.rollupOptions.input.input = path.resolve(scriptFolder, 'index.js')
config.rollupOptions.output = {
  file: path.resolve(root, `dist/${config.scriptName}.user.js`),
  format: 'iife',
  sourcemap: false,
}

const { input, output } = config.rollupOptions

// TODO: Add more verbose info
async function build() {
  try {
    console.log('Building...')

    const bundle = await rollup.rollup(input)
    await bundle.write(output)
    await bundle.close()

    console.log('✔ Building done!')
  } catch (e) {
    console.error(e)
  }
}

if (config.watch) {
  rollup
    .watch({
      ...input,
      output,
      watch: {
        chokidar: {
          cwd: root,
          ignoreInitial: true,
          usePolling: true,
          interval: 500,
        },
      },
    })
    .on('event', (event) => {
      switch (event.code) {
        case 'START':
          console.log('Watching')
          break

        case 'BUNDLE_END':
          event.result.close()
          break

        case 'ERROR':
          console.log(`Watcher error: ${event.error}`)
          break
      }
    })
} else {
  build()
}
