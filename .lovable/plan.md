

## Plan: Add anchor navigation to all category and product pages

**What:** Add the same anchor navigation panel (pill-shaped buttons for smooth-scrolling to sections) that exists on `VodoochistkaZhirouloviteli.tsx` to all other category landing pages and detailed product subpages across the site. Also add `id` attributes to sections that lack them.

### Pages to update (28 total)

**Category landing pages (7)** — sections: Описание, Назначение, Материалы/Модификации, Преимущества, Каталог, Заявка
1. `EmkostiPage.tsx`
2. `Vodoochistka.tsx`
3. `GazoochistkaPage.tsx`
4. `KnsPage.tsx`
5. `ReaktoryPage.tsx`
6. `GidrometallurgiyaPage.tsx`
7. `VentilyatsiyaPage.tsx`

**Product subpages with detailed sections (17)** — sections vary per page (Описание, Назначение, Принцип работы, Модельный ряд, Характеристики, Опции, Преимущества, Заявка)
8. `EmkostiPozharnye.tsx`
9. `EmkostiPodzemnye.tsx`
10. `EmkostiPerelivnye.tsx`
11. `EmkostiPryamougolnye.tsx`
12. `EmkostiKislotyShchelochi.tsx`
13. `VodoochistkaFfu.tsx`
14. `VodoochistkaLamelnyj.tsx`
15. `VodoochistkaLos.tsx`
16. `VodoochistkaDozirovanie.tsx`
17. `VodoochistkaObezvozhivatel.tsx`
18. `VodoochistkaShkafyDozirovaniya.tsx`
19. `GazoochistkaSkrubbery.tsx`
20. `GazoochistkaFvg.tsx`
21. `GazoochistkaKapleuloviteli.tsx`
22. `ZhuGorizontalnye.tsx`
23. `ZhuNazemnyeVertikalnye.tsx`
24. `ZhuPodzemnyeVertikalnye.tsx`
25. `ZhuPryamougolnye.tsx`

**Excluded** (already has nav or too simple): `VodoochistkaZhirouloviteli.tsx` (done), `GalvanikaPage.tsx`, `Index.tsx`, `AboutPage.tsx`, `CatalogPage.tsx`, `Product.tsx`, `NotFound.tsx`

### Changes per page

For each page:

1. **Add `id` attributes** to each `<section>` block (e.g. `id="opisanie"`, `id="naznachenie"`, `id="modeli"`, `id="preimushchestva"`, `id="cta-form"`)

2. **Insert `<nav>` block** after the Hero section with pill buttons matching the page's actual sections. Example for a category page:
```tsx
<nav className="mb-8 flex flex-wrap gap-2">
  {[
    { id: "opisanie", label: "Описание" },
    { id: "naznachenie", label: "Назначение" },
    { id: "materialy", label: "Материалы" },
    { id: "preimushchestva", label: "Преимущества" },
    { id: "katalog", label: "Каталог" },
    { id: "cta-form", label: "Заявка" },
  ].map((s) => (
    <button
      key={s.id}
      onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {s.label}
    </button>
  ))}
</nav>
```

Each page gets labels tailored to its actual content sections. Product subpages with model tables get "Модели" anchor, pages with "Принцип работы" get that anchor, etc.

### Files modified
- 25 page files in `src/pages/`

