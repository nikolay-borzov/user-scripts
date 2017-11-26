import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import stringLiteral from './rollup-plugins/string-literal'
import metablock from 'rollup-plugin-userscript-metablock'
import license from 'rollup-plugin-license'

export default {
  input: path.resolve('src/pornolab-enhancer/main.js'),
  output: {
    file: path.resolve('dist/pornolab-enhancer.user.js'),
    format: 'iife',
    name: 'ple'
  },
  plugins: [
    stringLiteral({
      include: '**/*.css'
    }),
    resolve(),
    metablock({
      file: path.resolve('src/pornolab-enhancer/meta.json'),
      version: '0.0.2'
    }),
    license({
      thirdParty: {
        output: path.resolve('dist/pornolab-enhancer.dependencies.txt')
      }
    })
  ]
}
