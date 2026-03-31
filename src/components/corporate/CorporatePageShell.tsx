import { Link } from "react-router-dom";
import CorporateHeader from "@/components/corporate/CorporateHeader";
import CorporateFooter from "@/components/corporate/CorporateFooter";
import { Button } from "@/components/ui/button";
import useSEO from "@/hooks/useSEO";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
        {/* DARK HERO */}
        <section className="relative bg-slate-900 overflow-hidden">
          {heroImage && (
            <div
              className="absolute inset-0 opacity-15 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />

          <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-20 text-center">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-6 justify-center">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to="/"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Главная
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator className="text-slate-600" />
                </BreadcrumbItem>
                {breadcrumbs.map((bc, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return isLast ? (
                    <BreadcrumbItem key={i}>
                      <BreadcrumbPage className="text-amber-400 text-sm">
                        {bc.label}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem key={i}>
                      <BreadcrumbLink asChild>
                        <Link
                          to={bc.href || "/catalog"}
                          className="text-slate-400 hover:text-white text-sm"
                        >
                          {bc.label}
                        </Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator className="text-slate-600" />
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>

            {badge && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-xs font-medium text-amber-400 mb-6 backdrop-blur-sm">
                <Check className="h-3 w-3" />
                {badge}
              </div>
            )}

            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              {title}
              {accentWord && (
                <>
                  <br />
                  <span className="text-amber-400">{accentWord}</span>
                </>
              )}
            </h1>

            {subtitle && (
              <p className="text-slate-300 text-base md:text-lg lg:text-xl mt-6 leading-relaxed max-w-[600px] mx-auto">
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <Button
                size="lg"
                className="rounded-full px-8 text-base font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/25 h-12"
                onClick={() =>
                  document
                    .getElementById("cta-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Получить расчёт
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Link to="/catalog">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 h-12 shadow-lg"
                >
                  Каталог продукции
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        {stats && stats.length > 0 && (
          <section className="bg-slate-800">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-700">
                {stats.map((s) => (
                  <div key={s.label} className="text-center md:px-6">
                    <div className="text-amber-400 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-slate-400 text-xs md:text-sm mt-2 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PAGE CONTENT */}
        {children}

        {/* CTA BAR */}
        {!hideCTA && (
          <section id="cta-form" className="scroll-mt-20 bg-slate-900">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
              <div className="text-center mb-8">
                <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                  Готовы обсудить проект?
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Звоните или пишите — инженер ответит в течение часа
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[600px] mx-auto">
                <a
                  href="tel:+78122426006"
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500">
                    <Phone className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Позвонить</span>
                    <span className="block text-base font-bold text-white group-hover:text-amber-400 transition-colors">+7 (812) 242-60-06</span>
                  </div>
                </a>
                <a
                  href="mailto:info@plast-metall.pro"
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500">
                    <Mail className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Написать</span>
                    <span className="block text-base font-bold text-white group-hover:text-amber-400 transition-colors">info@plast-metall.pro</span>
                  </div>
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <CorporateFooter />
    </div>
  );
}
