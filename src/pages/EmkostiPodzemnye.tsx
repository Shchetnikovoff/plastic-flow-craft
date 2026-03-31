import { useNavigate } from "react-router-dom";
import { Settings, ShieldCheck, Clock, Truck, FlaskConical, Wrench, Droplets } from "lucide-react";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import {
  SpecTable,
  FeatureChecklist,
  AdvantagesGrid,
  ApplicationAreas,
  DarkInfoBlock,
  FAQSection,
} from "@/components/corporate/sections";
import { podzemnyeProducts } from "@/data/podzemnyeProducts";

const whyUs = [
  "Собственное производство спиральновитых конструкций",
  "Применение современных технологий сварки и герметизации",
  "Адаптация под сложные грунтовые условия и сейсмику",
  "Полный цикл услуг: проектирование, производство, доставка, монтаж, пусконаладка",
  "Гарантия 7 лет, расчётный срок службы — от 50 лет",
  "Соответствие ГОСТ, СП, СНиП и международным стандартам",
];

const applications = [
  { icon: Droplets, name: "Хранение питьевой и технической воды" },
  { icon: Droplets, name: "Приём и накопление ливневых и талых вод" },
  { icon: Droplets, name: "Сбор и хранение промышленных стоков" },
  { icon: Droplets, name: "Системы локальной канализации и септиков" },
  { icon: Droplets, name: "Хранение нефтепродуктов и ГСМ" },
  { icon: Droplets, name: "Буферные резервуары водоподготовки" },
  { icon: Droplets, name: "Дренажные системы" },
  { icon: Droplets, name: "Утилизация химически активных жидкостей" },
];

const specs = [
  { label: "Диаметр", value: "от 1 000 до 3 500 мм (и более по спецзаказу)" },
  { label: "Длина секции", value: "до 12 м (с возможностью наращивания)" },
  { label: "Рабочее давление", value: "до 0,5 МПа" },
  { label: "Температура", value: "от −50 °C до +60 °C (до +80 °C кратковр.)" },
  { label: "Кольцевая жёсткость", value: "SN2–SN16" },
  { label: "Сейсмостойкость", value: "до 9 баллов (MSK-64)" },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный проект", text: "Разработаем ёмкость под конкретные условия: тип грунта, глубину залегания, нагрузки." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проходит проверку на герметичность (вакуумный тест, опрессовка)." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 14–21 день, монтаж — 3–7 дней." },
  { icon: Truck, title: "Логистика", text: "Доставим крупногабаритные секции и смонтируем на месте." },
  { icon: FlaskConical, title: "Сервис", text: "Полный цикл: от геологического исследования до пусконаладки и обучения персонала." },
  { icon: Wrench, title: "Гарантии", text: "Сервисное обслуживание, запасные части, модернизация существующих систем." },
];

const faq = [
  { q: "Из каких материалов изготавливаются ёмкости?", a: "Листовой полипропилен (PP-H, PP-C, PPs), полиэтилен (PE 100), ПВХ (PVC)." },
  { q: "Какой диапазон объёмов?", a: "От 50 литров до 300 м³. Нестандартные размеры — по ТЗ заказчика." },
  { q: "Какие сроки изготовления?", a: "Стандартные — 10–21 рабочий день. Нестандартные — от 15 дней." },
  { q: "Есть ли доставка?", a: "Да, спецтранспортом по всей РФ." },
  { q: "Можно заказать по своим чертежам?", a: "Да, изготовим по вашим чертежам и ТЗ." },
];

const specHeaders = ["Артикул", "Объём, м³", "Ø корпуса, мм", "Длина (L), мм"];
const specRows = podzemnyeProducts.map((item) => [
  item.article,
  item.volume,
  item.diameter.toLocaleString(),
  item.length.toLocaleString(),
]);

const EmkostiPodzemnye = () => {
  const navigate = useNavigate();

  return (
    <CorporatePageShell
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Ёмкости", href: "/catalog/emkosti" },
        { label: "Подземные ёмкости" },
      ]}
      title="Промышленные подземные ёмкости"
      accentWord="из спиральновитых труб"
      subtitle="Подземные ёмкости из спиральновитых труб — надёжное решение для долгосрочного хранения жидкостей и стоков!"
      heroImage="/images/emkosti-collage-hero.png"
      stats={[
        { value: "50 л — 300 м³", label: "диапазон объёмов" },
        { value: "PP / PE / PVC", label: "материалы" },
        { value: "от 10 дней", label: "срок изготовления" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{
        title: "Подземные ёмкости из спиральновитых труб — СЗПК Пласт-Металл ПРО",
        description: "Промышленные подземные ёмкости из спиральновитых труб для водоснабжения, канализации, хранения нефтепродуктов. Проектирование, производство, монтаж.",
        keywords: "подземные ёмкости, спиральновитые трубы, резервуары, водоснабжение, канализация",
      }}
    >
      <SpecTable
        title="Типоразмерный ряд"
        subtitle="Нажмите на строку, чтобы открыть карточку товара"
        headers={specHeaders}
        rows={specRows}
      />

      <FeatureChecklist
        title="Почему выбирают нас"
        subtitle="Мы проектируем и изготавливаем промышленные подземные ёмкости из спиральновитых труб (СВП) для систем водоснабжения, канализации, ливневых стоков, хранения технической воды и нефтепродуктов."
        items={whyUs}
        columns={1}
      />

      <ApplicationAreas
        title="Назначение подземных ёмкостей"
        items={applications}
      />

      <DarkInfoBlock
        title="Технология и материалы"
        text="Спиральновитые трубы (СВП) — это гофрированные полимерные или металлополимерные конструкции, формируемые методом спиральной навивки с последующей сваркой швов."
        highlights={specs.map((s) => ({ value: s.value, label: s.label }))}
      />

      <AdvantagesGrid
        title="Преимущества сотрудничества"
        items={advantages}
      />

      <FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default EmkostiPodzemnye;
