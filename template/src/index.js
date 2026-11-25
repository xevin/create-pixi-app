import { loadAssets } from "./assets"
import { GameApp } from "./game"

let app

window.addEventListener("load", async () => {
  await loadAssets()
  app = new GameApp(window.innerWidth, window.innerHeight)
})


window.addEventListener("resize", () => {
  if (!app) return
  app.resize(window.innerWidth, window.innerHeight)
})
