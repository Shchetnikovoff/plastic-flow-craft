import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import {
  Check, Droplets, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Beaker, Shield, Leaf, Zap, Building2, Wheat, ImageOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

/* ── static data ── */

const whyUs = [
  "Собственное производство с применением передовых технологий формования и сварки полимеров",
  "Индивидуальный подбор оборудования под конкретные задачи очистки",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл услуг: проектирование, производство, доставка, монтаж, пусконаладка, сервис",
  "Соответствие ГОСТ, СанПиН и международным стандартам качества воды",
  "Наличие сертификатов на все материалы и готовые изделия",
];

const products = [
  {
    title: "ФФУ (флотационно-фильтровальная установка)",
    items: [
      "Предназначена для глубокой очистки сточных вод от нефтепродуктов, жиров, взвешенных веществ",
      "Принцип работы: флотация микропузырьками воздуха + фильтрация через полимерные загрузки",
      "Эффективность: до 95 % очистки от жиров и масел, до 90 % от взвешенных частиц",
    ],
  },
  {
    title: "Ламельный тонкослойный отстойник-сепаратор",
    items: [
      "Ускоряет осаждение взвешенных частиц за счёт ламельных модулей",
      "Компактность: занимает в 3–5 раз меньше места, чем традиционные отстойники",
      "Применение: очистка промышленных стоков, ливневых вод, подготовка воды для оборотного водоснабжения",
    ],
  },
  {
    title: "Мешочный обезвоживатель осадка",
    items: [
      "Предназначен для снижения влажности шлама и осадка после очистки стоков",
      "Фильтрующий элемент: полимерные мешочные фильтры с разной степенью проницаемости",
      "Преимущества: простота обслуживания, низкие энергозатраты, компактность",
    ],
  },
  {
    title: "Станция приготовления коагулянта",
    items: [
      "Автоматизированное дозирование и смешивание реагентов (коагулянтов, флокулянтов)",
      "Материалы: химически стойкий полипропилен или ПВХ",
      "Комплектация: ёмкости для реагентов, мешалки, насосы-дозаторы, система контроля концентрации",
    ],
  },
  {
    title: "Жироуловители промышленные",
    items: [
      "Удаляют жиры и масла из сточных вод предприятий общественного питания, мясоперерабатывающих заводов и др.",
      "Принцип действия: гравитационное разделение, коалесцентные фильтры",
      "Производительность: от 1 до 50 л/с (и более по спецзаказу)",
    ],
  },
  {
    title: "КОС (комплексные очистные сооружения)",
    items: [
      "Модульные системы полной очистки стоков: механическая, физико-химическая, биологическая",
      "Состав: решётка, песколовка, отстойник, аэротенк, фильтр доочистки, блок обеззараживания",
      "Применение: коттеджные посёлки, промышленные предприятия, удалённые объекты",
    ],
  },
  {
    title: "Реагентные шкафы и стойки",
    items: [
      "Предназначены для безопасного хранения и дозирования химических реагентов",
      "Материалы: коррозионностойкий полипропилен или ПВХ",
      "Комплектация: полки, поддоны для локализации утечек, система вентиляции, сигнализация",
    ],
  },
];

const materialCards = [
  {
    name: "Полипропилен (PP)",
    specs: [
      "Температурный диапазон: от −20 °C до +100 °C",
      "Высокая химическая стойкость к большинству реагентов",
      "Плотность 0,90–0,92 г/см³",
    ],
  },
  {
    name: "ПВХ (PVC)",
    specs: [
      "Температурный диапазон: до +60 °C",
      "Устойчивость к УФ-излучению (при наличии стабилизаторов)",
      "Гладкая поверхность, препятствующая зарастанию",
    ],
  },
  {
    name: "Стеклопластик",
    specs: [
      "Повышенная прочность при малом весе",
      "Долговечность (срок службы свыше 50 лет)",
      "Химическая инертность к широкому спектру веществ",
    ],
  },
];

const commonAdvantages = [
  "Коррозионная стойкость (в отличие от металла)",
  "Малый вес, упрощающий транспортировку и монтаж",
  "Возможность изготовления нестандартных форм",
  "Низкие эксплуатационные расходы",
  "Экологичность и безопасность для питьевой воды",
];

const applicationAreas = [
  { icon: Factory, text: "Пищевая промышленность (очистка жиросодержащих стоков)" },
  { icon: Zap, text: "Нефтехимия и машиностроение (удаление нефтепродуктов)" },
  { icon: Building2, text: "ЖКХ (очистка ливневых и хозяйственно-бытовых стоков)" },
  { icon: Wheat, text: "Сельское хозяйство (очистка вод после мойки техники, животноводческих комплексов)" },
  { icon: Beaker, text: "Фармацевтика и медицина (очистка технологических стоков)" },
  { icon: Leaf, text: "Энергетика (подготовка воды для котлов и теплообменников)" },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Разработаем проект под ваши задачи, включая нестандартные формы и комплектацию." },
  { icon: FlaskConical, title: "Точный подбор оборудования", text: "Учтём тип загрязнений, производительность, требования к качеству очищенной воды." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый элемент проходит гидравлические испытания и проверку на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 14–30 дней, монтаж — 3–10 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку крупногабаритного оборудования по РФ с соблюдением мер безопасности." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: Shield, title: "Документация", text: "Предоставим паспорта изделий, сертификаты соответствия и инструкции по эксплуатации." },
];

/* ── component ── */

const VodoochistkaInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("vodoochistka");
  const catIndex = 2;

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
            <BreadcrumbItem><BreadcrumbPage>Водоочистка</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Водоочистное оборудование из полимеров
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Полимерное водоочистное оборудование — эффективность, долговечность и устойчивость к агрессивным средам!
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/vodoochistka-hero-1.jpeg" alt="Водоочистное оборудование из полимеров" className="w-full h-56 object-cover" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/vodoochistka-hero-2.jpeg" alt="Системы водоочистки" className="w-full h-56 object-cover" />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Системы водоочистки из полимерных материалов: от проектирования до ввода в эксплуатацию
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы проектируем и производим современное водоочистное оборудование из химически стойких полимеров (полипропилен, ПВХ, стеклопластик) для промышленных предприятий, ЖКХ, сельского хозяйства и коммерческих объектов.
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

        {/* Section 1: Перечень продукции */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Перечень продукции</h2>
          <Accordion type="multiple" defaultValue={[products[0].title]} className="space-y-2">
            {products.map((prod) => (
              <AccordionItem key={prod.title} value={prod.title} className="rounded-lg border border-border bg-card px-4">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                  {prod.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 pb-2">
                    {prod.items.map((item, i) => (
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

        {/* Section 2: Преимущества полимерных материалов */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества полимерных материалов</h2>

          <h3 className="text-sm font-semibold text-foreground mb-3">Основные материалы:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {materialCards.map((mat, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">{mat.name}</p>
                  <ul className="space-y-1">
                    {mat.specs.map((s, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-2">Общие преимущества:</h3>
          <ul className="space-y-1.5">
            {commonAdvantages.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Сферы применения */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типовые сферы применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applicationAreas.map((area, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <area.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{area.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Преимущества сотрудничества */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partnershipAdvantages.map((adv) => (
              <Card key={adv.title}>
                <CardContent className="p-4 flex items-start gap-3">
                  <adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p>
                    <p className="text-xs text-muted-foreground">{adv.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Subcategories grid */}
        {category && (
          <section className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Каталог водоочистного оборудования</h2>
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
                            isSelected ? "bg-primary/10 border border-primary/30" : "hover:bg-muted border border-transparent"
                          }`}
                        >
                          <span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>{catIndex}.{i + 1}</span>
                          <span className={`transition-colors ${isSelected ? "text-primary font-semibold" : "text-foreground group-hover:text-primary"}`}>{sub.name}</span>
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
                            <img src={selectedSub.image} alt={selectedSub.name} className="w-full h-full object-cover" />
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
                            Раздел в разработке. Информация появится в ближайшее время.
                          </p>
                          {selectedSub.externalPath && (
                            <Link to={selectedSub.externalPath} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                              Перейти на страницу →
                            </Link>
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
                                <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                              ) : (
                                <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                              )}
                            </div>
                            <div className="px-3 py-2.5">
                              <p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p>
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">{sub.name}</p>
                            </div>
                          </>
                        );
                        if (sub.externalPath) {
                          return (
                            <Link key={sub.id} to={sub.externalPath} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left block">
                              {cardContent}
                            </Link>
                          );
                        }
                        return (
                          <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left">
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

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">
                Готовы заказать водоочистное оборудование?
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Оставьте заявку, и наш инженер бесплатно проконсультирует по выбору типа и комплектации оборудования, подготовит схему очистки и расчёт стоимости в течение 24 часов.
              </p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Имя *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Телефон *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">E-mail</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="desc" className="text-xs">Описание задачи</Label>
                  <Textarea id="desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите вашу задачу…" rows={3} maxLength={1000} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button>
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

const Vodoochistka = () => (
  <CartProvider>
    <VodoochistkaInner />
  </CartProvider>
);

export default Vodoochistka;
