import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical, ImageOff, Factory, Beaker, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

const whyUs = [
  "Собственное производство химических реакторов из полипропилена и полиэтилена",
  "Индивидуальное проектирование под конкретные химические процессы",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Химическая стойкость к широкому спектру агрессивных сред",
];

const applications = [
  { icon: FlaskConical, text: "Химическое осаждение и нейтрализация" },
  { icon: Beaker, text: "Приготовление и смешивание растворов" },
  { icon: Factory, text: "Гидрометаллургические процессы" },
  { icon: Settings, text: "Выщелачивание и экстракция" },
  { icon: Shield, text: "Процессы окисления и восстановления" },
  { icon: Wrench, text: "Электрохимические реакции" },
];

const modifications = [
  { title: "По материалу", items: ["Реакторы из полипропилена (PP) — до +100 °C", "Реакторы из полиэтилена (ПНД/HDPE) — до +60 °C", "Комбинированные конструкции с усиленным каркасом"] },
  { title: "По конструкции", items: ["С мешалкой (лопастной, рамной, якорной)", "С рубашкой обогрева/охлаждения", "С герметичной крышкой и патрубками", "Открытого и закрытого типа"] },
  { title: "Дополнительные опции", items: ["Датчики уровня, температуры, pH", "Системы дозирования реагентов", "Теплоизоляция", "Площадки обслуживания и лестницы"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Спроектируем реактор под ваши процессы и условия." },
  { icon: FlaskConical, title: "Подбор материала", text: "Учтём химическую среду, температуру и давление." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Проверка швов на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Монтаж и пусконаладка." },
  { icon: Shield, title: "Документация", text: "Паспорта и сертификаты." },
];

const Inner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("reaktory");
  const catIndex = 7;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; } toast.success("Заявка отправлена!"); setForm({ name: "", phone: "", email: "", description: "" }); };
  const scrollToForm = () => { document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" }); };

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
              <BreadcrumbItem><BreadcrumbPage className="text-slate-200">Химические реакторы</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-[11px] text-amber-400 uppercase tracking-[0.2em] font-semibold mb-3">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Химические <span className="text-amber-400">реакторы</span> из полимеров
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-2xl leading-relaxed">
            Реакторы из полипропилена и полиэтилена для химических, гидрометаллургических и технологических процессов.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-800/50"><img src="/images/reaktor-hero-1.jpg" alt="Химический реактор" className="w-full object-contain" /></div>
            <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-800/50"><img src="/images/reaktor-hero-2.jpg" alt="Реактор из полипропилена" className="w-full object-contain" /></div>
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


        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "opisanie", label: "Описание" },
            { id: "primenenie", label: "Применение" },
            { id: "vidy", label: "Виды" },
            { id: "preimushchestva", label: "Преимущества" },
            { id: "katalog", label: "Каталог" },
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

        <section id="opisanie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Химические реакторы: от проектирования до монтажа</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Мы проектируем и производим химические реакторы из полипропилена и полиэтилена для проведения различных химических процессов с агрессивными средами.</p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">{whyUs.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
        </section>

        <section id="primenenie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{applications.map((a, i) => (<div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"><a.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-foreground">{a.text}</span></div>))}</div>
        </section>

        <section id="vidy" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды реакторов</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (<AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-border bg-card px-4"><AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">{mod.title}</AccordionTrigger><AccordionContent><ul className="space-y-1.5 pb-2">{mod.items.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary mt-1">•</span><span>{item}</span></li>))}</ul></AccordionContent></AccordionItem>))}
          </Accordion>
        </section>

        <section id="preimushchestva" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{advantages.map((adv) => (<Card key={adv.title}><CardContent className="p-4 flex items-start gap-3"><adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p><p className="text-xs text-muted-foreground">{adv.text}</p></div></CardContent></Card>))}</div>
        </section>

        {category && (
          <section id="katalog" className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Каталог реакторов</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{category.subcategories.map((sub, i) => {
              const cc = (<><div className="aspect-[4/3] bg-muted flex items-center justify-center">{sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" /> : <ImageOff className="h-10 w-10 text-muted-foreground/40" />}</div><div className="px-3 py-2.5"><p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p><p className="text-sm font-medium text-foreground group-hover:text-amber-500 transition-colors mt-0.5">{sub.name}</p></div></>);
              if (sub.externalPath) return <Link key={sub.id} to={sub.externalPath} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] transition-all block">{cc}</Link>;
              return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] transition-all text-left">{cc}</button>;
            })}</div>
          </section>
        )}

        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card><CardContent className="p-6">
            <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Готовы заказать реактор?</h2>
            <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — расчёт в течение 24 часов.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
              <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
              <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите задачу…" rows={3} maxLength={1000} /></div>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
            </form>
          </CardContent></Card>
        </section>
        <PageFooter />
      </main>
    </>
  );
};

const ReaktoryPage = () => (<CartProvider><Inner /></CartProvider>);
export default ReaktoryPage;
