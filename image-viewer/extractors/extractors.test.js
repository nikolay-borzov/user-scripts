import https from 'node:https'

import test from 'ava'
import esmock from 'esmock'

/**
 * Loads page text content.
 *
 * @see {@link https://stackoverflow.com/a/38543075/1606662}
 * @type {typeof GM.xmlHttpRequest}
 */
const requestStub = async ({ url, cookie }) => {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        ...(cookie && {
          headers: {
            cookie,
          },
        }),
      },
      (response) => {
        if (!response.statusCode) {
          throw new Error('statusCode is not set')
        }

        const statusCode = response.statusCode

        // Reject on bad status
        if (statusCode < 200 || statusCode >= 300) {
          // Follow redirects
          if (
            (statusCode === 301 || statusCode === 302) &&
            response.headers.location !== undefined
          ) {
            resolve(requestStub({ url: response.headers.location, cookie }))

            return
          }

          reject(new Error(`statusCode=${response.statusCode}`))

          return
        }

        // Cumulate data
        /** @type {Uint8Array[]} */
        const body = []

        response.on('data', (chunk) => {
          body.push(chunk)
        })

        // Resolve on end
        response.on('end', () => {
          try {
            const responseText = Buffer.concat(body).toString()

            // @ts-ignore -- It's okay for stub
            resolve({
              responseText,
            })
          } catch (error) {
            reject(error)
          }
        })
      }
    )

    // Reject on request error
    request.on('error', (error) => {
      reject(error)
    })

    request.end()
  })
}

/**
 * @typedef {object} ExtractorTest
 * @property {string} [testName]
 * @property {[string, string]} extractor Extractor import path and name.
 * @property {string} linkURL Image host image view link.
 * @property {string} thumbnailURL
 * @property {string | RegExp} imageURL Expected full image URL.
 * @property {boolean} [only] Use `test.only`.
 */

/**
 * @param {ExtractorTest} testParameters
 */
function testExtractor({
  testName,
  extractor: [extractorImportPath, extractorName],
  linkURL,
  thumbnailURL,
  imageURL,
  only,
}) {
  const testMethod = only ? test.only : test

  testMethod(testName ?? extractorName, async (t) => {
    const { [extractorName]: extractor } = await esmock(
      extractorImportPath,
      undefined,
      {
        '../../common/api.js': {
          request: requestStub,
        },
      }
    )

    const url = await extractor.getURL(
      {
        host: '',
        url: linkURL,
        thumbnailURL,
      },
      extractor
    )

    if (typeof imageURL === 'string') {
      t.is(url, imageURL)
    } else {
      t.regex(url, imageURL)
    }
  })
}

/** @type {ExtractorTest[]} */
const testData = [
  {
    extractor: ['./adult-images.js', 'adultImages'],
    linkURL: 'https://adult-images.ru/92/32940/',
    thumbnailURL: 'https://adult-images.ru/allimage/5/32940-thumb.jpeg',
    imageURL: 'https://adult-images.ru/allimage/5/32940.jpeg',
  },
  {
    testName: 'money-pic (Legacy)',
    extractor: ['./adult-images.js', 'adultImages'],
    linkURL: 'https://money-pic.ru/92/32940/',
    thumbnailURL: 'https://money-pic.ru/allimage/5/32940-thumb.jpeg',
    imageURL: 'https://money-pic.ru/allimage/5/32940.jpeg',
  },
  {
    extractor: ['./fastpic.js', 'fastpic'],
    linkURL:
      'https://fastpic.org/view/117/2022/0515/b17e98658d0743e2fb723ad4789cd58f.jpg.html',
    thumbnailURL:
      'https://i117.fastpic.org/thumb/2022/0515/8f/b17e98658d0743e2fb723ad4789cd58f.jpeg',
    imageURL:
      /https:\/\/i117\.fastpic\.org\/big\/2022\/0515\/8f\/b17e98658d0743e2fb723ad4789cd58f\.jpg\?md5=.{22}&expires=\d{10}/,
  },
  {
    extractor: ['./fastpic.js', 'fastpicDirect'],
    linkURL:
      'https://i117.fastpic.org/big/2022/0515/8f/b17e98658d0743e2fb723ad4789cd58f.jpg',
    thumbnailURL:
      'https://i117.fastpic.org/thumb/2022/0515/8f/b17e98658d0743e2fb723ad4789cd58f.jpeg',
    imageURL:
      /https:\/\/i117\.fastpic\.org\/big\/2022\/0515\/8f\/b17e98658d0743e2fb723ad4789cd58f\.jpg\?md5=.{22}&expires=\d{10}/,
  },
  {
    extractor: ['./imagebam.js', 'imagebam'],
    linkURL: 'https://www.imagebam.com/view/MEAEQ85',
    thumbnailURL: 'https://thumbs4.imagebam.com/80/ed/ea/MEAEQ85_t.jpg',
    imageURL: 'https://images4.imagebam.com/bf/51/56/MEAEQ85_o.jpg',
  },
  {
    testName: 'imagebam (Legacy)',
    extractor: ['./imagebam.js', 'imagebam'],
    linkURL: 'https://www.imagebam.com/image/8813691369677527',
    thumbnailURL: 'https://thumbs2.imagebam.com/67/67/cd/8813691369677527.jpg',
    imageURL: 'https://images2.imagebam.com/06/af/cf/8813691369677527.png',
  },
  {
    extractor: ['./imageban.js', 'imageban'],
    linkURL:
      'https://imageban.ru/show/2022/05/12/db335b8c6c56bf19aa0618a2a72e9123/jpg',
    thumbnailURL:
      'https://i7.imageban.ru/thumbs/2022.05.12/db335b8c6c56bf19aa0618a2a72e9123.jpg',
    imageURL:
      'https://i7.imageban.ru/out/2022/05/12/db335b8c6c56bf19aa0618a2a72e9123.jpg',
  },
  {
    extractor: ['./imageban.js', 'imagebanDirect'],
    linkURL:
      'https://i7.imageban.ru/out/2022/05/12/db335b8c6c56bf19aa0618a2a72e9123.jpg',
    thumbnailURL:
      'https://i7.imageban.ru/thumbs/2022.05.12/db335b8c6c56bf19aa0618a2a72e9123.jpg',
    imageURL:
      'https://i7.imageban.ru/out/2022/05/12/db335b8c6c56bf19aa0618a2a72e9123.jpg',
  },
  {
    extractor: ['./imagetwist', 'imagetwist'],
    linkURL: 'https://imagetwist.com/4clvkzs1b6wa/horrorvillian.jpg',
    thumbnailURL: 'https://img165.imagetwist.com/th/33192/4clvkzs1b6wa.jpg',
    imageURL:
      'https://img165.imagetwist.com/i/33192/4clvkzs1b6wa.jpg/horrorvillian.jpg',
  },
  {
    testName: 'imagetwist (Legacy)',
    extractor: ['./imagetwist', 'imagetwist'],
    linkURL: 'https://imagetwist.com/4clvkzs1b6wa/horrorvillian.jpg.html',
    thumbnailURL: 'https://img165.imagetwist.com/th/33192/4clvkzs1b6wa.jpg',
    imageURL:
      'https://img165.imagetwist.com/i/33192/4clvkzs1b6wa.jpg/horrorvillian.jpg',
  },
  {
    testName: 'imagetwist (Different length extension)',
    extractor: ['./imagetwist', 'imagetwist'],
    linkURL: 'https://imagetwist.com/h6malhv2wnot/horrorvillian.jpeg',
    thumbnailURL: 'https://img119.imagetwist.com/th/54675/h6malhv2wnot.jpg',
    imageURL:
      'https://img119.imagetwist.com/i/54675/h6malhv2wnot.jpeg/horrorvillian.jpeg',
  },
  {
    testName: 'imagetwist (Subdomain)',
    extractor: ['./imagetwist', 'imagetwist'],
    linkURL: 'https://phun.imagetwist.com/wtfkpgxua72o/horrorvillian.jpg',
    thumbnailURL: 'https://i7phun.imagetwist.com/th/00001/wtfkpgxua72o.jpg',
    imageURL:
      'https://i7phun.imagetwist.com/i/00001/wtfkpgxua72o.jpg/horrorvillian.jpg',
  },
  {
    extractor: ['./imagetwist', 'imagetwistBased'],
    linkURL: 'https://picshick.com/4clvkzs1b6wa/horrorvillian.jpg',
    thumbnailURL: 'https://img165.picshick.com/th/33192/4clvkzs1b6wa.jpg',
    imageURL:
      'https://img165.imagetwist.com/i/33192/4clvkzs1b6wa.jpg/horrorvillian.jpg',
  },
  {
    extractor: ['./imagevenue.js', 'imagevenue'],
    linkURL: 'https://www.imagevenue.com/ME12EX2A',
    thumbnailURL: 'https://cdn-thumbs.imagevenue.com/16/63/f1/ME12EX2A_t.jpg',
    imageURL: 'https://cdn-images.imagevenue.com/26/e4/c7/ME12EX2A_o.jpg',
  },
  {
    testName: 'imagevenue (Legacy)',
    extractor: ['./imagevenue.js', 'imagevenue'],
    linkURL:
      'https://img18127.imagevenue.com/img.php?image=55407_horrorvillian_122_783lo.jpg',
    thumbnailURL:
      'https://img18127.imagevenue.com/loc783/th_55407_horrorvillian_122_783lo.jpg',
    imageURL:
      'https://cdno-data.imagevenue.com/html.img8127/upload2328/loc783/55407_horrorvillian_122_783lo.jpg',
  },
  {
    extractor: ['./imgadult.js', 'imgadult'],
    linkURL: 'https://imgadult.com/img-5b65bba9a6e5d.html',
    thumbnailURL:
      'https://imgadult.com/upload/small/2018/08/04/5b65bba9a6e23.jpg',
    imageURL: 'https://imgadult.com/upload/big/2018/08/04/5b65bba9a6e23.jpg',
  },
  {
    extractor: ['./imgbb.js', 'imgbb'],
    linkURL: 'https://ibb.co/N6Vv8dt',
    thumbnailURL: 'https://i.ibb.co/N6Vv8dt/horrorvillian.jpg',
    imageURL: 'https://i.ibb.co/svmf0db/horrorvillian.jpg',
  },
  {
    testName: 'imgbb (Legacy)',
    extractor: ['./imgbb.js', 'imgbb'],
    linkURL: 'https://ibb.co/qyHhHMd',
    thumbnailURL: 'https://thumb.ibb.co/h6js1x/Q3os598u_400x400.jpg',
    imageURL: 'https://image.ibb.co/h6js1x/Q3os598u_400x400.jpg',
  },
  {
    extractor: ['./imgbox', 'imgbox'],
    linkURL: 'http://imgbox.com/k0zeyDLQ',
    thumbnailURL: 'https://thumbs2.imgbox.com/b3/8d/k0zeyDLQ_t.jpg',
    imageURL: 'https://images2.imgbox.com/b3/8d/k0zeyDLQ_o.jpg',
  },
  {
    extractor: ['./imgbum.js', 'imgbum'],
    linkURL: 'https://imgbum.ru/1457/80227/',
    thumbnailURL: 'https://imgbum.ru/allimage/5/80227-thumb.jpeg',
    imageURL: 'https://imgbum.ru/allimage/5/80227.jpeg',
  },
  {
    extractor: ['./imgdrive.js', 'imgdrive'],
    linkURL: 'https://imgdrive.net/img-5b4b4ac468dd6.html',
    thumbnailURL:
      'https://imgdrive.net/images/small/2018/07/15/5b4b4ac468d9b.jpg',
    imageURL: 'https://imgdrive.net/images/big/2018/07/15/5b4b4ac468d9b.jpg',
  },
  {
    extractor: ['./imgtaxi.js', 'imgtaxi'],
    linkURL: 'https://imgtaxi.com/img-5ae5cb94811e7.html',
    thumbnailURL:
      'https://imgtaxi.com/images/small-medium/2018/04/29/5ae5cb94811ac.jpg',
    imageURL: 'https://imgtaxi.com/images/big/2018/04/29/5ae5cb94811ac.jpg',
  },
  {
    extractor: ['./piccash.js', 'piccash'],
    linkURL: 'http://piccash.net/60277/1124310/',
    thumbnailURL:
      'http://piccash.net/allpics/2022/5-15/img_thumb/1124310-thumb.jpeg',
    imageURL: 'http://piccash.net/allpics/2022/5-15/img_full/1124310.jpeg',
  },
  {
    extractor: ['./picforall.js', 'picforall'],
    linkURL: 'https://picforall.ru/1892/532639/',
    thumbnailURL: 'https://picforall.ru/allimage/4/532639-thumb.jpeg',
    imageURL: 'https://picforall.ru/allimage/4/532639.jpeg',
  },
  {
    testName: 'freescreens.ru (PicForAll alias)',
    extractor: ['./picforall.js', 'picforall'],
    linkURL: 'https://freescreens.ru/1892/532639/',
    thumbnailURL: 'https://freescreens.ru/allimage/4/532639-thumb.jpeg',
    imageURL: 'https://freescreens.ru/allimage/4/532639.jpeg',
  },
  {
    testName: 'imgclick.ru (PicForAll alias)',
    extractor: ['./picforall.js', 'picforall'],
    linkURL: 'https://imgclick.ru/1892/532639/',
    thumbnailURL: 'https://imgclick.ru/allimage/4/532639-thumb.jpeg',
    imageURL: 'https://imgclick.ru/allimage/4/532639.jpeg',
  },
  {
    testName: 'picclick.ru (PicForAll alias)',
    extractor: ['./picforall.js', 'picforall'],
    linkURL: 'https://picclick.ru/1892/532639/',
    thumbnailURL: 'https://picclick.ru/allimage/4/532639-thumb.jpeg',
    imageURL: 'https://picclick.ru/allimage/4/532639.jpeg',
  },
  {
    testName: 'payforpic.ru (PicForAll alias)',
    extractor: ['./picforall.js', 'picforall'],
    linkURL: 'https://payforpic.ru/1892/532639/',
    thumbnailURL: 'https://payforpic.ru/allimage/4/532639-thumb.jpeg',
    imageURL: 'https://payforpic.ru/allimage/4/532639.jpeg',
  },
  {
    testName: 'imgbase.ru (PicForAll alias)',
    extractor: ['./picforall.js', 'picforall'],
    linkURL: 'https://imgbase.ru/1892/532639/',
    thumbnailURL: 'https://imgbase.ru/allimage/4/532639-thumb.jpeg',
    imageURL: 'https://imgbase.ru/allimage/4/532639.jpeg',
  },
  {
    extractor: ['./turboimagehost.js', 'turboimagehost'],
    linkURL: 'https://www.turboimagehost.com/p/75851152/horrorvillian.jpg.html',
    thumbnailURL: 'https://s8d2.turboimg.net/t/75851152_horrorvillian.jpg',
    imageURL:
      'https://s8d2.turboimg.net/sp/5ab686fc1d511f74bd509eac37e061ab/horrorvillian.jpg',
  },
  {
    extractor: ['./vfl.js', 'vfl'],
    linkURL: 'http://vfl.ru/fotos/e720f58222754036.html',
    thumbnailURL: 'http://images.vfl.ru/ii/1533382125/e720f582/22754036_s.jpg',
    imageURL: 'http://images.vfl.ru/ii/1533382125/e720f582/22754036.jpg',
  },
]

for (const testParameters of testData) {
  testExtractor(testParameters)
}
