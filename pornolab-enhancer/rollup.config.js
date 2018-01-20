const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const alias = require('rollup-plugin-alias')
const postcss = require('rollup-plugin-postcss')
const metablock = require('rollup-plugin-userscript-metablock')
const eslint = require('rollup-plugin-eslint')

// postCSS plugins
const cssnext = require('postcss-cssnext')
const assets = require('postcss-assets')
const inlineSvg = require('postcss-inline-svg')
const atImport = require('postcss-import')
const customProperties = require('postcss-custom-properties')

const imagesPath = path.resolve(__dirname, 'icons')

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
          atImport(),
          customProperties(),
          cssnext(),
          assets({
            loadPaths: [imagesPath]
          }),
          inlineSvg({
            path: imagesPath
          })
        ]
      }),

      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),

      alias({
        resolve: ['.js'],
        bliss: path.resolve('libs/bliss'),
        store: path.resolve('common/store'),
        addStyle: path.resolve('common/addStyle'),
        regex: path.resolve('common/regex'),
        request: path.resolve('common/request')
      }),

      eslint({
        fix: true
      }),

      metablock({
        file: path.resolve(__dirname, 'meta.json')
      })
    ]
  },
  output: {
    file: path.resolve('dist/pornolab-enhancer.user.js'),
    format: 'iife'
  }
}
