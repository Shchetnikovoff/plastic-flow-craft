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
  "Собственное производство систем водоподготовки из химически стойких полимеров",
  "Индивидуальный подбор системы под параметры исходной воды",
  "Гарантия 5 лет, срок службы — от 25 лет",
  "Полный цикл: анализ воды, проектирование, производство, монтаж, пусконаладка",
  "Соответствие СанПиН и требованиям к питьевой и технической воде",
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Подберём систему по анализу воды и требованиям к качеству." },
  { icon: FlaskConical, title: "Анализ воды", text: "Проведём полный анализ исходной воды перед проектированием." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Гарантия соответствия очищенной воды нормативам." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка и сервисное обслуживание." },
  { icon: Shield, title: "Документация", text: "Паспорта, сертификаты, протоколы испытаний." },
];

const faq = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Сроки?", a: "14–30 рабочих дней." },
  { q: "Проектируете под заказ?", a: "Да, по ТЗ или с нуля." },
  { q: "Доставка?", a: "По всей РФ." },
  { q: "Гарантия?", a: "5 лет." },
];

const VodopodgotovkaPage = () => {
  const category = findCategory("vodopodgotovka");

  return (
    <CorporatePageShell
      title="Системы водоподготовки"
      subtitle="Обратный осмос, фильтрация и умягчение — комплексные решения для подготовки воды любого качества!"
      heroImage="/images/emkosti-collage-hero.png"
      breadcrumbLabel="Водоподготовка"
      stats={stats}
    >
      <FeatureChecklist items={whyUs} />
      <AdvantagesGrid items={advantages} />
      {category && (
        <ProductGrid
          title="Каталог оборудования водоподготовки"
          subcategories={category.subcategories}
          catIndex={3}
        />
      )}
      <FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default VodopodgotovkaPage;
