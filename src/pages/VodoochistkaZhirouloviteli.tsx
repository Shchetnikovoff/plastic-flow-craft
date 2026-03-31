import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import {
  ProductGrid,
  AdvantagesGrid,
  DescriptionBlock,
  FeatureChecklist,
  FAQSection,
  DarkInfoBlock,
} from "@/components/corporate/sections";
import {
  Droplets, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Utensils, Building2, Beef, Warehouse,
} from "lucide-react";

/* ── static data ── */

const whyUs = [
  "Защита канализации от жировых отложений и засоров",
  "Соответствие требованиям СанПиН и нормам сброса",
  "Наземная и подземная установка",
  "Корпус из листового полипропилена — устойчив к агрессивным средам",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
];

const purposeItems = [
  { icon: Utensils, name: "Рестораны, кафе и столовые" },
  { icon: Factory, name: "Пищевые производства" },
  { icon: Beef, name: "Мясоперерабатывающие комбинаты" },
  { icon: Building2, name: "Гостиницы и санатории" },
  { icon: Warehouse, name: "Фабрики-кухни и кейтеринг" },
  { icon: Droplets, name: "Молочные и масложировые заводы" },
];

const typeCards = [
  {
    name: "Подземные вертикальные",
    desc: "Цилиндрический корпус для заглублённого монтажа. Минимальная занимаемая площадь.",
    image: "/images/zhu-pv-hero-ral7032.jpg",
    href: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye",
  },
  {
    name: "Наземные вертикальные",
    desc: "Устанавливаются на ровную площадку внутри помещения. Удобный доступ ко всем узлам.",
    image: "/images/zhu-vertical-ral.jpg",
    href: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye",
  },
  {
    name: "Горизонтальные",
    desc: "Увеличенная зона отстаивания для больших объёмов стоков. Производительность до 25 л/с.",
    image: "/images/zhu-g-hero-ral7032.jpg",
    href: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye",
  },
  {
    name: "Прямоугольные наземные",
    desc: "Корпус прямоугольного сечения из листового ПП. Оптимальны для ограниченных пространств.",
    image: "/images/zhu-p-hero-ral7032.jpg",
    href: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye",
  },
];

const optionsList = [
  "Дренажный насос для откачки осадка",
  "Датчик уровня жира с сигнализацией",
  "Лестница для обслуживания (подземные модели)",
  "Удлинённая горловина для заглублённого монтажа",
  "Утеплённый корпус для эксплуатации при низких температурах",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальный подбор", text: "Рассчитаем производительность под ваш объект и тип стоков." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Гидравлические испытания каждого изделия перед отгрузкой." },
  { icon: Clock, title: "Оперативность", text: "Изготовление — 10–20 рабочих дней, монтаж — 1–3 дня." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: Truck, title: "Доставка", text: "Доставка по всей России. Упаковка для безопасной транспортировки." },
  { icon: FlaskConical, title: "Документация", text: "Паспорт изделия, сертификаты соответствия, инструкция по эксплуатации." },
];

const faqItems = [
  { q: "Какие типы жироуловителей вы производите?", a: "Подземные вертикальные, наземные вертикальные, горизонтальные и прямоугольные наземные. Каждый тип оптимизирован под конкретные условия монтажа и объёмы стоков." },
  { q: "Какой срок изготовления?", a: "Стандартные модели — от 10 рабочих дней. Нестандартные модификации — от 20 рабочих дней в зависимости от размеров и комплектации." },
  { q: "Есть ли гарантия?", a: "Да, гарантия 5 лет на корпус. Срок службы — от 30 лет при соблюдении условий эксплуатации." },
  { q: "Из какого материала изготовлен корпус?", a: "Листовой полипропилен (PP) — химически стойкий, прочный, устойчивый к агрессивным средам. По запросу — полиэтилен (PE)." },
  { q: "Можно ли установить под землёй?", a: "Да, подземные вертикальные модели специально разработаны для заглублённого монтажа. Монтаж на бетонное основание с обсыпкой пескоцементной смесью." },
];

/* ── component ── */

export default function VodoochistkaZhirouloviteli() {
  return (
    <CorporatePageShell
      catalogTabs="vodoochistka"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Водоочистка", href: "/catalog/vodoochistka" },
        { label: "Жироуловители промышленные" },
      ]}
      title="Промышленные"
      accentWord="жироуловители"
      subtitle="Эффективное удаление жиров, масел и нефтепродуктов из сточных вод предприятий общественного питания и пищевой промышленности."
      badge="Производство под ключ"
      heroImage="/images/vodoochistka-collage-hero.png"
      stats={[
        { value: "ФФУ / ЛО / ЛОС", label: "типы" },
        { value: "PP / PE", label: "материалы" },
        { value: "от 14 дней", label: "сроки" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{
        title: "Промышленные жироуловители",
        description: "Промышленные жироуловители из полипропилена — подземные, наземные, горизонтальные, прямоугольные. Гарантия 5 лет. Производство, доставка, монтаж.",
        keywords: "жироуловитель, промышленный жироуловитель, очистка стоков, жироловка, полипропилен, водоочистка",
      }}
    >
      {/* Product types */}
      <ProductGrid
        title="Виды жироуловителей"
        subtitle="Выберите тип конструкции под ваши условия монтажа"
        items={typeCards}
        columns={2}
      />

      {/* Why us + Applications */}
      <DescriptionBlock
        title="Почему выбирают наши жироуловители"
        subtitle="Надёжная защита канализации с гарантией 5 лет"
        features={whyUs}
        applicationsTitle="Назначение и области применения"
        applications={purposeItems}
      />

      {/* How it works */}
      <DarkInfoBlock
        title="Принцип работы"
        text="Жиросодержащие сточные воды поступают в приёмную камеру, где происходит гравитационное разделение: жиры и масла всплывают, тяжёлые частицы оседают. Очищенная вода забирается из средней зоны и направляется в канализацию."
        highlights={[
          { value: "1", label: "Приём стоков" },
          { value: "2", label: "Гравитационное разделение" },
          { value: "3", label: "Накопление жира" },
          { value: "4", label: "Отвод чистой воды" },
        ]}
      />

      {/* Options */}
      <FeatureChecklist
        title="Дополнительные опции"
        items={optionsList}
        columns={2}
      />

      {/* Partnership advantages */}
      <AdvantagesGrid
        title="Преимущества сотрудничества"
        items={partnershipAdvantages}
      />

      {/* FAQ */}
      <FAQSection items={faqItems} />
    </CorporatePageShell>
  );
}
