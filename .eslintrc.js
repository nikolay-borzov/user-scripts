module.exports = {
  root: true,
  env: {
    browser: true,
    greasemonkey: true,
    jquery: true
  },
  plugins: ['prettier', 'standard'],
  extends: [
    'standard',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/standard'
  ]
}
