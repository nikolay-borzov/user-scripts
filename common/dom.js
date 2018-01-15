/**
 * Lightweight wrapper around native DOM methods
 */
export default {
  /**
   * Event delegation
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
