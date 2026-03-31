import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, FeatureChecklist, DarkInfoBlock, FAQSection } from "@/components/corporate/sections";
import { pozharnyeRect, pozharnyePodzem, pozharnyeHoriz } from "@/data/pozharnyeProducts";
import { Wrench, ShieldCheck, Clock, Truck, Settings, Flame, RefreshCw } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const whyUs = [
  "Соответствие СП 31.13330.2012, СНиП 2.04.02-84 и ГОСТ 12.4.009-83",
  "Расчёт объёма резервуара согласно нормативным требованиям пожарной безопасности",
  "Изготовление по типовым и индивидуальным проектам",
  "Гарантия 7 лет, срок службы — от 30 лет",
  "Полный цикл услуг: проектирование, производство, доставка, монтаж, пусконаладка",
  "Возможность подземного и наземного размещения",
  "Наличие всех необходимых сертификатов",
];

const applications = [
  "Хранение регламентированного запаса воды для нужд пожаротушения",
  "Обеспечение работы наружных гидрантов и внутренних пожарных кранов",
  "Создание противопожарных запасов на объектах без доступа к централизованному водоснабжению",
  "Использование в системах автоматического пожаротушения",
  "Резервное хранение воды с учётом хозяйственно‑питьевых и производственных нужд на время тушения пожара",
  "Размещение на территориях промышленных предприятий, складов, логистических центров",
  "Оснащение коттеджных посёлков, дачных кооперативов и удалённых объектов",
];

const constructionFeatures = [
  "Цилиндрическая или прямоугольная форма (горизонтальная/вертикальная)",
  "Усиленные кольцевые рёбра жёсткости для подземного размещения",
  "Толщина стенок: от 8 до 25 мм (в зависимости от объёма и глубины залегания)",
  "Герметичные сварные швы, проверенные вакуумным тестом и опрессовкой",
  "Возможность изготовления многокамерных резервуаров",
  "Подземное размещение (с анкерными креплениями против всплытия)",
  "Наземное размещение (с утеплением корпуса для эксплуатации в холодных регионах)",
  "В обваловке (для дополнительной защиты и термостабилизации)",
];

const modifications = [
  {
    title: "По объёму",
    items: [
      "Малые (от 5 м³ до 20 м³) — для локальных объектов и небольших предприятий",
      "Средние (20–50 м³) — для складов, торговых центров, многоквартирных домов",
      "Крупные (50–200 м³ и более) — для промышленных предприятий и комплексов",
    ],
  },
  {
    title: "По конструкции",
    items: [
      "Однокамерные — для простых систем пожаротушения",
      "Многокамерные — с разделением на секции для резервирования и очистки воды",
      "Модульные — сборные системы из нескольких соединённых резервуаров",
    ],
  },
  {
    title: "По типу установки",
    items: [
      "Горизонтальные подземные — для экономии площади",
      "Вертикальные наземные — при ограниченном пространстве под землёй",
      "Комбинированные — с наземными элементами управления",
    ],
  },
  {
    title: "Стандартная комплектация",
    items: [
      "Смотровой колодец съёмного типа с раструбным соединением",
      "Люк‑лаз с герметичной крышкой",
      "Входящий и отводящий патрубки (диаметр по проекту)",
      "Лестница для обслуживания",
      "Крепления для насосного оборудования",
    ],
  },
  {
    title: "Дополнительные опции",
    items: [
      "Пожарный гидрант и ограждения",
      "Датчики уровня воды и системы контроля загазованности",
      "Теплоизоляция (минеральная вата, ППУ) и греющий кабель",
      "Насосные установки и системы автоматического наполнения",
      "Ревизионные люки и площадки обслуживания",
      "Антикоррозийное покрытие для металлических элементов",
      "Разметка и указатели согласно ГОСТ 12.4.009-83",
    ],
  },
];

const advantages = [
  { icon: Flame, title: "Соответствие нормам", text: "Расчёт объёма и конструкции по СП и СНиП, включая требование о наличии минимум двух резервуаров в одном узле." },
  { icon: Settings, title: "Индивидуальный проект", text: "Разработка под конкретные условия: тип грунта, глубину залегания, нагрузки." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Проверка каждого шва и системы на герметичность перед отгрузкой." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 14–21 день, монтаж — 3–7 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка крупногабаритных резервуаров по РФ с соблюдением мер безопасности." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: RefreshCw, title: "Гибкость", text: "Возможность доработки конструкции в процессе эксплуатации." },
];

const faqItems = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Какой объём?", a: "50 л — 300 м³, нестандарт по ТЗ." },
  { q: "Сроки?", a: "10–21 день стандарт, от 15 нестандарт." },
  { q: "Доставка?", a: "Спецтранспорт по всей РФ." },
  { q: "По своим чертежам?", a: "Да, изготовим и спроектируем." },
];

const EmkostiPozharnye = () => (
  <CorporatePageShell
      catalogTabs="emkosti"
    breadcrumbs={[
      { label: "Каталог", href: "/catalog" },
      { label: "Ёмкости", href: "/catalog/emkosti" },
      { label: "Пожарные ёмкости" },
    ]}
    title="Пожарные ёмкости"
    accentWord="и резервуары"
    subtitle="Пожарные резервуары из полипропилена и полиэтилена — надёжное обеспечение пожарной безопасности объектов любого масштаба"
    badge="СП 31.13330.2012 / ГОСТ 12.4.009-83"
    heroImage="/images/emkosti-collage-hero.png"
    stats={[
      { value: "50 л — 300 м³", label: "диапазон объёмов" },
      { value: "PP / PE / PVC", label: "материалы" },
      { value: "от 10 дней", label: "срок изготовления" },
      { value: "5 лет", label: "гарантия" },
    ]}
    seo={{
      title: "Пожарные ёмкости и резервуары из полипропилена и полиэтилена",
      description: "Производство пожарных резервуаров из PP и PE. Соответствие СП и ГОСТ. Гарантия 7 лет. Проектирование, доставка, монтаж.",
      keywords: "пожарные ёмкости, пожарные резервуары, противопожарное водоснабжение, полипропилен, СЗПК",
    }}
  >
    <DarkInfoBlock
      title="Проектирование, производство и монтаж под ключ"
      text="Мы изготавливаем пожарные ёмкости и резервуары из листового полипропилена (PP) и полиэтилена (ПНД/HDPE) для систем противопожарного водоснабжения промышленных предприятий, складов, торговых центров, коттеджных посёлков и других объектов."
      highlights={[
        { value: "PP / PE", label: "материалы корпуса" },
        { value: "8–25 мм", label: "толщина стенок" },
        { value: "от 30 лет", label: "срок службы" },
        { value: "СП / ГОСТ", label: "соответствие" },
      ]}
    />

    <FeatureChecklist title="Почему выбирают нас" items={whyUs} />

    <FeatureChecklist title="Назначение пожарных резервуаров" items={applications} />

    <FeatureChecklist title="Конструктивные особенности" items={constructionFeatures} />

    {/* Modifications accordion */}
    <section className="w-full bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Виды и модификации пожарных резервуаров</h2>
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

    {/* Product tables with tabs */}
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Типоразмерный ряд пожарных ёмкостей</h2>

        <div className="mt-10">
          <Tabs defaultValue="rect" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="rect">Прямоугольные</TabsTrigger>
              <TabsTrigger value="podzem">Подземные</TabsTrigger>
              <TabsTrigger value="horiz">Горизонтальные</TabsTrigger>
            </TabsList>

            <TabsContent value="rect">
              <div className="rounded-lg border border-slate-200 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-xs font-semibold text-slate-700">Артикул</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Объём, л</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Длина, мм</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Ширина, мм</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Высота, мм</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pozharnyeRect.map((item) => (
                      <TableRow key={item.article} className="hover:bg-amber-50/50">
                        <TableCell className="text-xs font-medium"><Link to={`/product/${item.article}`} className="text-amber-600 hover:underline">{item.article}</Link></TableCell>
                        <TableCell className="text-xs text-right">{item.volume.toLocaleString()}</TableCell>
                        <TableCell className="text-xs text-right">{item.length.toLocaleString()}</TableCell>
                        <TableCell className="text-xs text-right">{item.width.toLocaleString()}</TableCell>
                        <TableCell className="text-xs text-right">{item.height.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="podzem">
              <div className="rounded-lg border border-slate-200 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-xs font-semibold text-slate-700">Артикул</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Объём, м³</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Ø корпуса, мм</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Длина (L), мм</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pozharnyePodzem.map((item) => (
                      <TableRow key={item.article} className="hover:bg-amber-50/50">
                        <TableCell className="text-xs font-medium"><Link to={`/product/${item.article}`} className="text-amber-600 hover:underline">{item.article}</Link></TableCell>
                        <TableCell className="text-xs text-right">{item.volumeM3}</TableCell>
                        <TableCell className="text-xs text-right">{item.diameter.toLocaleString()}</TableCell>
                        <TableCell className="text-xs text-right">{item.length.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="horiz">
              <div className="rounded-lg border border-slate-200 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-xs font-semibold text-slate-700">Артикул</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Объём, л</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Ø корпуса, мм</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Длина (L), мм</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pozharnyeHoriz.map((item) => (
                      <TableRow key={item.article} className="hover:bg-amber-50/50">
                        <TableCell className="text-xs font-medium"><Link to={`/product/${item.article}`} className="text-amber-600 hover:underline">{item.article}</Link></TableCell>
                        <TableCell className="text-xs text-right">{item.volume.toLocaleString()}</TableCell>
                        <TableCell className="text-xs text-right">{item.diameter.toLocaleString()}</TableCell>
                        <TableCell className="text-xs text-right">{item.length.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>

    <AdvantagesGrid title="Преимущества сотрудничества" items={advantages} />

    <FAQSection items={faqItems} />
  </CorporatePageShell>
);

export default EmkostiPozharnye;
