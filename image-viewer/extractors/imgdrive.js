/** @type {import('../url-extractor').Extractor} */
export const imgdrive = {
  id: 'imgdrive',
  name: 'ImgDrive.net',
  linkRegExp: /\/imgdrive\.net/,
  viewMode: 'origin-download',

  async getURL(link) {
    return link.thumbnailURL
      .replace('/small/', '/big/')
      .replace('/small-medium/', '/big/')
  },
}
