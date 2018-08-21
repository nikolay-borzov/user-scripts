# Image Viewer Changelog

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
- Url extraction from image host page

## 1.0.0 - 2018-07-18
## Changed
- Image links detection redone
- Update expand/shrink icons

## Added
- Image host support: `radikal.ru`, `stuffed.ru`, `imageban.ru`, `piccash.net`, `imgdrive.net`, `imgchilibum.ru`, `XXXScreens.com`, `money-pic.ru`
- Display host alias urls on hover

## Fixed
- Backdrop isn't hidden after image view close

## 0.9.0 - 2018-04-22
## Added
- Separate from ple
- Click on backdrop closes view
- Select enabled hosts per domain

## Fixed
- When image cannot be loaded open it in new tab (if `GM_openInTab` available)
