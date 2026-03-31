import { useState } from "react";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { ProductGrid, AdvantagesGrid, FeatureChecklist, FAQSection } from "@/components/corporate/sections";
import { findCategory } from "@/data/catalog";
import {
  Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical,
  Factory, Zap, Beaker, Settings, Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const stats = [
  { value: "Ванны / линии", label: "оборудование" },
  { value: "PP / PVC", label: "материалы" },
  { value: "от 14 дней", label: "сроки" },
  { value: "5 лет", label: "гарантия" },
];

const whyUs = [
  "Собственное производство гальванических линий и ванн с ЧПУ-оборудованием",
  "Изготовление автоматических, механизированных и ручных линий",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, пусконаладка",
  "Соответствие ГОСТ и международным стандартам качества покрытий",
  "Наличие сертификатов на все материалы и готовые изделия",
];

const applications = [
  { icon: Factory, text: "Нанесение гальванических покрытий (цинкование, никелирование, хромирование)" },
  { icon: Beaker, text: "Анодирование и оксидирование металлов" },
  { icon: Zap, text: "Электрохимическая обработка деталей" },
  { icon: Settings, text: "Подготовка поверхности (обезжиривание, травление, промывка)" },
  { icon: Shield, text: "Нанесение защитных и декоративных покрытий" },
  { icon: FlaskConical, text: "Химическое и электрохимическое полирование" },
];

const materialCards = [
  {
    name: "Полипропилен (PP)",
    specs: ["Температурный диапазон: −20...+100 °C", "Высокая стойкость к кислотам и щелочам", "Идеален для гальванических ванн"],
  },
  {
    name: "ПВХ (PVC)",
    specs: ["Температурный диапазон: до +60 °C", "Устойчивость к агрессивным средам", "Гладкая поверхность, легко очищается"],
  },
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

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Разработаем проект гальванической линии под ваши задачи и производственные площади." },
  { icon: FlaskConical, title: "Точный подбор оборудования", text: "Учтём тип покрытий, производительность и требования к качеству." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждая ванна проходит проверку на герметичность и химическую стойкость." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 21–45 дней, монтаж — 5–14 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку крупногабаритного оборудования по РФ." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: Shield, title: "Документация", text: "Предоставим паспорта изделий, сертификаты и инструкции по эксплуатации." },
];

const faq = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по рабочей среде и температуре." },
  { q: "Какие сроки изготовления?", a: "14–30 рабочих дней в зависимости от сложности." },
  { q: "Проектируете под заказ?", a: "Да, по вашим ТЗ или с нуля." },
  { q: "Доставка и монтаж?", a: "Спецтранспорт по всей РФ, шеф-монтаж на объекте." },
  { q: "Какая гарантия?", a: "5 лет на всё оборудование." },
];

const GalvanikaPage = () => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("galvanika");

  return (
    <CorporatePageShell
      breadcrumbs={[
        { label: "Каталог", to: "/catalog" },
        { label: "Гальваника" },
      ]}
      title="Гальваническое оборудование из полимеров"
      subtitle="Проектирование, производство и монтаж гальванических линий и ванн — полный цикл от эскиза до ввода в эксплуатацию!"
      heroImage="/images/emkosti-collage-hero.png"
      heroImageAlt="Гальваническое оборудование"
      stats={stats}
      ctaTitle="Готовы заказать гальваническое оборудование?"
      ctaSubtitle="Оставьте заявку — расчёт в течение 24 часов."
    >
      <FeatureChecklist title="Почему выбирают нас" items={whyUs} />

      <section className="mb-10">
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Области применения</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {applications.map((a, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
              <a.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{a.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Материалы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {materialCards.map((mat, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground mb-2">{mat.name}</p>
                <ul className="space-y-1">
                  {mat.specs.map((s, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды оборудования</h2>
        <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
          {modifications.map((mod) => (
            <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-border bg-card px-4">
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">{mod.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1.5 pb-2">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <AdvantagesGrid items={advantages} />

      {category && (
        <ProductGrid
          title="Каталог гальванического оборудования"
          catIndex={1}
          subcategories={category.subcategories}
          onSelect={setSelectedSubId}
        />
      )}

      <FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default GalvanikaPage;
