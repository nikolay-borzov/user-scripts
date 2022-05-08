import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { getScriptIDs, getScriptName } from './scripts.js'

/**
 * @typedef {import('rollup').RollupOptions}  RollupOptions
 */

/**
 * @typedef {object} ScriptBuildConfig
 * @property {string} scriptName
 * @property {RollupOptions} rollupOptions
 * @property {boolean} [watch]
 */

/**
 * Creates build config based on command line parameters.
 *
 * @returns {Promise<ScriptBuildConfig>}
 */
export async function getConfig() {
  const argv = await yargs(hideBin(process.argv))
    .option('script', {
      alias: 's',
      demandOption: true,
      describe: 'Script ID',
      choices: getScriptIDs(),
    })
    .option('watch', {
      alias: 'w',
      describe: 'Enable watch',
      type: 'boolean',
    }).argv

  const scriptName = getScriptName(argv.script)

  const currentDirectory = path.dirname(url.fileURLToPath(import.meta.url))
  const configPath = `../${scriptName}/rollup.config.js`

  /** @type {RollupOptions} */
  let rollupOptions = {}

  if (fs.existsSync(path.resolve(currentDirectory, configPath))) {
    ;({ default: rollupOptions } = await import(configPath))
  }

  return {
    scriptName,
    rollupOptions,
    watch: argv.watch,
  }
}
