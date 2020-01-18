// @ts-check

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://imagetwist.com/4clvkzs1b6wa/horrorvillian.jpg
  thumbnail:  https://img165.imagetwist.com/th/33192/4clvkzs1b6wa.jpg
  image:      https://img165.imagetwist.com/i/33192/4clvkzs1b6wa.jpg/horrorvillian.jpg
*/

/** @type {Extractor} */
export const imagetwist = {
  name: 'ImageTwist',
  linkRegEx: new RegExp('^http://imagetwist.com'),

  async getUrl(link) {
    const imageName = link.url
      .split('/')
      .pop()
      .replace('.html', '')
    const extension = imageName.split('.').pop()
    const imageUrl = link.thumbnailUrl
      .replace('/th/', '/i/')
      .slice(0, -extension.length)

    return `${imageUrl}${extension}/${imageName}`
  }
}

/*
  ImageTwist based. Currently generates the same link as ImageTwist.
  Keep this rule for old links
*/

const HOST_REPLACE_REG_EX = new RegExp('(picturelol|picshick|imageshimage)')

/** @type {Extractor} */
export const imagetwistBased = {
  name: 'ImageTwist based',
  hosts: ['Picturelol.com', 'PicShick.com', 'Imageshimage.com'],
  linkRegEx: new RegExp('^https?://(picturelol|picshick|imageshimage).com'),

  async getUrl(link) {
    const imageName = link.url.split('/').pop()
    const imageUrl = link.thumbnailUrl
      .replace('/th/', '/i/')
      .replace(HOST_REPLACE_REG_EX, 'imagetwist')

    return `${imageUrl}/${imageName}`
  }
}
