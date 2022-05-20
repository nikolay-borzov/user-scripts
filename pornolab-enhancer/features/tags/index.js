import { addStyle } from '../../../common/api.js'
import { regExp } from '../../../common/reg-exp.js'
import { $ } from '../../../libs/bliss.js'

import tagsCSS from './styles.css'

const TOPIC_PATH = '/forum/viewtopic.php'

/** Separates tags from title. */
const TITLE_REGEX = /(?:\[([^[\]]+)]+)?([^[]*)?/g
const TAGS_SEPARATOR_REGEX = /,\s?|;|•|\/|\+/
const TAGS_GROUP_SEPARATOR = ' | '

const DIMENSIONS = [
  '240p',
  '360p',
  '480p',
  '540p',
  '544p',
  '576p',
  '640p',
  '720p',
  '1080p',
  '1080i',
  '1440p',
  '2160p',
]
const DIMENSION_ICON_NAME = 'dimension'

/** @type {Record<string, string>} */
const TAG_ICON_MAP = {
  eng: 'en',
  jap: 'ja',
  rus: 'ru',
  ru: 'ru',
  chi: 'zh',
  cn: 'zh',
  spa: 'es',
  es: 'es',
  por: 'pt',
  ger: 'de',
  de: 'de',
  fr: 'fr',
  korean: 'ko',
  cen: 'cen',
  uncen: 'uncen',
  ptcen: 'ptcen',
  inprogress: 'in-progress',
}

for (const dimensions of DIMENSIONS) {
  TAG_ICON_MAP[dimensions] = DIMENSION_ICON_NAME
}

export async function initTags() {
  await $.ready()

  if (location.pathname === TOPIC_PATH) {
    createPostTags()
  }
}

/**
 * Extracts tags from title for  topic post page.
 */
function createPostTags() {
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
    title,
  })

  if (hasTagBefore) {
    $.before(createTagsRow(titleParts.tagGroupsBefore), titleElement)
  }

  if (hasTagsAfter) {
    $.after(createTagsRow(titleParts.tagGroupsAfter), titleElement)
  }
}

/**
 * @typedef {object} TokenizedTitle
 * @property {string[][]} tagGroupsBefore
 * @property {string} title
 * @property {string[][]} tagGroupsAfter
 */

/**
 * Extracts tags and title from title string.
 *
 * @param {string} titleRaw
 * @returns {TokenizedTitle}
 */
function tokenizeTitle(titleRaw) {
  /** @type {string[][]} */
  const tagGroupsBefore = []
  const titleParts = []
  /** @type {string[][]} */
  const tagGroupsAfter = []

  for (const groups of regExp.getMatchGroups(TITLE_REGEX, titleRaw)) {
    /** @type {string[]} */
    let tags = []

    // First group - tags
    if (groups[0]) {
      tags = groups[0].split(TAGS_SEPARATOR_REGEX)
    }

    if (tags.length > 0) {
      ;(titleParts.length > 0 ? tagGroupsAfter : tagGroupsBefore).push(tags)
    }

    // Second group - title part
    if (groups[1]) {
      titleParts.push(groups[1])
    }
  }

  return {
    tagGroupsBefore,
    title: titleParts.join('').trim(),
    tagGroupsAfter,
  }
}

/**
 * @param {string[][]} tagGroups
 * @returns {HTMLDivElement}
 */
function createTagsRow(tagGroups) {
  const tags = tagGroups.reduce(
    (
      /** @type  {Array<HTMLAnchorElement | string>}   */ result,
      tagsGroup,
      index
    ) => {
      result.push(...createTagLinks(tagsGroup))

      if (index + 1 !== tagGroups.length) {
        result.push(TAGS_GROUP_SEPARATOR)
      }

      return result
    },
    []
  )

  return $.create('div', {
    className: 'tags-row',
    contents: tags,
  })
}

/**
 * @param {string[]} tags
 * @returns {HTMLAnchorElement[]} Tag links.
 */
function createTagLinks(tags) {
  return tags
    .filter((tag) => tag.length)
    .map((tag) => {
      let className = 'tags-row-tag'

      tag = tag.trim()

      const tagkey = tag.toLowerCase()

      if (Object.hasOwn(TAG_ICON_MAP, tagkey)) {
        className = `${className} tag-with-icon icon-${TAG_ICON_MAP[tagkey]}`
      }

      return $.create('a', {
        className,
        textContent: tag,
        href: `/forum/tracker.php?nm=${tag}`,
        target: '_blank',
      })
    })
}
