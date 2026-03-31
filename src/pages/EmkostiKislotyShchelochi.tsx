import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, DescriptionBlock, FeatureChecklist, DarkInfoBlock, FAQSection, SpecTable } from "@/components/corporate/sections";
import type { LucideIcon } from "lucide-react";
import {
  Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Beaker, Shield, Leaf, Zap, Building2, Atom,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const whyUs = [
  "Собственное производство с применением экструзионной сварки и современных технологий формования",
  "Подбор материала и толщины стенок под конкретную среду (с учётом концентрации, температуры и давления)",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл услуг: проектирование, производство, доставка, монтаж, пусконаладка",
  "Соответствие ГОСТ, ТУ и международным стандартам химической стойкости",
  "Наличие сертификатов на все материалы и готовые изделия",
];

const purposes = [
  { icon: FlaskConical, name: "Хранение концентрированных кислот (соляной, серной, азотной, фосфорной и др.)" },
  { icon: Beaker, name: "Работа с щелочами (гидроксид натрия, калия, кальция и др.)" },
  { icon: Truck, name: "Транспортировка агрессивных химических веществ" },
  { icon: Zap, name: "Использование в гальванических производствах" },
  { icon: Leaf, name: "Системы нейтрализации и очистки стоков" },
  { icon: Settings, name: "Приготовление и дозирование химических растворов" },
  { icon: Atom, name: "Утилизация отработанных кислот и щелочей" },
  { icon: Building2, name: "Применение в химической, фармацевтической, металлургической и других отраслях" },
];

const materialFeatures = [
  "Полипропилен (PP): от -20 до +100 °C, высокая химическая стойкость к большинству кислот и щелочей",
  "Полиэтилен (ПНД/HDPE): от -50 до +60 °C, морозостойкость, подходит для подземного размещения",
  "ПВХ (PVC): до +60 °C, повышенная устойчивость к коррозии, стойкость к гипохлориту натрия",
];

const compatibilityRows: (string | number)[][] = [
  ["Соляная кислота (до 37 %)", "Отлично", "Хорошо", "Условно"],
  ["Серная кислота (до 70 %)", "До 70 %", "Хорошо", "Не рекомендуется"],
  ["Гидроксид натрия (до 50 %)", "Отлично", "Хорошо", "Хорошо"],
  ["Азотная кислота (до 40 %)", "Ограниченно", "Не подходит", "Хорошо"],
];

const modifications = [
  {
    title: "По форме",
    items: [
      "Цилиндрические (вертикальные/горизонтальные)",
      "Прямоугольные (оптимальны для ограниченного пространства)",
      "Конические (для полного опорожнения)",
      "Нестандартные формы по чертежам заказчика",
    ],
  },
  {
    title: "По объёму",
    items: [
      "Малые (от 50 л до 1 м³) — для лабораторий и локальных систем",
      "Средние (1–10 м³) — для промышленных задач",
      "Крупные (10–50 м³ и более) — для масштабных производств",
    ],
  },
  {
    title: "По типу установки",
    items: [
      "Наземные (с каркасом и опорами)",
      "Подземные (с анкерными креплениями против всплытия)",
      "Модульные (сборные системы из нескольких резервуаров)",
    ],
  },
  {
    title: "Стандартная комплектация",
    items: [
      "Герметичные сварные швы с проверкой на вакуум и опрессовку",
      "Горловины и люки доступа",
      "Входные/выходные патрубки с фланцами",
      "Лестницы и площадки обслуживания (для крупных ёмкостей)",
      "Усиленные рёбра жёсткости (для подземного размещения)",
    ],
  },
  {
    title: "Дополнительные опции",
    items: [
      "Мешалки и перемешивающие устройства",
      "Датчики уровня и температуры",
      "Системы обогрева (греющий кабель или рубашка)",
      "Теплоизоляция (минеральная вата, ППУ)",
      "Контрольно-измерительные приборы (КИП)",
      "Запорная арматура и трубопроводы из химически стойких материалов",
      "Ревизионные колодцы и смотровые окна",
      "Футеровка для особо агрессивных сред",
      "Маркировка и защитные ограждения",
    ],
  },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Разработаем проект под ваши задачи, включая нестандартные формы и комплектацию." },
  { icon: FlaskConical, title: "Точный подбор материала", text: "Учтём концентрацию, температуру и давление рабочей среды." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проходит проверку на герметичность (вакуумный тест, опрессовка)." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 10–21 день, монтаж — 2–7 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку крупногабаритных ёмкостей по РФ с соблюдением мер безопасности." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: Shield, title: "Документация", text: "Предоставим паспорта изделий, сертификаты соответствия и инструкции по эксплуатации." },
];

const faqItems = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Какой объём?", a: "50 л — 300 м³, нестандарт по ТЗ." },
  { q: "Сроки?", a: "10–21 день стандарт, от 15 нестандарт." },
  { q: "Доставка?", a: "Спецтранспорт по всей РФ." },
  { q: "По своим чертежам?", a: "Да, изготовим и спроектируем." },
];

const EmkostiKislotyShchelochi = () => (
  <CorporatePageShell
    breadcrumbs={[
      { label: "Каталог", href: "/catalog" },
      { label: "Ёмкости", href: "/catalog/emkosti" },
      { label: "Ёмкости для кислот и щелочей" },
    ]}
    title="Химически стойкие ёмкости"
    accentWord="для кислот и щелочей"
    subtitle="Безопасность и долговечность хранения агрессивных сред"
    badge="ГОСТ / ТУ / Сертификаты"
    heroImage="/images/emkosti-collage-hero.png"
    stats={[
      { value: "50 л — 300 м³", label: "диапазон объёмов" },
      { value: "PP / PE / PVC", label: "материалы" },
      { value: "от 10 дней", label: "срок изготовления" },
      { value: "5 лет", label: "гарантия" },
    ]}
    seo={{
      title: "Ёмкости для кислот и щелочей из полипропилена, полиэтилена и ПВХ",
      description: "Производство химически стойких ёмкостей из PP, PE, PVC для хранения кислот и щелочей. Гарантия 5 лет. Индивидуальное проектирование.",
      keywords: "ёмкости для кислот, ёмкости для щелочей, химические ёмкости, полипропилен, ПВХ, СЗПК",
    }}
  >
    <DarkInfoBlock
      title="От проектирования до монтажа"
      text="Мы изготавливаем промышленные ёмкости из листового полипропилена (PP), полиэтилена (ПНД/HDPE) и ПВХ (PVC) для безопасного хранения и транспортировки концентрированных и разбавленных кислот, щелочей и других агрессивных химических сред."
      highlights={[
        { value: "PP / PE / PVC", label: "материалы корпуса" },
        { value: "от 50 л", label: "минимальный объём" },
        { value: "от 30 лет", label: "срок службы" },
        { value: "ГОСТ / ТУ", label: "соответствие" },
      ]}
    />

    <DescriptionBlock title="Почему выбирают нас" features={whyUs} applicationsTitle="Назначение ёмкостей" applications={purposes} />

    <FeatureChecklist title="Описание материалов" items={materialFeatures} columns={1} />

    <SpecTable
      title="Таблица химической совместимости"
      headers={["Вещество", "Полипропилен", "Полиэтилен", "ПВХ"]}
      rows={compatibilityRows}
    />

    {/* Modifications accordion */}
    <section className="w-full bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Виды и модификации ёмкостей</h2>
        <div className="mt-10">
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-3">
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

    <AdvantagesGrid title="Преимущества сотрудничества" items={partnershipAdvantages} />

    <FAQSection items={faqItems} />
  </CorporatePageShell>
);

export default EmkostiKislotyShchelochi;
