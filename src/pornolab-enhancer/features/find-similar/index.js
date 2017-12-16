import addStyle from 'addStyle'
import { $ } from 'bliss'

import findSimilarCSS from './styles.css'

export default (function () {
  const TOPIC_PATH = '/forum/viewtopic.php'
  // Match tags
  const TAGS_REGEX = /\[[^\]]+\]/g
  const REMOVE_CHARS_REGEX = /[&,:()#/\d.]/g
  const TRIM_SPACES_REGEX = /\s{2,}/g
  // const SEARCH_TERM_MAX_LENGTH = 60

  function createFindSimilarLink () {
    const titleElement = $('.maintitle')
    const titleLink = titleElement.children[0]
    const searchTerm = titleLink.textContent
      .trim()
      .replace(TAGS_REGEX, '')
      .replace(REMOVE_CHARS_REGEX, '')
      .replace(TRIM_SPACES_REGEX, ' ')

    $.create('a', {
      className: 'find-similar-link',
      href: `/forum/tracker.php?nm=${searchTerm}`,
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
