import { getURLFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://www.imagebam.com/image/561a4d65163499
  thumbnail:  http://thumbnails28.imagebam.com/6517/561a4d65163499.gif
  image:      https://images3.imagebam.com/cf/52/50/561a4d65163499.jpg
 */

/** @type {Extractor} */
export const imagebam = {
  name: 'ImageBam',
  linkRegExp: /^http:\/\/www\.imagebam\.com\/image/,
  imageURLRegExp: /src="(?<url>[^"]+)".+class="main-image/,
  getURL: getURLFromPage,
}
