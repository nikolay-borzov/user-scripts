var US = (function (US) {
  US.regex = {
    getAllMatchGroups (regEx, str) {
      let results = []
      let match

      while ((match = regEx.exec(str)) !== null) {
        results.push(match[1])
      }

      return results
    },

    getFirstMatchGroup (regEx, str) {
      let match = regEx.exec(str)

      return match ? match[1] : null
    }
  }

  return US
  // eslint-disable-next-line
})(US || {});
