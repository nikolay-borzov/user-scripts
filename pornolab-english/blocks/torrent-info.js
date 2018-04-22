import TOKENS from '../core/tokenTypes'

export default {
  '.dl_list': {
    '.catTitle': 'Torrent Info',
    '.pad_8': {
      [TOKENS.textNodeIndexMap]: {
        0: { Размер: 'Size' },
        1: { Зарегистрирован: 'Uploaded' },
        2: { '.torrent скачан': 'Downloaded' }
      },
      [TOKENS.dateTime]: 'b:nth-child(2)',
      'b:nth-child(3)': {
        [TOKENS.replaceMap]: {
          раза: 'times',
          раз: 'times'
        }
      }
    },
    '.row5': {
      '.seed': {
        [TOKENS.textNodeIndexMap]: {
          0: { Сиды: 'Seeders' }
        }
      },
      '.leech': {
        [TOKENS.textNodeIndexMap]: {
          0: { Личи: 'Leechers' }
        }
      },
      '.gen': 'Peers statistics'
    },
    '.row3': {
      '.med:nth-child(2)': 'Add to "Future Downloads"',
      '.med:nth-child(3)': 'Remove from the downloads list'
    },
    '#full_details': {
      '.floatL b': {
        [TOKENS.replaceMap]: {
          Сиды: 'Seeders',
          Личи: 'Leechers'
        }
      },
      '.tCenter': {
        [TOKENS.textNodeIndexMap]: {
          0: { 'показаны данные': 'data is' }
        },
        'i b': 'for current session only'
      }
    }
  }
}
