/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://imx.to/i/1tr970
  thumbnail:  https://imx.to/u/t/2018/08/14/1tr970.jpg
  image:      https://i.imx.to/i/2018/08/14/1tr970.jpg
*/

/** @type {Extractor} */
export const imx = {
  name: 'IMX.to',
  linkRegExp: /^https:\/\/imx\.to/,

  async getURL(link) {
    return link.thumbnailURL.replace('/imx', '/i.imx').replace('/u/t/', '/i/')
  },
}
