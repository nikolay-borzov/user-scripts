const path = require('path')

const cleanup = require('rollup-plugin-cleanup')
const { eslintBundle } = require('rollup-plugin-eslint-bundle')
const fileSize = require('rollup-plugin-filesize')
const metablock = require('rollup-plugin-userscript-metablock')

/**
 * @param {string} scriptFolder
 * @returns {import('rollup').Plugin[]}
 */
module.exports = (scriptFolder) => {
  return [
    cleanup({
      /* Keep comments:
         - eslint-disable
         - block
         - '// fall through' (for `case` statements) */
      comments: ['eslint', /^\*-/, /\/ fall through$/],
      maxEmptyLines: 1,
    }),
    fileSize({
      showGzippedSize: false,
      showMinifiedSize: false,
    }),
    metablock({
      file: path.resolve(scriptFolder, 'meta.json'),
    }),
    eslintBundle({
      eslintOptions: {
        baseConfig: {
          // Enable linting result as userscript file
          extends: ['plugin:userscripts/recommended'],
        },
        fix: true,
      },
    }),
  ]
}
