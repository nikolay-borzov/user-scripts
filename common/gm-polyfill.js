import { hasOwnProperty } from './helpers'

/**
 * @param {'GM_getValue' | 'GM_setValue' | 'GM_openInTab'} methodName
 * @returns {undefined | ((args: unknown) => Promise<unknown>)}
 */
export function getGMPolyfillMethod(methodName) {
  // Based on https://github.com/greasemonkey/gm4-polyfill
  const GM_METHOD_MAP = {
    getValue: 'GM_getValue',
    setValue: 'GM_setValue',
    openInTab: 'GM_openInTab',
  }

  if (hasOwnProperty(GM_METHOD_MAP, methodName)) {
    return GM !== undefined && methodName in GM
      ? GM[methodName]
      : function (...arguments_) {
          return new Promise((resolve, reject) => {
            try {
              resolve(window[GM_METHOD_MAP[methodName]](...arguments_))
            } catch (error) {
              reject(error)
            }
          })
        }
  }
}
