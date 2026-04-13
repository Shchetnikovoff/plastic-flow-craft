

## Plan: Clickable KNS PP Product Rows with Detail Pages

### Goal
Make each row in the KNS PP product table clickable, navigating to `/product/{article}` where a full product card is displayed with image, description, and technical specs.

### Changes

**1. `src/pages/KnsPpPage.tsx`**
- Add `useNavigate` from react-router-dom
- Make each `<TableRow>` clickable with `onClick={() => navigate(`/product/${encodeURIComponent(p.article)}`)}`
- Add `cursor-pointer` class to rows

**2. `src/pages/Product.tsx`**
- Import `knsPpProducts` from `@/data/knsPpProducts`
- Add a KNS PP article resolver function that matches articles starting with `СЗПК.КНС.ПП.`
- Returns product data with:
  - Title: model name (e.g. "КНС-ПП 10-5")
  - Image: `/images/kns-pp-cutaway-v2.jpg`
  - Technical specs grid: diameter, height, flow, head, maxFlow, maxHead, pumpCount, pumpPower, material
  - Description text about polypropylene KNS
  - Breadcrumb back to `/catalog/kns/v-korpuse-polipropilen`
- Add KNS PP rendering block in the main component (following existing product type patterns)

### Technical Details
- Article format: `СЗПК.КНС.ПП.{Q}-{H}` — resolved by prefix match in Product.tsx
- Reuses existing `ImageGalleryWithLightbox`, `ArticleBreakdown`, and breadcrumb components
- No new routes needed — uses existing `/product/:article` route

