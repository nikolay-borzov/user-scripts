import { createFilter } from 'rollup-pluginutils'
import postcss from 'postcss'
import browserslist from 'browserslist'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'
import assets from 'postcss-assets'
import inlineSvg from 'postcss-inline-svg'
import atImport from 'postcss-import'
import customProperties from 'postcss-custom-properties'

const browsers = browserslist()

export default function stringLiteral (options = {}) {
  if (!options.include) {
    throw Error('include option should be specified')
  }

  const filter = createFilter(options.include, options.exclude)

  const plugins = [
    atImport(),
    customProperties(),
    cssnext({
      browsers
    }),
    assets({
      loadPaths: [options.imagesPath]
    }),
    inlineSvg({
      path: options.imagesPath
    }),
    cssnano({
      autoprefixer: false,
      reduceIdents: false // prevent animation breaking
    })
  ]

  return {
    name: 'css-string',

    transform (code, id) {
      if (!filter(id)) {
        return null
      }

      const opts = {
        from: undefined
      }

      return postcss(plugins)
        .process(code, opts)
        .then((result) => {
          return {
            code: `export default \`${result.css}\``,
            map: { mappings: '' }
          }
        })
    }
  }
}
