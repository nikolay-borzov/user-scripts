import { $, $$ } from 'bliss'
import addStyle from 'addStyle'

import imageViewCSS from './styles.css'

import urlExtractor from './image-url-extractor'

export default (function() {
  const ENABLE_ON_PATH = '/forum/viewtopic.php'

  const CLASSES = {
    imageLink: 'js-image-link',
    imageLinkZoom: 'icon_type_zoom',
    imageLinkHover: 'icon_hover',
    brokenImage: 'icon_type_image_broken',
    loading: 'icon_type_loading',
    open: 'image-view_open',
    fullHeight: 'image-view_full-height',
    grabbing: 'image-view__image_grabbing',
    buttonActive: 'icon-button_active'
  }

  const SELECTORS = {
    imageLink: `.${CLASSES.imageLink}`
  }

  const EMPTY_SRC =
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI='

  const elements = {
    container: null,
    image: null,
    imageContainer: null,
    imageNumber: null,
    imageTotal: null,
    buttons: {
      next: null,
      previous: null,
      close: null,
      toggleFullHeight: null
    }
  }

  const state = {
    firstClick: true,
    open: false,
    currentLink: null,
    linksSet: [],
    getCurrentLinkIndex() {
      return this.linksSet.indexOf(this.currentLink)
    },
    getLastLinkIndex() {
      return this.linksSet.length - 1
    },
    dragPosition: null,
    dragging: false
  }

  const image = {
    async show(link) {
      const container = elements.container
      const img = elements.image

      state.currentLink = link
      elements.imageNumber.textContent = state.getCurrentLinkIndex() + 1

      if (state.open) {
        // Clear previous
        img.src = EMPTY_SRC

        if (link.classList.contains(CLASSES.brokenImage)) {
          container.classList.add(CLASSES.brokenImage)
          // Do not try to load broken image
          return
        } else {
          container.classList.remove(CLASSES.brokenImage)
          container.classList.add(CLASSES.loading)
        }
      } else {
        link.classList.replace(CLASSES.imageLinkZoom, CLASSES.loading)
      }

      let imageUrl = link.dataset['imgUrl']
      // Get full image URL
      if (!imageUrl) {
        imageUrl = await urlExtractor.getImageUrl(link)
        if (!imageUrl) {
          image.markAsBroken(link)
          return
        }
        link.dataset['imgUrl'] = imageUrl
      }

      try {
        await image.preload(imageUrl)
        img.src = imageUrl

        if (state.open) {
          container.classList.remove(CLASSES.loading)
        } else {
          link.classList.replace(CLASSES.loading, CLASSES.imageLinkZoom)
          // Open image view
          document.body.classList.add(CLASSES.open)
          state.open = true
        }
      } catch (e) {
        // Prevent opening failed image again
        link.classList.remove(CLASSES.imageLink)
        image.markAsBroken(link)
      }
    },

    preload(url) {
      return new Promise((resolve, reject) => {
        let imageObj = new Image()

        imageObj.onload = resolve
        imageObj.onerror = reject
        // Load image
        imageObj.src = url
      })
    },

    hide() {
      document.body.classList.remove(CLASSES.open)
      state.open = false
      state.currentLink = null
      elements.image.src = EMPTY_SRC
      events.keyboard.unbind()
    },

    next() {
      const currentIndex = state.getCurrentLinkIndex()
      const newIndex =
        currentIndex < state.getLastLinkIndex() ? currentIndex + 1 : 0

      image.show(state.linksSet[newIndex])
    },

    previous() {
      const currentIndex = state.getCurrentLinkIndex()
      const newIndex =
        currentIndex === 0 ? state.getLastLinkIndex() : currentIndex - 1

      image.show(state.linksSet[newIndex])
    },

    toggleFullHeight() {
      elements.container.classList.toggle(CLASSES.fullHeight)
    },

    markAsBroken(link) {
      if (state.open) {
        elements.container.classList.replace(
          CLASSES.loading,
          CLASSES.brokenImage
        )
        link.classList.replace(CLASSES.imageLinkZoom, CLASSES.brokenImage)
      } else {
        link.classList.replace(CLASSES.loading, CLASSES.brokenImage)
      }
    }
  }

  const events = {
    linkClick(e) {
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

      image.show(link)
    },

    keyboard: {
      bind() {
        document.addEventListener('keydown', events.keyboard.handler, true)
      },
      unbind() {
        document.removeEventListener('keydown', events.keyboard.handler, true)
      },
      handler(e) {
        if (e.defaultPrevented || e.repeat) {
          return
        }

        switch (e.key) {
          case 'ArrowRight':
            image.next()
            break

          case 'ArrowLeft':
            image.previous()
            break

          case 'Escape':
            image.hide()
            break

          case ' ':
            image.toggleFullHeight()
            break

          default:
            return
        }

        e.preventDefault()
      }
    },

    mouse(e) {
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
          image.toggleFullHeight()
          break

        default:
          return
      }

      e.preventDefault()
    }
  }

  const create = {
    viewContainer() {
      elements.container = $.create('div', {
        className: 'image-view icon icon_size_button',
        contents: [
          create.viewContainerHeader(),
          create.viewContainerBody(),
          create.viewContainerFooter()
        ]
      })

      document.body.appendChild(elements.container)
    },

    viewContainerBody() {
      elements.image = $.create('img', {
        className: 'image-view__image',
        events: {
          'mousedown mouseup mousemove mouseout dblclick': events.mouse
        }
      })

      elements.imageContainer = $.create('div', {
        className: 'image-view__body',
        contents: elements.image
      })

      return elements.imageContainer
    },

    viewContainerHeader() {
      elements.imageNumber = document.createElement('span')
      elements.imageTotal = document.createElement('span')
      let imageNumber = $.create('div', {
        className: 'image-view__number',
        contents: [elements.imageNumber, '/', elements.imageTotal]
      })

      elements.buttons.close = create.toolbarButton(
        'Close (Esc)',
        'close',
        image.hide
      )

      return {
        tag: 'div',
        className: 'image-view__header-wrapper',
        contents: {
          tag: 'div',
          className: 'image-view__header',
          contents: [imageNumber, elements.buttons.close]
        }
      }
    },

    viewContainerFooter() {
      const buttons = elements.buttons
      buttons.previous = create.toolbarButton(
        'Previous (←)',
        'previous',
        image.previous
      )
      buttons.toggleFullHeight = create.toolbarButton(
        'Toggle full height (Space)',
        'expand',
        image.toggleFullHeight
      )
      buttons.next = create.toolbarButton('Next (→)', 'next', image.next)

      return {
        tag: 'div',
        className: 'image-view__footer-wrapper',
        contents: {
          tag: 'div',
          className: 'image-view__footer',
          contents: [buttons.previous, buttons.toggleFullHeight, buttons.next]
        }
      }
    },

    toolbarButton(title, icon, handler) {
      return $.create('a', {
        href: '#',
        title: title,
        className: `icon-button icon icon_type_${icon}`,
        events: {
          click: e => {
            e.preventDefault()
            handler()
          }
        }
      })
    }
  }

  return function() {
    if (location.pathname !== ENABLE_ON_PATH) {
      return
    }

    addStyle(imageViewCSS)

    $.ready().then(() => {
      const topic = $('table.topic')

      // Assign class to image links
      const linkClasses = `${CLASSES.imageLink} image-link icon icon_hover ${
        CLASSES.imageLinkZoom
      } icon_size_button`
      $.set($$(urlExtractor.getLinksSelector(), topic), {
        className: linkClasses
      })

      $.delegate(topic, 'click', SELECTORS.imageLink, events.linkClick)
    })
  }
})()
