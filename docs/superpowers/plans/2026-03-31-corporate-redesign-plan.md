# Corporate Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all 44 pages to match CorporateHome UX style using a hybrid approach: CorporatePageShell wrapper + reusable section library.

**Architecture:** New `CorporatePageShell` replaces `CatalogPageShell` with dark hero, stats bar, and CTABar. Eight section components (`ProductGrid`, `AdvantagesGrid`, `SpecTable`, `ApplicationAreas`, `FeatureChecklist`, `DarkInfoBlock`, `TestimonialsSection`, `FAQSection`) provide building blocks. All pages get CorporateHeader + CorporateFooter. Existing interactive components (calculators, configurators, ChemicalSelector) are preserved inside new wrappers.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, shadcn/ui, Vitest, React Router 6

**Spec:** `docs/superpowers/specs/2026-03-31-corporate-redesign-design.md`

---

## File Structure

### New files to create:
```
src/components/corporate/CorporatePageShell.tsx    — page wrapper (hero + stats + CTA + header/footer)
src/components/corporate/sections/ProductGrid.tsx   — product/subcategory card grid
src/components/corporate/sections/AdvantagesGrid.tsx — advantages with amber left border
src/components/corporate/sections/SpecTable.tsx      — styled data table
src/components/corporate/sections/ApplicationAreas.tsx — industry/application icon grid
src/components/corporate/sections/FeatureChecklist.tsx — checkmark feature list
src/components/corporate/sections/DarkInfoBlock.tsx   — dark bg info section
src/components/corporate/sections/TestimonialsSection.tsx — testimonial carousel wrapper
src/components/corporate/sections/FAQSection.tsx      — FAQ accordion
test/components/corporate/CorporatePageShell.test.tsx
test/components/corporate/sections/ProductGrid.test.tsx
test/components/corporate/sections/AdvantagesGrid.test.tsx
test/components/corporate/sections/SpecTable.test.tsx
test/components/corporate/sections/FAQSection.test.tsx
```

### Existing files to modify (Phase 2 — all 44 pages):
Every page file in `src/pages/` will be modified to use `CorporatePageShell` instead of `CatalogPageShell`/`Header`/`PageFooter`.

### Files to delete after migration:
```
src/components/layout/CatalogPageShell.tsx   (replaced by CorporatePageShell)
```

---

## Phase 1: Foundation Components

### Task 1: CorporatePageShell

**Files:**
- Create: `src/components/corporate/CorporatePageShell.tsx`
- Create: `test/components/corporate/CorporatePageShell.test.tsx`
- Reference: `src/components/corporate/CorporateHeader.tsx`
- Reference: `src/components/corporate/CorporateFooter.tsx`
- Reference: `src/components/catalog-sections/DarkCTAForm.tsx`
- Reference: `src/pages/CorporateHome.tsx` (hero visual reference)

- [ ] **Step 1: Create test directory and write failing test**

```bash
mkdir -p test/components/corporate
```

```tsx
// test/components/corporate/CorporatePageShell.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";

function renderShell(props = {}) {
  const defaultProps = {
    breadcrumbs: [{ label: "Каталог", href: "/catalog" }, { label: "Ёмкости" }],
    title: "Ёмкости из",
    accentWord: "полипропилена",
    subtitle: "От 50 л до 300 м³",
    seo: { title: "Ёмкости", description: "Тест", keywords: "тест" },
    ...props,
  };
  return render(
    <MemoryRouter>
      <CorporatePageShell {...defaultProps}>
        <div data-testid="child-content">Контент</div>
      </CorporatePageShell>
    </MemoryRouter>
  );
}

describe("CorporatePageShell", () => {
  it("renders title with accent word", () => {
    renderShell();
    expect(screen.getByText("Ёмкости из")).toBeInTheDocument();
    expect(screen.getByText("полипропилена")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    renderShell();
    expect(screen.getByText("От 50 л до 300 м³")).toBeInTheDocument();
  });

  it("renders children", () => {
    renderShell();
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    renderShell({ badge: "30+ лет" });
    expect(screen.getByText("30+ лет")).toBeInTheDocument();
  });

  it("renders stats bar when stats provided", () => {
    renderShell({
      stats: [
        { value: "500+", label: "проектов" },
        { value: "5 лет", label: "гарантия" },
      ],
    });
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("проектов")).toBeInTheDocument();
  });

  it("does not render stats bar when no stats", () => {
    renderShell({ stats: undefined });
    expect(screen.queryByText("проектов")).not.toBeInTheDocument();
  });

  it("renders CTA section with phone", () => {
    renderShell();
    expect(screen.getByText("+7 (812) 242-60-06")).toBeInTheDocument();
  });

  it("hides CTA when hideCTA is true", () => {
    renderShell({ hideCTA: true });
    expect(screen.queryByText("Готовы обсудить проект?")).not.toBeInTheDocument();
  });

  it("renders breadcrumbs", () => {
    renderShell();
    expect(screen.getByText("Каталог")).toBeInTheDocument();
    expect(screen.getByText("Ёмкости")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd "/home/agi/Desktop/AGI/AGI /projects/plastic-flow-craft" && npx vitest run test/components/corporate/CorporatePageShell.test.tsx
```

Expected: FAIL — module not found

- [ ] **Step 3: Install test dependencies if missing**

```bash
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

Add to `vite.config.ts` if not present:
```ts
test: {
  globals: true,
  environment: "jsdom",
  setupFiles: "./test/setup.ts",
}
```

Create `test/setup.ts`:
```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 4: Implement CorporatePageShell**

```tsx
// src/components/corporate/CorporatePageShell.tsx
import { Link } from "react-router-dom";
import CorporateHeader from "@/components/corporate/CorporateHeader";
import CorporateFooter from "@/components/corporate/CorporateFooter";
import { Button } from "@/components/ui/button";
import useSEO from "@/hooks/useSEO";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Check, ArrowRight, Phone, Mail } from "lucide-react";

interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface CorporatePageShellProps {
  breadcrumbs: BreadcrumbEntry[];
  title: string;
  accentWord?: string;
  subtitle?: string;
  badge?: string;
  heroImage?: string;
  stats?: { value: string; label: string }[];
  children: React.ReactNode;
  hideCTA?: boolean;
  seo: { title: string; description: string; keywords: string };
}

export default function CorporatePageShell({
  breadcrumbs,
  title,
  accentWord,
  subtitle,
  badge,
  heroImage,
  stats,
  children,
  hideCTA,
  seo,
}: CorporatePageShellProps) {
  useSEO(seo);

  return (
    <div className="min-h-screen bg-white">
      <CorporateHeader />

      <main>
        {/* ══════ DARK HERO ══════ */}
        <section className="relative bg-slate-900 overflow-hidden">
          {heroImage && (
            <div
              className="absolute inset-0 opacity-15 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />

          <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-20">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm">Главная</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator className="text-slate-600" />
                </BreadcrumbItem>
                {breadcrumbs.map((bc, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return isLast ? (
                    <BreadcrumbItem key={i}>
                      <BreadcrumbPage className="text-amber-400 text-sm">{bc.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem key={i}>
                      <BreadcrumbLink asChild>
                        <Link to={bc.href || "/catalog"} className="text-slate-400 hover:text-white text-sm">
                          {bc.label}
                        </Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator className="text-slate-600" />
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>

            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-xs font-medium text-amber-400 mb-6 backdrop-blur-sm">
                <Check className="h-3 w-3" />
                {badge}
              </div>
            )}

            {/* Title */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              {title}
              {accentWord && (
                <>
                  <br />
                  <span className="text-amber-400">{accentWord}</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-slate-300 text-base md:text-lg lg:text-xl mt-6 leading-relaxed max-w-[600px]">
                {subtitle}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                size="lg"
                className="rounded-full px-8 text-base font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/25 h-12"
                onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Получить расчёт
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Link to="/catalog">
                <Button size="lg" className="rounded-full px-8 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 h-12 shadow-lg">
                  Каталог продукции
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════ STATS BAR ══════ */}
        {stats && stats.length > 0 && (
          <section className="bg-slate-800">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-700">
                {stats.map((s) => (
                  <div key={s.label} className="text-center md:px-6">
                    <div className="text-amber-400 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{s.value}</div>
                    <div className="text-slate-400 text-xs md:text-sm mt-2 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════ PAGE CONTENT ══════ */}
        {children}

        {/* ══════ CTA BAR ══════ */}
        {!hideCTA && (
          <section id="cta-form" className="scroll-mt-20 bg-slate-800">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Готовы обсудить проект?</h2>
                  <p className="text-slate-400 text-sm mt-2">Звоните или пишите — инженер ответит в течение часа</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a href="tel:+78122426006" className="flex items-center gap-2 text-white text-lg font-semibold hover:text-amber-400 transition-colors">
                    <Phone className="h-5 w-5" /> +7 (812) 242-60-06
                  </a>
                  <a
                    href="mailto:info@plast-metall.pro"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-3 text-sm transition-colors shadow-lg shadow-amber-500/20"
                  >
                    <Mail className="h-4 w-4" />
                    Написать на почту
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <CorporateFooter />
    </div>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd "/home/agi/Desktop/AGI/AGI /projects/plastic-flow-craft" && npx vitest run test/components/corporate/CorporatePageShell.test.tsx
```

Expected: ALL PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/corporate/CorporatePageShell.tsx test/components/corporate/CorporatePageShell.test.tsx test/setup.ts vite.config.ts
git commit -m "feat: add CorporatePageShell with dark hero, stats bar, and CTA"
```

---

### Task 2: ProductGrid Section

**Files:**
- Create: `src/components/corporate/sections/ProductGrid.tsx`
- Create: `test/components/corporate/sections/ProductGrid.test.tsx`
- Reference: `src/pages/CorporateHome.tsx:183-228` (catalog section)

- [ ] **Step 1: Create test directory and write failing test**

```bash
mkdir -p test/components/corporate/sections
```

```tsx
// test/components/corporate/sections/ProductGrid.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductGrid from "@/components/corporate/sections/ProductGrid";

const items = [
  { name: "Ёмкости", desc: "Хранение", image: "/img.png", href: "/emkosti" },
  { name: "Газоочистка", desc: "Скрубберы", image: "/img2.png", href: "/gazo" },
];

describe("ProductGrid", () => {
  it("renders title and subtitle", () => {
    render(
      <MemoryRouter>
        <ProductGrid title="Продукция" subtitle="Все товары" items={items} />
      </MemoryRouter>
    );
    expect(screen.getByText("Продукция")).toBeInTheDocument();
    expect(screen.getByText("Все товары")).toBeInTheDocument();
  });

  it("renders all items", () => {
    render(
      <MemoryRouter>
        <ProductGrid title="Продукция" items={items} />
      </MemoryRouter>
    );
    expect(screen.getByText("Ёмкости")).toBeInTheDocument();
    expect(screen.getByText("Газоочистка")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(
      <MemoryRouter>
        <ProductGrid title="Продукция" items={items} />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/emkosti");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run test/components/corporate/sections/ProductGrid.test.tsx
```

Expected: FAIL — module not found

- [ ] **Step 3: Implement ProductGrid**

```tsx
// src/components/corporate/sections/ProductGrid.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProductGridItem {
  name: string;
  desc: string;
  image: string;
  href: string;
}

interface ProductGridProps {
  title: string;
  subtitle?: string;
  items: ProductGridItem[];
  columns?: 2 | 3;
}

export default function ProductGrid({ title, subtitle, items, columns = 3 }: ProductGridProps) {
  return (
    <section className="bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-slate-500 text-base md:text-lg mt-4 max-w-[550px] mx-auto">{subtitle}</p>
          )}
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""} gap-5`}>
          {items.map((item) => (
            <Link key={item.href} to={item.href} className="group relative block">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/2]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="text-white text-xl md:text-2xl font-bold">{item.name}</h3>
                  <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-semibold mt-3 group-hover:gap-3 transition-all duration-300">
                    Подробнее <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run test/components/corporate/sections/ProductGrid.test.tsx
```

Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/corporate/sections/ProductGrid.tsx test/components/corporate/sections/ProductGrid.test.tsx
git commit -m "feat: add ProductGrid section component"
```

---

### Task 3: AdvantagesGrid Section

**Files:**
- Create: `src/components/corporate/sections/AdvantagesGrid.tsx`
- Create: `test/components/corporate/sections/AdvantagesGrid.test.tsx`
- Reference: `src/pages/CorporateHome.tsx:230-253` (advantages section)

- [ ] **Step 1: Write failing test**

```tsx
// test/components/corporate/sections/AdvantagesGrid.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import AdvantagesGrid from "@/components/corporate/sections/AdvantagesGrid";
import { Factory, ShieldCheck } from "lucide-react";

const items = [
  { icon: Factory, title: "Производство", text: "Полный цикл" },
  { icon: ShieldCheck, title: "Качество", text: "ГОСТ и ТУ", href: "/about" },
];

describe("AdvantagesGrid", () => {
  it("renders default title", () => {
    render(
      <MemoryRouter>
        <AdvantagesGrid items={items} />
      </MemoryRouter>
    );
    expect(screen.getByText("Почему выбирают нас")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(
      <MemoryRouter>
        <AdvantagesGrid title="Преимущества" items={items} />
      </MemoryRouter>
    );
    expect(screen.getByText("Преимущества")).toBeInTheDocument();
  });

  it("renders all advantage items", () => {
    render(
      <MemoryRouter>
        <AdvantagesGrid items={items} />
      </MemoryRouter>
    );
    expect(screen.getByText("Производство")).toBeInTheDocument();
    expect(screen.getByText("Качество")).toBeInTheDocument();
    expect(screen.getByText("Полный цикл")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run test/components/corporate/sections/AdvantagesGrid.test.tsx
```

- [ ] **Step 3: Implement AdvantagesGrid**

```tsx
// src/components/corporate/sections/AdvantagesGrid.tsx
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface AdvantageItem {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
}

interface AdvantagesGridProps {
  title?: string;
  subtitle?: string;
  items: AdvantageItem[];
}

export default function AdvantagesGrid({
  title = "Почему выбирают нас",
  subtitle,
  items,
}: AdvantagesGridProps) {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-500 text-base mt-3 max-w-[500px] mx-auto">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((adv) => {
            const content = (
              <>
                <div className="h-11 w-11 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <adv.icon className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 text-sm font-bold group-hover:text-amber-600 transition-colors">{adv.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{adv.text}</p>
                </div>
              </>
            );
            const cls = "group flex gap-4 p-5 rounded-xl border-l-4 border-l-amber-500 bg-slate-50 hover:bg-slate-100 hover:shadow-md transition-all cursor-pointer";

            return adv.href ? (
              <Link key={adv.title} to={adv.href} className={cls}>{content}</Link>
            ) : (
              <div key={adv.title} className={cls}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run test/components/corporate/sections/AdvantagesGrid.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/corporate/sections/AdvantagesGrid.tsx test/components/corporate/sections/AdvantagesGrid.test.tsx
git commit -m "feat: add AdvantagesGrid section component"
```

---

### Task 4: SpecTable Section

**Files:**
- Create: `src/components/corporate/sections/SpecTable.tsx`
- Create: `test/components/corporate/sections/SpecTable.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// test/components/corporate/sections/SpecTable.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SpecTable from "@/components/corporate/sections/SpecTable";

describe("SpecTable", () => {
  it("renders title", () => {
    render(
      <SpecTable
        title="Характеристики"
        headers={["Модель", "Объём"]}
        rows={[["ЕВП-100", "100 л"]]}
      />
    );
    expect(screen.getByText("Характеристики")).toBeInTheDocument();
  });

  it("renders headers", () => {
    render(
      <SpecTable title="Тест" headers={["Модель", "Объём"]} rows={[["ЕВП-100", "100 л"]]} />
    );
    expect(screen.getByText("Модель")).toBeInTheDocument();
    expect(screen.getByText("Объём")).toBeInTheDocument();
  });

  it("renders row data", () => {
    render(
      <SpecTable title="Тест" headers={["Модель"]} rows={[["ЕВП-100"], ["ЕВП-200"]]} />
    );
    expect(screen.getByText("ЕВП-100")).toBeInTheDocument();
    expect(screen.getByText("ЕВП-200")).toBeInTheDocument();
  });

  it("renders caption when provided", () => {
    render(
      <SpecTable title="Тест" headers={["Модель"]} rows={[["ЕВП-100"]]} caption="Примечание" />
    );
    expect(screen.getByText("Примечание")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run test/components/corporate/sections/SpecTable.test.tsx
```

- [ ] **Step 3: Implement SpecTable**

```tsx
// src/components/corporate/sections/SpecTable.tsx
interface SpecTableProps {
  title: string;
  subtitle?: string;
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}

export default function SpecTable({ title, subtitle, headers, rows, caption }: SpecTableProps) {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-500 text-base mt-3">{subtitle}</p>}
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {headers.map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-amber-50/50 transition-colors`}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {caption && <p className="text-xs text-slate-400 mt-3 text-center">{caption}</p>}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run test/components/corporate/sections/SpecTable.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/corporate/sections/SpecTable.tsx test/components/corporate/sections/SpecTable.test.tsx
git commit -m "feat: add SpecTable section component"
```

---

### Task 5: FAQSection

**Files:**
- Create: `src/components/corporate/sections/FAQSection.tsx`
- Create: `test/components/corporate/sections/FAQSection.test.tsx`
- Reference: `src/pages/CorporateHome.tsx:61-77` (FAQItem), `src/pages/CorporateHome.tsx:286-299`

- [ ] **Step 1: Write failing test**

```tsx
// test/components/corporate/sections/FAQSection.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FAQSection from "@/components/corporate/sections/FAQSection";

const faqs = [
  { q: "Вопрос 1?", a: "Ответ 1" },
  { q: "Вопрос 2?", a: "Ответ 2" },
];

describe("FAQSection", () => {
  it("renders default title", () => {
    render(<FAQSection items={faqs} />);
    expect(screen.getByText("Частые вопросы")).toBeInTheDocument();
  });

  it("renders all questions", () => {
    render(<FAQSection items={faqs} />);
    expect(screen.getByText("Вопрос 1?")).toBeInTheDocument();
    expect(screen.getByText("Вопрос 2?")).toBeInTheDocument();
  });

  it("expands answer on click", () => {
    render(<FAQSection items={faqs} />);
    const q = screen.getByText("Вопрос 1?");
    fireEvent.click(q.closest("[class*=cursor-pointer]")!);
    expect(screen.getByText("Ответ 1")).toBeVisible();
  });

  it("renders custom title", () => {
    render(<FAQSection title="FAQ по ёмкостям" items={faqs} />);
    expect(screen.getByText("FAQ по ёмкостям")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run test/components/corporate/sections/FAQSection.test.tsx
```

- [ ] **Step 3: Implement FAQSection**

```tsx
// src/components/corporate/sections/FAQSection.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

function FAQAccordionItem({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="w-full rounded-lg border border-slate-200 bg-white overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center px-6 py-4 gap-4">
        <span className="text-slate-900 text-sm font-semibold">{q}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed">{a}</div>
      </div>
    </div>
  );
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQSection({ title = "Частые вопросы", subtitle, items }: FAQSectionProps) {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-500 text-sm mt-3">{subtitle}</p>}
        </div>
        <div className="max-w-[680px] mx-auto flex flex-col gap-3">
          {items.map((faq, i) => (
            <FAQAccordionItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run test/components/corporate/sections/FAQSection.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/corporate/sections/FAQSection.tsx test/components/corporate/sections/FAQSection.test.tsx
git commit -m "feat: add FAQSection component"
```

---

### Task 6: Remaining Section Components (ApplicationAreas, FeatureChecklist, DarkInfoBlock, TestimonialsSection)

**Files:**
- Create: `src/components/corporate/sections/ApplicationAreas.tsx`
- Create: `src/components/corporate/sections/FeatureChecklist.tsx`
- Create: `src/components/corporate/sections/DarkInfoBlock.tsx`
- Create: `src/components/corporate/sections/TestimonialsSection.tsx`
- Reference: `src/pages/CorporateHome.tsx:255-273` (industries), `src/pages/CorporateHome.tsx:275-284` (testimonials)
- Reference: `src/components/corporate/TestimonialCarousel.tsx`

- [ ] **Step 1: Implement ApplicationAreas**

```tsx
// src/components/corporate/sections/ApplicationAreas.tsx
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ApplicationItem {
  icon: LucideIcon;
  name: string;
  href?: string;
}

interface ApplicationAreasProps {
  title?: string;
  subtitle?: string;
  items: ApplicationItem[];
}

export default function ApplicationAreas({
  title = "Области применения",
  subtitle,
  items,
}: ApplicationAreasProps) {
  return (
    <section className="bg-slate-50 border-y border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-500 text-sm mt-3">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((item) => {
            const inner = (
              <>
                <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <item.icon className="h-5 w-5 text-amber-400 group-hover:text-slate-900 transition-colors" />
                </div>
                <span className="text-slate-700 text-xs md:text-sm font-semibold text-center leading-tight group-hover:text-amber-600 transition-colors">
                  {item.name}
                </span>
              </>
            );
            const cls = "group flex flex-col items-center gap-3 p-5 rounded-xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all";

            return item.href ? (
              <Link key={item.name} to={item.href} className={cls}>{inner}</Link>
            ) : (
              <div key={item.name} className={cls}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement FeatureChecklist**

```tsx
// src/components/corporate/sections/FeatureChecklist.tsx
import { Check } from "lucide-react";

interface FeatureChecklistProps {
  title: string;
  subtitle?: string;
  items: string[];
  columns?: 1 | 2;
}

export default function FeatureChecklist({ title, subtitle, items, columns = 2 }: FeatureChecklistProps) {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-tight mb-2">{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm mb-6">{subtitle}</p>}
        <div className={`grid grid-cols-1 ${columns === 2 ? "sm:grid-cols-2" : ""} gap-3`}>
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Implement DarkInfoBlock**

```tsx
// src/components/corporate/sections/DarkInfoBlock.tsx
interface DarkInfoBlockProps {
  title: string;
  text: string;
  highlights?: { value: string; label: string }[];
  children?: React.ReactNode;
}

export default function DarkInfoBlock({ title, text, highlights, children }: DarkInfoBlockProps) {
  return (
    <section className="bg-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-[700px]">{text}</p>
        {highlights && highlights.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {highlights.map((h) => (
              <div key={h.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-amber-400 text-2xl md:text-3xl font-bold">{h.value}</div>
                <div className="text-slate-400 text-xs mt-1">{h.label}</div>
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement TestimonialsSection**

```tsx
// src/components/corporate/sections/TestimonialsSection.tsx
import TestimonialCarousel from "@/components/corporate/TestimonialCarousel";

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
}

export default function TestimonialsSection({
  title = "Отзывы клиентов",
  subtitle = "Нам доверяют предприятия по всей России",
}: TestimonialsSectionProps) {
  return (
    <section className="bg-slate-900 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          <p className="text-slate-400 text-sm mt-3">{subtitle}</p>
        </div>
        <TestimonialCarousel />
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run all section tests**

```bash
npx vitest run test/components/corporate/
```

Expected: ALL PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/corporate/sections/
git commit -m "feat: add ApplicationAreas, FeatureChecklist, DarkInfoBlock, TestimonialsSection"
```

---

### Task 7: Create section barrel export

**Files:**
- Create: `src/components/corporate/sections/index.ts`

- [ ] **Step 1: Create barrel export**

```ts
// src/components/corporate/sections/index.ts
export { default as ProductGrid } from "./ProductGrid";
export { default as AdvantagesGrid } from "./AdvantagesGrid";
export { default as SpecTable } from "./SpecTable";
export { default as ApplicationAreas } from "./ApplicationAreas";
export { default as FeatureChecklist } from "./FeatureChecklist";
export { default as DarkInfoBlock } from "./DarkInfoBlock";
export { default as TestimonialsSection } from "./TestimonialsSection";
export { default as FAQSection } from "./FAQSection";
```

- [ ] **Step 2: Commit**

```bash
git add src/components/corporate/sections/index.ts
git commit -m "feat: add section barrel export"
```

---

## Phase 2: Page Migration

> **IMPORTANT: Phase 2 tasks are designed for parallel agent execution.**
> Each task is independent and can be assigned to a separate agent.
> Use `superpowers:dispatching-parallel-agents` to run tasks 8-18 in parallel.

### Migration Template

Every page migration follows this pattern:

1. Replace `CatalogPageShell` / `Header+PageFooter` imports with `CorporatePageShell`
2. Replace section imports: `FullBleedSection` → section library components
3. Configure shell props: breadcrumbs, title, accentWord, subtitle, badge, heroImage, stats, seo
4. Wrap existing content in appropriate section components
5. Remove old unused imports
6. Add category-specific FAQ (5 items minimum)
7. Verify page renders: `npm run dev` → open in browser → visual check

---

### Task 8: Migrate EmkostiPage + EmkostiVertikalnye + 4 EVPP pages

**Files to modify:**
- `src/pages/EmkostiPage.tsx`
- `src/pages/EmkostiVertikalnye.tsx`
- `src/pages/EmkostiEvpp.tsx`
- `src/pages/EmkostiEvppSloped.tsx`
- `src/pages/EmkostiEvppConical.tsx`
- `src/pages/EmkostiEvppConusDno.tsx`

**For each file:**

- [ ] **Step 1: Read current file and plan changes**
- [ ] **Step 2: Replace layout with CorporatePageShell**

Each page gets:
- `heroImage: "/images/emkosti-collage-hero.png"`
- Stats: объёмы, материалы, сроки, гарантия
- FAQ: 5 вопросов по ёмкостям

- [ ] **Step 3: Wrap content sections in section library components**
- [ ] **Step 4: Verify page renders in browser**
- [ ] **Step 5: Commit**

```bash
git commit -m "feat: migrate emkosti pages to CorporatePageShell"
```

---

### Task 9: Migrate EmkostiGorizontalnye group

**Files to modify:**
- `src/pages/EmkostiGorizontalnye.tsx`
- `src/pages/EmkostiGorizontalnyeStandard.tsx`
- `src/pages/EmkostiGorizontalnyeVysokie.tsx`
- `src/pages/EmkostiPodzemnye.tsx`

Same pattern as Task 8. heroImage: `/images/emkosti-collage-hero.png`

- [ ] **Step 1-5: Same as Task 8**
- [ ] **Commit:** `git commit -m "feat: migrate horizontal/underground tank pages to CorporatePageShell"`

---

### Task 10: Migrate EmkostiPryamougolnye group

**Files to modify:**
- `src/pages/EmkostiPryamougolnye.tsx`
- `src/pages/EmkostiPryamougolnyeGorizontalnye.tsx`
- `src/pages/EmkostiPryamougolnyeVertikalnye.tsx`
- `src/pages/EmkostiPozharnye.tsx`
- `src/pages/EmkostiPerelivnye.tsx`
- `src/pages/EmkostiKislotyShchelochi.tsx`

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate rectangular/fire/overflow/acid tank pages to CorporatePageShell"`

---

### Task 11: Migrate Vodoochistka group

**Files to modify:**
- `src/pages/Vodoochistka.tsx`
- `src/pages/VodoochistkaFfu.tsx`
- `src/pages/VodoochistkaLamelnyj.tsx`
- `src/pages/VodoochistkaObezvozhivatel.tsx`
- `src/pages/VodoochistkaLos.tsx`

heroImage: `/images/vodoochistka-collage-hero.png`

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate water treatment pages to CorporatePageShell"`

---

### Task 12: Migrate Vodoochistka subpages

**Files to modify:**
- `src/pages/VodoochistkaDozirovanie.tsx`
- `src/pages/VodoochistkaShkafyDozirovaniya.tsx`
- `src/pages/VodoochistkaZhirouloviteli.tsx`

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate dosing/fat-trap pages to CorporatePageShell"`

---

### Task 13: Migrate Gazoochistka group

**Files to modify:**
- `src/pages/GazoochistkaPage.tsx`
- `src/pages/GazoochistkaSkrubbery.tsx`
- `src/pages/GazoochistkaFvg.tsx`
- `src/pages/GazoochistkaKapleuloviteli.tsx`

heroImage: `/images/gazoochistka-hero-1.png`

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate gas cleaning pages to CorporatePageShell"`

---

### Task 14: Migrate Ventilyatsiya + configurators

**Files to modify:**
- `src/pages/VentilyatsiyaPage.tsx` — heroImage: `/images/ventilyatsiya-hero-1.png`
- `src/pages/Vozdukhovod.tsx`
- `src/pages/Razdvizhnoy.tsx`
- `src/pages/Troynik.tsx`

For configurator pages (Vozdukhovod, Razdvizhnoy, Troynik): wrap in CorporatePageShell, keep `ProductPageShell` internals (material selector, tables) inside children.

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate ventilation pages to CorporatePageShell"`

---

### Task 15: Migrate KNS + Reaktory + Galvanika

**Files to modify:**
- `src/pages/KnsPage.tsx` — heroImage: `/images/kns-svt-cutaway.jpg`
- `src/pages/KnsSvtPage.tsx`
- `src/pages/ReaktoryPage.tsx` — heroImage: `/images/reaktor-pp-render.jpg`
- `src/pages/GalvanikaPage.tsx`

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate KNS, reactor, galvanic pages to CorporatePageShell"`

---

### Task 16: Migrate small hub pages

**Files to modify:**
- `src/pages/GidrometallurgiyaPage.tsx`
- `src/pages/VodopodgotovkaPage.tsx`
- `src/pages/LabMebelPage.tsx`
- `src/pages/ShkafyUpravleniyaPage.tsx`

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate hydrometallurgy, water prep, lab, cabinet pages to CorporatePageShell"`

---

### Task 17: Migrate utility pages

**Files to modify:**
- `src/pages/AboutPage.tsx`
- `src/pages/ChemicalResistancePage.tsx`
- `src/pages/UslugiPage.tsx`
- `src/pages/CatalogPage.tsx`
- `src/pages/NotFound.tsx` — minimal: just add CorporateHeader/CorporateFooter + dark hero style 404

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate about, chemical resistance, services, catalog, 404 pages"`

---

### Task 18: Migrate Index.tsx + Product.tsx (configurators)

**Files to modify:**
- `src/pages/Index.tsx` (otvod configurator)
- `src/pages/Product.tsx` (41K+ lines — WRAP ONLY, do not refactor internals)

**CRITICAL:** Product.tsx is extremely large. Only change:
1. Replace outer `ProductPageShell` / `Header` / `Footer` with `CorporatePageShell`
2. Keep all configurator internals (tables, selectors, galleries) unchanged inside children
3. Add appropriate hero props for the product category

- [ ] **Step 1-5: Same migration pattern**
- [ ] **Commit:** `git commit -m "feat: migrate configurator pages to CorporatePageShell"`

---

## Phase 3: Cleanup & Verification

### Task 19: Remove deprecated components

**Files to delete:**
- `src/components/layout/CatalogPageShell.tsx` (if no longer imported anywhere)

**Files to check:**
- `src/components/Header.tsx` — check if still used; if not, delete
- `src/components/PageFooter.tsx` — check if still used; if not, delete

- [ ] **Step 1: Search for remaining imports**

```bash
grep -r "CatalogPageShell\|from.*Header\|PageFooter" src/pages/ --include="*.tsx"
```

- [ ] **Step 2: Delete unused files**
- [ ] **Step 3: Run build to verify no broken imports**

```bash
npm run build
```

Expected: BUILD SUCCESS

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove deprecated CatalogPageShell, Header, PageFooter"
```

---

### Task 20: Full visual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check each major page with Playwright**

Pages to verify:
- `/` (home — should be unchanged)
- `/catalog/emkosti`
- `/catalog/vodoochistka`
- `/catalog/gazoochistka`
- `/catalog/ventilyatsiya`
- `/catalog/kns`
- `/catalog/reaktory`
- `/about`
- `/chemical-resistance`
- `/catalog/emkosti/vertikalnye`
- `/catalog/gazoochistka/skrubbery`

For each: take screenshot, verify dark hero, stats bar, sections, CTA, footer.

- [ ] **Step 3: Run full test suite**

```bash
npm run test
npm run build
```

Expected: ALL PASS, BUILD SUCCESS

- [ ] **Step 4: Final commit**

```bash
git commit -m "chore: verify all pages migrated to corporate UX style"
```
