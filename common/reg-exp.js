export const regExp = {
  /**
   * @param {RegExp} regExp
   * @param {string} string
   * @returns {string[][]}
   */
  getMatchGroups(regExp, string) {
    const matches = []
    let match

    while ((match = regExp.exec(string)) !== null) {
      if (match.index === regExp.lastIndex) {
        regExp.lastIndex++
      }

      const groups = match.slice(1)

      if (groups.some(Boolean)) {
        matches.push(groups)
      }
    }

    return matches
  },

  /**
   * @param {RegExp} regExp
   * @param {string} string
   * @returns {string | undefined}
   */
  getFirstMatchGroup(regExp, string) {
    const match = regExp.exec(string)

    return match ? match[1] : undefined
  },
}
