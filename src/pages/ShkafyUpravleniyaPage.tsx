import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, FeatureChecklist, FAQSection } from "@/components/corporate/sections";
import { Wrench, ShieldCheck, Clock, Truck, Zap, Settings, Shield } from "lucide-react";

const stats = [
  { value: "PP / PE / PVC", label: "материалы" },
  { value: "по ТЗ", label: "проектирование" },
  { value: "от 14 дней", label: "сроки" },
  { value: "5 лет", label: "гарантия" },
];

const whyUs = [
  "Собственное производство шкафов управления для промышленных объектов",
  "Проектирование автоматики под конкретные технологические процессы",
  "Использование комплектующих ведущих производителей (Siemens, ABB, Schneider)",
  "Гарантия 2 года на шкафы управления",
  "Полный цикл: проектирование, сборка, программирование, пусконаладка",
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Спроектируем систему управления под ваш процесс." },
  { icon: Zap, title: "Надёжные компоненты", text: "Siemens, ABB, Schneider Electric, ОВЕН." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Полное тестирование перед отгрузкой." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Монтаж, программирование, пусконаладка." },
  { icon: Shield, title: "Документация", text: "Схемы, паспорта, инструкции." },
];

const faq = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Сроки?", a: "14–30 рабочих дней." },
  { q: "Проектируете под заказ?", a: "Да, по ТЗ или с нуля." },
  { q: "Доставка?", a: "По всей РФ." },
  { q: "Гарантия?", a: "5 лет." },
];

const ShkafyUpravleniyaPage = () => {
  return (
    <CorporatePageShell
      catalogTabs="shkafy-upravleniya"
      title="Шкафы управления"
      subtitle="Автоматизация гальванических линий, очистных сооружений и насосных станций — надёжное управление технологическими процессами!"
      heroImage="/images/emkosti-collage-hero.png"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Шкафы управления" },
      ]}
      stats={stats}
    >
      <FeatureChecklist items={whyUs} />
      <AdvantagesGrid items={advantages} />
<FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default ShkafyUpravleniyaPage;
