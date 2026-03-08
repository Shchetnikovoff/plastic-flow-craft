

## Plan: Create "ФВГ — Фильтры волокнистые гальванические" landing page

### What we're building
A landing page at `/catalog/gazoochistka/fvg` for galvanic fiber filters (ФВГ/ФВК) with technical specs, dimensions tables, and contact form. No product images were uploaded -- page will use text/icon-based layout like other pages without hero photos.

### Changes

#### 1. New file: `src/pages/GazoochistkaFvg.tsx` (~350 lines)
Following GazoochistkaSkrubbery.tsx pattern:

- **Breadcrumbs**: Каталог > Газоочистка > Фильтры ФВГ/ФВК
- **Hero**: Title "Фильтры волокнистые гальванические (ФВГ/ФВК)", subtitle about air purification in galvanic/chemical production, CTA button
- **"Почему выбирают"**: bullets (очистка ≥96%, 2500-80000 м³/ч, иглопробивное ПП-полотно, сухое/мокрое исполнение, корпус ПП/ПНД/ПВХ, двустороннее обслуживание)
- **Принцип работы**: кассета со складками, накопление, промывка при 700 Па каждые 15-20 суток
- **Условное обозначение**: breakdown of ФВГ-0,37-1-ПП (тип, площадь, сухой/мокрый, материал, сторона)
- **Технические характеристики** (table, 5 models, from scraped data):

  | Фильтр | Произв., м³/ч | Площадь, м² | Макс. конц., мг/м³ | Гидр. сопр. нач., Па | Гидр. сопр. кон., Па | Очистка, % |
  |--------|--------------|-------------|--------------------|-----------------------|-----------------------|------------|
  | ФВГ-0,37 | 2500-5000 | 0,37 | 10 | 350 | 700 | 96 |
  | ФВГ-0,74 | 5000-10000 | 0,74 | 10 | 350 | 700 | 96 |
  | ФВГ-1,6 | 10000-20000 | 1,6 | 10 | 350 | 700 | 96 |
  | ФВГ-3,2 | 20000-40000 | 3,2 | 10 | 350 | 700 | 96 |
  | ФВГ-6,4 | 60000-80000 | 6,4 | 10 | 350 | 700 | 96 |

- **Габариты** (table, 5 models, 9 columns from scraped data):

  | Тип | L | L1 | H | H1 | H2 | D | D1 | D2 |
  |-----|---|----|----|----|----|---|----|----|
  | ФВГ-0,37 | 1050 | 480 | 1000 | 600 | 700 | 355 | 355 | 450 |
  | ... through ФВГ-6,4 |

- **Достоинства мокрой очистки**: 4 bullet cards
- **Дополнительная комплектация**: 5 items (ёмкость, насос, уровнемер, смотровые окна, запорная арматура)
- **Преимущества сотрудничества**: 6 cards (standard pattern)
- **CTA form**: Contact form (name, phone, email, description)

#### 2. Update `src/data/catalog.ts`
- go3: add `externalPath: "/catalog/gazoochistka/fvg"`

#### 3. Update `src/App.tsx`
Add route + import for `/catalog/gazoochistka/fvg` -> `GazoochistkaFvg`

### Files modified
- `src/pages/GazoochistkaFvg.tsx` (new)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (update go3 externalPath)

