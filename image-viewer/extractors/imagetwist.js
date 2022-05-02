/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://imagetwist.com/4clvkzs1b6wa/horrorvillian.jpg
  thumbnail:  https://img165.imagetwist.com/th/33192/4clvkzs1b6wa.jpg
  image:      https://img165.imagetwist.com/i/33192/4clvkzs1b6wa.jpg/horrorvillian.jpg

  Subforum:
  link:       https://phun.imagetwist.com/wtfkpgxua72o/horrorvillian.jpg
  thumbnail:  https://i7phun.imagetwist.com/th/00001/wtfkpgxua72o.jpg
  image:      https://i7phun.imagetwist.com/i/00001/wtfkpgxua72o.jpg/horrorvillian.jpg
*/

/** @type {Extractor} */
export const imagetwist = {
  name: 'ImageTwist',
  linkRegExp: /imagetwist\.com/,

  async getURL(link) {
    const imageName = link.url.split('/').pop()?.replace('.html', '')
    const extension = imageName?.split('.').pop()
    const imageUrl = link.thumbnailURL
      .replace('/th/', '/i/')
      .slice(0, -(extension?.length ?? 0))

    return `${imageUrl}${extension}/${imageName}`
  },
}

/*
  ImageTwist based. Currently generates the same link as ImageTwist.
  Keep this rule for old links
*/

const HOST_REPLACE_REG_EXP = /(picturelol|picshick|imageshimage)/

/** @type {Extractor} */
export const imagetwistBased = {
  name: 'ImageTwist based (legacy)',
  hosts: ['Picturelol.com', 'PicShick.com', 'Imageshimage.com'],
  linkRegExp: /^https?:\/\/(picturelol|picshick|imageshimage)\.com/,

  async getURL(link) {
    const imageName = link.url.split('/').pop()
    const imageUrl = link.thumbnailURL
      .replace('/th/', '/i/')
      .replace(HOST_REPLACE_REG_EXP, 'imagetwist')

    return `${imageUrl}/${imageName}`
  },
}
