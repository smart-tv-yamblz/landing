# Яндекс Музыка на Smart TV

## Подготовка к разработке

```
git clone https://github.com/smart-tv-yamblz/landing yasmarttv-landing
cd yasmarttv-landing
npm i
```

## Gulp задачи

### `build-styles`
Сборка стилей из файла-builder'a `assets/styles/main.css` в `assets/styles/bundle.css`.

### `minify-styles`
Минификация файла `assets/styles/bundle.css` в `assets/styles/bundle.min.css`.

### `templates`
Генерация страниц из `templates/pages/` согласно шаблонам в `templates/` и компонентам страницы в `templates/partials/`.

### `minify-html`
Минификация HTML-файлов страниц в корневой директории.

### `html-injection`
> Для рroduction среды.

Замена файлов стилей из development среды на production.

### `build`
Сборка проекта: последовательное выполнение вышеизложенных Gulp-задач.

## Сборка под production среду

```
NODE_ENV=production gulp build
```

По умолчанию `NODE_ENV=development`.
