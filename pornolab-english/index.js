import { translate } from './core/translate'
import { main } from './pages/main'
import { privateMessages } from './pages/private-messages'
import { profile } from './pages/profile'
import { search } from './pages/search'
import { topic } from './pages/topic'
import { tracker } from './pages/tracker'

const pages = [main, topic, tracker, search, privateMessages, profile]

const pageMath = pages.find((page) => page.path === location.pathname)

if (pageMath) {
  for (const map of pageMath.maps) {
    for (const [token, value] of Object.entries(map)) translate(token, value)
  }
} else {
  console.warn(`${location.pathname} is not translated yet`)
}
