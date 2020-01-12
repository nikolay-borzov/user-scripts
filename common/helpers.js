/**
 * @param {object} object
 * @param {string} property
 */
export function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property)
}
