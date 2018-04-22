import { $ } from 'bliss'
import config from './config'
import initViewer from './viewer'

$.ready().then(async () => {
  const hostConfig = await config.getHostConfig()

  initViewer(hostConfig.hosts)

  config.init(hostConfig)
})
