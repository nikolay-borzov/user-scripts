// @ts-check

import gmPolyfill from './gm-polyfill'

export const addStyle =
  'GM_addStyle' in window
    ? GM_addStyle // eslint-disable-line camelcase
    : css => {
        const head = document.getElementsByTagName('head')[0]

        if (head) {
          const style = document.createElement('style')

          style.type = 'text/css'
          style.innerHTML = css
          head.appendChild(style)

          return css
        }
      }

export const request = (function() {
  const xmlHttpRequest =
    typeof GM !== 'undefined' && 'xmlHttpRequest' in GM
      ? GM.xmlHttpRequest
      : GM_xmlhttpRequest // eslint-disable-line

  return function(url, { method = 'GET' } = {}) {
    return new Promise((resolve, reject) => {
      xmlHttpRequest({
        url,
        method,
        onload: resolve,
        onerror: reject
      })
    })
  }
})()

export const store = {
  /**
   * @param {string} name
   * @param {any} defaultValue
   */
  get: gmPolyfill('getValue'),
  /**
   * @param {string} name
   * @param {any} value
   */
  set: gmPolyfill('setValue')
}

/**
 * @param {string} url
 * @param {Tampermonkey.OpenTabOptions | boolean} [options]
 * @returns {Tampermonkey.OpenTabObject}
 */
export const openInTab = gmPolyfill('openInTab')
