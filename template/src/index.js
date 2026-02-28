import { loadAssets } from "./assets"
import { Game } from "./game"

let app

window.addEventListener("load", async () => {
  await loadAssets()
  app = new Game(window.innerWidth, window.innerHeight)
})


window.addEventListener("resize", () => {
  app.resize(window.innerWidth, window.innerHeight)
})
