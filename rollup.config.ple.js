import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'
import cssString from './rollup-plugins/css-string'
import metablock from 'rollup-plugin-userscript-metablock'

export default {
  input: 'src/pornolab-enhancer/main.js',
  output: {
    file: 'dist/pornolab-enhancer.user.js',
    format: 'iife',
    name: 'ple'
  },
  plugins: [
    cssString({
      include: '**/*.css',
      imagesPath: path.resolve('src/pornolab-enhancer/icons')
    }),
    resolve(),
    alias({
      resolve: ['.js'],
      bliss: path.resolve('src/libs/bliss'),
      store: path.resolve('src/common/store'),
      addStyle: path.resolve('src/common/addStyle'),
      regex: path.resolve('src/common/regex'),
      request: path.resolve('src/common/request')
    }),
    metablock({
      file: 'src/pornolab-enhancer/meta.json',
      version: '1.9.0'
    })
  ]
}
