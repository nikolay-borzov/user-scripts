import path from 'node:path'

import cleanup from 'rollup-plugin-cleanup'
import { eslintBundle } from 'rollup-plugin-eslint-bundle'
import fileSize from 'rollup-plugin-filesize'
import metablock from 'rollup-plugin-userscript-metablock'

/**
 * Returns rollup plugins common for all userscripts.
 *
 * @param {string} scriptDirectory Userscript directory.
 * @returns {import('rollup').Plugin[]}
 */
export function getCommonPlugins(scriptDirectory) {
  return [
    cleanup({
      /* Keep comments:
         - eslint-disable
         - block
         - '// fall through' (for `case` statements) */
      comments: ['eslint', /^\*-/, /\/ fall through$/],
      maxEmptyLines: 1,
    }),
    fileSize({
      showGzippedSize: false,
      showMinifiedSize: false,
    }),
    metablock({
      file: path.resolve(scriptDirectory, 'meta.json'),
      override: {
        author: 'nikolay-borzov',
        license: 'MIT',
        namespace: 'https://github.com/nikolay-borzov',
        homepageURL: 'https://github.com/nikolay-borzov/user-scripts',
        supportURL: 'https://github.com/nikolay-borzov/user-scripts/issues',
        noframes: true,
      },
      order: [
        'name',
        'version',
        'description',
        'namespace',
        'author',
        'license',
        'icon',
        'homepageURL',
        'supportURL',
        'include',
        'match',
        'connect',
        'noframes',
        'run-at',
      ],
      validator: 'warn',
      manager: 'tampermonkey',
    }),
    eslintBundle({
      eslintOptions: {
        baseConfig: {
          // Enable linting result as userscript file
          extends: ['plugin:userscripts/recommended'],
        },
        fix: true,
      },
    }),
  ]
}
