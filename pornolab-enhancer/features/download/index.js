import { addStyle } from '../../../common/api'
import { $ } from '../../../libs/bliss'

import downloadCSS from './styles.css'

const ENABLE_ON_PATH = '/forum/viewtopic.php'

export async function initDownload() {
  await $.ready()

  if (location.pathname !== ENABLE_ON_PATH) {
    return
  }

  const downloadLink = $('.dl-link')

  if (!downloadLink) {
    return
  }

  addStyle(downloadCSS)

  createDownloadLink(downloadLink)
}

/**
 * @param {HTMLAnchorElement} downloadLink
 */
function createDownloadLink(downloadLink) {
  const link = $.create('a', {
    className: 'quick-download',
    href: '#',

    events: {
      /** @param {MouseEvent} event */
      click: (event) => {
        event.preventDefault()

        triggerEvent(
          downloadLink,
          jQuery.browser.opera ? 'mouseover' : 'mousedown'
        )
        triggerEvent(downloadLink, 'click')
      },
    },

    contents: [
      {
        tag: 'span',
        className: 'quick-download__icon',
      },
      // Size string
      {
        tag: 'span',
        textContent: document
          .querySelector('.attach')
          ?.querySelector('.row1:nth-child(5) td:nth-child(2)')?.textContent,
      },
    ],
  })

  document.body.append(link)
}

/**
 * Triggers built-in event.
 *
 * @param {HTMLElement} element
 * @param {string} eventName
 */
function triggerEvent(element, eventName) {
  const event = new MouseEvent(eventName, {
    bubbles: true,
    cancelable: true,
  })

  element.dispatchEvent(event)
}
