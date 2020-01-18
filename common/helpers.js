/**
 * @param {object} object
 * @param {string} property
 */
export function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property)
}

/**
 * Resolves returned promise after specified timeout
 * @param {number} ms
 * @returns {Promise<void>}
 */
export async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
