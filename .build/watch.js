const chokidar = require('chokidar')

module.exports = function watch({ root, scriptFolder }, callback) {
  const paths = ['common/**', `${scriptFolder}/**`]

  const watcher = chokidar.watch(paths, {
    cwd: root,
    ignoreInitial: true,
    usePolling: true,
    interval: 500
  })

  watcher
    .on('add', callback)
    .on('change', callback)
    .on('ready', () => console.log('Watching', paths))
    .on('error', error => console.log(`Watcher error: ${error}`))
}
