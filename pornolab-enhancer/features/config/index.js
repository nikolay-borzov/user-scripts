/* global Menu jQuery */
import { addStyle, store } from '../../../common/api'
import { $ } from '../../../libs/bliss'

import configCSS from './styles.css'

export default (function() {
  const KEYS = {
    tags: 'tags',
    similar: 'similar',
    pager: 'pager',
    download: 'download'
  }

  function getRow(label, storeKey, checked) {
    return $.create('label', {
      className: 'config-form__label',
      contents: [
        {
          tag: 'input',
          type: 'checkbox',
          className: 'config-form__checkbox js-config-checkbox',
          checked,
          value: storeKey
        },
        label
      ]
    })
  }

  function createConfigForm(params) {
    const button = {
      tag: 'input',
      type: 'button',
      value: 'Apply',
      events: {
        click: e => {
          document.location.reload()
          Menu.hide(e)
        }
      }
    }

    return $.create('div', {
      id: 'config-form',
      className: 'config-form',
      contents: [
        getRow('Tags', KEYS.tags, params[KEYS.tags]),
        getRow('Find similar', KEYS.similar, params[KEYS.similar]),
        getRow('Pager', KEYS.pager, params[KEYS.pager]),
        getRow('Download', KEYS.download, params[KEYS.download]),
        {
          tag: 'div',
          className: 'config-form__label',
          contents: {
            tag: 'a',
            target: '_blank',
            href: 'https://github.com/shikiyoku/user-scripts#image-viewer',
            contents: 'Try Image Viewer'
          }
        },
        {
          tag: 'div',
          className: 'config-form__footer',
          contents: button
        }
      ],
      delegate: {
        change: {
          '.js-config-checkbox': e =>
            store.set(e.target.value, e.target.checked)
        }
      },
      events: {
        mousedown: e => e.stopPropagation()
      }
    })
  }

  function createMenuLink(params) {
    document.body.appendChild(createConfigForm(params))

    const container = $('#main-nav td')

    const menuLink = $.create('a', {
      className: 'config-menu-link',
      textContent: 'PLE',
      href: '#config-form'
    })

    $.contents(container, ['· ', menuLink])

    // Show menu on click
    const $menuLink = jQuery(menuLink)
    $menuLink
      .click(e => {
        e.preventDefault()
        Menu.clicked(jQuery(menuLink))
      })
      .hover(
        () => Menu.hovered($menuLink),
        () => Menu.unhovered($menuLink)
      )
  }

  function getParams() {
    return Promise.all(
      Object.values(KEYS).map(key => store.get(key, true))
    ).then(values => {
      return Object.keys(KEYS).reduce((result, key, index) => {
        result[key] = values[index]
        return result
      }, {})
    })
  }

  return {
    KEYS,
    async init() {
      const params = await getParams()

      $.ready().then(() => {
        addStyle(configCSS)
        createMenuLink(params)
      })

      return params
    }
  }
})()
