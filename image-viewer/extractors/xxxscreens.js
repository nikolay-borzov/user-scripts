/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  upload doesn't work at the moment
*/

/** @type {Extractor} */
export const xxxscreens = {
  name: 'XXXScreens.com',
  linkRegExp: /^http:\/\/xxxscreens\.com/,

  async getURL(link) {
    return link.thumbnailURL.replace('small/', 'big/')
  },
}
