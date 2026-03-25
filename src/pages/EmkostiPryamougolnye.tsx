import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { pryamougolnyeProducts } from "@/data/pryamougolnyeProducts";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";
import { Check, Box, Wrench, ShieldCheck, Clock, Truck, Beaker, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

import ArticleBreakdown, { type ArticleSegment } from "@/components/configurator/ArticleBreakdown";

const whyUs = [
  "Собственное производство с применением экструзионной сварки",
  "Изготовление по типовым и индивидуальным проектам (любые размеры и комплектация)",
  "Гарантия 5 лет, срок службы — до 50 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
  "Соответствие ГОСТ, ТУ и международным стандартам качества",
  "Возможность усиления конструкции под специфические нагрузки",
];

const applications = [
  "Хранение питьевой и технической воды, в т. ч. пожарных запасов",
  "Работа с агрессивными средами: кислотами, щелочами, солевыми растворами, реагентами",
  "Пищевая промышленность (сиропы, растительные масла, молочные продукты, закваски)",
  "Сбор и временное хранение промышленных стоков",
  "Системы водоподготовки и водоочистки",
  "Хранение ГСМ, отработанных масел, топлива",
  "Транспортировка и хранение сыпучих материалов (удобрения, зерно, строительные смеси)",
  "Технологические процессы в химической, фармацевтической и гальванической промышленности",
];

const constructionAdvantages = [
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


const ppImages = [
  { src: "/images/emkost-pryam-pp-1.png", alt: "Ёмкость прямоугольная из полипропилена в обрешётке" },
  { src: "/images/emkost-pryam-pp-3.png", alt: "Ёмкость прямоугольная ПП в металлообрешётке" },
  { src: "/images/emkost-pryam-pp-4.png", alt: "Рендер ёмкости прямоугольной из полипропилена" },
];

const pndImages = [
  { src: "/images/emkost-pryam-pnd-1.jpg", alt: "Ёмкость прямоугольная из полиэтилена в обрешётке" },
  { src: "/images/emkost-pryam-pnd-2.png", alt: "Рендер ёмкости прямоугольной из полиэтилена" },
  { src: "/images/emkost-pryam-pp-2.png", alt: "Ёмкость прямоугольная в обрешётке" },
];

/** Interactive product table with material & color selector */
const RectProductTable = () => {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const [selectedColor, setSelectedColor] = useState<MaterialColor>(
    materialSpecs[materials[0].name].colors[0]
  );

  const specs = materialSpecs[selectedMaterial];
  const matCode = materials.find((m) => m.name === selectedMaterial)?.code || "PPC";
  const hasMultipleColors = specs.colors.length > 1;

  const handleMaterialChange = useCallback((matName: string) => {
    setSelectedMaterial(matName);
    const newSpecs = materialSpecs[matName];
    if (newSpecs && newSpecs.colors.length > 0) {
      setSelectedColor(newSpecs.colors[0]);
    }
  }, []);

  const buildArticle = useCallback((volume: number) => {
    const colorPart = hasMultipleColors && selectedColor.colorCode ? `.${selectedColor.colorCode}` : "";
    return `СЗПК.ЕПО.${matCode}${colorPart}.${volume}`;
  }, [matCode, selectedColor, hasMultipleColors]);

  const exampleArticle = buildArticle(pryamougolnyeProducts[0].volume);

  const segments: ArticleSegment[] = useMemo(() => {
    const segs: ArticleSegment[] = [
      { value: "СЗПК", label: "Компания", desc: "Сибирский завод полимерных конструкций" },
      { value: "ЕПО", label: "Тип", desc: "Прямоугольная в обрешётке" },
      { value: matCode, label: "Материал", desc: materials.find((m) => m.code === matCode)?.name.split("(")[0].trim() || matCode },
    ];
    if (hasMultipleColors && selectedColor.colorCode) {
      segs.push({
        value: selectedColor.colorCode,
        label: "Цвет",
        desc: `${selectedColor.name} (${selectedColor.ral})`,
        hex: selectedColor.hex,
      });
    }
    segs.push({ value: String(pryamougolnyeProducts[0].volume), label: "Объём, л", desc: "Объём в литрах" });
    return segs;
  }, [matCode, selectedColor, hasMultipleColors]);

  return (
    <section id="modeli" className="mb-10">
      <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>

      {/* Material selector */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-foreground mb-2 block">Материал</span>
        <div className="flex flex-wrap gap-2">
          {materials.map((mat) => (
            <Badge
              key={mat.name}
              variant="outline"
              className={`rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                selectedMaterial === mat.name
                  ? "border-primary text-primary bg-primary/5"
                  : "hover:border-primary/50 hover:text-primary/80"
              }`}
              onClick={() => handleMaterialChange(mat.name)}
            >
              {mat.code}
            </Badge>
          ))}
        </div>
        {specs && (
          <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
            <span>🌡 {specs.workingTemp}</span>
          </div>
        )}
      </div>

      {/* Color selector */}
      {specs && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-foreground mb-2 block">Цвет</span>
          <div className="flex flex-wrap gap-2">
            {specs.colors.map((c) => (
              <div
                key={c.ral + c.colorCode}
                onClick={() => setSelectedColor(c)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-all ${
                  selectedColor.colorCode === c.colorCode
                    ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
                    : "border-border hover:border-muted-foreground bg-card"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-border shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-xs font-medium text-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.ral}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article breakdown */}
      <ArticleBreakdown exampleArticle={exampleArticle} segments={segments} />

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5">
              <TableHead className="font-semibold">Артикул</TableHead>
              <TableHead className="font-semibold">Объём, л</TableHead>
              <TableHead className="font-semibold">Длина, мм</TableHead>
              <TableHead className="font-semibold">Ширина, мм</TableHead>
              <TableHead className="font-semibold">Высота, мм</TableHead>
              <TableHead className="font-semibold">Цена</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pryamougolnyeProducts.map((p) => {
              const art = buildArticle(p.volume);
              return (
                <TableRow
                  key={p.volume}
                  className="cursor-pointer transition-colors hover:bg-primary/5"
                  onClick={() => navigate(`/product/${encodeURIComponent(art)}`)}
                >
                  <TableCell className="font-mono text-xs font-medium">{art}</TableCell>
                  <TableCell>{p.volume.toLocaleString("ru-RU")}</TableCell>
                  <TableCell>{p.length}</TableCell>
                  <TableCell>{p.width}</TableCell>
                  <TableCell>{p.height}</TableCell>
                  <TableCell className="text-muted-foreground text-xs italic">По запросу</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

const EmkostiPryamougolnyeInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Заполните обязательные поля (имя, телефон)");
      return;
    }
    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setForm({ name: "", phone: "", email: "", description: "" });
  };

  const scrollToForm = () => {
    document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Прямоугольные ёмкости в обрешётке</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Прямоугольные ёмкости из полипропилена и полиэтилена в обрешётке
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Оптимальное решение для компактного и надёжного хранения жидкостей и сыпучих материалов!
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          {/* Hero images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkost-pryam-real-4.png" alt="Рендер ёмкости из полипропилена в обрешётке" className="w-full object-contain" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkost-pryam-real-2.jpg" alt="Ёмкость из полиэтилена в обрешётке — фото" className="w-full object-contain" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkost-pryam-real-3.png" alt="Ёмкость из полипропилена в металлической обрешётке" className="w-full object-contain" />
            </div>
          </div>
        </section>

        {/* Intro */}

        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "calculator", label: "Калькулятор" },
            { id: "modeli", label: "Модели" },
            { id: "opisanie", label: "Описание" },
            { id: "naznachenie", label: "Назначение" },
            { id: "materialy", label: "Материалы" },
            { id: "modifikacii", label: "Модификации" },
            { id: "preimushchestva", label: "Преимущества" },
            { id: "cta-form", label: "Заявка" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <RectangularTankCalculator />

        {/* Типоразмерный ряд — with material & color selector */}
        <RectProductTable />

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Прямоугольные ёмкости в металлическом каркасе: от проектирования до монтажа
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы производим промышленные прямоугольные ёмкости из листового полипропилена (PP) и полиэтилена (ПНД/HDPE) с усилением в виде наружной металлической обрешётки. Конструкции идеально подходят для хранения химически активных веществ, воды, пищевых продуктов и сыпучих материалов в условиях ограниченного пространства.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Назначение */}
        <section id="naznachenie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение прямоугольных ёмкостей в обрешётке</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((app, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <Box className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Материалы и конструкция */}
        <section id="opisanie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Описание материалов и конструкции</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Полипропилен (PP)</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>Температура: от −20 °C до +100 °C (кратковр. +110 °C)</li>
                  <li>Высокая химическая стойкость к кислотам, щелочам, растворителям</li>
                  <li>Плотность 0,90–0,92 г/см³, t плавл. 160–170 °C</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Полиэтилен (ПНД/HDPE)</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>Температура: от −50 °C до +60 °C (кратковр. +80 °C)</li>
                  <li>Устойчивость к УФ‑излучению и замерзанию</li>
                  <li>Плотность 0,93–0,97 г/см³, t плавл. ~120–135 °C</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-2">Конструкция:</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground mb-6">
            <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /><span>Прямоугольный корпус из листового пластика, изготовленный методом экструзионной сварки</span></li>
            <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /><span>Наружная металлическая обрешётка для равномерного распределения нагрузки</span></li>
            <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /><span>Толщина стенок: от 5 до 25 мм (подбирается в зависимости от назначения)</span></li>
            <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /><span>Возможность установки внутренних перегородок и отсеков</span></li>
          </ul>


          <h3 className="text-sm font-semibold text-foreground mb-2">Преимущества конструкции:</h3>
          <ul className="space-y-1.5">
            {constructionAdvantages.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Виды и модификации */}
        <section id="modifikacii" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды и модификации</h2>
          <Accordion type="multiple" defaultValue={["По объёму"]} className="space-y-2">
            {modifications.map((mod) => (
              <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-border bg-card px-4">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                  {mod.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 pb-2">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Moved: Типоразмерный ряд is now above Описание */}

        {/* Преимущества сотрудничества */}
        <section id="preimushchestva" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {advantages.map((adv) => (
              <Card key={adv.title}>
                <CardContent className="p-4 flex items-start gap-3">
                  <adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{adv.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Duplicate table removed — now in "modeli" section above */}

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Готовы заказать прямоугольную ёмкость в обрешётке?</CardTitle>
              <p className="text-sm text-muted-foreground">
                Оставьте заявку, и наш инженер бесплатно проконсультирует, подготовит 3D‑модель и расчёт стоимости в течение 24 часов.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Имя *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">Телефон *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">E-mail</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description" className="text-sm">Описание задачи</Label>
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите вашу задачу..." rows={3} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Оставить заявку</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <PageFooter />
      </main>
    </>
  );
};

const ProductTable = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg border border-border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Артикул</TableHead>
            <TableHead className="text-xs">Объём, л</TableHead>
            <TableHead className="text-xs text-right">Длина (Д), мм</TableHead>
            <TableHead className="text-xs text-right">Ширина (Ш), мм</TableHead>
            <TableHead className="text-xs text-right">Высота (В), мм</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pryamougolnyeProducts.map((item) => (
            <TableRow
              key={item.article}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => navigate(`/product/${item.article}`)}
            >
              <TableCell className="text-xs font-medium text-primary underline">{item.article}</TableCell>
              <TableCell className="text-xs font-medium">{item.volume.toLocaleString()}</TableCell>
              <TableCell className="text-xs text-right">{item.length.toLocaleString()}</TableCell>
              <TableCell className="text-xs text-right">{item.width.toLocaleString()}</TableCell>
              <TableCell className="text-xs text-right">{item.height.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const EmkostiPryamougolnye = () => (
  <CartProvider>
    <EmkostiPryamougolnyeInner />
  </CartProvider>
);

export default EmkostiPryamougolnye;
