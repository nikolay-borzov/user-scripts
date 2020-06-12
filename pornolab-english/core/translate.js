import TOKENS from '../core/tokenTypes'

const dateTimeMap = {
  день: 'day',
  дня: 'days',
  дней: 'days',
  часа: 'hours',
  часов: 'hours',
  час: 'hour',
  минутa: 'minute',
  минуты: 'minutes',
  минут: 'minutes',
  месяца: 'months',
  месяцев: 'months',
  года: 'years',
  год: 'year',
  лет: 'years',
  назад: 'ago',
}

function forEach($elements, callback) {
  $elements.each((index, el) => callback($(el)))
}

function replaceTextNodes($container, indexMap) {
  const nodes = Array.from($container[0].childNodes).filter(
    (n) => n.nodeType === 3 && n.data.trim().length
  )
  // Replace text node(s) at index
  Object.entries(indexMap).forEach(([index, translation]) => {
    const node = nodes[index]
    if (node) {
      if (typeof translation === 'object') {
        node.data = replaceTextByMap(node.data, translation)
      } else {
        node.data = translation
      }
    }
  })
}

function replaceText($container, map) {
  // Only nodes with textNode children
  if ($container.children().length !== 0) {
    return
  }

  const result = replaceTextByMap($container.text(), map)

  $container.text(result)
}

function replaceTextByMap(text, map) {
  return Object.entries(map).reduce((result, [from, to]) => {
    return result.replace(from, to)
  }, text)
}

const SUB_FORUM_SEPARATOR = ' / '
function replaceSubForum(selector) {
  $(selector).each((index, node) => {
    const text = node.textContent
    if (text.includes(SUB_FORUM_SEPARATOR)) {
      node.textContent = text.split(SUB_FORUM_SEPARATOR)[1]
    }
  })
}

function replaceDateTime(selector) {
  $(selector).each((index, node) => {
    node.textContent = replaceTextByMap(node.textContent, dateTimeMap)
  })
}

export function translate(token, value, $container) {
  switch (token) {
    case TOKENS.value:
      $container.val(value)
      break

    case TOKENS.placeholder:
      $container.attr('placeholder', value)
      break

    case TOKENS.title:
      $container.attr('title', value)
      break

    case TOKENS.textNodeIndexMap:
      replaceTextNodes($container, value)
      break

    case TOKENS.replaceMap:
      replaceText($container, value)
      break

    case TOKENS.replaceSubForum:
      replaceSubForum(value)
      break

    case TOKENS.dateTime:
      replaceDateTime(value)
      break

    case TOKENS.function:
      value($container)
      break

    default:
      if ($.isPlainObject(value)) {
        $container = $container ? $(token, $container) : $(token)
        if (!$container.length) return
        Object.entries(value).forEach(([token, value]) => {
          forEach($container, ($el) => translate(token, value, $el))
          // translate(token, value, $container)
        })
      } else {
        const $element = $(token, $container)
        if ($element.length) $element.html(value)
      }
      break
  }
}
