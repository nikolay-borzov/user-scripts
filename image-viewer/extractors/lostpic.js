// @ts-check

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://lostpic.net/image/nQRT
  thumbnail:  http://img11.lostpic.net/2018/08/04/e96797434cb6b6a4df60b3e77c293226.th.jpg
  image:      https://img11.lostpic.net/2018/08/04/e96797434cb6b6a4df60b3e77c293226.jpg
*/

/** @type {Extractor} */
export const lostpic = {
  name: 'Lostpic.net',
  linkRegEx: new RegExp('^http://lostpic.net'),

  async getUrl(link) {
    return link.thumbnailUrl.replace('.th', '').replace('http:', 'https:')
  }
}
