const IDS = {
  ple: 'ple',
  jrdb: 'jrdb',
  pleng: 'pleng'
}

const FOLDER_MAP = {
  [IDS.ple]: 'pornolab-enhancer',
  [IDS.jrdb]: 'joyreactor-download-button',
  [IDS.pleng]: 'pornolab-english'
}

module.exports = {
  getFolderName: (scriptId) => {
    if(!FOLDER_MAP.hasOwnProperty(scriptId)) {
      throw new Error(`No supported script with id=${scriptId}`)
    }

    return FOLDER_MAP[scriptId]
  },

  getIds: () => Object.values(IDS)
}
