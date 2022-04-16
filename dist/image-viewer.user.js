// ==UserScript==
// @name        Image Viewer
// @description Allows viewing full image without leaving the page
// @namespace   https://github.com/nikolay-borzov
// @version     1.1.9
// @author      nikolay-borzov
// @license     MIT
// @icon        https://raw.githubusercontent.com/nikolay-borzov/user-scripts/master/image-viewer/icon.png
// @homepageURL https://github.com/nikolay-borzov/user-scripts
// @supportURL  https://github.com/nikolay-borzov/user-scripts/issues
// @include     *
// @connect     www.imagebam.com
// @connect     imagevenue.com
// @connect     www.turboimagehost.com
// @connect     fastpic.ru
// @connect     radikal.ru
// @run-at      document-start
// @compatible  chrome
// @compatible  firefox
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @grant       GM_setValue
// @grant       GM.setValue
// @grant       GM_getValue
// @grant       GM.getValue
// @grant       GM_registerMenuCommand
// ==/UserScript==
;(function () {
  'use strict'

  /* global Bliss */
  // eslint-disable-next-line
  !(function(){function t(e,n,i){return n=void 0===n?1:n,i=i||n+1,i-n<=1?function(){if(arguments.length<=n||"string"===r.type(arguments[n]))return e.apply(this,arguments);var t,i=arguments[n];for(var o in i){var s=Array.prototype.slice.call(arguments);s.splice(n,1,o,i[o]),t=e.apply(this,s);}return t}:t(t(e,n+1,i),n,i-1)}function e(t,r,i){var o=n(i);if("string"===o){var s=Object.getOwnPropertyDescriptor(r,i);!s||s.writable&&s.configurable&&s.enumerable&&!s.get&&!s.set?t[i]=r[i]:(delete t[i],Object.defineProperty(t,i,s));}else if("array"===o)i.forEach(function(n){n in r&&e(t,r,n);});else for(var a in r)i&&("regexp"===o&&!i.test(a)||"function"===o&&!i.call(r,a))||e(t,r,a);return t}function n(t){if(null===t)return "null";if(void 0===t)return "undefined";var e=(Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1]||"").toLowerCase();return "number"==e&&isNaN(t)?"nan":e}var r=self.Bliss=e(function(t,e){return 2==arguments.length&&!e||!t?null:"string"===r.type(t)?(e||document).querySelector(t):t||null},self.Bliss);e(r,{extend:e,overload:t,type:n,property:r.property||"_",listeners:self.WeakMap?new WeakMap:new Map,original:{addEventListener:(self.EventTarget||Node).prototype.addEventListener,removeEventListener:(self.EventTarget||Node).prototype.removeEventListener},sources:{},noop:function(){},$:function(t,e){return t instanceof Node||t instanceof Window?[t]:2!=arguments.length||e?Array.prototype.slice.call("string"==typeof t?(e||document).querySelectorAll(t):t||[]):[]},defined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},create:function(t,e){return t instanceof Node?r.set(t,e):(1===arguments.length&&("string"===r.type(t)?e={}:(e=t,t=e.tag,e=r.extend({},e,function(t){return "tag"!==t}))),r.set(document.createElement(t||"div"),e))},each:function(t,e,n){n=n||{};for(var r in t)n[r]=e.call(t,r,t[r]);return n},ready:function(t,e,n){if("function"!=typeof t||e||(e=t,t=void 0),t=t||document,e&&("loading"!==t.readyState?e():r.once(t,"DOMContentLoaded",function(){e();})),!n)return new Promise(function(e){r.ready(t,e,!0);})},Class:function(t){var e,n=["constructor","extends","abstract","static"].concat(Object.keys(r.classProps)),i=t.hasOwnProperty("constructor")?t.constructor:r.noop;2==arguments.length?(e=arguments[0],t=arguments[1]):(e=function(){if(this.constructor.__abstract&&this.constructor===e)throw new Error("Abstract classes cannot be directly instantiated.");e["super"]&&e["super"].apply(this,arguments),i.apply(this,arguments);},e["super"]=t["extends"]||null,e.prototype=r.extend(Object.create(e["super"]?e["super"].prototype:Object),{constructor:e}),e.prototype["super"]=e["super"]?e["super"].prototype:null,e.__abstract=!!t["abstract"]);var o=function(t){return this.hasOwnProperty(t)&&n.indexOf(t)===-1};if(t["static"]){r.extend(e,t["static"],o);for(var s in r.classProps)s in t["static"]&&r.classProps[s](e,t["static"][s]);}r.extend(e.prototype,t,o);for(var s in r.classProps)s in t&&r.classProps[s](e.prototype,t[s]);return e},classProps:{lazy:t(function(t,e,n){return Object.defineProperty(t,e,{get:function(){var t=n.call(this);return Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0}),t},set:function(t){Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0});},configurable:!0,enumerable:!0}),t}),live:t(function(t,e,n){return "function"===r.type(n)&&(n={set:n}),Object.defineProperty(t,e,{get:function(){var t=this["_"+e],r=n.get&&n.get.call(this,t);return void 0!==r?r:t},set:function(t){var r=this["_"+e],i=n.set&&n.set.call(this,t,r);this["_"+e]=void 0!==i?i:t;},configurable:n.configurable,enumerable:n.enumerable}),t})},include:function(){var t=arguments[arguments.length-1],e=2===arguments.length&&arguments[0],n=document.createElement("script");return e?Promise.resolve():new Promise(function(e,i){r.set(n,{async:!0,onload:function(){e(),n.parentNode&&n.parentNode.removeChild(n);},onerror:function(){i();},src:t,inside:document.head});})},fetch:function(t,n){if(!t)throw new TypeError("URL parameter is mandatory and cannot be "+t);var i=e({url:new URL(t,location),data:"",method:"GET",headers:{},xhr:new XMLHttpRequest},n);i.method=i.method.toUpperCase(),r.hooks.run("fetch-args",i),"GET"===i.method&&i.data&&(i.url.search+=i.data),document.body.setAttribute("data-loading",i.url),i.xhr.open(i.method,i.url.href,i.async!==!1,i.user,i.password);for(var o in n)if("upload"===o)i.xhr.upload&&"object"==typeof n[o]&&r.extend(i.xhr.upload,n[o]);else if(o in i.xhr)try{i.xhr[o]=n[o];}catch(s){self.console&&console.error(s);}var a=Object.keys(i.headers).map(function(t){return t.toLowerCase()});"GET"!==i.method&&a.indexOf("content-type")===-1&&i.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(var c in i.headers)void 0!==i.headers[c]&&i.xhr.setRequestHeader(c,i.headers[c]);var u=new Promise(function(t,e){i.xhr.onload=function(){document.body.removeAttribute("data-loading"),0===i.xhr.status||i.xhr.status>=200&&i.xhr.status<300||304===i.xhr.status?t(i.xhr):e(r.extend(Error(i.xhr.statusText),{xhr:i.xhr,get status(){return this.xhr.status}}));},i.xhr.onerror=function(){document.body.removeAttribute("data-loading"),e(r.extend(Error("Network Error"),{xhr:i.xhr}));},i.xhr.ontimeout=function(){document.body.removeAttribute("data-loading"),e(r.extend(Error("Network Timeout"),{xhr:i.xhr}));},i.xhr.send("GET"===i.method?null:i.data);});return u.xhr=i.xhr,u},value:function(t){var e="string"!==r.type(t);return r.$(arguments).slice(+e).reduce(function(t,e){return t&&t[e]},e?t:self)}}),r.Hooks=new r.Class({add:function(t,e,n){if("string"==typeof arguments[0])(Array.isArray(t)?t:[t]).forEach(function(t){this[t]=this[t]||[],e&&this[t][n?"unshift":"push"](e);},this);else for(var t in arguments[0])this.add(t,arguments[0][t],arguments[1]);},run:function(t,e){this[t]=this[t]||[],this[t].forEach(function(t){t.call(e&&e.context?e.context:e,e);});}}),r.hooks=new r.Hooks;r.property;r.Element=function(t){this.subject=t,this.data={},this.bliss={};},r.Element.prototype={set:t(function(t,e){t in r.setProps?r.setProps[t].call(this,e):t in this?this[t]=e:this.setAttribute(t,e);},0),transition:function(t,e){return e=+e||400,new Promise(function(n,i){if("transition"in this.style){var o=r.extend({},this.style,/^transition(Duration|Property)$/);r.style(this,{transitionDuration:(e||400)+"ms",transitionProperty:Object.keys(t).join(", ")}),r.once(this,"transitionend",function(){clearTimeout(s),r.style(this,o),n(this);});var s=setTimeout(n,e+50,this);r.style(this,t);}else r.style(this,t),n(this);}.bind(this))},fire:function(t,e){var n=document.createEvent("HTMLEvents");return n.initEvent(t,!0,!0),this.dispatchEvent(r.extend(n,e))},bind:t(function(t,e){if(arguments.length>1&&("function"===r.type(e)||e.handleEvent)){var n=e;e="object"===r.type(arguments[2])?arguments[2]:{capture:!!arguments[2]},e.callback=n;}var i=r.listeners.get(this)||{};t.trim().split(/\s+/).forEach(function(t){if(t.indexOf(".")>-1){t=t.split(".");var n=t[1];t=t[0];}i[t]=i[t]||[],0===i[t].filter(function(t){return t.callback===e.callback&&t.capture==e.capture}).length&&i[t].push(r.extend({className:n},e)),r.original.addEventListener.call(this,t,e.callback,e);},this),r.listeners.set(this,i);},0),unbind:t(function(t,e){if(e&&("function"===r.type(e)||e.handleEvent)){var n=e;e=arguments[2];}"boolean"==r.type(e)&&(e={capture:e}),e=e||{},e.callback=e.callback||n;var i=r.listeners.get(this);(t||"").trim().split(/\s+/).forEach(function(t){if(t.indexOf(".")>-1){t=t.split(".");var n=t[1];t=t[0];}if(t&&e.callback)return r.original.removeEventListener.call(this,t,e.callback,e.capture);if(i)for(var o in i)if(!t||o===t)for(var s,a=0;s=i[o][a];a++)n&&n!==s.className||e.callback&&e.callback!==s.callback||!!e.capture!=!!s.capture||(i[o].splice(a,1),r.original.removeEventListener.call(this,o,s.callback,s.capture),a--);},this);},0)},r.setProps={style:function(t){for(var e in t)e in this.style?this.style[e]=t[e]:this.style.setProperty(e,t[e]);},attributes:function(t){for(var e in t)this.setAttribute(e,t[e]);},properties:function(t){r.extend(this,t);},events:function(t){if(1!=arguments.length||!t||!t.addEventListener)return r.bind.apply(this,[this].concat(r.$(arguments)));var e=this;if(r.listeners){var n=r.listeners.get(t);for(var i in n)n[i].forEach(function(t){r.bind(e,i,t.callback,t.capture);});}for(var o in t)0===o.indexOf("on")&&(this[o]=t[o]);},once:t(function(t,e){var n=this,i=function(){return r.unbind(n,t,i),e.apply(n,arguments)};r.bind(this,t,i,{once:!0});},0),delegate:t(function(t,e,n){r.bind(this,t,function(t){t.target.closest(e)&&n.call(this,t);});},0,2),contents:function(t){(t||0===t)&&(Array.isArray(t)?t:[t]).forEach(function(t){var e=r.type(t);/^(string|number)$/.test(e)?t=document.createTextNode(t+""):"object"===e&&(t=r.create(t)),t instanceof Node&&this.appendChild(t);},this);},inside:function(t){t&&t.appendChild(this);},before:function(t){t&&t.parentNode.insertBefore(this,t);},after:function(t){t&&t.parentNode.insertBefore(this,t.nextSibling);},start:function(t){t&&t.insertBefore(this,t.firstChild);},around:function(t){t&&t.parentNode&&r.before(this,t),this.appendChild(t);}},r.Array=function(t){this.subject=t;},r.Array.prototype={all:function(t){var e=r.$(arguments).slice(1);return this[t].apply(this,e)}},r.add=t(function(t,e,n,i){n=r.extend({$:!0,element:!0,array:!0},n),"function"==r.type(e)&&(!n.element||t in r.Element.prototype&&i||(r.Element.prototype[t]=function(){return this.subject&&r.defined(e.apply(this.subject,arguments),this.subject)}),!n.array||t in r.Array.prototype&&i||(r.Array.prototype[t]=function(){var t=arguments;return this.subject.map(function(n){return n&&r.defined(e.apply(n,t),n)})}),n.$&&(r.sources[t]=r[t]=e,(n.array||n.element)&&(r[t]=function(){var e=[].slice.apply(arguments),i=e.shift(),o=n.array&&Array.isArray(i)?"Array":"Element";return r[o].prototype[t].apply({subject:i},e)})));},0),r.add(r.Array.prototype,{element:!1}),r.add(r.Element.prototype),r.add(r.setProps),r.add(r.classProps,{element:!1,array:!1});var i=document.createElement("_");r.add(r.extend({},HTMLElement.prototype,function(t){return "function"===r.type(i[t])}),null,!0);}());

  // eslint-disable-next-line
  const $ = Bliss;
  // eslint-disable-next-line
  const $$ = Bliss.$;

  function hasOwnProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }

  const gmPolyfill = (function () {
    const gmMethodMap = {
      getValue: 'GM_getValue',
      setValue: 'GM_setValue',
      openInTab: 'GM_openInTab',
    }

    return function polyfill(methodName) {
      if (hasOwnProperty(gmMethodMap, methodName)) {
        return typeof GM !== 'undefined' && methodName in GM
          ? GM[methodName]
          : function (...args) {
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

  const addStyle =
    'GM_addStyle' in window
      ? GM_addStyle // eslint-disable-line camelcase
      : (css) => {
          const head = document.getElementsByTagName('head')[0]

          if (head) {
            const style = document.createElement('style')

            style.type = 'text/css'
            style.innerHTML = css
            head.appendChild(style)

            return css
          }
        }

  let request$1

  const getRequest = () => {
    if (!request$1) {
      const xmlHttpRequest =
        typeof GM !== 'undefined' && 'xmlHttpRequest' in GM
          ? GM.xmlHttpRequest
          : GM_xmlhttpRequest; // eslint-disable-line

      request$1 = function (url, { method = 'GET' } = {}) {
        return new Promise((resolve, reject) => {
          xmlHttpRequest({
            url,
            method,
            onload: resolve,
            onerror: reject,
          })
        })
      }
    }
    return request$1
  }

  let store

  const getStore = () => {
    if (!store) {
      store = {
        get: gmPolyfill('getValue'),
        set: gmPolyfill('setValue'),
      }
    }

    return store
  }

  const request = getRequest()

  async function getPageHtml(pageUrl) {
    const response = await request(pageUrl)

    return response.responseText
  }

  async function getUrlFromPage(link, extractor) {
    const html = await getPageHtml(link.url)

    const match = extractor.imageUrlRegEx.exec(html)

    let url

    if (match) {
      if (match.groups) {
        url = match.groups.url
      } else {
        url = match[1]
      }
    }

    if (!url) {
      console.warn(`[image-viewer] Unable to get URL from page ${link.url}`)
    }

    return url
  }

  const fastpic = {
    name: 'FastPic',
    linkRegEx: /^http.?:\/\/fastpic\.ru\/view/,
    imageUrlRegEx: /src="(?<url>[^"]+)" class="image img-fluid"/,
    getUrl: getUrlFromPage,
  }

  const URL_PARTS_REGEXP = /i(\d+).+big(\/\d+\/\d+\/).+\/([^/]+)$/

  const fastpicDirect = {
    name: 'FastPic (direct link)',
    linkRegEx: /fastpic\.ru\/big/,

    async getUrl(link) {
      let hostLink = link.url

      if (hostLink.includes('?')) {
        const urlObject = new URL(hostLink)
        const params = new URLSearchParams(urlObject.search)
        for (const param of params.values()) {
          if (fastpicDirect.linkRegEx.test(param)) {
            hostLink = param
            break
          }
        }
      }

      const [, index, date, filename] = URL_PARTS_REGEXP.exec(hostLink)

      const url = `https://fastpic.ru/view/${index}${date}${filename}.html`

      return fastpic.getUrl({ ...link, url }, fastpic)
    },
  }

  const imagebam = {
    name: 'ImageBam',
    linkRegEx: /^http:\/\/www\.imagebam\.com\/image/,
    imageUrlRegEx: /property="og:image" content="([^"]*)"/,
    getUrl: getUrlFromPage,
  }

  const DATE_PATTERN = /(\d{4})\.(\d{2})\.(\d{2})/

  const imageban = {
    name: 'ImageBan.ru',
    linkRegEx: /\/\/imageban\.ru\/show/,

    async getUrl(link) {
      return link.thumbnailUrl
        .replace('thumbs', 'out')
        .replace(DATE_PATTERN, '$1/$2/$3')
    },
  }

  const imagebanDirect = {
    name: 'ImageBan.ru (direct link)',
    linkRegEx: /imageban\.ru\/out/,

    async getUrl(link) {
      return link.url
    },
  }

  const imagetwist = {
    name: 'ImageTwist',
    linkRegEx: /imagetwist\.com/,

    async getUrl(link) {
      const imageName = link.url.split('/').pop().replace('.html', '')
      const extension = imageName.split('.').pop()
      const imageUrl = link.thumbnailUrl
        .replace('/th/', '/i/')
        .slice(0, -extension.length)

      return `${imageUrl}${extension}/${imageName}`
    },
  }

  const HOST_REPLACE_REG_EX$2 = /(picturelol|picshick|imageshimage)/

  const imagetwistBased = {
    name: 'ImageTwist based (legacy)',
    hosts: ['Picturelol.com', 'PicShick.com', 'Imageshimage.com'],
    linkRegEx: /^https?:\/\/(picturelol|picshick|imageshimage)\.com/,

    async getUrl(link) {
      const imageName = link.url.split('/').pop()
      const imageUrl = link.thumbnailUrl
        .replace('/th/', '/i/')
        .replace(HOST_REPLACE_REG_EX$2, 'imagetwist')

      return `${imageUrl}/${imageName}`
    },
  }

  const imagevenueLegacy = {
    name: 'ImageVenue.com',

    linkRegEx: /(imagevenue.com\/img.php|www.imagevenue.com\/\\w+$)/,
    imageUrlRegEx: /data-toggle="full">\W*<img src="(?<url>[^"]*)/im,

    getUrl: getUrlFromPage,
  }

  const imgadult = {
    name: 'ImgAdult.com',
    linkRegEx: /^https:\/\/imgadult\.com/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('/small/', '/big/')
    },
  }

  const imgbb = {
    name: 'imgbb.com',
    linkRegEx: /^https:\/\/ibb\.co/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('//thumb', '//image')
    },
  }

  const imgbox = {
    name: 'imgbox.com',
    linkRegEx: /^http:\/\/imgbox\.com/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('/thumbs', '/images').replace('_t', '_o')
    },
  }

  const imgbum = {
    name: 'imgbum.net',
    linkRegEx: /^http:\/\/imgbum\.net/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('-thumb', '')
    },
  }

  const imgchilibum = {
    name: 'imgchilibum.ru',
    linkRegEx: /^http:\/\/imgchilibum\.ru\/v/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('_s/', '_b/')
    },
  }

  const imgdrive = {
    name: 'ImgDrive.net',
    linkRegEx: /^https:\/\/imgdrive\.net/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('small', 'big')
    },
  }

  const imgtaxi = {
    name: 'imgtaxi.com',
    linkRegEx: /^https:\/\/imgtaxi\.com/,

    async getUrl(link) {
      return link.thumbnailUrl
        .replace('/small/', '/big/')
        .replace('/small-medium/', '/big/')
    },
  }

  const imx = {
    name: 'IMX.to',
    linkRegEx: /^https:\/\/imx\.to/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('/imx', '/i.imx').replace('/u/t/', '/i/')
    },
  }

  const lostpic = {
    name: 'Lostpic.net',
    linkRegEx: /^http:\/\/lostpic\.net/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('.th', '').replace('http:', 'https:')
    },
  }

  const moneyPic = {
    name: 'money-pic.ru',
    linkRegEx: /^http:\/\/money-pic\.ru/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('-thumb', '')
    },
  }

  const nikapic = {
    name: 'nikapic.ru',
    linkRegEx: /^http:\/\/nikapic\.ru/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('/small/', '/big/')
    },
  }

  const picage = {
    name: 'picage.ru',
    linkRegEx: /^http:\/\/picage\.ru/,

    async getUrl(link) {
      return link.thumbnailUrl
        .replace('picage', 'pic4you')
        .replace('-thumb', '')
    },
  }

  const piccash = {
    name: 'PicCash.net',
    linkRegEx: /^http:\/\/piccash\.net\//,

    async getUrl(link) {
      return link.thumbnailUrl.replace('_thumb', '_full').replace('-thumb', '')
    },
  }

  const HOST_REPLACE_REG_EX$1 = /(freescreens\.ru|imgclick\.ru|picclick\.ru|payforpic\.ru|picforall\.ru)/

  const picforall = {
    name: 'PicForAll.ru',
    hosts: [
      'freescreens.ru',
      'imgclick.ru',
      'picclick.ru',
      'payforpic.ru',
      'picforall.ru',
    ],
    linkRegEx: /^http:\/\/(freescreens\.ru|imgclick\.ru|picclick\.ru|payforpic\.ru|picforall\.ru)/,

    async getUrl(link) {
      return link.thumbnailUrl
        .replace(HOST_REPLACE_REG_EX$1, 'picpic.online')
        .replace('-thumb', '')
    },
  }

  const HOST_REPLACE_REG_EX = /(iceimg\.net|pixsense\.net|vestimage\.site|chaosimg\.site)/

  const pixsense = {
    name: 'PixSense',
    hosts: [
      'www.iceimg.net',
      'www.pixsense.net',
      'www.vestimage.site',
      'www.chaosimg.site',
    ],
    linkRegEx: /^http:\/\/www\.(iceimg\.net|pixsense\.net|vestimage\.site|chaosimg\.site)/,

    async getUrl(link) {
      return link.thumbnailUrl
        .replace(HOST_REPLACE_REG_EX, 'fortstore.net')
        .replace('small-', '')
        .replace('/small/', '/big/')
    },
  }

  const radikal = {
    name: 'Radikal.ru',
    linkRegEx: /https?:\/\/.\.radikal\.ru\//,

    async getUrl(link) {
      return link.url
    },
  }

  const radikalLegacy = {
    name: 'Radikal.ru (legacy)',
    linkRegEx: /^http:\/\/radikal\.ru\//,
    imageUrlRegEx: /id="imgFullSize" src="(?<url>[^"]+)"/,
    getUrl: getUrlFromPage,
  }

  const stuffed = {
    name: 'stuffed.ru',
    linkRegEx: /^http:\/\/stuffed\.ru/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('-thumb', '')
    },
  }

  const turboimagehost = {
    name: 'TurboImageHost',
    linkRegEx: /^https:\/\/www\.turboimagehost\.com\/p/,
    imageUrlRegEx: /property="og:image" content="([^"]*)"/,
    getUrl: getUrlFromPage,
  }

  const vfl = {
    name: 'VFL.ru',
    linkRegEx: /^http:\/\/vfl\.ru/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('_s', '')
    },
  }

  const xxxscreens = {
    name: 'XXXScreens.com',
    linkRegEx: /^http:\/\/xxxscreens\.com/,

    async getUrl(link) {
      return link.thumbnailUrl.replace('small/', 'big/')
    },
  }

  const hostExtractors = /* #__PURE__ */ Object.freeze({
    __proto__: null,
    fastpic: fastpic,
    fastpicDirect: fastpicDirect,
    imagebam: imagebam,
    imageban: imageban,
    imagebanDirect: imagebanDirect,
    imagetwist: imagetwist,
    imagetwistBased: imagetwistBased,
    imagevenueLegacy: imagevenueLegacy,
    imgadult: imgadult,
    imgbb: imgbb,
    imgbox: imgbox,
    imgbum: imgbum,
    imgchilibum: imgchilibum,
    imgdrive: imgdrive,
    imgtaxi: imgtaxi,
    imx: imx,
    lostpic: lostpic,
    moneyPic: moneyPic,
    nikapic: nikapic,
    picage: picage,
    piccash: piccash,
    picforall: picforall,
    pixsense: pixsense,
    radikal: radikal,
    radikalLegacy: radikalLegacy,
    stuffed: stuffed,
    turboimagehost: turboimagehost,
    vfl: vfl,
    xxxscreens: xxxscreens,
  })

  const urlExtractor = (function () {
    function sortCaseInsensitive(array, getValue) {
      return array
        .map((value, index) => ({
          index,
          value: getValue(value).toLowerCase(),
        }))
        .sort((a, b) => {
          if (a.value > b.value) {
            return 1
          }
          if (a.value < b.value) {
            return -1
          }
          return 0
        })
        .map((m) => array[m.index])
    }

    let extractorsActive = []

    const extractors = Object.values(hostExtractors).filter(Boolean)

    const extractorsByName = extractors.reduce((result, extractor) => {
      result[extractor.name] = extractor
      return result
    }, {})

    return {
      getImageHostsInfo() {
        const result = extractors.map((e) => ({
          name: e.name,
          description: e.hosts ? e.hosts.join(', ') : '',
        }))

        return sortCaseInsensitive(result, (value) => value.name)
      },

      getImageUrl(link) {
        const extractor = extractorsByName[link.host]

        return extractor.getUrl(link, extractor)
      },

      getHostNameMatcher(enabledHosts) {
        extractorsActive = extractors.filter((e) =>
          enabledHosts.includes(e.name)
        )

        let prevExtractor = null

        return (url) => {
          if (prevExtractor && prevExtractor.linkRegEx.test(url)) {
            return prevExtractor.name
          }

          const extractor = extractorsActive.find((e) => e.linkRegEx.test(url))

          if (extractor) {
            prevExtractor = extractor
            return extractor.name
          }

          return null
        }
      },
    }
  })()

  const config = (function () {
    const store = getStore()

    const CLASSES = {
      open: 'iv-config-form--open',
    }

    let configMenu = null
    const currentHost = unsafeWindow.location.host

    function showMenu(config) {
      createMenuElement(config).classList.add(CLASSES.open)
    }

    function createMenuElement(config) {
      if (!configMenu) {
        const rows = config.hosts.map(createConfigMenuRow)

        configMenu = $.create('div', {
          id: 'iv-config-form',
          className: 'iv-config-form',
          contents: [
            createMenuHeader(),
            {
              tag: 'div',
              className: 'iv-config-form__options',
              contents: rows,
            },
          ],
          delegate: {
            change: {
              '.js-iv-config-checkbox': (e) =>
                updateHostConfig(
                  config.storedConfig,
                  e.target.value,
                  e.target.checked
                ),
            },
          },
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
          click: (e) => {
            e.preventDefault()
            configMenu.classList.remove(CLASSES.open)
          },
        },
      })

      return {
        tag: 'div',
        className: 'iv-config-form__header',
        contents: [
          {
            tag: 'span',
            className: 'iv-config-form__header-title',
            contents: `Settings for ${currentHost}`,
          },
          closeButton,
        ],
      }
    }

    function createConfigMenuRow(host) {
      return $.create('label', {
        className: 'iv-config-form__label',
        title: host.description,
        contents: [
          {
            tag: 'input',
            type: 'checkbox',
            className: 'iv-config-form__checkbox js-iv-config-checkbox',
            checked: host.enabled,
            value: host.name,
          },
          host.name,
        ],
      })
    }

    function updateHostConfig(config, hostName, isEnabled) {
      config.hosts[hostName] = isEnabled
      store.set(currentHost, config)
    }

    async function getHostConfig() {
      const hosts = urlExtractor.getImageHostsInfo()
      const storedConfig = await store.get(currentHost, { hosts: {} })
      const enabledHosts = []

      hosts.forEach((host) => {
        const id = host.name
        const isEnabled =
          id in storedConfig.hosts ? storedConfig.hosts[id] : true

        host.enabled = isEnabled
        storedConfig.hosts[id] = isEnabled

        if (isEnabled) {
          enabledHosts.push(id)
        }
      })

      storedConfig.hosts = hosts.reduce((result, host) => {
        result[host.name] = host.enabled
        return result
      }, {})

      return {
        hosts,
        storedConfig,
        enabledHosts,
      }
    }

    return {
      async init() {
        const config = await getHostConfig()

        const handler = () => showMenu(config)

        // eslint-disable-next-line
        if (typeof GM_registerMenuCommand !== 'undefined') {
          GM_registerMenuCommand('Image Viewer Settings', handler)
        } else {
          unsafeWindow.imageViewer = {
            settings: handler,
          }
        }

        return config
      },
    }
  })()

  const css_248z =
    "@keyframes spin{0%{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(1turn)}}.iv-icon{position:relative}.iv-icon:after,.iv-image-link img:after{content:\"\";position:absolute;z-index:2;top:50%;left:50%;width:100%;height:100%;transform:translate(-50%,-50%);background-repeat:no-repeat;background-position:50%;background-size:contain}.iv-icon--hover:after{transition:opacity .35s ease;opacity:0}.iv-icon--hover:hover:after{opacity:1}.iv-icon--size-button:after{width:50px;height:50px}.iv-icon--type-loading:after{animation:spin 1s linear infinite;opacity:1;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff'%3E%3Cpath d='M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z'/%3E%3C/svg%3E\")!important}.iv-icon--type-zoom:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z'/%3E%3C/svg%3E\")}.iv-icon--type-next:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\")}.iv-icon--type-previous:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\")}.iv-icon--type-close:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E\")}.iv-icon--type-expand:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff'%3E%3Cpath d='M5 5h5v2H7v3H5V5m9 0h5v5h-2V7h-3V5m3 9h2v5h-5v-2h3v-3m-7 3v2H5v-5h2v3h3z'/%3E%3C/svg%3E\")}.iv-icon--type-shrink:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff'%3E%3Cpath d='M14 14h5v2h-3v3h-2v-5m-9 0h5v5H8v-3H5v-2m3-9h2v5H5V8h3V5m11 3v2h-5V5h2v3h3z'/%3E%3C/svg%3E\")}.iv-icon--type-image-broken:after,.iv-image-link img:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff'%3E%3Cpath d='M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2m-3 6.42l3 3.01V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6.58l3 2.99 4-4 4 4'/%3E%3C/svg%3E\")}.iv-image-link{display:inline-flex;min-width:50px;min-height:50px;margin:3px;padding:4px;border:1px solid rgba(0,0,0,.2);box-shadow:1px 1px 3px rgba(0,0,0,.5);vertical-align:top}.iv-image-link img{margin:0}.iv-image-link>:not(img){display:flex;align-items:center;justify-content:center;width:100%}.iv-image-link:before{content:\"\";position:absolute;z-index:1;top:4px;right:4px;bottom:4px;left:4px;transition:opacity .35s ease;opacity:0;background-color:rgba(0,0,0,.5)}.iv-image-link.iv-icon--type-loading:before,.iv-image-link:hover:before{opacity:1}.iv-image-link img:after,.iv-image-link img:before{content:\"\";position:absolute}.iv-image-link img:before{top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.2)}.iv-image-link img:after{z-index:0;width:35px;height:35px}.iv-image-view{display:none;flex-direction:column;height:0;transition:opacity .35s ease-out;opacity:0;background-color:rgba(0,0,0,.8);color:#fff;user-select:none}.iv-image-view--open body,html.iv-image-view--open{overflow:hidden}.iv-image-view--open .iv-image-view{display:flex;position:fixed;z-index:3;top:0;right:0;bottom:0;left:0;height:auto;opacity:1}.iv-image-view--single .single-hide{visibility:hidden}.iv-image-view__footer,.iv-image-view__header{display:flex;background-color:rgba(0,0,0,.8)}.iv-image-view__footer-wrapper,.iv-image-view__header-wrapper{z-index:2}.iv-image-view__header-wrapper{box-shadow:0 3px 7px rgba(0,0,0,.7)}.iv-image-view__footer-wrapper{box-shadow:0 -3px 7px rgba(0,0,0,.7)}.iv-image-view__header{justify-content:space-between}.iv-image-view__footer{justify-content:center}.iv-image-view__body{display:flex;position:relative;height:100%;overflow:auto}.iv-image-view__body::-webkit-scrollbar{width:20px}.iv-image-view__body::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.8)}.iv-image-view__body::-webkit-scrollbar-track{background-color:hsla(0,0%,100%,.8)}.iv-thumbnail-wrapper{display:flex;position:absolute;z-index:0;top:0;left:0;width:100%;height:100%}.iv-image-view__number{display:flex;align-items:center;padding:0 40px;font-size:18px}.iv-image-view__backdrop{position:fixed;z-index:1;top:0;left:0;width:100%;height:100%}.iv-image,.iv-thumbnail{max-width:100%;max-height:100%;object-fit:contain;margin:auto}.iv-image{z-index:2;transition:opacity .35s ease-out;opacity:1}.iv-thumbnail{filter:blur(5px)}.iv-icon--type-error .iv-image,.iv-image-view__image--loading .iv-image,.iv-image-view__image--thumbnail .iv-image{opacity:0}.iv-image-view__image--thumbnail .iv-thumbnail-wrapper{z-index:2}.iv-image-view--full-height .iv-image,.iv-image-view--full-height .iv-thumbnail{max-height:none;cursor:grab}.iv-image-view--full-height .iv-image--grabbing{cursor:grabbing}.iv-icon-button{width:50px;height:50px;transition:all .35s ease-out}.iv-icon-button--small{width:25px;height:25px}.iv-icon-button+.iv-icon-button{margin-left:5px}.iv-icon-button:hover{background-color:hsla(0,0%,100%,.1)}.iv-icon-button--active,.iv-icon-button:active{background-color:hsla(0,0%,100%,.2)}.iv-config-form{display:none;top:10px;left:10px;flex-direction:column;width:50%;max-width:500px;height:50%;padding:10px;background-color:rgba(0,0,0,.85);color:#fff}.iv-config-form--open{display:flex;position:fixed;z-index:3}.iv-config-form__header{display:flex;align-items:center;padding:10px}.iv-config-form__header-title{flex-grow:1}.iv-config-form__options{display:flex;flex-flow:column wrap;flex-grow:1;overflow:auto}.iv-config-form__label{display:flex;flex:0 0 auto;align-items:center;margin:0;padding:10px;transition:all .35s ease-out}.iv-config-form__label:hover{background-color:hsla(0,0%,100%,.15)}.iv-config-form__checkbox{margin:0 5px 0 0!important}"

  const initViewer = (function () {
    const CLASSES = {
      imageLink: 'js-image-link',
      imageLinkZoom: 'iv-icon--type-zoom',
      imageLinkHover: 'iv-icon--hover',
      brokenImage: 'iv-icon--type-image-broken',
      loadingIcon: 'iv-icon--type-loading',
      loading: 'iv-image-view__image--loading',
      thumbnail: 'iv-image-view__image--thumbnail',
      open: 'iv-image-view--open',
      single: 'iv-image-view--single',
      fullHeight: 'iv-image-view--full-height',
      iconExpand: 'iv-icon--type-expand',
      iconShrink: 'iv-icon--type-shrink',
      grabbing: 'iv-image--grabbing',
      buttonActive: 'iv-icon-button--active',
    }

    const SELECTORS = {
      imageLink: `.${CLASSES.imageLink}`,
    }

    const EMPTY_SRC =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI='

    const TRANSITION_DURATION = 350

    const elements = {
      container: null,
      image: null,
      imageThumbnail: null,
      imageContainer: null,
      imageNumber: null,
      imageTotal: null,
      buttons: {
        next: null,
        previous: null,
        close: null,
        toggleFullHeight: null,
      },
    }

    const state = {
      firstClick: true,
      open: false,
      currentLink: null,
      linksSet: [],
      isSingle: false,
      getCurrentLinkIndex() {
        return this.linksSet.indexOf(this.currentLink)
      },
      getLastLinkIndex() {
        return this.linksSet.length - 1
      },
      dragPosition: null,
      dragging: false,
    }

    const image = {
      async show(link) {
        const container = elements.container
        const img = elements.image
        const thumbnail = elements.imageThumbnail

        state.currentLink = link

        if (state.isSingle) {
          container.classList.add(CLASSES.single)
        } else {
          container.classList.remove(CLASSES.single)
          elements.imageNumber.textContent = state.getCurrentLinkIndex() + 1
        }

        if (!state.open) {
          document.documentElement.classList.add(CLASSES.open)
          state.open = true
        }

        img.src = EMPTY_SRC

        if (link.classList.contains(CLASSES.brokenImage)) {
          container.classList.add(CLASSES.brokenImage)

          return
        }

        container.classList.remove(CLASSES.brokenImage)

        container.classList.add(CLASSES.loading, CLASSES.loadingIcon)

        const isSizeKnown = !!link.dataset.ivWidth
        const thumbnailUrl = link.dataset.ivThumbnail

        if (isSizeKnown) {
          thumbnail.width = link.dataset.ivWidth
          thumbnail.src = thumbnailUrl

          container.classList.add(CLASSES.thumbnail)
        }

        let imageUrl = link.dataset.ivImgUrl

        if (!imageUrl) {
          imageUrl = await urlExtractor.getImageUrl({
            url: link.href,
            thumbnailUrl,
            host: link.dataset.ivHost,
          })

          if (!imageUrl) {
            image.markAsBroken(link)
            return
          }

          link.dataset.ivImgUrl = imageUrl
        }

        try {
          await image.preload(
            imageUrl,
            isSizeKnown ? null : image.setThumbnailSize
          )

          img.src = imageUrl

          container.classList.remove(
            CLASSES.thumbnail,
            CLASSES.loading,
            CLASSES.loadingIcon
          )

          setTimeout(image.hideThumbnail, TRANSITION_DURATION)
        } catch (e) {
          link.classList.remove(CLASSES.imageLink)
          image.markAsBroken(link)

          $.attributes(link, { target: '_blank' })
        }
      },

      preload(url, onSizeGet) {
        return new Promise((resolve, reject) => {
          const imageObject = new Image()

          imageObject.onload = resolve
          imageObject.onerror = reject

          imageObject.src = url

          if (onSizeGet) {
            image.getSize(imageObject).then(onSizeGet)
          }
        })
      },

      getSize(img) {
        return new Promise((resolve) => {
          const intervalId = setInterval(() => {
            if (img.naturalWidth) {
              clearInterval(intervalId)
              resolve({ width: img.naturalWidth, complete: img.complete })
            }
          }, 10)
        })
      },

      setThumbnailSize({ width, complete }) {
        elements.imageThumbnail.width = width
        elements.imageThumbnail.src = state.currentLink.dataset.ivThumbnail

        if (!complete) {
          elements.container.classList.add(CLASSES.thumbnail)
        }

        state.currentLink.dataset.ivWidth = width
      },

      hideThumbnail() {
        elements.imageThumbnail.removeAttribute('width')
        elements.imageThumbnail.src = EMPTY_SRC
      },

      hide() {
        document.documentElement.classList.remove(CLASSES.open)
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
        elements.buttons.toggleFullHeight.classList.toggle(CLASSES.iconExpand)
        elements.buttons.toggleFullHeight.classList.toggle(CLASSES.iconShrink)
      },

      markAsBroken(link) {
        elements.container.classList.replace(
          CLASSES.loadingIcon,
          CLASSES.brokenImage
        )
        elements.container.classList.remove(CLASSES.loading)
        link.classList.replace(CLASSES.imageLinkZoom, CLASSES.brokenImage)
      },
    }

    const events = {
      linkClick(e) {
        e.preventDefault()

        if (state.firstClick) {
          create.viewContainer()
          state.firstClick = false
        }

        const link = e.target

        state.linksSet = $$(SELECTORS.imageLink, link.parentNode)
        state.isSingle = state.linksSet.length === 1

        if (!state.isSingle) {
          elements.imageTotal.textContent = state.linksSet.length
        }

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
        },
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
      },
    }

    const create = {
      viewContainer() {
        elements.container = $.create('div', {
          className: 'iv-image-view iv-icon iv-icon--size-button',
          contents: [
            create.viewContainerHeader(),
            create.viewContainerBody(),
            create.viewContainerFooter(),
          ],
        })

        document.body.appendChild(elements.container)
      },

      viewContainerBody() {
        elements.image = $.create('img', {
          className: 'iv-image',
          events: {
            'mousedown mouseup mousemove mouseout dblclick': events.mouse,
          },
        })

        elements.imageThumbnail = $.create('img', {
          className: 'iv-thumbnail',
        })

        elements.imageContainer = $.create('div', {
          className: 'iv-image-view__body',
          contents: [
            {
              tag: 'div',
              className: 'iv-image-view__backdrop',
              events: {
                click: image.hide,
              },
            },
            {
              tag: 'div',
              className: 'iv-thumbnail-wrapper',
              contents: elements.imageThumbnail,
            },
            elements.image,
          ],
        })

        return elements.imageContainer
      },

      viewContainerHeader() {
        elements.imageNumber = document.createElement('span')
        elements.imageTotal = document.createElement('span')
        const imageNumber = $.create('div', {
          className: 'iv-image-view__number single-hide',
          contents: [elements.imageNumber, '/', elements.imageTotal],
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
            contents: [imageNumber, elements.buttons.close],
          },
        }
      },

      viewContainerFooter() {
        const buttons = elements.buttons
        buttons.previous = create.toolbarButton(
          'Previous (←)',
          'previous',
          image.previous,
          'single-hide'
        )
        buttons.toggleFullHeight = create.toolbarButton(
          'Toggle full height (Space)',
          'expand',
          image.toggleFullHeight
        )
        buttons.next = create.toolbarButton(
          'Next (→)',
          'next',
          image.next,
          'single-hide'
        )

        return {
          tag: 'div',
          className: 'iv-image-view__footer-wrapper',
          contents: {
            tag: 'div',
            className: 'iv-image-view__footer',
            contents: [
              buttons.previous,
              buttons.toggleFullHeight,
              buttons.next,
            ],
          },
        }
      },

      toolbarButton(title, icon, handler, className = '') {
        return $.create('a', {
          href: '#',
          title: title,
          className: `iv-icon-button iv-icon iv-icon--type-${icon} ${className}`,
          events: {
            click: (e) => {
              e.preventDefault()
              handler()
            },
          },
        })
      },
    }

    return function (enabledHosts) {
      addStyle(css_248z)

      const container = $('body')

      const linkClasses = [
        CLASSES.imageLink,
        'iv-image-link',
        'iv-icon',
        'iv-icon--hover',
        CLASSES.imageLinkZoom,
        'iv-icon--size-button',
      ]

      const getHostName = urlExtractor.getHostNameMatcher(enabledHosts)

      const imagesWithLinks = $$('a > img, a > var', container)

      imagesWithLinks
        .map((img) => {
          return { link: img.parentNode, thumbnailUrl: img.src || img.title }
        })
        .filter(({ link }) => link.href)
        .forEach(({ link, thumbnailUrl }) => {
          const hostName = getHostName(link.href)

          if (hostName) {
            link.dataset.ivHost = hostName
            link.dataset.ivThumbnail = thumbnailUrl
            link.classList.add(...linkClasses)
          }
        })

      $.delegate(container, 'click', SELECTORS.imageLink, events.linkClick)
    }
  })()

  $.ready().then(async () => {
    const hostConfig = await config.init()

    initViewer(hostConfig.enabledHosts)
  })
})()
