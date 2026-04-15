import { useState } from "react";
import { Link } from "react-router-dom";
import CorporateHeader from "@/components/corporate/CorporateHeader";
import CorporateFooter from "@/components/corporate/CorporateFooter";
import { Button } from "@/components/ui/button";
import useSEO from "@/hooks/useSEO";
import TestimonialCarousel from "@/components/corporate/TestimonialCarousel";
import {
  Check, Factory, Wrench, ShieldCheck, Clock, Truck, FlaskConical,
  ChevronDown, ArrowRight, Phone, Beaker, Wind, Zap, Building2, Atom, Droplets,
} from "lucide-react";

/* ── Data ── */

const stats = [
  { value: "30+", label: "лет срок службы оборудования" },
  { value: "500+", label: "реализованных проектов по РФ" },
  { value: "5 лет", label: "гарантия на всю продукцию" },
  { value: "24 ч", label: "расчёт стоимости" },
];

const catalogCategories = [
  { name: "Ёмкости", desc: "Хранение кислот, щелочей, воды", href: "/catalog/emkosti", image: "/images/emkosti-collage-hero.png" },
  { name: "Водоочистка", desc: "ФФУ, отстойники, дозирование", href: "/catalog/vodoochistka", image: "/images/vodoochistka-collage-hero.png" },
  { name: "Газоочистка", desc: "Скрубберы, ФВГ, каплеуловители", href: "/catalog/gazoochistka", image: "/images/gazoochistka-hero-1.png" },
  { name: "Вентиляция", desc: "Воздуховоды круглого и квадратного сечения", href: "/catalog/ventilyatsiya", image: "/images/ventilyatsiya-hero-1.png" },
  { name: "КНС", desc: "Насосные станции в корпусе SVT и ПП", href: "/catalog/kns", image: "/images/kns-svt-cutaway.jpg" },
  { name: "Реакторы", desc: "Химические реакторы для агрессивных сред", href: "/catalog/reaktory", image: "/images/reaktor-pp-render.jpg" },
];

const advantages = [
  { icon: Factory, title: "Собственное производство", text: "Полный цикл: проектирование → производство → монтаж → пусконаладка", href: "/about" },
  { icon: FlaskConical, title: "Химическая стойкость", text: "PP, PE, PVC — подбор материала под конкретную среду и температуру", href: "/chemical-resistance" },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проверен. Вакуумный тест, опрессовка. ГОСТ и ТУ", href: "/about" },
  { icon: Clock, title: "Сроки от 10 дней", text: "Стандартное оборудование за 10–21 день, нестандарт — от 15 дней", href: "/catalog/uslugi" },
  { icon: Truck, title: "Доставка по всей РФ", text: "Спецтранспорт для крупногабаритного оборудования с упаковкой", href: "/catalog/uslugi" },
  { icon: Wrench, title: "Сервис и монтаж", text: "Шеф-монтаж, обучение персонала, гарантийное обслуживание 5 лет", href: "/catalog/uslugi" },
];

const industries = [
  { icon: FlaskConical, name: "Химическая промышленность", href: "/catalog/emkosti/kisloty-shchelochi" },
  { icon: Zap, name: "Гальваника", href: "/catalog/galvanika" },
  { icon: Building2, name: "Металлургия", href: "/catalog/gidrometallurgiya" },
  { icon: Droplets, name: "Водоподготовка", href: "/catalog/vodopodgotovka" },
  { icon: Beaker, name: "Фармацевтика", href: "/catalog/emkosti" },
  { icon: Factory, name: "Пищевая отрасль", href: "/catalog/vodoochistka" },
  { icon: Atom, name: "Нефтехимия", href: "/catalog/reaktory" },
  { icon: Wind, name: "ЦБК и полиграфия", href: "/catalog/gazoochistka" },
];

const faqData = [
  { q: "Из каких материалов производите оборудование?", a: "Листовой полипропилен (PP — PPC, PPH, PPs), полиэтилен (PE 100), ПВХ (PVC). Подбор материала — по рабочей среде, температуре и концентрации." },
  { q: "Какие сроки изготовления?", a: "Стандартное оборудование — 10–21 рабочий день. Нестандартные проекты — от 15 до 30 дней. Монтаж — 2–7 дней." },
  { q: "Работаете по всей России?", a: "Да, доставка спецтранспортом по всей РФ. Производство — Ленинградская область, д. Разметелево." },
  { q: "Можно заказать по своим чертежам?", a: "Да, изготовим по вашим чертежам и ТЗ. Также проектируем с нуля под конкретные задачи." },
  { q: "Какая гарантия?", a: "5 лет гарантия на все изделия. Срок службы полимерного оборудования — от 30 лет." },
];

/* ── Components ── */

function FAQItem({ q, a }: { q: string; a: string }) {
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

/* ── Page ── */

export default function CorporateHome() {
  useSEO({
    title: "Промышленное полимерное оборудование",
    description: "ООО СЗПК «Пласт-Металл Про» — проектирование, производство и монтаж ёмкостей, систем водоочистки и газоочистки, вентиляции из полипропилена и полиэтилена. 500+ проектов по РФ. Гарантия 5 лет.",
    keywords: "полимерное оборудование, ёмкости полипропилен, водоочистка, газоочистка, скрубберы, вентиляция ПП, КНС, реакторы, СЗПК, Пласт-Металл Про, Ленинградская область",
  });

  return (
    <div className="min-h-screen bg-white">
      <CorporateHeader />

      <main>
        {/* ══════ HERO ══════ */}
        <section className="relative bg-slate-900 overflow-hidden">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/emkosti-collage-hero.png)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
          {/* Accent glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />

          <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-36">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
              {/* Left — headlines + CTA */}
              <div className="max-w-[640px] shrink-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-xs font-medium text-amber-400 mb-6 backdrop-blur-sm">
                  <Check className="h-3 w-3" />
                  Более 500 проектов по России
                </div>
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  Промышленное
                  <br />
                  <span className="text-amber-400">полимерное</span>
                  <br />
                  оборудование
                </h1>
                <p className="text-slate-300 text-base md:text-lg lg:text-xl mt-6 leading-relaxed max-w-[500px]">
                  Проектирование, производство и монтаж ёмкостей, систем водо- и газоочистки, вентиляции из полипропилена и полиэтилена.
                </p>
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

              {/* Right — SEO info block */}
              <div className="hidden lg:flex flex-col gap-4 max-w-[380px]">
                <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
                  <h2 className="text-white text-sm font-bold mb-3">Что мы производим</h2>
                  <ul className="space-y-2">
                    {[
                      "Ёмкости из полипропилена и полиэтилена (50 л — 300 м³)",
                      "Системы водоочистки: ФФУ, отстойники, станции дозирования",
                      "Газоочистное оборудование: скрубберы, ФВГ, каплеуловители",
                      "Вентиляция из ПП: воздуховоды, отводы, тройники",
                      "КНС, химические реакторы, гальванические ванны",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <Check className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
                  <h2 className="text-white text-sm font-bold mb-2">Работаем по всей России</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Собственное производство в Ленинградской области. Доставка спецтранспортом. Монтаж и пусконаладка на объекте заказчика. Гарантия 5 лет, срок службы от 30 лет.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ STATS ══════ */}
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

        {/* ══════ CATALOG ══════ */}
        <section className="bg-slate-50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-slate-900 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Наша продукция
              </h2>
              <p className="text-slate-500 text-base md:text-lg mt-4 max-w-[550px] mx-auto">
                Полный спектр полимерного оборудования для промышленных предприятий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {catalogCategories.map((cat) => (
                <Link key={cat.href} to={cat.href} className="group relative block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/2]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <h3 className="text-white text-xl md:text-2xl font-bold">{cat.name}</h3>
                      <p className="text-slate-300 text-sm mt-1">{cat.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-semibold mt-3 group-hover:gap-3 transition-all duration-300">
                        Подробнее <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/catalog">
                <Button variant="outline" size="lg" className="rounded-full px-10 text-base font-semibold border-slate-300 hover:bg-slate-100">
                  Весь каталог
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════ ADVANTAGES ══════ */}
        <section className="bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">Почему выбирают нас</h2>
              <p className="text-slate-500 text-base mt-3 max-w-[500px] mx-auto">
                Полный цикл от проектирования до монтажа и сервиса
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {advantages.map((adv) => (
                <Link key={adv.title} to={adv.href} className="group flex gap-4 p-5 rounded-xl border-l-4 border-l-amber-500 bg-slate-50 hover:bg-slate-100 hover:shadow-md transition-all cursor-pointer">
                  <div className="h-11 w-11 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <adv.icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 text-sm font-bold group-hover:text-amber-600 transition-colors">{adv.title}</h3>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">{adv.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ INDUSTRIES ══════ */}
        <section className="bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center mb-10">
              <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">Отрасли</h2>
              <p className="text-slate-500 text-sm mt-3">Наше оборудование работает в ключевых отраслях промышленности</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industries.map((ind) => (
                <Link key={ind.name} to={ind.href} className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                    <ind.icon className="h-5 w-5 text-amber-400 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <span className="text-slate-700 text-xs md:text-sm font-semibold text-center leading-tight group-hover:text-amber-600 transition-colors">{ind.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ TESTIMONIALS CAROUSEL ══════ */}
        <section className="bg-slate-900 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-10">
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Отзывы клиентов</h2>
              <p className="text-slate-400 text-sm mt-3">Нам доверяют предприятия по всей России</p>
            </div>
            <TestimonialCarousel />
          </div>
        </section>

        {/* ══════ FAQ ══════ */}
        <section className="bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-10">
              <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">Частые вопросы</h2>
              <p className="text-slate-500 text-sm mt-3">Всё что нужно знать о работе с нами</p>
            </div>
            <div className="max-w-[680px] mx-auto flex flex-col gap-3">
              {faqData.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CTA FORM ══════ */}
        {/* ══════ CTA (no form — just contact info) ══════ */}
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
                <a href="mailto:info@plast-metall.pro" className="rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-3 text-sm transition-colors shadow-lg shadow-amber-500/20">
                  Написать на почту
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CorporateFooter />
    </div>
  );
}
