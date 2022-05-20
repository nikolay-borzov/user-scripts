/** @type {import('../url-extractor').Extractor} */
export const imgbox = {
  id: 'imgbox',
  name: 'imgbox',
  linkRegExp: /\/imgbox\.com/,

  async getURL(link) {
    return link.thumbnailURL.replace('/thumbs', '/images').replace('_t', '_o')
  },
}
