// ==UserScript==
// @name         Pornolab Enhancer (WIP)
// @version      0.0.1
// @description  Improves UX
// @author       shikiyoku
// @license      MIT
// @copyright    2017+, shikiyoku
// @namespace    https://github.com/shikiyoku
// @icon         resources/icon.png
// @homepageURL  https://github.com/shikiyoku/user-scripts
// @supportURL   https://github.com/shikiyoku/user-scripts/issues
// @include      *pornolab.*

// @connect      fastpic.ru
// @connect      www.imagebam.com
// @connect      imagevenue.com

// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM.getResourceURL
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest

// @run-at       document-start

// @require      ../libs/bliss.shy.min.js

// @require      ../common/addStyle.js
// @require      ../common/request.js
// @require      ../common/regex.js

// @require      image-view.js
// @resource     imageViewCSS styles/image-view.css

// @require      download.js
// @resource     pagerCSS styles/download.css

// @require      tags.js
// @resource     tagsCSS styles/tags.css

// @resource     pagerCSS styles/pager.css
// ==/UserScript==

(function ($, $$) {
  /* global PLE Bliss US */
  'use strict'

  const enhance = {
    tags: PLE.tags.init,

    pager () {
      US.addStyle('pagerCSS')
    },

    download: PLE.download.init,

    imageView: PLE.imageView.init
  }

  enhance.tags()
  enhance.pager()
  enhance.download()
  enhance.imageView()
})(Bliss, Bliss.$)
