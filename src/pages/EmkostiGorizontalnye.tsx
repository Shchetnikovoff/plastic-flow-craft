import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { ProductGrid, FAQSection } from "@/components/corporate/sections";
import { HorizontalTankCalculator } from "@/components/configurator";

const subtypes = [
  {
    name: "Стандартная на низких ложементах",
    image: "/images/egts-standartnaya-1.jpg",
    href: "/catalog/emkosti/gorizontalnye/standartnaya",
    desc: "Горизонтальная цилиндрическая ёмкость стандартной формы на низких ложементах. Объём от 1 000 до 50 000 литров.",
  },
  {
    name: "Стандартная на высоких ложементах",
    image: "/images/egts-vysokie-lozhementy-1.jpg",
    href: "/catalog/emkosti/gorizontalnye/vysokie-lozhementy",
    desc: "Горизонтальная цилиндрическая ёмкость с плоской крышей и плоским дном на высоких ложементах. Объём от 1 000 до 50 000 литров.",
  },
];

const faq = [
  { q: "Из каких материалов изготавливаются ёмкости?", a: "Листовой полипропилен (PP-H, PP-C, PPs), полиэтилен (PE 100), ПВХ (PVC)." },
  { q: "Какой диапазон объёмов?", a: "От 50 литров до 300 м³. Нестандартные размеры — по ТЗ заказчика." },
  { q: "Какие сроки изготовления?", a: "Стандартные — 10–21 рабочий день. Нестандартные — от 15 дней." },
  { q: "Есть ли доставка?", a: "Да, спецтранспортом по всей РФ." },
  { q: "Можно заказать по своим чертежам?", a: "Да, изготовим по вашим чертежам и ТЗ." },
];

const EmkostiGorizontalnye = () => (
  <CorporatePageShell
    breadcrumbs={[
      { label: "Каталог", href: "/catalog" },
      { label: "Ёмкости", href: "/catalog/emkosti" },
      { label: "Цилиндрические горизонтальные" },
    ]}
    title="Ёмкости цилиндрические"
    accentWord="горизонтальные"
    subtitle="Горизонтальные цилиндрические ёмкости из листового полипропилена и полиэтилена. Применяются для хранения и транспортировки жидкостей. Оснащение люками, штуцерами, уровнемерами. Объём от 1 000 до 50 000 литров."
    heroImage="/images/emkosti-collage-hero.png"
    stats={[
      { value: "50 л — 300 м³", label: "диапазон объёмов" },
      { value: "PP / PE / PVC", label: "материалы" },
      { value: "от 10 дней", label: "срок изготовления" },
      { value: "5 лет", label: "гарантия" },
    ]}
    seo={{
      title: "Ёмкости цилиндрические горизонтальные — СЗПК Пласт-Металл ПРО",
      description: "Горизонтальные цилиндрические ёмкости из полипропилена и полиэтилена. Объём от 1 000 до 50 000 литров. Изготовление на заказ.",
      keywords: "горизонтальные ёмкости, цилиндрические ёмкости, полипропилен, полиэтилен, хранение жидкостей",
    }}
  >
    <HorizontalTankCalculator />

    <ProductGrid
      title="Типы горизонтальных ёмкостей"
      items={subtypes}
      columns={2}
    />

    <FAQSection items={faq} />
  </CorporatePageShell>
);

export default EmkostiGorizontalnye;
