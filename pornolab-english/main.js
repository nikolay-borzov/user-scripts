import { translate } from './core/translate'
import main from './pages/main'
import topic from './pages/topic'
import tracker from './pages/tracker'
import search from './pages/search'
import privateMessages from './pages/private-messages'
import profile from './pages/profile'

const pages = [main, topic, tracker, search, privateMessages, profile]

const pageMath = pages.find(page => page.path === location.pathname)

if (pageMath) {
  pageMath.maps.forEach(map => {
    Object.entries(map).forEach(([token, value]) => translate(token, value))
  })
} else {
  console.warn(`${location.pathname} is not translated yet`)
}
