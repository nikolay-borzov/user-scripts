import addStyle from 'addStyle'
import { $ } from 'bliss'
import store from 'store'

import configCSS from './styles.css'

export default (function () {
  const KEYS = {
    tags: 'tags',
    similar: 'similar',
    pager: 'pager',
    download: 'download',
    image: 'image'
  }

  function getRow (label, storeKey, checked) {
    return $.create('label', {
      className: 'config-label',
      contents: [{
        tag: 'input',
        type: 'checkbox',
        className: 'config-checkbox',
        checked,
        value: storeKey
      }, label]
    })
  }

  function createConfigForm (params) {
    const button = {
      tag: 'input',
      type: 'button',
      value: 'Apply',
      events: {
        'click': (e) => document.location.reload()
      }
    }

    return $.create('div', {
      id: 'config-form',
      className: 'config-form menu-sub',
      contents: [
        getRow('Tags', KEYS.tags, params[KEYS.tags]),
        getRow('Find similar', KEYS.similar, params[KEYS.similar]),
        getRow('Pager', KEYS.pager, params[KEYS.pager]),
        getRow('Download', KEYS.download, params[KEYS.download]),
        getRow('Image view', KEYS.image, params[KEYS.image]),
        {
          tag: 'div',
          className: 'config-form-footer',
          contents: button
        }
      ],
      delegate: {
        'change': {
          '.config-checkbox': (e) => store.set(e.target.value, e.target.checked)
        }
      }
    })
  }

  function createMenuLink (params) {
    document.body.appendChild(createConfigForm(params))

    const container = $('#main-nav td')

    const menuLink = $.create('a', {
      className: 'config-menu-link menu-root menu-alt1',
      textContent: 'PLE',
      href: '#config-form'
    })

    $.contents(container, ['· ', menuLink])
  }

  function getParams () {
    return Promise.all(Object.values(KEYS)
      .map((key) => store.get(key, true)))
      .then((values) => {
        return Object.keys(KEYS).reduce((result, key, index) => {
          result[key] = values[index]
          return result
        }, {})
      })
  }

  return {
    KEYS,
    async init () {
      const params = await getParams()

      $.ready().then(() => {
        addStyle(configCSS)
        createMenuLink(params)
      })

      return params
    }
  }
})()
