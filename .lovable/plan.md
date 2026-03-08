

## Plan: Unify all landing pages to match Vodoochistka structure

### Reference: Vodoochistka page layout
The standard structure to replicate:
1. **Breadcrumbs** (Каталог → Категория → Страница)
2. **Hero**: company label → h1 → subtitle → CTA button → 2-image grid (button BEFORE images)
3. **Intro**: description + "Почему выбирают нас" checklist
4. **Content sections** (unique per page, kept as-is)
5. **Partnership advantages** (icon cards in 3-col grid)
6. **CTA form** (Card wrapper, 2-col form, `scroll-mt-20`)
7. **Footer** (2-column: left = company name/INN/OGRN/address, right = phone/email/website)

### What changes on each page

**Structure fixes (hero order, CTA button before images):**
- `GazoochistkaFvg.tsx` — images currently before button, swap order
- `GazoochistkaKapleuloviteli.tsx` — check and fix hero order

**Add missing footer (2-column format from Vodoochistka):**
- `GazoochistkaSkrubbery.tsx`
- `GazoochistkaFvg.tsx`
- `GazoochistkaKapleuloviteli.tsx`
- `EmkostiPodzemnye.tsx`
- `EmkostiPryamougolnye.tsx`
- `EmkostiPozharnye.tsx`
- `VodoochistkaLos.tsx`
- `VodoochistkaShkafyDozirovaniya.tsx`

**Normalize existing footer to 2-column format:**
- `VodoochistkaFfu.tsx` — centered → 2-column
- `VodoochistkaLamelnyj.tsx` — centered → 2-column
- `VodoochistkaObezvozhivatel.tsx` — centered → 2-column
- `VodoochistkaDozirovanie.tsx` — centered → 2-column
- `VodoochistkaZhirouloviteli.tsx` — check format
- `EmkostiPage.tsx` — centered → 2-column

### Unified footer block (applied to all 14 pages)
```text
<footer className="border-t border-border pt-6 pb-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted-foreground">
    <div>
      <p className="font-semibold text-foreground mb-1">ООО СЗПК «Пласт-Металл ПРО»</p>
      <p>ИНН: 7811614030</p>
      <p>ОГРН: 1167847349498</p>
      <p>196626, СПб, п. Шушары, Московское шоссе, д. 244</p>
    </div>
    <div className="sm:text-right">
      <p>Тел.: +7 (812) 507-85-77</p>
      <p>E-mail: info@plast-metall.pro</p>
      <p>www.plast-metall.pro</p>
    </div>
  </div>
</footer>
```

### Files modified
14 page files — content stays the same, only layout/structure adjustments:
1. `src/pages/GazoochistkaSkrubbery.tsx` — add footer
2. `src/pages/GazoochistkaFvg.tsx` — fix hero order, add footer
3. `src/pages/GazoochistkaKapleuloviteli.tsx` — fix hero order, add footer
4. `src/pages/EmkostiPage.tsx` — normalize footer
5. `src/pages/EmkostiPodzemnye.tsx` — add footer
6. `src/pages/EmkostiPryamougolnye.tsx` — add footer
7. `src/pages/EmkostiPozharnye.tsx` — add footer
8. `src/pages/VodoochistkaFfu.tsx` — normalize footer
9. `src/pages/VodoochistkaLamelnyj.tsx` — normalize footer
10. `src/pages/VodoochistkaObezvozhivatel.tsx` — normalize footer
11. `src/pages/VodoochistkaDozirovanie.tsx` — normalize footer
12. `src/pages/VodoochistkaZhirouloviteli.tsx` — normalize footer
13. `src/pages/VodoochistkaLos.tsx` — add footer
14. `src/pages/VodoochistkaShkafyDozirovaniya.tsx` — add footer

