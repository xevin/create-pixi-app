# Шаблон для создания игры на [Pixi.js v8](https://github.com/pixijs/pixijs)


## Как пользоваться

1. Создай проект на основе этого шаблона    
`npm create xevin/pixi-app %название-проекта%`
2. переходи в папку *%название-проекта%*
3. Закинь ассеты в папку *raw-assets/* и собери их с помощью [assetpack](https://github.com/pixijs/assetpack) командой `npm run prebuild`
  1. обработанные ассеты появятся в папке assets/*
4. запускай `npm run dev`
5. *разрабатывай...*
6. сборка `npm run build` в папке **dist/** появится сборка
