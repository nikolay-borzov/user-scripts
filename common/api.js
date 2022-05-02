import { getGMPolyfillMethod } from './gm-polyfill'

export const addStyle =
  'GM_addStyle' in window
    ? GM_addStyle // eslint-disable-line camelcase
    : (css) => {
        const head = document.querySelectorAll('head')[0]

        if (head) {
          const style = document.createElement('style')

          style.innerHTML = css
          head.append(style)

          return css
        }
      }

let request

// Avoid import side effect to enable tree-shaking
export function getRequest() {
  if (!request) {
    const xmlHttpRequest =
      GM !== undefined && 'xmlHttpRequest' in GM
        ? GM.xmlHttpRequest
        : GM_xmlhttpRequest // eslint-disable-line camelcase

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
 * @property {(name: string, defaultValue?: unknown) => *} get
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
      get: getGMPolyfillMethod('getValue'),
      set: getGMPolyfillMethod('setValue'),
    }
  }

  return store
}
