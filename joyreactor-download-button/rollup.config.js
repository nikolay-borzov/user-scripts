const path = require('path')
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
          from: undefined,
        },
        minimize: {
          // cssnano
          autoprefixer: false,
          reduceIdents: false, // prevent animation breaking
        },
        plugins: [
          cssnext(),
          inlineSvg({
            paths: [path.resolve(__dirname, 'icons')],
          }),
        ],
      }),
    ],
  },
}
