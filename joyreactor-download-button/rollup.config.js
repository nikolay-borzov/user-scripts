const path = require('path')
const alias = require('rollup-plugin-alias')
const postcss = require('rollup-plugin-postcss')
const metablock = require('rollup-plugin-userscript-metablock')

// postCSS plugins
const cssnext = require('postcss-cssnext')
const inlineSvg = require('postcss-inline-svg')

module.exports = {
  input: {
    input: path.resolve(__dirname, 'main.js'),
    plugins: [
      postcss({
        inject: false,
        config: {
          from: undefined
        },
        minimize: { // cssnano
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
      }),

      metablock({
        file: path.resolve(__dirname, 'meta.json')
      })
    ]
  },
  output: {
    file: path.resolve('dist/joyreactor-download-button.user.js'),
    format: 'iife'
  }
}
