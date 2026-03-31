import { useState } from "react";
import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, FeatureChecklist, FAQSection } from "@/components/corporate/sections";
import { findCategory } from "@/data/catalog";
import { Settings, ShieldCheck, Clock, Truck, Wrench, Shield, Factory, Wind, FlaskConical, ImageOff } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const stats = [
  { value: "Круглые / квадратные", label: "сечения" },
  { value: "PP / PE", label: "материалы" },
  { value: "от 7 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faq = [
  { q: "Какие виды вентиляции вы производите?", a: "Воздуховоды круглого и прямоугольного сечения, тройники, отводы, раздвижные воздуховоды." },
  { q: "Из каких материалов?", a: "Полипропилен (PP) и полиэтилен (PE)." },
  { q: "Какие диаметры доступны?", a: "От 50 до 1200 мм для круглых, нестандарт — по ТЗ." },
  { q: "Сроки?", a: "7–14 рабочих дней." },
  { q: "Доставка?", a: "Спецтранспортом по всей РФ." },
];

const whyUs = [
  "Собственное производство вентиляционных элементов из полипропилена",
  "Круглое и прямоугольное сечение — полный ассортимент фасонных изделий",
  "Химическая стойкость к агрессивным средам",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Изготовление по типовым и индивидуальным размерам",
];

const applications = [
  { icon: Factory, text: "Вентиляция гальванических и травильных участков" },
  { icon: Wind, text: "Вытяжные системы химических лабораторий" },
  { icon: Settings, text: "Промышленная вентиляция с агрессивными средами" },
  { icon: Shield, text: "Системы аспирации и газоочистки" },
  { icon: FlaskConical, text: "Вентиляция фармацевтических и пищевых производств" },
  { icon: Wrench, text: "Приточно-вытяжные системы промышленных объектов" },
];

const modifications = [
  { title: "Круглого сечения", items: ["Воздуховоды круглые", "Отводы вентиляционные (15°, 30°, 45°, 60°, 90°)", "Тройники вентиляционные", "Раздвижные элементы", "Переходы и муфты"] },
  { title: "Прямоугольного сечения", items: ["Воздуховоды прямоугольные", "Отводы прямоугольные", "Тройники прямоугольные", "Переходы круглый-прямоугольный"] },
  { title: "Материалы", items: ["Полипропилен (PP) — для агрессивных сред до +100 °C", "ПВХ (PVC) — для стандартных условий до +60 °C", "Толщина стенок от 3 до 10 мм"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Изготовим элементы по вашим чертежам и размерам." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый элемент проходит проверку на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 5–14 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Консультации по монтажу и подбору элементов." },
  { icon: Shield, title: "Документация", text: "Сертификаты на материалы." },
];

const VentilyatsiyaPage = () => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("ventilyatsiya");
  const catIndex = 4;

  return (
    <CorporatePageShell
      catalogTabs="ventilyatsiya"
      title="Промышленная вентиляция из полипропилена"
      subtitle="Воздуховоды, отводы, тройники и фасонные изделия — химически стойкие элементы вентиляции!"
      heroImage="/images/ventilyatsiya-hero-1.png"
      stats={stats}
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Вентиляция" },
      ]}
    >
      {/* Navigation */}
      <section className="w-full bg-white py-6">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <nav className="flex flex-wrap gap-2">
            {[
              { id: "opisanie", label: "Описание" },
              { id: "primenenie", label: "Применение" },
              { id: "vidy", label: "Виды" },
              { id: "preimushchestva", label: "Преимущества" },
              { id: "katalog", label: "Каталог" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Description */}
      <section id="opisanie" className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Элементы промышленной вентиляции</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">Мы производим полный спектр элементов промышленной вентиляции из полипропилена и ПВХ круглого и прямоугольного сечения для работы с агрессивными средами.</p>
          <FeatureChecklist items={whyUs} />
        </div>
      </section>

      {/* Applications */}
      <section id="primenenie" className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((a, i) => (
              <div key={i} className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-3">
                <a.icon className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-900">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types */}
      <section id="vidy" className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Виды элементов</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (
              <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-slate-200 bg-white px-4">
                <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline">{mod.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 pb-2">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                        <span className="text-amber-600 mt-1">•</span><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Advantages */}
      <section id="preimushchestva" className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <AdvantagesGrid items={advantages} />
        </div>
      </section>

      {/* Catalog */}
      {category && (
        <section id="katalog" className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Каталог элементов вентиляции</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <nav className="md:w-[220px] shrink-0">
                <ul className="space-y-0.5">
                  {category.subcategories.map((sub, i) => {
                    const isSelected = selectedSubId === sub.id;
                    return (
                      <li key={sub.id}>
                        <button
                          onClick={() => setSelectedSubId(isSelected ? null : sub.id)}
                          className={`group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left transition-colors ${isSelected ? "bg-amber-50 border border-amber-200" : "hover:bg-slate-100 border border-transparent"}`}
                        >
                          <span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-amber-600" : "text-slate-500"}`}>{catIndex}.{i + 1}</span>
                          <span className={`transition-colors ${isSelected ? "text-amber-600 font-semibold" : "text-slate-900 group-hover:text-amber-600"}`}>{sub.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="flex-1">
                {(() => {
                  const sel = category.subcategories.find((s) => s.id === selectedSubId);
                  if (sel) return (
                    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center">
                        {sel.image ? <img src={sel.image} alt={sel.name} className="w-full h-full object-contain" /> : <ImageOff className="h-12 w-12 text-slate-300" />}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{sel.name}</h3>
                        {sel.externalPath && <Link to={sel.externalPath} className="text-sm font-medium text-amber-600 hover:underline">Перейти на страницу &rarr;</Link>}
                      </div>
                    </div>
                  );
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.subcategories.map((sub, i) => {
                        const cc = (
                          <>
                            <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                              {sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" /> : <ImageOff className="h-10 w-10 text-slate-300" />}
                            </div>
                            <div className="px-3 py-2.5">
                              <p className="text-xs text-slate-500 font-semibold">{catIndex}.{i + 1}</p>
                              <p className="text-sm font-medium text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5">{sub.name}</p>
                            </div>
                          </>
                        );
                        if (sub.externalPath) return <Link key={sub.id} to={sub.externalPath} className="group rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-amber-300 hover:shadow-md transition-all block">{cc}</Link>;
                        return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-amber-300 hover:shadow-md transition-all text-left">{cc}</button>;
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default VentilyatsiyaPage;
