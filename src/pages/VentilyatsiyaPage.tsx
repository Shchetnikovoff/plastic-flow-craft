import { useState } from "react";
import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { DescriptionBlock } from "@/components/corporate/sections";
import { catalog, findCategory } from "@/data/catalog";
import { ImageOff, FlaskConical, Truck, ShieldCheck, Clock, Wrench, ChevronDown, Factory, Settings, Shield, Wind } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const whyUs = [
  "Собственное производство вентиляционных элементов из полипропилена",
  "Круглое и прямоугольное сечение — полный ассортимент фасонных изделий",
  "Химическая стойкость к агрессивным средам",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Изготовление по типовым и индивидуальным размерам",
];

const applications = [
  { icon: Factory, name: "Вентиляция гальванических и травильных участков" },
  { icon: Wind, name: "Вытяжные системы химических лабораторий" },
  { icon: Settings, name: "Промышленная вентиляция с агрессивными средами" },
  { icon: Shield, name: "Системы аспирации и газоочистки" },
  { icon: FlaskConical, name: "Вентиляция фармацевтических и пищевых производств" },
  { icon: Wrench, name: "Приточно-вытяжные системы промышленных объектов" },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Изготовим элементы по вашим чертежам и размерам." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый элемент проходит проверку на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 5–14 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ и СНГ." },
  { icon: Wrench, title: "Сервис", text: "Консультации по монтажу и подбору элементов." },
  { icon: Shield, title: "Документация", text: "Сертификаты на все материалы." },
];

const modifications = [
  {
    title: "Круглого сечения",
    items: ["Воздуховоды круглые", "Отводы вентиляционные (15°, 30°, 45°, 60°, 90°)", "Тройники вентиляционные", "Раздвижные элементы", "Переходы и муфты"],
  },
  {
    title: "Прямоугольного сечения",
    items: ["Воздуховоды прямоугольные", "Отводы прямоугольные", "Тройники прямоугольные", "Переходы круглый-прямоугольный"],
  },
  {
    title: "Дополнительные опции",
    items: ["Фланцевые соединения", "Компенсаторы", "Шиберные заслонки", "Ревизионные люки", "Теплоизоляция"],
  },
];

const ventilyatsiyaStats = [
  { value: "Круглые / квадратные", label: "сечения" },
  { value: "PP / PE", label: "материалы" },
  { value: "от 7 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqVentilyatsiya = [
  { q: "Какие виды вентиляции вы производите?", a: "Воздуховоды круглого и прямоугольного сечения, тройники, отводы, раздвижные воздуховоды — полный ассортимент фасонных изделий." },
  { q: "Из каких материалов?", a: "Полипропилен (PP) для агрессивных сред до +100 °C и полиэтилен (PE) для стандартных условий." },
  { q: "Какие диаметры доступны?", a: "От 50 до 1200 мм для круглых, нестандартные размеры — по ТЗ заказчика." },
  { q: "Какие сроки изготовления?", a: "Стандартные элементы — 5–7 дней, нестандартные — 7–14 дней." },
  { q: "Доставка по России?", a: "Да, доставка спецтранспортом по всей РФ. Производство — Ленинградская область." },
];

function FAQInlineItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
      >
        {q}
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="px-4 pb-3 text-xs text-slate-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

const VentilyatsiyaPage = () => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("ventilyatsiya");
  const catIndex = catalog.findIndex((c) => c.slug === "ventilyatsiya") + 1;

  return (
    <CorporatePageShell
      catalogTabs="ventilyatsiya"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Вентиляция" },
      ]}
      title="Вентиляция"
      accentWord="из полипропилена"
      subtitle="Воздуховоды, отводы, тройники и фасонные изделия — химически стойкие элементы вентиляции!"
      badge="Собственное производство"
      heroImage="/images/ventilyatsiya-hero-1.png"
      stats={ventilyatsiyaStats}
      seo={{
        title: "Вентиляция из полипропилена | СЗПК Пласт-Металл ПРО",
        description: "Производство элементов промышленной вентиляции из полипропилена: воздуховоды, отводы, тройники. Гарантия 5 лет.",
        keywords: "вентиляция полипропилен, воздуховоды полипропилен, фасонные элементы вентиляции",
      }}
    >
      {/* Каталог элементов вентиляции */}
      {category && (
        <section className="w-full bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Каталог элементов вентиляции</h2>
            <div className="mt-10 flex flex-col md:flex-row gap-6">
              <nav className="md:w-[220px] shrink-0">
                <ul className="space-y-0.5">
                  {category.subcategories.map((sub, i) => {
                    const isSelected = selectedSubId === sub.id;
                    return (
                      <li key={sub.id}>
                        <button
                          onClick={() => setSelectedSubId(isSelected ? null : sub.id)}
                          className={`group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left transition-colors ${
                            isSelected
                              ? "bg-amber-50 border border-amber-200"
                              : "hover:bg-slate-50 border border-transparent"
                          }`}
                        >
                          <span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-amber-600" : "text-slate-400"}`}>{catIndex}.{i + 1}</span>
                          <span className={`transition-colors ${isSelected ? "text-amber-600 font-semibold" : "text-slate-700 group-hover:text-amber-600"}`}>{sub.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="flex-1">
                {(() => {
                  const selectedSub = category.subcategories.find((s) => s.id === selectedSubId);
                  if (selectedSub) {
                    return (
                      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
                        <div className="aspect-[16/9] bg-slate-50 flex items-center justify-center">
                          {selectedSub.image ? (
                            <img src={selectedSub.image} alt={selectedSub.name} className="w-full h-full object-contain" />
                          ) : (
                            <ImageOff className="h-12 w-12 text-slate-300" />
                          )}
                        </div>
                        <div className="p-5">
                          <p className="text-xs text-slate-400 font-semibold mb-1">
                            {catIndex}.{category.subcategories.findIndex((s) => s.id === selectedSub.id) + 1}
                          </p>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{selectedSub.name}</h3>
                          <p className="text-sm text-slate-500 mb-4">
                            {selectedSub.description || "Описание уточняйте по запросу."}
                          </p>
                          {selectedSub.externalPath ? (
                            <Link
                              to={selectedSub.externalPath}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:underline"
                            >
                              Перейти на страницу →
                            </Link>
                          ) : (
                            <a href="#cta-form" className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:underline">
                              Запросить расчёт →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.subcategories.map((sub, i) => {
                        const cardContent = (
                          <>
                            <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center">
                              {sub.image ? (
                                <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" />
                              ) : (
                                <ImageOff className="h-10 w-10 text-slate-300" />
                              )}
                            </div>
                            <div className="px-3 py-2.5">
                              <p className="text-xs text-slate-400 font-semibold">{catIndex}.{i + 1}</p>
                              <p className="text-sm font-medium text-slate-700 group-hover:text-amber-600 transition-colors mt-0.5">{sub.name}</p>
                            </div>
                          </>
                        );

                        if (sub.externalPath) {
                          return (
                            <Link
                              key={sub.id}
                              to={sub.externalPath}
                              className="group rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-amber-300 hover:shadow-md transition-all text-left block"
                            >
                              {cardContent}
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedSubId(sub.id)}
                            className="group rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-amber-300 hover:shadow-md transition-all text-left"
                          >
                            {cardContent}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Описание + Назначение */}
      <DescriptionBlock
        title="Элементы промышленной вентиляции на заказ"
        subtitle="Мы производим полный спектр элементов промышленной вентиляции из полипропилена и полиэтилена круглого и прямоугольного сечения для работы с агрессивными средами."
        features={whyUs}
        applicationsTitle="Области применения"
        applications={applications}
      />

      {/* Материалы, модификации — единый тёмный блок */}
      <section className="w-full bg-slate-900 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Материалы и модификации</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-[600px]">
            Подбираем оптимальный материал под рабочую среду и условия эксплуатации
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* PP */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-base font-bold text-white mb-3">Полипропилен (PP)</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Температура</span>
                  <span className="text-sm font-semibold text-amber-400">-20...+100 °C</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Плотность</span>
                  <span className="text-sm font-semibold text-amber-400">0,90-0,92</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Хим. стойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Толщина стенки</span>
                  <span className="text-sm font-semibold text-amber-400">3–10 мм</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Идеален для агрессивных сред и повышенных температур.</p>
            </div>

            {/* PE */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-base font-bold text-white mb-3">Полиэтилен (PE)</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Температура</span>
                  <span className="text-sm font-semibold text-amber-400">-50...+60 °C</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Плотность</span>
                  <span className="text-sm font-semibold text-amber-400">0,93-0,97</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">УФ-стойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Толщина стенки</span>
                  <span className="text-sm font-semibold text-amber-400">3–10 мм</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Оптимален для наружного размещения и стандартных условий.</p>
            </div>

            {/* Модификации */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-base font-bold text-white mb-3">Виды и модификации</h3>
              <Accordion type="multiple" defaultValue={["Круглого сечения"]} className="space-y-1.5">
                {modifications.map((mod) => (
                  <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-white/10 bg-white/5 px-3">
                    <AccordionTrigger className="text-xs font-semibold text-slate-300 hover:text-white hover:no-underline py-2.5">
                      {mod.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1.5 pb-2">
                        {mod.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества + FAQ */}
      <section className="w-full bg-slate-50 border-t border-slate-200 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0">
            {/* Left — Преимущества */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Преимущества сотрудничества</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {advantages.map((adv) => (
                  <div key={adv.title} className="flex gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                      <adv.icon className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{adv.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{adv.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:flex items-stretch justify-center px-4">
              <div className="w-px bg-slate-200" />
            </div>
            <div className="lg:hidden h-px bg-slate-200 my-4" />

            {/* Right — FAQ */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Частые вопросы</h2>
              <div className="space-y-2">
                {faqVentilyatsiya.map((faq, i) => (
                  <FAQInlineItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </CorporatePageShell>
  );
};

export default VentilyatsiyaPage;
