const path = require('path')
const alias = require('rollup-plugin-alias')
const metablock = require('rollup-plugin-userscript-metablock')

module.exports = {
  input: {
    input: path.resolve(__dirname, 'main.js'),
    plugins: [
      alias({
        resolve: ['.js'],
        bliss: path.resolve('libs/bliss'),
        regex: path.resolve('common/regex')
      }),
      metablock({
        file: path.resolve(__dirname, 'meta.json')
      })
    ]
  },
  output: {
    file: path.resolve('dist/pornolab-english.user.js'),
    format: 'iife'
  }
}
