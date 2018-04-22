// ==UserScript==
// @name        Image Viewer
// @namespace   https://github.com/shikiyoku
// @description Allows viewing full image without leaving the page
// @version     0.9.0
// @author      shikiyoku
// @license     MIT
// @copyright   2018+, shikiyoku
// @icon        https://raw.githubusercontent.com/shikiyoku/user-scripts/master/image-viewer/icon.png
// @homepageURL https://github.com/shikiyoku/user-scripts
// @supportURL  https://github.com/shikiyoku/user-scripts/issues
// @connect     www.imagebam.com
// @connect     imagevenue.com
// @connect     www.turboimagehost.com
// @connect     imgbox.com
// @run-at      document-start
// @compatible  chrome
// @compatible  firefox
// @include     *
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @grant       GM_setValue
// @grant       GM.setValue
// @grant       GM_getValue
// @grant       GM.getValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// ==/UserScript==

;(function() {
  'use strict'

  /* global Bliss */
  // eslint-disable-next-line
  !(function(){function t(e,n,i){return n=void 0===n?1:n, i=i||n+1, i-n<=1?function(){if(arguments.length<=n||"string"===r.type(arguments[n]))return e.apply(this,arguments);var t,i=arguments[n];for(var o in i){var s=Array.prototype.slice.call(arguments);s.splice(n,1,o,i[o]), t=e.apply(this,s);}return t}:t(t(e,n+1,i),n,i-1)}function e(t,r,i){var o=n(i);if("string"===o){var s=Object.getOwnPropertyDescriptor(r,i);!s||s.writable&&s.configurable&&s.enumerable&&!s.get&&!s.set?t[i]=r[i]:(delete t[i], Object.defineProperty(t,i,s));}else if("array"===o)i.forEach(function(n){n in r&&e(t,r,n);});else for(var a in r)i&&("regexp"===o&&!i.test(a)||"function"===o&&!i.call(r,a))||e(t,r,a);return t}function n(t){if(null===t)return"null";if(void 0===t)return"undefined";var e=(Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1]||"").toLowerCase();return"number"==e&&isNaN(t)?"nan":e}var r=self.Bliss=e(function(t,e){return 2==arguments.length&&!e||!t?null:"string"===r.type(t)?(e||document).querySelector(t):t||null},self.Bliss);e(r,{extend:e,overload:t,type:n,property:r.property||"_",listeners:self.WeakMap?new WeakMap:new Map,original:{addEventListener:(self.EventTarget||Node).prototype.addEventListener,removeEventListener:(self.EventTarget||Node).prototype.removeEventListener},sources:{},noop:function(){},$:function(t,e){return t instanceof Node||t instanceof Window?[t]:2!=arguments.length||e?Array.prototype.slice.call("string"==typeof t?(e||document).querySelectorAll(t):t||[]):[]},defined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},create:function(t,e){return t instanceof Node?r.set(t,e):(1===arguments.length&&("string"===r.type(t)?e={}:(e=t, t=e.tag, e=r.extend({},e,function(t){return"tag"!==t}))), r.set(document.createElement(t||"div"),e))},each:function(t,e,n){n=n||{};for(var r in t)n[r]=e.call(t,r,t[r]);return n},ready:function(t,e,n){if("function"!=typeof t||e||(e=t, t=void 0), t=t||document, e&&("loading"!==t.readyState?e():r.once(t,"DOMContentLoaded",function(){e();})), !n)return new Promise(function(e){r.ready(t,e,!0);})},Class:function(t){var e,n=["constructor","extends","abstract","static"].concat(Object.keys(r.classProps)),i=t.hasOwnProperty("constructor")?t.constructor:r.noop;2==arguments.length?(e=arguments[0], t=arguments[1]):(e=function(){if(this.constructor.__abstract&&this.constructor===e)throw new Error("Abstract classes cannot be directly instantiated.");e["super"]&&e["super"].apply(this,arguments), i.apply(this,arguments);}, e["super"]=t["extends"]||null, e.prototype=r.extend(Object.create(e["super"]?e["super"].prototype:Object),{constructor:e}), e.prototype["super"]=e["super"]?e["super"].prototype:null, e.__abstract=!!t["abstract"]);var o=function(t){return this.hasOwnProperty(t)&&n.indexOf(t)===-1};if(t["static"]){r.extend(e,t["static"],o);for(var s in r.classProps)s in t["static"]&&r.classProps[s](e,t["static"][s]);}r.extend(e.prototype,t,o);for(var s in r.classProps)s in t&&r.classProps[s](e.prototype,t[s]);return e},classProps:{lazy:t(function(t,e,n){return Object.defineProperty(t,e,{get:function(){var t=n.call(this);return Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0}), t},set:function(t){Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0});},configurable:!0,enumerable:!0}), t}),live:t(function(t,e,n){return"function"===r.type(n)&&(n={set:n}), Object.defineProperty(t,e,{get:function(){var t=this["_"+e],r=n.get&&n.get.call(this,t);return void 0!==r?r:t},set:function(t){var r=this["_"+e],i=n.set&&n.set.call(this,t,r);this["_"+e]=void 0!==i?i:t;},configurable:n.configurable,enumerable:n.enumerable}), t})},include:function(){var t=arguments[arguments.length-1],e=2===arguments.length&&arguments[0],n=document.createElement("script");return e?Promise.resolve():new Promise(function(e,i){r.set(n,{async:!0,onload:function(){e(), n.parentNode&&n.parentNode.removeChild(n);},onerror:function(){i();},src:t,inside:document.head});})},fetch:function(t,n){if(!t)throw new TypeError("URL parameter is mandatory and cannot be "+t);var i=e({url:new URL(t,location),data:"",method:"GET",headers:{},xhr:new XMLHttpRequest},n);i.method=i.method.toUpperCase(), r.hooks.run("fetch-args",i), "GET"===i.method&&i.data&&(i.url.search+=i.data), document.body.setAttribute("data-loading",i.url), i.xhr.open(i.method,i.url.href,i.async!==!1,i.user,i.password);for(var o in n)if("upload"===o)i.xhr.upload&&"object"==typeof n[o]&&r.extend(i.xhr.upload,n[o]);else if(o in i.xhr)try{i.xhr[o]=n[o];}catch(s){self.console&&console.error(s);}var a=Object.keys(i.headers).map(function(t){return t.toLowerCase()});"GET"!==i.method&&a.indexOf("content-type")===-1&&i.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(var c in i.headers)void 0!==i.headers[c]&&i.xhr.setRequestHeader(c,i.headers[c]);var u=new Promise(function(t,e){i.xhr.onload=function(){document.body.removeAttribute("data-loading"), 0===i.xhr.status||i.xhr.status>=200&&i.xhr.status<300||304===i.xhr.status?t(i.xhr):e(r.extend(Error(i.xhr.statusText),{xhr:i.xhr,get status(){return this.xhr.status}}));}, i.xhr.onerror=function(){document.body.removeAttribute("data-loading"), e(r.extend(Error("Network Error"),{xhr:i.xhr}));}, i.xhr.ontimeout=function(){document.body.removeAttribute("data-loading"), e(r.extend(Error("Network Timeout"),{xhr:i.xhr}));}, i.xhr.send("GET"===i.method?null:i.data);});return u.xhr=i.xhr, u},value:function(t){var e="string"!==r.type(t);return r.$(arguments).slice(+e).reduce(function(t,e){return t&&t[e]},e?t:self)}}), r.Hooks=new r.Class({add:function(t,e,n){if("string"==typeof arguments[0])(Array.isArray(t)?t:[t]).forEach(function(t){this[t]=this[t]||[], e&&this[t][n?"unshift":"push"](e);},this);else for(var t in arguments[0])this.add(t,arguments[0][t],arguments[1]);},run:function(t,e){this[t]=this[t]||[], this[t].forEach(function(t){t.call(e&&e.context?e.context:e,e);});}}), r.hooks=new r.Hooks;r.property;r.Element=function(t){this.subject=t, this.data={}, this.bliss={};}, r.Element.prototype={set:t(function(t,e){t in r.setProps?r.setProps[t].call(this,e):t in this?this[t]=e:this.setAttribute(t,e);},0),transition:function(t,e){return e=+e||400, new Promise(function(n,i){if("transition"in this.style){var o=r.extend({},this.style,/^transition(Duration|Property)$/);r.style(this,{transitionDuration:(e||400)+"ms",transitionProperty:Object.keys(t).join(", ")}), r.once(this,"transitionend",function(){clearTimeout(s), r.style(this,o), n(this);});var s=setTimeout(n,e+50,this);r.style(this,t);}else r.style(this,t), n(this);}.bind(this))},fire:function(t,e){var n=document.createEvent("HTMLEvents");return n.initEvent(t,!0,!0), this.dispatchEvent(r.extend(n,e))},bind:t(function(t,e){if(arguments.length>1&&("function"===r.type(e)||e.handleEvent)){var n=e;e="object"===r.type(arguments[2])?arguments[2]:{capture:!!arguments[2]}, e.callback=n;}var i=r.listeners.get(this)||{};t.trim().split(/\s+/).forEach(function(t){if(t.indexOf(".")>-1){t=t.split(".");var n=t[1];t=t[0];}i[t]=i[t]||[], 0===i[t].filter(function(t){return t.callback===e.callback&&t.capture==e.capture}).length&&i[t].push(r.extend({className:n},e)), r.original.addEventListener.call(this,t,e.callback,e);},this), r.listeners.set(this,i);},0),unbind:t(function(t,e){if(e&&("function"===r.type(e)||e.handleEvent)){var n=e;e=arguments[2];}"boolean"==r.type(e)&&(e={capture:e}), e=e||{}, e.callback=e.callback||n;var i=r.listeners.get(this);(t||"").trim().split(/\s+/).forEach(function(t){if(t.indexOf(".")>-1){t=t.split(".");var n=t[1];t=t[0];}if(t&&e.callback)return r.original.removeEventListener.call(this,t,e.callback,e.capture);if(i)for(var o in i)if(!t||o===t)for(var s,a=0;s=i[o][a];a++)n&&n!==s.className||e.callback&&e.callback!==s.callback||!!e.capture!=!!s.capture||(i[o].splice(a,1), r.original.removeEventListener.call(this,o,s.callback,s.capture), a--);},this);},0)}, r.setProps={style:function(t){for(var e in t)e in this.style?this.style[e]=t[e]:this.style.setProperty(e,t[e]);},attributes:function(t){for(var e in t)this.setAttribute(e,t[e]);},properties:function(t){r.extend(this,t);},events:function(t){if(1!=arguments.length||!t||!t.addEventListener)return r.bind.apply(this,[this].concat(r.$(arguments)));var e=this;if(r.listeners){var n=r.listeners.get(t);for(var i in n)n[i].forEach(function(t){r.bind(e,i,t.callback,t.capture);});}for(var o in t)0===o.indexOf("on")&&(this[o]=t[o]);},once:t(function(t,e){var n=this,i=function(){return r.unbind(n,t,i), e.apply(n,arguments)};r.bind(this,t,i,{once:!0});},0),delegate:t(function(t,e,n){r.bind(this,t,function(t){t.target.closest(e)&&n.call(this,t);});},0,2),contents:function(t){(t||0===t)&&(Array.isArray(t)?t:[t]).forEach(function(t){var e=r.type(t);/^(string|number)$/.test(e)?t=document.createTextNode(t+""):"object"===e&&(t=r.create(t)), t instanceof Node&&this.appendChild(t);},this);},inside:function(t){t&&t.appendChild(this);},before:function(t){t&&t.parentNode.insertBefore(this,t);},after:function(t){t&&t.parentNode.insertBefore(this,t.nextSibling);},start:function(t){t&&t.insertBefore(this,t.firstChild);},around:function(t){t&&t.parentNode&&r.before(this,t), this.appendChild(t);}}, r.Array=function(t){this.subject=t;}, r.Array.prototype={all:function(t){var e=r.$(arguments).slice(1);return this[t].apply(this,e)}}, r.add=t(function(t,e,n,i){n=r.extend({$:!0,element:!0,array:!0},n), "function"==r.type(e)&&(!n.element||t in r.Element.prototype&&i||(r.Element.prototype[t]=function(){return this.subject&&r.defined(e.apply(this.subject,arguments),this.subject)}), !n.array||t in r.Array.prototype&&i||(r.Array.prototype[t]=function(){var t=arguments;return this.subject.map(function(n){return n&&r.defined(e.apply(n,t),n)})}), n.$&&(r.sources[t]=r[t]=e, (n.array||n.element)&&(r[t]=function(){var e=[].slice.apply(arguments),i=e.shift(),o=n.array&&Array.isArray(i)?"Array":"Element";return r[o].prototype[t].apply({subject:i},e)})));},0), r.add(r.Array.prototype,{element:!1}), r.add(r.Element.prototype), r.add(r.setProps), r.add(r.classProps,{element:!1,array:!1});var i=document.createElement("_");r.add(r.extend({},HTMLElement.prototype,function(t){return"function"===r.type(i[t])}),null,!0);}());

  const $ = Bliss
  const $$ = Bliss.$

  var gmPolyfill = (function() {
    const gmMethodMap = {
      getValue: 'GM_getValue',
      setValue: 'GM_setValue'
    }

    return function polyfill(methodName) {
      if (gmMethodMap.hasOwnProperty(methodName)) {
        return 'GM' in window && methodName in GM
          ? GM[methodName]
          : function(...args) {
              return new Promise((resolve, reject) => {
                try {
                  resolve(window[gmMethodMap[methodName]](...args))
                } catch (e) {
                  reject(e)
                }
              })
            }
      }

      return null
    }
  })()

  var store = (function() {
    return {
      get: gmPolyfill('getValue'),

      set: gmPolyfill('setValue')
    }
  })()

  var request = (function() {
    const xmlHttpRequest =
      'GM' in window && 'xmlHttpRequest' in GM
        ? GM.xmlHttpRequest
        : GM_xmlhttpRequest; // eslint-disable-line

    return function(url, { method = 'GET' } = {}) {
      return new Promise((resolve, reject) => {
        xmlHttpRequest({
          url,
          method,
          onload: resolve,
          onerror: reject
        })
      })
    }
  })()

  var regex = {
    getMatchGroups(regEx, str) {
      let matches = []
      let match

      while ((match = regEx.exec(str)) !== null) {
        if (match.index === regEx.lastIndex) {
          regEx.lastIndex++
        }

        let groups = match.slice(1)
        if (groups.some(group => group)) {
          matches.push(groups)
        }
      }

      return matches
    },

    getFirstMatchGroup(regEx, str) {
      let match = regEx.exec(str)

      return match ? match[1] : null
    }
  }

  var urlExtractor = (function() {
    function getExtractor(pageUrl) {
      return extractors.find(ext => ext.linkRegEx.test(pageUrl))
    }

    async function getPageHtml(pageUrl) {
      let response = await request(pageUrl)

      return response.responseText
    }

    async function getUrlFromPage(extractor, link) {
      const html = await getPageHtml(link.href)

      return regex.getFirstMatchGroup(extractor.imageUrlRegEx, html)
    }

    function getThumbnailUrl(link) {
      return $('img', link).src
    }

    function sortCaseInsensitive(array) {
      return array
        .map((value, index) => ({ index, value: value.toLowerCase() }))
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

    const extractors = [
      {
        name: 'FastPic',
        allowed: true,
        linkSelector: '[href*="fastpic.ru/view"]',
        linkRegEx: new RegExp('^http.?://fastpic.ru/view'),
        extensionRegEx: /\.([^.]+)\.html$/,

        async getUrl(extractor, link) {
          const extension = regex.getFirstMatchGroup(
            extractor.extensionRegEx,
            link.href
          )
          const thumbUrl = getThumbnailUrl(link)

          return (
            thumbUrl.replace('thumb', 'big').replace('jpeg', extension) +
            '?noht=1'
          )
        }
      },

      {
        name: 'FastPic',
        allowed: true,
        linkSelector: '[href*="fastpic.ru/big"]',
        linkRegEx: new RegExp('fastpic.ru/big'),

        async getUrl(extractor, link) {
          return link.href + '?noht=1'
        }
      },

      {
        name: 'ImageVenue',
        allowed: true,
        linkSelector: '[href*=".imagevenue.com/img.php"]',
        linkRegEx: new RegExp('imagevenue.com/img.php'),
        imageUrlRegEx: /id="thepic".*src="([^"]*)"/i,

        async getUrl(extractor, link) {
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

        async getUrl(extractor, link) {
          const imageName = link.href
            .split('/')
            .pop()
            .replace('.html', '')
          const extension = imageName.split('.').pop()
          const imageUrl = getThumbnailUrl(link)
            .replace('/th/', '/i/')
            .slice(0, -extension.length)

          return `${imageUrl}${extension}/${imageName}`
        }
      },

      {
        name: 'picturelol.com',
        linkSelector: '[href^="http://picturelol.com"]',
        linkRegEx: new RegExp('^http://picturelol.com'),
        async getUrl(extractor, link) {
          const imageName = link.href.split('/').pop()
          const imageUrl = getThumbnailUrl(link)
            .replace('/th/', '/i/')
            .replace('picturelol', 'imagetwist')

          return `${imageUrl}/${imageName}`
        }
      },

      {
        name: 'PicShick',
        linkSelector: '[href^="http://picshick.com"]',
        linkRegEx: new RegExp('^http://picshick.com'),

        async getUrl(extractor, link) {
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

        async getUrl(extractor, link) {
          return getThumbnailUrl(link).replace('-thumb', '')
        }
      },

      {
        name: 'PicForAll',
        linkSelector: '[href^="http://picforall.ru"]',
        linkRegEx: new RegExp('^http://picforall.ru'),

        async getUrl(extractor, link) {
          return getThumbnailUrl(link)
            .replace('picforall', 'p0xpicmoney')
            .replace('-thumb', '')
        }
      },

      {
        name: 'picage',
        linkSelector: '[href^="http://picage.ru"]',
        linkRegEx: new RegExp('^http://picage.ru'),

        async getUrl(extractor, link) {
          return getThumbnailUrl(link)
            .replace('picage', 'pic4you')
            .replace('-thumb', '')
        }
      },

      {
        name: 'PixSense',
        linkSelector: '[href^="http://www.pixsense.net"]',
        linkRegEx: new RegExp('^http://www.pixsense.net'),

        async getUrl(extractor, link) {
          return getThumbnailUrl(link)
            .replace('small-', '')
            .replace('/small/', '/big/')
        }
      },

      {
        name: 'nikapic.ru',
        linkSelector: '[href^="http://nikapic.ru"]',
        linkRegEx: new RegExp('^http://nikapic.ru'),

        async getUrl(extractor, link) {
          return getThumbnailUrl(link).replace('/small/', '/big/')
        }
      },

      {
        name: 'imgtaxi.com',
        linkSelector: '[href^="https://imgtaxi.com"]',
        linkRegEx: new RegExp('^https://imgtaxi.com'),

        async getUrl(extractor, link) {
          return getThumbnailUrl(link).replace('/small/', '/big/')
        }
      },

      {
        name: 'imgbox.com',
        linkSelector: '[href^="http://imgbox.com"]',
        linkRegEx: new RegExp('^http://imgbox.com'),
        imageUrlRegEx: /href="([^"]*)".*icon-cloud-download/,
        getUrl: getUrlFromPage
      },

      {
        name: 'payforpic.ru',
        linkSelector: '[href^="http://payforpic.ru"]',
        linkRegEx: new RegExp('^http://payforpic.ru'),

        async getUrl(extractor, link) {
          return getThumbnailUrl(link)
            .replace('payforpic', 'picker-click')
            .replace('-thumb', '')
        }
      },

      {
        name: 'imageban.ru',
        linkSelector: '[href^="http://imageban.ru"]',
        linkRegEx: new RegExp('^http://imageban.ru'),
        datePattern: /(\d{4})\.(\d{2})\.(\d{2})/,

        async getUrl(extractor, link) {
          return getThumbnailUrl(link)
            .replace('thumbs', 'out')
            .replace(extractor.datePattern, '$1/$2/$3')
        }
      }
    ]

    return {
      getImageHostNames() {
        const result = extractors
          .map(e => e.name)
          .filter((name, index, array) => array.indexOf(name) === index)

        return sortCaseInsensitive(result)
      },

      getImageUrl(link) {
        const extractor = getExtractor(link.href)

        return extractor.getUrl(extractor, link)
      },

      getLinksSelector(enabledHosts) {
        return extractors
          .filter(e => enabledHosts.includes(e.name))
          .map(e => `a${e.linkSelector}.postLink`)
          .join(',')
      }
    }
  })()

  var config = (function() {
    const CLASSES = {
      open: 'iv-config-form--open'
    }

    let configMenu = null
    const currentHost = unsafeWindow.location.host

    function showMenu(config) {
      createMenuElement(config).classList.add(CLASSES.open)
    }

    function createMenuElement(config) {
      if (!configMenu) {
        const rows = Object.keys(config.hosts).map(hostName =>
          createConfigMenuRow(hostName, config.hosts[hostName])
        )

        configMenu = $.create('div', {
          id: 'iv-config-form',
          className: 'iv-config-form',
          contents: [
            createMenuHeader(),
            {
              tag: 'div',
              className: 'iv-config-form__options',
              contents: rows
            }
          ],
          delegate: {
            change: {
              '.js-iv-config-checkbox': e =>
                updateHostConfig(config, e.target.value, e.target.checked)
            }
          }
        })

        document.body.appendChild(configMenu)
      }

      return configMenu
    }

    function createMenuHeader() {
      const closeButton = $.create('a', {
        href: '#',
        title: 'Close',
        className: `iv-icon-button iv-icon-button--small iv-icon iv-icon--type-close`,
        events: {
          click: e => {
            e.preventDefault()
            configMenu.classList.remove(CLASSES.open)
          }
        }
      })

      return {
        tag: 'div',
        className: 'iv-config-form__header',
        contents: [
          {
            tag: 'span',
            className: 'iv-config-form__header-title',
            contents: `Settings for ${currentHost}`
          },
          closeButton
        ]
      }
    }

    function createConfigMenuRow(hostName, isEnabled) {
      return $.create('label', {
        className: 'iv-config-form__label',
        contents: [
          {
            tag: 'input',
            type: 'checkbox',
            className: 'iv-config-form__checkbox js-iv-config-checkbox',
            checked: isEnabled,
            value: hostName
          },
          hostName
        ]
      })
    }

    function updateHostConfig(config, hostName, isEnabled) {
      config.hosts[hostName] = isEnabled
      store.set(currentHost, config)
    }

    return {
      async getHostConfig() {
        const hostNames = urlExtractor.getImageHostNames()
        const config = await store.get(currentHost, { hosts: {} })

        const hosts = hostNames.reduce((result, host) => {
          result[host] = host in config.hosts ? config.hosts[host] : true
          return result
        }, {})

        return {
          hosts
        }
      },

      init(config) {
        const handler = () => {
          showMenu(config)
        }

        // eslint-disable-next-line
        if (GM_registerMenuCommand) {
          GM_registerMenuCommand('Image Viewer Settings', handler)
        } else {
          unsafeWindow.imageViewer = {
            settings: handler
          }
        }
      }
    }
  })()

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

  var css =
    "@keyframes spin{0%{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(1turn)}}.iv-icon{position:relative}.iv-icon:after,.iv-image-link img:after{content:\"\";position:absolute;z-index:2;top:50%;left:50%;width:100%;height:100%;transform:translate(-50%,-50%);background-repeat:no-repeat;background-position:50%;background-size:contain}.iv-icon--hover:after{transition:opacity .35s ease;opacity:0}.iv-icon--hover:hover:after{opacity:1}.iv-icon--size-button:after{width:50px;height:50px}.iv-icon--type-expand:after{width:70%;height:70%;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M9.5 13.09l1.41 1.41-4.5 4.5H10v2H3v-7h2v3.59l4.5-4.5m1.41-3.59L9.5 10.91 5 6.41V10H3V3h7v2H6.41l4.5 4.5m3.59 3.59l4.5 4.5V14h2v7h-7v-2h3.59l-4.5-4.5 1.41-1.41M13.09 9.5l4.5-4.5H14V3h7v7h-2V6.41l-4.5 4.5-1.41-1.41z'/%3E%3C/svg%3E\")}.iv-icon--type-loading:after{animation:spin 1s linear infinite;opacity:1;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff'%3E%3Cpath d='M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z'/%3E%3C/svg%3E\")!important}.iv-icon--type-zoom:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z'/%3E%3C/svg%3E\")}.iv-icon--type-next:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\")}.iv-icon--type-previous:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\")}.iv-icon--type-close:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\")}.iv-icon--type-image-broken:after,.iv-image-link img:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff'%3E%3Cpath d='M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2m-3 6.42l3 3.01V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6.58l3 2.99 4-4 4 4'/%3E%3C/svg%3E\")}.iv-image-link{display:inline-flex;min-width:50px;min-height:50px;margin:3px;padding:4px;border:1px solid rgba(0,0,0,.2);box-shadow:1px 1px 3px rgba(0,0,0,.5);vertical-align:top}.iv-image-link img{margin:0}.iv-image-link var.postImg{display:flex;align-items:center;justify-content:center;width:100%}.iv-image-link:before{content:\"\";position:absolute;z-index:1;top:4px;right:4px;bottom:4px;left:4px;transition:opacity .35s ease;opacity:0;background-color:rgba(0,0,0,.5)}.iv-image-link.iv-icon--type-loading:before,.iv-image-link:hover:before{opacity:1}.iv-image-link img:after,.iv-image-link img:before{content:\"\";position:absolute}.iv-image-link img:before{top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.2)}.iv-image-link img:after{z-index:0;width:35px;height:35px}.iv-image-view{display:flex;flex-direction:column;height:0;transition:opacity .35s ease-out;opacity:0;background-color:rgba(0,0,0,.8);color:#fff;-moz-user-select:none;user-select:none}body.iv-image-view--open{overflow:hidden}.iv-image-view--open .iv-image-view{position:fixed;z-index:3;top:0;right:0;bottom:0;left:0;height:auto;opacity:1}.iv-image-view__body,.iv-image-view__footer,.iv-image-view__header{display:flex}.iv-image-view__body{position:relative;height:100%;overflow:auto}.iv-image-view__body::-webkit-scrollbar{width:20px}.iv-image-view__body::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.8)}.iv-image-view__body::-webkit-scrollbar-track{background-color:hsla(0,0%,100%,.8)}.iv-image-view__footer-wrapper,.iv-image-view__header-wrapper{z-index:1}.iv-image-view__header-wrapper{box-shadow:0 3px 7px rgba(0,0,0,.7)}.iv-image-view__footer-wrapper{box-shadow:0 -3px 7px rgba(0,0,0,.7)}.iv-image-view__footer,.iv-image-view__header{background-color:rgba(0,0,0,.8)}.iv-image-view__header{justify-content:space-between}.iv-image-view__footer{justify-content:center}.iv-image-view__number{display:flex;align-items:center;padding:0 40px;font-size:1.125rem}.iv-image-view__backdrop{position:absolute;top:0;left:0;width:100%;height:100%}.iv-image-view__image{z-index:2;flex:0 1;max-width:100%;max-height:100%;margin:auto;object-fit:contain;transition:opacity .35s ease-out;opacity:1}.iv-icon--error .iv-image-view__image,.iv-icon--loading .iv-image-view__image{opacity:0}.iv-image-view--full-height .iv-image-view__image{max-height:none;cursor:-webkit-grab;cursor:grab}.iv-image-view--full-height .iv-image-view__image--grabbing{cursor:-webkit-grabbing;cursor:grabbing}.iv-image-view--full-height .iv-icon--type-expand{background-color:hsla(0,0%,100%,.1)}.iv-icon-button{width:50px;height:50px;transition:all .35s ease-out}.iv-icon-button--small{width:25px;height:25px}.iv-icon-button+.iv-icon-button{margin-left:5px}.iv-icon-button:hover{background-color:hsla(0,0%,100%,.1)}.iv-icon-button--active,.iv-icon-button:active{background-color:hsla(0,0%,100%,.2)}.iv-config-form{display:none;top:10px;left:10px;flex-direction:column;width:50%;max-width:500px;height:50%;padding:10px;background-color:rgba(0,0,0,.85);color:#fff}.iv-config-form--open{display:flex;position:fixed}.iv-config-form__header{display:flex;align-items:center;padding:10px}.iv-config-form__header-title{flex-grow:1}.iv-config-form__options{display:flex;flex-flow:column wrap;flex-grow:1;overflow:auto}.iv-config-form__label{display:flex;flex:0 0 auto;align-items:center;padding:10px;transition:all .35s ease-out}.iv-config-form__label:hover{background-color:hsla(0,0%,100%,.15)}.iv-config-form__checkbox{margin:0 5px 0 0}"

  var initViewer = (function() {
    const CLASSES = {
      imageLink: 'js-image-link',
      imageLinkZoom: 'iv-icon--type-zoom',
      imageLinkHover: 'iv-icon--hover',
      brokenImage: 'iv-icon--type-image-broken',
      loading: 'iv-icon--type-loading',
      open: 'iv-image-view--open',
      fullHeight: 'iv-image-view--full-height',
      grabbing: 'iv-image-view__image--grabbing',
      buttonActive: 'iv-icon-button--active'
    }

    const SELECTORS = {
      imageLink: `.${CLASSES.imageLink}`
    }

    const EMPTY_SRC =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI='

    const elements = {
      container: null,
      image: null,
      imageContainer: null,
      imageNumber: null,
      imageTotal: null,
      buttons: {
        next: null,
        previous: null,
        close: null,
        toggleFullHeight: null
      }
    }

    const state = {
      firstClick: true,
      open: false,
      currentLink: null,
      linksSet: [],
      getCurrentLinkIndex() {
        return this.linksSet.indexOf(this.currentLink)
      },
      getLastLinkIndex() {
        return this.linksSet.length - 1
      },
      dragPosition: null,
      dragging: false
    }

    const image = {
      async show(link) {
        const container = elements.container
        const img = elements.image

        state.currentLink = link
        elements.imageNumber.textContent = state.getCurrentLinkIndex() + 1

        if (state.open) {
          img.src = EMPTY_SRC

          if (link.classList.contains(CLASSES.brokenImage)) {
            container.classList.add(CLASSES.brokenImage)

            return
          } else {
            container.classList.remove(CLASSES.brokenImage)
            container.classList.add(CLASSES.loading)
          }
        } else {
          link.classList.replace(CLASSES.imageLinkZoom, CLASSES.loading)
        }

        let imageUrl = link.dataset['imgUrl']

        if (!imageUrl) {
          imageUrl = await urlExtractor.getImageUrl(link)
          if (!imageUrl) {
            image.markAsBroken(link)
            return
          }
          link.dataset['imgUrl'] = imageUrl
        }

        try {
          await image.preload(imageUrl)
          img.src = imageUrl

          if (state.open) {
            container.classList.remove(CLASSES.loading)
          } else {
            link.classList.replace(CLASSES.loading, CLASSES.imageLinkZoom)

            document.body.classList.add(CLASSES.open)
            state.open = true
          }
        } catch (e) {
          // eslint-disable-next-line
          if (GM_openInTab) {

            GM_openInTab(imageUrl)
          }

          link.classList.remove(CLASSES.imageLink)
          image.markAsBroken(link)

          $.attributes(link, { target: '_blank' })
        }
      },

      preload(url) {
        return new Promise((resolve, reject) => {
          let imageObj = new Image()

          imageObj.onload = resolve
          imageObj.onerror = reject

          imageObj.src = url
        })
      },

      hide() {
        document.body.classList.remove(CLASSES.open)
        state.open = false
        state.currentLink = null
        elements.image.src = EMPTY_SRC
        events.keyboard.unbind()
      },

      next() {
        const currentIndex = state.getCurrentLinkIndex()
        const newIndex =
          currentIndex < state.getLastLinkIndex() ? currentIndex + 1 : 0

        image.show(state.linksSet[newIndex])
      },

      previous() {
        const currentIndex = state.getCurrentLinkIndex()
        const newIndex =
          currentIndex === 0 ? state.getLastLinkIndex() : currentIndex - 1

        image.show(state.linksSet[newIndex])
      },

      toggleFullHeight() {
        elements.container.classList.toggle(CLASSES.fullHeight)
      },

      markAsBroken(link) {
        if (state.open) {
          elements.container.classList.replace(
            CLASSES.loading,
            CLASSES.brokenImage
          )
          link.classList.replace(CLASSES.imageLinkZoom, CLASSES.brokenImage)
        } else {
          link.classList.replace(CLASSES.loading, CLASSES.brokenImage)
        }
      }
    }

    const events = {
      linkClick(e) {
        e.preventDefault()

        if (state.firstClick) {
          create.viewContainer()
          state.firstClick = false
        }

        let link = e.target

        state.linksSet = $$(SELECTORS.imageLink, link.parentNode)

        elements.imageTotal.textContent = state.linksSet.length

        events.keyboard.bind()

        image.show(link)
      },

      keyboard: {
        bind() {
          document.addEventListener('keydown', events.keyboard.handler, true)
        },
        unbind() {
          document.removeEventListener('keydown', events.keyboard.handler, true)
        },
        handler(e) {
          if (e.defaultPrevented || e.repeat) {
            return
          }

          switch (e.key) {
            case 'ArrowRight':
              image.next()
              break

            case 'ArrowLeft':
              image.previous()
              break

            case 'Escape':
              image.hide()
              break

            case ' ':
              image.toggleFullHeight()
              break

            default:
              return
          }

          e.preventDefault()
        }
      },

      mouse(e) {
        switch (e.type) {
          case 'mousedown':
            state.dragging = true
            state.dragPosition = e.clientY
            elements.image.classList.add(CLASSES.grabbing)
            break

          case 'mousemove':
            if (state.dragging) {
              elements.imageContainer.scrollTop -=
                e.clientY - state.dragPosition
              state.dragPosition = e.clientY
            }
            break

          case 'mouseup':
          case 'mouseout':
            state.dragging = false
            elements.image.classList.remove(CLASSES.grabbing)
            break

          case 'dblclick':
            image.toggleFullHeight()
            break

          default:
            return
        }

        e.preventDefault()
      }
    }

    const create = {
      viewContainer() {
        elements.container = $.create('div', {
          className: 'iv-image-view iv-icon iv-icon--size-button',
          contents: [
            create.viewContainerHeader(),
            create.viewContainerBody(),
            create.viewContainerFooter()
          ]
        })

        document.body.appendChild(elements.container)
      },

      viewContainerBody() {
        elements.image = $.create('img', {
          className: 'iv-image-view__image',
          events: {
            'mousedown mouseup mousemove mouseout dblclick': events.mouse
          }
        })

        elements.imageContainer = $.create('div', {
          className: 'iv-image-view__body',
          contents: [
            {
              tag: 'div',
              className: 'iv-image-view__backdrop',
              events: {
                click: image.hide
              }
            },
            elements.image
          ]
        })

        return elements.imageContainer
      },

      viewContainerHeader() {
        elements.imageNumber = document.createElement('span')
        elements.imageTotal = document.createElement('span')
        let imageNumber = $.create('div', {
          className: 'iv-image-view__number',
          contents: [elements.imageNumber, '/', elements.imageTotal]
        })

        elements.buttons.close = create.toolbarButton(
          'Close (Esc)',
          'close',
          image.hide
        )

        return {
          tag: 'div',
          className: 'iv-image-view__header-wrapper',
          contents: {
            tag: 'div',
            className: 'iv-image-view__header',
            contents: [imageNumber, elements.buttons.close]
          }
        }
      },

      viewContainerFooter() {
        const buttons = elements.buttons
        buttons.previous = create.toolbarButton(
          'Previous (←)',
          'previous',
          image.previous
        )
        buttons.toggleFullHeight = create.toolbarButton(
          'Toggle full height (Space)',
          'expand',
          image.toggleFullHeight
        )
        buttons.next = create.toolbarButton('Next (→)', 'next', image.next)

        return {
          tag: 'div',
          className: 'iv-image-view__footer-wrapper',
          contents: {
            tag: 'div',
            className: 'iv-image-view__footer',
            contents: [buttons.previous, buttons.toggleFullHeight, buttons.next]
          }
        }
      },

      toolbarButton(title, icon, handler) {
        return $.create('a', {
          href: '#',
          title: title,
          className: `iv-icon-button iv-icon iv-icon--type-${icon}`,
          events: {
            click: e => {
              e.preventDefault()
              handler()
            }
          }
        })
      }
    }

    return function(hosts) {
      addStyle(css)

      const container = $('body')

      const linkClasses = `${
        CLASSES.imageLink
      } iv-image-link iv-icon iv-icon--hover ${
        CLASSES.imageLinkZoom
      } iv-icon--size-button`

      const enabledHosts = Object.keys(hosts).filter(
        hostName => hosts[hostName]
      )
      const linkSelector = urlExtractor.getLinksSelector(enabledHosts)
      $.set($$(linkSelector, container), {
        className: linkClasses
      })

      $.delegate(container, 'click', SELECTORS.imageLink, events.linkClick)
    }
  })()

  $.ready().then(async () => {
    const hostConfig = await config.getHostConfig()

    initViewer(hostConfig.hosts)

    config.init(hostConfig)
  })
})()
