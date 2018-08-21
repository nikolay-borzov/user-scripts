export default (function() {
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
