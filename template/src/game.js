import { Assets, Sprite } from "pixi.js"
import App from "./core/app"
import MainScene from "./scenes/main"


export class GameApp extends App {
  init(width, height) {
    this.bg = new Sprite({
      texture: Assets.get("background"),
      anchor: 0.5,
    })
    this.backgroundHeight = this.bg.height
    this.backgroundWidth = this.bg.width
    this.bg.scale.set(Math.max(width/this.backgroundWidth, height/this.backgroundHeight))

    this.addChild(this.bg)

    this.mainScene = new MainScene(width, height)
    this.sceneManager.addScene("main", this.mainScene)
    this.addChild(this.mainScene)
    this.sceneManager.setCurrent("main")
    this.sceneManager.start()

    this.resize(width, height)
  }

  resize(width, height) {
    super.resize(width, height)

    const scaleCover = Math.max(width/this.backgroundWidth, height/this.backgroundHeight)
    // фоновое изображение всегда покрывает весь экран
    this.bg.scale.set(scaleCover)
  }
}
