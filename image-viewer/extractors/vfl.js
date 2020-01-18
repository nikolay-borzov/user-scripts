// @ts-check

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://vfl.ru/fotos/e720f58222754036.html
  thumbnail:  http://images.vfl.ru/ii/1533382125/e720f582/22754036_s.jpg
  image:      http://images.vfl.ru/ii/1533382125/e720f582/22754036.jpg
*/

/** @type {Extractor} */
export const vfl = {
  name: 'VFL.ru',
  linkRegEx: new RegExp('^http://vfl.ru'),

  async getUrl(link) {
    return link.thumbnailUrl.replace('_s', '')
  }
}
