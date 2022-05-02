import { getURLFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://fastpic.ru/view/104/2018/0429/f1a539f2e9edd3e0d70cac3dcf316466.jpg.html
  thumbnail:  http://i104.fastpic.ru/thumb/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpeg
  image:      https://i104.fastpic.ru/big/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpg
*/

/** @type {Extractor} */
export const fastpic = {
  name: 'FastPic',
  linkRegExp: /^http.?:\/\/fastpic\.ru\/view/,
  // TODO: There might be many matches (like https://fastpic.org/view/116/2022/0404/_203ed559db9fd49e5aa706cb9d1fae2a.jpg.html)
  imageURLRegExp: /src="(?<url>[^"]+)" class="image img-fluid"/,
  getURL: getURLFromPage,
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
  linkRegExp: /fastpic\.ru\/big/,

  async getURL(link) {
    let hostLink = link.url

    // Get URL from query string param
    if (hostLink.includes('?')) {
      const urlObject = new URL(hostLink)
      const parameters = new URLSearchParams(urlObject.search)

      for (const parameter of parameters.values()) {
        if (fastpicDirect.linkRegExp.test(parameter)) {
          hostLink = parameter
          break
        }
      }
    }

    const [, index, date, filename] = URL_PARTS_REGEXP.exec(hostLink)

    const url = `https://fastpic.ru/view/${index}${date}${filename}.html`

    return fastpic.getURL({ ...link, url }, fastpic)
  },
}
