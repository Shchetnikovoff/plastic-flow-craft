

## Plan: Add All KNS Products from nasos-kit.ru to PP Page

### Data Collected

36 KNS models scraped from nasos-kit.ru (4 pages). All listed as fiberglass on source site. Per your instructions, material will be set to "Полипропилен" and fiberglass references excluded. Article codes will follow project standard: `СЗПК.КНС.ПП.{Q}-{H}`.

### Complete Product List (36 models)

```text
Model        D      H     Q   H   Qmax  Hmax  Pumps  kW    Price
10-5       1300  2700   10   5    16    10     2    0.55   638500
10-10      1300  2700   10  10    20    14     2    0.75   638500
10-15      1300  2900   10  15    24    19     2    1.1    676500
15-10      1300  2900   15  10    24    19     2    1.1    676500
15-15      1300  2900   15  15    26    21     2    1.5    693000
20-10      1300  2900   20  10    30    16     2    2.2    703000
20-15      1300  2900   20  15    30    18     2    2.2    703000
10-20      1300  2900   10  20    20    25     2    2.2    711000
15-20      1300  2900   15  20    21    25     2    2.2    711000
15-25      1500  3000   15  25    21    30     2    3.0    834000
20-20      1500  2800   20  20    30    25     2    3.0    846000
20-25      1500  3200   20  25    30    30     2    4.0    859000
25-10      1500  3200   25  10    32    15     2    1.5    916000
25-20      1500  3200   25  20    32    25     2    3.0    923000
15-30      1300  3000   15  30    21    38     2    4.0    939000
25-25      1500  3300   25  25    32    30     2    5.5    943000
30-15      1500  3400   30  15    35    23     2    3.0    979000
20-30      1500  3200   20  30    30    35     2    4.0    987000
15-40      1500  3100   15  40    21    45     2    5.5    992800
40-10      1500  3400   40  10    52    15     2    2.2    998000
25-30      1500  3300   25  30    32    34     2    5.5   1027000
30-20      1500  3400   30  20    38    29     2    5.5   1046000
30-25      1500  3400   30  25    38    29     2    5.5   1046000
30-10      1500  3400   30  10    40    15     2    2.2   1056000
40-15      1500  3400   40  15    50    19     2    4.0   1102000
40-20      1500  3400   40  20    50    25     2    5.5   1102000
25-35      1500  3300   25  35    32    39     2    7.5   1114000
50-15      1500  3700   50  15    55    30     2    5.5   1130000
50-10      1500  3400   50  10    62    15     2    4.0   1137000
60-10      2000  3600   60  10    80    16     2    4.0   1474000
70-10      2000  3650   70  10    95    16     2    5.5   1500000
60-15      2000  3700   60  15    80    22     2    5.5   1521000
70-15      2000  3700   70  15    85    25     2    5.5   1521000
80-10      2000  3650   80  10    95    20     2    7.5   1524000
80-15      2000  3650   80  15    95    20     2    7.5   1524000
50-25      2000  3600   50  25    65    30     2    7.5   1543000
60-20      2000  3550   60  20    85    28     2    7.5   1566000
50-20      2000  3600   50  20    60    25     2    7.5   1604000
```

### Changes

**1. Update `src/data/knsPpProducts.ts`**
- Replace 12 existing models with 38 models (all from source)
- Material: "Полипропилен" for all
- Article format: `СЗПК.КНС.ПП.{Q}-{H}` (e.g. `СЗПК.КНС.ПП.10-5`)
- Prices taken directly from source (same pricing as current data where models overlap)

**2. Update `src/pages/KnsPpPage.tsx`**
- Update features list: expand diameter range to "от 1300 до 2000 мм", production capacity "до 80 м³/ч"
- Update specs cards to reflect larger models (depth up to 10 m, pumpPower up to 7.5 kW)
- Add note below table: "Изготовление КНС нестандартных размеров — по запросу"
- Image remains `kns-pp-cutaway-v2.jpg`

### Technical Details
- `KnsPpProduct` interface unchanged
- No routing changes
- Description text from source site will be adapted for the features/specs sections (excluding any fiberglass references)

