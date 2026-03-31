import { useState } from "react";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { DescriptionBlock } from "@/components/corporate/sections";
import { FlaskConical, Truck, ShieldCheck, Clock, Wrench, ChevronDown, Factory, Settings, Shield, Zap, Beaker } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const whyUs = [
  "Собственное производство гальванических линий и ванн с ЧПУ-оборудованием",
  "Изготовление автоматических, механизированных и ручных линий",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, пусконаладка",
  "Соответствие ГОСТ и международным стандартам качества покрытий",
  "Наличие сертификатов на все материалы и готовые изделия",
];

const applications = [
  { icon: Factory, name: "Нанесение гальванических покрытий (цинкование, никелирование, хромирование)" },
  { icon: Beaker, name: "Анодирование и оксидирование металлов" },
  { icon: Zap, name: "Электрохимическая обработка деталей" },
  { icon: Settings, name: "Подготовка поверхности (обезжиривание, травление, промывка)" },
  { icon: Shield, name: "Нанесение защитных и декоративных покрытий" },
  { icon: FlaskConical, name: "Химическое и электрохимическое полирование" },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Разработаем проект гальванической линии под ваши задачи и площади." },
  { icon: FlaskConical, title: "Точный подбор", text: "Учтём тип покрытий, производительность и требования к качеству." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждая ванна проходит проверку на герметичность и стойкость." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 21–45 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка крупногабаритного оборудования по РФ." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное обслуживание." },
];

const modifications = [
  {
    title: "Типы гальванических линий",
    items: ["Ручные линии — для мелкосерийного производства", "Механизированные линии — для среднесерийного производства", "Автоматические линии — для крупносерийного и массового производства"],
  },
  {
    title: "Виды ванн",
    items: ["Гальванические ванны (стационарные)", "Колокольные ванны (для мелких деталей)", "Барабанные ванны (для массовой обработки)", "Ванны промывки и нейтрализации"],
  },
  {
    title: "Дополнительное оборудование",
    items: ["Линии подготовки поверхности", "Системы фильтрации электролита", "Выпрямители и источники тока", "Системы вентиляции и газоочистки", "Запчасти и комплектующие для гальваники"],
  },
];

const galvanikaStats = [
  { value: "Ванны / линии", label: "оборудование" },
  { value: "PP / PVC", label: "материалы" },
  { value: "от 14 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqGalvanika = [
  { q: "Какие типы гальванических линий вы производите?", a: "Ручные, механизированные и автоматические линии — выбор зависит от объёмов производства и требований к качеству покрытий." },
  { q: "Из каких материалов изготавливаются ванны?", a: "Полипропилен (PP) для температур до +100 °C и ПВХ (PVC) для стандартных условий до +60 °C. Оба материала устойчивы к кислотам и щелочам." },
  { q: "Какие сроки изготовления?", a: "Отдельные ванны — от 14 дней, комплексные линии — 30–60 дней." },
  { q: "Выполняете монтаж и пусконаладку?", a: "Да, полный комплекс: монтаж, подключение, пусконаладка, обучение персонала." },
  { q: "Какая гарантия на оборудование?", a: "5 лет на корпуса ванн и сварные соединения. Расширенная гарантия — по договору." },
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

const GalvanikaPage = () => {
  return (
    <CorporatePageShell
      catalogTabs="galvanika"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Гальваника" },
      ]}
      title="Гальваническое оборудование"
      accentWord="из полимеров"
      subtitle="Проектирование, производство и монтаж гальванических линий и ванн — полный цикл от эскиза до ввода в эксплуатацию!"
      badge="Собственное производство"
      heroImage="/images/emkosti-collage-hero.png"
      stats={galvanikaStats}
      seo={{
        title: "Гальваническое оборудование из полимеров | СЗПК Пласт-Металл ПРО",
        description: "Производство гальванических ванн и линий из полипропилена и ПВХ. Ручные, механизированные и автоматические линии. Гарантия 5 лет.",
        keywords: "гальваническое оборудование, гальванические ванны, гальванические линии, ванны полипропилен",
      }}
    >
      {/* Описание + Назначение */}
      <DescriptionBlock
        title="Гальваническое оборудование на заказ: от проекта до ввода в эксплуатацию"
        subtitle="Мы производим гальванические линии и ванны из полипропилена (PP) и ПВХ (PVC) для нанесения гальванических покрытий, анодирования, травления и промывки деталей."
        features={whyUs}
        applicationsTitle="Области применения"
        applications={applications}
      />

      {/* Материалы, модификации — единый тёмный блок */}
      <section className="w-full bg-slate-900 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Материалы и модификации</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-[600px]">
            Подбираем оптимальный материал под вашу рабочую среду и тип гальванического процесса
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
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Кислотостойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Щелочестойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Идеален для гальванических ванн с повышенными температурами электролита.</p>
            </div>

            {/* PVC */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-base font-bold text-white mb-3">ПВХ (PVC)</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Температура</span>
                  <span className="text-sm font-semibold text-amber-400">0...+60 °C</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Плотность</span>
                  <span className="text-sm font-semibold text-amber-400">1,35-1,45</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Поверхность</span>
                  <span className="text-sm font-semibold text-amber-400">Гладкая</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Хим. стойкость</span>
                  <span className="text-sm font-semibold text-amber-400">Высокая</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Оптимален для стандартных гальванических процессов и промывочных ванн.</p>
            </div>

            {/* Модификации */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-base font-bold text-white mb-3">Виды и модификации</h3>
              <Accordion type="multiple" defaultValue={["Типы гальванических линий"]} className="space-y-1.5">
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
                {faqGalvanika.map((faq, i) => (
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

export default GalvanikaPage;
