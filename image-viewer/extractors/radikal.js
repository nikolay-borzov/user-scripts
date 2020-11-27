import { getUrlFromPage } from './helpers'

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
  },
}

/*
  link:       http://radikal.ru/fp/b7867cae0b304552ba321a5c2ad2c63c
  thumbnail:  http://s003.radikal.ru/i204/1312/e7/5231cb87bd1at.jpg
  image:      https://s003.radikal.ru/i204/1312/e7/5231cb87bd1a.png

  link:       http://radikal.ru/F/s40.radikal.ru/i087/1205/55/a8a7e55a9bc7.png.html
  thumbnail:  http://s40.radikal.ru/i087/1205/55/a8a7e55a9bc7t.jpg
  image:      https://s40.radikal.ru/i087/1205/55/a8a7e55a9bc7.png
*/

/** @type {Extractor} */
export const radikalLegacy = {
  name: 'Radikal.ru (legacy)',
  linkRegEx: /^http:\/\/radikal\.ru\//,
  imageUrlRegEx: /id="imgFullSize" src="(?<url>[^"]+)"/,
  getUrl: getUrlFromPage,
}
