# Image Viewer Changelog

## 1.1.7 - 2020-07-17

## Fixed

- Full size image displaying in Firefox

## 1.1.6 - 2020-06-12

## Fixed

- FastPic URL extracting after page markup change
- Handle case when URL cannot extracted from a page HTML because pattern has no matches

## 1.1.5 - 2020-01-28

## Fixed

- FastPic URL extracting - get URL from page markup

## 1.1.4 - 2020-01-25

## Fixed

- FastPic URL extracting (new query string param)

## 1.1.3 - 2020-01-18

## Fixed

- FastPic and ImageVenue URL extracting

## 1.1.2 - 2018-08-23

## Fixed

- Formatting

## 1.1.1 - 2018-08-23

## Added

- Image host support: `Radikal.ru` (obsolete)

## Removed

- Open image in tab if it cannot be loaded

## 1.1.0 - 2018-08-20

## Added

- Intermediate state when loading the image - show thumbnail blurred and resized to actual image size
- Browserlist config

## Changed

- Remove loading indicator on image link

## Fixed

- Greasemonkey 4 compatibility
- Styles for Firefox/Edge

## 1.0.3 - 2018-08-14

## Added

- Image host support: `IMX.to`, `Imageshimage.com`

## Changed

- Hide images count, previous and next buttons when there is only one image in container

## Fixed

- `var` as `img` placeholder support

## 1.0.2 - 2018-08-04

## Added

- Image host support: `VFL.ru`, `Lostpic.net`, `ImgAdult.com`, `imgbb.com`

## 1.0.1 - 2018-07-18

## Fixed

- URL extraction from image host page

## 1.0.0 - 2018-07-18

## Changed

- Image links detection redone
- Update expand/shrink icons

## Added

- Image host support: `radikal.ru`, `stuffed.ru`, `imageban.ru`, `piccash.net`, `imgdrive.net`, `imgchilibum.ru`, `XXXScreens.com`, `money-pic.ru`
- Display host alias URLs on hover

## Fixed

- Backdrop isn't hidden after image view close

## 0.9.0 - 2018-04-22

## Added

- Separate from ple
- Click on backdrop closes view
- Select enabled hosts per domain

## Fixed

- When image cannot be loaded open it in new tab (if `GM_openInTab` available)
