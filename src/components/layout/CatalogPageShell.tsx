import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import useSEO from "@/hooks/useSEO";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FullBleedSection from "./FullBleedSection";
import StickyAnchorNav from "./StickyAnchorNav";
import DarkCTAForm from "@/components/catalog-sections/DarkCTAForm";
import PageFooter from "@/components/PageFooter";
import type { ProductType } from "@/components/Header";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Section {
  id: string;
  label: string;
}

interface CatalogPageShellProps {
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  companyLabel?: string;
  heroImage?: string;
  heroImages?: string[];
  sections?: Section[];
  /** Hide the built-in dark CTA form (if page has its own) */
  hideForm?: boolean;
  formTitle?: string;
  formSubtitle?: string;
  productType?: ProductType;
  /** SEO meta description (defaults to subtitle or title) */
  seoDescription?: string;
  /** SEO meta keywords */
  seoKeywords?: string;
}

function CatalogPageShellInner({
  children,
  breadcrumbs,
  title,
  subtitle,
  companyLabel = "ООО СЗПК «Пласт-Металл ПРО»",
  heroImage,
  heroImages,
  sections,
  hideForm,
  formTitle,
  formSubtitle,
  productType = "otvod",
  seoDescription,
  seoKeywords,
}: CatalogPageShellProps) {
  const [cartOpen, setCartOpen] = useState(false);

  useSEO({
    title,
    description: seoDescription || subtitle || `${title}. ООО СЗПК «Пласт-Металл Про» — производство полимерного оборудования.`,
    keywords: seoKeywords,
  });

  const images = heroImages || (heroImage ? [heroImage] : []);

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType={productType} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      {/* ── HERO ── */}
      <FullBleedSection className="bg-white py-6 sm:py-8" wide>
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {breadcrumbs.map((bc, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return isLast ? (
                <BreadcrumbItem key={i}><BreadcrumbPage>{bc.label}</BreadcrumbPage></BreadcrumbItem>
              ) : (
                <BreadcrumbItem key={i}>
                  <BreadcrumbLink asChild><Link to={bc.href || "/catalog"}>{bc.label}</Link></BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{companyLabel}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <Button
            onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-6"
          >
            Получить расчёт
          </Button>
        </div>

        {images.length > 0 && (
          <div className={`grid gap-4 ${images.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
            {images.map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-slate-100 h-48 md:h-64">
                <img src={src} alt={title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </FullBleedSection>

      {/* ── STICKY NAV ── */}
      {sections && sections.length > 0 && <StickyAnchorNav sections={sections} />}

      {/* ── PAGE CONTENT ── */}
      {children}

      {/* ── CTA FORM ── */}
      {!hideForm && <DarkCTAForm title={formTitle} subtitle={formSubtitle} />}

      <PageFooter />
    </>
  );
}

export default function CatalogPageShell(props: CatalogPageShellProps) {
  return (
    <CartProvider>
      <CatalogPageShellInner {...props} />
    </CartProvider>
  );
}
