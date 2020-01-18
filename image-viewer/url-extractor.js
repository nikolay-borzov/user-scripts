// @ts-check

import * as hostExtractors from './extractors/index'

/**
 * @typedef {object} Link
 * @property {string} url
 * @property {string} thumbnailUrl
 * @property {string} host
 */

/**
 * @typedef {object} Extractor
 * @property {string} name
 * @property {RegExp} linkRegEx
 * @property {RegExp} [imageUrlRegEx]
 * @property {string[]} [hosts]
 * @property {(link: Link, extractor: Extractor) => Promise<string>} getUrl
 */

export default (function() {
  function sortCaseInsensitive(array, getValue) {
    // Sorting with map
    return array
      .map((value, index) => ({ index, value: getValue(value).toLowerCase() }))
      .sort((a, b) => {
        if (a.value > b.value) {
          return 1
        }
        if (a.value < b.value) {
          return -1
        }
        return 0
      })
      .map(m => array[m.index])
  }

  let extractorsActive = []

  /** @type {Extractor[]} */
  const extractors = Object.values(hostExtractors).filter(Boolean)

  const extractorsByName = extractors.reduce((result, extractor) => {
    result[extractor.name] = extractor
    return result
  }, {})

  return {
    getImageHostsInfo() {
      const result = extractors.map(e => ({
        name: e.name,
        description: e.hosts ? e.hosts.join(', ') : ''
      }))

      return sortCaseInsensitive(result, value => value.name)
    },

    getImageUrl(link) {
      const extractor = extractorsByName[link.host]

      return extractor.getUrl(link, extractor)
    },

    getHostNameMatcher(enabledHosts) {
      // Keep enabled extractors
      extractorsActive = extractors.filter(e => enabledHosts.includes(e.name))

      // It is often case when neighbor links are from the same image host. Therefore
      // we can improve search by checking link URL with the previous extractor
      // linkRegEx
      let prevExtractor = null

      return url => {
        if (prevExtractor && prevExtractor.linkRegEx.test(url)) {
          return prevExtractor.name
        }

        const extractor = extractorsActive.find(e => e.linkRegEx.test(url))

        if (extractor) {
          prevExtractor = extractor
          return extractor.name
        }

        return null
      }
    }
  }
})()
