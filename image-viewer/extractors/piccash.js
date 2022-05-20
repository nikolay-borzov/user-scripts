/** @type {import('../url-extractor').Extractor}} */
export const piccash = {
  id: 'piccash',
  name: 'PicCash',
  linkRegExp: /\/piccash\.net/,

  async getURL(link) {
    return link.thumbnailURL.replace('_thumb', '_full').replace('-thumb', '')
  },
}
