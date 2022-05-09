import { getGM4PolyfilledMethod } from './gm-polyfill'

/**
 * Adds the given style to the document and returns the injected style element.
 *
 * @type {typeof GM_addStyle}
 */
export const addStyle =
  'GM_addStyle' in window
    ? GM_addStyle // eslint-disable-line camelcase
    : (css) => {
        const head = document.querySelectorAll('head')[0]
        const style = document.createElement('style')

        style.innerHTML = css
        head.append(style)

        return style
      }

/**
 * Makes an xmlHttpRequest.
 *
 * @type {typeof GM.xmlHttpRequest}
 */
export const request = getGM4PolyfilledMethod('GM_xmlhttpRequest')

export const store = {
  /** @type {typeof GM.getValue} */
  get: getGM4PolyfilledMethod('GM_getValue'),
  /** @type {typeof GM.setValue} */
  set: getGM4PolyfilledMethod('GM_setValue'),
  /**
   * Patches store value assuming the value is object.
   *
   * @param {string} name
   * @param {Record<string, unknown>} value
   * @returns {Promise<void>}
   */
  async patch(name, value) {
    const oldValue = await store.get(name)

    store.set(name, {
      ...oldValue,
      ...value,
    })
  },
}

/**
 * Registers a command in script manager menu.
 *
 * @type {typeof GM.registerMenuCommand}
 */
export const registerMenuCommand = getGM4PolyfilledMethod(
  'GM_registerMenuCommand'
)
