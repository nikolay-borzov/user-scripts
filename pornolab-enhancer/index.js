import { addStyle } from '../common/api'

import { initConfig } from './features/config'
import { initDownload } from './features/download'
import { initFindSimilar } from './features/find-similar'
import pagerCSS from './features/pager/styles.css'
import { initTags } from './features/tags'

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
