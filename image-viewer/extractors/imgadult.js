/** @type {import('../url-extractor').Extractor} */
export const imgadult = {
  id: 'imgadult',
  name: 'ImgAdult',
  linkRegExp: /\/imgadult\.com/,

  async getURL(link) {
    return link.thumbnailURL.replace('/small/', '/big/')
  },
}
