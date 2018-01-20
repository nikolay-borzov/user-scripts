/**
 * Lightweight wrapper around native DOM methods
 */
export default {
  /**
   * Event delegation
   * @param {Element} parent
   * @param {string} eventName
   * @param {string} selector
   * @param {function} callback
   */
  on (parent, eventName, selector, callback) {
    parent.addEventListener(eventName, function (event) {
      const matchingChild = event.target.closest(selector)

      if (matchingChild) {
        callback(matchingChild)
      }
    })
  }
}
