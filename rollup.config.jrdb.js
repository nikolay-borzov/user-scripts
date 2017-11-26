import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import stringLiteral from './rollup-plugins/string-literal'
import metablock from 'rollup-plugin-userscript-metablock'
import license from 'rollup-plugin-license'

export default {
  input: path.resolve('src/joyreactor-download-button/main.js'),
  output: {
    file: path.resolve('dist/joyreactor-download-button.user.js'),
    format: 'iife',
    name: 'jrdb'
  },
  plugins: [
    stringLiteral({
      include: '**/*.css'
    }),
    resolve(),
    metablock({
      file: path.resolve('src/joyreactor-download-button/meta.json'),
      version: '1.1.0'
    }),
    license({
      thirdParty: {
        output: path.resolve('dist/joyreactor-download-button.dependencies.txt')
      }
    })
  ]
}
