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

module.exports = {
  getName: (scriptId) => {
    if (!(scriptId in NAME_MAP)) {
      throw new Error(`No supported script with id=${scriptId}`)
    }

    return NAME_MAP[scriptId]
  },

  getIds: () => Object.values(IDS),
}
