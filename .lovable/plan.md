

## Plan: Add breadcrumbs to the product detail page

Add a breadcrumb navigation to `src/pages/Product.tsx` using the existing `src/components/ui/breadcrumb.tsx` component.

**Changes in `src/pages/Product.tsx`:**
- Import breadcrumb components and `Link` from react-router-dom
- Replace the "Назад к каталогу" button with a breadcrumb: `Каталог / {article}`
- Use `BreadcrumbLink` with `asChild` + `Link` for the "Каталог" item to enable client-side navigation
- Use `BreadcrumbPage` for the current article

**Result:** `Каталог > ОТВР-90-ПП-СР-100` style navigation at the top of the product page.

