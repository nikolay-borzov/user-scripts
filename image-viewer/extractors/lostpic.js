/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://lostpic.net/image/nQRT
  thumbnail:  http://img11.lostpic.net/2018/08/04/e96797434cb6b6a4df60b3e77c293226.th.jpg
  image:      https://img11.lostpic.net/2018/08/04/e96797434cb6b6a4df60b3e77c293226.jpg
*/

/** @type {Extractor} */
export const lostpic = {
  name: 'Lostpic.net',
  linkRegExp: /^http:\/\/lostpic\.net/,

  async getURL(link) {
    return link.thumbnailURL.replace('.th', '').replace('http:', 'https:')
  },
}
