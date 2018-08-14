import { $, $$ } from 'bliss'
import addStyle from 'addStyle'

import imageViewCSS from './styles.css'

import urlExtractor from './url-extractor'

export default (function() {
  const CLASSES = {
    imageLink: 'js-image-link',
    imageLinkZoom: 'iv-icon--type-zoom',
    imageLinkHover: 'iv-icon--hover',
    brokenImage: 'iv-icon--type-image-broken',
    loading: 'iv-icon--type-loading',
    open: 'iv-image-view--open',
    single: 'iv-image-view--single',
    fullHeight: 'iv-image-view--full-height',
    iconExpand: 'iv-icon--type-expand',
    iconShrink: 'iv-icon--type-shrink',
    grabbing: 'iv-image-view__image--grabbing',
    buttonActive: 'iv-icon-button--active'
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
    isSingle: false,
    getCurrentLinkIndex() {
      return this.linksSet.indexOf(this.currentLink)
    },
    getLastLinkIndex() {
      return this.linksSet.length - 1
    },
    dragPosition: null,
    dragging: false
  }

  /**
   * Actions
   */
  const image = {
    async show(link) {
      const container = elements.container
      const img = elements.image

      state.currentLink = link

      if (state.isSingle) {
        container.classList.add(CLASSES.single)
      } else {
        container.classList.remove(CLASSES.single)
        elements.imageNumber.textContent = state.getCurrentLinkIndex() + 1
      }

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

      let imageUrl = link.dataset.ivImgUrl
      // Get full image URL
      if (!imageUrl) {
        imageUrl = await urlExtractor.getImageUrl(link, link.dataset.ivHost)
        if (!imageUrl) {
          image.markAsBroken(link)
          return
        }
        link.dataset.ivImgUrl = imageUrl
      }

      try {
        await image.preload(imageUrl)
        img.src = imageUrl

        if (state.open) {
          container.classList.remove(CLASSES.loading)
        } else {
          link.classList.replace(CLASSES.loading, CLASSES.imageLinkZoom)
          // Open image view
          document.documentElement.classList.add(CLASSES.open)
          state.open = true
        }
      } catch (e) {
        // eslint-disable-next-line
        if (GM_openInTab) {
          // If image cannot be loaded, open it in new tab
          GM_openInTab(imageUrl)
        }
        // Prevent opening failed image again
        link.classList.remove(CLASSES.imageLink)
        image.markAsBroken(link)
        // Open link in new tab on next click
        $.attributes(link, { target: '_blank' })
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
      document.documentElement.classList.remove(CLASSES.open)
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
      elements.buttons.toggleFullHeight.classList.toggle(CLASSES.iconExpand)
      elements.buttons.toggleFullHeight.classList.toggle(CLASSES.iconShrink)
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

  /**
   * Event handlers
   */
  const events = {
    linkClick(e) {
      e.preventDefault()

      if (state.firstClick) {
        create.viewContainer()
        state.firstClick = false
      }

      let link = e.target
      // Collect neighbor links
      state.linksSet = $$(SELECTORS.imageLink, link.parentNode)
      state.isSingle = state.linksSet.length === 1

      if (!state.isSingle) {
        // Set total images count
        elements.imageTotal.textContent = state.linksSet.length
      }

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

  /**
   * Element builders
   */
  const create = {
    viewContainer() {
      elements.container = $.create('div', {
        className: 'iv-image-view iv-icon iv-icon--size-button',
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
        className: 'iv-image-view__image',
        events: {
          'mousedown mouseup mousemove mouseout dblclick': events.mouse
        }
      })

      elements.imageContainer = $.create('div', {
        className: 'iv-image-view__body',
        contents: [
          {
            tag: 'div',
            className: 'iv-image-view__backdrop',
            events: {
              click: image.hide
            }
          },
          elements.image
        ]
      })

      return elements.imageContainer
    },

    viewContainerHeader() {
      elements.imageNumber = document.createElement('span')
      elements.imageTotal = document.createElement('span')
      let imageNumber = $.create('div', {
        className: 'iv-image-view__number single-hide',
        contents: [elements.imageNumber, '/', elements.imageTotal]
      })

      elements.buttons.close = create.toolbarButton(
        'Close (Esc)',
        'close',
        image.hide
      )

      return {
        tag: 'div',
        className: 'iv-image-view__header-wrapper',
        contents: {
          tag: 'div',
          className: 'iv-image-view__header',
          contents: [imageNumber, elements.buttons.close]
        }
      }
    },

    viewContainerFooter() {
      const buttons = elements.buttons
      buttons.previous = create.toolbarButton(
        'Previous (←)',
        'previous',
        image.previous,
        'single-hide'
      )
      buttons.toggleFullHeight = create.toolbarButton(
        'Toggle full height (Space)',
        'expand',
        image.toggleFullHeight
      )
      buttons.next = create.toolbarButton(
        'Next (→)',
        'next',
        image.next,
        'single-hide'
      )

      return {
        tag: 'div',
        className: 'iv-image-view__footer-wrapper',
        contents: {
          tag: 'div',
          className: 'iv-image-view__footer',
          contents: [buttons.previous, buttons.toggleFullHeight, buttons.next]
        }
      }
    },

    toolbarButton(title, icon, handler, className = '') {
      return $.create('a', {
        href: '#',
        title: title,
        className: `iv-icon-button iv-icon iv-icon--type-${icon} ${className}`,
        events: {
          click: e => {
            e.preventDefault()
            handler()
          }
        }
      })
    }
  }

  /**
   * Initializes image viewer
   * @param {Array<string>} enabledHosts
   */
  return function(enabledHosts) {
    addStyle(imageViewCSS)

    const container = $('body')

    // Assign class to image links

    const linkClasses = [
      CLASSES.imageLink,
      'iv-image-link',
      'iv-icon',
      'iv-icon--hover',
      CLASSES.imageLinkZoom,
      'iv-icon--size-button'
    ]

    const getHostName = urlExtractor.getHostNameMatcher(enabledHosts)

    const imagesWithLinks = $$('a > img, a > var', container)

    imagesWithLinks
      .map(img => img.parentNode)
      .filter(link => link.href)
      .forEach(link => {
        const hostName = getHostName(link.href)

        if (hostName) {
          link.dataset.ivHost = hostName
          link.classList.add(...linkClasses)
        }
      })

    $.delegate(container, 'click', SELECTORS.imageLink, events.linkClick)
  }
})()
