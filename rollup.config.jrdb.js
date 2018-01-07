import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import cssString from './rollup-plugins/css-string'
import metablock from 'rollup-plugin-userscript-metablock'

export default {
  input: path.resolve('src/joyreactor-download-button/main.js'),
  output: {
    file: path.resolve('dist/joyreactor-download-button.user.js'),
    format: 'iife',
    name: 'jrdb'
  },
  plugins: [
    cssString({
      include: '**/*.css'
    }),
    resolve(),
    metablock({
      file: path.resolve('src/joyreactor-download-button/meta.json'),
      version: '1.1.0'
    })
  ]
}
