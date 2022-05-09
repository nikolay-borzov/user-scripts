/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  A lot of ads
  link:       http://freescreens.ru/1892/532639/
                     imgclick.ru
                     picclick.ru
                     payforpic.ru
                     picforall.ru
  thumbnail:  http://freescreens.ru/allimage/4/532639-thumb.jpeg
  image:      http://freescreens.ru/allimage/4/532639.jpeg
*/

/** @type {Extractor} */
export const picforall = {
  name: 'PicForAll.ru',
  hosts: [
    'freescreens.ru',
    'imgclick.ru',
    'picclick.ru',
    'payforpic.ru',
    'picforall.ru',
    'imgbase.ru',
  ],
  linkRegExp:
    /^http:\/\/(freescreens\.ru|imgclick\.ru|picclick\.ru|payforpic\.ru|picforall\.ru)/,

  async getURL(link) {
    return link.thumbnailURL.replace('-thumb', '')
  },
}
