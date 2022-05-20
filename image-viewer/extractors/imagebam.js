import { getURLFromPage } from './helpers.js'

/** @type {import('../url-extractor').Extractor} */
export const imagebam = {
  id: 'imagebam',
  name: 'ImageBam',
  linkRegExp: /www\.imagebam\.com\//,
  imageURLRegExp: /src="(?<url>[^"]+)".+class="main-image/,

  async getURL(link, extractor) {
    return getURLFromPage(link, extractor, {
      // Pass through NSFW image intermediate page
      cookie: 'nsfw_inter=1',
    })
  },
}
