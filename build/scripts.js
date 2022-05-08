const IDS = {
  ple: 'ple',
  jrdb: 'jrdb',
  pleng: 'pleng',
  iv: 'iv',
}

const NAME_MAP = {
  [IDS.ple]: 'pornolab-enhancer',
  [IDS.jrdb]: 'joyreactor-download-button',
  [IDS.pleng]: 'pornolab-english',
  [IDS.iv]: 'image-viewer',
}

/**
 * @param {string} scriptId
 * @returns {string}
 */
export function getScriptName(scriptId) {
  if (!(scriptId in NAME_MAP)) {
    throw new Error(`No supported script with id=${scriptId}`)
  }

  return NAME_MAP[scriptId]
}

/**
 * @returns {string[]}
 */
export function getScriptIDs() {
  return Object.values(IDS)
}
