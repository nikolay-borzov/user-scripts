// eslint-disable-next-line import/no-default-export -- It's okay for a config
export default {
  /**
   * @param {string[]} filenames
   */
  '**/*.?(c)js': (filenames) => [
    `eslint --cache --fix ${filenames.join(' ')}`,
    // 'ava --fail-fast', TODO: uncomment when testing is implemented
  ],
  // Format supported non JavaScript files
  '**/*.!(?(c)js)': 'prettier --write --ignore-unknown',
}
