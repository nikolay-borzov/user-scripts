const path = require('path')

const { nodeResolve } = require('@rollup/plugin-node-resolve')
// postCSS plugins
const assets = require('postcss-assets')
const cssnext = require('postcss-cssnext')
const customProperties = require('postcss-custom-properties')
const atImport = require('postcss-import')
const inlineSvg = require('postcss-inline-svg')
const postcss = require('rollup-plugin-postcss')

const imagesPath = path.resolve(__dirname, 'icons')

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: {
    plugins: [
      postcss({
        inject: false,
        config: {
          from: undefined,
        },
        minimize: {
          // cssnano
          autoprefixer: false,
          reduceIdents: false, // prevent animation breaking
        },
        plugins: [
          atImport(),
          customProperties({
            preserve: false,
          }),
          cssnext(),
          assets({
            loadPaths: [imagesPath],
          }),
          inlineSvg({
            paths: [imagesPath],
          }),
        ],
      }),

      nodeResolve({
        mainFields: ['jsnext', 'main', 'browser'],
      }),
    ],
  },
}
