import { $, $$ } from 'bliss'
import addStyle from 'addStyle'

import imageViewCSS from './styles.css'

import urlExtractor from './image-url-extractor'

export default (function () {
  const ENABLE_ON_PATH = '/forum/viewtopic.php'

  const CLASSES = {
    imageLink: 'image-link',
    error: 'error-icon',
    loading: 'loading-icon',
    open: 'image-view-open',
    fullHeight: 'full-height',
    grabbing: 'grabbing'
  }

  const SELECTORS = {
    imageLink: `.${CLASSES.imageLink}`
  }

  const elements = {
    container: null,
    image: null,
    imageContainer: null,
    imageNumber: null,
    imageTotal: null
  }

  const state = {
    firstClick: true,
    open: false,
    currentLink: null,
    linksSet: [],
    getCurrentLinkIndex () {
      return state.linksSet.indexOf(state.currentLink)
    },
    getLastLinkIndex () {
      return state.linksSet.length - 1
    },
    dragPosition: null,
    dragging: false
  }

  function showImage (imageUrl) {
    return new Promise((resolve, reject) => {
      const container = elements.container
      const image = elements.image

      container.classList.add(CLASSES.loading)
      container.classList.remove(CLASSES.error)

      // clear previous
      image.src = ''

      let imageObj = new Image()
      imageObj.onload = function () {
        image.src = this.src
        container.classList.remove(CLASSES.loading)
        resolve()
      }
      imageObj.onerror = function (e) {
        container.classList.remove(CLASSES.loading)
        container.classList.add(CLASSES.error)
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
    events.keyboard.unbind()
  }

  async function setImage (link) {
    state.currentLink = link
    elements.imageNumber.textContent = state.getCurrentLinkIndex() + 1

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
        link.classList.remove(CLASSES.imageLink)
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

  function toggleFullHeight () {
    elements.container.classList.toggle(CLASSES.fullHeight)
  }

  const events = {
    linkClick (e) {
      e.preventDefault()

      if (state.firstClick) {
        create.viewContainer()
        state.firstClick = false
      }

      let link = e.target
      // Collect neighbour links
      state.linksSet = $$(SELECTORS.imageLink, link.parentNode)
      // Set total images count
      elements.imageTotal.textContent = state.linksSet.length

      events.keyboard.bind()

      setImage(link)
    },

    keyboard: {
      bind () {
        document.addEventListener('keydown', events.keyboard.handler, true)
      },
      unbind () {
        document.removeEventListener('keydown', events.keyboard.handler, true)
      },
      handler (e) {
        if (e.defaultPrevented) {
          return
        }

        switch (e.key) {
          case 'ArrowRight':
            nextImage()
            break

          case 'ArrowLeft':
            previousImage()
            break

          case 'Escape':
            hideImage()
            break

          case ' ':
            toggleFullHeight()
            break

          default:
            return
        }

        e.preventDefault()
      }
    },

    mouse (e) {
      switch (e.type) {
        case 'mousedown':
          state.dragging = true
          state.dragPosition = e.clientY
          elements.image.classList.add(CLASSES.grabbing)
          break

        case 'mousemove':
          if (state.dragging) {
            elements.imageContainer.scrollTop -= e.clientY - state.dragPosition
            state.dragPosition = e.clientY
          }
          break

        case 'mouseup':
        case 'mouseout':
          state.dragging = false
          elements.image.classList.remove(CLASSES.grabbing)
          break

        case 'dblclick':
          toggleFullHeight()
          break

        default:
          return
      }

      e.preventDefault()
    }
  }

  const create = {
    viewContainer () {
      elements.container = $.create('div', {
        className: 'image-view-container',
        contents: [
          create.viewContainerHeader(),
          create.viewContainerBody(),
          create.viewContainerFooter()
        ]
      })

      document.body.appendChild(elements.container)
    },

    viewContainerBody () {
      elements.image = $.create('img', {
        className: 'image-view',
        events: {
          'mousedown mouseup mousemove mouseout dblclick': events.mouse
        }
      })

      elements.imageContainer = $.create('div', {
        className: 'image-view-body',
        contents: elements.image
      })

      return elements.imageContainer
    },

    viewContainerHeader () {
      elements.imageNumber = $.create('span', {
        className: 'image-view-number-current'
      })
      elements.imageTotal = $.create('span', {
        className: 'image-view-number-total'
      })
      let imageNumber = $.create('div', {
        className: 'image-view-number',
        contents: [
          elements.imageNumber,
          '/',
          elements.imageTotal
        ]
      })
      let close = create.toolbarButton('Close (Esc)', 'close', hideImage)

      return {
        tag: 'div',
        className: 'image-view-header-wrapper',
        contents: {
          tag: 'div',
          className: 'image-view-header',
          contents: [imageNumber, close]
        }
      }
    },

    viewContainerFooter () {
      let previous = create.toolbarButton('Previous (←)', 'before', previousImage)
      let fullHeight = create.toolbarButton('Toggle full height (Space)', 'expand', toggleFullHeight)
      let next = create.toolbarButton('Next (→)', 'next', nextImage)

      return {
        tag: 'div',
        className: 'image-view-footer-wrapper',
        contents: {
          tag: 'div',
          className: 'image-view-footer',
          contents: [previous, fullHeight, next]
        }
      }
    },

    /**
     * @param {string} title
     * @param {string} icon
     * @param {function} handler
     */
    toolbarButton (title, icon, handler) {
      return {
        tag: 'a',
        href: '#',
        title: title,
        className: `icon-button icon-${icon}`,
        events: {
          'click': (e) => {
            e.preventDefault()
            e.stopPropagation()
            handler()
          }
        }
      }
    }
  }

  return function () {
    if (location.pathname !== ENABLE_ON_PATH) {
      return
    }

    addStyle(imageViewCSS)

    $.ready()
      .then(() => {
        const topic = $('table.topic')

        // Assign class to image links
        $.set($$(urlExtractor.getLinksSelector(), topic), {
          className: CLASSES.imageLink
        })

        $.delegate(topic, 'click', SELECTORS.imageLink, events.linkClick)
      })
  }
})()
