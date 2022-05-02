/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://www.iceimg.net/site/v/5586250#3108&5586250
                         pixsense.net
                         vestimage.site
                         chaosimg.site
  thumbnail:  http://www.iceimg.net/themes/latest/ssd/small/3108/small-horrorvillian.jpg
  image:      http://www.iceimg.net/themes/latest/ssd/big/3108/horrorvillian.jpg
              ...
              https://www.fortstore.net/themes/latest/ssd/big/3108/horrorvillian.jpg
*/

const HOST_REPLACE_REG_EX =
  /(iceimg\.net|pixsense\.net|vestimage\.site|chaosimg\.site)/

/** @type {Extractor} */
export const pixsense = {
  name: 'PixSense',
  hosts: [
    'www.iceimg.net',
    'www.pixsense.net',
    'www.vestimage.site',
    'www.chaosimg.site',
  ],
  linkRegExp:
    /^http:\/\/www\.(iceimg\.net|pixsense\.net|vestimage\.site|chaosimg\.site)/,

  async getURL(link) {
    return link.thumbnailURL
      .replace(HOST_REPLACE_REG_EX, 'fortstore.net')
      .replace('small-', '')
      .replace('/small/', '/big/')
  },
}
