const path = require('path')

const cleanup = require('rollup-plugin-cleanup')
const fileSize = require('rollup-plugin-filesize')
const eslint = require('rollup-plugin-eslint-bundle')
const metablock = require('rollup-plugin-userscript-metablock')

module.exports = scriptFolder => {
  return [
    cleanup({
      comments: ['eslint', /^\*-/],
      maxEmptyLines: 1
    }),
    fileSize({
      showGzippedSize: false
    }),
    eslint({
      fix: true
    }),
    metablock({
      file: path.resolve(scriptFolder, 'meta.json')
    })
  ]
}
