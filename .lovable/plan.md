

## Plan: Restructure catalog to match the new 7-category site map

### What gets removed
Delete 5 categories and their dedicated pages/routes:
- **Гальваника** → remove `GalvanikaPage.tsx` route
- **Водоподготовка** → remove `VodopodgotovkaPage.tsx` route
- **Лабораторная мебель** → remove `LabMebelPage.tsx` route
- **Шкафы управления** → remove `ShkafyUpravleniyaPage.tsx` route
- **Услуги** → remove `UslugiPage.tsx` route

### New 7-category structure in `src/data/catalog.ts`

**1. ЁМКОСТИ** (9 subcategories):
1.1 Ёмкости цилиндрические вертикальные (new, no page)
1.2 Ёмкости цилиндрические горизонтальные (new, no page)
1.3 Ёмкости подземные → existing page
1.4 Ёмкости прямоугольные → existing page
1.5 Ёмкости пожарные → existing page
1.6 Ёмкости для сейсмически активных районов (new, no page)
1.7 Ёмкость для щелочи → existing kisloty-shchelochi page
1.8 Ёмкость для кислоты → existing kisloty-shchelochi page
1.9 Переливные ёмкости для бассейнов (new, no page)

**2. ВОДООЧИСТКА** (8 subcategories):
2.1 ФФУ → existing page
2.2 Ламельный отстойник → existing page
2.3 Мешочный обезвоживатель → existing page
2.4 Станция приготовления коагулянта → existing dosing page
2.5 Станция приготовления флокулянта (new, no page — description only)
2.6 Жироуловители → existing page
2.7 КОС (rename from ЛОС) → existing los page
2.8 Шкафы и стойки дозирования → existing page

**3. КНС** (2) — keep as-is

**4. ХИМИЧЕСКИЕ РЕАКТОРЫ** (2 — remove ПЭ reactor):
4.1 Химические реакторы из полипропилена
4.2 Реактор для гидрометаллургии

**5. ГИДРОМЕТАЛЛУРГИЯ** (4) — keep as-is

**6. ГАЗООЧИСТКА** (4) — keep as-is

**7. ВЕНТИЛЯЦИЯ** (2 grouped items instead of 8 individual):
7.1 Воздуховоды круглого сечения (link to existing round-section pages as a group)
7.2 Воздуховоды квадратного/прямоугольного сечения (description only, no page)

### Files to modify

1. **`src/data/catalog.ts`** — Rewrite the entire `catalog` array to match the 7-category structure above. Remove galvanika, vodopodgotovka, labmebel, shkafy-upravleniya, uslugi entries. Reorder: emkosti first, then vodoochistka, kns, reaktory, gidrometallurgiya, gazoochistka, ventilyatsiya.

2. **`src/App.tsx`** — Remove imports and routes for: `GalvanikaPage`, `VodopodgotovkaPage`, `LabMebelPage`, `ShkafyUpravleniyaPage`, `UslugiPage`. Keep all other routes intact.

3. **`src/pages/Vodoochistka.tsx`** — Update the subcategory names to match (rename ЛОС→КОС, split dosing into коагулянт/флокулянт if rendered from catalog data).

No page files are deleted — they just become unreachable via routes. The Header navigation dynamically reads from `catalog`, so it will auto-update.

