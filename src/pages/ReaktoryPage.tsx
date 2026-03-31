import { useState } from "react";
import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { DescriptionBlock } from "@/components/corporate/sections";
import { catalog, findCategory } from "@/data/catalog";
import { ImageOff, Droplets, FlaskConical, Truck, ShieldCheck, Clock, Wrench, ChevronDown, Factory, Settings, Shield, Beaker } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const whyUs = [
  "Собственное производство химических реакторов из полипропилена и полиэтилена",
  "Индивидуальное проектирование под конкретные химические процессы",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Химическая стойкость к широкому спектру агрессивных сред",
];

const applications = [
  { icon: FlaskConical, name: "Химическое осаждение и нейтрализация" },
  { icon: Beaker, name: "Приготовление и смешивание растворов" },
  { icon: Factory, name: "Гидрометаллургические процессы" },
  { icon: Settings, name: "Выщелачивание и экстракция" },
  { icon: Shield, name: "Процессы окисления и восстановления" },
  { icon: Wrench, name: "Электрохимические реакции" },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Спроектируем реактор под ваши процессы и условия." },
  { icon: FlaskConical, title: "Подбор материала", text: "Учтём химическую среду, температуру и давление." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Проверка швов на герметичность и прочность." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ и СНГ." },
  { icon: Wrench, title: "Сервис", text: "Монтаж, пусконаладка, гарантийное обслуживание." },
];

const modifications = [
  {
    title: "По материалу",
    items: ["Реакторы из полипропилена (PP) — до +100 °C", "Реакторы из полиэтилена (ПНД/HDPE) — до +60 °C", "Комбинированные конструкции с усиленным каркасом"],
  },
  {
    title: "По конструкции",
    items: ["С мешалкой (лопастной, рамной, якорной)", "С рубашкой обогрева/охлаждения", "С герметичной крышкой и патрубками", "Открытого и закрытого типа"],
  },
  {
    title: "По назначению",
    items: ["Реакторы нейтрализации", "Реакторы смешения", "Реакторы для гидрометаллургии", "Реакторы для гальванических процессов"],
  },
  {
    title: "Дополнительные опции",
    items: ["Датчики уровня, температуры, pH", "Системы дозирования реагентов", "Теплоизоляция", "Площадки обслуживания и лестницы"],
  },
];

const reaktoryStats = [
  { value: "до 50 м³", label: "объём" },
  { value: "PP / PE / PVC", label: "материалы" },
  { value: "от 21 дня", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqReaktory = [
  { q: "Из каких материалов изготавливаются реакторы?", a: "Листовой полипропилен (PP-H, PP-C), полиэтилен (PE 100), ПВХ (PVC). Подбор — по рабочей среде, температуре и концентрации." },
  { q: "Какой максимальный объём реактора?", a: "До 50 м³. Нестандартные размеры и формы — по ТЗ заказчика." },
  { q: "Какие сроки изготовления?", a: "Стандартные реакторы — 14–21 рабочий день. Нестандартные — от 21 дня." },
  { q: "Можно оснастить мешалкой и рубашкой?", a: "Да, реакторы комплектуются мешалками (лопастными, рамными), рубашками обогрева/охлаждения, датчиками." },
  { q: "Какая гарантия?", a: "5 лет на корпус и сварные соединения." },
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

const ReaktoryPage = () => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("reaktory");
  const catIndex = catalog.findIndex((c) => c.slug === "reaktory") + 1;

  return (
    <CorporatePageShell
      catalogTabs="reaktory"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Химические реакторы" },
      ]}
      title="Химические реакторы"
      accentWord="из полимеров"
      subtitle="Реакторы из полипропилена и полиэтилена для химических, гидрометаллургических и технологических процессов!"
      badge="Собственное производство"
      heroImage="/images/reaktor-pp-render.jpg"
      stats={reaktoryStats}
      seo={{
        title: "Химические реакторы из полипропилена и полиэтилена | СЗПК Пласт-Металл ПРО",
        description: "Производство химических реакторов из листового полипропилена и полиэтилена. Объём до 50 м³. Гарантия 5 лет.",
        keywords: "химические реакторы, реакторы полипропилен, реакторы полиэтилен, реакторы на заказ",
      }}
    >
      {/* Каталог реакторов */}
      {category && (
        <section className="w-full bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Каталог реакторов</h2>
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
        title="Химические реакторы на заказ: от эскиза до монтажа"
        subtitle="Мы производим химические реакторы из листового полипропилена (PP) и полиэтилена (ПНД/HDPE) для химической, гидрометаллургической и фармацевтической промышленности."
        features={whyUs}
        applicationsTitle="Назначение реакторов"
        applications={applications}
      />

      {/* Материалы, модификации — единый тёмный блок */}
      <section className="w-full bg-slate-900 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Материалы и модификации</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-[600px]">
            Подбираем оптимальный материал под вашу рабочую среду, температуру и условия эксплуатации
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
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Плавление</span>
                  <span className="text-sm font-semibold text-amber-400">160-170 °C</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Хим. стойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Идеален для агрессивных сред и повышенных температур.</p>
            </div>

            {/* PE */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-base font-bold text-white mb-3">Полиэтилен (ПНД/HDPE)</h3>
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
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Плавление</span>
                  <span className="text-sm font-semibold text-amber-400">120-135 °C</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">УФ-стойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Оптимален для низкотемпературных процессов и пищевых сред.</p>
            </div>

            {/* Модификации */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-base font-bold text-white mb-3">Виды и модификации</h3>
              <Accordion type="multiple" defaultValue={["По материалу"]} className="space-y-1.5">
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
                {faqReaktory.map((faq, i) => (
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

export default ReaktoryPage;
