import { store, registerMenuCommand } from '../common/api'
import { $ } from '../libs/bliss'

import { urlExtractor } from './url-extractor'

/**
 * @typedef {import('./url-extractor').ImageHostMetadata} ImageHostMetadata
 */

/**
 * @typedef {object} StoredHostConfig
 * @property {Record<string, boolean>} hosts Host ID to isEnabled map.
 */

/**
 * @typedef {object} HostConfig
 * @property {ImageHostMetadata[]} hosts Hosts metadata.
 * @property {StoredHostConfig} storedConfig
 * @property {string[]} enabledHosts List of enabled Hosts IDs.
 */

const CLASSES = {
  open: 'iv-config-form--open',
}

/** @type {HTMLDivElement} */
let configMenu
const currentHost = unsafeWindow.location.host

/**
 * Initializes host specific config.
 * Adds menu command or global function to open settings menu.
 *
 * @returns {Promise<HostConfig>} Host specific config.
 */
export async function initHostConfig() {
  const config = await getHostConfig()

  await registerMenuCommand('Settings', () => showMenu(config))

  return config
}

/**
 * @returns {Promise<HostConfig>} Per-host settings object.
 */
async function getHostConfig() {
  const hosts = urlExtractor.getImageHostsMetadata()
  /** @type {StoredHostConfig} */
  const storedConfig = await store.get(currentHost, { hosts: {} })
  const enabledHosts = []

  for (const host of hosts) {
    const id = host.name
    const isEnabled = id in storedConfig.hosts ? storedConfig.hosts[id] : true

    host.isEnabled = isEnabled
    storedConfig.hosts[id] = isEnabled

    if (isEnabled) {
      enabledHosts.push(id)
    }
  }

  storedConfig.hosts = hosts.reduce(
    (/** @type {Record<string, boolean>} */ result, host) => {
      result[host.name] = host.isEnabled

      return result
    },
    {}
  )

  return {
    hosts,
    storedConfig,
    enabledHosts,
  }
}

/**
 * Displays per-host config menu.
 *
 * @param {HostConfig} config
 */
function showMenu(config) {
  createMenuElement(config).classList.add(CLASSES.open)
}

/**
 * @param {HostConfig} config
 * @returns {HTMLDivElement}
 */
function createMenuElement(config) {
  if (configMenu) {
    return configMenu
  }

  const rows = config.hosts.map((host) => createConfigMenuRow(host))

  configMenu = $.create('div', {
    id: 'iv-config-form',
    className: 'iv-config-form',
    contents: [
      createMenuHeader(),
      {
        tag: 'div',
        className: 'iv-config-form__options',
        contents: rows,
      },
    ],
    delegate: {
      change: {
        /** @type {(event: Event & { target: HTMLInputElement }) => void} */
        '.js-iv-config-checkbox': ({ target: { value, checked } }) =>
          updateHostConfig(config.storedConfig, value, checked),
      },
    },
  })

  document.body.append(configMenu)

  return configMenu
}

/**
 * @param {ImageHostMetadata} host
 * @returns {HTMLLabelElement}
 */
function createConfigMenuRow(host) {
  return $.create('label', {
    className: 'iv-config-form__label',
    title: host.description,
    contents: [
      {
        tag: 'input',
        type: 'checkbox',
        className: 'iv-config-form__checkbox js-iv-config-checkbox',
        checked: host.isEnabled,
        value: host.name,
      },
      host.name,
    ],
  })
}

/**
 * @returns {Record<string, unknown>}
 */
function createMenuHeader() {
  /** @type {HTMLAnchorElement} */
  const closeButton = $.create('a', {
    href: '#',
    title: 'Close',
    className: `iv-icon-button iv-icon-button--small iv-icon iv-icon--type-close`,
    events: {
      /** @param {MouseEvent} event */
      click: (event) => {
        event.preventDefault()
        configMenu.classList.remove(CLASSES.open)
      },
    },
  })

  return {
    tag: 'div',
    className: 'iv-config-form__header',
    contents: [
      {
        tag: 'span',
        className: 'iv-config-form__header-title',
        contents: `Settings for ${currentHost}`,
      },
      closeButton,
    ],
  }
}

/**
 * Updates and saves config to the Store.
 *
 * @param {StoredHostConfig} config
 * @param {string} hostName
 * @param {boolean} isEnabled
 */
function updateHostConfig(config, hostName, isEnabled) {
  config.hosts[hostName] = isEnabled
  store.set(currentHost, config)
}
