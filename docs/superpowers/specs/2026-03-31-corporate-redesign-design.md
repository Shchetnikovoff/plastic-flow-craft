# Full Corporate Redesign — All Pages in CorporateHome UX Style

**Date:** 2026-03-31
**Approach:** Hybrid (CorporatePageShell + Section Library)
**Epic:** plastic-flow-craft-qny

---

## Problem

CorporateHome is a polished landing page with dark hero, gradient overlays, stats bar, animated product grids, testimonials carousel, FAQ accordion, and CTA. All other 43 pages use `CatalogPageShell` with a plain white header, simple breadcrumbs, and minimal styling — creating a jarring UX gap.

## Goal

Every page feels like a mini-landing: same visual identity as CorporateHome, with category-specific content. Unified navigation (CorporateHeader/CorporateFooter) across the entire site.

---

## Architecture

### 1. CorporatePageShell (new component)

Replaces `CatalogPageShell` on all pages. Located at `src/components/corporate/CorporatePageShell.tsx`.

**Structure:**
```
CorporateHeader
  DarkHero (breadcrumbs, badge, h1 with accent word, subtitle, CTA buttons, bg image + gradient)
  StatsBar (optional, configurable per page)
  {children} — section components
  CTABar ("Готовы обсудить проект?" + phone + email)
CorporateFooter
```

**Props:**
```ts
interface CorporatePageShellProps {
  breadcrumbs: { label: string; href?: string }[]
  title: string
  accentWord?: string        // word rendered in amber-400
  subtitle?: string
  badge?: string             // pill badge above title
  heroImage?: string         // background image for hero
  stats?: { value: string; label: string }[]
  children: ReactNode
  hideCTA?: boolean          // for pages with custom CTA
  seo: { title: string; description: string; keywords: string }
}
```

**DarkHero visual spec:**
- `bg-slate-900` with background image at `opacity-15`
- Gradient overlay: `bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80`
- Amber glow: `bg-amber-500/10 rounded-full blur-[150px]` positioned right
- Breadcrumbs in `text-slate-400` with `text-amber-400` for current
- Badge: `bg-white/10 border-white/10 text-amber-400 rounded-full`
- Title: `text-white text-4xl md:text-5xl lg:text-6xl font-bold`, accent word in `text-amber-400`
- Subtitle: `text-slate-300 text-base md:text-lg`
- CTA: amber pill button "Получить расчёт" + outline "Каталог продукции"
- Padding: `pt-20 pb-16 md:pt-24 md:pb-20`

**StatsBar visual spec:**
- `bg-slate-800`, grid 2-col mobile / 4-col desktop
- Values: `text-amber-400 text-3xl md:text-4xl font-bold`
- Labels: `text-slate-400 text-xs md:text-sm`
- Dividers: `divide-x divide-slate-700` on md+

**CTABar visual spec:**
- `bg-slate-800`, flex row, phone link + amber email button
- Same as CorporateHome CTA section

### 2. Section Library (new components)

All in `src/components/corporate/sections/`. Each section is full-width with `max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8`.

#### Light sections:

**ProductGrid** — `bg-slate-50 py-16 md:py-24`
```ts
interface ProductGridProps {
  title: string
  subtitle?: string
  items: { name: string; desc: string; image: string; href: string }[]
  columns?: 2 | 3  // default 3
}
```
- Cards: `rounded-2xl`, image with `group-hover:scale-110 transition-transform duration-700`
- Dark gradient overlay on image, content at bottom
- Amber "Подробнее" with arrow, `group-hover:gap-3` animation

**AdvantagesGrid** — `bg-white py-16 md:py-24`
```ts
interface AdvantagesGridProps {
  title?: string      // default "Почему выбирают нас"
  subtitle?: string
  items: { icon: LucideIcon; title: string; text: string; href?: string }[]
}
```
- Cards: `border-l-4 border-l-amber-500 bg-slate-50 rounded-xl p-5`
- Icon in amber circle, hover effects

**SpecTable** — `bg-white py-16 md:py-24`
```ts
interface SpecTableProps {
  title: string
  subtitle?: string
  headers: string[]
  rows: (string | number)[][]
  caption?: string
}
```
- `rounded-lg border border-slate-200 overflow-hidden`
- Header: `bg-slate-50`, rows: alternating white/slate-50
- Hover highlight on rows

**ApplicationAreas** — `bg-slate-50 py-16 md:py-20`
```ts
interface ApplicationAreasProps {
  title?: string     // default "Области применения"
  items: { icon: LucideIcon; name: string; href?: string }[]
}
```
- Same style as Industries section on CorporateHome
- Circle icon bg, hover amber transition

**FeatureChecklist** — `bg-white py-12 md:py-16`
```ts
interface FeatureChecklistProps {
  title: string
  items: string[]
  columns?: 1 | 2   // default 2
}
```
- Amber Check icon + text, 2-column grid on desktop

#### Dark sections:

**DarkInfoBlock** — `bg-slate-900 py-16 md:py-24`
```ts
interface DarkInfoBlockProps {
  title: string
  text: string
  highlights?: { value: string; label: string }[]
  children?: ReactNode   // for custom content (e.g. material cards)
}
```
- White title, slate-300 text, optional highlight boxes

**TestimonialsSection** — `bg-slate-900 py-16 md:py-24`
- Reuses existing `TestimonialCarousel`
- Title "Отзывы клиентов" centered

**FAQSection** — `bg-white py-16 md:py-24`
```ts
interface FAQSectionProps {
  title?: string     // default "Частые вопросы"
  items: { q: string; a: string }[]
}
```
- Reuses FAQItem pattern from CorporateHome
- Max-width 680px centered

---

## Migration Plan

### Phase 1: Foundation
Create new components:
- `CorporatePageShell`
- 8 section components
- Update `CorporateHeader` if needed (ensure it works on all pages, active state for current section)

### Phase 2: Page Migration (parallel agents)
Each agent takes a group of pages and:
1. Replaces layout wrapper with `CorporatePageShell`
2. Extracts existing data into section components
3. Adds category-specific: heroImage, stats, badge, FAQ
4. Removes old imports (CatalogPageShell, Header, PageFooter)

**Agent groups:**
- Agent 1: EmkostiPage + 4 EVPP pages + EmkostiVertikalnye
- Agent 2: EmkostiGorizontalnye + Standard + Vysokie + Podzemnye
- Agent 3: EmkostiPryamougolnye + Gorizontalnye + Vertikalnye + Pozharnye + Perelivnye + KislotyShchelochi
- Agent 4: Vodoochistka + FFU + Lamelnyj + Obezvozhivatel + LOS
- Agent 5: VodoochistkaDozirovanie + ShkafyDozirovaniya + Zhirouloviteli
- Agent 6: GazoochistkaPage + Skrubbery + FVG + Kapleuloviteli
- Agent 7: VentilyatsiyaPage + Vozdukhovod + Razdvizhnoy + Troynik
- Agent 8: KnsPage + KnsSvtPage + ReaktoryPage + GalvanikaPage
- Agent 9: GidrometallurgiyaPage + VodopodgotovkaPage + LabMebelPage + ShkafyUpravleniyaPage
- Agent 10: AboutPage + ChemicalResistancePage + UslugiPage + CatalogPage + NotFound
- Agent 11: Index.tsx + Product.tsx (configurators — wrap in new shell, keep interactive parts)

### Phase 3: Cleanup
- Remove `CatalogPageShell` component (unused)
- Remove `Header` component if fully replaced
- Remove `PageFooter` if fully replaced
- Verify all routes work

---

## What Stays Unchanged

- All product data (arrays, tables, descriptions) — preserved, moved to new sections
- Interactive components: calculators, configurators, ChemicalSelector, ImageGallery
- Cart functionality (CartProvider, CartSheet)
- AI Chat Widget
- Product.tsx configurator internals
- Data files in `/src/data/`

## What Gets Replaced

- `CatalogPageShell` → `CorporatePageShell` (all 32 pages)
- `Header` → `CorporateHeader` (all pages)
- `PageFooter` → `CorporateFooter` (all pages)
- `FullBleedSection` with plain content → section library components
- White hero → Dark hero with gradient
- Simple CTA form → CTABar (phone + email style)

## What Gets Added

- Dark hero with bg image on every page
- Category-specific stats bars
- Category-specific FAQ sections (5 Q&As per page)
- Testimonials section on hub pages (7 hub pages)
- Advantages grid on pages that lack it
- Application areas on product pages
- Consistent hover animations and transitions

---

## File Structure After Redesign

```
src/components/corporate/
  CorporateHeader.tsx        (existing, may need nav active state)
  CorporateFooter.tsx        (existing)
  CorporatePageShell.tsx     (NEW)
  TestimonialCarousel.tsx    (existing)
  CompactCatalogGrid.tsx     (existing)
  sections/                  (NEW directory)
    ProductGrid.tsx
    AdvantagesGrid.tsx
    SpecTable.tsx
    ApplicationAreas.tsx
    FeatureChecklist.tsx
    DarkInfoBlock.tsx
    TestimonialsSection.tsx
    FAQSection.tsx
```

---

## Risks

- **Image assets**: Some pages may not have good hero background images → use category parent image as fallback
- **Product.tsx**: 41K+ lines, extremely complex → only wrap in new shell, do NOT refactor internals
- **Mobile**: All new sections must be tested at 375px width
- **Performance**: Hero background images should be optimized (webp, lazy load)
