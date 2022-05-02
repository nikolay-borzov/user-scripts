import { breadcrumb } from '../blocks/breadcrumb'
import { pageHeader } from '../blocks/page-header'
import { pager } from '../blocks/pager'
import { torrentInfo } from '../blocks/torrent-info'
import { TOKENS } from '../core/token-types'

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

/* const topic = {
  '#topic_main': {},
} */

export const topic = {
  path: '/forum/viewtopic.php',
  maps: [pageHeader, pager, breadcrumb, torrentInfo, topicHeader],
}
