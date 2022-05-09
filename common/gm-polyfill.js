const GM_METHOD_MAP = {
  GM_addStyle: 'addStyle',
  GM_deleteValue: 'deleteValue',
  GM_getResourceURL: 'getResourceUrl',
  GM_getValue: 'getValue',
  GM_listValues: 'listValues',
  GM_notification: 'notification',
  GM_openInTab: 'openInTab',
  GM_registerMenuCommand: 'registerMenuCommand',
  GM_setClipboard: 'setClipboard',
  GM_setValue: 'setValue',
  GM_xmlhttpRequest: 'xmlHttpRequest',
  GM_getResourceText: 'getResourceText',
}

/**
 * Based on https://github.com/greasemonkey/gm4-polyfill.
 *
 * @param {keyof GM_METHOD_MAP} methodName
 * @returns {(args: unknown) => Promise<any>}
 */
export function getGM4PolyfilledMethod(methodName) {
  const gm4MethodName = GM_METHOD_MAP[methodName]

  if (GM !== undefined && gm4MethodName in GM) {
    // @ts-ignore
    return GM[gm4MethodName]
  } else if (methodName in window) {
    return function (...arguments_) {
      return new Promise((resolve, reject) => {
        try {
          // @ts-ignore
          // eslint-disable-next-line unicorn/no-null
          resolve(window[methodName].apply(null, arguments_))
        } catch (error) {
          reject(error)
        }
      })
    }
  }

  // Neither GM.[methodName] nor GM_[methodName] is avaible if @grant isn't set
  return async function () {
    throw new Error(`Method ${methodName} is not available. Missing @grant?`)
  }
}
