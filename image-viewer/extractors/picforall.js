import { imgbum } from './imgbum.js'

/** @type {import('../url-extractor').Extractor} */
export const picforall = {
  id: 'picforall',
  name: 'PicForAll',
  hosts: [
    'freescreens.ru',
    'imgclick.ru',
    'picclick.ru',
    'payforpic.ru',
    'picforall.ru',
    'imgbase.ru',
  ],
  linkRegExp:
    /\/(freescreens|imgclick|picclick|payforpic|picforall|imgbase)\.ru/,
  getURL: imgbum.getURL,
}
