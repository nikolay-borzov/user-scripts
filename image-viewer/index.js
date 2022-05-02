import { $ } from '../libs/bliss'

import { initHostConfig } from './config'
import { initViewer } from './viewer'

$.ready().then(async () => {
  const hostConfig = await initHostConfig()

  initViewer(hostConfig.enabledHosts)
})
