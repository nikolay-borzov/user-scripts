import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'
import postcss from 'rollup-plugin-postcss'
import metablock from 'rollup-plugin-userscript-metablock'
import eslint from 'rollup-plugin-eslint'
import cleanup from 'rollup-plugin-cleanup'

// postCSS plugins
import cssnext from 'postcss-cssnext'
import assets from 'postcss-assets'
import inlineSvg from 'postcss-inline-svg'
import atImport from 'postcss-import'
import customProperties from 'postcss-custom-properties'

const imagesPath = path.resolve(__dirname, 'icons')

export default {
  input: path.resolve(__dirname, 'main.js'),

  output: {
    file: 'dist/pornolab-enhancer.user.js',
    format: 'iife',
    name: 'ple'
  },

  // Doesn't work https://github.com/Microsoft/vscode/issues/36994
  watch: {
    chokidar: false,
    include: [
      'common/**',
      'pornolab-enhancer/**'
    ],
    exclude: 'node_modules/**'
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

    cleanup({
      comments: ['eslint', /^\*-/],
      maxEmptyLines: 1
    }),

    metablock({
      file: path.resolve(__dirname, 'meta.json'),
      version: '1.10.0'
    })
  ]
}
