/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://imgadult.com/img-5b65bba9a6e5d.html
  thumbnail:  https://imgadult.com/upload/small/2018/08/04/5b65bba9a6e23.jpg
  image:      https://imgadult.com/upload/big/2018/08/04/5b65bba9a6e23.jpg
*/

/** @type {Extractor} */
export const imgadult = {
  name: 'ImgAdult.com',
  linkRegExp: /^https:\/\/imgadult\.com/,

  async getURL(link) {
    return link.thumbnailURL.replace('/small/', '/big/')
  },
}
