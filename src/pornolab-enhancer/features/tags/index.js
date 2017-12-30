import addStyle from 'addStyle'
import regex from 'regex'
import { $ } from 'bliss'

import tagsCSS from './styles.css'

export default (function () {
  const TOPIC_PATH = '/forum/viewtopic.php'

  // Separates tags from title
  const TITLE_REGEX = /(?:\[([^[\]]+)\]+)?([^[]*)?/g
  const TAGS_SEPARATOR_REGEX = /(?:,\s?|;|\/|\+)/
  const TAGS_GROUP_SEPARATOR = ' | '

  const DIMENSIONS = [
    '240p',
    '360p',
    '480p',
    '540p',
    '576p',
    '640p',
    '720p',
    '1080p',
    '1080i',
    '1440p',
    '2160p'
  ]
  const DIMENSION_ICON_NAME = 'dimension'

  const TAG_ICON_MAP = {
    'eng': 'en',
    'jap': 'ja',
    'rus': 'ru',
    'chi': 'zh',
    'cn': 'zh',
    'spa': 'es',
    'por': 'pt',
    'ger': 'de',
    'fr': 'fr',
    'korean': 'ko',
    'cen': 'cen',
    'uncen': 'uncen',
    'ptcen': 'ptcen',
    'inprogress': 'in-progress'
  }

  DIMENSIONS.forEach((dim) => {
    TAG_ICON_MAP[dim] = DIMENSION_ICON_NAME
  })

  /**
   * Extracts tags and title from title string
   * @param {string} titleRaw
   */
  function tokenizeTitle (titleRaw) {
    let tagGroupsBefore = []
    let titleParts = []
    let tagGroupsAfter = []

    regex.getMatchGroups(TITLE_REGEX, titleRaw)
      .forEach((groups) => {
        let tags = []

        // First group - tags
        if (groups[0]) {
          tags = groups[0].split(TAGS_SEPARATOR_REGEX)
        }

        if (tags.length) {
          (titleParts.length ? tagGroupsAfter : tagGroupsBefore).push(tags)
        }

        // Second group - title part
        if (groups[1]) {
          titleParts.push(groups[1])
        }
      })

    return {
      tagGroupsBefore,
      title: titleParts.join('').trim(),
      tagGroupsAfter
    }
  }

  /**
   * @param {Array<Array<string>>} tagGroups
   */
  function createTagsRow (tagGroups) {
    const tags = tagGroups.reduce((tags, tagsGroup, index) => {
      tags.push(...createTagLinks(tagsGroup))

      if (index + 1 !== tagGroups.length) {
        tags.push(TAGS_GROUP_SEPARATOR)
      }

      return tags
    }, [])

    return $.create('div', {
      className: 'tags-row',
      contents: tags
    })
  }

  /**
   * @param {Array<string>} tags
   */
  function createTagLinks (tags) {
    return tags
      .filter((tag) => tag.length)
      .map((tag) => {
        let className = 'tags-row-tag'
        tag = tag.trim()

        const tagkey = tag.toLowerCase()
        if (TAG_ICON_MAP.hasOwnProperty(tagkey)) {
          className = `${className} tag-with-icon icon-${TAG_ICON_MAP[tagkey]}`
        }

        return $.create('a', {
          className,
          textContent: tag,
          href: `/forum/tracker.php?nm=${tag}`,
          target: '_blank'
        })
      })
  }

  /**
   * Extracts tags from title for  topic post page
   */
  function createPostTags () {
    const titleElement = $('.maintitle')
    const titleLink = titleElement.children[0]
    const title = titleLink.textContent

    const titleParts = tokenizeTitle(title)
    const hasTagBefore = titleParts.tagGroupsBefore.length > 0
    const hasTagsAfter = titleParts.tagGroupsAfter.length > 0

    if (!hasTagBefore && !hasTagsAfter) {
      return
    }

    addStyle(tagsCSS)

    // Remove tags from title
    $.set(titleLink, {
      textContent: titleParts.title,
      title: title
    })

    if (hasTagBefore) {
      $.before(createTagsRow(titleParts.tagGroupsBefore), titleElement)
    }

    if (hasTagsAfter) {
      $.after(createTagsRow(titleParts.tagGroupsAfter), titleElement)
    }
  }

  return function () {
    $.ready()
      .then(() => {
        if (location.pathname === TOPIC_PATH) {
          createPostTags()
        }
      })
  }
})()
