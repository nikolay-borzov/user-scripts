// @ts-check

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://imageban.ru/show/2018/04/29/6174c1e6c0381b2511ec221970ff6550/jpg
  thumbnail:  http://i5.imageban.ru/thumbs/2018.04.29/6174c1e6c0381b2511ec221970ff6550.jpg
  image:      http://i5.imageban.ru/out/2018/04/29/6174c1e6c0381b2511ec221970ff6550.jpg
*/

const DATE_PATTERN = /(\d{4})\.(\d{2})\.(\d{2})/

/** @type {Extractor} */
export const imageban = {
  name: 'ImageBan.ru',
  linkRegEx: new RegExp('//imageban.ru/show'),

  async getUrl(link) {
    return link.thumbnailUrl
      .replace('thumbs', 'out')
      .replace(DATE_PATTERN, '$1/$2/$3')
  }
}

// Direct link
/** @type {Extractor} */
export const imagebanDirect = {
  name: 'ImageBan.ru (direct link)',
  linkRegEx: new RegExp('imageban.ru/out'),

  async getUrl(link) {
    return link.url
  }
}
