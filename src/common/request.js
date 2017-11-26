/* global GM_xmlhttpRequest GM */

export default (function () {
  // polyfill xmlhttpRequest
  const xmlHttpRequest = 'GM' in window && 'xmlHttpRequest' in GM
    ? GM.xmlHttpRequest
    : GM_xmlhttpRequest //  eslint-disable-line camelcase

  return function (url, { method = 'GET' } = {}) {
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
})()
