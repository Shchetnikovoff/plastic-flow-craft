import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { pozharnyeRect, pozharnyePodzem, pozharnyeHoriz } from "@/data/pozharnyeProducts";
import { Check, Box, Wrench, ShieldCheck, Clock, Truck, Settings, Flame, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

/* ─── static data ─── */

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

/* ─── component ─── */

const EmkostiPozharnyeInner = () => {
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
            <BreadcrumbItem><BreadcrumbPage>Пожарные ёмкости</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Пожарные ёмкости и резервуары из листового полиэтилена и полипропилена
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Пожарные резервуары из полипропилена и полиэтилена — надёжное обеспечение пожарной безопасности объектов любого масштаба!
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkost-pryam-pp-1.png" alt="Пожарная ёмкость прямоугольная" className="w-full h-48 object-cover" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkosti-podzemnye-1.jpg" alt="Подземная пожарная ёмкость" className="w-full h-48 object-cover" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkosti-hero-1.png" alt="Горизонтальная пожарная ёмкость" className="w-full h-48 object-cover" />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Пожарные резервуары: проектирование, производство и монтаж под ключ
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы изготавливаем пожарные ёмкости и резервуары из листового полипропилена (PP) и полиэтилена (ПНД/HDPE) для систем противопожарного водоснабжения промышленных предприятий, складов, торговых центров, коттеджных посёлков и других объектов.
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

        {/* Раздел 1: Назначение */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение пожарных резервуаров</h2>
          <p className="text-sm text-muted-foreground mb-3">Наши пожарные ёмкости предназначены для:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((app, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <Box className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Раздел 2: Материалы и конструкция */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Описание материалов и конструкции</h2>

          <h3 className="text-sm font-semibold text-foreground mb-2">Основные материалы:</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Полипропилен (PP)</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1">
                <p>Температурный диапазон: от −20 °C до +100 °C (кратковременно до +110 °C)</p>
                <p>Высокая прочность и устойчивость к нагрузкам</p>
                <p>Плотность 0,90–0,92 г/см³, температура плавления 160–170 °C</p>
                <p>Экологическая безопасность и нетоксичность</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Полиэтилен (ПНД/HDPE)</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1">
                <p>Температурный диапазон: от −50 °C до +60 °C (кратковременно до +80 °C)</p>
                <p>Морозостойкость (до −70 °C для некоторых марок)</p>
                <p>Плотность 0,93–0,97 г/см³, температура плавления ~120–135 °C</p>
                <p>Водонепроницаемость и устойчивость к коррозии</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-2">Конструктивные особенности:</h3>
          <ul className="space-y-1.5 mb-4">
            {[
              "Цилиндрическая или прямоугольная форма (горизонтальная/вертикальная)",
              "Усиленные кольцевые рёбра жёсткости для подземного размещения",
              "Толщина стенок: от 8 до 25 мм (в зависимости от объёма и глубины залегания)",
              "Герметичные сварные швы, проверенные вакуумным тестом и опрессовкой",
              "Возможность изготовления многокамерных резервуаров",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold text-foreground mb-2">Варианты размещения:</h3>
          <ul className="space-y-1.5">
            {[
              "Подземное (с анкерными креплениями против всплытия)",
              "Наземное (с утеплением корпуса для эксплуатации в холодных регионах)",
              "В обваловке (для дополнительной защиты и термостабилизации)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Раздел 3: Виды и модификации */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды и модификации пожарных резервуаров</h2>
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

        {/* Типоразмерный ряд */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд пожарных ёмкостей</h2>

          <Tabs defaultValue="rect" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="rect">Прямоугольные</TabsTrigger>
              <TabsTrigger value="podzem">Подземные</TabsTrigger>
              <TabsTrigger value="horiz">Горизонтальные</TabsTrigger>
            </TabsList>

            <TabsContent value="rect">
              <div className="rounded-lg border border-border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Артикул</TableHead>
                      <TableHead className="text-xs text-right">Объём, л</TableHead>
                      <TableHead className="text-xs text-right">Длина, мм</TableHead>
                      <TableHead className="text-xs text-right">Ширина, мм</TableHead>
                      <TableHead className="text-xs text-right">Высота, мм</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pozharnyeRect.map((item) => (
                      <TableRow key={item.article}>
                        <TableCell className="text-xs font-medium">{item.article}</TableCell>
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
              <div className="rounded-lg border border-border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Артикул</TableHead>
                      <TableHead className="text-xs text-right">Объём, м³</TableHead>
                      <TableHead className="text-xs text-right">Ø корпуса, мм</TableHead>
                      <TableHead className="text-xs text-right">Длина (L), мм</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pozharnyePodzem.map((item) => (
                      <TableRow key={item.article}>
                        <TableCell className="text-xs font-medium">{item.article}</TableCell>
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
              <div className="rounded-lg border border-border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Артикул</TableHead>
                      <TableHead className="text-xs text-right">Объём, л</TableHead>
                      <TableHead className="text-xs text-right">Ø корпуса, мм</TableHead>
                      <TableHead className="text-xs text-right">Длина (L), мм</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pozharnyeHoriz.map((item) => (
                      <TableRow key={item.article}>
                        <TableCell className="text-xs font-medium">{item.article}</TableCell>
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
        </section>

        {/* Раздел 4: Преимущества */}
        <section className="mb-10">
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

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Готовы заказать пожарный резервуар?</CardTitle>
              <p className="text-sm text-muted-foreground">
                Оставьте заявку, и наш инженер бесплатно проконсультирует по выбору материала, объёма и опций, подготовит 3D‑модель и расчёт стоимости в течение 24 часов, а также организует доставку и монтаж на вашем объекте с соблюдением всех норм пожарной безопасности.
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
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Укажите тип объекта, требуемый объём запаса воды, условия размещения..." rows={3} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Оставить заявку</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

const EmkostiPozharnye = () => (
  <CartProvider>
    <EmkostiPozharnyeInner />
  </CartProvider>
);

export default EmkostiPozharnye;
