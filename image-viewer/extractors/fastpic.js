import { getURLFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://fastpic.org/view/104/2018/0429/f1a539f2e9edd3e0d70cac3dcf316466.jpg.html
  thumbnail:  http://i104.fastpic.org/thumb/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpeg
  image:      https://i104.fastpic.org/big/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpg
*/

/** @type {Extractor} */
export const fastpic = {
  name: 'FastPic',
  linkRegExp: /^http.?:\/\/fastpic\.(?:ru|org)\/view/,
  imageURLRegExp: /src="(?<url>http[^"]+)" class="image img-fluid"/,
  getURL: getURLFromPage,
}

/*
  link:       https://i104.fastpic.org/big/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpg
                      i(104) big(2018/0429/) f1a539f2e9edd3e0d70cac3dcf316466.jpg
  link:       http://fastpic.org/view/ + 104 + /2018/0429/ + f1a539f2e9edd3e0d70cac3dcf316466.jpg + .html
*/

/** Groups: index, top-level domain, data, filename. */
const URL_PARTS_REGEXP = /i(\d+).+\.(ru|org)\/big(\/\d+\/\d+\/).+\/([^/]+)$/

/** @type {Extractor} */
export const fastpicDirect = {
  name: 'FastPic (direct link)',
  linkRegExp: /fastpic\.(?:ru|org)\/big/,

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

    const [, index, domain, date, filename] =
      URL_PARTS_REGEXP.exec(hostLink) || []

    const url = `https://fastpic.${domain}/view/${index}${date}${filename}.html`

    return fastpic.getURL({ ...link, url }, fastpic)
  },
}
