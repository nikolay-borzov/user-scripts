import resolve from 'rollup-plugin-node-resolve'
import stringLiteral from './rollup-plugins/string-literal'
import metablock from 'rollup-plugin-userscript-metablock'
import license from 'rollup-plugin-license'

export default {
  input: 'src/pornolab-enhancer/main.js',
  output: {
    file: 'dist/pornolab-enhancer.user.js',
    format: 'iife',
    name: 'ple'
  },
  plugins: [
    stringLiteral({
      include: '**/*.css'
    }),
    resolve(),
    metablock({
      file: 'src/pornolab-enhancer/meta.json',
      version: '1.5.0'
    }),
    license({
      thirdParty: {
        output: 'dist/pornolab-enhancer.dependencies.txt'
      }
    })
  ]
}
