import store from 'store'
import { $ } from 'bliss'
import urlExtractor from './url-extractor'

export default (function() {
  const CLASSES = {
    open: 'iv-config-form--open'
  }

  let configMenu = null
  const currentHost = unsafeWindow.location.host

  function showMenu(config) {
    createMenuElement(config).classList.add(CLASSES.open)
  }

  function createMenuElement(config) {
    if (!configMenu) {
      const rows = config.hosts.map(createConfigMenuRow)

      configMenu = $.create('div', {
        id: 'iv-config-form',
        className: 'iv-config-form',
        contents: [
          createMenuHeader(),
          {
            tag: 'div',
            className: 'iv-config-form__options',
            contents: rows
          }
        ],
        delegate: {
          change: {
            '.js-iv-config-checkbox': e =>
              updateHostConfig(
                config.storedConfig,
                e.target.value,
                e.target.checked
              )
          }
        }
      })

      document.body.appendChild(configMenu)
    }

    return configMenu
  }

  function createMenuHeader() {
    const closeButton = $.create('a', {
      href: '#',
      title: 'Close',
      className: `iv-icon-button iv-icon-button--small iv-icon iv-icon--type-close`,
      events: {
        click: e => {
          e.preventDefault()
          configMenu.classList.remove(CLASSES.open)
        }
      }
    })

    return {
      tag: 'div',
      className: 'iv-config-form__header',
      contents: [
        {
          tag: 'span',
          className: 'iv-config-form__header-title',
          contents: `Settings for ${currentHost}`
        },
        closeButton
      ]
    }
  }

  function createConfigMenuRow(host) {
    return $.create('label', {
      className: 'iv-config-form__label',
      title: host.description,
      contents: [
        {
          tag: 'input',
          type: 'checkbox',
          className: 'iv-config-form__checkbox js-iv-config-checkbox',
          checked: host.enabled,
          value: host.name
        },
        host.name
      ]
    })
  }

  function updateHostConfig(config, hostName, isEnabled) {
    config.hosts[hostName] = isEnabled
    store.set(currentHost, config)
  }

  /**
   * Receives per domain settings
   */
  async function getHostConfig() {
    const hosts = urlExtractor.getImageHostsInfo()
    const storedConfig = await store.get(currentHost, { hosts: {} })
    const enabledHosts = []

    hosts.forEach(host => {
      const id = host.name
      const isEnabled = id in storedConfig.hosts ? storedConfig.hosts[id] : true

      host.enabled = isEnabled
      storedConfig.hosts[id] = isEnabled

      if (isEnabled) {
        enabledHosts.push(id)
      }
    })

    storedConfig.hosts = hosts.reduce((result, host) => {
      result[host.name] = host.enabled
      return result
    }, {})

    return {
      hosts,
      storedConfig,
      enabledHosts
    }
  }

  return {
    /**
     * Adds menu command or global function to open settings menu
     * @param {object} config
     */
    async init() {
      const config = await getHostConfig()

      const handler = () => showMenu(config)

      // eslint-disable-next-line
      if (typeof GM_registerMenuCommand !== 'undefined') {
        GM_registerMenuCommand('Image Viewer Settings', handler)
      } else {
        unsafeWindow.imageViewer = {
          settings: handler
        }
      }

      return config
    }
  }
})()
