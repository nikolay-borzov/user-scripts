module.exports = {
  root: true,
  ignorePatterns: ['**/*.*', '!**/*.js', 'node_modules', 'libs'],
  env: {
    browser: true,
    greasemonkey: true,
    jquery: true,
  },
  plugins: ['prettier', 'standard'],
  extends: ['standard', 'plugin:prettier/recommended', 'prettier/standard'],
  rules: {
    camelcase: ['warn', { properties: 'never' }],
  },
}
