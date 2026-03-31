import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { SpecTable, FeatureChecklist, FAQSection } from "@/components/corporate/sections";

/* ── static data ── */

const models = [
  { article: "СЗПК.ЖУП.1.ПП", name: "ЖУП-1", throughput: "1", peakDischarge: "500", dimensions: "1050×750×1120" },
  { article: "СЗПК.ЖУП.2.ПП", name: "ЖУП-2", throughput: "2", peakDischarge: "1000", dimensions: "1400×850×1320" },
  { article: "СЗПК.ЖУП.3.ПП", name: "ЖУП-3", throughput: "3", peakDischarge: "1500", dimensions: "1500×1000×1320" },
  { article: "СЗПК.ЖУП.4.ПП", name: "ЖУП-4", throughput: "4", peakDischarge: "2000", dimensions: "1650×1000×1500" },
  { article: "СЗПК.ЖУП.5.ПП", name: "ЖУП-5", throughput: "5", peakDischarge: "2500", dimensions: "1650×1200×1520" },
  { article: "СЗПК.ЖУП.6.ПП", name: "ЖУП-6", throughput: "6", peakDischarge: "3000", dimensions: "1750×1250×1670" },
  { article: "СЗПК.ЖУП.7.ПП", name: "ЖУП-7", throughput: "7", peakDischarge: "3500", dimensions: "2000×1300×1670" },
  { article: "СЗПК.ЖУП.8.ПП", name: "ЖУП-8", throughput: "8", peakDischarge: "4000", dimensions: "2000×1500×1670" },
  { article: "СЗПК.ЖУП.9.ПП", name: "ЖУП-9", throughput: "9", peakDischarge: "4500", dimensions: "2300×1500×1670" },
  { article: "СЗПК.ЖУП.10.ПП", name: "ЖУП-10", throughput: "10", peakDischarge: "5000", dimensions: "2550×1500×1670" },
  { article: "СЗПК.ЖУП.15.ПП", name: "ЖУП-15", throughput: "15", peakDischarge: "7500", dimensions: "2800×1500×2020" },
  { article: "СЗПК.ЖУП.20.ПП", name: "ЖУП-20", throughput: "20", peakDischarge: "10000", dimensions: "3500×1600×2020" },
  { article: "СЗПК.ЖУП.25.ПП", name: "ЖУП-25", throughput: "25", peakDischarge: "12500", dimensions: "4000×1650×2120" },
];

const optionsList = [
  "Откидная крышка для обслуживания",
  "Датчик уровня жира с сигнализацией",
  "Дренажный насос для откачки осадка",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
  "Рёбра жёсткости для повышенных нагрузок",
];

const faqItems = [
  { q: "Какие типы жироуловителей?", a: "Подземные вертикальные, наземные вертикальные, горизонтальные, прямоугольные." },
  { q: "Из каких материалов?", a: "PP и PE — химически стойкие." },
  { q: "Сроки?", a: "14–21 рабочий день." },
  { q: "Доставка?", a: "По всей РФ." },
  { q: "Гарантия?", a: "5 лет." },
];

const tableHeaders = ["Артикул", "Модель", "Произв., л/с", "Пиковый сброс, л", "Габариты (Д×Ш×В), мм"];
const tableRows = models.map((m) => [m.article, m.name, m.throughput, m.peakDischarge, m.dimensions]);

/* ── component ── */

const ZhuPryamougolnye = () => {
  return (
    <CorporatePageShell
      catalogTabs="vodoochistka"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Водоочистка", href: "/catalog/vodoochistka" },
        { label: "Жироуловители", href: "/catalog/vodoochistka/zhirouloviteli" },
        { label: "Прямоугольные наземные" },
      ]}
      title="Прямоугольные наземные жироуловители"
      subtitle="Корпус прямоугольного сечения из листового ПП с рёбрами жёсткости. Оптимальны для встраивания в ограниченные пространства технических помещений."
      heroImage="/images/vodoochistka-collage-hero.png"
      stats={[
        { value: "Жироуловители", label: "тип оборудования" },
        { value: "PP / PE", label: "материалы" },
        { value: "от 14 дней", label: "сроки" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{
        title: "Прямоугольные наземные жироуловители",
        description: "Прямоугольные жироуловители из ПП.",
        keywords: "жироуловитель прямоугольный, СЗПК",
      }}
    >
      <SpecTable
        title="Модельный ряд"
        subtitle="Прямоугольные жироуловители производительностью от 1 до 25 л/с"
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

export default ZhuPryamougolnye;
