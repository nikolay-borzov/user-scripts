import { translate } from './core/translate.js'
import { main } from './pages/main.js'
import { privateMessages } from './pages/private-messages.js'
import { profile } from './pages/profile.js'
import { search } from './pages/search.js'
import { topic } from './pages/topic.js'
import { tracker } from './pages/tracker.js'

const pages = [main, topic, tracker, search, privateMessages, profile]

const pageMath = pages.find((page) => page.path === location.pathname)

if (pageMath) {
  for (const map of pageMath.maps) {
    for (const [token, value] of Object.entries(map)) translate(token, value)
  }
} else {
  console.warn(`${location.pathname} is not translated yet`)
}
