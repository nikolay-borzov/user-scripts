import addStyle from 'addStyle'
import { $ } from 'bliss'
import regex from 'regex'

import findSimilarCSS from './styles.css'

export default (function () {
  const TOPIC_PATH = '/forum/viewtopic.php'
  const TAGS_REGEX = /\[[^\]]+\]/g
  const WORDS_REGEX = /([\w\u0400-\u04FF-']+)/g
  const REMOVE_CHARS_REGEX = /^[\d-.]+$/
  const SEARCH_TERM_MAX_LENGTH = 61

  function createFindSimilarLink () {
    const titleElement = $('.maintitle')
    const titleLink = titleElement.children[0]
    const rawTitle = titleLink.textContent.replace(TAGS_REGEX, '').trim()
    const words = regex.getMatchGroups(WORDS_REGEX, rawTitle)
    let searchTerm = words
      .filter((word) => !REMOVE_CHARS_REGEX.test(word))
      .join(' ')

    if (searchTerm.length > SEARCH_TERM_MAX_LENGTH) {
      searchTerm = searchTerm.slice(0, SEARCH_TERM_MAX_LENGTH - 1)
      searchTerm = searchTerm.substring(0, searchTerm.lastIndexOf(' '))
    }

    $.create('a', {
      className: 'find-similar-link',
      href: `/forum/tracker.php?nm=${searchTerm}#search_opt`,
      target: '_blank',
      title: 'Find similar',
      after: titleLink
    })
  }

  return function () {
    $.ready()
      .then(() => {
        if (location.pathname === TOPIC_PATH) {
          addStyle(findSimilarCSS)
          createFindSimilarLink()
        }
      })
  }
})()
