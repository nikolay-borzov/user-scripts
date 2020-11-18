// @ts-check

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://imgbox.com/k0zeyDLQ
  thumbnail:  https://thumbs2.imgbox.com/b3/8d/k0zeyDLQ_t.jpg
  image:      https://images2.imgbox.com/b3/8d/k0zeyDLQ_o.jpg
*/

/** @type {Extractor} */
export const imgbox = {
  name: 'imgbox.com',
  linkRegEx: /^http:\/\/imgbox\.com/,

  async getUrl(link) {
    return link.thumbnailUrl.replace('/thumbs', '/images').replace('_t', '_o')
  },
}
