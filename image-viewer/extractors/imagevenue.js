// @ts-check
import { getUrlFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://img18127.imagevenue.com/img.php?image=55407_horrorvillian_122_783lo.jpg
  thumbnail:  http://img18127.imagevenue.com/loc783/th_55407_horrorvillian_122_783lo.jpg
  image:      http://img28127.imagevenue.com/aAfkjfp01fo1i-3407/loc783/55407_horrorvillian_122_783lo.jpg
*/

/** @type {Extractor} */
export const imagevenue = {
  name: 'ImageVenue.com',
  linkRegEx: new RegExp('imagevenue.com/img.php'),
  imageUrlRegEx: /id=("|')thepic\1.*src=\1(?<url>[^']*)/i,

  async getUrl(link, extractor) {
    const imageUrl = await getUrlFromPage(link, extractor)
    const pageUrl = link.url

    const url = new URL(pageUrl)
    url.search = ''
    url.pathname = imageUrl

    return url.href
  },
}
