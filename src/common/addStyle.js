/* global GM_addStyle */

export default 'GM_addStyle' in window
  ? GM_addStyle
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
