// ==UserScript==
// @name         Pornolab Enhancer
// @version      1.0.0
// @description  Improves UX
// @author       shikiyoku
// @license      MIT
// @copyright    2017+, shikiyoku
// @namespace    https://github.com/shikiyoku
// @icon         http://pornolab.cc/favicon.ico
// @homepageURL  https://github.com/shikiyoku/user-scripts
// @supportURL   https://github.com/shikiyoku/user-scripts/issues
// @include      *pornolab.*
// @run-at       document-body
// @grant        GM_addStyle
// ==/UserScript==
// ==OpenUserJS==
// @author shikiyoku
// ==/OpenUserJS==

(function () {
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
    }
  }

  enhance.title()

  enhance.pager()

  enhance.download()
})()
