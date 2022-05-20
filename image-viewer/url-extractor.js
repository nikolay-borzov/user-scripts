import * as hostExtractors from './extractors/index.js'

/**
 * @typedef {object} Link
 * @property {string} url Image view page URL.
 * @property {string} thumbnailURL
 * @property {string} host
 */

/**
 * @typedef {object} Extractor
 * @property {string} id
 * @property {string} name
 * @property {RegExp} linkRegExp Regular Expression to match view image page link.
 * @property {RegExp} [imageURLRegExp] Regular Expression to match full image URL on the image view page.
 * @property {string[]} [hosts] List of image hosts handled by the extractor.
 * @property {'default' | 'new-tab' | 'origin-download'} [viewMode='default'] Full image view mode.
 * - 'default' or undefined - View on the page by hotlinking the image.
 * - 'new-tab' - Open image in the new browser tab.
 * - 'origin-download' - Load image from the host as blob (overcomes hotlinking restriction).
 * @property {(link: Link, extractor: Extractor) => Promise<string | undefined>} getURL
 */

/**
 * @typedef {object} ImageHostMetadata
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {boolean} isEnabled
 */

/** @type {Extractor[]} */
let extractorsActive = []

/** @type {Extractor[]} */
const extractors = Object.values(hostExtractors).filter(Boolean)

const extractorsByID = extractors.reduce(
  (/** @type {Record<string, Extractor>} */ result, extractor) => {
    result[extractor.id] = extractor

    return result
  },
  {}
)

export const urlExtractor = {
  /**
   * @returns {ImageHostMetadata[]}
   */
  getImageHostsMetadata() {
    const result = extractors.map(({ id, name, hosts }) => ({
      id,
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
  async getImageURL(link) {
    const extractor = extractorsByID[link.host]

    const imageURL = await extractor.getURL(link, extractor)

    if (!imageURL) {
      console.error(
        `[image-viewer] Failed to get URL for ${link.host}:${link.url}`
      )
    }

    return imageURL
  },

  /**
   * @param {string} hostId
   */
  getExtractorByHost(hostId) {
    return extractorsByID[hostId]
  },

  /**
   * Returns function to match URL to the Extractor's name.
   *
   * @param {string[]} enabledHosts
   * @returns {(url: string) => Extractor | undefined}
   */
  getHostExtractorMatcher(enabledHosts) {
    // Keep enabled extractors
    extractorsActive = extractors.filter((extractor) =>
      enabledHosts.includes(extractor.id)
    )

    /* It's often case when neighbor links are from the same image host.
       Therefore we can speed up search by checking link URL with the previous
       extractor `linkRegExp` */
    /** @type {Extractor} */
    let previousExtractor

    return (url) => {
      if (previousExtractor && previousExtractor.linkRegExp.test(url)) {
        return previousExtractor
      }

      const extractor = extractorsActive.find((extractor) =>
        extractor.linkRegExp.test(url)
      )

      if (extractor) {
        previousExtractor = extractor

        return extractor
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
