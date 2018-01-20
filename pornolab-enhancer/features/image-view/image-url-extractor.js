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
    // link:      http://fastpic.ru/view/90/2017/0206/1f4072e748ac53657de2056ef8498adb.png.html
    // thumbnail: http://i90.fastpic.ru/thumb/2017/0206/db/1f4072e748ac53657de2056ef8498adb.jpeg
    // image:     http://i90.fastpic.ru/big/2017/0206/db/1f4072e748ac53657de2056ef8498adb.png?noht=1
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
          .replace('jpeg', extension) + '?noht=1'
      }
    },
    // For case when direct link si already provided
    {
      name: 'FastPic',
      allowed: true,
      linkSelector: '[href*="fastpic.ru/big"]',
      linkRegEx: new RegExp('fastpic.ru/big'),

      async getUrl (extractor, link) {
        return link.href + '?noht=1'
      }
    },

    // link:      http://img45.imagevenue.com/img.php?image=10934_bscap0004_122_1068lo.jpg
    // thumbnail: http://img45.imagevenue.com/loc1068/th_10934_bscap0004_122_1068lo.jpg
    // image:     http://img45.imagevenue.com/aAfkjfp01fo1i-3071/loc1068/10934_bscap0004_122_1068lo.jpg
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

    // link:      https://www.turboimagehost.com/p/36160085/1.jpg.html
    // thumbnail: https://s7d8.turboimg.net/t1/36160085_1.jpg
    // image:     https://s7d8.turboimg.net/sp/a5ce6305fca205a76c6b23a7f33262ec/1.jpg
    {
      name: 'TurboImageHost',
      allowed: true,
      linkSelector: '[href^="https://www.turboimagehost.com/p"]',
      linkRegEx: new RegExp('^https://www.turboimagehost.com/p'),
      imageUrlRegEx: /property="og:image" content="([^"]*)"/,
      getUrl: getUrlFromPage
    },

    // not allowed below

    // link:      http://www.imagebam.com/image/4a9c52356295333
    // thumbnail: http://thumbnails112.imagebam.com/35630/4a9c52356295333.jpg
    // image:     http://112.imagebam.com/download/FllgT6YgLpm0PUEDQ9ISag/35630/356295333/%20%282%29.jpg
    {
      name: 'ImageBam',
      linkSelector: '[href^="http://www.imagebam.com/image"]',
      linkRegEx: new RegExp('^http://www.imagebam.com/image'),
      imageUrlRegEx: /property="og:image" content="([^"]*)"/,
      getUrl: getUrlFromPage
    },

    // link:      http://imagetwist.com/awxdf3ez7gdg/cc_Barbara_Zatler__pbsi_PM200909__04XL.jpg.html
    // thumbnail: http://img8.imagetwist.com/th/01318/awxdf3ez7gdg.jpg
    // image:     http://img8.imagetwist.com/i/01318/awxdf3ez7gdg.jpg/cc_Barbara_Zatler__pbsi_PM200909__04XL.jpg
    {
      name: 'ImageTwist',
      linkSelector: '[href^="http://imagetwist.com"]',
      linkRegEx: new RegExp('^http://imagetwist.com'),

      async getUrl (extractor, link) {
        const imageName = link.href.split('/').pop()
          .replace('.html', '')
        const extension = imageName.split('.').pop()
        const imageUrl = getThumbnailUrl(link)
          .replace('/th/', '/i/')
          .slice(0, -extension.length)

        return `${imageUrl}${extension}/${imageName}`
      }
    },
    // Remove ?
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
    // Remove ?
    {
      name: 'imgbum',
      linkSelector: '[href^="http://imgbum.net"]',
      linkRegEx: new RegExp('^http://imgbum.net'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link).replace('-thumb', '')
      }
    },

    // link:      http://picforall.ru/348/206637/
    // thumbnail: http://picforall.ru/allimage/10/206637-thumb.jpeg
    // image:     http://p0xpicmoney.ru/allimage/10/206637.jpeg
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

    // link:      http://picage.ru/10887/5456787/
    // thumbnail: http://s4.picage.ru/y2016/01-24/10887/5456787-thumb.jpeg
    // image:     http://s4.pic4you.ru/y2016/01-24/10887/5456787.jpeg
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
    // Remove ?
    {
      name: 'PixSense',
      linkSelector: '[href^="http://www.pixsense.net"]',
      linkRegEx: new RegExp('^http://www.pixsense.net'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link)
          .replace('small-', '')
          .replace('/small/', '/big/')
      }
    },
    // Remove ?
    {
      name: 'nikapic.ru',
      linkSelector: '[href^="http://nikapic.ru"]',
      linkRegEx: new RegExp('^http://nikapic.ru'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link)
          .replace('/small/', '/big/')
      }
    },
    // Remove ?
    {
      name: 'imgtaxi.com',
      linkSelector: '[href^="https://imgtaxi.com"]',
      linkRegEx: new RegExp('^https://imgtaxi.com'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link)
          .replace('/small/', '/big/')
      }
    },

    // link:      http://imgbox.com/Hn0YZvqQ
    // thumbnail: http://t.imgbox.com/Hn0YZvqQ.jpg
    // image:     https://images3.imgbox.com/56/b6/Hn0YZvqQ_o.jpg
    {
      name: 'imgbox.com',
      linkSelector: '[href^="http://imgbox.com"]',
      linkRegEx: new RegExp('^http://imgbox.com'),
      imageUrlRegEx: /href="([^"]*)".*icon-cloud-download/,
      getUrl: getUrlFromPage
    },

    // link:      http://payforpic.ru/49/253590/
    // thumbnail: http://payforpic.ru/allimage/3/253590-thumb.jpeg
    // image:     http://picker-click.ru/allimage/3/253590.jpeg
    {
      name: 'payforpic.ru',
      linkSelector: '[href^="http://payforpic.ru"]',
      linkRegEx: new RegExp('^http://payforpic.ru'),

      async getUrl (extractor, link) {
        return getThumbnailUrl(link)
          .replace('payforpic', 'picker-click')
          .replace('-thumb', '')
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
