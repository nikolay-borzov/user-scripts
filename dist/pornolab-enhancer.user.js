// ==UserScript==
// @name        Pornolab Enhancer
// @namespace   https://github.com/shikiyoku
// @description Improves UX
// @version     1.7.1
// @author      shikiyoku
// @license     MIT
// @copyright   2017+, shikiyoku
// @icon        https://raw.githubusercontent.com/shikiyoku/user-scripts/master/src/pornolab-enhancer/resources/icon.png
// @homepageURL https://github.com/shikiyoku/user-scripts
// @supportURL  https://github.com/shikiyoku/user-scripts/issues
// @include     *pornolab.*
// @connect     www.imagebam.com
// @connect     imagevenue.com
// @connect     www.turboimagehost.com
// @run-at      document-start
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @grant       GM_setValue
// @grant       GM.setValue
// @grant       GM_getValue
// @grant       GM.getValue
// ==/UserScript==

(function () {
  'use strict'

  /* global GM_addStyle */
  var addStyle = 'GM_addStyle' in window
    ? GM_addStyle // eslint-disable-line camelcase
    : (css) => {
      var head = document.getElementsByTagName('head')[0]
      if (head) {
        var style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = css
        head.appendChild(style)
        return css
      }
    }

  /* global Bliss */
  // eslint-disable-next-line
!(function(){function t(e,n,i){return n=void 0===n?1:n, i=i||n+1, i-n<=1?function(){if(arguments.length<=n||"string"===r.type(arguments[n]))return e.apply(this,arguments);var t,i=arguments[n];for(var o in i){var s=Array.prototype.slice.call(arguments);s.splice(n,1,o,i[o]), t=e.apply(this,s);}return t}:t(t(e,n+1,i),n,i-1)}function e(t,r,i){var o=n(i);if("string"===o){var s=Object.getOwnPropertyDescriptor(r,i);!s||s.writable&&s.configurable&&s.enumerable&&!s.get&&!s.set?t[i]=r[i]:(delete t[i], Object.defineProperty(t,i,s));}else if("array"===o)i.forEach(function(n){n in r&&e(t,r,n);});else for(var a in r)i&&("regexp"===o&&!i.test(a)||"function"===o&&!i.call(r,a))||e(t,r,a);return t}function n(t){if(null===t)return"null";if(void 0===t)return"undefined";var e=(Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1]||"").toLowerCase();return"number"==e&&isNaN(t)?"nan":e}var r=self.Bliss=e(function(t,e){return 2==arguments.length&&!e||!t?null:"string"===r.type(t)?(e||document).querySelector(t):t||null},self.Bliss);e(r,{extend:e,overload:t,type:n,property:r.property||"_",listeners:self.WeakMap?new WeakMap:new Map,original:{addEventListener:(self.EventTarget||Node).prototype.addEventListener,removeEventListener:(self.EventTarget||Node).prototype.removeEventListener},sources:{},noop:function(){},$:function(t,e){return t instanceof Node||t instanceof Window?[t]:2!=arguments.length||e?Array.prototype.slice.call("string"==typeof t?(e||document).querySelectorAll(t):t||[]):[]},defined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},create:function(t,e){return t instanceof Node?r.set(t,e):(1===arguments.length&&("string"===r.type(t)?e={}:(e=t, t=e.tag, e=r.extend({},e,function(t){return"tag"!==t}))), r.set(document.createElement(t||"div"),e))},each:function(t,e,n){n=n||{};for(var r in t)n[r]=e.call(t,r,t[r]);return n},ready:function(t,e,n){if("function"!=typeof t||e||(e=t, t=void 0), t=t||document, e&&("loading"!==t.readyState?e():r.once(t,"DOMContentLoaded",function(){e();})), !n)return new Promise(function(e){r.ready(t,e,!0);})},Class:function(t){var e,n=["constructor","extends","abstract","static"].concat(Object.keys(r.classProps)),i=t.hasOwnProperty("constructor")?t.constructor:r.noop;2==arguments.length?(e=arguments[0], t=arguments[1]):(e=function(){if(this.constructor.__abstract&&this.constructor===e)throw new Error("Abstract classes cannot be directly instantiated.");e["super"]&&e["super"].apply(this,arguments), i.apply(this,arguments);}, e["super"]=t["extends"]||null, e.prototype=r.extend(Object.create(e["super"]?e["super"].prototype:Object),{constructor:e}), e.prototype["super"]=e["super"]?e["super"].prototype:null, e.__abstract=!!t["abstract"]);var o=function(t){return this.hasOwnProperty(t)&&n.indexOf(t)===-1};if(t["static"]){r.extend(e,t["static"],o);for(var s in r.classProps)s in t["static"]&&r.classProps[s](e,t["static"][s]);}r.extend(e.prototype,t,o);for(var s in r.classProps)s in t&&r.classProps[s](e.prototype,t[s]);return e},classProps:{lazy:t(function(t,e,n){return Object.defineProperty(t,e,{get:function(){var t=n.call(this);return Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0}), t},set:function(t){Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0});},configurable:!0,enumerable:!0}), t}),live:t(function(t,e,n){return"function"===r.type(n)&&(n={set:n}), Object.defineProperty(t,e,{get:function(){var t=this["_"+e],r=n.get&&n.get.call(this,t);return void 0!==r?r:t},set:function(t){var r=this["_"+e],i=n.set&&n.set.call(this,t,r);this["_"+e]=void 0!==i?i:t;},configurable:n.configurable,enumerable:n.enumerable}), t})},include:function(){var t=arguments[arguments.length-1],e=2===arguments.length&&arguments[0],n=document.createElement("script");return e?Promise.resolve():new Promise(function(e,i){r.set(n,{async:!0,onload:function(){e(), n.parentNode&&n.parentNode.removeChild(n);},onerror:function(){i();},src:t,inside:document.head});})},fetch:function(t,n){if(!t)throw new TypeError("URL parameter is mandatory and cannot be "+t);var i=e({url:new URL(t,location),data:"",method:"GET",headers:{},xhr:new XMLHttpRequest},n);i.method=i.method.toUpperCase(), r.hooks.run("fetch-args",i), "GET"===i.method&&i.data&&(i.url.search+=i.data), document.body.setAttribute("data-loading",i.url), i.xhr.open(i.method,i.url.href,i.async!==!1,i.user,i.password);for(var o in n)if("upload"===o)i.xhr.upload&&"object"==typeof n[o]&&r.extend(i.xhr.upload,n[o]);else if(o in i.xhr)try{i.xhr[o]=n[o];}catch(s){self.console&&console.error(s);}var a=Object.keys(i.headers).map(function(t){return t.toLowerCase()});"GET"!==i.method&&a.indexOf("content-type")===-1&&i.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(var c in i.headers)void 0!==i.headers[c]&&i.xhr.setRequestHeader(c,i.headers[c]);var u=new Promise(function(t,e){i.xhr.onload=function(){document.body.removeAttribute("data-loading"), 0===i.xhr.status||i.xhr.status>=200&&i.xhr.status<300||304===i.xhr.status?t(i.xhr):e(r.extend(Error(i.xhr.statusText),{xhr:i.xhr,get status(){return this.xhr.status}}));}, i.xhr.onerror=function(){document.body.removeAttribute("data-loading"), e(r.extend(Error("Network Error"),{xhr:i.xhr}));}, i.xhr.ontimeout=function(){document.body.removeAttribute("data-loading"), e(r.extend(Error("Network Timeout"),{xhr:i.xhr}));}, i.xhr.send("GET"===i.method?null:i.data);});return u.xhr=i.xhr, u},value:function(t){var e="string"!==r.type(t);return r.$(arguments).slice(+e).reduce(function(t,e){return t&&t[e]},e?t:self)}}), r.Hooks=new r.Class({add:function(t,e,n){if("string"==typeof arguments[0])(Array.isArray(t)?t:[t]).forEach(function(t){this[t]=this[t]||[], e&&this[t][n?"unshift":"push"](e);},this);else for(var t in arguments[0])this.add(t,arguments[0][t],arguments[1]);},run:function(t,e){this[t]=this[t]||[], this[t].forEach(function(t){t.call(e&&e.context?e.context:e,e);});}}), r.hooks=new r.Hooks;r.property;r.Element=function(t){this.subject=t, this.data={}, this.bliss={};}, r.Element.prototype={set:t(function(t,e){t in r.setProps?r.setProps[t].call(this,e):t in this?this[t]=e:this.setAttribute(t,e);},0),transition:function(t,e){return e=+e||400, new Promise(function(n,i){if("transition"in this.style){var o=r.extend({},this.style,/^transition(Duration|Property)$/);r.style(this,{transitionDuration:(e||400)+"ms",transitionProperty:Object.keys(t).join(", ")}), r.once(this,"transitionend",function(){clearTimeout(s), r.style(this,o), n(this);});var s=setTimeout(n,e+50,this);r.style(this,t);}else r.style(this,t), n(this);}.bind(this))},fire:function(t,e){var n=document.createEvent("HTMLEvents");return n.initEvent(t,!0,!0), this.dispatchEvent(r.extend(n,e))},bind:t(function(t,e){if(arguments.length>1&&("function"===r.type(e)||e.handleEvent)){var n=e;e="object"===r.type(arguments[2])?arguments[2]:{capture:!!arguments[2]}, e.callback=n;}var i=r.listeners.get(this)||{};t.trim().split(/\s+/).forEach(function(t){if(t.indexOf(".")>-1){t=t.split(".");var n=t[1];t=t[0];}i[t]=i[t]||[], 0===i[t].filter(function(t){return t.callback===e.callback&&t.capture==e.capture}).length&&i[t].push(r.extend({className:n},e)), r.original.addEventListener.call(this,t,e.callback,e);},this), r.listeners.set(this,i);},0),unbind:t(function(t,e){if(e&&("function"===r.type(e)||e.handleEvent)){var n=e;e=arguments[2];}"boolean"==r.type(e)&&(e={capture:e}), e=e||{}, e.callback=e.callback||n;var i=r.listeners.get(this);(t||"").trim().split(/\s+/).forEach(function(t){if(t.indexOf(".")>-1){t=t.split(".");var n=t[1];t=t[0];}if(t&&e.callback)return r.original.removeEventListener.call(this,t,e.callback,e.capture);if(i)for(var o in i)if(!t||o===t)for(var s,a=0;s=i[o][a];a++)n&&n!==s.className||e.callback&&e.callback!==s.callback||!!e.capture!=!!s.capture||(i[o].splice(a,1), r.original.removeEventListener.call(this,o,s.callback,s.capture), a--);},this);},0)}, r.setProps={style:function(t){for(var e in t)e in this.style?this.style[e]=t[e]:this.style.setProperty(e,t[e]);},attributes:function(t){for(var e in t)this.setAttribute(e,t[e]);},properties:function(t){r.extend(this,t);},events:function(t){if(1!=arguments.length||!t||!t.addEventListener)return r.bind.apply(this,[this].concat(r.$(arguments)));var e=this;if(r.listeners){var n=r.listeners.get(t);for(var i in n)n[i].forEach(function(t){r.bind(e,i,t.callback,t.capture);});}for(var o in t)0===o.indexOf("on")&&(this[o]=t[o]);},once:t(function(t,e){var n=this,i=function(){return r.unbind(n,t,i), e.apply(n,arguments)};r.bind(this,t,i,{once:!0});},0),delegate:t(function(t,e,n){r.bind(this,t,function(t){t.target.closest(e)&&n.call(this,t);});},0,2),contents:function(t){(t||0===t)&&(Array.isArray(t)?t:[t]).forEach(function(t){var e=r.type(t);/^(string|number)$/.test(e)?t=document.createTextNode(t+""):"object"===e&&(t=r.create(t)), t instanceof Node&&this.appendChild(t);},this);},inside:function(t){t&&t.appendChild(this);},before:function(t){t&&t.parentNode.insertBefore(this,t);},after:function(t){t&&t.parentNode.insertBefore(this,t.nextSibling);},start:function(t){t&&t.insertBefore(this,t.firstChild);},around:function(t){t&&t.parentNode&&r.before(this,t), this.appendChild(t);}}, r.Array=function(t){this.subject=t;}, r.Array.prototype={all:function(t){var e=r.$(arguments).slice(1);return this[t].apply(this,e)}}, r.add=t(function(t,e,n,i){n=r.extend({$:!0,element:!0,array:!0},n), "function"==r.type(e)&&(!n.element||t in r.Element.prototype&&i||(r.Element.prototype[t]=function(){return this.subject&&r.defined(e.apply(this.subject,arguments),this.subject)}), !n.array||t in r.Array.prototype&&i||(r.Array.prototype[t]=function(){var t=arguments;return this.subject.map(function(n){return n&&r.defined(e.apply(n,t),n)})}), n.$&&(r.sources[t]=r[t]=e, (n.array||n.element)&&(r[t]=function(){var e=[].slice.apply(arguments),i=e.shift(),o=n.array&&Array.isArray(i)?"Array":"Element";return r[o].prototype[t].apply({subject:i},e)})));},0), r.add(r.Array.prototype,{element:!1}), r.add(r.Element.prototype), r.add(r.setProps), r.add(r.classProps,{element:!1,array:!1});var i=document.createElement("_");r.add(r.extend({},HTMLElement.prototype,function(t){return"function"===r.type(i[t])}),null,!0);}());

  const $ = Bliss
  const $$ = Bliss.$

  /* global GM */
  var gmPolyfill = (function () {
  // based on https://github.com/greasemonkey/gm4-polyfill
    const gmMethodMap = {
      'xmlHttpRequest': 'GM_xmlhttpRequest',
      'getValue': 'GM_getValue',
      'setValue': 'GM_setValue'
    }

    return function polyfill (methodName) {
      if (gmMethodMap.hasOwnProperty(methodName)) {
        return 'GM' in window && methodName in GM
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

  var store = (function () {
    return {
    /**
     * @param {string} name
     * @param {any} defaultValue
     */
      get: gmPolyfill('getValue'),
      /**
     * @param {string} name
     * @param {any} value
     */
      set: gmPolyfill('setValue')
    }
  })()

  var configCSS = `.config-menu-link {
  position: relative;
  font-weight: bold;
}

.config-form {
  position: absolute;
  z-index: -1;
  top: 20px;
  left: 0;
  padding: 14px;
  transition: all 0.3s ease;
  border: solid 1px #cacaca;
  opacity: 0;
  background-color: #efefef;
  color: #000;
  font-weight: normal;
}

.expanded .config-form {
  z-index: 1;
  opacity: 1;
}

.config-label {
  display: flex;
  align-items: center;
  padding: 7px;
  transition: all 0.3s ease;
}

.config-label:hover {
  background-color: rgba(52, 93, 164, 0.25);
}

.config-checkbox {
  margin: 0 7px 0 0;
}

.config-apply-button {
  display: flex;
  justify-content: center;
  margin-top: 7px;
  padding: 5px;
  border: solid 1px #cacaca;
  background-color: #cacaca;
  text-decoration: none !important;
}

.config-apply-button:hover {
  border-color: #345da4;
  color: #345da4;
  color: #000 !important;
  text-decoration: none !important;
}
`

  var config = (function () {
    const KEYS = {
      tags: 'tags',
      similar: 'similar',
      pager: 'pager',
      download: 'download',
      image: 'image'
    }

    function getRow (label, storeKey, checked) {
      return $.create('div', {
        className: 'config-form-row',
        contents: {
          tag: 'label',
          className: 'config-label',
          contents: [{
            tag: 'input',
            type: 'checkbox',
            className: 'config-checkbox',
            checked,
            value: storeKey
          }, label]
        }
      })
    }

    function createConfigForm (params) {
      return $.create('div', {
        className: 'config-form',
        contents: [
          getRow('Tags', KEYS.tags, params[KEYS.tags]),
          getRow('Find similar', KEYS.similar, params[KEYS.similar]),
          getRow('Pager', KEYS.pager, params[KEYS.pager]),
          getRow('Download', KEYS.download, params[KEYS.download]),
          getRow('Image view', KEYS.image, params[KEYS.image]),
          {
            tag: 'div',
            className: 'config-form-row',
            contents: {
              tag: 'a',
              className: 'config-apply-button',
              href: '#',
              textContent: 'Apply',
              events: {
                'click': (e) => {
                  e.preventDefault()
                  document.location.reload()
                }
              }
            }
          }
        ],
        delegate: {
          'change': {
            '.config-checkbox': (e) => store.set(e.target.value, e.target.checked)
          }
        }
      })
    }

    function createMenuLink (params) {
      let configFormCreated = false

      const menuLink = $.create('a', {
        className: 'config-menu-link',
        textContent: 'PLE',
        inside: $('#main-nav td'),
        title: 'Click to open/close config',
        events: {
          'click': (e) => {
            e.preventDefault()

            if (!configFormCreated) {
              configFormCreated = true
              $.inside(createConfigForm(params), menuLink)
            }

            menuLink.classList.toggle('expanded')
          }
        }
      })
    }

    function getParams () {
      return Promise.all(Object.values(KEYS)
        .map((key) => store.get(key, true)))
        .then((values) => {
          return Object.keys(KEYS).reduce((result, key, index) => {
            result[key] = values[index]
            return result
          }, {})
        })
    }

    return {
      KEYS,
      async init () {
        const params = await getParams()

        $.ready().then(() => {
          addStyle(configCSS)
          createMenuLink(params)
        })

        return params
      }
    }
  })()

  var regex = {
    getAllMatchGroups (regEx, str) {
      let results = []
      let match

      while ((match = regEx.exec(str)) !== null) {
        results.push(match[1])
      }

      return results
    },

    getMatchGroups (regEx, str) {
      let matches = []
      let match

      while ((match = regEx.exec(str)) !== null) {
        if (match.index === regEx.lastIndex) {
          regEx.lastIndex++
        }

        let groups = match.slice(1)
        if (groups.some((group) => group)) {
          matches.push(groups)
        }
      }

      return matches
    },

    getFirstMatchGroup (regEx, str) {
      let match = regEx.exec(str)

      return match ? match[1] : null
    }
  }

  var tagsCSS = `.tags-row {
  padding: 3px 0 0;
}

.tags-row-tag {
  display: inline-block;
  position: relative;
  margin: 2px 5px 2px;
  padding: 5px;
  border: solid 1px #cacaca;
  border-radius: 5px;
  background-color: #efefef;
  text-decoration: none;
}

.tags-row-tag:hover {
  border-color: #345da4;
  color: #345da4;
  text-decoration: none !important;
}

.tags-row-tag:nth-child {
  margin-left: 0;
}

.tag-with-icon {
  padding-left: 25px;
}

.tag-with-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 5px;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  border: 1px solid #cacaca;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.icon-en::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIgZmlsbD0iI0YwRjBGMCIvPjxnIGZpbGw9IiMwMDUyQjQiPjxwYXRoIGQ9Ik01Mi45MiAxMDAuMTQyYy0yMC4xMSAyNi4xNjMtMzUuMjcyIDU2LjMxOC00NC4xIDg5LjA3N2gxMzMuMTc3TDUyLjkyIDEwMC4xNHpNNTAzLjE4IDE4OS4yMmMtOC44MjgtMzIuNzYtMjMuOTkyLTYyLjkxNC00NC4xLTg5LjA3N2wtODkuMDc1IDg5LjA3Nkg1MDMuMTh6TTguODIgMzIyLjc4NGM4LjgzIDMyLjc1OCAyMy45OTIgNjIuOTEzIDQ0LjEgODkuMDc1bDg5LjA3NC04OS4wNzZIOC44MnpNNDExLjg1OCA1Mi45MmMtMjYuMTYzLTIwLjEwOC01Ni4zMTctMzUuMjctODkuMDc2LTQ0LjF2MTMzLjE3Nmw4OS4wNzYtODkuMDc1ek0xMDAuMTQyIDQ1OS4wOGMyNi4xNjMgMjAuMTA4IDU2LjMxOCAzNS4yNyA4OS4wNzYgNDQuMVYzNzAuMDA2bC04OS4wNzYgODkuMDc0ek0xODkuMjE3IDguODJjLTMyLjc1OCA4LjgzLTYyLjkxMyAyMy45OTItODkuMDc1IDQ0LjFsODkuMDc1IDg5LjA3NVY4Ljgyek0zMjIuNzgzIDUwMy4xOGMzMi43NTgtOC44MyA2Mi45MTMtMjMuOTkyIDg5LjA3NS00NC4xbC04OS4wNzUtODkuMDc1VjUwMy4xOHpNMzcwLjAwNSAzMjIuNzg0bDg5LjA3NSA4OS4wNzZjMjAuMTA4LTI2LjE2MiAzNS4yNzItNTYuMzE4IDQ0LjEtODkuMDc2SDM3MC4wMDZ6Ii8+PC9nPjxnIGZpbGw9IiNEODAwMjciPjxwYXRoIGQ9Ik01MDkuODMzIDIyMi42MWgtMjIwLjQ0VjIuMTY2QzI3OC40Ni43NDQgMjY3LjMxNiAwIDI1NiAwYy0xMS4zMiAwLTIyLjQ2Ljc0NC0zMy4zOSAyLjE2N3YyMjAuNDRIMi4xNjZDLjc0NCAyMzMuNTQgMCAyNDQuNjg0IDAgMjU2YzAgMTEuMzIuNzQ0IDIyLjQ2IDIuMTY3IDMzLjM5aDIyMC40NHYyMjAuNDQzQzIzMy41NCA1MTEuMjU2IDI0NC42ODIgNTEyIDI1NiA1MTJjMTEuMzE3IDAgMjIuNDYtLjc0MyAzMy4zOS0yLjE2N3YtMjIwLjQ0aDIyMC40NDNDNTExLjI1NiAyNzguNDYgNTEyIDI2Ny4zMTggNTEyIDI1NmMwLTExLjMxNy0uNzQ0LTIyLjQ2LTIuMTY3LTMzLjM5eiIvPjxwYXRoIGQ9Ik0zMjIuNzgzIDMyMi43ODRMNDM3LjAyIDQzNy4wMmM1LjI1My01LjI1MiAxMC4yNjUtMTAuNzQzIDE1LjA0Ny0xNi40MzVsLTk3LjgwMi05Ny44MDJoLTMxLjQ4MnpNMTg5LjIxNyAzMjIuNzg0aC0uMDAyTDc0Ljk4IDQzNy4wMmM1LjI1MiA1LjI1MyAxMC43NDMgMTAuMjY1IDE2LjQzNSAxNS4wNDdsOTcuODAyLTk3LjgwNHYtMzEuNDh6TTE4OS4yMTcgMTg5LjIydi0uMDAzTDc0Ljk4IDc0Ljk4Yy01LjI1MyA1LjI1Mi0xMC4yNjUgMTAuNzQzLTE1LjA0NyAxNi40MzVsOTcuODAzIDk3LjgwM2gzMS40OHpNMzIyLjc4MyAxODkuMjJMNDM3LjAyIDc0Ljk4Yy01LjI1Mi01LjI1My0xMC43NDMtMTAuMjY1LTE2LjQzNS0xNS4wNDZsLTk3LjgwMiA5Ny44MDN2MzEuNDgyeiIvPjwvZz48L3N2Zz4=);
}

.icon-ja::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIgZmlsbD0iI0YwRjBGMCIvPjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMTExLjMwNCIgZmlsbD0iI0Q4MDAyNyIvPjwvc3ZnPg==);
}

.icon-ru::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIgZmlsbD0iI0YwRjBGMCIvPjxwYXRoIGQ9Ik00OTYuMDc3IDM0NS4wNDNDNTA2LjM2NyAzMTcuMzEgNTEyIDI4Ny4zMTMgNTEyIDI1NnMtNS42MzItNjEuMzEtMTUuOTIzLTg5LjA0M0gxNS45MjNDNS42MzMgMTk0LjY5IDAgMjI0LjY4NyAwIDI1NnM1LjYzMyA2MS4zMSAxNS45MjMgODkuMDQzTDI1NiAzNjcuMzAzbDI0MC4wNzctMjIuMjZ6IiBmaWxsPSIjMDA1MkI0Ii8+PHBhdGggZD0iTTI1NiA1MTJjMTEwLjA3IDAgMjAzLjkwNi02OS40NzIgMjQwLjA3Ny0xNjYuOTU3SDE1LjkyM0M1Mi4wOTMgNDQyLjUyOCAxNDUuOTMgNTEyIDI1NiA1MTJ6IiBmaWxsPSIjRDgwMDI3Ii8+PC9zdmc+);
}

.icon-zh::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItNDkgMTQxIDUxMiA1MTIiPjxzdHlsZT4uc3Qwe2ZpbGw6I0Q4MDAyNzt9IC5zdDF7ZmlsbDojRkZEQTQ0O308L3N0eWxlPjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjIwNyIgY3k9IjM5NyIgcj0iMjU2Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTkxLjEgMjk2LjhsMjIuMSA2OGg3MS41bC01Ny44IDQyLjEgMjIuMSA2OC01Ny45LTQyLTU3LjkgNDIgMjIuMi02OC01Ny45LTQyLjFINjl6TTI1NC41IDUzNy41bC0xNi45LTIwLjgtMjUgOS43IDE0LjUtMjIuNS0xNi45LTIwLjkgMjUuOSA2LjkgMTQuNi0yMi41IDEuNCAyNi44IDI2IDYuOS0yNS4xIDkuNnpNMjg4LjEgNDc2LjVsOC0yNS42LTIxLjktMTUuNSAyNi44LS40IDcuOS0yNS42IDguNyAyNS40IDI2LjgtLjMtMjEuNSAxNiA4LjYgMjUuNC0yMS45LTE1LjV6TTMzMy40IDMyOC45TDMyMS42IDM1M2wxOS4yIDE4LjctMjYuNS0zLjgtMTEuOCAyNC00LjYtMjYuNC0yNi42LTMuOCAyMy44LTEyLjUtNC42LTI2LjUgMTkuMiAxOC43ek0yNTUuMiAyNTUuOWwtMiAyNi43IDI0LjkgMTAuMS0yNi4xIDYuNC0xLjkgMjYuOC0xNC4xLTIyLjgtMjYuMSA2LjQgMTcuMy0yMC41LTE0LjItMjIuNyAyNC45IDEwLjF6Ii8+PC9zdmc+);
}

.icon-es::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMCAyNTZjMCAzMS4zMTQgNS42MzMgNjEuMzEgMTUuOTIzIDg5LjA0M0wyNTYgMzY3LjMwM2wyNDAuMDc3LTIyLjI2QzUwNi4zNjcgMzE3LjMxIDUxMiAyODcuMzEzIDUxMiAyNTZzLTUuNjMzLTYxLjMxLTE1LjkyMy04OS4wNDNMMjU2IDE0NC42OTdsLTI0MC4wNzcgMjIuMjZDNS42MzMgMTk0LjY5IDAgMjI0LjY4NyAwIDI1NnoiIGZpbGw9IiNGRkRBNDQiLz48ZyBmaWxsPSIjRDgwMDI3Ij48cGF0aCBkPSJNNDk2LjA3NyAxNjYuOTU3QzQ1OS45MDcgNjkuNDczIDM2Ni4wNyAwIDI1NiAwUzUyLjA5NCA2OS40NzMgMTUuOTIzIDE2Ni45NTdoNDgwLjE1NHpNMTUuOTIzIDM0NS4wNDNDNTIuMDkzIDQ0Mi41MjcgMTQ1LjkzIDUxMiAyNTYgNTEyczIwMy45MDYtNjkuNDczIDI0MC4wNzctMTY2Ljk1N0gxNS45MjN6Ii8+PC9nPjwvc3ZnPg==);
}

.icon-pt::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMCAyNTZjMCAxMTAuMDcgNjkuNDcyIDIwMy45MDUgMTY2Ljk1NSAyNDAuMDc2TDE4OS4yMTcgMjU2IDE2Ni45NTUgMTUuOTIyQzY5LjQ3MiA1Mi4wOTUgMCAxNDUuOTMgMCAyNTZ6IiBmaWxsPSIjNkRBNTQ0Ii8+PHBhdGggZD0iTTUxMiAyNTZDNTEyIDExNC42MTYgMzk3LjM4NCAwIDI1NiAwYy0zMS4zMTQgMC02MS4zMSA1LjYzMy04OS4wNDUgMTUuOTIzdjQ4MC4xNTRDMTk0LjY5IDUwNi4zNjcgMjI0LjY4NSA1MTIgMjU2IDUxMmMxNDEuMzg0IDAgMjU2LTExNC42MTYgMjU2LTI1NnoiIGZpbGw9IiNEODAwMjciLz48Y2lyY2xlIGN4PSIxNjYuOTU3IiBjeT0iMjU2IiByPSI4OS4wNDMiIGZpbGw9IiNGRkRBNDQiLz48cGF0aCBkPSJNMTE2Ljg3IDIxMS40Nzh2NTUuNjUyYzAgMjcuNjYyIDIyLjQyNCA1MC4wODcgNTAuMDg3IDUwLjA4N3M1MC4wODctMjIuNDI0IDUwLjA4Ny01MC4wODd2LTU1LjY1MkgxMTYuODd6IiBmaWxsPSIjRDgwMDI3Ii8+PHBhdGggZD0iTTE2Ni45NTcgMjgzLjgyNmMtOS4yMDYgMC0xNi42OTYtNy40OS0xNi42OTYtMTYuNjk2di0yMi4yNmgzMy4zOTJ2MjIuMjZjMCA5LjIwNi03LjQ5IDE2LjY5Ni0xNi42OTUgMTYuNjk2eiIgZmlsbD0iI0YwRjBGMCIvPjwvc3ZnPg==);
}

.icon-de::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMTUuOTIzIDM0NS4wNDNDNTIuMDkzIDQ0Mi41MjcgMTQ1LjkzIDUxMiAyNTYgNTEyczIwMy45MDYtNjkuNDczIDI0MC4wNzctMTY2Ljk1N0wyNTYgMzIyLjc4M2wtMjQwLjA3NyAyMi4yNnoiIGZpbGw9IiNGRkRBNDQiLz48cGF0aCBkPSJNMjU2IDBDMTQ1LjkzIDAgNTIuMDk0IDY5LjQ3MiAxNS45MjMgMTY2Ljk1N0wyNTYgMTg5LjIxN2wyNDAuMDc3LTIyLjI2QzQ1OS45MDcgNjkuNDcgMzY2LjA3IDAgMjU2IDB6Ii8+PHBhdGggZD0iTTE1LjkyMyAxNjYuOTU3QzUuNjMzIDE5NC42OSAwIDIyNC42ODcgMCAyNTZzNS42MzMgNjEuMzEgMTUuOTIzIDg5LjA0M2g0ODAuMTU1QzUwNi4zNjggMzE3LjMxIDUxMiAyODcuMzEzIDUxMiAyNTZzLTUuNjMyLTYxLjMxLTE1LjkyMy04OS4wNDNIMTUuOTIzeiIgZmlsbD0iI0Q4MDAyNyIvPjwvc3ZnPg==);
}

.icon-fr::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIgZmlsbD0iI2YwZjBmMCIvPjxwYXRoIGQ9Ik01MTIgMjU2YzAtMTEwLjA3MS02OS40NzItMjAzLjkwNi0xNjYuOTU3LTI0MC4wNzd2NDgwLjE1NUM0NDIuNTI4IDQ1OS45MDYgNTEyIDM2Ni4wNzEgNTEyIDI1NnoiIGZpbGw9IiNkODAwMjciLz48cGF0aCBkPSJNMCAyNTZjMCAxMTAuMDcxIDY5LjQ3MyAyMDMuOTA2IDE2Ni45NTcgMjQwLjA3N1YxNS45MjNDNjkuNDczIDUyLjA5NCAwIDE0NS45MjkgMCAyNTZ6IiBmaWxsPSIjMDA1MmI0Ii8+PC9zdmc+);
}

.icon-in-progress::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGZpbGw9IiMyNjI0MjUiIGQ9Ik0wIDEwMGg1MDB2MTAwSDB6Ii8+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9ImIiPjxwYXRoIGZpbGw9IiMyNjI0MjUiIGQ9Ik0wIDMwMGg1MDB2MTAwSDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PGNpcmNsZSBjeT0iMzUzLjU1MyIgcj0iMjUwIiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUpIiBmaWxsPSIjZWJiNTMxIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMjUwIiByPSIyNTAiIGNsaXAtcGF0aD0idXJsKCNhKSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDI1MCAyNTApIiBmaWxsPSIjMjYyNDI1Ii8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMjUwIiByPSIyNTAiIGNsaXAtcGF0aD0idXJsKCNiKSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDI1MCAyNTApIiBmaWxsPSIjMjYyNDI1Ii8+PC9zdmc+);
}

.icon-dimension::before {
  border-width: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTggM3YyaC0yVjNIOHYySDZWM0g0djE4aDJ2LTJoMnYyaDh2LTJoMnYyaDJWM2gtMnpNOCAxN0g2di0yaDJ2MnptMC00SDZ2LTJoMnYyem0wLTRINlY3aDJ2MnptMTAgOGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2MnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+);
}
`

  var tags = (function () {
    const TOPIC_PATH = '/forum/viewtopic.php'

    // Separates tags from title
    const TITLE_REGEX = /(?:\[([^[\]]+)\]+)?([^[]*)?/g
    const TAGS_SEPARATOR_REGEX = /(?:,\s?|;|\/|\+)/
    const TAGS_GROUP_SEPARATOR = ' | '

    const DIMENSIONS = [
      '240p',
      '360p',
      '480p',
      '540p',
      '576p',
      '720p',
      '1080p',
      '1080i',
      '1440p',
      '2160p'
    ]
    const DIMENSION_ICON_NAME = 'dimension'

    const TAG_ICON_MAP = {
      'eng': 'en',
      'jap': 'ja',
      'rus': 'ru',
      'chi': 'zh',
      'spa': 'es',
      'por': 'pt',
      'ger': 'de',
      'fr': 'fr',
      'inprogress': 'in-progress'
    }

    DIMENSIONS.forEach((dim) => {
      TAG_ICON_MAP[dim] = DIMENSION_ICON_NAME
    })

    /**
   * Extracts tags and title from title string
   * @param {string} titleRaw
   */
    function tokenizeTitle (titleRaw) {
      let tagGroupsBefore = []
      let titleParts = []
      let tagGroupsAfter = []

      regex.getMatchGroups(TITLE_REGEX, titleRaw)
        .forEach((groups) => {
          let tags = []

          // First group - tags
          if (groups[0]) {
            tags = groups[0].split(TAGS_SEPARATOR_REGEX)
          }

          if (tags.length) {
            (titleParts.length ? tagGroupsAfter : tagGroupsBefore).push(tags)
          }

          // Second group - title part
          if (groups[1]) {
            titleParts.push(groups[1])
          }
        })

      return {
        tagGroupsBefore,
        title: titleParts.join('').trim(),
        tagGroupsAfter
      }
    }

    /**
   * @param {Array<Array<string>>} tagGroups
   */
    function createTagsRow (tagGroups) {
      const tags = tagGroups.reduce((tags, tagsGroup, index) => {
        tags.push(...createTagLinks(tagsGroup))

        if (index + 1 !== tagGroups.length) {
          tags.push(TAGS_GROUP_SEPARATOR)
        }

        return tags
      }, [])

      return $.create('div', {
        className: 'tags-row',
        contents: tags
      })
    }

    /**
   * @param {Array<string>} tags
   */
    function createTagLinks (tags) {
      return tags
        .filter((tag) => tag.length)
        .map((tag) => {
          let className = 'tags-row-tag'
          tag = tag.trim()

          const tagkey = tag.toLowerCase()
          if (TAG_ICON_MAP.hasOwnProperty(tagkey)) {
            className = `${className} tag-with-icon icon-${TAG_ICON_MAP[tagkey]}`
          }

          return $.create('a', {
            className,
            textContent: tag,
            href: `/forum/tracker.php?nm=${tag}`,
            target: '_blank'
          })
        })
    }

    /**
   * Extracts tags from title for  topic post page
   */
    function createPostTags () {
      const titleElement = $('.maintitle')
      const titleLink = titleElement.children[0]
      const title = titleLink.textContent

      const titleParts = tokenizeTitle(title)
      const hasTagBefore = titleParts.tagGroupsBefore.length > 0
      const hasTagsAfter = titleParts.tagGroupsAfter.length > 0

      if (!hasTagBefore && !hasTagsAfter) {
        return
      }

      addStyle(tagsCSS)

      // Remove tags from title
      $.set(titleLink, {
        textContent: titleParts.title,
        title: title
      })

      if (hasTagBefore) {
        $.before(createTagsRow(titleParts.tagGroupsBefore), titleElement)
      }

      if (hasTagsAfter) {
        $.after(createTagsRow(titleParts.tagGroupsAfter), titleElement)
      }
    }

    return function () {
      $.ready()
        .then(() => {
          if (location.pathname === TOPIC_PATH) {
            createPostTags()
          }
        })
    }
  })()

  var pagerCSS = `.nav .menu-root,
.small > b > .menu-root,
a.pg {
  display: inline-block;
  padding: 0.5em 0.7em;
  border: solid 1px #cacaca;
  background-color: #efefef;
  text-decoration: none;
}

a.pg {
  margin-right: 0.1em;
}

.nav .menu-root,
.small > b > .menu-root {
  padding-right: 20px;
  background-repeat: no-repeat;
  background-position: 95% 50%;
}

.nav .menu-root:hover,
.small > b > .menu-root:hover,
a.pg:hover {
  border-color: #345da4;
  color: #345da4;
  text-decoration: none !important;
}

.menu-root ~ b {
  display: inline-block;
  margin-right: 0.1em;
  padding: 0.5em 0.7em;
  border: solid 1px transparent;
}
`

  var downloadCSS = `.quick-download {
  position: fixed;
  top: 0;
  right: 25%;
  width: 65px;
  height: 65px;
  overflow: hidden;
  transform: translateY(-90%);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: solid 1px #cacaca;
  border-radius: 0 0 10px 10px;
  background-color: #efefef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #000 !important;
  text-align: center;
  text-decoration: none;
}

.quick-download:hover {
  transform: translateY(0);
  border-color: #345da4;
  color: #000 !important;
  text-decoration: none !important;
}

.quick-download-icon {
  display: block;
  height: 45px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiBmaWxsPSIjMzQ1ZGE0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTkgOWgtNFYzSDl2Nkg1bDcgNyA3LTd6TTUgMTh2MmgxNHYtMkg1eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 1;
  }

  20% {
    transform: scale(25, 25);
    opacity: 1;
  }

  100% {
    transform: scale(40, 40);
    opacity: 0;
  }
}

.quick-download::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 5px;
  transform: scale(1, 1);
  transform-origin: 50% 50%;
  border-radius: 100%;
  opacity: 0;
  background: rgba(52, 93, 164, 0.25);
}

.quick-download:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}
`

  var download = (function () {
    const ENABLE_ON_PATH = '/forum/viewtopic.php'

    function createDownloadLink (downloadLink) {
      const link = $.create('a', {
        className: 'quick-download',
        href: '#',
        textContent: '',

        events: {
          'click': (e) => {
            e.preventDefault()

            var event = document.createEvent('MouseEvents')
            event.initEvent('click', true, true)

            downloadLink.dispatchEvent(event)
          }
        },

        contents: [{
          tag: 'span',
          className: 'quick-download-icon'
        }, {
          tag: 'span',
          textContent: document.querySelector('.attach')
            .querySelector('.row1:nth-child(5)')
            .querySelector('td:nth-child(2)')
            .textContent
        }]
      })

      document.body.appendChild(link)
    }

    return function () {
      $.ready()
        .then(() => {
          if (location.pathname !== ENABLE_ON_PATH) { return }

          const downloadLink = $('.dl-link')

          if (!downloadLink) { return }

          addStyle(downloadCSS)

          createDownloadLink(downloadLink)
        })
    }
  })()

  var imageViewCSS = `.image-link {
  display: inline-flex;
  position: relative;
}

img.postImg.image-link {
  display: block;
  margin: 2px; /* Remove bottom padding */
}

.image-link::before,
.image-link::after {
  content: '';
  transition: opacity 350ms ease;
  opacity: 0;
}

.image-link.loading-indicator::before {
  opacity: 1;
}

/* Backdrop */
.image-link::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.image-link.error-icon::before {
  display: none;
}

.image-link.error-icon img {
  opacity: 0.6;
}

/* Backdrop icon */
.image-link::after,
.image-view-container::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.image-link:hover::before,
.image-link:hover::after {
  opacity: 1;
}

/* Icons */
.loading-icon::after,
.error-icon::after {
  opacity: 1;
}

.image-link:hover::after {
  /* zoom in */
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUuNSAxNGgtLjc5bC0uMjgtLjI3QzE1LjQxIDEyLjU5IDE2IDExLjExIDE2IDkuNSAxNiA1LjkxIDEzLjA5IDMgOS41IDNTMyA1LjkxIDMgOS41IDUuOTEgMTYgOS41IDE2YzEuNjEgMCAzLjA5LS41OSA0LjIzLTEuNTdsLjI3LjI4di43OWw1IDQuOTlMMjAuNDkgMTlsLTQuOTktNXptLTYgMEM3LjAxIDE0IDUgMTEuOTkgNSA5LjVTNy4wMSA1IDkuNSA1IDE0IDcuMDEgMTQgOS41IDExLjk5IDE0IDkuNSAxNHoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTIgMTBoLTJ2Mkg5di0ySDdWOWgyVjdoMXYyaDJ2MXoiLz48L3N2Zz4=);
}

.loading-icon::after {
  animation: spin 1s linear infinite;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgNnYzbDQtNC00LTR2M2MtNC40MiAwLTggMy41OC04IDggMCAxLjU3LjQ2IDMuMDMgMS4yNCA0LjI2TDYuNyAxNC44Yy0uNDUtLjgzLS43LTEuNzktLjctMi44IDAtMy4zMSAyLjY5LTYgNi02em02Ljc2IDEuNzRMMTcuMyA5LjJjLjQ0Ljg0LjcgMS43OS43IDIuOCAwIDMuMzEtMi42OSA2LTYgNnYtM2wtNCA0IDQgNHYtM2M0LjQyIDAgOC0zLjU4IDgtOCAwLTEuNTctLjQ2LTMuMDMtMS4yNC00LjI2eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=) !important;
}

.error-icon::after,
.error-icon:hover::after {
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjYzYyODI4IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ3IDIgMiA2LjQ3IDIgMTJzNC40NyAxMCAxMCAxMCAxMC00LjQ3IDEwLTEwUzE3LjUzIDIgMTIgMnptNSAxMy41OUwxNS41OSAxNyAxMiAxMy40MSA4LjQxIDE3IDcgMTUuNTkgMTAuNTkgMTIgNyA4LjQxIDguNDEgNyAxMiAxMC41OSAxNS41OSA3IDE3IDguNDEgMTMuNDEgMTIgMTcgMTUuNTl6Ii8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
}

.forbidden-host var::before {
  content: '';
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 25px;
  height: 25px;
  opacity: 1;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmJjMDJkIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEgMjFoMjJMMTIgMiAxIDIxem0xMi0zaC0ydi0yaDJ2MnptMC00aC0ydi00aDJ2NHoiLz48L3N2Zz4=);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.image-view-container {
  display: flex;
  box-sizing: border-box;
  height: 0;
  overflow: auto;
  transition: all 0.35s ease-out;
  opacity: 0;
  background: rgba(0, 0, 0, 0.8);
}

body.image-view-open {
  overflow: hidden;
}

body.image-view-open .image-view-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: auto;
  opacity: 1;
}

.image-view {
  width: auto;
  max-width: 100%;
  /* fit in view port */
  max-height: 100%;
  /* align in the center */
  margin: auto;
}

.loading-icon .image-view {
  display: none;
}
`

  var request = (function () {
    const xmlHttpRequest = gmPolyfill('xmlHttpRequest')

    return function (url, { method = 'GET' } = {}) {
      return xmlHttpRequest({
        url,
        method
      }).catch((e) => {
        console.error(e)
      })
    }
  })()

  var urlExtractor = (function () {
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
          .filter((e) => e.allowed)
          .map((e) => `a${e.linkSelector}.postLink`)
          .join(',')
      },

      getForbiddenHostLinksSelector () {
        return extractors
          .filter((e) => !e.allowed)
          .map((e) => `a${e.linkSelector}.postLink`)
          .join(',')
      }
    }
  })()

  var imageView = (function () {
    const ENABLE_ON_PATH = '/forum/viewtopic.php'

    const CLASSES = {
      imageLink: 'image-link',
      error: 'error-icon',
      forbiddenHost: 'forbidden-host',
      loading: 'loading-icon',
      open: 'image-view-open'
    }

    const SELECTORS = {
      imageLink: `.${CLASSES.imageLink}`
    }

    const elements = {
      container: null,
      image: null
    }

    const state = {
      open: false,
      currentLink: null,
      linksSet: [],
      getCurrentLinkIndex () {
        return state.linksSet.indexOf(state.currentLink)
      },
      getLastLinkIndex () {
        return state.linksSet.length - 1
      }
    }

    function showImage (imageUrl) {
      return new Promise((resolve, reject) => {
        elements.container.classList.add(CLASSES.loading)
        elements.container.classList.remove(CLASSES.error)

        // clear previous
        elements.image.src = ''

        let imageObj = new Image()
        imageObj.onload = function () {
          elements.image.src = this.src
          elements.container.classList.remove(CLASSES.loading)
          resolve()
        }
        imageObj.onerror = function (e) {
          elements.container.classList.remove(CLASSES.loading)
          elements.container.classList.add(CLASSES.error)
          reject(e)
        }
        // load image
        imageObj.src = imageUrl

        document.body.classList.add(CLASSES.open)
        state.open = true
      })
    }

    function hideImage () {
      document.body.classList.remove(CLASSES.open)
      state.open = false
      state.currentLink = null
      elements.image.src = ''
    }

    async function setImage (link) {
      state.currentLink = link

      let imageUrl = link.dataset['imgUrl']
      if (imageUrl) {
        showImage(imageUrl)
        return
      }

      link.classList.add(CLASSES.loading)

      imageUrl = await urlExtractor.getImageUrl(link)

      link.dataset['imgUrl'] = imageUrl
      link.classList.remove(CLASSES.loading)

      showImage(imageUrl)
        .catch(() => {
        // hideImage()
          link.classList.add(CLASSES.error)
        })
    }

    function nextImage () {
      if (!state.currentLink) { return }

      const currentIndex = state.getCurrentLinkIndex()
      const newIndex = currentIndex < state.getLastLinkIndex()
        ? currentIndex + 1
        : 0

      setImage(state.linksSet[newIndex])
    }

    function previousImage () {
      if (!state.currentLink) { return }

      const currentIndex = state.getCurrentLinkIndex()
      const newIndex = currentIndex === 0
        ? state.getLastLinkIndex()
        : currentIndex - 1

      setImage(state.linksSet[newIndex])
    }

    function handleLinkClick (event) {
      event.preventDefault()

      let link = event.target
      state.linksSet = $$(SELECTORS.imageLink, link.parentNode)

      setImage(link)
    }

    return function () {
      if (location.pathname !== ENABLE_ON_PATH) {
        return
      }

      addStyle(imageViewCSS)

      $.ready()
        .then(() => {
          elements.image = $.create('img', {
            className: 'image-view'
          })

          elements.container = $.create('div', {
            className: 'image-view-container',
            contents: elements.image,
            events: {
              'click': hideImage
            }
          })

          document.body.appendChild(elements.container)

          const topic = $('table.topic')

          // Assign class to image links
          $.set($$(urlExtractor.getLinksSelector(), topic), {
            className: CLASSES.imageLink
          })
          // Mark forbidden hosts
          $.set($$(urlExtractor.getForbiddenHostLinksSelector(), topic), {
            className: `${CLASSES.forbiddenHost} ${CLASSES.imageLink}`
          })

          // Event handlers

          document.addEventListener('keydown', (event) => {
            if (!state.open) {
              return
            }

            if (event.key === 'ArrowRight') {
              nextImage()
            } else if (event.key === 'ArrowLeft') {
              previousImage()
            }
          }, false)

          $.delegate(topic, 'click', SELECTORS.imageLink, handleLinkClick)
        })
    }
  })()

  var findSimilarCSS = `.find-similar-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 17px;
  height: 17px;
  transform: translate(-50%, -50%);
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMzQ1ZGE0IiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zIDVIMXYxNmMwIDEuMS45IDIgMiAyaDE2di0ySDNWNXptMTgtNEg3Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjNjMC0xLjEtLjktMi0yLTJ6bTAgMTZIN1YzaDE0djE0eiIvPjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.find-similar-link {
  display: inline-block;
  position: relative;
  width: 25px;
  height: 25px;
  margin-left: 10px;
  border: 1px solid transparent;
  vertical-align: middle;
}

.find-similar-link:hover {
  border-color: #345da4;
  background-color: #efefef;
}
`

  var findSimilar = (function () {
    const TOPIC_PATH = '/forum/viewtopic.php'
    // Match tags
    const TAGS_REGEX = /\[[^\]]+\]/g
    const REMOVE_CHARS_REGEX = /[&,:()#/\d.]/g
    const TRIM_SPACES_REGEX = /\s{2,}/g
    // const SEARCH_TERM_MAX_LENGTH = 60

    function createFindSimilarLink () {
      const titleElement = $('.maintitle')
      const titleLink = titleElement.children[0]
      const searchTerm = titleLink.textContent
        .trim()
        .replace(TAGS_REGEX, '')
        .replace(REMOVE_CHARS_REGEX, '')
        .replace(TRIM_SPACES_REGEX, ' ')

      $.create('a', {
        className: 'find-similar-link',
        href: `/forum/tracker.php?nm=${searchTerm}`,
        target: '_blank',
        title: 'Find similar',
        after: titleLink
      })
    }

    return function () {
      $.ready()
        .then(() => {
          if (location.pathname === TOPIC_PATH) {
            addStyle(findSimilarCSS)
            createFindSimilarLink()
          }
        })
    }
  })()

  config.init()
    .then((params) => {
      const KEYS = config.KEYS

      if (params[KEYS.tags]) {
        tags()
      }

      if (params[KEYS.pager]) {
        addStyle(pagerCSS)
      }

      if (params[KEYS.download]) {
        download()
      }

      if (params[KEYS.image]) {
        imageView()
      }

      if (params[KEYS.similar]) {
        findSimilar()
      }
    })
}())
