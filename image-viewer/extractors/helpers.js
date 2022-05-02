import { getRequest } from '../../common/api'

const request = getRequest()

/**
 * @typedef {import('../url-extractor').Link} Link
 * @typedef {import('../url-extractor').Extractor} Extractor
 */

/**
 * Extracts full image URL from image host page content.
 *
 * @param {Link} link
 * @param {Extractor} extractor
 * @returns {Promise<string | undefined>}
 */
export async function getURLFromPage(link, extractor) {
  const html = await getPageHtml(link.url)

  const match = extractor.imageURLRegExp?.exec(html)

  let url

  if (match) {
    /* First try to get named capturing group 'url'.
       Otherwise get first group match */
    url = match.groups ? match.groups.url : match[1]
  }

  if (!url) {
    console.warn(`[image-viewer] Unable to get URL from page ${link.url}`)
  }

  return url
}

/**
 * Loads page's source content.
 *
 * @param {string} pageURL
 * @returns {Promise<string>}
 */
async function getPageHtml(pageURL) {
  const response = await request(pageURL)

  return response.responseText
}
