// @ts-check
import { getUrlFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://fastpic.ru/view/104/2018/0429/f1a539f2e9edd3e0d70cac3dcf316466.jpg.html
  thumbnail:  http://i104.fastpic.ru/thumb/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpeg
  image:      https://i104.fastpic.ru/big/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpg
*/

/** @type {Extractor} */
export const fastpic = {
  name: 'FastPic',
  linkRegEx: new RegExp('^http.?://fastpic.ru/view'),
  imageUrlRegEx: new RegExp(`src="(?<url>[^"]+)" class="image img-fluid"`),
  getUrl: getUrlFromPage,
}

/*
  link:       https://i104.fastpic.ru/big/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpg
    i(104) big(2018/0429/) f1a539f2e9edd3e0d70cac3dcf316466.jpg
  link:       http://fastpic.ru/view/ + 104 + /2018/0429/ + f1a539f2e9edd3e0d70cac3dcf316466.jpg + .html
*/

const URL_PARTS_REGEXP = /i(\d+).+big(\/\d+\/\d+\/).+\/([^/]+)$/

/** @type {Extractor} */
export const fastpicDirect = {
  name: 'FastPic (direct link)',
  linkRegEx: new RegExp('fastpic.ru/big'),

  async getUrl(link) {
    const [, index, date, filename] = URL_PARTS_REGEXP.exec(link.url)

    const url = `https://fastpic.ru/view/${index}${date}${filename}.html`

    return fastpic.getUrl({ ...link, url }, fastpic)
  },
}
