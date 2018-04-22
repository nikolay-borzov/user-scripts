import addStyle from 'addStyle'
import config from './features/config'

import tags from './features/tags'
import pagerCSS from './features/pager/styles.css'
import download from './features/download'
import imageView from './features/image-view'
import findSimilar from './features/find-similar'

config.init().then(params => {
  const KEYS = config.KEYS

  if (params[KEYS.tags]) {
    tags()
  }

  if (params[KEYS.pager]) {
    addStyle(pagerCSS)
  }

  if (params[KEYS.download]) {
    download()
  }

  if (params[KEYS.image]) {
    imageView()
  }

  if (params[KEYS.similar]) {
    findSimilar()
  }
})
