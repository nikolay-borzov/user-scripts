// ==UserScript==
// @name         Pornolab Enhancer
// @version      1.2.1
// @description  Improves UX
// @author       shikiyoku
// @license      MIT
// @copyright    2017+, shikiyoku
// @namespace    https://github.com/shikiyoku
// @icon         http://pornolab.lib/favicon.ico
// @icon         http://pornolab.cc/favicon.ico
// @homepageURL  https://github.com/shikiyoku/user-scripts
// @supportURL   https://github.com/shikiyoku/user-scripts/issues
// @include      *pornolab.*
// @connect      fastpic.ru
// @connect      www.imagebam.com
// @connect      imagevenue.com
// @run-at       document-body
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==
// ==OpenUserJS==
// @author shikiyoku
// ==/OpenUserJS==

(function () {
  /* global GM_addStyle GM_xmlhttpRequest */
  'use strict'

  const TOPIC_PATH = '/forum/viewtopic.php'

  const helpers = {
    getAllMatchGroups (regEx, str) {
      let results = []
      let match

      while ((match = regEx.exec(str)) !== null) {
        results.push(match[1])
      }

      return results
    },

    getFirstMatchGroup (regEx, str) {
      let match = regEx.exec(str)

      return match ? match[1] : null
    },

    /**
    * Event delegation
    */
    on (parent, eventName, childSelector, cb) {
      parent.addEventListener(eventName, function (event) {
        const matchingChild = event.target.closest(childSelector)

        if (matchingChild) {
          cb(event, matchingChild)
        }
      })
    }
  }

  // Convenient wrappers and aliases
  const create = {
    element (tag, { classes, attributes, textContent }) {
      const el = document.createElement(tag)

      if (typeof classes === 'string') {
        el.classList.add(classes)
      }

      if (attributes) {
        Object.keys(attributes).forEach((attrName) => {
          el.setAttribute(attrName, attributes[attrName])
        })
      }

      if (textContent) {
        el.textContent = textContent
      }

      return el
    },

    documentFragment: document.createDocumentFragment.bind(document),
    textNode: document.createTextNode.bind(document)
  }

  const $ = document.querySelector.bind(document)
  const $$ = function (selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector))
  }

  const enhance = {
    title () {
      if (location.pathname !== TOPIC_PATH) {
        return
      }

      const TAGS_REGEX = /\[([^[]*)\]/g
      const TAGS_SEPARATOR_REGEX = /(?:,\s?|;)/
      const TAGS_SEPARATOR = ', '
      const TAGS_GROUP_SEPARATOR = ' | '

      const titleElement = $('.maintitle')
      const titleLink = titleElement.children[0]
      const title = titleLink.textContent

      const tagGroups = helpers.getAllMatchGroups(TAGS_REGEX, title)
        .map((tagsString) => {
          return tagsString.split(TAGS_SEPARATOR_REGEX)
        })

      if (!tagGroups.length) {
        return
      }

      GM_addStyle(`
      .tags-row {
        padding:3px 0 0;
      }
      
      .tags-row-tag {
        border: solid 1px #cacaca;
        border-radius: 5px;
        display: inline-block;
        padding: 5px;
        margin-top: 7px;
        text-decoration: none;
        background-color: #efefef;
      }
      
      .tags-row-tag:hover {
        text-decoration: none !important;
        color: #345da4;
        border-color: #345da4;
      }
      `)

      // Remove tags from title

      const cleanTitle = title.replace(TAGS_REGEX, '').trim()
      titleLink.textContent = cleanTitle
      titleLink.setAttribute('title', title)

      // Add tags links

      function createTagLinks (tags) {
        const docFragment = create.documentFragment()

        tags.forEach((tag, index) => {
          const tagLink = create.element('a', {
            classes: 'tags-row-tag',
            attributes: {
              'href': `/forum/tracker.php?nm=${tag}`,
              'target': `_blank`
            },
            textContent: tag
          })

          docFragment.appendChild(tagLink)

          if (index + 1 !== tags.length) {
            docFragment.appendChild(create.textNode(TAGS_SEPARATOR))
          }
        })

        return docFragment
      }

      const row = create.element('div', {
        classes: 'tags-row'
      })

      tagGroups.forEach((tags, index) => {
        row.appendChild(createTagLinks(tags))

        if (index + 1 !== tagGroups.length) {
          row.appendChild(create.textNode(TAGS_GROUP_SEPARATOR))
        }
      })

      titleElement.parentNode.insertBefore(row, titleElement.nextSibling)
    },

    pager () {
      GM_addStyle(`
      .small > b > .menu-root,
      .nav .menu-root,
      a.pg {
        border: solid 1px  #cacaca;
        display: inline-block;
        padding: .5em .7em;
        text-decoration: none;
        background-color: #efefef;
      }
      
      a.pg {
        margin-right: .1em;
      }
      
      .small > b > .menu-root:hover,
      .nav .menu-root:hover,
      a.pg:hover {
        color: #345da4;
        border-color: #345da4;
        text-decoration: none !important;
      }
      
      .menu-root ~ b {
        display: inline-block;
        padding: .5em .7em;
        border: solid 1px transparent;
        margin-right: .1em;
      }
      
      .small > b > .menu-root,
      .nav .menu-root {
        padding-right: 20px;
        background-repeat: no-repeat;
        background-position: 95% 50%;
      }
      `)
    },

    download () {
      const downloadLink = $('.dl-link')

      if (!downloadLink) {
        return
      }

      GM_addStyle(`
      .quick-download {
        color: #000 !important;
        position: fixed;
        right: 25%;
        top: 0;
        width: 65px;
        height: 65px;
        overflow: hidden;
        text-align: center;
        text-decoration: none;
        background-color: #efefef;
        border: solid 1px #cacaca;
        border-radius: 0 0 10px 10px;
        transform: translateY(-90%);
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
      
      .quick-download:hover {
        color: #000 !important;
        text-decoration: none !important;
        transform: translateY(0);
        border-color: #345da4;
      }
      
      .quick-download-icon {
        display: block;
        height: 45px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiBmaWxsPSIjMzQ1ZGE0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTkgOWgtNFYzSDl2Nkg1bDcgNyA3LTd6TTUgMTh2MmgxNHYtMkg1eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=);
      }
      
      .quick-download:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 5px;
        background: rgba(52, 93, 164, .25);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%);
        transform-origin: 50% 50%;
      }
      
      @keyframes ripple {
        0% {
          transform: scale(0, 0);
          opacity: 1;
        }
        20% {
          transform: scale(25, 25);
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: scale(40, 40);
        }
      }
      
      .quick-download:focus:not(:active)::after {
        animation: ripple 1s ease-out;
      }
      `)

      const link = create.element('a', {
        classes: 'quick-download',
        attributes: {
          'href': '#'
        }
      })

      link.addEventListener('click', (e) => {
        e.preventDefault()

        var event = document.createEvent('MouseEvents')
        event.initEvent('click', true, true)

        downloadLink.dispatchEvent(event)
      }, false)

      const icon = create.element('span', {
        classes: 'quick-download-icon'
      })

      const sizeElement = create.element('span', {
        textContent: document.querySelector('.attach')
          .querySelector('.row1:nth-child(5)')
          .querySelector('td:nth-child(2)')
          .textContent
      })

      link.appendChild(icon)
      link.appendChild(sizeElement)

      document.body.appendChild(link)
    },

    imageView () {
      if (location.pathname !== TOPIC_PATH) {
        return
      }

      GM_addStyle(`
      .image-link {
        display: inline-flex;
        position: relative;
      }
      
      .image-link:hover:before,
      .loading-indicator:before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
      }
      
      .image-link:hover:after {
        position: absolute;
        content: '';
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUuNSAxNGgtLjc5bC0uMjgtLjI3QzE1LjQxIDEyLjU5IDE2IDExLjExIDE2IDkuNSAxNiA1LjkxIDEzLjA5IDMgOS41IDNTMyA1LjkxIDMgOS41IDUuOTEgMTYgOS41IDE2YzEuNjEgMCAzLjA5LS41OSA0LjIzLTEuNTdsLjI3LjI4di43OWw1IDQuOTlMMjAuNDkgMTlsLTQuOTktNXptLTYgMEM3LjAxIDE0IDUgMTEuOTkgNSA5LjVTNy4wMSA1IDkuNSA1IDE0IDcuMDEgMTQgOS41IDExLjk5IDE0IDkuNSAxNHoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTIgMTBoLTJ2Mkg5di0ySDdWOWgyVjdoMXYyaDJ2MXoiLz48L3N2Zz4=);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }
      
      .loading-indicator:after {
        position: absolute;
        content: '';
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgNnYzbDQtNC00LTR2M2MtNC40MiAwLTggMy41OC04IDggMCAxLjU3LjQ2IDMuMDMgMS4yNCA0LjI2TDYuNyAxNC44Yy0uNDUtLjgzLS43LTEuNzktLjctMi44IDAtMy4zMSAyLjY5LTYgNi02em02Ljc2IDEuNzRMMTcuMyA5LjJjLjQ0Ljg0LjcgMS43OS43IDIuOCAwIDMuMzEtMi42OSA2LTYgNnYtM2wtNCA0IDQgNHYtM2M0LjQyIDAgOC0zLjU4IDgtOCAwLTEuNTctLjQ2LTMuMDMtMS4yNC00LjI2eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=) !important;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        from {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
      
      .image-view-container {
        display: flex;
        box-sizing: border-box;
        height: 0;
        overflow: auto;
        background: rgba(0, 0, 0, .6);
        opacity: 0;
        transition: all .35s ease-out;
      }
      
      body.image-view-open {
        overflow: hidden;
      }
      
      body.image-view-open .image-view-container {
        opacity: 1;
        height: auto;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      
      .image-view {
        width: auto;
        max-width: 100%;
        max-height: 100%;
        /* fit in view port */
        /* align in the center */
        margin: auto;
      }
      `)

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
        body: document.body,
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
        return linkExtractors.find((ext) => {
          return ext.linkRegEx.test(pageUrl)
        })
      }

      function getImageUrl (pageUrl, cb) {
        GM_xmlhttpRequest({
          method: 'GET',
          url: pageUrl,
          onerror (response) {
            console.log('[Pornolab Enhancer] Cannot load page', response)
          },
          onload (response) {
            const extractor = getExtractor(pageUrl)
            let imageUrl = helpers.getFirstMatchGroup(extractor.imageUrlRegex, response.responseText)

            if (extractor.buildImageUrl) {
              imageUrl = extractor.buildImageUrl(pageUrl, imageUrl)
            }

            if (imageUrl) {
              cb(imageUrl)
            }
          }
        })
      }

      function handleLinkClick (event, link) {
        event.preventDefault()

        state.linksSet = $$(SELECTORS.imageLink, link.parentNode)

        setImage(link)
      }

      elements.container = create.element('div', {
        classes: 'image-view-container'
      })

      elements.image = create.element('img', {
        classes: 'image-view'
      })

      elements.container.appendChild(elements.image)

      elements.container.addEventListener('click', hideImage, false)

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

      document.body.appendChild(elements.container)

      const topic = $('table.topic')

      // Assign class to image links
      const linkSelector = linkExtractors
        .map((extractor) => {
          return `a${extractor.linkSelector}.postLink`
        })
        .join(',')
      console.log(linkSelector)
      $$(linkSelector, topic).forEach((link) => {
        link.classList.add(CLASSES.imageLink)
      })

      helpers.on(topic, 'click', SELECTORS.imageLink, handleLinkClick)
    }
  }

  enhance.title()

  enhance.pager()

  enhance.download()

  enhance.imageView()
})()
