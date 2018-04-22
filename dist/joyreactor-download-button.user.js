// ==UserScript==
// @name        JoyReactor Download Button
// @namespace   https://github.com/shikiyoku
// @description Adds download buttton to images
// @version     1.2.0
// @author      shikiyoku
// @license     MIT
// @copyright   2017+, shikiyoku
// @icon        http://joyreactor.cc/favicon.ico
// @homepageURL https://github.com/shikiyoku/user-scripts
// @supportURL  https://github.com/shikiyoku/user-scripts/issues
// @include     http://joyreactor.cc/*
// @include     http://joyreactor.com/*
// @run-at      document-end
// @grant       GM_addStyle
// ==/UserScript==

;(function() {
  'use strict'

  var addStyle =
    'GM_addStyle' in window
      ? GM_addStyle // eslint-disable-line camelcase
      : css => {
          var head = document.getElementsByTagName('head')[0]
          if (head) {
            var style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = css
            head.appendChild(style)
            return css
          }
        }

  var dom = {
    on(parent, eventName, selector, callback) {
      parent.addEventListener(eventName, function(event) {
        const matchingChild = event.target.closest(selector)

        if (matchingChild) {
          callback(matchingChild)
        }
      })
    }
  }

  var css =
    "@keyframes ripple{0%{transform:scale(0);opacity:1}20%{transform:scale(25);opacity:1}to{transform:scale(40);opacity:0}}.image{display:inline-block;position:relative}.download-link{position:absolute;top:10px;right:60px;width:35px;height:35px;overflow:hidden;transition:all .3s cubic-bezier(.25,.8,.25,1);border-radius:0 0 7px 7px;opacity:0;background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg height='24' width='24' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\") #333;background-size:contain;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.download-link:hover{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}.download-link:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:5px;transform:scale(1) translate(-50%);transform-origin:50% 50%;border-radius:100%;opacity:0;background:hsla(0,0%,100%,.3)}.download-link:focus:not(:active):after{animation:ripple 1s ease-out}.image:hover .download-link{opacity:1}"

  addStyle(css)

  const CLASSES = {
    processed: 'js-has-download-button'
  }

  function createDownloadLink(imgContainer) {
    imgContainer.classList.add(CLASSES.processed)

    const gifLink = imgContainer.querySelector('a.video_gif_source')

    if (gifLink) {
      gifLink.setAttribute('download', '')
      return
    }

    let imgURL = ''
    const imgLink = imgContainer.querySelector('a')

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
})()
