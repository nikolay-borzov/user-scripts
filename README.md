# user-scripts
[![JavaScript Style Guide][standard-image]][standard-url] [![Build Status][travis-image]][travis-url]

User scripts for Tampermonkey and ~~Greasemonkey~~

# Image Viewer
[![IV file size][iv-size]][iv-url]

Allows viewing full size images from image hosts (e.g. Fastpic) w/o leaving the page.

## Controls

Keyboard:  
`←` - Previous image  
`→` - Next image  
`Esc` - Close image view  
`Space` - Toggle image full height

Mouse:  
`double click` - Toggle image full height  
`click` on backdrop - Close image view  

## Config

Available through Tampermonkey menu or via `imageViewer.settings()` console command.

# JoyReactor Download Button
[![JRDB file size][jrdb-size]][jrdb-url] [![JRDB OpenUserJS][open-user-js-image]][jrdb-open-user-js-url] [![JRDB GreasyFork][greasy-fork-image]][jrdb-greasy-fork-url]
- Shows image download link on hover
- Makes gif image link downloadable

"Downloadable" means you can download image by clicking (lmb) on the button. Link has [download](https://caniuse.com/#feat=download) attribute

# Pornolab Enhancer
[![PLE file size][ple-size]][ple-url] [![PLE OpenUserJS][open-user-js-image]][ple-open-user-js-url] [![PLE GreasyFork][greasy-fork-image]][ple-greasy-fork-url] [![PLE SleazyFork][sleazy-fork-image]][ple-sleazy-fork-url]

Improves UX

## Tags
Turns everything inside `[ ]` into search link. Also removes tags from the title

## Find similar
Searches for similar posts

## Pager
Improves pager styles

## Download
Adds quick download button to the top of the page

### Config menu
Disable/enable certain features. Available through menu link "PLE"

## Attributions
- [Flag](https://www.flaticon.com/packs/countrys-flags) icons made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
- [Medical](https://www.flaticon.com/packs/medical-asserts) icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
- Picture icon made by made by [Good Ware](https://www.flaticon.com/authors/good-ware) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)

## Tools and Resources

- [Material Design icons](https://material.io/icons)
- [Material Design icons](https://materialdesignicons.com)
- [SVGOMG - SVGO's Missing GUI](https://jakearchibald.github.io/svgomg)
- [b64.io - image optimisation & base64 encode](http://b64.io)
- [Inkscape](https://inkscape.org/en/)
- [Material Design Button "ripple" effect animation (pure CSS)](https://codepen.io/lehollandaisvolant/pen/dMQXYX)
- [Keep a Changelog](http://keepachangelog.com/en/1.0.0)
- [Online regex tester and debugger: PHP, PCRE, Python, Golang and JavaScript](https://regex101.com)

[travis-image]: https://travis-ci.org/shikiyoku/user-scripts.svg?branch=master
[travis-url]: https://travis-ci.org/shikiyoku/user-scripts

[greenkeeper-image]: https://badges.greenkeeper.io/shikiyoku/user-scripts.svg
[greenkeeper-url]: https://greenkeeper.io/

[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

[iv-size]: https://img.shields.io/github/size/shikiyoku/user-scripts/dist/image-viewer.user.js.svg
[iv-url]: https://github.com/shikiyoku/user-scripts/raw/master/dist/image-viewer.user.js

[jrdb-size]: https://img.shields.io/github/size/shikiyoku/user-scripts/dist/joyreactor-download-button.user.js.svg
[jrdb-url]: https://github.com/shikiyoku/user-scripts/raw/master/dist/joyreactor-download-button.user.js
[jrdb-open-user-js-url]: https://openuserjs.org/scripts/shikiyoku/JoyReactor_Download_Button
[jrdb-greasy-fork-url]: https://greasyfork.org/en/scripts/35272-joyreactor-download-button

[ple-size]: https://img.shields.io/github/size/shikiyoku/user-scripts/dist/pornolab-enhancer.user.js.svg
[ple-url]: https://github.com/shikiyoku/user-scripts/raw/master/dist/pornolab-enhancer.user.js
[ple-open-user-js-url]: https://openuserjs.org/scripts/shikiyoku/Pornolab_Enhancer
[ple-greasy-fork-url]: https://greasyfork.org/en/scripts/35355-pornolab-enhancer
[ple-sleazy-fork-url]: https://sleazyfork.org/en/scripts/35355-pornolab-enhancer

[open-user-js-image]: https://img.shields.io/badge/OpenUserJS-install-304051.svg
[greasy-fork-image]: https://img.shields.io/badge/Greasy%20Fork-install-690001.svg
[sleazy-fork-image]: https://img.shields.io/badge/Sleazy%20Fork-install-690001.svg
