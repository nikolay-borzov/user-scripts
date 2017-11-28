export default {
  getAllMatchGroups (regEx, str) {
    let results = []
    let match

    while ((match = regEx.exec(str)) !== null) {
      results.push(match[1])
    }

    return results
  },

  getMatchGroups (regEx, str) {
    let matches = []
    let match

    while ((match = regEx.exec(str)) !== null) {
      if (match.index === regEx.lastIndex) {
        regEx.lastIndex++
      }

      let groups = match.slice(1)
      if (groups.some((group) => group)) {
        matches.push(groups)
      }
    }

    return matches
  },

  getFirstMatchGroup (regEx, str) {
    let match = regEx.exec(str)

    return match ? match[1] : null
  }
}
