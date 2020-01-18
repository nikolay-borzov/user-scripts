// @ts-check
import { request } from '../../common/api'

/**
 * @typedef {import('../url-extractor').Link} Link
 * @typedef {import('../url-extractor').Extractor} Extractor
 */

/** @param {string} pageUrl */
async function getPageHtml(pageUrl) {
  const response = await request(pageUrl)

  return response.responseText
}

/**
 * @param {Link} link
 * @param {Extractor} extractor
 */
export async function getUrlFromPage(link, extractor) {
  const html = await getPageHtml(link.url)

  const match = extractor.imageUrlRegEx.exec(html)

  let url

  // First try to get named capturing group 'url'
  if (match.groups) {
    url = match.groups.url
  } else {
    // Otherwise get first group match
    url = match[1]
  }

  if (!url) {
    console.warn(`[image-viewer] Unable to get URL from page ${link.url}`)
  }

  return url
}
