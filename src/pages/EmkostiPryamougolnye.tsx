import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, ApplicationAreas, FeatureChecklist, DarkInfoBlock, FAQSection } from "@/components/corporate/sections";
import { Box, Wrench, ShieldCheck, Clock, Truck, Beaker, Settings } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const whyUs = [
  "Собственное производство с применением экструзионной сварки",
  "Изготовление по типовым и индивидуальным проектам (любые размеры и комплектация)",
  "Гарантия 5 лет, срок службы — до 50 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
  "Соответствие ГОСТ, ТУ и международным стандартам качества",
  "Возможность усиления конструкции под специфические нагрузки",
];

const applications = [
  { icon: Box, name: "Хранение питьевой и технической воды, в т. ч. пожарных запасов" },
  { icon: Box, name: "Работа с агрессивными средами: кислотами, щелочами, солевыми растворами, реагентами" },
  { icon: Box, name: "Пищевая промышленность (сиропы, растительные масла, молочные продукты, закваски)" },
  { icon: Box, name: "Сбор и временное хранение промышленных стоков" },
  { icon: Box, name: "Системы водоподготовки и водоочистки" },
  { icon: Box, name: "Хранение ГСМ, отработанных масел, топлива" },
  { icon: Box, name: "Транспортировка и хранение сыпучих материалов (удобрения, зерно, строительные смеси)" },
  { icon: Box, name: "Технологические процессы в химической, фармацевтической и гальванической промышленности" },
];

const constructionFeatures = [
  "Прямоугольный корпус из листового пластика, изготовленный методом экструзионной сварки",
  "Наружная металлическая обрешётка для равномерного распределения нагрузки",
  "Толщина стенок: от 5 до 25 мм (подбирается в зависимости от назначения)",
  "Возможность установки внутренних перегородок и отсеков",
  "Компактность — эффективное использование площади за счёт прямоугольной формы",
  "Устойчивость — металлический каркас предотвращает деформацию при заполнении",
  "Ремонтопригодность — локальный ремонт без демонтажа всей системы",
  "Универсальность — подходит для наземной и частично заглублённой установки",
  "Герметичность — исключает утечки и соответствует требованиям к хранению пищевых и химических продуктов",
];

const modifications = [
  {
    title: "По объёму",
    items: [
      "Малые (от 100 л до 1 м³) — для лабораторий и локальных систем",
      "Средние (1–10 м³) — для промышленных и сельскохозяйственных задач",
      "Крупные (10–100 м³) — для масштабных производственных нужд",
    ],
  },
  {
    title: "По назначению",
    items: [
      "Пищевые (с санитарно‑эпидемиологическими заключениями)",
      "Химические (для кислот, щелочей, растворителей)",
      "Пожарные и накопительные",
      "Дренажные и канализационные",
      "Технологические (для гальванических линий, реакторов)",
      "Для сыпучих материалов (с усиленным дном и углами)",
    ],
  },
  {
    title: "По комплектации",
    items: [
      "Стандартные — с базовой обрешёткой и горловиной",
      "Усиленные — с дополнительными поясами жёсткости и рёбрами",
      "Модульные — сборные системы из нескольких соединённых резервуаров",
    ],
  },
  {
    title: "Дополнительные опции",
    items: [
      "Теплоизоляция (минеральная вата, ППУ)",
      "Нагревательные элементы (греющий кабель или рубашка)",
      "Мешалки и перемешивающие устройства",
      "Смотровые окна и уровнемеры",
      "Датчики температуры, давления, уровня",
      "Ревизионные люки и патрубки",
      "Системы автоматического контроля и дозирования",
      "Индивидуальная окраска и маркировка",
    ],
  },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Разработаем проект под ваши задачи, включая нестандартные формы и комплектацию." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проходит проверку на герметичность (вакуумный тест, опрессовка)." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 10–14 дней, монтаж — 2–5 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку по РФ, включая погрузочно‑разгрузочные работы." },
  { icon: Wrench, title: "Сервис", text: "Монтаж «под ключ», пусконаладка, гарантийное и постгарантийное обслуживание." },
  { icon: Beaker, title: "Гибкость", text: "Возможность доработки конструкции в процессе эксплуатации." },
];

const subtypes = [
  {
    id: "gorizontalnye",
    name: "Горизонтальные",
    image: "/images/emkost-pryam-goriz-card.png",
    path: "/catalog/emkosti/pryamougolnye/gorizontalnye",
    description: "Горизонтальная компоновка — длина больше высоты. Объём от 1 000 до 50 000 л.",
  },
  {
    id: "vertikalnye",
    name: "Вертикальные",
    image: "/images/emkost-pryam-vert-card.png",
    path: "/catalog/emkosti/pryamougolnye/vertikalnye",
    description: "Вертикальная компоновка — высота больше ширины. Объём от 500 до 25 000 л.",
  },
];

const faqItems = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Какой объём?", a: "50 л — 300 м³, нестандарт по ТЗ." },
  { q: "Сроки?", a: "10–21 день стандарт, от 15 нестандарт." },
  { q: "Доставка?", a: "Спецтранспорт по всей РФ." },
  { q: "По своим чертежам?", a: "Да, изготовим и спроектируем." },
];

const EmkostiPryamougolnye = () => (
  <CorporatePageShell
    breadcrumbs={[
      { label: "Каталог", href: "/catalog" },
      { label: "Ёмкости", href: "/catalog/emkosti" },
      { label: "Прямоугольные ёмкости в обрешётке" },
    ]}
    title="Прямоугольные ёмкости"
    accentWord="в обрешётке"
    subtitle="Оптимальное решение для компактного и надёжного хранения жидкостей и сыпучих материалов"
    badge="Собственное производство"
    heroImage="/images/emkosti-collage-hero.png"
    stats={[
      { value: "50 л — 300 м³", label: "диапазон объёмов" },
      { value: "PP / PE / PVC", label: "материалы" },
      { value: "от 10 дней", label: "срок изготовления" },
      { value: "5 лет", label: "гарантия" },
    ]}
    seo={{
      title: "Прямоугольные ёмкости в обрешётке из полипропилена и полиэтилена",
      description: "Производство прямоугольных ёмкостей из PP и PE в металлической обрешётке. Объём от 100 л до 100 м³. Гарантия 5 лет.",
      keywords: "прямоугольные ёмкости, ёмкости в обрешётке, полипропилен, полиэтилен, СЗПК",
    }}
  >
    {/* Subtypes grid */}
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Типы прямоугольных ёмкостей</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {subtypes.map((sub) => (
            <Link
              key={sub.id}
              to={sub.path}
              className="group relative block overflow-hidden rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center">
                <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" />
              </div>
              <div className="px-5 py-4">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">{sub.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{sub.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <DarkInfoBlock
      title="От проектирования до монтажа"
      text="Мы производим промышленные прямоугольные ёмкости из листового полипропилена (PP) и полиэтилена (ПНД/HDPE) с усилением в виде наружной металлической обрешётки. Конструкции идеально подходят для хранения химически активных веществ, воды, пищевых продуктов и сыпучих материалов в условиях ограниченного пространства."
      highlights={[
        { value: "PP / PE", label: "материалы корпуса" },
        { value: "5–25 мм", label: "толщина стенок" },
        { value: "до 50 лет", label: "срок службы" },
        { value: "ГОСТ / ТУ", label: "соответствие" },
      ]}
    />

    <FeatureChecklist title="Почему выбирают нас" items={whyUs} />

    <ApplicationAreas title="Назначение прямоугольных ёмкостей" items={applications} />

    <FeatureChecklist title="Конструкция и преимущества" items={constructionFeatures} />

    {/* Modifications accordion */}
    <section className="w-full bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Виды и модификации</h2>
        <div className="mt-10">
          <Accordion type="multiple" defaultValue={["По объёму"]} className="space-y-3">
            {modifications.map((mod) => (
              <AccordionItem key={mod.title} value={mod.title} className="rounded-xl border border-slate-200 bg-white px-5">
                <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline">
                  {mod.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>

    <AdvantagesGrid title="Преимущества сотрудничества" items={advantages} />

    <FAQSection items={faqItems} />
  </CorporatePageShell>
);

export default EmkostiPryamougolnye;
