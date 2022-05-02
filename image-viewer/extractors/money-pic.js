/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://money-pic.ru/64/5384/
  thumbnail:  http://money-pic.ru/allimage/7/5384-thumb.jpeg
  image:      http://money-pic.ru/allimage/7/5384.jpeg
*/

/** @type {Extractor} */
export const moneyPic = {
  name: 'money-pic.ru',
  linkRegExp: /^http:\/\/money-pic\.ru/,

  async getURL(link) {
    return link.thumbnailURL.replace('-thumb', '')
  },
}
