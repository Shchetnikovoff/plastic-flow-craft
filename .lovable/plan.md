

## Problem

The `CatalogPage` (generic catalog route `/catalog/:categorySlug`) is missing a footer section. The `EmkostiPage` has both a Header and footer, but `CatalogPage` ends abruptly after the subcategory grid/detail card without any footer.

## Solution

Add the same company footer block to `CatalogPage.tsx` (the category view with the sidebar), matching the style used in `EmkostiPage.tsx` (lines 438-443):

### File: `src/pages/CatalogPage.tsx`

Add a footer section after the closing `</div>` of the two-column layout (after line ~210), before `</main>`:

```
<footer className="border-t border-border pt-6 pb-4 mt-10 text-center text-xs text-muted-foreground space-y-1">
  <p className="font-semibold text-foreground">ООО СЗПК «Пласт-Металл ПРО»</p>
  <p>Ленинградская область, д. Разметелево, ул. Строителей 27</p>
  <p>Телефон: +7 (963) 322-55-40 · E-mail: osobenkov@list.ru</p>
  <p>Режим работы: пн.–пт. 9:00–18:00</p>
</footer>
```

This applies to the main category view (the one with the sidebar + detail card). The Header is already present on all views.

