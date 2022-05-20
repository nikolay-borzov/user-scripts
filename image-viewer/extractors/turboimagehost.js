import { getURLFromPage } from './helpers.js'

/** @type {import('../url-extractor').Extractor} */
export const turboimagehost = {
  id: 'turboimagehost',
  name: 'TurboImageHost.com',
  linkRegExp: /turboimagehost\.com\/p/,
  imageURLRegExp: /rel="image_src" href="(?<url>http[^"]+)"/,
  viewMode: 'new-tab',
  getURL: getURLFromPage,
}
