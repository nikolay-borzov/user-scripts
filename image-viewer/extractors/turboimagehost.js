// @ts-check
import { getUrlFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://www.turboimagehost.com/p/38487267/horrorvillian.jpg.html
  thumbnail:  https://s7d1.turboimg.net/t1/38487267_horrorvillian.jpg
  image:      https://s7d1.turboimg.net/sp/444009b30201bb2432d005ee9c0e648c/horrorvillian.jpg
*/

/** @type {Extractor} */
export const turboimagehost = {
  name: 'TurboImageHost',
  linkRegEx: /^https:\/\/www\.turboimagehost\.com\/p/,
  imageUrlRegEx: /property="og:image" content="([^"]*)"/,
  getUrl: getUrlFromPage,
}
