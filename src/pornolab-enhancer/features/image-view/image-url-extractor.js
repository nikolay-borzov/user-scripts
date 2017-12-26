import request from 'request'
import regex from 'regex'
import { $ } from 'bliss'

export default (function () {
  function getExtractor (pageUrl) {
    return extractors.find((ext) => ext.linkRegEx.test(pageUrl))
  }

  async function getPageHtml (pageUrl) {
    let response = await request(pageUrl)

    return response.responseText
  }

  async function getUrlFromPage (extractor, link) {
    const html = await getPageHtml(link.href)

    return regex.getFirstMatchGroup(extractor.imageUrlRegEx, html)
  }

  function getThumbnailUrl (link) {
    return $('img.postImg', link).src
  }

  const extractors = [
    {
      name: 'FastPic',
      allowed: true,
      linkSelector: '[href^="http://fastpic.ru/view/"]',
      linkRegEx: new RegExp('^http://fastpic.ru/view/'),
      extensionRegEx: /\.([^.]+)\.html$/,

      async getUrl (extractor, link) {
        const extension = regex.getFirstMatchGroup(extractor.extensionRegEx, link.href)
        const thumbUrl = getThumbnailUrl(link)

        return thumbUrl
          .replace('thumb', 'big')
          .replace('jpeg', extension)
      }
    },

    {
      name: 'ImageVenue',
      allowed: true,
      linkSelector: '[href*=".imagevenue.com/img.php"]',
      linkRegEx: new RegExp('imagevenue.com/img.php'),
      imageUrlRegEx: /id="thepic".*src="([^"]*)"/i,

      async getUrl (extractor, link) {
        const imageUrl = await getUrlFromPage(extractor, link)
        const pageUrl = link.href

        const url = new URL(pageUrl)
        url.search = ''
        url.pathname = imageUrl

        return url.href
      }
    },

    {
      name: 'TurboImageHost',
      allowed: true,
      linkSelector: '[href^="https://www.turboimagehost.com/p"]',
      linkRegEx: new RegExp('^https://www.turboimagehost.com/p'),
      imageUrlRegEx: /property="og:image" content="([^"]*)"/,
      getUrl: getUrlFromPage
    },

    // not allowed below

    {
      name: 'ImageBam',
      linkSelector: '[href^="http://www.imagebam.com/image"]',
      linkRegEx: new RegExp('^http://www.imagebam.com/image'),
      imageUrlRegEx: /property="og:image" content="([^"]*)"/,
      getUrl: getUrlFromPage
    },

    {
      name: 'ImageTwist',
      linkSelector: '[href^="http://imagetwist.com"]',
      linkRegEx: new RegExp('^http://imagetwist.com'),

      async getUrl (extractor, link) {
        const imageName = link.href.split('/').pop()
        const extension = imageName.split('.').pop()
        const imageUrl = getThumbnailUrl(link)
          .replace('/th/', '/i/')
          .slice(0, -extension.length)

        return `${imageUrl}${extension}/${imageName}`
      }
    },

    {
      name: 'PicShick',
      linkSelector: '[href^="http://picshick.com"]',
      linkRegEx: new RegExp('^http://picshick.com'),

      async getUrl (extractor, link) {
        const imageName = link.href.split('/').pop()
        const imageUrl = getThumbnailUrl(link)
          .replace('/th/', '/i/')
          .replace('picshick', 'imagetwist')

        return `${imageUrl}/${imageName}`
      }
    },

    {
      name: 'imgbum',
      linkSelector: '[href^="http://imgbum.net"]',
      linkRegEx: new RegExp('^http://imgbum.net'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link).replace('-thumb', '')
      }
    },

    {
      name: 'PicForAll',
      linkSelector: '[href^="http://picforall.ru"]',
      linkRegEx: new RegExp('^http://picforall.ru'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link)
          .replace('picforall', 'p0xpicmoney')
          .replace('-thumb', '')
      }
    },

    {
      name: 'picage',
      linkSelector: '[href^="http://picage.ru"]',
      linkRegEx: new RegExp('^http://picage.ru'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link)
          .replace('picage', 'pic4you')
          .replace('-thumb', '')
      }
    },

    {
      name: 'PixSense',
      linkSelector: '[href^="http://www.pixsense.net"]',
      linkRegEx: new RegExp('^http://www.pixsense.net'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link)
          .replace('small-', '')
          .replace('/small/', '/big/')
      }
    }
  ]

  return {
    getImageUrl (link) {
      const extractor = getExtractor(link.href)

      return extractor.getUrl(extractor, link)
    },

    getLinksSelector () {
      return extractors
        .map((e) => `a${e.linkSelector}.postLink`)
        .join(',')
    }
  }
})()
