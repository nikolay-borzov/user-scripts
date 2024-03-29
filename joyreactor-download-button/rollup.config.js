import url from 'node:url'

// postCSS plugins
import cssnext from 'postcss-cssnext'
import inlineSvg from 'postcss-inline-svg'
import postcss from 'rollup-plugin-postcss'

const imagesPath = url.fileURLToPath(new URL('icons', import.meta.url))

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
