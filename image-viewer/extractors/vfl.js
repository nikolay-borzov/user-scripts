const REMOVE_SUFFIX_REGEXP = /_.?(.+)$/

/** @type {import('../url-extractor').Extractor} */
export const vfl = {
  id: 'vfl',
  name: 'VFL.Ru',
  linkRegExp: /^http:\/\/vfl\.ru/,

  async getURL(link) {
    return link.thumbnailURL.replace(REMOVE_SUFFIX_REGEXP, '$1')
  },
}
