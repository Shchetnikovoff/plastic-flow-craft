import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical, ImageOff, Wind, Factory, Settings, Shield } from "lucide-react";
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
  "Собственное производство вентиляционных элементов из полипропилена",
  "Круглое и прямоугольное сечение — полный ассортимент фасонных изделий",
  "Химическая стойкость к агрессивным средам",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Изготовление по типовым и индивидуальным размерам",
];

const applications = [
  { icon: Factory, text: "Вентиляция гальванических и травильных участков" },
  { icon: Wind, text: "Вытяжные системы химических лабораторий" },
  { icon: Settings, text: "Промышленная вентиляция с агрессивными средами" },
  { icon: Shield, text: "Системы аспирации и газоочистки" },
  { icon: FlaskConical, text: "Вентиляция фармацевтических и пищевых производств" },
  { icon: Wrench, text: "Приточно-вытяжные системы промышленных объектов" },
];

const modifications = [
  { title: "Круглого сечения", items: ["Воздуховоды круглые", "Отводы вентиляционные (15°, 30°, 45°, 60°, 90°)", "Тройники вентиляционные", "Раздвижные элементы", "Переходы и муфты"] },
  { title: "Прямоугольного сечения", items: ["Воздуховоды прямоугольные", "Отводы прямоугольные", "Тройники прямоугольные", "Переходы круглый-прямоугольный"] },
  { title: "Материалы", items: ["Полипропилен (PP) — для агрессивных сред до +100 °C", "ПВХ (PVC) — для стандартных условий до +60 °C", "Толщина стенок от 3 до 10 мм"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Изготовим элементы по вашим чертежам и размерам." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый элемент проходит проверку на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 5–14 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Консультации по монтажу и подбору элементов." },
  { icon: Shield, title: "Документация", text: "Сертификаты на материалы." },
];

const Inner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("ventilyatsiya");
  const catIndex = 4;

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
              <BreadcrumbItem><BreadcrumbPage className="text-slate-200">Вентиляция</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-[11px] text-amber-400 uppercase tracking-[0.2em] font-semibold mb-3">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Промышленная <span className="text-amber-400">вентиляция</span> из полипропилена
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-2xl leading-relaxed">
            Воздуховоды, отводы, тройники и фасонные изделия — химически стойкие элементы вентиляции для агрессивных сред.
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
            <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-800/50"><img src="/images/ventilyatsiya-hero-1.png" alt="Вентиляция из полипропилена" className="w-full object-contain" /></div>
            <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-800/50"><img src="/images/ventilyatsiya-hero-2.png" alt="Фасонные элементы вентиляции" className="w-full object-contain" /></div>
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
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <section id="opisanie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Элементы промышленной вентиляции</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Мы производим полный спектр элементов промышленной вентиляции из полипропилена и ПВХ круглого и прямоугольного сечения для работы с агрессивными средами.</p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">{whyUs.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
        </section>

        <section id="primenenie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{applications.map((a, i) => (<div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"><a.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-foreground">{a.text}</span></div>))}</div>
        </section>

        <section id="vidy" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды элементов</h2>
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
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Каталог элементов вентиляции</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <nav className="md:w-[220px] shrink-0"><ul className="space-y-0.5">{category.subcategories.map((sub, i) => { const isSelected = selectedSubId === sub.id; return (<li key={sub.id}><button onClick={() => setSelectedSubId(isSelected ? null : sub.id)} className={`group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left transition-colors ${isSelected ? "bg-primary/10 border border-primary/30" : "hover:bg-muted border border-transparent"}`}><span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>{catIndex}.{i + 1}</span><span className={`transition-colors ${isSelected ? "text-primary font-semibold" : "text-foreground group-hover:text-primary"}`}>{sub.name}</span></button></li>); })}</ul></nav>
              <div className="flex-1">{(() => {
                const sel = category.subcategories.find((s) => s.id === selectedSubId);
                if (sel) return (<div className="rounded-xl border border-border bg-card overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200"><div className="aspect-[16/9] bg-muted flex items-center justify-center">{sel.image ? <img src={sel.image} alt={sel.name} className="w-full h-full object-contain" /> : <ImageOff className="h-12 w-12 text-muted-foreground/40" />}</div><div className="p-5"><h3 className="text-lg font-bold text-foreground mb-2">{sel.name}</h3>{sel.externalPath && <Link to={sel.externalPath} className="text-sm font-medium text-primary hover:underline">Перейти на страницу →</Link>}</div></div>);
                return (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{category.subcategories.map((sub, i) => { const cc = (<><div className="aspect-[4/3] bg-muted flex items-center justify-center">{sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" /> : <ImageOff className="h-10 w-10 text-muted-foreground/40" />}</div><div className="px-3 py-2.5"><p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p><p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">{sub.name}</p></div></>); if (sub.externalPath) return <Link key={sub.id} to={sub.externalPath} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all block">{cc}</Link>; return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left">{cc}</button>; })}</div>);
              })()}</div>
            </div>
          </section>
        )}

        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card><CardContent className="p-6">
            <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Готовы заказать вентиляционные элементы?</h2>
            <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — расчёт стоимости в течение 24 часов.</p>
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

const VentilyatsiyaPage = () => (<CartProvider><Inner /></CartProvider>);
export default VentilyatsiyaPage;
