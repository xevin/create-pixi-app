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

    let title = new Text({
      text: "Title",
      anchor: 0.5,
      eventMode: "static",
    })

    this.addChild(
      this.bg,
      title,
    )
  }

  resize(width, height) {
    super.resize(width, height)

    const scaleCover = Math.max(width/this.backgroundWidth, height/this.backgroundHeight)
    this.bg.scale.set(scaleCover)
  }
}
