const path = require('path')
const alias = require('rollup-plugin-alias')

module.exports = {
  input: {
    plugins: [
      alias({
        resolve: ['.js'],
        bliss: path.resolve('libs/bliss'),
        regex: path.resolve('common/regex')
      })
    ]
  }
}
