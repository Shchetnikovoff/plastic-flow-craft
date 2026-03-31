import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import {
  AdvantagesGrid,
  SpecTable,
  FeatureChecklist,
  DarkInfoBlock,
  FAQSection,
} from "@/components/corporate/sections";
import {
  Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings,
} from "lucide-react";

/* ── static data ── */

const whyUs = [
  "Подземная установка — экономия площади на объекте",
  "Корпус из спиральновитых труб СВТ — высочайшая прочность и кольцевая жёсткость",
  "Срок службы — свыше 50 лет",
  "Изготовление по чертежам и ТЗ заказчика",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Гарантия 5 лет на все изделия",
];

const losModels = [
  { throughput: "2", diameter: "1500", length: "2600", drop: "120", pipes: "110", sorbent: "0,5" },
  { throughput: "5", diameter: "1500", length: "6500", drop: "200", pipes: "160", sorbent: "1" },
  { throughput: "10", diameter: "2000", length: "5500", drop: "200", pipes: "160", sorbent: "2" },
  { throughput: "15", diameter: "2000", length: "7400", drop: "200", pipes: "200", sorbent: "2,7" },
  { throughput: "20", diameter: "2000", length: "9000", drop: "300", pipes: "200", sorbent: "3,6" },
  { throughput: "25", diameter: "2000", length: "10000", drop: "300", pipes: "200", sorbent: "4,5" },
  { throughput: "30", diameter: "2000", length: "11500", drop: "300", pipes: "250", sorbent: "5,4" },
  { throughput: "40", diameter: "2400", length: "11000", drop: "300", pipes: "250", sorbent: "6,4" },
  { throughput: "50", diameter: "2400", length: "12200", drop: "300", pipes: "250", sorbent: "8,4" },
  { throughput: "60", diameter: "2400", length: "13000", drop: "300", pipes: "315", sorbent: "10" },
  { throughput: "70", diameter: "3000", length: "9500", drop: "400", pipes: "315", sorbent: "11,5" },
  { throughput: "80", diameter: "3000", length: "11800", drop: "400", pipes: "315", sorbent: "13,1" },
  { throughput: "90", diameter: "3000", length: "13600", drop: "400", pipes: "400", sorbent: "15,1" },
];

const peskModels = [
  { throughput: "2", diameter: "1500", length: "2600", drop: "120", pipes: "110" },
  { throughput: "5", diameter: "1500", length: "6500", drop: "200", pipes: "160" },
  { throughput: "10", diameter: "2000", length: "5500", drop: "200", pipes: "160" },
  { throughput: "15", diameter: "2000", length: "7400", drop: "200", pipes: "200" },
  { throughput: "20", diameter: "2000", length: "9000", drop: "300", pipes: "200" },
  { throughput: "25", diameter: "2000", length: "10000", drop: "300", pipes: "200" },
  { throughput: "30", diameter: "2000", length: "11500", drop: "300", pipes: "250" },
  { throughput: "40", diameter: "2400", length: "11000", drop: "300", pipes: "250" },
  { throughput: "50", diameter: "2400", length: "12200", drop: "300", pipes: "250" },
  { throughput: "60", diameter: "2400", length: "13000", drop: "300", pipes: "315" },
  { throughput: "70", diameter: "3000", length: "9500", drop: "400", pipes: "315" },
  { throughput: "80", diameter: "3000", length: "11800", drop: "400", pipes: "315" },
  { throughput: "90", diameter: "3000", length: "13600", drop: "400", pipes: "400" },
];

const neftModels = [
  { throughput: "2", diameter: "1500", length: "2600", pipes: "110" },
  { throughput: "5", diameter: "1500", length: "6500", pipes: "160" },
  { throughput: "10", diameter: "2000", length: "5500", pipes: "160" },
  { throughput: "15", diameter: "2000", length: "7400", pipes: "200" },
  { throughput: "20", diameter: "2000", length: "9000", pipes: "200" },
  { throughput: "25", diameter: "2000", length: "10000", pipes: "200" },
  { throughput: "30", diameter: "2000", length: "11500", pipes: "250" },
  { throughput: "40", diameter: "2400", length: "11000", pipes: "250" },
  { throughput: "50", diameter: "2400", length: "12200", pipes: "250" },
  { throughput: "60", diameter: "2400", length: "13000", pipes: "315" },
  { throughput: "70", diameter: "3000", length: "9500", pipes: "315" },
  { throughput: "80", diameter: "3000", length: "11800", pipes: "315" },
  { throughput: "90", diameter: "3000", length: "13600", pipes: "400" },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальное проектирование", text: "Разработка ЛОС под параметры объекта: состав стоков, производительность, глубина залегания." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Гидравлические испытания каждого изделия. Корпус из СВТ — кольцевая жёсткость SN8–SN16." },
  { icon: Clock, title: "Оперативность", text: "Изготовление — 15–25 рабочих дней. Монтаж — 2–5 дней." },
  { icon: Wrench, title: "Монтаж и сервис", text: "Шеф-монтаж, пусконаладка, обучение персонала, гарантийное обслуживание." },
  { icon: Truck, title: "Доставка по РФ", text: "Доставка спецтранспортом по всей России. Надёжная упаковка." },
  { icon: FlaskConical, title: "Документация", text: "Паспорт изделия, проект, сертификаты соответствия, инструкция по эксплуатации." },
];

const faqItems = [
  { q: "Какие системы водоочистки вы производите?", a: "ФФУ, ламельные отстойники, станции дозирования, жироуловители, ЛОС, мешочные обезвоживатели." },
  { q: "Из каких материалов?", a: "Полипропилен (PP) и полиэтилен (PE) — химически стойкие к агрессивным средам." },
  { q: "Какие сроки?", a: "14–30 рабочих дней в зависимости от сложности." },
  { q: "Проектируете под заказ?", a: "Да, проектирование с нуля под параметры вашего объекта." },
  { q: "Входит ли монтаж?", a: "Да, шеф-монтаж и пусконаладка на объекте заказчика." },
];

/* ── component ── */

const VodoochistkaLos = () => (
  <CorporatePageShell
      catalogTabs="vodoochistka"
    breadcrumbs={[
      { label: "Каталог", href: "/catalog" },
      { label: "Водоочистка", href: "/catalog/vodoochistka" },
      { label: "ЛОС — локальные очистные сооружения" },
    ]}
    title="Локальные очистные"
    accentWord="сооружения (ЛОС)"
    subtitle="Глубокая очистка хозяйственно-бытовых, ливневых и промышленных сточных вод. Корпус из спиральновитых труб СВТ для подземной установки."
    badge="Подземная установка"
    heroImage="/images/vodoochistka-collage-hero.png"
    stats={[
      { value: "ФФУ / ЛО / ЛОС", label: "типы оборудования" },
      { value: "PP / PE", label: "материалы" },
      { value: "от 14 дней", label: "срок изготовления" },
      { value: "5 лет", label: "гарантия" },
    ]}
    seo={{
      title: "ЛОС — локальные очистные сооружения — СЗПК Пласт-Металл ПРО",
      description: "Производство локальных очистных сооружений из СВТ для подземной установки. ЛОС, пескоуловители, нефтеуловители. Производительность 2–90 л/с.",
      keywords: "ЛОС, локальные очистные сооружения, пескоуловитель, нефтеуловитель, СВТ",
    }}
  >
    <DarkInfoBlock
      title="Комплексные решения очистки сточных вод"
      text="Локальные очистные сооружения (ЛОС) предназначены для глубокой очистки хозяйственно-бытовых, ливневых и производственных стоков до нормативов сброса в водоёмы рыбохозяйственного значения. В линейку входят: ЛОС (комплексная очистка), пескоуловители (удаление взвешенных частиц) и нефтеуловители (выделение нефтепродуктов)."
      highlights={[
        { value: "50+ лет", label: "срок службы" },
        { value: "SN8–SN16", label: "кольцевая жёсткость" },
        { value: "2–90 л/с", label: "производительность" },
        { value: "подземная", label: "установка" },
      ]}
    />

    <FeatureChecklist
      title="Почему выбирают наши ЛОС"
      items={whyUs}
      columns={1}
    />

    <SpecTable
      title="ЛОС — типоразмерный ряд"
      subtitle="Глубокая очистка хозяйственно-бытовых, ливневых и промышленных стоков"
      headers={["Произв., л/с", "\u00D8, мм", "Длина, мм", "Перепад, мм", "\u00D8 труб, мм", "Сорбент, м\u00B3"]}
      rows={losModels.map((m) => [m.throughput, m.diameter, m.length, m.drop, m.pipes, m.sorbent])}
    />

    <SpecTable
      title="Пескоуловитель — типоразмерный ряд"
      subtitle="Очистка поверхностных сточных вод от тонкодисперсных взвешенных частиц"
      headers={["Произв., л/с", "\u00D8, мм", "Длина, мм", "Перепад, мм", "\u00D8 труб, мм"]}
      rows={peskModels.map((m) => [m.throughput, m.diameter, m.length, m.drop, m.pipes])}
    />

    <SpecTable
      title="Нефтеуловитель — типоразмерный ряд"
      subtitle="Выделение нефтепродуктов из поверхностных и производственных стоков"
      headers={["Произв., л/с", "\u00D8, мм", "Длина, мм", "\u00D8 труб, мм"]}
      rows={neftModels.map((m) => [m.throughput, m.diameter, m.length, m.pipes])}
      caption="Возможно изготовление ЛОС по индивидуальным параметрам: производительность, глубина залегания, состав стоков."
    />

    <AdvantagesGrid
      title="Преимущества сотрудничества"
      items={partnershipAdvantages}
    />

    <FAQSection items={faqItems} />
  </CorporatePageShell>
);

export default VodoochistkaLos;
