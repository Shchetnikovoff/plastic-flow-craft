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
  "Собственное производство лабораторной мебели из полипропилена",
  "Химическая стойкость к кислотам, щелочам и растворителям",
  "Гарантия 5 лет, срок службы — от 25 лет",
  "Изготовление по типовым и индивидуальным размерам",
  "Соответствие требованиям к лабораторной мебели (ГОСТ, СанПиН)",
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Изготовим мебель по вашим размерам и планировке." },
  { icon: FlaskConical, title: "Химическая стойкость", text: "Полипропилен устойчив к агрессивным средам." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Проверка на прочность и герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 10–21 день." },
  { icon: Truck, title: "Логистика", text: "Доставка и сборка на объекте." },
  { icon: Wrench, title: "Сервис", text: "Монтаж и подключение коммуникаций." },
  { icon: Shield, title: "Документация", text: "Сертификаты и паспорта изделий." },
];

const faq = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Сроки?", a: "14–30 рабочих дней." },
  { q: "Проектируете под заказ?", a: "Да, по ТЗ или с нуля." },
  { q: "Доставка?", a: "По всей РФ." },
  { q: "Гарантия?", a: "5 лет." },
];

const LabMebelPage = () => {
  const category = findCategory("labmebel");

  return (
    <CorporatePageShell
      title="Лабораторная мебель из полипропилена"
      subtitle="Столы, шкафы, мойки и тумбы — химически стойкая мебель для лабораторий!"
      heroImage="/images/emkosti-collage-hero.png"
      breadcrumbLabel="Лабораторная мебель"
      stats={stats}
    >
      <FeatureChecklist items={whyUs} />
      <AdvantagesGrid items={advantages} />
      {category && (
        <ProductGrid
          title="Каталог лабораторной мебели"
          subcategories={category.subcategories}
          catIndex={10}
        />
      )}
      <FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default LabMebelPage;
