/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://imgtaxi.com/img-5ae5cb94811e7.html
  thumbnail:  https://imgtaxi.com/images/small-medium/2018/04/29/5ae5cb94811ac.jpg
              https://imgtaxi.com/images/small/2018/04/29/5ae5cb94811ac.jpg
  image:      https://imgtaxi.com/images/big/2018/04/29/5ae5cb94811ac.jpg
*/

/** @type {Extractor} */
export const imgtaxi = {
  name: 'imgtaxi.com',
  linkRegExp: /^https:\/\/imgtaxi\.com/,

  async getURL(link) {
    return link.thumbnailURL
      .replace('/small/', '/big/')
      .replace('/small-medium/', '/big/')
  },
}
