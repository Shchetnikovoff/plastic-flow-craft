

# План: Очистка галереи горизонтальных скрубберов

## Что будет сделано

1. **Удаление 3-го и 4-го фото** — убрать из `defaultImages` изображения вертикальных скрубберов (`skrubber-vert-real-1.jpg`, `skrubber-vert-real-2.jpg`), они не относятся к горизонтальным моделям.

2. **Очистка главного рендера от надписи** — обработать `skrubber-goriz-render.png` через Canvas API (скрипт на Python с PIL или клиентская обработка), чтобы убрать текст/надпись. Сохранить очищенную версию как `skrubber-goriz-render-clean.png`.

3. **Обновление `defaultImages`** — галерея будет содержать 2 изображения:
   - `skrubber-goriz-render-clean.png` (главное фото — очищенный рендер)
   - `skrubber-goriz-chertezh.webp` (чертёж)

## Технические детали

- Файл: `src/data/scrubberHorizProducts.ts` — обновить массив `defaultImages`
- Скрипт обработки изображения: Python PIL для закрашивания области с текстом (inpainting белым/фоновым цветом)
- Результат: `public/images/skrubber-goriz-render-clean.png`

## Затрагиваемые файлы: 1
- `src/data/scrubberHorizProducts.ts`
- + создание очищенного изображения в `public/images/`

