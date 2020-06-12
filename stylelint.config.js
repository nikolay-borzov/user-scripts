module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-property-sort-order-smacss',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'comment-empty-line-before': null,
  },
}
