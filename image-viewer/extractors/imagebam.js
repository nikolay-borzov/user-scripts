import { getURLFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

// TODO: Doesn't work anymore because imagebam block image requests outside its domain

/** @type {Extractor} */
export const imagebam = {
  name: 'ImageBam',
  linkRegExp: /^http:\/\/www\.imagebam\.com\/image/,
  imageURLRegExp: /property="og:image" content="([^"]*)"/,
  getURL: getURLFromPage,
}
