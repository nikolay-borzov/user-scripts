/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  A lot of ads
  link:       http://freescreens.ru/1892/532639/
                     imgclick.ru
                     picclick.ru
                     payforpic.ru
                     picforall.ru
  thumbnail:  http://freescreens.ru/allimage/4/532639-thumb.jpeg
  image:      http://picpic.online/allimage/4/532639.jpeg
*/

const HOST_REPLACE_REG_EX = /(freescreens\.ru|imgclick\.ru|picclick\.ru|payforpic\.ru|picforall\.ru)/

/** @type {Extractor} */
export const picforall = {
  name: 'PicForAll.ru',
  hosts: [
    'freescreens.ru',
    'imgclick.ru',
    'picclick.ru',
    'payforpic.ru',
    'picforall.ru',
  ],
  linkRegEx: /^http:\/\/(freescreens\.ru|imgclick\.ru|picclick\.ru|payforpic\.ru|picforall\.ru)/,

  async getUrl(link) {
    return link.thumbnailUrl
      .replace(HOST_REPLACE_REG_EX, 'picpic.online' /* or 'p0xpicmoney.ru' */)
      .replace('-thumb', '')
  },
}
