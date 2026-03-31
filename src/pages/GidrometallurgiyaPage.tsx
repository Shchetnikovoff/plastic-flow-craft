import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { ProductGrid, AdvantagesGrid, FeatureChecklist, FAQSection } from "@/components/corporate/sections";
import { findCategory } from "@/data/catalog";
import { Wrench, ShieldCheck, Clock, Truck, FlaskConical, Settings, Shield } from "lucide-react";

const stats = [
  { value: "PP / PE / PVC", label: "материалы" },
  { value: "по ТЗ", label: "проектирование" },
  { value: "от 14 дней", label: "сроки" },
  { value: "5 лет", label: "гарантия" },
];

const whyUs = [
  "Собственное производство оборудования для гидрометаллургии из полимеров",
  "Химическая стойкость к кислотам, щелочам и растворителям",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Опыт реализации проектов для горнодобывающей и металлургической промышленности",
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Спроектируем оборудование под ваш технологический процесс." },
  { icon: FlaskConical, title: "Подбор материала", text: "Учтём химическую среду и температурный режим." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Проверка на герметичность и химическую стойкость." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 21–45 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ, включая удалённые объекты." },
  { icon: Wrench, title: "Сервис", text: "Монтаж, пусконаладка, обучение персонала." },
  { icon: Shield, title: "Документация", text: "Паспорта, сертификаты, инструкции." },
];

const faq = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Сроки?", a: "14–30 рабочих дней." },
  { q: "Проектируете под заказ?", a: "Да, по ТЗ или с нуля." },
  { q: "Доставка?", a: "По всей РФ." },
  { q: "Гарантия?", a: "5 лет." },
];

const GidrometallurgiyaPage = () => {
  const category = findCategory("gidrometallurgiya");

  return (
    <CorporatePageShell
      catalogTabs="gidrometallurgiya"
      title="Оборудование для гидрометаллургии"
      subtitle="Реакторы, нутч-фильтры, установки выщелачивания и сорбции — полимерное оборудование для извлечения металлов!"
      heroImage="/images/emkosti-collage-hero.png"
      breadcrumbLabel="Гидрометаллургия"
      stats={stats}
    >
      <FeatureChecklist items={whyUs} />
      <AdvantagesGrid items={advantages} />
      {category && (
        <ProductGrid
          title="Каталог оборудования"
          subcategories={category.subcategories}
          catIndex={8}
        />
      )}
      <FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default GidrometallurgiyaPage;
