import { Assets } from "pixi.js"

import bg from "assets/bg.webp"
import robotoFont from "assets/Roboto-VariableFont.ttf"

let fonts = {
  // <FontFamily>: <base64>
  Roboto: robotoFont,
}

let images = {
  bg,
}

function objectToAssetArray(obj) {
  let result = []
  for(let key in obj) {
    result.push({
      alias: key,
      src: obj[key],
    })
  }

  return result
}


function objectToFontAssetList(obj) {
  let result = []
  for(let key in obj) {
    result.push({
      src: obj[key],
      data: {
        family: capitalizeFirstLetter(key.toLowerCase())
      }
    })
  }

  return result
}


export async function loadAssets() {
  // грузим изображения в кэш
  let imageList = objectToAssetArray(images)
  await Assets.load(imageList)

  // шрифты в Ассеты
  let fontList = objectToFontAssetList(fonts)
  await Assets.load(fontList)
}
