

## Plan: Add "Р" to rastrub article prefix

Two small changes:

### 1. `src/data/products.ts` (line 10)
Change rastrub prefix from `"ОТВ"` to `"ОТВР"`.

### 2. `src/pages/Index.tsx`
In the article decoding scheme, update the description for rastrub connection type from "Отвод вентиляционный" to "Отвод вентиляционный раструбный" (to explain the "Р").

