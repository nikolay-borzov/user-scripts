import { imgbum } from './imgbum.js'

/**
 * Former money-pic.ru.
 *
 * @type {import('../url-extractor').Extractor}
 */
export const adultImages = {
  id: 'adult-images',
  name: 'Adult-Images.ru',
  linkRegExp: /\/(adult-images|money-pic)\.ru/,

  getURL: imgbum.getURL,
}
