/** @type {import('../url-extractor').Extractor} */
export const imagetwist = {
  id: 'imagetwist',
  name: 'ImageTwist',
  linkRegExp: /imagetwist\.com/,
  viewMode: 'origin-download',

  async getURL(link) {
    // Legacy links have `.html` at the end
    const imageName = link.url.split('/').pop()?.replace('.html', '')
    const imageExtension = imageName?.split('.').pop() ?? ''

    const thumbnailExtension = link.thumbnailURL.split('.').pop() ?? ''
    const imageUrl = link.thumbnailURL
      .replace('/th/', '/i/')
      .slice(0, -thumbnailExtension.length)

    return `${imageUrl}${imageExtension}/${imageName}`
  },
}

const HOST_REPLACE_REG_EXP = /(picturelol|picshick|imageshimage)/

/**
 * ImageTwist based. Generates the same link as ImageTwist.
 * Keep this rule for old links.
 *
 * @type {import('../url-extractor').Extractor}
 */
export const imagetwistBased = {
  id: 'imagetwistBased',
  name: 'ImageTwist based (legacy)',
  hosts: ['Picturelol.com', 'PicShick.com', 'Imageshimage.com'],
  linkRegExp: /(picturelol|picshick|imageshimage)\.com/,
  viewMode: 'origin-download',

  async getURL(link) {
    const imageName = link.url.split('/').pop()
    const imageUrl = link.thumbnailURL
      .replace('/th/', '/i/')
      .replace(HOST_REPLACE_REG_EXP, 'imagetwist')

    return `${imageUrl}/${imageName}`
  },
}
