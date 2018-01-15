import path from 'path'
import alias from 'rollup-plugin-alias'
import postcss from 'rollup-plugin-postcss'
import cleanup from 'rollup-plugin-cleanup'
import metablock from 'rollup-plugin-userscript-metablock'

// postCSS plugins
import cssnext from 'postcss-cssnext'
import inlineSvg from 'postcss-inline-svg'

export default {
  input: path.resolve(__dirname, 'main.js'),

  output: {
    file: path.resolve('dist/joyreactor-download-button.user.js'),
    format: 'iife',
    name: 'jrdb'
  },

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

    cleanup({
      comments: ['eslint', /^\*-/],
      maxEmptyLines: 1
    }),

    metablock({
      file: path.resolve(__dirname, 'meta.json'),
      version: '1.2.0'
    })
  ]
}
