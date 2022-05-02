/**
 * Lightweight wrapper around native DOM methods.
 */
export const dom = {
  /**
   * Event delegation.
   *
   * @param {Element} parent
   * @param {string} eventName
   * @param {string} selector
   * @param {(matchingChild: Element) => void} callback
   */
  on(parent, eventName, selector, callback) {
    parent.addEventListener(eventName, function (event) {
      const matchingChild = event.target.closest(selector)

      if (matchingChild) {
        callback(matchingChild)
      }
    })
  },
}
