

## Plan: Create "Шкафы и стойки дозировочные" landing page

### What we're building
A landing page at `/catalog/vodoochistka/shkafy-dozirovaniya` for dosing cabinets and racks used in reagent management systems. Save 4 uploaded product photos. Follow the same pattern as VodoochistkaDozirovanie.tsx.

### Changes

#### 1. Save 4 uploaded images
- `user-uploads://шкаф_дозировочный.jpg` → `public/images/shkaf-dozirovochnyj-1.jpg`
- `user-uploads://Шкаф_дозирования_гипохлорида_натрия..jpg` → `public/images/shkaf-dozirovochnyj-2.jpg`
- `user-uploads://система_дозирования.jpg` → `public/images/shkaf-dozirovochnyj-3.jpg`
- `user-uploads://Смесительный_узел_для_линии_емкостей..jpg` → `public/images/shkaf-dozirovochnyj-4.jpg`

#### 2. New file: `src/pages/VodoochistkaShkafyDozirovaniya.tsx` (~420 lines)
Same structure as VodoochistkaDozirovanie.tsx:

- **Breadcrumbs**: Каталог → Водоочистка → Шкафы и стойки дозировочные
- **Hero**: Title "Шкафы и стойки дозировочные для реагентных хозяйств", image gallery (4 photos), CTA button
- **Intro**: Description of purpose + "Почему выбирают" bullets (точное дозирование, IP65, химстойкие корпуса, интеграция в АСУ ТП, взрывозащищённое исполнение, полный цикл)

- **Section 1 — Основные компоненты**: List of 8 components (дозировочные насосы, ПЛК, датчики, HMI, защитные устройства, гальванические изоляторы, клеммные колодки, кабельные вводы)

- **Section 2 — Функции**: 8 items as process steps (пропорциональное дозирование, аналоговое управление, постоянное дозирование, контроль уровня, защита от протечек, блокировка при отсутствии потока, управление мешалками, архивирование данных)

- **Section 3 — Типы шкафов**: Accordion with 4 items:
  - ШУ БДР — управление блоком дозирования
  - ШУ УДР — малые расходы, агрессивные среды
  - КРХ — типовые шкафы с опциями (рама, бак, датчики pH)
  - БДР — блочные решения (ёмкости + насосы + вентиляция)

- **Section 4 — Особенности конструкции**: Cards for key specs (корпус полиэстер/AISI 316L, IP65+, PVDF кабельные вводы, взрывозащита, маркировка термоусадкой)

- **Section 5 — Области применения**: 7 application areas (очистные, питьевое водоснабжение, энергетика, металлургия/гальваника, пищевая промышленность, бассейны, нефтегаз)

- **Section 6 — Преимущества сотрудничества**: 6 cards (same pattern)
- **CTA form**: Contact form (name, phone, email, description)

#### 3. Update `src/data/catalog.ts`
Update v9 externalPath: `"/catalog/vodoochistka"` → `"/catalog/vodoochistka/shkafy-dozirovaniya"`

#### 4. Update `src/App.tsx`
Add route + lazy import: `/catalog/vodoochistka/shkafy-dozirovaniya` → `VodoochistkaShkafyDozirovaniya`

### Files modified
- 4 images in `public/images/`
- `src/pages/VodoochistkaShkafyDozirovaniya.tsx` (new)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (update v9 externalPath)

