const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const scripts = require('./scripts')

module.exports = function getConfig() {
  const argv = yargs
    .option('script', {
      alias: 's',
      demandOption: true,
      describe: 'Script ID',
      choices: scripts.getIds()
    })
    .option('watch', {
      alias: 'w',
      describe: 'Enable watch',
      type: 'boolean'
    }).argv

  const scriptName = scripts.getName(argv.script)

  const configPath = `../${scriptName}/rollup.config.js`
  const rollupOptions = fs.existsSync(path.resolve(__dirname, configPath))
    ? require(`../${scriptName}/rollup.config`)
    : {
        input: {
          plugins: []
        }
      }

  return {
    watch: argv.watch,
    scriptName,
    rollupOptions
  }
}
