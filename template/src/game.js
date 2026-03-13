import { Assets, Sprite, Text } from "pixi.js"
import App from "./core/app"

export class Game extends App {
  init(width, height) {
    this.bg = new Sprite({
      texture: Assets.get("background"),
      anchor: 0.5,
    })
    this.backgroundHeight = this.bg.height
    this.backgroundWidth = this.bg.width
    this.bg.scale.set(Math.max(width/this.backgroundWidth, height/this.backgroundHeight))

    this.title = new Text({
      text: "Title",
      anchor: 0.5,
      style: {
        fontSize: 100,
        fontWeight: 600,
        stroke: {
          width: 8,
          color: "#000000"
        }
      },
    })

    this.addChild(
      this.bg,
      this.title,
    )

    this.resize(width, height)
  }

  resize(width, height) {
    super.resize(width, height)

    const scaleCover = Math.max(width/this.backgroundWidth, height/this.backgroundHeight)
    // фоновое изображение всегда покрывает весь экран
    this.bg.scale.set(scaleCover)

    // сохраняем положение в верхней части экрана
    this.title.y = height/-2.4

    if(width > height) {
      // альбомная ориентация
      this.title.scale.set(width/1280)
    } else {
      // портретная ориентация
      this.title.scale.set(width/625)
    }
  }
}
