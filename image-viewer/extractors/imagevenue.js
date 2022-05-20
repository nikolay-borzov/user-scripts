import { getURLFromPage } from './helpers.js'

/** @type {import('../url-extractor').Extractor}} */
export const imagevenue = {
  id: 'imagevenue,',
  name: 'ImageVenue.com',
  linkRegExp: /imagevenue\.com\//,
  imageURLRegExp: /data-toggle="full">\W*<img src="(?<url>[^"]*)/im,
  getURL: getURLFromPage,
}
