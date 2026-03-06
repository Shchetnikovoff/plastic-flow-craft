import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { pozharnyeRect, pozharnyePodzem, pozharnyeHoriz } from "@/data/pozharnyeProducts";
import { Check, Box, Wrench, ShieldCheck, Clock, Truck, Beaker, Settings, Flame } from "lucide-react";
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

const whyUs = [
  "Соответствие нормам пожарной безопасности (СП 8.13130, ГОСТ Р 53961)",
  "Объёмы от 1 000 л до 150 м³ — под любые нормативные требования",
  "Гарантия 5 лет, срок службы — до 50 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Химическая стойкость — безопасное хранение воды с пенообразователями",
  "Индивидуальное проектирование под конкретный объект",
];

const applications = [
  "Хранение пожарного запаса воды для автоматических систем пожаротушения",
  "Резервное водоснабжение спринклерных и дренчерных систем",
  "Наружное и внутреннее пожаротушение промышленных объектов",
  "Пожарные резервуары для складских и логистических комплексов",
  "Запас воды для пожарных насосных станций",
  "Хранение растворов пенообразователей и огнетушащих составов",
  "Противопожарное водоснабжение жилых комплексов и ТЦ",
  "Резервуары пожарного запаса для объектов нефтегазовой отрасли",
];

const constructionAdvantages = [
  "Полная химическая инертность — не корродирует, не загрязняет воду",
  "Устойчивость к перепадам температур — от −50 °C до +100 °C",
  "Лёгкий монтаж — вес в 3–5 раз меньше стальных аналогов",
  "Герметичность — сварные швы проходят 100% контроль",
  "Не требует внутренней антикоррозионной обработки",
];

const modifications = [
  {
    title: "По типу конструкции",
    items: [
      "Прямоугольные в металлической обрешётке — для наземной установки",
      "Подземные из спиральновитых труб — для заглублённого размещения",
      "Горизонтальные на ложементах — для ограниченных пространств",
    ],
  },
  {
    title: "По назначению",
    items: [
      "Для автоматических систем пожаротушения (АСПТ)",
      "Для спринклерных систем",
      "Для дренчерных систем",
      "Для наружного пожаротушения",
      "Для хранения пенообразователей",
    ],
  },
  {
    title: "По материалу",
    items: [
      "Полипропилен (PP) — температура до +100 °C",
      "Полиэтилен (ПНД/HDPE) — морозостойкость до −50 °C",
      "Армированные композитные конструкции — повышенная прочность",
    ],
  },
  {
    title: "Дополнительные опции",
    items: [
      "Теплоизоляция (минеральная вата, ППУ)",
      "Датчики уровня воды и давления",
      "Системы автоматического наполнения",
      "Патрубки для подключения пожарных насосов",
      "Люки ревизионные Ø600–800 мм",
      "Лестницы и площадки обслуживания",
      "Маркировка «ПОЖАРНЫЙ ЗАПАС»",
    ],
  },
];

const advantages = [
  { icon: Flame, title: "Пожарная безопасность", text: "Полное соответствие нормам пожарного водоснабжения и требованиям МЧС." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проходит проверку на герметичность (вакуумный тест, опрессовка)." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 10–14 дней, монтаж — 2–5 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ, включая погрузочно‑разгрузочные работы и шеф‑монтаж." },
  { icon: Wrench, title: "Монтаж «под ключ»", text: "Установка, подключение к системам пожаротушения, пусконаладка." },
  { icon: Settings, title: "Индивидуальный проект", text: "Расчёт объёма пожарного запаса под конкретный объект по нормативам." },
];

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
            Пожарные ёмкости из полимерных материалов
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Надёжное хранение пожарного запаса воды — от проектирования до монтажа «под ключ»!
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
            Пожарные ёмкости: надёжный запас воды для систем пожаротушения
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы производим пожарные ёмкости из листового полипропилена (PP) и полиэтилена (ПНД/HDPE) для хранения противопожарного запаса воды. Резервуары соответствуют требованиям СП 8.13130 и предназначены для комплектации автоматических систем пожаротушения, спринклерных и дренчерных установок, а также наружного пожарного водоснабжения.
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
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение пожарных ёмкостей</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((app, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <Box className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Конструкция */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Конструктивные преимущества</h2>
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
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды и модификации</h2>
          <Accordion type="multiple" defaultValue={["По типу конструкции"]} className="space-y-2">
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

        {/* Преимущества */}
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
              <CardTitle className="text-lg">Готовы заказать пожарную ёмкость?</CardTitle>
              <p className="text-sm text-muted-foreground">
                Оставьте заявку, и наш инженер бесплатно рассчитает необходимый объём пожарного запаса и подготовит коммерческое предложение в течение 24 часов.
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
