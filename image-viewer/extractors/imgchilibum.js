/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://imgchilibum.ru/v.php?id=1b931abd5b281da99daa3b20cafd3534
  thumbnail:  http://imgchilibum.ru/pic_s/1b931abd5b281da99daa3b20cafd3534.jpg
  image:      http://imgchilibum.ru/pic_b/1b931abd5b281da99daa3b20cafd3534.jpg
*/

/** @type {Extractor} */
export const imgchilibum = {
  name: 'imgchilibum.ru',
  linkRegEx: /^http:\/\/imgchilibum\.ru\/v/,

  async getUrl(link) {
    return link.thumbnailUrl.replace('_s/', '_b/')
  },
}
