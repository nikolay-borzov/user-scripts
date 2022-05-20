import { getURLFromPage } from './helpers.js'

/** @type {import('../url-extractor').Extractor} */
export const fastpic = {
  id: 'fastpic',
  name: 'FastPic',
  linkRegExp: /fastpic\.(?:ru|org)\/view/,
  imageURLRegExp: /src="(?<url>http[^"]+)" class="image img-fluid"/,
  getURL: getURLFromPage,
}

/** Groups: index, top-level domain, data, filename. */
const URL_PARTS_REGEXP = /i(\d+).+\.(ru|org)\/big(\/\d+\/\d+\/).+\/([^/]+)$/

/**
 * Direct full image link.
 *
 * @type {import('../url-extractor').Extractor}
 */
export const fastpicDirect = {
  id: 'fastpicDirect',
  name: 'FastPic (direct link)',
  linkRegExp: /fastpic\.(?:ru|org)\/big/,

  async getURL(link) {
    const [, index, domain, date, filename] =
      URL_PARTS_REGEXP.exec(link.url) || []

    const url = `https://fastpic.${domain}/view/${index}${date}${filename}.html`

    return fastpic.getURL({ ...link, url }, fastpic)
  },
}
