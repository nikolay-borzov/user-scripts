import { getGM4PolyfilledMethod } from './gm-polyfill.js'

/**
 * Adds the given style to the document and returns the injected style element.
 *
 * @type {typeof GM_addStyle}
 */
export let addStyle = (css) => {
  addStyle =
    'GM_addStyle' in window
      ? GM_addStyle // eslint-disable-line camelcase
      : (css) => {
          const head = document.querySelectorAll('head')[0]
          const style = document.createElement('style')

          style.innerHTML = css
          head.append(style)

          return style
        }

  return addStyle(css)
}

/**
 * Makes an xmlHttpRequest.
 *
 * @type {typeof GM.xmlHttpRequest}
 */
export let request = (details) => {
  request = getGM4PolyfilledMethod('GM_xmlhttpRequest')

  return request(details)
}

export const store = {
  /** @type {typeof GM.getValue} */
  getValue: (name, defaultValue) => {
    store.getValue = getGM4PolyfilledMethod('GM_getValue')

    return store.getValue(name, defaultValue)
  },

  /** @type {typeof GM.setValue} */
  setValue: (name, value) => {
    store.setValue = getGM4PolyfilledMethod('GM_setValue')

    return store.setValue(name, value)
  },
  /**
   * Patches store value assuming the value is object.
   *
   * @param {string} name
   * @param {Record<string, unknown>} value
   * @returns {Promise<void>}
   */
  async patch(name, value) {
    const oldValue = await store.getValue(name)

    store.setValue(name, {
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
export let registerMenuCommand = (name, onClick, accessKey) => {
  registerMenuCommand = getGM4PolyfilledMethod('GM_registerMenuCommand')

  return registerMenuCommand(name, onClick, accessKey)
}

/**
 *  @type {typeof GM.openInTab}
 */
export let openInTab = (url, openInBackground) => {
  openInTab = getGM4PolyfilledMethod('GM_openInTab')

  return openInTab(url, openInBackground)
}
