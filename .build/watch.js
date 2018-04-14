const chokidar = require('chokidar')

module.exports = function watch({ root, scriptFolder }, callback) {
  const paths = ['common/**', `${scriptFolder}/**`]

  const log = console.log.bind(console)

  const watcher = chokidar.watch(paths, {
    cwd: root,
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
