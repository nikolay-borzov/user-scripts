import { addStyle } from '../common/api.js'

import { initConfig } from './features/config/index.js'
import { initDownload } from './features/download/index.js'
import { initFindSimilar } from './features/find-similar/index.js'
import pagerCSS from './features/pager/styles.css'
import { initTags } from './features/tags/index.js'

initConfig().then(async (config) => {
  if (config.tags) {
    await initTags()
  }

  if (config.pager) {
    addStyle(pagerCSS)
  }

  if (config.download) {
    await initDownload()
  }

  if (config.similar) {
    await initFindSimilar()
  }
})
