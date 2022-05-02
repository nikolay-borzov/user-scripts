/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://ibb.co/cx4HBK
  thumbnail:  https://thumb.ibb.co/cx4HBK/horrorvillian.jpg
  image:      https://image.ibb.co/fAyNdz/horrorvillian.jpg or https://image.ibb.co/cx4HBK/horrorvillian.jpg
*/

/** @type {Extractor} */
export const imgbb = {
  name: 'imgbb.com',
  linkRegExp: /^https:\/\/ibb\.co/,

  async getURL(link) {
    return link.thumbnailURL.replace('//thumb', '//image')
  },
}
