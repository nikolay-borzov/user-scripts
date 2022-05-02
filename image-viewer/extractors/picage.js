/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  Obsolete. Replaced by stuffed.ru
*/

/** @type {Extractor} */
export const picage = {
  name: 'picage.ru',
  linkRegExp: /^http:\/\/picage\.ru/,

  async getURL(link) {
    return link.thumbnailURL.replace('picage', 'pic4you').replace('-thumb', '')
  },
}
