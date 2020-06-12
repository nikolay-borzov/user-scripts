export default {
  /**
   * @param {RegEx} regEx
   * @param {string} str
   * @returns {Array<string>}
   */
  getMatchGroups(regEx, str) {
    const matches = []
    let match

    while ((match = regEx.exec(str)) !== null) {
      if (match.index === regEx.lastIndex) {
        regEx.lastIndex++
      }

      const groups = match.slice(1)
      if (groups.some((group) => group)) {
        matches.push(groups)
      }
    }

    return matches
  },

  /**
   * @param {RegEx} regEx
   * @param {string} str
   * @returns {string}
   */
  getFirstMatchGroup(regEx, str) {
    const match = regEx.exec(str)

    return match ? match[1] : null
  },
}
