/** @type {import('../url-extractor').Extractor} */
export const imgbum = {
  id: 'imgbum',
  name: 'imgbum.ru',
  linkRegExp: /\/imgbum\.(net|ru)/,

  async getURL(link) {
    return link.thumbnailURL.replace('-thumb', '')
  },
}
