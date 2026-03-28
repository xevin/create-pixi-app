# Шаблон для создания игры на [Pixi.js v8](https://github.com/pixijs/pixijs)

*создано с помощью `npm create xevin/pixi-app`*

## Как пользоваться

1. Закинь ассеты в папку `_raw_assets/`
2. собери ассеты с помощью [assetpack](https://github.com/pixijs/assetpack) командой `npm run assets:build`
   (обработанные ассеты появятся в папке `assets`)
3. подключи нужные ассеты в файле `src/assets.js`
4. запускай `npm run dev`
5. разрабатывай
6. сбирай через `npm run build`. В папке `dist/` появится сборка
