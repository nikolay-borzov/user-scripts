import { getURLFromPage } from './helpers.js'

/**
 *  Modern + legacy links support.
 *
 * @type {import('../url-extractor').Extractor}
 */
export const imgbb = {
  id: 'imgbb',
  name: 'ImgBB',
  linkRegExp: /\/ibb\.co/,
  imageURLRegExp: /rel="image_src" href="(?<url>http[^"]+)"/,

  async getURL(link) {
    // Legacy link format
    if (link.thumbnailURL.includes('//thumb')) {
      return link.thumbnailURL.replace('//thumb', '//image')
    }

    return getURLFromPage(link, imgbb)
  },
}
