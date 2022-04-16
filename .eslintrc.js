module.exports = {
  root: true,
  ignorePatterns: ['**/*.*', '!**/*.js', 'node_modules', 'libs'],
  env: {
    browser: true,
    greasemonkey: true,
    jquery: true,
  },
  extends: ['standard', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    camelcase: ['warn', { properties: 'never' }],
  },
}
