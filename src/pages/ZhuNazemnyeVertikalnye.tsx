import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { SpecTable, FeatureChecklist, FAQSection } from "@/components/corporate/sections";

/* ── static data ── */

const models = [
  { article: "СЗПК.ЖУН.1.ПП", name: "ЖУН-1", throughput: "1", peakDischarge: "500", diameter: "800", height: "1300" },
  { article: "СЗПК.ЖУН.2.ПП", name: "ЖУН-2", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1600" },
  { article: "СЗПК.ЖУН.3.ПП", name: "ЖУН-3", throughput: "3", peakDischarge: "1500", diameter: "1200", height: "1500" },
  { article: "СЗПК.ЖУН.4.ПП", name: "ЖУН-4", throughput: "4", peakDischarge: "2000", diameter: "1350", height: "1550" },
  { article: "СЗПК.ЖУН.5.ПП", name: "ЖУН-5", throughput: "5", peakDischarge: "2500", diameter: "1350", height: "2000" },
  { article: "СЗПК.ЖУН.6.ПП", name: "ЖУН-6", throughput: "6", peakDischarge: "3000", diameter: "1450", height: "2000" },
  { article: "СЗПК.ЖУН.7.ПП", name: "ЖУН-7", throughput: "7", peakDischarge: "3500", diameter: "1550", height: "2000" },
  { article: "СЗПК.ЖУН.8.ПП", name: "ЖУН-8", throughput: "8", peakDischarge: "4000", diameter: "1650", height: "2000" },
  { article: "СЗПК.ЖУН.9.ПП", name: "ЖУН-9", throughput: "9", peakDischarge: "4500", diameter: "1750", height: "2000" },
  { article: "СЗПК.ЖУН.10.ПП", name: "ЖУН-10", throughput: "10", peakDischarge: "5000", diameter: "1850", height: "2000" },
  { article: "СЗПК.ЖУН.15.ПП", name: "ЖУН-15", throughput: "15", peakDischarge: "7500", diameter: "2200", height: "2000" },
];

const optionsList = [
  "Откидная крышка для обслуживания",
  "Датчик уровня жира с сигнализацией",
  "Дренажный насос для откачки осадка",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
  "Утеплённый корпус для эксплуатации при низких температурах",
];

const faqItems = [
  { q: "Какие типы жироуловителей?", a: "Подземные вертикальные, наземные вертикальные, горизонтальные, прямоугольные." },
  { q: "Из каких материалов?", a: "PP и PE — химически стойкие." },
  { q: "Сроки?", a: "14–21 рабочий день." },
  { q: "Доставка?", a: "По всей РФ." },
  { q: "Гарантия?", a: "5 лет." },
];

const tableHeaders = ["Артикул", "Модель", "л/с", "Пиковый сброс, л", "Ø корпуса, мм", "Высота, мм"];
const tableRows = models.map((m) => [m.article, m.name, m.throughput, m.peakDischarge, m.diameter, m.height]);

/* ── component ── */

const ZhuNazemnyeVertikalnye = () => {
  return (
    <CorporatePageShell
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Водоочистка", href: "/catalog/vodoochistka" },
        { label: "Жироуловители", href: "/catalog/vodoochistka/zhirouloviteli" },
        { label: "Наземные вертикальные" },
      ]}
      title="Наземные вертикальные жироуловители"
      subtitle="Устанавливаются на ровную площадку внутри помещения или под навесом. Удобный доступ ко всем узлам, откидная крышка для обслуживания."
      heroImage="/images/vodoochistka-collage-hero.png"
      stats={[
        { value: "Жироуловители", label: "тип оборудования" },
        { value: "PP / PE", label: "материалы" },
        { value: "от 14 дней", label: "сроки" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{
        title: "Наземные вертикальные жироуловители",
        description: "Наземные вертикальные жироуловители из ПП.",
        keywords: "жироуловитель вертикальный наземный, СЗПК",
      }}
    >
      <SpecTable
        title="Модельный ряд"
        subtitle="Наземные вертикальные жироуловители производительностью от 1 до 15 л/с"
        headers={tableHeaders}
        rows={tableRows}
        caption="Возможно изготовление по индивидуальным размерам."
      />

      <FeatureChecklist
        title="Дополнительное оборудование"
        items={optionsList}
        columns={1}
      />

      <FAQSection items={faqItems} />
    </CorporatePageShell>
  );
};

export default ZhuNazemnyeVertikalnye;
