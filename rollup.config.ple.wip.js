import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import stringLiteral from './rollup-plugins/string-literal'
import metablock from 'rollup-plugin-userscript-metablock'

export default {
  input: path.resolve('src/pornolab-enhancer/main.js'),
  output: {
    file: path.resolve('dist/pornolab-enhancer-wip.user.js'),
    format: 'iife',
    name: 'ple'
  },
  plugins: [
    stringLiteral({
      include: '**/*.css'
    }),
    resolve(),
    metablock({
      file: path.resolve('src/pornolab-enhancer/meta.wip.json'),
      version: '0.0.3'
    })
  ]
}
