import { useState } from "react";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { ProductGrid, AdvantagesGrid, FeatureChecklist, FAQSection } from "@/components/corporate/sections";
import { findCategory } from "@/data/catalog";
import { Wrench, ShieldCheck, Clock, Truck, FlaskConical, Droplets, Factory, Settings, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const stats = [
  { value: "SVT / ПП", label: "типы корпусов" },
  { value: "PP / PE", label: "материалы" },
  { value: "от 21 дня", label: "сроки" },
  { value: "5 лет", label: "гарантия" },
];

const whyUs = [
  "Собственное производство КНС из полипропилена и стеклопластика (SVT)",
  "Проектирование под конкретные условия эксплуатации и грунты",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, пусконаладка",
  "Соответствие ГОСТ и СП на канализационные насосные станции",
];

const applications = [
  { icon: Droplets, text: "Перекачка хозяйственно-бытовых сточных вод" },
  { icon: Factory, text: "Канализация промышленных предприятий" },
  { icon: Settings, text: "Ливневая канализация и дренаж" },
  { icon: Shield, text: "Водоотведение коттеджных посёлков" },
  { icon: FlaskConical, text: "Перекачка агрессивных стоков" },
  { icon: Wrench, text: "Системы водоснабжения и повышения давления" },
];

const modifications = [
  { title: "КНС в корпусе SVT (стеклопластик)", items: ["Высокая прочность и коррозионная стойкость", "Подземное размещение", "Диаметр от 800 мм до 3000 мм", "Глубина заложения до 10 м"] },
  { title: "КНС в корпусе из полипропилена", items: ["Химическая стойкость к агрессивным стокам", "Сварная конструкция с рёбрами жёсткости", "Диаметр от 800 мм до 2500 мм", "Облегчённый монтаж"] },
  { title: "Комплектация", items: ["Погружные насосы (Grundfos, Wilo, KSB)", "Запорная арматура и обратные клапаны", "Направляющие и цепные системы", "Шкаф управления с датчиками уровня", "Вентиляция и люки доступа"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Спроектируем КНС под ваши расходы и условия." },
  { icon: FlaskConical, title: "Точный расчёт", text: "Гидравлический расчёт, подбор насосов и автоматики." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Заводские испытания на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Монтаж, пусконаладка, гарантийное обслуживание." },
  { icon: Shield, title: "Документация", text: "Паспорта, проектная документация, сертификаты." },
];

const faq = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по рабочей среде и температуре." },
  { q: "Какие сроки изготовления?", a: "14–30 рабочих дней в зависимости от сложности." },
  { q: "Проектируете под заказ?", a: "Да, по вашим ТЗ или с нуля." },
  { q: "Доставка и монтаж?", a: "Спецтранспорт по всей РФ, шеф-монтаж на объекте." },
  { q: "Какая гарантия?", a: "5 лет на всё оборудование." },
];

const KnsPage = () => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("kns");

  return (
    <CorporatePageShell
      breadcrumbs={[
        { label: "Каталог", to: "/catalog" },
        { label: "КНС" },
      ]}
      title="Канализационные насосные станции (КНС)"
      subtitle="КНС из полипропилена и стеклопластика — надёжное водоотведение для любых объектов!"
      heroImage="/images/kns-svt-cutaway.jpg"
      heroImageAlt="КНС канализационная насосная станция"
      stats={stats}
      ctaTitle="Готовы заказать КНС?"
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
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды КНС</h2>
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
          title="Каталог КНС"
          catIndex={9}
          subcategories={category.subcategories}
          onSelect={setSelectedSubId}
        />
      )}

      <FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default KnsPage;
