import { Assets, Cache, Spritesheet } from "pixi.js"
import { capitalizeFirstLetter } from "./utils"

// Шрифты
import robotoFont from "assets/fonts/Roboto-VariableFont.ttf"

// Изображения
import background from "assets/images/bg.webp"

// Анимации
// import lightingAnimationConfig from "assets/arrow_lighting.png.json"
// import lightingAnimationFrames from "assets/arrow_lighting.png"


const FONTS = {
  // <fontFamily>: <base64>
  roboto: robotoFont,
}

// для загрузки SVG через Assets.load(), его надо преобразовывать в Base64
// svgImage: utils.svgToBase64(svgImage)
const IMAGES = {
  // <assetAlias>: <base64>
  background,
}

const ANIMATIONS = [
  // {
  //   alias: "lighting",
  //   config: lightingAnimationConfig,
  //   frames: lightingAnimationFrames
  // },
]

function objectToAssetList(obj) {
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


async function loadAnimations(alias, config, texture) {
  /* не понял как грузить анимации из json через Assets.load()
    что-бы потом собрать весь проект в один файл

    Поэтому самостоятельно разбираем json, создаём Spritesheet и добавляем в Cache
  * */

  let framesConfig = JSON.parse(config)
  let framesAlias = alias + "Frames"

  await Assets.load({
    alias: framesAlias,
    src: texture
  })

  const sheet = new Spritesheet(
    Assets.get(framesAlias),
    framesConfig
  )

  await sheet.parse()
  Cache.set(alias, sheet)
}


export async function loadAssets() {
  // грузим изображения
  let imageList = objectToAssetList(IMAGES)
  await Assets.load(imageList)

  // грузим анимации. Они станут доступны через Cache.get("animation_name")
  for(let i of ANIMATIONS) {
    await loadAnimations(i.alias, i.config, i.frames)
  }

  // грузим шрифты в Ассеты
  let fontList = objectToFontAssetList(FONTS)
  await Assets.load(fontList)
}
