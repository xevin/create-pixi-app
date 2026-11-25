import { loadAssets } from "./assets"
import { GameApp } from "./game"
import Translation from "./core/translation"
import locales from "./locales"
import config from "./config"

let app

window.addEventListener("load", async () => {
  const tr = Translation.getInstance()
  tr.setData(locales)
  tr.setLang(config.defaultLang)

  await loadAssets()
  app = new GameApp(window.innerWidth, window.innerHeight)
})


window.addEventListener("resize", () => {
  if (!app) return
  app.resize(window.innerWidth, window.innerHeight)
})
