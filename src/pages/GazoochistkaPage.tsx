import { useState } from "react";
import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { ProductGrid, AdvantagesGrid, DescriptionBlock, FAQSection } from "@/components/corporate/sections";
import { findCategory } from "@/data/catalog";
import { Settings, ShieldCheck, Clock, Truck, Wrench, FlaskConical, ImageOff, Factory, Wind, Beaker, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/* ── static data ── */

const whyUs = [
  "Собственное производство газоочистного оборудования из химически стойких полимеров",
  "Проектирование систем очистки под конкретные загрязнители и объёмы",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, пусконаладка",
  "Соответствие экологическим нормам ПДК и требованиям Роспотребнадзора",
];

const applications = [
  { icon: Factory, text: "Очистка промышленных газовых выбросов от кислотных паров" },
  { icon: Beaker, text: "Улавливание паров щелочей, хлора, аммиака и других агрессивных веществ" },
  { icon: Wind, text: "Нейтрализация газов гальванических и травильных производств" },
  { icon: Settings, text: "Очистка вентиляционных выбросов химических лабораторий" },
  { icon: Shield, text: "Системы газоочистки для пищевых и фармацевтических предприятий" },
  { icon: FlaskConical, text: "Улавливание аэрозолей и тумана из технологических процессов" },
];

const modifications = [
  { title: "Скрубберы", items: ["Вертикальные насадочные скрубберы", "Горизонтальные скрубберы", "Скрубберы с орошением для нейтрализации кислотных паров"] },
  { title: "ФВГ — фильтры волокнистые", items: ["Фильтры для улавливания тумана и аэрозолей", "Волокнистые элементы из полипропилена", "Эффективность очистки до 99,5 %"] },
  { title: "Каплеуловители", items: ["Ламельные каплеуловители", "Сетчатые каплеуловители", "Применение в составе скрубберов и вентиляционных систем"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Разработаем систему газоочистки под ваши загрязнители и объёмы." },
  { icon: FlaskConical, title: "Точный подбор оборудования", text: "Учтём состав газов, температуру и требования к ПДК." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый элемент проходит проверку на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку по РФ." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение, гарантийное обслуживание." },
  { icon: Shield, title: "Документация", text: "Паспорта, сертификаты, инструкции по эксплуатации." },
];

const stats = [
  { value: "Скрубберы / ФВГ", label: "типы оборудования" },
  { value: "PP / PVC", label: "материалы" },
  { value: "от 14 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqItems = [
  { q: "Какие типы газоочистного оборудования?", a: "Скрубберы (вертикальные и горизонтальные), фильтры ФВГ, каплеуловители." },
  { q: "Из каких материалов?", a: "Полипропилен (PP) и ПВХ (PVC) — стойкие к агрессивным газам и парам." },
  { q: "Какая производительность?", a: "От 500 до 100 000 м³/ч в зависимости от модели." },
  { q: "Сроки изготовления?", a: "14–30 рабочих дней." },
  { q: "Выполняете монтаж?", a: "Да, шеф-монтаж и пусконаладка включены." },
];

/* ── component ── */

const GazoochistkaPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("gazoochistka");
  const catIndex = 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; }
    toast.success("Заявка отправлена!");
    setForm({ name: "", phone: "", email: "", description: "" });
  };

  return (
    <CorporatePageShell
      title="Газоочистное оборудование из полимеров"
      subtitle="Скрубберы, фильтры и каплеуловители — эффективная очистка промышленных газовых выбросов!"
      heroImage="/images/gazoochistka-hero-1.png"
      heroImageAlt="Газоочистное оборудование"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Газоочистка" },
      ]}
      stats={stats}
    >
      <DescriptionBlock
        id="opisanie"
        title="Почему выбирают нас"
        features={whyUs}
        applicationsTitle="Области применения"
        applications={applications}
      />

      <ProductGrid
        id="vidy"
        title="Виды оборудования"
        products={modifications}
      />

      <AdvantagesGrid
        id="preimushchestva"
        title="Преимущества сотрудничества"
        items={advantages}
      />

      {category && (
        <section id="katalog" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Каталог газоочистного оборудования</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <nav className="md:w-[220px] shrink-0"><ul className="space-y-0.5">{category.subcategories.map((sub, i) => { const isSelected = selectedSubId === sub.id; return (<li key={sub.id}><button onClick={() => setSelectedSubId(isSelected ? null : sub.id)} className={`group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left transition-colors ${isSelected ? "bg-primary/10 border border-primary/30" : "hover:bg-muted border border-transparent"}`}><span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>{catIndex}.{i + 1}</span><span className={`transition-colors ${isSelected ? "text-primary font-semibold" : "text-foreground group-hover:text-primary"}`}>{sub.name}</span></button></li>); })}</ul></nav>
            <div className="flex-1">{(() => {
              const sel = category.subcategories.find((s) => s.id === selectedSubId);
              if (sel) return (<div className="rounded-xl border border-border bg-card overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200"><div className="aspect-[16/9] bg-muted flex items-center justify-center">{sel.image ? <img src={sel.image} alt={sel.name} className="w-full h-full object-contain" /> : <ImageOff className="h-12 w-12 text-muted-foreground/40" />}</div><div className="p-5"><h3 className="text-lg font-bold text-foreground mb-2">{sel.name}</h3><p className="text-sm text-muted-foreground mb-4">{sel.description || "Описание уточняйте по запросу."}</p>{sel.externalPath ? <Link to={sel.externalPath} className="text-sm font-medium text-primary hover:underline">Перейти на страницу →</Link> : <a href="#cta-form" className="text-sm font-medium text-primary hover:underline">Запросить расчёт →</a>}</div></div>);
              return (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{category.subcategories.map((sub, i) => { const cc = (<><div className="aspect-[4/3] bg-muted flex items-center justify-center">{sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" /> : <ImageOff className="h-10 w-10 text-muted-foreground/40" />}</div><div className="px-3 py-2.5"><p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p><p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">{sub.name}</p></div></>); if (sub.externalPath) return <Link key={sub.id} to={sub.externalPath} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all block">{cc}</Link>; return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left">{cc}</button>; })}</div>);
            })()}</div>
          </div>
        </section>
      )}

      <FAQSection items={faqItems} />

      <section id="cta-form" className="mb-10 scroll-mt-20">
        <Card><CardContent className="p-6">
          <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Готовы заказать газоочистное оборудование?</h2>
          <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — расчёт стоимости в течение 24 часов.</p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
            <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
            <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
            <div className="space-y-1.5 sm:col-span-3"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите задачу…" rows={3} maxLength={1000} /></div>
            <div className="sm:col-span-3"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
          </form>
        </CardContent></Card>
      </section>
    </CorporatePageShell>
  );
};

export default GazoochistkaPage;
