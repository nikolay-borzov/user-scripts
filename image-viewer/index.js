import { $ } from '../libs/bliss.js'

import { initHostConfig } from './config.js'
import { initViewer } from './viewer.js'

$.ready().then(async () => {
  const hostConfig = await initHostConfig()

  initViewer(hostConfig.enabledHosts)
})
