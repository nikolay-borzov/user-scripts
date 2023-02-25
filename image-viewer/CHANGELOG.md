# Image Viewer Changelog

<!--
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
### BREAKING CHANGES
-->

## 1.3.0 - 2022-05-20

### Added

- Set image link title to either "Open in new tab" or "Open viewer" as additional clue for click action
- When a host disallow hotlinking and current workaround doesn't work open full image in a new tab. Use "open in new" icon for such image links
- [Internal] Full image URL extracting logic tests

### Changed

- Disable `image-viewer` script for image host pages
- [Internal] Simplify host links RegExp - remove `http` prefix

### Removed

- Discontinued image hosts extractors
- `fastpic` direct URL as query string param support

### BREAKING CHANGES

- Image host IDs has changed. Config is reset to default enabled

### Fixed

- `vfl`, `imagevenue`, `imagebam`, `imgbb` links handling

## 1.2.1 - 2022-05-14

### Changed

- Update Bliss.js to v1.0.6

## 1.2.0 - 2022-05-09

### Fixed

- Support `fastpic.org`. Also improve full image URL RegExp for case when there many matches for `class="image img-fluid"`
- Support `https://imgbox.com`
- Add workaround for `imagetwist` hot linking restriction
- Update full image URL RegExp for `imagebam`

## 1.1.9 - 2020-11-28

### Fixed

- Improve `radikal.ru` legacy links support. Had to connect user script to `radikal.ru` to get link to the full image.

## 1.1.8 - 2020-09-16

### Added

- ImageVenue new link format support
- `phun` ImageTwist link subdomain support
- Support FastPic direct link as a query string param

### Fixed

- ImageVenue legacy link handling

## 1.1.7 - 2020-07-17

### Fixed

- Full size image displaying in Firefox

## 1.1.6 - 2020-06-12

### Fixed

- FastPic URL extracting after page markup change
- Handle case when URL cannot extracted from a page HTML because pattern has no matches

## 1.1.5 - 2020-01-28

### Fixed

- FastPic URL extracting - get URL from page markup

## 1.1.4 - 2020-01-25

### Fixed

- FastPic URL extracting (new query string param)

## 1.1.3 - 2020-01-18

### Fixed

- FastPic and ImageVenue URL extracting

## 1.1.2 - 2018-08-23

### Changed

- Formatting

## 1.1.1 - 2018-08-23

### Added

- Image host support: `Radikal.ru` (legacy)

### Removed

- Open image in tab if it cannot be loaded

## 1.1.0 - 2018-08-20

### Added

- Intermediate state when loading the image - show thumbnail blurred and resized to actual image size
- Browserlist config

### Changed

- Remove loading indicator on image link

### Fixed

- Greasemonkey 4 compatibility
- Styles for Firefox/Edge

## 1.0.3 - 2018-08-14

### Added

- Image host support: `IMX.to`, `Imageshimage.com`

### Changed

- Hide images count, previous and next buttons when there is only one image in container

### Fixed

- `var` as `img` placeholder support

## 1.0.2 - 2018-08-04

### Added

- Image host support: `VFL.ru`, `Lostpic.net`, `ImgAdult.com`, `imgbb.com`

## 1.0.1 - 2018-07-18

### Fixed

- URL extraction from image host page

## 1.0.0 - 2018-07-18

### Added

- Image host support: `radikal.ru`, `stuffed.ru`, `imageban.ru`, `piccash.net`, `imgdrive.net`, `imgchilibum.ru`, `XXXScreens.com`, `money-pic.ru`
- Display host alias URLs on hover

### Changed

- Image links detection redone
- Update expand/shrink icons

### Fixed

- Backdrop isn't hidden after image view close

## 0.9.0 - 2018-04-22

### Added

- Separate from `ple` script
- Click on backdrop closes view
- Select enabled hosts per domain

### Fixed

- When image cannot be loaded open it in new tab (if `GM_openInTab` available)
