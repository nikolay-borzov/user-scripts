export default {
  /**
   * @param {RegEx} regEx
   * @param {string} str
   * @returns {Array<string>}
   */
  getMatchGroups(regEx, str) {
    let matches = []
    let match

    while ((match = regEx.exec(str)) !== null) {
      if (match.index === regEx.lastIndex) {
        regEx.lastIndex++
      }

      let groups = match.slice(1)
      if (groups.some(group => group)) {
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
    let match = regEx.exec(str)

    return match ? match[1] : null
  }
}
