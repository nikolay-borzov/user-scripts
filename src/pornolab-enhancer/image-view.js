import { $, $$ } from '../libs/bliss'
import addStyle from '../common/addStyle'

import imageViewCSS from './styles/image-view.css'

import urlExtractor from './image-url-extractor'

export default (function () {
  const ENABLE_ON_PATH = '/forum/viewtopic.php'

  const CLASSES = {
    imageLink: 'image-link',
    error: 'error-icon',
    forbiddenHost: 'forbidden-host',
    loading: 'loading-icon',
    open: 'image-view-open'
  }

  const SELECTORS = {
    imageLink: `.${CLASSES.imageLink}`
  }

  const elements = {
    container: null,
    image: null
  }

  const state = {
    open: false,
    currentLink: null,
    linksSet: [],
    getCurrentLinkIndex () {
      return state.linksSet.indexOf(state.currentLink)
    },
    getLastLinkIndex () {
      return state.linksSet.length - 1
    }
  }

  function showImage (imageUrl) {
    return new Promise((resolve, reject) => {
      elements.container.classList.add(CLASSES.loading)
      elements.container.classList.remove(CLASSES.error)

      // clear previous
      elements.image.src = ''

      let imageObj = new Image()
      imageObj.onload = function () {
        elements.image.src = this.src
        elements.container.classList.remove(CLASSES.loading)
        resolve()
      }
      imageObj.onerror = function (e) {
        elements.container.classList.remove(CLASSES.loading)
        elements.container.classList.add(CLASSES.error)
        reject(e)
      }
      // load image
      imageObj.src = imageUrl

      document.body.classList.add(CLASSES.open)
      state.open = true
    })
  }

  function hideImage () {
    document.body.classList.remove(CLASSES.open)
    state.open = false
    state.currentLink = null
    elements.image.src = ''
  }

  async function setImage (link) {
    state.currentLink = link

    let imageUrl = link.dataset['imgUrl']
    if (imageUrl) {
      showImage(imageUrl)
      return
    }

    link.classList.add(CLASSES.loading)

    imageUrl = await urlExtractor.getImageUrl(link)

    link.dataset['imgUrl'] = imageUrl
    link.classList.remove(CLASSES.loading)

    showImage(imageUrl)
      .catch(() => {
        // hideImage()
        link.classList.add(CLASSES.error)
      })
  }

  function nextImage () {
    if (!state.currentLink) { return }

    const currentIndex = state.getCurrentLinkIndex()
    const newIndex = currentIndex < state.getLastLinkIndex()
      ? currentIndex + 1
      : 0

    setImage(state.linksSet[newIndex])
  }

  function previousImage () {
    if (!state.currentLink) { return }

    const currentIndex = state.getCurrentLinkIndex()
    const newIndex = currentIndex === 0
      ? state.getLastLinkIndex()
      : currentIndex - 1

    setImage(state.linksSet[newIndex])
  }

  function handleLinkClick (event) {
    event.preventDefault()

    let link = event.target
    state.linksSet = $$(SELECTORS.imageLink, link.parentNode)

    setImage(link)
  }

  return function () {
    if (location.pathname !== ENABLE_ON_PATH) {
      return
    }

    addStyle(imageViewCSS)

    $.ready()
      .then(() => {
        elements.image = $.create('img', {
          className: 'image-view'
        })

        elements.container = $.create('div', {
          className: 'image-view-container',
          contents: elements.image,
          events: {
            'click': hideImage
          }
        })

        document.body.appendChild(elements.container)

        const topic = $('table.topic')

        // Assign class to image links
        $.set($$(urlExtractor.getLinksSelector(), topic), {
          className: CLASSES.imageLink
        })
        // Mark forbidden hosts
        $.set($$(urlExtractor.getForbiddenHostLinksSelector(), topic), {
          className: `${CLASSES.forbiddenHost} ${CLASSES.imageLink}`
        })

        // Event handlers

        document.addEventListener('keydown', (event) => {
          if (!state.open) {
            return
          }

          if (event.key === 'ArrowRight') {
            nextImage()
          } else if (event.key === 'ArrowLeft') {
            previousImage()
          }
        }, false)

        $.delegate(topic, 'click', SELECTORS.imageLink, handleLinkClick)
      })
  }
})()
