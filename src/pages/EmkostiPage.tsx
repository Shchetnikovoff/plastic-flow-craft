import { useState } from "react";
import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, ApplicationAreas, FeatureChecklist, FAQSection } from "@/components/corporate/sections";
import { findCategory } from "@/data/catalog";
import { ImageOff, Droplets, FlaskConical, Truck, ShieldCheck, Clock, Wrench } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const whyUs = [
  "Собственное производство с ЧПУ-оборудованием и экструзионной сваркой",
  "Изготовление по типовым и индивидуальным проектам",
  "Гарантия 5 лет и срок службы до 50 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
  "Соответствие ГОСТ, ТУ и международным стандартам качества",
];

const applications = [
  { icon: Droplets, name: "Хранение и транспортировка питьевой и технической воды" },
  { icon: FlaskConical, name: "Работа с агрессивными средами: кислотами, щелочами, солевыми растворами" },
  { icon: Droplets, name: "Пищевая промышленность (молоко, масла, соки)" },
  { icon: Droplets, name: "Системы водоподготовки, водоочистки и канализации" },
  { icon: Droplets, name: "Накопление ливневых и паводковых вод, пожарные резервуары" },
  { icon: FlaskConical, name: "Хранение минеральных удобрений, пестицидов и ядохимикатов" },
  { icon: Wrench, name: "Технологические процессы в гальванике, металлургии" },
  { icon: Truck, name: "Транспортировка и логистика жидкостей" },
];

const advantages = [
  { icon: Wrench, title: "Индивидуальный подход", text: "Разработаем проект под ваши задачи, включая нестандартные формы и комплектацию." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проходит проверку на герметичность и прочность." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 10–14 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку по РФ и СНГ, включая погрузочно-разгрузочные работы." },
  { icon: FlaskConical, title: "Сервис", text: "Монтаж «под ключ», пусконаладка, гарантийное и постгарантийное обслуживание." },
];

const modifications = [
  {
    title: "По форме",
    items: ["Цилиндрические (вертикальные и горизонтальные)", "Прямоугольные и квадратные", "Конические и многоугольные (по чертежам заказчика)"],
  },
  {
    title: "По объёму",
    items: ["Малые (от 50 л до 1 м³)", "Средние (1–10 м³)", "Крупные (10–300 м³, включая подземные и наземные резервуары)"],
  },
  {
    title: "По назначению",
    items: ["Пищевые (с санитарно-эпидемиологическими заключениями)", "Химические (для кислот, щелочей, растворителей)", "Пожарные и накопительные", "Дренажные и канализационные", "Технологические (для гальванических линий, реакторов)"],
  },
  {
    title: "Дополнительные опции",
    items: ["Люки, патрубки, штуцеры, фланцы", "Уровнемеры, датчики, системы обогрева", "Каркасы, лестницы, площадки обслуживания", "Футеровка, усиление рёбрами жёсткости", "Подземное исполнение с анкерными креплениями"],
  },
];

const emkostiStats = [
  { value: "50 л — 300 м³", label: "диапазон объёмов" },
  { value: "PP / PE / PVC", label: "материалы" },
  { value: "от 10 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqEmkosti = [
  { q: "Из каких материалов изготавливаются ёмкости?", a: "Листовой полипропилен (PP-H, PP-C, PPs), полиэтилен (PE 100), ПВХ (PVC). Подбор — по рабочей среде, температуре и концентрации." },
  { q: "Какой диапазон объёмов?", a: "От 50 литров до 300 м³. Нестандартные размеры — по ТЗ заказчика." },
  { q: "Какие сроки изготовления?", a: "Стандартные ёмкости — 10–21 рабочий день. Нестандартные — от 15 дней." },
  { q: "Есть ли доставка?", a: "Да, доставка спецтранспортом по всей РФ. Производство — Ленинградская область." },
  { q: "Можно заказать по своим чертежам?", a: "Да, изготовим по вашим чертежам и ТЗ, а также спроектируем с нуля под ваши задачи." },
];

const EmkostiPage = () => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("emkosti");
  const catIndex = 6;

  return (
    <CorporatePageShell
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Ёмкости" },
      ]}
      title="Промышленные ёмкости"
      accentWord="из полипропилена и полиэтилена"
      subtitle="Надёжность, проверенная временем! Изготовление по типовым и индивидуальным проектам."
      badge="Собственное производство"
      heroImage="/images/emkosti-collage-hero.png"
      stats={emkostiStats}
      seo={{
        title: "Промышленные ёмкости из полипропилена и полиэтилена | СЗПК Пласт-Металл ПРО",
        description: "Производство промышленных ёмкостей из листового полипропилена и полиэтилена. Объём от 50 л до 300 м³. Гарантия 5 лет.",
        keywords: "ёмкости полипропилен, ёмкости полиэтилен, промышленные ёмкости, ёмкости на заказ",
      }}
    >
      {/* Каталог ёмкостей */}
      {category && (
        <section className="w-full bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Каталог ёмкостей</h2>
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

      {/* Описание */}
      <FeatureChecklist
        title="Промышленные ёмкости на заказ: от эскиза до монтажа"
        subtitle="Мы производим промышленные ёмкости из листового полипропилена (PP) и полиэтилена (ПНД/HDPE) любой сложности и объёма — под задачи химической, пищевой, фармацевтической промышленности, сельского хозяйства, ЖКХ и строительства."
        items={whyUs}
        columns={1}
      />

      {/* Назначение */}
      <ApplicationAreas
        title="Назначение ёмкостей"
        items={applications}
      />

      {/* Материалы — custom section kept inline */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Описание материалов</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Полипропилен (PP)</h3>
              <div className="grid grid-cols-2 gap-px rounded-lg border border-slate-200 overflow-hidden mb-4">
                <div className="bg-slate-50 p-3"><span className="block text-xs text-slate-400">Температура</span><span className="text-sm font-semibold text-slate-900">-20...+100 °C</span></div>
                <div className="bg-slate-50 p-3"><span className="block text-xs text-slate-400">Плотность</span><span className="text-sm font-semibold text-slate-900">0,90-0,92 г/см³</span></div>
                <div className="bg-slate-50 p-3 border-t border-slate-200"><span className="block text-xs text-slate-400">Плавление</span><span className="text-sm font-semibold text-slate-900">160-170 °C</span></div>
                <div className="bg-slate-50 p-3 border-t border-slate-200"><span className="block text-xs text-slate-400">Хим. стойкость</span><span className="text-sm font-semibold text-slate-900">Высокая</span></div>
              </div>
              <p className="text-sm text-slate-500">Идеален для агрессивных сред и повышенных температур.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Полиэтилен (ПНД/HDPE)</h3>
              <div className="grid grid-cols-2 gap-px rounded-lg border border-slate-200 overflow-hidden mb-4">
                <div className="bg-slate-50 p-3"><span className="block text-xs text-slate-400">Температура</span><span className="text-sm font-semibold text-slate-900">-50...+60 °C</span></div>
                <div className="bg-slate-50 p-3"><span className="block text-xs text-slate-400">Плотность</span><span className="text-sm font-semibold text-slate-900">0,93-0,97 г/см³</span></div>
                <div className="bg-slate-50 p-3 border-t border-slate-200"><span className="block text-xs text-slate-400">Плавление</span><span className="text-sm font-semibold text-slate-900">120-135 °C</span></div>
                <div className="bg-slate-50 p-3 border-t border-slate-200"><span className="block text-xs text-slate-400">УФ-стойкость</span><span className="text-sm font-semibold text-slate-900">Высокая</span></div>
              </div>
              <p className="text-sm text-slate-500">Оптимален для воды, пищевых продуктов и эксплуатации на открытом воздухе.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Виды и модификации */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Виды и модификации ёмкостей</h2>
          <div className="mt-10">
            <Accordion type="multiple" defaultValue={["По форме"]} className="space-y-3">
              {modifications.map((mod) => (
                <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-slate-200 bg-white px-5">
                  <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline">
                    {mod.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pb-2">
                      {mod.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                          <span className="text-amber-500 mt-1">•</span>
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
      </section>

      {/* CTA to configurator */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Link
            to="/catalog/emkosti/konfigurator"
            className="block rounded-2xl border-2 border-amber-300 bg-amber-50 p-8 sm:p-10 text-center hover:border-amber-500 hover:bg-amber-100/50 transition-all group"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
              Конфигуратор ёмкостей
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Подберите тип, материал и размер ёмкости. Добавьте в корзину и оформите заявку.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600">
              Перейти к конфигуратору →
            </span>
          </Link>
        </div>
      </section>

      {/* Преимущества */}
      <AdvantagesGrid
        title="Преимущества сотрудничества"
        items={advantages}
      />

      {/* FAQ */}
      <FAQSection items={faqEmkosti} />
    </CorporatePageShell>
  );
};

export default EmkostiPage;
