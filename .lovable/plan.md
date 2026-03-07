

## Plan: Fix images by section + add clickable rows on Fire Containers page

### Problem
1. The hero images on `EmkostiPozharnye.tsx` show a mix — need each image to correspond to the three tab types (rectangular, underground, horizontal)
2. Table rows are not clickable — other configurator pages (Index, Troynik, Razdvizhnoy, Vozdukhovod) use `useNavigate` to go to `/product/{article}` on row click

### Changes — single file: `src/pages/EmkostiPozharnye.tsx`

#### 1. Fix hero images to match the three container types
Currently shows: `emkost-pryam-pp-1.png`, `emkosti-podzemnye-1.jpg`, `emkosti-hero-1.png`

Replace with labeled images matching each tab:
- **Прямоугольные**: `emkost-pryam-pp-1.png` (rectangular tank in frame)
- **Подземные**: `emkosti-podzemnye-1.jpg` (underground tank)
- **Горизонтальные**: `emkosti-hero-2.png` (horizontal cylindrical tank on supports)

Add text labels under each image indicating the type.

#### 2. Make all table rows clickable
Add `useNavigate` from react-router-dom. For each `<TableRow>` in all 3 tabs:
- Add `cursor-pointer` class and `onClick={() => navigate(`/product/${encodeURIComponent(item.article)}`)}`
- Style the article cell with `underline underline-offset-2` to indicate clickability
- Same pattern used in Index.tsx, Troynik.tsx, Razdvizhnoy.tsx, Vozdukhovod.tsx

### No other files changed

