const yargs = require('yargs')
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
  const rollupOptions = require(`../${scriptName}/rollup.config`)

  return {
    watch: argv.watch,
    scriptName,
    rollupOptions
  }
}
