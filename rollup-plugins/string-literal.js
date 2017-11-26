import { createFilter } from 'rollup-pluginutils'

export default function stringLiteral (opts = {}) {
  if (!opts.include) {
    throw Error('include option should be specified')
  }

  const filter = createFilter(opts.include, opts.exclude)

  return {
    name: 'string-literal',

    transform (code, id) {
      if (filter(id)) {
        return {
          code: `export default \`${code}\``,
          map: { mappings: '' }
        }
      }
    }
  }
}
