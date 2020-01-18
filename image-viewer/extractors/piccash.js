// @ts-check

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://piccash.net/53489/845533/
  thumbnail:  http://piccash.net/allimage/2018/7-15/img_thumb/845533-thumb.jpeg
  image:      http://piccash.net/allimage/2018/7-15/img_full/845533.jpeg
*/

/** @type {Extractor} */
export const piccash = {
  name: 'PicCash.net',
  linkRegEx: new RegExp('^http://piccash.net/'),

  async getUrl(link) {
    return link.thumbnailUrl.replace('_thumb', '_full').replace('-thumb', '')
  }
}
