import gmPolyfill from './gm-polyfill'

export default (function () {
  const xmlHttpRequest = gmPolyfill('xmlHttpRequest')

  return function (url, { method = 'GET' } = {}) {
    return xmlHttpRequest({
      url,
      method
    }).catch((e) => {
      console.error(e)
    })
  }
})()
