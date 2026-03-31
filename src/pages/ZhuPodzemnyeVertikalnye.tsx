import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { SpecTable, FeatureChecklist, FAQSection } from "@/components/corporate/sections";

/* ── static data ── */

const models = [
  { article: "СЗПК.ЖУ.1.ПП", name: "ЖУ-1", throughput: "1", peakDischarge: "500", diameter: "800", height: "1300" },
  { article: "СЗПК.ЖУ.2.ПП", name: "ЖУ-2", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1600" },
  { article: "СЗПК.ЖУ.3.ПП", name: "ЖУ-3", throughput: "3", peakDischarge: "1500", diameter: "1200", height: "1500" },
  { article: "СЗПК.ЖУ.4.ПП", name: "ЖУ-4", throughput: "4", peakDischarge: "2000", diameter: "1350", height: "1550" },
  { article: "СЗПК.ЖУ.5.ПП", name: "ЖУ-5", throughput: "5", peakDischarge: "2500", diameter: "1350", height: "2000" },
  { article: "СЗПК.ЖУ.6.ПП", name: "ЖУ-6", throughput: "6", peakDischarge: "3000", diameter: "1450", height: "2000" },
  { article: "СЗПК.ЖУ.7.ПП", name: "ЖУ-7", throughput: "7", peakDischarge: "3500", diameter: "1550", height: "2000" },
  { article: "СЗПК.ЖУ.8.ПП", name: "ЖУ-8", throughput: "8", peakDischarge: "4000", diameter: "1650", height: "2000" },
  { article: "СЗПК.ЖУ.9.ПП", name: "ЖУ-9", throughput: "9", peakDischarge: "4500", diameter: "1750", height: "2000" },
  { article: "СЗПК.ЖУ.10.ПП", name: "ЖУ-10", throughput: "10", peakDischarge: "5000", diameter: "1850", height: "2000" },
  { article: "СЗПК.ЖУ.15.ПП", name: "ЖУ-15", throughput: "15", peakDischarge: "7500", diameter: "2200", height: "2000" },
];

const optionsList = [
  "Надставка технического колодца (10–50 см)",
  "Лестница для обслуживания",
  "Крышка жироуловителя промышленного (чугун / ПП)",
  "Дозатор биопрепаратов",
  "Сигнализатор уровня жира",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
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

const ZhuPodzemnyeVertikalnye = () => {
  return (
    <CorporatePageShell
      catalogTabs="vodoochistka"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Водоочистка", href: "/catalog/vodoochistka" },
        { label: "Жироуловители", href: "/catalog/vodoochistka/zhirouloviteli" },
        { label: "Подземные вертикальные" },
      ]}
      title="Подземные вертикальные жироуловители"
      subtitle="Цилиндрический корпус для заглублённого монтажа. Минимальная занимаемая площадь, обслуживание через горловину технического колодца."
      heroImage="/images/vodoochistka-collage-hero.png"
      stats={[
        { value: "Жироуловители", label: "тип оборудования" },
        { value: "PP / PE", label: "материалы" },
        { value: "от 14 дней", label: "сроки" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{
        title: "Подземные вертикальные жироуловители",
        description: "Подземные вертикальные жироуловители из ПП.",
        keywords: "жироуловитель подземный, СЗПК",
      }}
    >
      <SpecTable
        title="Модельный ряд"
        subtitle="Подземные вертикальные жироуловители производительностью от 1 до 15 л/с"
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

export default ZhuPodzemnyeVertikalnye;
