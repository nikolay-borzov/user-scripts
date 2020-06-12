// @ts-check

import gmPolyfill from './gm-polyfill'

export const addStyle =
  'GM_addStyle' in window
    ? GM_addStyle // eslint-disable-line camelcase
    : (css) => {
        const head = document.getElementsByTagName('head')[0]

        if (head) {
          const style = document.createElement('style')

          style.type = 'text/css'
          style.innerHTML = css
          head.appendChild(style)

          return css
        }
      }

let request

// Avoid import side effect to enable tree-shaking
export const getRequest = () => {
  if (!request) {
    const xmlHttpRequest =
      typeof GM !== 'undefined' && 'xmlHttpRequest' in GM
        ? GM.xmlHttpRequest
        : GM_xmlhttpRequest // eslint-disable-line

    request = function (url, { method = 'GET' } = {}) {
      return new Promise((resolve, reject) => {
        xmlHttpRequest({
          url,
          method,
          onload: resolve,
          onerror: reject,
        })
      })
    }
  }
  return request
}

/**
 * @typedef {object} Store
 * @property {(name: string, defaultValue: *) => *} get
 * @property {(name: string, value: *) => void} set
 */

/** @type {Store} */
let store

/**
 * @returns {Store}
 */
export const getStore = () => {
  if (!store) {
    store = {
      get: gmPolyfill('getValue'),
      set: gmPolyfill('setValue'),
    }
  }

  return store
}
