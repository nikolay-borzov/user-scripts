import { request } from '../../common/api.js'

/**
 * Extracts full image URL from image host page content.
 *
 * @param {import('../url-extractor').Link} link
 * @param {import('../url-extractor').Extractor} extractor
 * @param {Partial<Tampermonkey.Request>} [requestDetails] Optional request parametes.
 * @returns {Promise<string | undefined>}
 */
export async function getURLFromPage(link, extractor, requestDetails) {
  const html = await getPageHtml({ url: link.url, ...requestDetails })

  const match = extractor.imageURLRegExp?.exec(html)

  let url

  if (match) {
    /* First try to get named capturing group 'url'.
       Otherwise get first group match */
    url = match.groups ? match.groups.url : match[1]
  }

  if (!url) {
    console.error(
      `[image-viewer] Failed to get URL from page source: ${link.url}`
    )
  }

  return url
}

/**
 * Loads page's source content.
 *
 * @param {Tampermonkey.Request} requestDetails
 * @returns {Promise<string>}
 */
async function getPageHtml(requestDetails) {
  const response = await request(requestDetails)

  return response.responseText
}
