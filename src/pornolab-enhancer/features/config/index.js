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
    return $.create('div', {
      className: 'config-form-row',
      contents: {
        tag: 'label',
        className: 'config-label',
        contents: [{
          tag: 'input',
          type: 'checkbox',
          className: 'config-checkbox',
          checked,
          value: storeKey
        }, label]
      }
    })
  }

  function createConfigForm (params) {
    return $.create('div', {
      className: 'config-form',
      contents: [
        getRow('Tags', KEYS.tags, params[KEYS.tags]),
        getRow('Find similar', KEYS.similar, params[KEYS.similar]),
        getRow('Pager', KEYS.pager, params[KEYS.pager]),
        getRow('Download', KEYS.download, params[KEYS.download]),
        getRow('Image view', KEYS.image, params[KEYS.image]),
        {
          tag: 'div',
          className: 'config-form-row',
          contents: {
            tag: 'a',
            className: 'config-apply-button',
            href: '#',
            textContent: 'Apply',
            events: {
              'click': (e) => {
                e.preventDefault()
                document.location.reload()
              }
            }
          }
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
    let configFormCreated = false

    const menuLink = $.create('a', {
      className: 'config-menu-link',
      textContent: 'PLE',
      inside: $('#main-nav td'),
      title: 'Click to open/close config',
      events: {
        'click': (e) => {
          e.preventDefault()

          if (!configFormCreated) {
            configFormCreated = true
            $.inside(createConfigForm(params), menuLink)
          }

          menuLink.classList.toggle('expanded')
        }
      }
    })
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
