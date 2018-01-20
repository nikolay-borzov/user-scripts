const cleanup = require('rollup-plugin-cleanup')
const fileSize = require('rollup-plugin-filesize')
const eslint = require('rollup-plugin-eslint-bundle')

module.exports = [
  cleanup({
    comments: ['eslint', /^\*-/],
    maxEmptyLines: 1
  }),
  fileSize({
    showGzippedSize: false
  }),
  eslint({
    fix: true
  })
]