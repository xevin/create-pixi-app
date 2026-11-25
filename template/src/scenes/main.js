import Scene from "../core/scene"

export default class MainScene extends Scene {
  #width = 0
  #height = 0

  constructor(width = 0, height = 0) {
    super()

    this.#width = width
    this.#height = height
  }

  resize(width, height) {
    this.#width = width
    this.#height = height
  }
}
