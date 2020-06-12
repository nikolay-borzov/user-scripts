const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')

// postCSS plugins
const cssnext = require('postcss-cssnext')
const assets = require('postcss-assets')
const inlineSvg = require('postcss-inline-svg')
const atImport = require('postcss-import')
const customProperties = require('postcss-custom-properties')

const imagesPath = path.resolve(__dirname, 'icons')

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
