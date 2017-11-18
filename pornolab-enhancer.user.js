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

  const enhance = {
    title () {
      const TAGS_REGEX = /\[([^[]*)\]/g
      const TAGS_SEPARATOR_REGEX = /(?:,\s?|;)/
      const TAGS_SEPARATOR = ', '
      const TAGS_GROUP_SEPARATOR = ' | '

      const titleElement = document.querySelector('.maintitle')
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
        const docFragment = document.createDocumentFragment()

        tags.forEach((tag, index) => {
          const tagLink = document.createElement('a')
          tagLink.classList.add('tags-row-tag')
          tagLink.setAttribute('href', `/forum/tracker.php?nm=${tag}`)
          tagLink.setAttribute('target', `_blank`)
          tagLink.textContent = tag

          docFragment.appendChild(tagLink)
          if (index + 1 !== tags.length) {
            docFragment.appendChild(document.createTextNode(TAGS_SEPARATOR))
          }
        })

        return docFragment
      }

      const row = document.createElement('div')
      row.classList.add('tags-row')

      tagGroups.forEach((tags, index) => {
        row.appendChild(createTagLinks(tags))
        if (index + 1 !== tagGroups.length) {
          row.appendChild(document.createTextNode(TAGS_GROUP_SEPARATOR))
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
    }
  }

  if (location.pathname === TOPIC_PATH) {
    enhance.title()
  }

  enhance.pager()
})()
