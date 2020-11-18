// @ts-check

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
  linkRegEx: /^http:\/\/imgbum\.net/,

  async getUrl(link) {
    return link.thumbnailUrl.replace('-thumb', '')
  },
}
