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
      const rows = Object.keys(config.hosts).map(hostName =>
        createConfigMenuRow(hostName, config.hosts[hostName])
      )

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
              updateHostConfig(config, e.target.value, e.target.checked)
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

  function createConfigMenuRow(hostName, isEnabled) {
    return $.create('label', {
      className: 'iv-config-form__label',
      contents: [
        {
          tag: 'input',
          type: 'checkbox',
          className: 'iv-config-form__checkbox js-iv-config-checkbox',
          checked: isEnabled,
          value: hostName
        },
        hostName
      ]
    })
  }

  function updateHostConfig(config, hostName, isEnabled) {
    config.hosts[hostName] = isEnabled
    store.set(currentHost, config)
  }

  return {
    /**
     * Receives per domain settings
     */
    async getHostConfig() {
      const hostNames = urlExtractor.getImageHostNames()
      const config = await store.get(currentHost, { hosts: {} })

      // Merge with supported hosts
      const hosts = hostNames.reduce((result, host) => {
        result[host] = host in config.hosts ? config.hosts[host] : true
        return result
      }, {})

      return {
        hosts
      }
    },

    /**
     * Adds menu command or global function to open settings menu
     * @param {object} config
     */
    init(config) {
      const handler = () => {
        showMenu(config)
      }

      // eslint-disable-next-line
      if (GM_registerMenuCommand) {
        GM_registerMenuCommand('Image Viewer Settings', handler)
      } else {
        unsafeWindow.imageViewer = {
          settings: handler
        }
      }
    }
  }
})()
