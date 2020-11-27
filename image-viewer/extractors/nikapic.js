/** @typedef {import('../url-extractor').Extractor} Extractor */

/** @type {Extractor} */
export const nikapic = {
  name: 'nikapic.ru',
  linkRegEx: /^http:\/\/nikapic\.ru/,

  async getUrl(link) {
    return link.thumbnailUrl.replace('/small/', '/big/')
  },
}
