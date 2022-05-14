import url from 'node:url'

import { nodeResolve } from '@rollup/plugin-node-resolve'
// postCSS plugins
import assets from 'postcss-assets'
import cssnext from 'postcss-cssnext'
import customProperties from 'postcss-custom-properties'
import atImport from 'postcss-import'
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
        atImport(),
        customProperties({
          preserve: false,
        }),
        cssnext(),
        assets({
          loadPaths: [imagesPath],
        }),
        inlineSvg({
          paths: [imagesPath],
        }),
      ],
    }),

    nodeResolve({
      mainFields: ['jsnext', 'main', 'browser'],
    }),
  ],
}
