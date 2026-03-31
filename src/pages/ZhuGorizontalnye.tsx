import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { SpecTable, FeatureChecklist, FAQSection } from "@/components/corporate/sections";

/* ── static data ── */

const models = [
  { article: "СЗПК.ЖУГ.1.ПП", name: "ЖУГ-1", throughput: "1", peakDischarge: "500", dimensions: "Ø800×L1200" },
  { article: "СЗПК.ЖУГ.2.ПП", name: "ЖУГ-2", throughput: "2", peakDischarge: "1000", dimensions: "Ø1000×L1500" },
  { article: "СЗПК.ЖУГ.3.ПП", name: "ЖУГ-3", throughput: "3", peakDischarge: "1500", dimensions: "Ø1000×L2000" },
  { article: "СЗПК.ЖУГ.4.ПП", name: "ЖУГ-4", throughput: "4", peakDischarge: "2000", dimensions: "Ø1200×L2000" },
  { article: "СЗПК.ЖУГ.5.ПП", name: "ЖУГ-5", throughput: "5", peakDischarge: "2500", dimensions: "Ø1200×L2400" },
  { article: "СЗПК.ЖУГ.6.ПП", name: "ЖУГ-6", throughput: "6", peakDischarge: "3000", dimensions: "Ø1280×L2600" },
  { article: "СЗПК.ЖУГ.7.ПП", name: "ЖУГ-7", throughput: "7", peakDischarge: "3500", dimensions: "Ø1280×L2900" },
  { article: "СЗПК.ЖУГ.8.ПП", name: "ЖУГ-8", throughput: "8", peakDischarge: "4000", dimensions: "Ø1280×L3300" },
  { article: "СЗПК.ЖУГ.9.ПП", name: "ЖУГ-9", throughput: "9", peakDischarge: "4500", dimensions: "Ø1280×L3750" },
  { article: "СЗПК.ЖУГ.10.ПП", name: "ЖУГ-10", throughput: "10", peakDischarge: "5000", dimensions: "Ø1400×L3500" },
  { article: "СЗПК.ЖУГ.15.ПП", name: "ЖУГ-15", throughput: "15", peakDischarge: "7500", dimensions: "Ø1600×L3900" },
  { article: "СЗПК.ЖУГ.20.ПП", name: "ЖУГ-20", throughput: "20", peakDischarge: "10000", dimensions: "Ø1600×L5100" },
  { article: "СЗПК.ЖУГ.25.ПП", name: "ЖУГ-25", throughput: "25", peakDischarge: "12500", dimensions: "Ø1600×L6300" },
];

const optionsList = [
  "Дренажный насос для откачки осадка",
  "Датчик уровня жира с сигнализацией",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
  "Утеплённый корпус для эксплуатации при низких температурах",
  "Лестница для обслуживания (подземные модели)",
];

const faqItems = [
  { q: "Какие типы жироуловителей?", a: "Подземные вертикальные, наземные вертикальные, горизонтальные, прямоугольные." },
  { q: "Из каких материалов?", a: "PP и PE — химически стойкие." },
  { q: "Сроки?", a: "14–21 рабочий день." },
  { q: "Доставка?", a: "По всей РФ." },
  { q: "Гарантия?", a: "5 лет." },
];

const tableHeaders = ["Артикул", "Модель", "Произв., л/с", "Пик. сброс, л", "Габариты, мм"];
const tableRows = models.map((m) => [m.article, m.name, m.throughput, m.peakDischarge, m.dimensions]);

/* ── component ── */

const ZhuGorizontalnye = () => {
  return (
    <CorporatePageShell
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Водоочистка", href: "/catalog/vodoochistka" },
        { label: "Жироуловители", href: "/catalog/vodoochistka/zhirouloviteli" },
        { label: "Горизонтальные" },
      ]}
      title="Горизонтальные жироуловители"
      subtitle="Увеличенная зона отстаивания для больших объёмов стоков. Подземное исполнение. Производительность до 25 л/с."
      heroImage="/images/vodoochistka-collage-hero.png"
      stats={[
        { value: "Жироуловители", label: "тип оборудования" },
        { value: "PP / PE", label: "материалы" },
        { value: "от 14 дней", label: "сроки" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{
        title: "Горизонтальные жироуловители",
        description: "Горизонтальные жироуловители из ПП для общепита.",
        keywords: "жироуловитель горизонтальный, СЗПК",
      }}
    >
      <SpecTable
        title="Модельный ряд"
        subtitle="Горизонтальные жироуловители производительностью от 1 до 25 л/с"
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

export default ZhuGorizontalnye;
