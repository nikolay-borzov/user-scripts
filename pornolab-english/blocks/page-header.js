import { TOKENS } from '../core/token-types.js'

export const pageHeader = {
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
