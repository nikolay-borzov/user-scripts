/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,

  ignorePatterns: [
    '**/*.*',
    '!**/*.js',
    'node_modules',
    'coverage',
    'libs',
    'dist',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  env: {
    browser: true,
    greasemonkey: true,
    jquery: true,
    es2021: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:unicorn/recommended',
    'prettier-standard/prettier-file',
  ],

  settings: {
    jsdoc: {
      mode: 'typescript',
    },
    userscriptVersions: {
      tampermonkey: '4.x',
    },
  },

  // Keep rules grouped by plugin and sorted alphabetically
  rules: {
    // Generated CSS import has snake_case
    camelcase: ['warn', { properties: 'never' }],

    'object-shorthand': ['error', 'always'],

    'padding-line-between-statements': [
      'error',
      /* Empty line after import */
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      /* Empty line before return */
      { blankLine: 'always', prev: '*', next: 'return' },
      /* Empty line after const, let */
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
      /* Empty line between case and default inside switch */
      { blankLine: 'always', prev: 'case', next: ['case', 'default'] },
    ],

    /* eslint-plugin-jsdoc */

    // Descriptions should be sentence-like not comment-like
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-hyphen-before-param-description': [
      'error',
      'never',
      { tags: { property: 'never' } },
    ],
    // Adding JSDoc is preferable but not required
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-property-description': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-returns': 'off',

    /* eslint-plugin-unicorn */

    // I like reduce
    'unicorn/no-array-reduce': 'off',

    /* eslint-plugin-import */

    // Require extension for imports. Required by Node.js with `type: "module"`
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    // Force using only named exports. Default export allowed for a module main export
    'import/no-default-export': 'error',
    // Sort imports
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],

    /* eslint-plugin-prettier */

    'prettier/prettier': 'warn',

    /* eslint-plugin-userscripts */

    'userscripts/compat-grant': ['error', { requireAllCompatible: true }],
    'userscripts/compat-headers': ['error', { requireAllCompatible: true }],
  },

  overrides: [
    // User scripts
    {
      files: '*.user.js',
      extends: ['plugin:userscripts/recommended'],
    },
    // Config CommonJS files
    {
      files: '*.cjs',
      rules: {
        /* eslint-plugin-unicorn */

        'unicorn/prefer-module': 'off',
      },
    },
    // Config ESM files
    {
      files: ['lint-staged.config.js', 'rollup.config.js'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    // Build ESM files
    //{
    //  files: ['build/*.js', 'rollup.config.js'],
    //  rules: {
    //    /* eslint-plugin-import */

    //    // Require extension for imports. Required by Node.js with `type: "module"`
    //    'import/extensions': ['error', 'always', { ignorePackages: true }],
    //  },
    //},
    // Test files
    {
      files: '**/*.test.js',
      plugins: ['ava'],
      extends: ['plugin:ava/recommended'],
    },
  ],
}
