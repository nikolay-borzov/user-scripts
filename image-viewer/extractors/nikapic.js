/** @typedef {import('../url-extractor').Extractor} Extractor */

/** @type {Extractor} */
export const nikapic = {
  name: 'nikapic.ru',
  linkRegExp: /^http:\/\/nikapic\.ru/,

  async getURL(link) {
    return link.thumbnailURL.replace('/small/', '/big/')
  },
}
