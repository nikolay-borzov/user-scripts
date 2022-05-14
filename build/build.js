import os from 'node:os'
import path from 'node:path'
import url from 'node:url'

import { rollup, watch } from 'rollup'

import { getCommonPlugins } from './common-rollup-plugins.js'
import { getConfig } from './config.js'

/**
 * @typedef {import('rollup').RollupOptions} RollupOptions
 * @typedef {import('rollup').OutputOptions} OutputOptions
 */

const root = url.fileURLToPath(new URL('..', import.meta.url))

async function run() {
  const config = await getConfig()

  const { output, input } = createRollupOptions(config)

  const buildStartMessage = `🕓 Building ${config.scriptName}...`
  const buildFinishMessage = `✅ Building ${config.scriptName} finished!${os.EOL}`

  if (config.watch) {
    const watchEmitter = watch({
      ...input,
      output,
      watch: {
        clearScreen: true,
        chokidar: {
          cwd: root,
          ignoreInitial: true,
          usePolling: true,
          interval: 500,
        },
      },
    })

    console.log(`Watching ${config.scriptName}`, os.EOL)

    if (watchEmitter) {
      watchEmitter.on('event', (event) => {
        switch (event.code) {
          case 'START':
            console.log(buildStartMessage)
            break

          case 'END':
            console.log(buildFinishMessage)
            break

          case 'BUNDLE_END':
            event.result.close()
            break

          case 'ERROR':
            console.log(`Watcher error: ${event.error}`)
            break
        }
      })
    }
  } else {
    try {
      console.log(buildStartMessage)

      const bundle = await rollup(input)

      await bundle.write(output)
      await bundle.close()

      console.log(buildFinishMessage)
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * @param {import('./config').ScriptBuildConfig} config
 * @returns {{ input: RollupOptions; output: OutputOptions }}
 */
function createRollupOptions({ scriptName, rollupOptions }) {
  const scriptDirectory = path.resolve(root, `${scriptName}`)

  const commonPlugins = getCommonPlugins(scriptDirectory)

  return {
    input: {
      ...rollupOptions,
      plugins: [...(rollupOptions.plugins ?? []), ...commonPlugins],
      input: path.resolve(scriptDirectory, 'index.js'),
    },
    output: {
      file: path.resolve(root, `dist/${scriptName}.user.js`),
      format: 'iife',
      strict: false,
      sourcemap: false,
    },
  }
}

run()
