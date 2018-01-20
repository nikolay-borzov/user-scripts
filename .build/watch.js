const path = require('path')
const chokidar = require('chokidar')

module.exports = function watch({
  scriptFolder
}, callback) {
  const paths = [
    'common/**',
    `${scriptFolder}/**`
  ]

  const log = console.log.bind(console)

  const watcher = chokidar.watch(paths, {
    cwd: path.resolve(__dirname, '../'),
    ignoreInitial: true,
    usePolling: true,
    interval: 500
  })

  watcher
    .on('add', callback)
    .on('change', callback)
    .on('ready', () => log('Watching', paths))
    .on('error', error => log(`Watcher error: ${error}`))
}