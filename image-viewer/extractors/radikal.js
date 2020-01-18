// @ts-check

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       https://c.radikal.ru/c07/1804/0d/ae78f7fe7106.jpg
  thumbnail:  https://c.radikal.ru/c07/1804/0d/ae78f7fe7106t.jpg
  image:      https://c.radikal.ru/c07/1804/0d/ae78f7fe7106.jpg
*/

/** @type {Extractor} */
export const radikal = {
  name: 'Radikal.ru',
  linkRegEx: /https?:\/\/.\.radikal\.ru\//,

  async getUrl(link) {
    return link.url
  }
}

/*
  link:       http://radikal.ru/F/s40.radikal.ru/i087/1205/55/a8a7e55a9bc7.png.html
  thumbnail:  http://s40.radikal.ru/i087/1205/55/a8a7e55a9bc7t.jpg
  image:      https://s40.radikal.ru/i087/1205/55/a8a7e55a9bc7.png
*/

/** @type {Extractor} */
export const radikalObsolete = {
  name: 'Radikal.ru (obsolete)',
  linkRegEx: new RegExp('^http://radikal.ru/'),

  async getUrl(link) {
    const extension = link.url.split('.').slice(-2)[0]

    return link.thumbnailUrl
      .replace('http:/', 'https:/')
      .replace('t.', '.')
      .replace('jpg', extension)
  }
}
