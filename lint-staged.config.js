export default {
  /**
   * @param {string[]} filenames
   */
  '**/*.?(c)js': (filenames) => [
    `eslint --cache --fix ${filenames.join(' ')}`,
    'ava --node-arguments="--loader=esmock" --fail-fast',
  ],
  // Format supported non JavaScript files
  '**/*.!(?(c)js)': 'prettier --write --ignore-unknown',
}
