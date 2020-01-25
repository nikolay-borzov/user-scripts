// @ts-check
import { request, openInTab } from '../../common/api'
import { wait } from '../../common/helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

/*
  link:       http://fastpic.ru/view/104/2018/0429/f1a539f2e9edd3e0d70cac3dcf316466.jpg.html
  thumbnail:  http://i104.fastpic.ru/thumb/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpeg
  image:      https://i104.fastpic.ru/big/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpg
*/

/** @param {Tampermonkey.Response} response */
function isFullSizeImageResponse(response) {
  return response.responseHeaders.toLowerCase().includes('content-length')
}

/** @param {string} url */
async function poolFullSizeImage(url) {
  let response = await request(url)

  if (isFullSizeImageResponse(response)) {
    return url
  }

  // If FastPic returned "For view image..." placeholder

  // Open FastPic page to trigger full-size image load
  const tab = await openInTab(url, true)

  // Pool until full size image is available
  do {
    await wait(300)
    response = await request(url)
  } while (!isFullSizeImageResponse(response))

  tab.close()

  return url
}

/** @type {Extractor} */
export const fastpic = {
  name: 'FastPic',
  linkRegEx: new RegExp('^http.?://fastpic.ru/view'),

  async getUrl(link) {
    const extension = link.url.split('.').slice(-2)[0]

    const url = `${link.thumbnailUrl
      .replace('thumb', 'big')
      .replace('jpeg', extension)}?nh7=1`

    return poolFullSizeImage(url)
  }
}

/** @type {Extractor} */
export const fastpicDirect = {
  name: 'FastPic (direct link)',
  linkRegEx: new RegExp('fastpic.ru/big'),

  async getUrl(link) {
    const url = `${link.url}?nh7=1`

    return poolFullSizeImage(url)
  }
}
