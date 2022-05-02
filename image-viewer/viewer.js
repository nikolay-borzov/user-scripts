import { addStyle } from '../common/api'
import { $, $$ } from '../libs/bliss'

import imageViewCSS from './styles.css'
import { urlExtractor } from './url-extractor'

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
  buttonActive: 'iv-icon-button--active',
}

const SELECTORS = {
  imageLink: `.${CLASSES.imageLink}`,
}

const EMPTY_SRC =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI='

const TRANSITION_DURATION = 350

/**
 * Initializes image viewer.
 *
 * @param {string[]} enabledHosts
 */
export function initViewer(enabledHosts) {
  addStyle(imageViewCSS)

  const container = $('body')

  // Save metadata to image link element

  const linkClasses = [
    CLASSES.imageLink,
    'iv-image-link',
    'iv-icon',
    'iv-icon--hover',
    CLASSES.imageLinkZoom,
    'iv-icon--size-button',
  ]

  const getHostName = urlExtractor.getHostNameMatcher(enabledHosts)

  /** @type {{ link: HTMLAnchorElement; thumbnailUrl: string }[]} */
  const imagesWithLinks = $$('a > img, a > var', container)
    .map((img) => ({
      link: img.parentElement,
      thumbnailUrl: img.src || img.title,
    }))
    .filter(({ link }) => link.href)

  for (const { link, thumbnailUrl } of imagesWithLinks) {
    const hostName = getHostName(link.href)

    if (hostName) {
      link.dataset.ivHost = hostName
      link.dataset.ivThumbnail = thumbnailUrl
      link.classList.add(...linkClasses)
    }
  }

  // @ts-ignore -- Assume target is a link
  $.delegate(container, 'click', SELECTORS.imageLink, events.linkClick)
}

/**
 * @typedef {object} Elements
 * @property {HTMLDivElement} container
 * @property {HTMLImageElement} image
 * @property {HTMLImageElement} imageThumbnail
 * @property {HTMLDivElement} imageContainer
 * @property {HTMLSpanElement} imageNumber
 * @property {HTMLSpanElement} imageTotal
 * @property {object} buttons
 * @property {HTMLAnchorElement} buttons.next
 * @property {HTMLAnchorElement} buttons.previous
 * @property {HTMLAnchorElement} buttons.close
 * @property {HTMLAnchorElement} buttons.toggleFullHeight
 */

/** @type {Elements} */
const elements = {
  container: undefined,
  image: undefined,
  imageThumbnail: undefined,
  imageContainer: undefined,
  imageNumber: undefined,
  imageTotal: undefined,
  buttons: {
    next: undefined,
    previous: undefined,
    close: undefined,
    toggleFullHeight: undefined,
  },
}

/**
 * @typedef {object} State
 * @property {boolean} isFirstClick Whether image view link clicked for the first time.
 * @property {boolean} isOpened
 * @property {HTMLAnchorElement} [currentLink] Opened image anchor element.
 * @property {HTMLAnchorElement[]} linksSet List of current view's links.
 * @property {boolean} isSingle Whether the current view has only one image link.
 * @property {() => number} getCurrentLinkIndex
 * @property {() => number} getLastLinkIndex
 * @property {number} dragPosition Y-Axis offset.
 * @property {boolean} dragging Whether image is being dragged.
 */

/** @type {State} */
const state = {
  isFirstClick: true,
  isOpened: false,
  currentLink: undefined,
  linksSet: [],
  isSingle: false,
  getCurrentLinkIndex() {
    return this.currentLink === undefined
      ? -1
      : this.linksSet.indexOf(this.currentLink)
  },
  getLastLinkIndex() {
    return this.linksSet.length - 1
  },
  dragPosition: 0,
  dragging: false,
}

/**
 * @typedef {object} ImageLoadState
 * @property {number} width
 * @property {boolean} isLoaded
 */

/**
 * Actions.
 */
const image = {
  /**
   * Displays viewer for the image link.
   *
   * @param {HTMLAnchorElement} link
   */
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
      elements.imageNumber.textContent = (
        state.getCurrentLinkIndex() + 1
      ).toString()
    }

    // Open image view
    if (!state.isOpened) {
      document.documentElement.classList.add(CLASSES.open)
      state.isOpened = true
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
    const thumbnailURL = link.dataset.ivThumbnail

    // Quit if required data is not set
    if (!thumbnailURL || !link.dataset.ivHost) {
      throw new Error('[image-viewer] Either thumbnail URL or host is not set')
    }

    if (isSizeKnown) {
      // Set up thumbnail size equal to image size to reduce image loading time feel
      thumbnail.width = Number(link.dataset.ivWidth)
      thumbnail.src = thumbnailURL
      // Show thumbnail resized to image size
      container.classList.add(CLASSES.thumbnail)
    } else {
      // Thumbnail is hidden after image is loaded
    }

    let imageURL = link.dataset.ivImgUrl

    // Get full image URL
    if (!imageURL) {
      imageURL = await urlExtractor.getImageURL({
        url: link.href,
        thumbnailURL,
        host: link.dataset.ivHost,
      })

      if (!imageURL) {
        image.markAsBroken(link)

        return
      }

      link.dataset.ivImgUrl = imageURL
    }

    // Preload image
    try {
      await image.preload(
        imageURL,
        isSizeKnown ? undefined : image.setThumbnailSize
      )

      img.src = imageURL

      container.classList.remove(
        CLASSES.thumbnail,
        CLASSES.loading,
        CLASSES.loadingIcon
      )

      // Hide thumbnail after timeout. Useful for images with transparency
      setTimeout(image.hideThumbnail, TRANSITION_DURATION)
    } catch {
      // Prevent opening failed image again
      link.classList.remove(CLASSES.imageLink)
      image.markAsBroken(link)
      // Open link in new tab on next click
      $.attributes(link, { target: '_blank' })
    }
  },

  /**
   * Preloads image.
   *
   * @param {string} url
   * @param {(state: ImageLoadState) => void} [onSizeGet]
   * @returns {Promise<void>}
   */
  preload(url, onSizeGet) {
    return new Promise((resolve, reject) => {
      const imageObject = new Image()

      imageObject.addEventListener('load', () => resolve())
      imageObject.addEventListener('error', reject)

      // Load image
      imageObject.src = url

      if (onSizeGet) {
        image.getSize(imageObject).then(onSizeGet)
      }
    })
  },

  /**
   * Gets image load status and width.
   *
   * @param {HTMLImageElement} img
   * @returns {Promise<ImageLoadState>}
   */
  getSize(img) {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (img.naturalWidth) {
          clearInterval(intervalId)
          resolve({ width: img.naturalWidth, isLoaded: img.complete })
        }
      }, 10)
    })
  },

  /**
   * @param {ImageLoadState} state
   */
  setThumbnailSize({ width, isLoaded }) {
    if (!state.currentLink) {
      throw new Error('[image-viewer] currentLink is not set')
    }

    const thumbnailURL = state.currentLink.dataset.ivThumbnail

    if (!thumbnailURL) {
      throw new Error('[image-viewer] Thumbnail URL is not set')
    }

    elements.imageThumbnail.width = width
    elements.imageThumbnail.src = thumbnailURL

    if (!isLoaded) {
      elements.container.classList.add(CLASSES.thumbnail)
    }

    // Save image size
    state.currentLink.dataset.ivWidth = width.toString()
  },

  hideThumbnail() {
    elements.imageThumbnail.removeAttribute('width')
    elements.imageThumbnail.src = EMPTY_SRC
  },

  hide() {
    document.documentElement.classList.remove(CLASSES.open)
    state.isOpened = false
    state.currentLink = undefined
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

  /**
   * @param {HTMLAnchorElement} link
   */
  markAsBroken(link) {
    elements.container.classList.replace(
      CLASSES.loadingIcon,
      CLASSES.brokenImage
    )
    elements.container.classList.remove(CLASSES.loading)
    link.classList.replace(CLASSES.imageLinkZoom, CLASSES.brokenImage)
  },
}

/**
 * Event handlers.
 */
const events = {
  /**
   * Image link click.
   *
   * @param {Event & { target: HTMLAnchorElement }} event
   */
  linkClick(event) {
    event.preventDefault()

    // Lazily create viewer container
    if (state.isFirstClick) {
      create.viewContainer()
      state.isFirstClick = false
    }

    const link = event.target

    // Collect neighbor links
    state.linksSet = $$(SELECTORS.imageLink, link.parentElement ?? undefined)
    state.isSingle = state.linksSet.length === 1

    if (!state.isSingle) {
      // Set total images count
      elements.imageTotal.textContent = state.linksSet.length.toString()
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

    /**
     * @param {KeyboardEvent} event
     */
    handler(event) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      switch (event.key) {
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

      event.preventDefault()
    },
  },

  /**
   * @param {MouseEvent} event
   */
  mouse(event) {
    switch (event.type) {
      case 'mousedown':
        state.dragging = true
        state.dragPosition = event.clientY
        elements.image.classList.add(CLASSES.grabbing)
        break

      case 'mousemove':
        if (state.dragging) {
          elements.imageContainer.scrollTop -=
            event.clientY - state.dragPosition
          state.dragPosition = event.clientY
        }
        break

      case 'mouseup':

      // fall through
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

    event.preventDefault()
  },
}

/**
 * Element builders.
 */
const create = {
  viewContainer() {
    elements.container = $.create('div', {
      className: 'iv-image-view iv-icon iv-icon--size-button',
      contents: [
        create.viewContainerHeader(),
        create.viewContainerBody(),
        create.viewContainerFooter(),
      ],
    })

    document.body.append(elements.container)
  },

  /** @returns {HTMLDivElement} */
  viewContainerBody() {
    elements.image = $.create('img', {
      className: 'iv-image',
      events: {
        'mousedown mouseup mousemove mouseout dblclick': events.mouse,
      },
    })

    elements.imageThumbnail = $.create('img', {
      className: 'iv-thumbnail',
    })

    elements.imageContainer = $.create('div', {
      className: 'iv-image-view__body',
      contents: [
        {
          tag: 'div',
          className: 'iv-image-view__backdrop',
          events: {
            click: image.hide,
          },
        },
        {
          tag: 'div',
          className: 'iv-thumbnail-wrapper',
          contents: elements.imageThumbnail,
        },
        elements.image,
      ],
    })

    return elements.imageContainer
  },

  /** @returns {Record<string, unknown>} */
  viewContainerHeader() {
    elements.imageNumber = document.createElement('span')
    elements.imageTotal = document.createElement('span')
    const imageNumber = $.create('div', {
      className: 'iv-image-view__number single-hide',
      contents: [elements.imageNumber, '/', elements.imageTotal],
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
        contents: [imageNumber, elements.buttons.close],
      },
    }
  },

  /** @returns {Record<string, unknown>} */
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
        contents: [buttons.previous, buttons.toggleFullHeight, buttons.next],
      },
    }
  },

  /**
   * @param {string} title
   * @param {string} icon
   * @param {() => void} handler
   * @param {string} [className='']
   * @returns {HTMLAnchorElement}
   */
  toolbarButton(title, icon, handler, className = '') {
    return $.create('a', {
      href: '#',
      title,
      className: `iv-icon-button iv-icon iv-icon--type-${icon} ${className}`,
      events: {
        /** @param {MouseEvent} event */
        click: (event) => {
          event.preventDefault()
          handler()
        },
      },
    })
  },
}
