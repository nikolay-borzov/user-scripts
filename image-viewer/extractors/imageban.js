const DATE_PATTERN = /(\d{4})\.(\d{2})\.(\d{2})/

/** @type {import('../url-extractor').Extractor} */
export const imageban = {
  id: 'imageban',
  name: 'ImageBan.ru',
  linkRegExp: /imageban\.ru\/show/,

  async getURL(link) {
    return link.thumbnailURL
      .replace('thumbs', 'out')
      .replace(DATE_PATTERN, '$1/$2/$3')
  },
}

/**
 * Direct link full image link.
 *
 * @type {import('../url-extractor').Extractor}
 */
export const imagebanDirect = {
  id: 'imagebanDirect',
  name: 'ImageBan.ru (direct link)',
  linkRegExp: /imageban\.ru\/out/,

  async getURL(link) {
    return link.url
  },
}
