import { imgdrive } from './imgdrive.js'

/** @type {import('../url-extractor').Extractor} */
export const imgtaxi = {
  id: 'imgtaxi',
  name: 'ImgTaxi.com',
  linkRegExp: /\/imgtaxi\.com/,
  viewMode: 'origin-download',
  getURL: imgdrive.getURL,
}
