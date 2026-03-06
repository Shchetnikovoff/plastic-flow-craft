import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { emkostGroups } from "@/data/emkostiProducts";
import { ImageOff, Check, Droplets, Flame, FlaskConical, Truck, ShieldCheck, Clock, Wrench, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const whyUs = [
  "Собственное производство с ЧПУ-оборудованием и экструзионной сваркой",
  "Изготовление по типовым и индивидуальным проектам",
  "Гарантия 5 лет и срок службы до 50 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
  "Соответствие ГОСТ, ТУ и международным стандартам качества",
];

const applications = [
  "Хранение и транспортировка питьевой и технической воды",
  "Работа с агрессивными средами: кислотами, щелочами, солевыми растворами, реагентами",
  "Пищевая промышленность (молоко, масла, соки, спиртосодержащие жидкости)",
  "Системы водоподготовки, водоочистки и канализации",
  "Накопление ливневых и паводковых вод, пожарные резервуары",
  "Хранение минеральных удобрений, пестицидов и ядохимикатов",
  "Технологические процессы в гальванике, металлургии, машиностроении",
];

const advantages = [
  { icon: Wrench, title: "Индивидуальный подход", text: "Разработаем проект под ваши задачи, включая нестандартные формы и комплектацию." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проходит проверку на герметичность и прочность." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 10–14 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку по РФ и СНГ, включая погрузочно-разгрузочные работы." },
  { icon: FlaskConical, title: "Сервис", text: "Монтаж «под ключ», пусконаладка, гарантийное и постгарантийное обслуживание." },
];

const modifications = [
  {
    title: "По форме",
    items: ["Цилиндрические (вертикальные и горизонтальные)", "Прямоугольные и квадратные", "Конические и многоугольные (по чертежам заказчика)"],
  },
  {
    title: "По объёму",
    items: ["Малые (от 50 л до 1 м³)", "Средние (1–10 м³)", "Крупные (10–300 м³, включая подземные и наземные резервуары)"],
  },
  {
    title: "По назначению",
    items: ["Пищевые (с санитарно-эпидемиологическими заключениями)", "Химические (для кислот, щелочей, растворителей)", "Пожарные и накопительные", "Дренажные и канализационные", "Технологические (для гальванических линий, реакторов)"],
  },
  {
    title: "Дополнительные опции",
    items: ["Люки, патрубки, штуцеры, фланцы", "Уровнемеры, датчики, системы обогрева", "Каркасы, лестницы, площадки обслуживания", "Футеровка, усиление рёбрами жёсткости", "Подземное исполнение с анкерными креплениями"],
  },
];

const EmkostiPageInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const category = findCategory("emkosti");
  const catIndex = 6; // Ёмкости is 6th category

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
            <BreadcrumbItem><BreadcrumbPage>Ёмкости</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Промышленные ёмкости из листового полипропилена и полиэтилена
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Надёжность, проверенная временем!
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          {/* Hero images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkosti-hero-1.png" alt="Промышленные ёмкости из полипропилена" className="w-full h-auto object-cover" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkosti-hero-2.png" alt="Ёмкость в разрезе" className="w-full h-auto object-cover" />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Промышленные ёмкости на заказ: от эскиза до монтажа
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы производим промышленные ёмкости из листового полипропилена (PP) и полиэтилена (ПНД/HDPE) любой сложности и объёма — под задачи химической, пищевой, фармацевтической промышленности, сельского хозяйства, ЖКХ и строительства.
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

        {/* Section 1: Назначение */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение ёмкостей</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((app, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <Droplets className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Материалы */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Описание материалов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* PP */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Полипропилен (PP)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
                  <div className="bg-muted/30 p-2.5"><span className="block text-xs text-muted-foreground">Температура</span><span className="text-sm font-semibold text-foreground">−20…+100 °C</span></div>
                  <div className="bg-muted/30 p-2.5"><span className="block text-xs text-muted-foreground">Плотность</span><span className="text-sm font-semibold text-foreground">0,90–0,92 г/см³</span></div>
                  <div className="bg-muted/30 p-2.5 border-t"><span className="block text-xs text-muted-foreground">Плавление</span><span className="text-sm font-semibold text-foreground">160–170 °C</span></div>
                  <div className="bg-muted/30 p-2.5 border-t"><span className="block text-xs text-muted-foreground">Хим. стойкость</span><span className="text-sm font-semibold text-foreground">Высокая</span></div>
                </div>
                <p>Идеален для агрессивных сред и повышенных температур.</p>
              </CardContent>
            </Card>
            {/* HDPE */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Полиэтилен (ПНД/HDPE)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
                  <div className="bg-muted/30 p-2.5"><span className="block text-xs text-muted-foreground">Температура</span><span className="text-sm font-semibold text-foreground">−50…+60 °C</span></div>
                  <div className="bg-muted/30 p-2.5"><span className="block text-xs text-muted-foreground">Плотность</span><span className="text-sm font-semibold text-foreground">0,93–0,97 г/см³</span></div>
                  <div className="bg-muted/30 p-2.5 border-t"><span className="block text-xs text-muted-foreground">Плавление</span><span className="text-sm font-semibold text-foreground">120–135 °C</span></div>
                  <div className="bg-muted/30 p-2.5 border-t"><span className="block text-xs text-muted-foreground">УФ‑стойкость</span><span className="text-sm font-semibold text-foreground">Высокая</span></div>
                </div>
                <p>Оптимален для воды, пищевых продуктов и эксплуатации на открытом воздухе.</p>
              </CardContent>
            </Card>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Оба материала:</h3>
            <ul className="space-y-1.5">
              {["Не подвержены коррозии", "Экологически безопасны и пригодны для вторичной переработки", "Имеют малый вес, упрощающий транспортировку и монтаж"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3: Виды и модификации */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды и модификации ёмкостей</h2>
          <Accordion type="multiple" defaultValue={["По форме"]} className="space-y-2">
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

        {/* Section: Типоразмерный ряд */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд ёмкостей</h2>
          <Tabs defaultValue={emkostGroups[0].id}>
            <TabsList className="flex flex-wrap h-auto gap-1 mb-4">
              {emkostGroups.map((group) => (
                <TabsTrigger key={group.id} value={group.id} className="text-xs">
                  {group.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {emkostGroups.map((group) => (
              <TabsContent key={group.id} value={group.id}>
                <Tabs defaultValue={group.categories[0].id}>
                  <TabsList className="flex flex-wrap h-auto gap-1 mb-3">
                    {group.categories.map((cat) => (
                      <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                        {cat.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {group.categories.map((cat) => (
                    <TabsContent key={cat.id} value={cat.id}>
                      <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                      <div className="rounded-lg border border-border overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs">Артикул</TableHead>
                              <TableHead className="text-xs text-right">Объём, л</TableHead>
                              <TableHead className="text-xs text-right">Ø, мм</TableHead>
                              <TableHead className="text-xs text-right">{cat.heightLabel}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {cat.items.map((item) => (
                              <TableRow key={item.article}>
                                <TableCell className="text-xs font-medium">{item.article}</TableCell>
                                <TableCell className="text-xs text-right">{item.volume.toLocaleString()}</TableCell>
                                <TableCell className="text-xs text-right">{item.diameter.toLocaleString()}</TableCell>
                                <TableCell className="text-xs text-right">{item.height.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Section 4: Преимущества */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {advantages.map((adv) => (
              <div key={adv.title} className="rounded-lg border border-border bg-card p-4">
                <adv.icon className="h-6 w-6 text-primary mb-2" />
                <h3 className="text-sm font-semibold text-foreground mb-1">{adv.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{adv.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subcategories grid */}
        {category && (
          <section className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Каталог ёмкостей</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <nav className="md:w-[220px] shrink-0">
                <ul className="space-y-0.5">
                  {category.subcategories.map((sub, i) => (
                    <li key={sub.id}>
                      <Link
                        to={`/catalog/emkosti/${sub.slug}`}
                        className="group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        <span className="text-xs font-semibold text-muted-foreground shrink-0">{catIndex}.{i + 1}</span>
                        <span className="text-foreground group-hover:text-primary transition-colors">{sub.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.subcategories.map((sub, i) => (
                  <Link
                    key={sub.id}
                    to={`/catalog/emkosti/${sub.slug}`}
                    className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                      <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">{sub.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-8">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-2">Готовы заказать ёмкость?</h2>
            <p className="text-sm text-muted-foreground mb-1">Оставьте заявку, и наш инженер:</p>
            <ul className="space-y-1 mb-5">
              {[
                "Бесплатно проконсультирует по выбору материала и конструкции.",
                "Подготовит 3D-модель и расчёт стоимости в течение 24 часов.",
                "Организует доставку и монтаж на вашем объекте.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="cta-name">Имя *</Label>
                <Input id="cta-name" placeholder="Иван Иванов" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} maxLength={100} />
              </div>
              <div>
                <Label htmlFor="cta-phone">Телефон *</Label>
                <Input id="cta-phone" type="tel" placeholder="+7 900 000-00-00" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} maxLength={20} />
              </div>
              <div>
                <Label htmlFor="cta-email">E-mail</Label>
                <Input id="cta-email" type="email" placeholder="ivanov@company.ru" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} maxLength={255} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="cta-desc">Описание задачи</Label>
                <Textarea id="cta-desc" placeholder="Опишите требуемую ёмкость: тип, объём, назначение…" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} maxLength={2000} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full sm:w-auto">Оставить заявку</Button>
              </div>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              Или звоните: <a href="tel:+79633225540" className="text-primary hover:underline">+7 (963) 322-55-40</a>
            </p>
          </div>
        </section>

        {/* Footer info */}
        <footer className="border-t border-border pt-6 pb-4 text-center text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">ООО СЗПК «Пласт-Металл ПРО»</p>
          <p>Ленинградская область, д. Разметелево, ул. Строителей 27</p>
          <p>Телефон: <a href="tel:+79633225540" className="text-primary hover:underline">+7 (963) 322-55-40</a> · E-mail: <a href="mailto:osobenkov@list.ru" className="text-primary hover:underline">osobenkov@list.ru</a></p>
          <p>Режим работы: пн.–пт. 9:00–18:00</p>
        </footer>
      </main>
    </>
  );
};

const EmkostiPage = () => (
  <CartProvider>
    <EmkostiPageInner />
  </CartProvider>
);

export default EmkostiPage;
