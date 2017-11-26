import { $ } from '../libs/bliss'
import addStyle from '../common/addStyle'

import downloadCSS from './styles/download.css'

export default (function () {
  const ENABLE_ON_PATH = '/forum/viewtopic.php'

  function createDownloadLink (downloadLink) {
    const link = $.create('a', {
      className: 'quick-download',
      href: '#',
      textContent: '',

      events: {
        'click': (e) => {
          e.preventDefault()

          var event = document.createEvent('MouseEvents')
          event.initEvent('click', true, true)

          downloadLink.dispatchEvent(event)
        }
      },

      contents: [{
        tag: 'span',
        className: 'quick-download-icon'
      }, {
        tag: 'span',
        textContent: document.querySelector('.attach')
          .querySelector('.row1:nth-child(5)')
          .querySelector('td:nth-child(2)')
          .textContent
      }]
    })

    document.body.appendChild(link)
  }

  return function () {
    $.ready()
      .then(() => {
        if (location.pathname !== ENABLE_ON_PATH) { return }

        const downloadLink = $('.dl-link')

        if (!downloadLink) { return }

        addStyle(downloadCSS)

        createDownloadLink(downloadLink)
      })
  }
})()
