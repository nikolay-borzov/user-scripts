module.exports = {
  root: true,
  env: {
    browser: true
  },
  globals: {
    'GM_addStyle': true
  },
  extends: 'standard',
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0
  }
}