import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { ProductGrid, FAQSection } from "@/components/corporate/sections";
import { TankCalculator } from "@/components/configurator";

const defaultModels = [
  { art: "1000", vol: 1000, d: 1050, h: 1250 },
  { art: "2000", vol: 2000, d: 1250, h: 1700 },
  { art: "3000", vol: 3000, d: 1400, h: 2050 },
  { art: "5000", vol: 5000, d: 1600, h: 2600 },
  { art: "10000", vol: 10000, d: 2000, h: 3300 },
  { art: "15000", vol: 15000, d: 2400, h: 3450 },
  { art: "20000", vol: 20000, d: 2600, h: 3850 },
  { art: "25000", vol: 25000, d: 2800, h: 4200 },
  { art: "30000", vol: 30000, d: 3000, h: 4400 },
  { art: "40000", vol: 40000, d: 3200, h: 5100 },
  { art: "50000", vol: 50000, d: 3500, h: 5400 },
];

const subtypes = [
  {
    id: "ploskaya",
    name: "С плоской крышей и плоским дном",
    image: "/images/evpp-flat-hero.png",
    path: "/catalog/emkosti/vertikalnye/ploskaya",
    description: "Стандартная форма. Полностью закрытая ёмкость с приваренной крышей и люком Ø800 мм.",
  },
  {
    id: "naklonnoe-dno",
    name: "С наклонным дном",
    image: "/images/evpp-sloped-hero.png",
    path: "/catalog/emkosti/vertikalnye/naklonnoe-dno",
    description: "Ёмкость с наклонным дном для полного слива жидкости. Люк Ø800 мм.",
  },
  {
    id: "konicheskaya-krysha",
    name: "С конической крышей",
    image: "/images/evpp-conical-hero.png",
    path: "/catalog/emkosti/vertikalnye/konicheskaya-krysha",
    description: "Коническая крыша обеспечивает сток конденсата и защиту от осадков.",
  },
  {
    id: "konusnoe-dno",
    name: "С конусным дном",
    image: "/images/evpp-conusdno-hero.png",
    path: "/catalog/emkosti/vertikalnye/konusnoe-dno",
    description: "Конусное дно для сбора осадка и полного слива жидкости. Опорная рама.",
  },
];

const emkostiStats = [
  { value: "50 л — 300 м³", label: "диапазон объёмов" },
  { value: "PP / PE / PVC", label: "материалы" },
  { value: "от 10 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqEmkosti = [
  { q: "Из каких материалов изготавливаются ёмкости?", a: "Листовой полипропилен (PP-H, PP-C, PPs), полиэтилен (PE 100), ПВХ (PVC). Подбор — по рабочей среде, температуре и концентрации." },
  { q: "Какой диапазон объёмов?", a: "От 50 литров до 300 м³. Нестандартные размеры — по ТЗ заказчика." },
  { q: "Какие сроки изготовления?", a: "Стандартные ёмкости — 10–21 рабочий день. Нестандартные — от 15 дней." },
  { q: "Есть ли доставка?", a: "Да, доставка спецтранспортом по всей РФ. Производство — Ленинградская область." },
  { q: "Можно заказать по своим чертежам?", a: "Да, изготовим по вашим чертежам и ТЗ, а также спроектируем с нуля под ваши задачи." },
];

const EmkostiVertikalnye = () => {
  return (
    <CorporatePageShell
      catalogTabs="emkosti"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Ёмкости", href: "/catalog/emkosti" },
        { label: "Цилиндрические вертикальные" },
      ]}
      title="Ёмкости цилиндрические"
      accentWord="вертикальные"
      subtitle="Вертикальные цилиндрические ёмкости из листового полипропилена и полиэтилена для хранения воды, химических реагентов и технических жидкостей. Объём от 100 до 50 000 литров."
      badge="Раздел 6.1"
      heroImage="/images/emkosti-collage-hero.png"
      stats={emkostiStats}
      seo={{
        title: "Ёмкости цилиндрические вертикальные из полипропилена | СЗПК Пласт-Металл ПРО",
        description: "Вертикальные цилиндрические ёмкости из полипропилена и полиэтилена. Объём от 100 до 50 000 литров. 4 типа конструкции.",
        keywords: "вертикальные ёмкости, цилиндрические ёмкости, ёмкости полипропилен, ЕВПП",
      }}
    >
      {/* Subtypes grid */}
      <ProductGrid
        title="Типы вертикальных ёмкостей"
        subtitle="Выберите конструкцию для вашей задачи"
        items={subtypes.map((sub) => ({
          name: sub.name,
          desc: sub.description,
          image: sub.image,
          href: sub.path,
        }))}
        columns={2}
      />

      {/* Calculator */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <TankCalculator models={defaultModels} defaultType="flat" />
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqEmkosti} />
    </CorporatePageShell>
  );
};

export default EmkostiVertikalnye;
