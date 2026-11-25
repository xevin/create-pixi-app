import { Rectangle, Text } from "pixi.js"
import Scene from "../core/scene"
import Translation from "../core/translation"
import SoundManager from "../core/sound_manager"

const snd = SoundManager.getInstance()

export default class MainScene extends Scene {
  #width = 0
  #height = 0

  constructor(width = 0, height = 0) {
    super()

    this.#width = width
    this.#height = height

    const tr = Translation.getInstance()

    this.title = new Text({
      text: tr.msg("GAME_TITLE"),
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

    this.addChild(this.title)

    // Звук клика
    this.eventMode = "static"
    this.on("pointerdown", () => {
      // случайный питч
      snd.play("clickSound", { speed: 0.95 + Math.random() * 0.1 })
    })

    this.resize(width, height)
  }

  resize(width, height) {
    this.#width = width
    this.#height = height

    // клик по всей сцене
    this.hitArea = new Rectangle(-width/2, -height/2, width, height)

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
