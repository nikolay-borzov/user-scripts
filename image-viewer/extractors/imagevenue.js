// @ts-check
import { getUrlFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://www.imagevenue.com/ME12EX2A
  thumbnail:  https://cdn-thumbs.imagevenue.com/16/63/f1/ME12EX2A_t.jpg
  image:      https://cdn-images.imagevenue.com/26/e4/c7/ME12EX2A_o.jpg

  legacy:
  link:       http://img18127.imagevenue.com/img.php?image=55407_horrorvillian_122_783lo.jpg
  thumbnail:  http://img18127.imagevenue.com/loc783/th_55407_horrorvillian_122_783lo.jpg
  image:      https://cdno-data.imagevenue.com/html.img8127/upload2328/loc783/55407_horrorvillian_122_783lo.jpg
*/

/** @type {Extractor} */
export const imagevenueLegacy = {
  name: 'ImageVenue.com',
  // Exclude image on https://www.imagevenue.com/
  linkRegEx: /(imagevenue.com\/img.php|www.imagevenue.com\/\\w+$)/,
  imageUrlRegEx: /data-toggle="full">\W*<img src="(?<url>[^"]*)/im,

  getUrl: getUrlFromPage,
}
