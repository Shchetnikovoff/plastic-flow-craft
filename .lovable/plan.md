

## Plan: Full Product Catalog Structure from Screenshot

### What We're Building

A complete multi-category product catalog navigation with all categories and subcategories from the screenshot, each as a separate route/page. The current 4 ventilation products (Отвод, Тройник, Раздвижной, Воздуховод) will move under the "ВЕНТИЛЯЦИЯ" category.

### Category Structure (from screenshot)

```text
1. ГАЛЬВАНИКА
   1.1  Гальванические линии ручные
   1.2  Гальванические линии механизированные
   1.3  Гальванические линии автоматические
   1.4  (пусто)
   1.5  Линия подготовки поверхности
   1.6  Гальванические ванны
   1.7  Колокольные ванны
   1.8  Гальванические барабаны
   1.9  Запчасти и комплектующие для гальваники
   1.10 (пусто)

2. ВОДООЧИСТКА
   2.1  Очистные сооружения для гальванических стоков
   2.2  ФФУ флотационно фильтровальная установка
   2.3  Ламельный отстойник тонкослойный сепаратор
   2.4  Мешочный обезвоживатель осадка
   2.5  Станция приготовления
   2.6  Станция приготовления флоакуланта
   2.7  Жироуловители промышленные
   2.8  КОС Комплексные очистные сооружения
   2.9  шкафы и стойки дозирования реагентов

3. ВОДОПОДГОТОВКА
   - система подготовки воды, обратный осмос

4. ВЕНТИЛЯЦИЯ (уже реализовано)
   - Воздуховоды круглого сечения
   - Воздуховоды квадратного сечения
   - Фасонные элементы химстойкие

5. ГАЗООЧИСТКА
   - Скрубберы вертикальные
   - Скрубберы горизонтальные
   - ФВГ Фильтры волокнистые гальванические
   - Каплеуловители

6. ЕМКОСТИ
   - Ёмкости цилиндрические вертикальные
   - Ёмкости цилиндрические горизонтальные
   - Ёмкости подземные
   - Ёмкости прямоугольные
   - Ёмкости пожарные
   - Ёмкости для сейсмическиактивных районов
   - Ёмкости с коническим дном
   - Ёмкость для щёлочи
   - Ёмкость для кислоты
   - Переливные ёмкости для бассейнов

7. ХИМИЧЕСКИЕ РЕАКТОРЫ
   - Химические реакторы из полипропилена
   - Химические реакторы из полиэтилена
   - Реактор для гидрометалургии химического осаждения металла

8. ГИДРОМЕТАЛУРГИЯ
   - Реактор химического осаждения металла
   - Нутч фильтр
   - установки выщелачивания
   - установки сорбционные

9. КНС
   - КНС / Канализационно насосные станции в корпусе SVT
   - КНС в корпусе из полипропилена

+ Нижние блоки:
10. ЛАБОРАТОРНАЯ МЕБЕЛЬ
    - Лабораторная мебель из полипропилена
    - Шкафы хранения реактивов
    - Вытяжные шкафы
    - Мойки лабораторные
    - Стол лабораторный моечный
    - Тумба лабораторная
    - Тумба лабораторная с мойкой
    - Тумба лабораторная с мойкой и сушилкой

11. ШКАФЫ УПРАВЛЕНИЯ
    - Шкафы управления гальванической
    - Шкафы управления очистными
    - Шкафы управления насосами

12. УСЛУГИ
    - Услуги проектирования водоподготовительного и водоочистного оборудования
    - Проектирование КНС
    - Монтаж ёмкостей
    - Монтаж КНС
```

### Technical Approach

#### 1. Create catalog data file `src/data/catalog.ts`
Define the full category tree as typed data: each category has `id`, `name`, `slug`, and `subcategories[]` with the same shape. This drives both the navigation and routing.

#### 2. Create a `CatalogPage` component (`src/pages/CatalogPage.tsx`)
A generic placeholder page for categories that don't have product data yet. Will show:
- The category name and breadcrumb
- List of subcategories as clickable cards
- A "Раздел в разработке" notice for leaf pages without content

#### 3. Refactor Header navigation
Replace the current flat pill-based nav with a **mega-menu dropdown** approach:
- Top bar shows main categories as horizontal tabs (scrollable on mobile)
- Clicking a category opens a dropdown/panel showing its subcategories
- "ВЕНТИЛЯЦИЯ" subcategories link to existing pages (Отвод, Тройник, etc.)
- Other categories link to their placeholder pages

#### 4. Add routes in `App.tsx`
- Add a catch-all `/catalog/:categorySlug` and `/catalog/:categorySlug/:subSlug` routes
- Keep existing routes (`/`, `/troynik`, etc.) intact — they'll also be linked from the ВЕНТИЛЯЦИЯ submenu

#### 5. Files to create/modify
- **Create**: `src/data/catalog.ts` — full category tree
- **Create**: `src/pages/CatalogPage.tsx` — generic category/subcategory page
- **Modify**: `src/components/Header.tsx` — mega-menu navigation with all categories
- **Modify**: `src/App.tsx` — add catalog routes

The existing product pages remain unchanged. The ВЕНТИЛЯЦИЯ category will link directly to the existing routes. All other categories get placeholder pages that can be filled with real content later.

