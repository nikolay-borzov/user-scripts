/**
 * Resolves returned promise after specified timeout.
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
export async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
