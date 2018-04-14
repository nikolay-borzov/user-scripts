const path = require('path')
const alias = require('rollup-plugin-alias')
const postcss = require('rollup-plugin-postcss')

// postCSS plugins
const cssnext = require('postcss-cssnext')
const inlineSvg = require('postcss-inline-svg')

module.exports = {
  input: {
    plugins: [
      postcss({
        inject: false,
        config: {
          from: undefined
        },
        minimize: {
          // cssnano
          autoprefixer: false,
          reduceIdents: false // prevent animation breaking
        },
        plugins: [
          cssnext(),
          inlineSvg({
            path: path.resolve(__dirname, 'icons')
          })
        ]
      }),

      alias({
        resolve: ['.js'],
        dom: path.resolve('common/dom')
      })
    ]
  }
}
