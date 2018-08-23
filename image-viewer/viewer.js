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
    loadingIcon: 'iv-icon--type-loading',
    loading: 'iv-image-view__image--loading',
    thumbnail: 'iv-image-view__image--thumbnail',
    open: 'iv-image-view--open',
    single: 'iv-image-view--single',
    fullHeight: 'iv-image-view--full-height',
    iconExpand: 'iv-icon--type-expand',
    iconShrink: 'iv-icon--type-shrink',
    grabbing: 'iv-image--grabbing',
    buttonActive: 'iv-icon-button--active'
  }

  const SELECTORS = {
    imageLink: `.${CLASSES.imageLink}`
  }

  const EMPTY_SRC =
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI='

  const TRANSITION_DURATION = 350

  const elements = {
    container: null,
    image: null,
    imageThumbnail: null,
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
      const thumbnail = elements.imageThumbnail

      state.currentLink = link

      // Update images counter
      if (state.isSingle) {
        container.classList.add(CLASSES.single)
      } else {
        container.classList.remove(CLASSES.single)
        elements.imageNumber.textContent = state.getCurrentLinkIndex() + 1
      }

      // Open image view
      if (!state.open) {
        document.documentElement.classList.add(CLASSES.open)
        state.open = true
      }

      // Clear previous
      img.src = EMPTY_SRC

      if (link.classList.contains(CLASSES.brokenImage)) {
        container.classList.add(CLASSES.brokenImage)
        // Do not try to load broken image
        return
      }

      container.classList.remove(CLASSES.brokenImage)
      // Show loading indicator
      container.classList.add(CLASSES.loading, CLASSES.loadingIcon)

      const isSizeKnown = !!link.dataset.ivWidth
      const thumbnailUrl = link.dataset.ivThumbnail

      if (isSizeKnown) {
        // Set up thumbnail size equal to image size to reduce image loading time feeling
        thumbnail.width = link.dataset.ivWidth
        thumbnail.src = thumbnailUrl
        // Show thumbnail resized to image size
        container.classList.add(CLASSES.thumbnail)
      } else {
        // Thumbnail is hidden after image is loaded
      }

      let imageUrl = link.dataset.ivImgUrl
      // Get full image URL
      if (!imageUrl) {
        imageUrl = await urlExtractor.getImageUrl({
          url: link.href,
          thumbnailUrl,
          host: link.dataset.ivHost
        })

        if (!imageUrl) {
          image.markAsBroken(link)
          return
        }

        link.dataset.ivImgUrl = imageUrl
      }

      // Preload image
      try {
        await image.preload(
          imageUrl,
          isSizeKnown ? null : image.setThumbnailSize
        )

        img.src = imageUrl

        container.classList.remove(
          CLASSES.thumbnail,
          CLASSES.loading,
          CLASSES.loadingIcon
        )

        // Hide thumbnail after timeout. Useful for images with transparency
        setTimeout(image.hideThumbnail, TRANSITION_DURATION)
      } catch (e) {
        // Prevent opening failed image again
        link.classList.remove(CLASSES.imageLink)
        image.markAsBroken(link)
        // Open link in new tab on next click
        $.attributes(link, { target: '_blank' })
      }
    },

    preload(url, onSizeGet) {
      return new Promise((resolve, reject) => {
        const imageObject = new Image()

        imageObject.onload = resolve
        imageObject.onerror = reject
        // Load image
        imageObject.src = url

        if (onSizeGet) {
          image.getSize(imageObject).then(onSizeGet)
        }
      })
    },

    getSize(img) {
      return new Promise(resolve => {
        const intervalId = setInterval(() => {
          if (img.naturalWidth) {
            clearInterval(intervalId)
            resolve({ width: img.naturalWidth, complete: img.complete })
          }
        }, 10)
      })
    },

    setThumbnailSize({ width, complete }) {
      elements.imageThumbnail.width = width
      elements.imageThumbnail.src = state.currentLink.dataset.ivThumbnail

      if (!complete) {
        elements.container.classList.add(CLASSES.thumbnail)
      }

      // Save image size
      state.currentLink.dataset.ivWidth = width
    },

    hideThumbnail() {
      elements.imageThumbnail.removeAttribute('width')
      elements.imageThumbnail.src = EMPTY_SRC
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
      elements.container.classList.replace(
        CLASSES.loadingIcon,
        CLASSES.brokenImage
      )
      elements.container.classList.remove(CLASSES.loading)
      link.classList.replace(CLASSES.imageLinkZoom, CLASSES.brokenImage)
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
        className: 'iv-image',
        events: {
          'mousedown mouseup mousemove mouseout dblclick': events.mouse
        }
      })

      elements.imageThumbnail = $.create('img', {
        className: 'iv-thumbnail'
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
          {
            tag: 'div',
            className: 'iv-thumbnail-wrapper',
            contents: elements.imageThumbnail
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
      .map(img => {
        return { link: img.parentNode, thumbnailUrl: img.src || img.title }
      })
      .filter(({ link }) => link.href)
      .forEach(({ link, thumbnailUrl }) => {
        const hostName = getHostName(link.href)

        if (hostName) {
          link.dataset.ivHost = hostName
          link.dataset.ivThumbnail = thumbnailUrl
          link.classList.add(...linkClasses)
        }
      })

    $.delegate(container, 'click', SELECTORS.imageLink, events.linkClick)
  }
})()
