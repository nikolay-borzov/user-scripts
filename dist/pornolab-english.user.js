// ==UserScript==
// @name         Pornolab English
// @description  Translates basic content in English
// @namespace    https://github.com/nikolay-borzov
// @version      0.1.0
// @author       nikolay-borzov
// @license      MIT
// @icon         http://static.pornolab.net/favicon.ico
// @homepageURL  https://github.com/nikolay-borzov/user-scripts
// @homepage     https://github.com/nikolay-borzov/user-scripts
// @supportURL   https://github.com/nikolay-borzov/user-scripts/issues
// @include      *//pornolab.*
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  const TOKENS = {
    placeholder: 'placeholder',
    value: 'value',
    function: 'function',
    title: 'title',
    textNodeIndexMap: 'textNodeIndexMap',
    replaceMap: 'replaceMap',
    replaceSubForum: 'replaceSubForum',
    dateTime: 'dateTime',
  }

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
    $elements.each((index, element) => callback($(element)))
  }

  function replaceTextNodes($container, indexMap) {
    const nodes = [...$container[0].childNodes].filter(
      (n) => n.nodeType === 3 && n.data.trim().length > 0
    )

    for (const [index, translation] of Object.entries(indexMap)) {
      const node = nodes[index]

      if (node) {
        node.data =
          typeof translation === 'object'
            ? replaceTextByMap(node.data, translation)
            : translation
      }
    }
  }

  function replaceText($container, map) {
    if ($container.children().length > 0) {
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

  function translate(token, value, $container) {
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

          if ($container.length === 0) return

          for (const [token, entryValue] of Object.entries(value)) {
            forEach($container, ($element) =>
              translate(token, entryValue, $element)
            )
          }
        } else {
          const $element = $(token, $container)

          if ($element.length > 0) $element.html(value)
        }
        break
    }
  }

  const pageHeader = {
    '#main-nav': {
      'a[href="./index.php"] b': 'Main page',
      'a[href="tracker.php"] b': 'Tracker',
      'a[href="search.php"] b': 'Search',
      'a[href="viewtopic.php?t=980423"] b': 'Rules',
      'a[href="privmsg.php?folder=inbox"] b': 'Inbox',
      'a[href="groupcp.php"] b': 'Groups',
    },
    '#quick-search': {
      [TOKENS.textNodeIndexMap]: { 0: 'search ' },
    },
    '#search-text': {
      [TOKENS.value]: 'search...',
    },
    '#search-action': {
      'option[value="tracker.php"]': '&nbsp;on tracker&nbsp;',
      'option[value="search.php"]': '&nbsp;on forum&nbsp;',
      'option[value^="search.php?f="]': '&nbsp;on sub-forum&nbsp;',
      'option[value="cse"]': '&nbsp;on Google&nbsp;',
    },
    '.topmenu': {
      'td:first': {
        [TOKENS.textNodeIndexMap]: {
          0: { 'Вы зашли как': 'Logged as' },
        },
      },
      '[onclick*="{logout: 1}"]': 'Log out',
      'a[href="privmsg.php?folder=inbox"]': {
        [TOKENS.replaceMap]: {
          'Личные сообщения': 'Private messages',
          'новых нет': 'none',
          'есть новые': 'new',
        },
      },
      'a[href="profile.php?mode=editprofile"]': 'Settings',
      'td:nth-child(3)': {
        'a[href^="./profile.php?mode=viewprofile"]': 'Rating/Downloads',
        'a[href^="search.php?uid="]': 'My messages',
      },
      'a[href="profile.php?mode=register"] b': 'Registration',
      'form[action="/forum/login.php"]': {
        [TOKENS.textNodeIndexMap]: { 0: ' Name: ', 1: ' Password: ' },
        '[name="login"]': {
          [TOKENS.value]: 'Login',
        },
      },
      '[href="profile.php?mode=sendpassword"]': 'Forgot password?',
    },
    '#ses-short': {
      [TOKENS.title]:
        'Short session (Auto logout after 30 minutes of inactivity)',
      [TOKENS.textNodeIndexMap]: { 0: 'Do not remember' },
    },
    '#dls-menu': {
      'a[href^="tracker.php?rid="]': 'Seeding torrents',
      'a[href^="./profile.php?mode=viewprofile&u="]': 'Leeching torrents',
      'a[href$="dlc=1"]': 'Past torrents',
      'a[href$="dlw=1"]': 'Future torrents',
    },
    [TOKENS.replaceSubForum]: '#tr-menu a',
  }

  const main = {
    path: '/forum/index.php',
    maps: [pageHeader],
  }

  const privateMessages = {
    path: '/forum/privmsg.php',
    maps: [pageHeader],
  }

  const breadcrumb = {
    '.nav:first': {
      'a:first': 'Forums index',
    },
    [TOKENS.replaceSubForum]: '.nav a',
  }

  const profile = {
    path: '/forum/profile.php',
    maps: [pageHeader, breadcrumb],
  }

  const activePager = {
    '.menu-root': 'Pages',
    '.menu-root + a': 'Previous',
    'a:last': {
      [TOKENS.replaceMap]: { 'След.': 'Next' },
    },
  }

  const pager = {
    '#main_content_wrap': {
      'table:first p.small:first > b': $.extend(
        {
          [TOKENS.replaceMap]: { Страницы: 'Pages' },
        },
        activePager
      ),
    },
    '#pagination, .bottom_info': {
      'p:first': {
        [TOKENS.textNodeIndexMap]: {
          0: 'Pages ',
          1: ' of ',
        },
      },
      'p:last': activePager,
    },
    '#pg-jump': {
      'th:first': 'To page...',
      'input[type="submit"]': {
        [TOKENS.value]: 'Go',
      },
    },
  }

  const search = {
    path: '/forum/search.php',
    maps: [pageHeader, pager],
  }

  const torrentInfo = {
    '.dl_list': {
      '.catTitle': 'Torrent Info',
      '.pad_8': {
        [TOKENS.textNodeIndexMap]: {
          0: { Размер: 'Size' },
          1: { Зарегистрирован: 'Uploaded' },
          2: { '.torrent скачан': 'Downloaded' },
        },
        [TOKENS.dateTime]: 'b:nth-child(2)',
        'b:nth-child(3)': {
          [TOKENS.replaceMap]: {
            раза: 'times',
            раз: 'times',
          },
        },
      },
      '.row5': {
        '.seed': {
          [TOKENS.textNodeIndexMap]: {
            0: { Сиды: 'Seeders' },
          },
        },
        '.leech': {
          [TOKENS.textNodeIndexMap]: {
            0: { Личи: 'Leechers' },
          },
        },
        '.gen': 'Peers statistics',
      },
      '.row3': {
        '.med:nth-child(2)': 'Add to "Future Downloads"',
        '.med:nth-child(3)': 'Remove from the downloads list',
      },
      '#full_details': {
        '.floatL b': {
          [TOKENS.replaceMap]: {
            Сиды: 'Seeders',
            Личи: 'Leechers',
          },
        },
        '.tCenter': {
          [TOKENS.textNodeIndexMap]: {
            0: { 'показаны данные': 'data is' },
          },
          'i b': 'for current session only',
        },
      },
    },
  }

  const topicHeader = {
    '.w100.border.bw_TRL': {
      'a.small:first': 'My messages',
      '[onclick*="add_ut"]': 'add',
      '[onclick*="del_ut"]': 'delete',
      '.menu-root': 'View options',
    },
    '#topic-options': {
      th: 'View options',
      '#show-only': {
        legend: 'Hide',
        label: {
          [TOKENS.textNodeIndexMap]: {
            0: {
              флаги: 'flags',
              аватары: 'avatars',
              'картинки званий': 'badges',
              'картинки в сообщениях': 'images in messages',
              смайлики: 'smiles',
              подписи: 'signatures',
            },
          },
        },
      },
      '#spoiler-opt': {
        legend: 'Show',
        label: {
          [TOKENS.textNodeIndexMap]: {
            0: {
              'спойлер открытым': 'spolires opened',
              'загружаемые картинки': 'downloadable images',
            },
          },
        },
      },
      '[type="button"]': {
        [TOKENS.value]: 'Send',
      },
    },
  }

  const topic = {
    path: '/forum/viewtopic.php',
    maps: [pageHeader, pager, breadcrumb, torrentInfo, topicHeader],
  }

  const tracker = {
    path: '/forum/tracker.php',
    maps: [pageHeader, pager],
  }

  const pages = [main, topic, tracker, search, privateMessages, profile]

  const pageMath = pages.find((page) => page.path === location.pathname)

  if (pageMath) {
    for (const map of pageMath.maps) {
      for (const [token, value] of Object.entries(map)) translate(token, value)
    }
  } else {
    console.warn(`${location.pathname} is not translated yet`)
  }
})()
