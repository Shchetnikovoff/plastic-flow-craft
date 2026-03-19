

## Plan: Update FFU product cards with full technical data from vo-da.ru

**What:** Add `massWet` field and suspended solids data to FFU product cards, matching vo-da.ru layout (without prices).

### Changes

**1. `src/data/ffuProducts.ts`** — Add `massWet` field to interface and all models

| Model | massWet |
|-------|---------|
| ФФУ-1К | 0,63 |
| ФФУ-2М | 1,0 |
| ФФУ-4М | 2,28 |
| ФФУ-6М | 3,86 |
| ФФУ-10 | 7,0 |
| ФФУ-15 | 10,5 |
| ФФУ-20 | 12,9 |
| ФФУ-30 | 17,64 |
| ФФУ-40 | 23,0 |
| ФФУ-50 | 23,0 |
| ФФУ-65 | 36,0 |
| ФФУ-80 | 42,6 |
| ФФУ-100 | 45,6 |

**2. `src/pages/Product.tsx`** — Update FFU specs grid (lines 574-600)

Expand from 6 to 8 grid cells:
- Производительность, Мощность, Габариты (Д×Ш×В), Масса сухая, **Масса с водой** (new), Материал корпуса, Рабочая температура

Add a new "Взвешенные вещества" info block below the grid (matches vo-da.ru):
- На входе: 50–200 мг/л
- Локальная очистка: 15–40 мг/л
- Глубокая очистка: 3 мг/л

**3. `src/pages/Product.tsx`** — Update PDF spec extraRows (~line 495)

Add `massWet` and suspended solids rows to PDF generation.

