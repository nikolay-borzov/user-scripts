import { $, $$ } from '../libs/bliss'
import addStyle from '../common/addStyle'
import request from '../common/request'
import regex from '../common/regex'

import imageViewCSS from './styles/image-view.css'

export default (function () {
  const ENABLE_ON_PATH = '/forum/viewtopic.php'

  const CLASSES = {
    imageLink: 'image-link',
    loading: 'loading-indicator',
    open: 'image-view-open'
  }

  const SELECTORS = {
    imageLink: `.${CLASSES.imageLink}`
  }

  const linkExtractors = [
    {
      name: 'FastPic',
      linkSelector: '[href^="http://fastpic.ru/view/"]',
      linkRegEx: new RegExp('^http://fastpic.ru/view/'),
      imageUrlRegex: /loading_img = '([^']*)'/
    },
    {
      name: 'ImageBam',
      linkSelector: '[href^="http://www.imagebam.com/image/"]',
      linkRegEx: new RegExp('^http://www.imagebam.com/image/'),
      imageUrlRegex: /property="og:image" content="([^"]*)"/
    },
    {
      name: 'ImageVenue',
      linkSelector: '[href*=".imagevenue.com/img.php"]',
      linkRegEx: new RegExp('imagevenue.com/img.php'),
      imageUrlRegex: /id="thepic".*src="([^"]*)"/i,
      buildImageUrl (pageUrl, imageUrl) {
        const url = new URL(pageUrl)
        url.search = ''
        url.pathname = imageUrl

        return url.href
      }
    }
  ]

  const elements = {
    body: null,
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
    elements.container.classList.add(CLASSES.loading)

    elements.image.src = ''
    let imageObj = new Image()
    imageObj.onload = function () {
      elements.image.src = this.src
      elements.container.classList.remove(CLASSES.loading)
    }
    imageObj.src = imageUrl

    elements.body.classList.add(CLASSES.open)
    state.open = true
  }

  function hideImage (imageUrl) {
    elements.body.classList.remove(CLASSES.open)
    state.open = false
    state.currentLink = null
    elements.image.src = ''
  }

  function setImage (link) {
    state.currentLink = link

    let imageUrl = link.dataset['imgUrl']
    if (imageUrl) {
      showImage(imageUrl)
      return
    }

    link.classList.add(CLASSES.loading)
    getImageUrl(link.href, (imageUrl) => {
      link.dataset['imgUrl'] = imageUrl

      link.classList.remove(CLASSES.loading)

      showImage(imageUrl)
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

  function getExtractor (pageUrl) {
    return linkExtractors.find((ext) => ext.linkRegEx.test(pageUrl))
  }

  function getImageUrl (pageUrl, cb) {
    request(pageUrl)
      .then((response) => {
        const extractor = getExtractor(pageUrl)
        let imageUrl = regex.getFirstMatchGroup(extractor.imageUrlRegex,
                                                response.responseText)

        if (extractor.buildImageUrl) {
          imageUrl = extractor.buildImageUrl(pageUrl, imageUrl)
        }

        if (imageUrl) {
          cb(imageUrl)
        }
      })
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
        elements.body = document.body

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
        const linkSelector = linkExtractors
          .map((extractor) => {
            return `a${extractor.linkSelector}.postLink`
          })
          .join(',')

        $.set($$(linkSelector, topic), {
          className: CLASSES.imageLink
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
