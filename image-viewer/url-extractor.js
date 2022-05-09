import * as hostExtractors from './extractors/index'

/**
 * @typedef {object} Link
 * @property {string} url Image view page URL.
 * @property {string} thumbnailURL
 * @property {string} host
 */

/**
 * @typedef {object} Extractor
 * @property {string} name
 * @property {RegExp} linkRegExp Regular Expression to match view image page link.
 * @property {RegExp} [imageURLRegExp] Regular Expression to match full image URL on the image view page.
 * @property {string[]} [hosts] List of image hosts handled by the extractor.
 * @property {boolean} [hotLinkingDisabled] Whether full image cannot be loaded on hosts different from the image host.
 * @property {(link: Link, extractor: Extractor) => Promise<string | undefined>} getURL
 */

/**
 * @typedef {object} ImageHostMetadata
 * @property {string} name
 * @property {string} description
 * @property {boolean} isEnabled
 */

/** @type {Extractor[]} */
let extractorsActive = []

/** @type {Extractor[]} */
const extractors = Object.values(hostExtractors).filter(Boolean)

const extractorsByName = extractors.reduce(
  (/** @type {Record<string, Extractor>} */ result, extractor) => {
    result[extractor.name] = extractor

    return result
  },
  {}
)

export const urlExtractor = {
  /**
   * @returns {ImageHostMetadata[]}
   */
  getImageHostsMetadata() {
    const result = extractors.map(({ name, hosts }) => ({
      name,
      description: hosts ? hosts.join(', ') : '',
    }))

    return sortCaseInsensitive(result, ({ name }) => name)
  },

  /**
   * Extracts full image URL from a link.
   *
   * @param {Link} link
   */
  getImageURL(link) {
    const extractor = extractorsByName[link.host]

    return extractor.getURL(link, extractor)
  },

  /**
   * @param {string} host
   * @returns {boolean}
   */
  isHotLinkingDisabled(host) {
    return extractorsByName[host].hotLinkingDisabled ?? false
  },

  /**
   * Returns function to match URL to the Extractor's name.
   *
   * @param {string[]} enabledHosts
   * @returns {(url: string) => string | undefined}
   */
  getHostNameMatcher(enabledHosts) {
    // Keep enabled extractors
    extractorsActive = extractors.filter((extractor) =>
      enabledHosts.includes(extractor.name)
    )

    /* It's often case when neighbor links are from the same image host.
       Therefore we can improve search by checking link URL with the previous
       extractor `linkRegExp` */
    /** @type {Extractor} */
    let previousExtractor

    return (url) => {
      if (previousExtractor && previousExtractor.linkRegExp.test(url)) {
        return previousExtractor.name
      }

      const extractor = extractorsActive.find((extractor) =>
        extractor.linkRegExp.test(url)
      )

      if (extractor) {
        previousExtractor = extractor

        return extractor.name
      }
    }
  },
}

/**
 * Sorts array of objects by `getValue` result case insensitive.
 *
 * @param {any[]} items
 * @param {(item: any) => string} getValue Sort value getter.
 * @returns {any[]}
 */
function sortCaseInsensitive(items, getValue) {
  // Sorting with map
  return items
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
    .map((m) => items[m.index])
}
