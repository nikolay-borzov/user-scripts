/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  A lot of ads
  link:       http://imgbum.net/426/13242/
  thumbnail:  http://imgbum.net/allimage/4/13242-thumb.jpeg
  image:      http://imgbum.net/allimage/4/13242.jpeg
*/

/** @type {Extractor} */
export const imgbum = {
  name: 'imgbum.net',
  linkRegExp: /^http:\/\/imgbum\.net/,

  async getURL(link) {
    return link.thumbnailURL.replace('-thumb', '')
  },
}
