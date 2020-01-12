import { $ } from '../libs/bliss'
import config from './config'
import initViewer from './viewer'

$.ready().then(async () => {
  const hostConfig = await config.init()

  initViewer(hostConfig.enabledHosts)
})
