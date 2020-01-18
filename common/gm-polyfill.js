import { hasOwnProperty } from './helpers'

export default (function() {
  // based on https://github.com/greasemonkey/gm4-polyfill
  const gmMethodMap = {
    getValue: 'GM_getValue',
    setValue: 'GM_setValue',
    openInTab: 'GM_openInTab'
  }

  return function polyfill(methodName) {
    if (hasOwnProperty(gmMethodMap, methodName)) {
      return typeof GM !== 'undefined' && methodName in GM
        ? GM[methodName]
        : function(...args) {
            return new Promise((resolve, reject) => {
              try {
                resolve(window[gmMethodMap[methodName]](...args))
              } catch (e) {
                reject(e)
              }
            })
          }
    }

    return null
  }
})()
