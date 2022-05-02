/* global Menu */
import { addStyle, getStore } from '../../../common/api'
import { $ } from '../../../libs/bliss'

import configCSS from './styles.css'

/**
 * @typedef {object} ConfigFeatures
 * @property {boolean} tags
 * @property {boolean} similar
 * @property {boolean} pager
 * @property {boolean} download
 */

/**
 * @typedef {object} Config
 * @property {ConfigFeatures} features
 */

const store = getStore()

/** @typedef {ConfigFeatures} */
const FEATURES_DEFAULT = {
  tags: true,
  similar: true,
  pager: true,
  download: true,
}

/**
 * @returns {Promise<ConfigFeatures>}
 */
export async function initConfig() {
  const features = {
    ...FEATURES_DEFAULT,
    ...(await store.get('features')),
  }

  await $.ready()

  addStyle(configCSS)
  createMenuLink(features)

  return features
}

/**
 * @param {ConfigFeatures} features
 */
function createMenuLink(features) {
  document.body.append(createConfigForm(features))

  const container = $('#main-nav td')

  const menuLink = $.create('a', {
    className: 'config-menu-link',
    textContent: 'PLE',
    href: '#config-form',
  })

  $.contents(container, ['· ', menuLink])

  // Show menu on click
  const $menuLink = jQuery(menuLink)

  $menuLink
    .click(
      /** @param {MouseEvent} event  */ (event) => {
        event.preventDefault()
        Menu.clicked(jQuery(menuLink))
      }
    )
    .hover(
      () => Menu.hovered($menuLink),
      () => Menu.unhovered($menuLink)
    )
}

/**
 * @param {ConfigFeatures} features
 * @returns {HTMLDivElement}
 */
function createConfigForm(features) {
  const button = {
    tag: 'input',
    type: 'button',
    value: 'Apply',
    events: {
      click: /** @param {MouseEvent} event */ (event) => {
        document.location.reload()
        Menu.hide(event)
      },
    },
  }

  return $.create('div', {
    id: 'config-form',
    className: 'config-form',
    contents: [
      getRow('Tags', 'tags', features.tags),
      getRow('Find similar', 'similar', features.similar),
      getRow('Pager', 'pager', features.pager),
      getRow('Download', 'download', features.download),
      {
        tag: 'div',
        className: 'config-form__label',
        contents: {
          tag: 'a',
          target: '_blank',
          href: 'https://github.com/nikolay-borzov/user-scripts#image-viewer',
          contents: 'Try Image Viewer',
        },
      },
      {
        tag: 'div',
        className: 'config-form__footer',
        contents: button,
      },
    ],
    delegate: {
      change: {
        /** @param {Event & { target: HTMLInputElement }} event */
        '.js-config-checkbox': ({ target: { value, checked } }) =>
          store.set(value, checked),
      },
    },
    events: {
      /** @param {MouseEvent} event */
      mousedown: (event) => event.stopPropagation(),
    },
  })
}

/**
 * @param {string} label
 * @param {'tags' | 'similar' | 'pager' | 'download'} storeKey
 * @param {boolean} checked
 * @returns {HTMLLabelElement}
 */
function getRow(label, storeKey, checked) {
  return $.create('label', {
    className: 'config-form__label',
    contents: [
      {
        tag: 'input',
        type: 'checkbox',
        className: 'config-form__checkbox js-config-checkbox',
        checked,
        value: storeKey,
      },
      label,
    ],
  })
}
