/**
 * Requires:
 * GM_xmlhttpRequest (GM.xmlHttpRequest)
 */
var US = (function (US) {
  /* global GM_xmlhttpRequest GM */

  // polyfill xmlhttpRequest
  const xmlHttpRequest = 'GM' in window && 'xmlHttpRequest' in GM
    ? GM.xmlHttpRequest
    : GM_xmlhttpRequest

  /**
   * @param {string} url
   * @param {Object} settings
   * @param {Object} [settings.method='GET']
   */
  US.request = function (url, { method = 'GET' } = {}) {
    return new Promise((resolve, reject) => {
      xmlHttpRequest({
        url,
        method,
        onerror (response) {
          console.error(response.responseText)
          reject(response.responseText)
        },
        onload: resolve
      })
    })
  }

  return US
  // eslint-disable-next-line
})(US || {});