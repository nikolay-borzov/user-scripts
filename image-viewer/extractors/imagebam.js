// @ts-check
import { getUrlFromPage } from './helpers'

/** @typedef {import('../url-extractor').Extractor} Extractor */

// TODO: Doesn't work anymore because imagebam block image request outside its domain

/** @type {Extractor} */
export const imagebam = {
  name: 'ImageBam',
  linkRegEx: new RegExp('^http://www.imagebam.com/image'),
  imageUrlRegEx: /property="og:image" content="([^"]*)"/,
  getUrl: getUrlFromPage
}
