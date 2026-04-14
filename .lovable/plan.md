

# План: Добавить галерею рендеров в карточки скрубберов

## Что будет сделано

1. **Обновление данных `src/data/scrubberProducts.ts`**
   - Заменить одиночное поле `image: string` на массив `images: string[]`
   - Каждый скруббер получит галерею из 4 изображений: `/images/skrubber-vert-real-1.jpg`, `/images/skrubber-vert-real-2.jpg`, `/images/skrubber-vertikalnyj-1.jpg`, `/images/skrubber-vertikalnyj-2.jpg`

2. **Обновление карточки товара в `src/pages/Product.tsx`**
   - Заменить одиночное изображение на компонент `ImageGalleryWithLightbox` (уже используется в других карточках)
   - Галерея с миниатюрами и лайтбоксом для просмотра рендеров в полном размере

3. **Обновление таблицы `src/pages/GazoochistkaSkrubbery.tsx`**
   - Обновить обращение к `image` → `images[0]` (если используется)

## Технические детали

- Доступные изображения: `skrubber-vert-real-1.jpg`, `skrubber-vert-real-2.jpg`, `skrubber-vertikalnyj-1.jpg`, `skrubber-vertikalnyj-2.jpg`
- Компонент `ImageGalleryWithLightbox` уже реализован и используется в других разделах каталога
- Затрагиваемые файлы: 3

