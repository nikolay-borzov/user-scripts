import gmPolyfill from './gm-polyfill'

export default (function () {
  return {
    /**
     * @param {string} name
     * @param {any} defaultValue
     */
    get: gmPolyfill('getValue'),
    /**
     * @param {string} name
     * @param {any} value
     */
    set: gmPolyfill('setValue')
  }
})()
