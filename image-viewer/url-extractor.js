import request from 'request'
import regex from 'regex'

export default (function() {
  async function getPageHtml(pageUrl) {
    let response = await request(pageUrl)

    return response.responseText
  }

  async function getUrlFromPage(link, extractor) {
    const html = await getPageHtml(link.url)

    return regex.getFirstMatchGroup(extractor.imageUrlRegEx, html)
  }

  function sortCaseInsensitive(array, getValue) {
    // Sorting with map
    return array
      .map((value, index) => ({ index, value: getValue(value).toLowerCase() }))
      .sort((a, b) => {
        if (a.value > b.value) {
          return 1
        }
        if (a.value < b.value) {
          return -1
        }
        return 0
      })
      .map(m => array[m.index])
  }

  let extractorsActive = []

  const extractors = [
    /*
      link:       http://fastpic.ru/view/104/2018/0429/f1a539f2e9edd3e0d70cac3dcf316466.jpg.html
      thumbnail:  http://i104.fastpic.ru/thumb/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpeg
      image:      https://i104.fastpic.ru/big/2018/0429/66/f1a539f2e9edd3e0d70cac3dcf316466.jpg
    */
    {
      name: 'FastPic',
      linkRegEx: new RegExp('^http.?://fastpic.ru/view'),

      async getUrl(link) {
        const extension = link.url.split('.').slice(-2)[0]

        return `${link.thumbnailUrl
          .replace('thumb', 'big')
          .replace('jpeg', extension)}?noht=1`
      }
    },
    // Direct link
    {
      name: 'FastPic (direct link)',
      linkRegEx: new RegExp('fastpic.ru/big'),

      async getUrl(link) {
        return `${link.url}?noht=1`
      }
    },

    /*
      link:       http://img192.imagevenue.com/img.php?image=978556715_horrorvillian_122_117lo.jpg
      thumbnail:  http://img192.imagevenue.com/loc117/th_978556715_horrorvillian_122_117lo.jpg
      image:      http://img192.imagevenue.com/aAfkjfp01fo1i-19032/loc117/978556715_horrorvillian_122_117lo.jpg
    */
    {
      name: 'ImageVenue.com',
      linkRegEx: new RegExp('imagevenue.com/img.php'),
      imageUrlRegEx: /id="thepic".*src="([^"]*)"/i,

      async getUrl(link, extractor) {
        const imageUrl = await getUrlFromPage(link, extractor)
        const pageUrl = link.url

        const url = new URL(pageUrl)
        url.search = ''
        url.pathname = imageUrl

        return url.href
      }
    },

    /*
      link:       https://www.turboimagehost.com/p/38487267/horrorvillian.jpg.html
      thumbnail:  https://s7d1.turboimg.net/t1/38487267_horrorvillian.jpg
      image:      https://s7d1.turboimg.net/sp/444009b30201bb2432d005ee9c0e648c/horrorvillian.jpg
    */
    {
      name: 'TurboImageHost',
      linkRegEx: new RegExp('^https://www.turboimagehost.com/p'),
      imageUrlRegEx: /property="og:image" content="([^"]*)"/,
      getUrl: getUrlFromPage
    },

    // TODO: Doesn't work anymore because imagebam block image request outside its domain
    {
      name: 'ImageBam',
      linkRegEx: new RegExp('^http://www.imagebam.com/image'),
      imageUrlRegEx: /property="og:image" content="([^"]*)"/,
      getUrl: getUrlFromPage
    },

    /*
      link:       http://imagetwist.com/ge417tzfzr6b/horrorvillian.jpg
      thumbnail:  http://img67.imagetwist.com/th/23132/ge417tzfzr6b.jpg
      image:      http://img67.imagetwist.com/i/23132/ge417tzfzr6b.jpg/horrorvillian.jpg
    */
    {
      name: 'ImageTwist',
      linkRegEx: new RegExp('^http://imagetwist.com'),

      async getUrl(link) {
        const imageName = link.url
          .split('/')
          .pop()
          .replace('.html', '')
        const extension = imageName.split('.').pop()
        const imageUrl = link.thumbnailUrl
          .replace('/th/', '/i/')
          .slice(0, -extension.length)

        return `${imageUrl}${extension}/${imageName}`
      }
    },

    /*
      ImageTwist based. Currently generates the same link as ImageTwist.
      Keep this rule for old links
    */
    {
      name: 'ImageTwist based',
      hosts: ['Picturelol.com', 'PicShick.com', 'Imageshimage.com'],
      linkRegEx: new RegExp('^https?://(picturelol|picshick|imageshimage).com'),
      hostReplaceRegEx: new RegExp('(picturelol|picshick|imageshimage)'),

      async getUrl(link, extractor) {
        const imageName = link.url.split('/').pop()
        const imageUrl = link.thumbnailUrl
          .replace('/th/', '/i/')
          .replace(extractor.hostReplaceRegEx, 'imagetwist')

        return `${imageUrl}/${imageName}`
      }
    },

    /*
      A lot of ads
      link:       http://imgbum.net/426/13242/
      thumbnail:  http://imgbum.net/allimage/4/13242-thumb.jpeg
      image:      http://imgbum.net/allimage/4/13242.jpeg
    */
    {
      name: 'imgbum.net',
      linkRegEx: new RegExp('^http://imgbum.net'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('-thumb', '')
      }
    },

    /*
      A lot of ads
      link:       http://freescreens.ru/1892/532639/
                         imgclick.ru
                         picclick.ru
                         payforpic.ru
                         picforall.ru
      thumbnail:  http://freescreens.ru/allimage/4/532639-thumb.jpeg
      image:      http://picpic.online/allimage/4/532639.jpeg
    */
    {
      name: 'PicForAll.ru',
      hosts: [
        'freescreens.ru',
        'imgclick.ru',
        'picclick.ru',
        'payforpic.ru',
        'picforall.ru'
      ],
      linkRegEx: new RegExp(
        '^http://(freescreens.ru|imgclick.ru|picclick.ru|payforpic.ru|picforall.ru)'
      ),
      hostReplaceRegEx: new RegExp(
        '(freescreens.ru|imgclick.ru|picclick.ru|payforpic.ru|picforall.ru)'
      ),

      async getUrl(link, extractor) {
        return link.thumbnailUrl
          .replace(
            extractor.hostReplaceRegEx,
            'picpic.online' /* or 'p0xpicmoney.ru' */
          )
          .replace('-thumb', '')
      }
    },

    /*
      link:       http://stuffed.ru/filmy/596773-horrorvillian.html
      thumbnail:  http://s1.stuffed.ru/y2018/04-29/0/596773-thumb.jpeg
      image:      http://s1.stuffed.ru/y2018/04-29/0/596773.jpeg
    */
    {
      name: 'stuffed.ru',
      linkRegEx: new RegExp('^http://stuffed.ru'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('-thumb', '')
      }
    },
    /*
      Obsolete. Replaced by stuffed.ru
    */
    {
      name: 'picage.ru',
      linkRegEx: new RegExp('^http://picage.ru'),

      async getUrl(link) {
        return link.thumbnailUrl
          .replace('picage', 'pic4you')
          .replace('-thumb', '')
      }
    },

    /*
      link:       http://www.iceimg.net/site/v/5586250#3108&5586250
                             pixsense.net
                             vestimage.site
                             chaosimg.site
      thumbnail:  http://www.iceimg.net/themes/latest/ssd/small/3108/small-horrorvillian.jpg
      image:      http://www.iceimg.net/themes/latest/ssd/big/3108/horrorvillian.jpg
                  ...
                  https://www.fortstore.net/themes/latest/ssd/big/3108/horrorvillian.jpg
    */
    {
      name: 'PixSense',
      hosts: [
        'www.iceimg.net',
        'www.pixsense.net',
        'www.vestimage.site',
        'www.chaosimg.site'
      ],
      linkRegEx: new RegExp(
        '^http://www.(iceimg.net|pixsense.net|vestimage.site|chaosimg.site)'
      ),
      hostReplaceRegEx: new RegExp(
        '(iceimg.net|pixsense.net|vestimage.site|chaosimg.site)'
      ),

      async getUrl(link, extractor) {
        return link.thumbnailUrl
          .replace(extractor.hostReplaceRegEx, 'fortstore.net')
          .replace('small-', '')
          .replace('/small/', '/big/')
      }
    },

    {
      name: 'nikapic.ru',
      linkRegEx: new RegExp('^http://nikapic.ru'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('/small/', '/big/')
      }
    },

    /*
      link:       https://imgtaxi.com/img-5ae5cb94811e7.html
      thumbnail:  https://imgtaxi.com/images/small-medium/2018/04/29/5ae5cb94811ac.jpg
                  https://imgtaxi.com/images/small/2018/04/29/5ae5cb94811ac.jpg
      image:      https://imgtaxi.com/images/big/2018/04/29/5ae5cb94811ac.jpg
    */
    {
      name: 'imgtaxi.com',
      linkRegEx: new RegExp('^https://imgtaxi.com'),

      async getUrl(link) {
        return link.thumbnailUrl
          .replace('/small/', '/big/')
          .replace('/small-medium/', '/big/')
      }
    },

    /*
      link:       http://imgbox.com/k0zeyDLQ
      thumbnail:  https://thumbs2.imgbox.com/b3/8d/k0zeyDLQ_t.jpg
      image:      https://images2.imgbox.com/b3/8d/k0zeyDLQ_o.jpg
    */
    {
      name: 'imgbox.com',
      linkRegEx: new RegExp('^http://imgbox.com'),

      async getUrl(link) {
        return link.thumbnailUrl
          .replace('/thumbs', '/images')
          .replace('_t', '_o')
      }
    },

    /*
      link:       https://imageban.ru/show/2018/04/29/6174c1e6c0381b2511ec221970ff6550/jpg
      thumbnail:  http://i5.imageban.ru/thumbs/2018.04.29/6174c1e6c0381b2511ec221970ff6550.jpg
      image:      http://i5.imageban.ru/out/2018/04/29/6174c1e6c0381b2511ec221970ff6550.jpg
    */
    {
      name: 'ImageBan.ru',
      linkRegEx: new RegExp('//imageban.ru/show'),
      datePattern: /(\d{4})\.(\d{2})\.(\d{2})/,

      async getUrl(link, extractor) {
        return link.thumbnailUrl
          .replace('thumbs', 'out')
          .replace(extractor.datePattern, '$1/$2/$3')
      }
    },
    // Direct link
    {
      name: 'ImageBan.ru (direct link)',
      linkRegEx: new RegExp('imageban.ru/out'),

      async getUrl(link) {
        return link.url
      }
    },

    /*
      link:       https://c.radikal.ru/c07/1804/0d/ae78f7fe7106.jpg
      thumbnail:  https://c.radikal.ru/c07/1804/0d/ae78f7fe7106t.jpg
      image:      https://c.radikal.ru/c07/1804/0d/ae78f7fe7106.jpg
    */
    {
      name: 'Radikal.ru',
      linkRegEx: /https?:\/\/.\.radikal\.ru\//,

      async getUrl(link) {
        return link.url
      }
    },

    /*
    link:       http://radikal.ru/F/s40.radikal.ru/i087/1205/55/a8a7e55a9bc7.png.html
    thumbnail:  http://s40.radikal.ru/i087/1205/55/a8a7e55a9bc7t.jpg
    image:      https://s40.radikal.ru/i087/1205/55/a8a7e55a9bc7.png
    */
    {
      name: 'Radikal.ru (obsolete)',
      linkRegEx: new RegExp('^http://radikal.ru/'),

      async getUrl(link) {
        const extension = link.url.split('.').slice(-2)[0]

        return link.thumbnailUrl
          .replace('http:/', 'https:/')
          .replace('t.', '.')
          .replace('jpg', extension)
      }
    },

    /*
      link:       http://piccash.net/53489/845533/
      thumbnail:  http://piccash.net/allimage/2018/7-15/img_thumb/845533-thumb.jpeg
      image:      http://piccash.net/allimage/2018/7-15/img_full/845533.jpeg
    */
    {
      name: 'PicCash.net',
      linkRegEx: new RegExp('^http://piccash.net/'),

      async getUrl(link) {
        return link.thumbnailUrl
          .replace('_thumb', '_full')
          .replace('-thumb', '')
      }
    },

    /*
      link:       https://imgdrive.net/img-5b4b4ac468dd6.html
      thumbnail:  https://imgdrive.net/images/small/2018/07/15/5b4b4ac468d9b.jpg
      image:      https://imgdrive.net/images/big/2018/07/15/5b4b4ac468d9b.jpg
    */
    {
      name: 'ImgDrive.net',
      linkRegEx: new RegExp('^https://imgdrive.net'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('small', 'big')
      }
    },

    /*
      link:       http://imgchilibum.ru/v.php?id=1b931abd5b281da99daa3b20cafd3534
      thumbnail:  http://imgchilibum.ru/pic_s/1b931abd5b281da99daa3b20cafd3534.jpg
      image:      http://imgchilibum.ru/pic_b/1b931abd5b281da99daa3b20cafd3534.jpg
    */
    {
      name: 'imgchilibum.ru',
      linkRegEx: new RegExp('^http://imgchilibum.ru/v'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('_s/', '_b/')
      }
    },

    /*
      upload doesn't work at the moment
    */
    {
      name: 'XXXScreens.com',
      linkRegEx: new RegExp('^http://xxxscreens.com'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('small/', 'big/')
      }
    },

    /*
      link:       http://money-pic.ru/64/5384/
      thumbnail:  http://money-pic.ru/allimage/7/5384-thumb.jpeg
      image:      http://money-pic.ru/allimage/7/5384.jpeg
    */
    {
      name: 'money-pic.ru',
      linkRegEx: new RegExp('^http://money-pic.ru'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('-thumb', '')
      }
    },

    /*
      link:       http://vfl.ru/fotos/e720f58222754036.html
      thumbnail:  http://images.vfl.ru/ii/1533382125/e720f582/22754036_s.jpg
      image:      http://images.vfl.ru/ii/1533382125/e720f582/22754036.jpg
    */
    {
      name: 'VFL.ru',
      linkRegEx: new RegExp('^http://vfl.ru'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('_s', '')
      }
    },

    /*
      link:       http://lostpic.net/image/nQRT
      thumbnail:  http://img11.lostpic.net/2018/08/04/e96797434cb6b6a4df60b3e77c293226.th.jpg
      image:      https://img11.lostpic.net/2018/08/04/e96797434cb6b6a4df60b3e77c293226.jpg
    */
    {
      name: 'Lostpic.net',
      linkRegEx: new RegExp('^http://lostpic.net'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('.th', '').replace('http:', 'https:')
      }
    },

    /*
      link:       https://imgadult.com/img-5b65bba9a6e5d.html
      thumbnail:  https://imgadult.com/upload/small/2018/08/04/5b65bba9a6e23.jpg
      image:      https://imgadult.com/upload/big/2018/08/04/5b65bba9a6e23.jpg
    */
    {
      name: 'ImgAdult.com',
      linkRegEx: new RegExp('^https://imgadult.com'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('/small/', '/big/')
      }
    },

    /*
      link:       https://ibb.co/cx4HBK
      thumbnail:  https://thumb.ibb.co/cx4HBK/horrorvillian.jpg
      image:      https://image.ibb.co/fAyNdz/horrorvillian.jpg or https://image.ibb.co/cx4HBK/horrorvillian.jpg 
    */
    {
      name: 'imgbb.com',
      linkRegEx: new RegExp('^https://ibb.co'),

      async getUrl(link) {
        return link.thumbnailUrl.replace('//thumb', '//image')
      }
    },

    /*
      link:       https://imx.to/i/1tr970
      thumbnail:  https://imx.to/u/t/2018/08/14/1tr970.jpg
      image:      https://i.imx.to/i/2018/08/14/1tr970.jpg
    */
    {
      name: 'IMX.to',
      linkRegEx: new RegExp('^https://imx.to'),

      async getUrl(link) {
        return link.thumbnailUrl
          .replace('/imx', '/i.imx')
          .replace('/u/t/', '/i/')
      }
    }
  ]

  const extractorsByName = extractors.reduce((result, extractor) => {
    result[extractor.name] = extractor
    return result
  }, {})

  return {
    getImageHostsInfo() {
      const result = extractors.map(e => ({
        name: e.name,
        description: e.hosts ? e.hosts.join(', ') : ''
      }))

      return sortCaseInsensitive(result, value => value.name)
    },

    getImageUrl(link) {
      const extractor = extractorsByName[link.host]

      return extractor.getUrl(link, extractor)
    },

    getHostNameMatcher(enabledHosts) {
      // Keep enabled extractors
      extractorsActive = extractors.filter(e => enabledHosts.includes(e.name))

      // It is often case when neighbor links are from the same image host. Therefore
      // we can improve search by checking link URL with the previous extractor
      // linkRegEx
      let prevExtractor = null

      return url => {
        if (prevExtractor && prevExtractor.linkRegEx.test(url)) {
          return prevExtractor.name
        }

        const extractor = extractorsActive.find(e => e.linkRegEx.test(url))

        if (extractor) {
          prevExtractor = extractor
          return extractor.name
        }

        return null
      }
    }
  }
})()
