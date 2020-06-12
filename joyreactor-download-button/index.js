import { addStyle } from '../common/api'
import dom from '../common/dom'
import css from './styles.css'

addStyle(css)

const CLASSES = {
  processed: 'js-has-download-button',
}

function createDownloadLink(imgContainer) {
  // Mark as processed
  imgContainer.classList.add(CLASSES.processed)

  const gifLink = imgContainer.querySelector('a.video_gif_source')
  // Image is an animated gif
  if (gifLink) {
    // Make it downloadable
    gifLink.setAttribute('download', '')
    return
  }

  let imgURL = ''
  const imgLink = imgContainer.querySelector('a')

  // Image has a full link
  if (imgLink) {
    imgURL = imgLink.href
  } else {
    const img = imgContainer.querySelector('img')
    if (img) {
      imgURL = img.src
    }
  }

  if (!imgURL) {
    return
  }

  const link = document.createElement('a')
  link.classList.add('download-link')
  link.setAttribute('href', imgURL)
  link.setAttribute('download', '')

  imgContainer.appendChild(link)
}

dom.on(
  document.body,
  'mouseover',
  `.image:not(.${CLASSES.processed})`,
  createDownloadLink
)
