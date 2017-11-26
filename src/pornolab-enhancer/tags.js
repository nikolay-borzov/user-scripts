import addStyle from '../common/addStyle'
import regex from '../common/regex'
import { $ } from '../libs/bliss'

import tagsCSS from './styles/tags.css'

export default (function () {
  const ENABLE_ON_PATH = '/forum/viewtopic.php'

  const TAGS_REGEX = /\[([^[]*)\]/g
  const TAGS_SEPARATOR_REGEX = /(?:,\s?|;)/
  const TAGS_GROUP_SEPARATOR = ' | '

  function extractTagGroups (title) {
    return regex.getAllMatchGroups(TAGS_REGEX, title)
      .map((tagsString) => tagsString.split(TAGS_SEPARATOR_REGEX))
  }

  function createTagLinks (tags) {
    return tags
      .filter((tag) => tag.length)
      .map((tag) => {
        return $.create('a', {
          className: 'tags-row-tag',
          textContent: tag,
          href: `/forum/tracker.php?nm=${tag}`,
          target: '_blank'
        })
      })
  }

  function createPostTags ({ removeFromTitle = true } = {}) {
    const titleElement = $('.maintitle')
    const titleLink = titleElement.children[0]
    const title = titleLink.textContent

    const tagGroups = extractTagGroups(title)

    if (!tagGroups.length) { return }

    addStyle(tagsCSS)

    // Remove tags from title
    if (removeFromTitle) {
      $.set(titleLink, {
        textContent: title.replace(TAGS_REGEX, '').trim(),
        title: title
      })
    }

    // Add tags links
    const tags = tagGroups.reduce((tags, tagsGroup, index) => {
      tags.push(...createTagLinks(tagsGroup))

      if (index + 1 !== tagGroups.length) {
        tags.push(TAGS_GROUP_SEPARATOR)
      }

      return tags
    }, [])

    const row = $.create('div', {
      className: 'tags-row',
      contents: tags
    })

    $.after(row, titleElement)
  }

  return function () {
    $.ready()
      .then(() => {
        if (location.pathname !== ENABLE_ON_PATH) { return }
        createPostTags()
      })
  }
})()
