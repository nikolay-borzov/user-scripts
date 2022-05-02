import { TOKENS } from '../core/token-types'

const activePager = {
  '.menu-root': 'Pages',
  '.menu-root + a': 'Previous',
  'a:last': {
    [TOKENS.replaceMap]: { 'След.': 'Next' },
  },
}

export const pager = {
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
