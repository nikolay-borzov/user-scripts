module.exports = {
  root: true,
  env: {
    browser: true
  },
  globals: {
    'GM_addStyle': true,
    'GM_xmlhttpRequest': true,
    'GM': true
  },
  extends: 'standard',
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    indent: [
      'error',
      2,
      {
        'CallExpression': {
          arguments: 'first'
        },
        'SwitchCase': 1
      }
    ]
  }
}
