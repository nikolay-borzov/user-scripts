// @ts-check

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://imgdrive.net/img-5b4b4ac468dd6.html
  thumbnail:  https://imgdrive.net/images/small/2018/07/15/5b4b4ac468d9b.jpg
  image:      https://imgdrive.net/images/big/2018/07/15/5b4b4ac468d9b.jpg
*/

/** @type {Extractor} */
export const imgdrive = {
  name: 'ImgDrive.net',
  linkRegEx: /^https:\/\/imgdrive\.net/,

  async getUrl(link) {
    return link.thumbnailUrl.replace('small', 'big')
  },
}
