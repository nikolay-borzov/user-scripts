const path = require('path')

const { eslintBundle } = require('rollup-plugin-eslint-bundle')
const cleanup = require('rollup-plugin-cleanup')
const fileSize = require('rollup-plugin-filesize')
const metablock = require('rollup-plugin-userscript-metablock')

module.exports = (scriptFolder) => {
  return [
    eslintBundle({
      eslintOptions: {
        fix: true,
      },
    }),
    cleanup({
      comments: ['eslint', /^\*-/],
      maxEmptyLines: 1,
    }),
    fileSize({
      showGzippedSize: false,
      showMinifiedSize: false,
    }),
    metablock({
      file: path.resolve(scriptFolder, 'meta.json'),
    }),
  ]
}
