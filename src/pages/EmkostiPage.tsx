import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { ImageOff, Check, Droplets, FlaskConical, Truck, ShieldCheck, Clock, Wrench } from "lucide-react";
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
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

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
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
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

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumb className="mb-6">
            <BreadcrumbList className="text-slate-400">
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog" className="text-slate-400 hover:text-amber-400">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-600" />
              <BreadcrumbItem><BreadcrumbPage className="text-slate-200">Ёмкости</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-[11px] text-amber-400 uppercase tracking-[0.2em] font-semibold mb-3">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Промышленные <span className="text-amber-400">ёмкости</span> из полипропилена и полиэтилена
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-2xl leading-relaxed">
            Надёжность, проверенная временем. Производство ёмкостей из листового полипропилена и полиэтилена для любых задач — от 50 л до 200 м³.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Button onClick={scrollToForm} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-full shadow-lg shadow-amber-500/25">
              Получить расчёт стоимости
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:text-amber-400 hover:border-slate-500 rounded-full"
            >
              Смотреть каталог
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-800/50 flex items-center justify-center min-h-[400px]">
              <img src="/images/emkosti-hero-2.png" alt="Ёмкость в разрезе" className="w-full h-auto object-contain" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { src: "/images/emkosti-vert-pp-group.png", alt: "Вертикальные ёмкости" },
                { src: "/images/emkost-horiz-group.png", alt: "Горизонтальные ёмкости" },
                { src: "/images/emkosti-podzemnye-1.jpg", alt: "Подземные ёмкости" },
                { src: "/images/emkost-pryam-pp-1.png", alt: "Прямоугольные ёмкости" },
                { src: "/images/emkost-pryam-pp-2.png", alt: "Пожарные ёмкости" },
                { src: "/images/emkosti-sejsmicheskie.png", alt: "Сейсмические ёмкости" },
                { src: "/images/emkosti-shchelochi-thumb.png", alt: "Ёмкости для щелочи" },
                { src: "/images/emkosti-kisloty-thumb.png", alt: "Ёмкости для кислоты" },
                { src: "/images/emkost-perelivnaya-bassein.jpg", alt: "Переливные ёмкости" },
              ].map((img) => (
                <div key={img.src} className="rounded-lg border border-slate-800 overflow-hidden bg-slate-800/50 aspect-square flex items-center justify-center p-1">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900 text-white">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">30+</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">лет срок службы</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">500+</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">реализованных проектов</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">5 лет</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">гарантия</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">24 ч</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">расчёт стоимости</div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">

        {/* Anchor nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "katalog", label: "Каталог" },
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
              className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Каталог ёмкостей — moved up */}
        {category && (
          <section id="katalog" className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Каталог ёмкостей</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <nav className="md:w-[220px] shrink-0">
                <ul className="space-y-0.5">
                  {category.subcategories.map((sub, i) => {
                    const isSelected = selectedSubId === sub.id;
                    return (
                      <li key={sub.id}>
                        <button
                          onClick={() => setSelectedSubId(isSelected ? null : sub.id)}
                          className={`group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left transition-colors ${
                            isSelected
                              ? "bg-primary/10 border border-primary/30"
                              : "hover:bg-muted border border-transparent"
                          }`}
                        >
                          <span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>{catIndex}.{i + 1}</span>
                          <span className={`transition-colors ${isSelected ? "text-primary font-semibold" : "text-foreground group-hover:text-amber-500"}`}>{sub.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="flex-1">
                {(() => {
                  const selectedSub = category.subcategories.find((s) => s.id === selectedSubId);
                  if (selectedSub) {
                    return (
                      <div className="rounded-xl border border-border bg-card overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
                        <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                          {selectedSub.image ? (
                            <img src={selectedSub.image} alt={selectedSub.name} className="w-full h-full object-contain" />
                          ) : (
                            <ImageOff className="h-12 w-12 text-muted-foreground/40" />
                          )}
                        </div>
                        <div className="p-5">
                          <p className="text-xs text-muted-foreground font-semibold mb-1">
                            {catIndex}.{category.subcategories.findIndex((s) => s.id === selectedSub.id) + 1}
                          </p>
                          <h3 className="text-lg font-bold text-foreground mb-2">{selectedSub.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {selectedSub.description || "Описание уточняйте по запросу."}
                          </p>
                          {selectedSub.externalPath ? (
                            <Link
                              to={selectedSub.externalPath}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                            >
                              Перейти на страницу →
                            </Link>
                          ) : (
                            <a href="#cta-form" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                              Запросить расчёт →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.subcategories.map((sub, i) => {
                        const cardContent = (
                          <>
                            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                              {sub.image ? (
                                <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" />
                              ) : (
                                <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                              )}
                            </div>
                            <div className="px-3 py-2.5">
                              <p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p>
                              <p className="text-sm font-medium text-foreground group-hover:text-amber-500 transition-colors mt-0.5">{sub.name}</p>
                            </div>
                          </>
                        );

                        if (sub.externalPath) {
                          return (
                            <Link
                              key={sub.id}
                              to={sub.externalPath}
                              className="group rounded-lg border border-border bg-card overflow-hidden hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] transition-all text-left block"
                            >
                              {cardContent}
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedSubId(sub.id)}
                            className="group rounded-lg border border-border bg-card overflow-hidden hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] transition-all text-left"
                          >
                            {cardContent}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        {/* Описание */}
        <section id="opisanie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase border-l-4 border-amber-400 pl-3">
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

        {/* Назначение */}
        <section id="naznachenie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Назначение ёмкостей</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((app, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <Droplets className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Материалы */}
        <section id="materialy" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Описание материалов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

        {/* Виды и модификации */}
        <section id="modifikacii" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Виды и модификации ёмкостей</h2>
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

        {/* CTA to configurator */}
        <section className="mb-10">
          <Link
            to="/catalog/emkosti/konfigurator"
            className="block rounded-xl border-2 border-primary/30 bg-primary/5 p-6 sm:p-8 text-center hover:border-primary/60 hover:bg-primary/10 transition-all group"
          >
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-amber-500 transition-colors">
              Конфигуратор ёмкостей
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Подберите тип, материал и размер ёмкости. Добавьте в корзину и оформите заявку.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Перейти к конфигуратору →
            </span>
          </Link>
        </section>

        {/* Преимущества */}
        <section id="preimushchestva" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Преимущества сотрудничества</h2>
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

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-8">
          <div className="rounded-xl bg-slate-900 text-white p-6 sm:p-8">
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

        <PageFooter />
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
