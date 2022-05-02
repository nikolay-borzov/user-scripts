/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://stuffed.ru/filmy/596773-horrorvillian.html
  thumbnail:  http://s1.stuffed.ru/y2018/04-29/0/596773-thumb.jpeg
  image:      http://s1.stuffed.ru/y2018/04-29/0/596773.jpeg
*/

/** @type {Extractor} */
export const stuffed = {
  name: 'stuffed.ru',
  linkRegExp: /^http:\/\/stuffed\.ru/,

  async getURL(link) {
    return link.thumbnailURL.replace('-thumb', '')
  },
}
