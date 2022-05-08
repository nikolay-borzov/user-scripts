import path from 'node:path'
import url from 'node:url'

// postCSS plugins
import cssnext from 'postcss-cssnext'
import inlineSvg from 'postcss-inline-svg'
import postcss from 'rollup-plugin-postcss'

const imagesPath = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  'icons'
)

/** @type {import('rollup').RollupOptions} */
export default {
  plugins: [
    postcss({
      inject: false,
      minimize: {
        // cssnano
        autoprefixer: false,
        reduceIdents: false, // prevent animation breaking
      },
      plugins: [
        cssnext(),
        inlineSvg({
          paths: [imagesPath],
        }),
      ],
    }),
  ],
}
