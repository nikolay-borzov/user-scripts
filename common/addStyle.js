/**
 * Requires:
 * GM_getResourceText,
 * GM_getResourceURL (GM.getResourceURL),
 * GM_addStyle
 */
var US = (function (US) {
  /* global GM_getResourceText, GM_getResourceURL, GM, GM_addStyle */

  const isChrome = window.chrome

  /* polyfill getResourceUrl */
  const getResourceURL = 'GM' in window && 'getResourceURL' in GM
    ? GM.getResourceURL
    : (resource) => {
      return new Promise((resolve, reject) => {
        try {
          const url = GM_getResourceURL(resource)
          resolve(url)
        } catch (error) {
          reject(error)
        }
      })
    }

  /* polyfill addStyle */
  const addStyle = 'GM_addStyle' in window
    ? GM_addStyle
    : (css) => {
      var head = document.getElementsByTagName('head')[0]
      if (head) {
        var style = document.createElement('style')
        style.type = 'text/css'
        style.appendChild(document.createTextNode(css))
        head.appendChild(style)
      }
    }

  /* polyfill getResourceText */
  const getResourceText = GM_getResourceText

  const addStyleLink = (resource) => {
    getResourceURL(resource)
      .then((url) => {
        let link = document.createElement('link')
        link.setAttribute('href', url)
        link.setAttribute('rel', 'stylesheet')
        document.head.appendChild(link)
      })
  }

  US.addStyle = function (resource) {
    /*
     * Use GM_getResourceText and GM_addStyle for Tampermonkey/Chrome since
     * Tampermonkey's GM_getResourceURL less effective
     */
    if (isChrome) {
      addStyle(getResourceText(resource))
    } else {
      addStyleLink(resource)
    }
  }

  return US
  // eslint-disable-next-line
})(US || {});
