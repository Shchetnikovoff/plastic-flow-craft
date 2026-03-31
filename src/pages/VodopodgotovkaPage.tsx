import { useState } from "react";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { DescriptionBlock } from "@/components/corporate/sections";
import { Droplets, FlaskConical, Truck, ShieldCheck, Clock, Wrench, ChevronDown, Factory, Settings, Shield, Beaker } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const whyUs = [
  "Собственное производство систем водоподготовки из химически стойких полимеров",
  "Индивидуальный подбор системы под параметры исходной воды",
  "Гарантия 5 лет, срок службы — от 25 лет",
  "Полный цикл: анализ воды, проектирование, производство, монтаж, пусконаладка",
  "Соответствие СанПиН и требованиям к питьевой и технической воде",
];

const applications = [
  { icon: Droplets, name: "Подготовка питьевой воды для жилых и общественных объектов" },
  { icon: Factory, name: "Водоподготовка для промышленных предприятий" },
  { icon: Beaker, name: "Деминерализация и умягчение воды для котельных" },
  { icon: FlaskConical, name: "Подготовка воды для фармацевтических и пищевых производств" },
  { icon: Settings, name: "Обратноосмотическая очистка и ультрафильтрация" },
  { icon: Shield, name: "Обеззараживание и кондиционирование воды" },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Подберём систему по анализу воды и требованиям к качеству." },
  { icon: FlaskConical, title: "Анализ воды", text: "Проведём полный анализ исходной воды перед проектированием." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Гарантия соответствия очищенной воды нормативам." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ и СНГ." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка и сервисное обслуживание." },
];

const modifications = [
  {
    title: "Системы фильтрации",
    items: ["Механическая фильтрация (песчаные, угольные фильтры)", "Ультрафильтрация", "Обратный осмос", "Нанофильтрация"],
  },
  {
    title: "Системы умягчения и деминерализации",
    items: ["Ионообменные умягчители", "Деминерализаторы смешанного типа", "Электродеионизация"],
  },
  {
    title: "Системы обеззараживания",
    items: ["УФ-обеззараживание", "Озонирование", "Хлорирование и дехлорирование"],
  },
  {
    title: "Дополнительные опции",
    items: ["Станции дозирования реагентов", "Ёмкости для чистой воды из полипропилена", "Системы автоматического управления", "Узлы учёта и контроля качества воды"],
  },
];

const vodopodgotovkaStats = [
  { value: "PP / PE / PVC", label: "материалы" },
  { value: "по ТЗ", label: "проектирование" },
  { value: "от 14 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqVodopodgotovka = [
  { q: "Какие системы водоподготовки вы производите?", a: "Системы фильтрации, умягчения, деминерализации, обеззараживания — комплексные решения под любые задачи водоподготовки." },
  { q: "Из каких материалов изготавливается оборудование?", a: "Полипропилен (PP), полиэтилен (PE), ПВХ (PVC). Все материалы соответствуют требованиям для контакта с питьевой водой." },
  { q: "Проводите анализ воды?", a: "Да, проводим полный анализ исходной воды для подбора оптимальной технологии очистки." },
  { q: "Какие сроки изготовления?", a: "Стандартные системы — 14–21 день, комплексные — от 30 дней." },
  { q: "Какая гарантия?", a: "5 лет на корпуса и сварные соединения, 1–2 года на мембраны и расходные элементы." },
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

const VodopodgotovkaPage = () => {
  return (
    <CorporatePageShell
      catalogTabs="vodopodgotovka"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Водоподготовка" },
      ]}
      title="Водоподготовка"
      accentWord="полимерное оборудование"
      subtitle="Обратный осмос, фильтрация и умягчение — комплексные решения для подготовки воды любого качества!"
      badge="Собственное производство"
      heroImage="/images/emkosti-collage-hero.png"
      stats={vodopodgotovkaStats}
      seo={{
        title: "Системы водоподготовки из полимеров | СЗПК Пласт-Металл ПРО",
        description: "Производство систем водоподготовки из полипропилена и полиэтилена. Фильтрация, умягчение, обеззараживание. Гарантия 5 лет.",
        keywords: "водоподготовка, системы водоподготовки, фильтрация воды, умягчение воды, обратный осмос",
      }}
    >
      {/* Описание + Назначение */}
      <DescriptionBlock
        title="Системы водоподготовки на заказ: от анализа воды до монтажа"
        subtitle="Мы проектируем и производим комплексные системы водоподготовки из химически стойких полимеров для питьевого, промышленного и технологического водоснабжения."
        features={whyUs}
        applicationsTitle="Области применения"
        applications={applications}
      />

      {/* Материалы, модификации — единый тёмный блок */}
      <section className="w-full bg-slate-900 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Материалы и модификации</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-[600px]">
            Подбираем оптимальную технологию и материалы под качество исходной воды и требования к очищенной
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
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Пищевой допуск</span>
                  <span className="text-sm font-semibold text-amber-400">Да</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Хим. стойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Идеален для ёмкостей, фильтров и трубопроводов водоподготовки.</p>
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
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Пищевой допуск</span>
                  <span className="text-sm font-semibold text-amber-400">Да (PE 100)</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">УФ-стойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Оптимален для накопительных ёмкостей и наружных трубопроводов.</p>
            </div>

            {/* Модификации */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-base font-bold text-white mb-3">Виды и модификации</h3>
              <Accordion type="multiple" defaultValue={["Системы фильтрации"]} className="space-y-1.5">
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
                {faqVodopodgotovka.map((faq, i) => (
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

export default VodopodgotovkaPage;
