import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical, ImageOff, Droplets, Factory, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";
import { knsSvtProducts } from "@/data/knsSvtProducts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const whyUs = [
  "Собственное производство КНС из полипропилена и стеклопластика (SVT)",
  "Проектирование под конкретные условия эксплуатации и грунты",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, пусконаладка",
  "Соответствие ГОСТ и СП на канализационные насосные станции",
];

const applications = [
  { icon: Droplets, text: "Перекачка хозяйственно-бытовых сточных вод" },
  { icon: Factory, text: "Канализация промышленных предприятий" },
  { icon: Settings, text: "Ливневая канализация и дренаж" },
  { icon: Shield, text: "Водоотведение коттеджных посёлков" },
  { icon: FlaskConical, text: "Перекачка агрессивных стоков" },
  { icon: Wrench, text: "Системы водоснабжения и повышения давления" },
];

const modifications = [
  { title: "КНС в корпусе SVT (стеклопластик)", items: ["Высокая прочность и коррозионная стойкость", "Подземное размещение", "Диаметр от 800 мм до 3000 мм", "Глубина заложения до 10 м"] },
  { title: "КНС в корпусе из полипропилена", items: ["Химическая стойкость к агрессивным стокам", "Сварная конструкция с рёбрами жёсткости", "Диаметр от 800 мм до 2500 мм", "Облегчённый монтаж"] },
  { title: "Комплектация", items: ["Погружные насосы (Grundfos, Wilo, KSB)", "Запорная арматура и обратные клапаны", "Направляющие и цепные системы", "Шкаф управления с датчиками уровня", "Вентиляция и люки доступа"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Спроектируем КНС под ваши расходы и условия." },
  { icon: FlaskConical, title: "Точный расчёт", text: "Гидравлический расчёт, подбор насосов и автоматики." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Заводские испытания на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Монтаж, пусконаладка, гарантийное обслуживание." },
  { icon: Shield, title: "Документация", text: "Паспорта, проектная документация, сертификаты." },
];

const Inner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("kns");
  const catIndex = 9;

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
              <BreadcrumbItem><BreadcrumbPage className="text-slate-200">КНС</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-[11px] text-amber-400 uppercase tracking-[0.2em] font-semibold mb-3">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Канализационные <span className="text-amber-400">насосные станции</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-2xl leading-relaxed">
            КНС из полипропилена и стеклопластика — надёжное водоотведение для любых объектов. Проектирование, производство и монтаж по всей России.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Button onClick={scrollToForm} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-full shadow-lg shadow-amber-500/25">
              Получить расчёт стоимости
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("modeli")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:text-amber-400 hover:border-slate-500 rounded-full"
            >
              Смотреть модели
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-800/50"><img src="/images/kns-hero-1.png" alt="КНС канализационная насосная станция" className="w-full object-contain" /></div>
            <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-800/50"><img src="/images/kns-hero-2.png" alt="КНС в корпусе SVT" className="w-full object-contain" /></div>
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
            { id: "modeli", label: "Модели" },
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
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase border-l-4 border-amber-400 pl-3">КНС: от проектирования до монтажа</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Мы проектируем и производим канализационные насосные станции в корпусах из полипропилена и стеклопластика (SVT) для хозяйственно-бытовых, промышленных и ливневых стоков.</p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">{whyUs.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground rounded-lg bg-white border border-slate-200 px-3 py-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
        </section>

        <section id="primenenie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{applications.map((a, i) => (<div key={i} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 hover:border-amber-400/40 hover:bg-amber-50/40 transition-colors"><a.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-foreground">{a.text}</span></div>))}</div>
        </section>

        <section id="vidy" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Виды КНС</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (<AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-slate-200 bg-white px-4"><AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline hover:text-amber-600">{mod.title}</AccordionTrigger><AccordionContent><ul className="space-y-1.5 pb-2">{mod.items.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary mt-1">•</span><span>{item}</span></li>))}</ul></AccordionContent></AccordionItem>))}
          </Accordion>
        </section>

        <section id="preimushchestva" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{advantages.map((adv) => (<Card key={adv.title} className="hover:border-amber-400/50 hover:shadow-md transition-all"><CardContent className="p-4 flex items-start gap-3"><adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p><p className="text-xs text-muted-foreground">{adv.text}</p></div></CardContent></Card>))}</div>
        </section>

        <section id="modeli" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Модельный ряд КНС</h2>
          <p className="text-sm text-muted-foreground mb-4">Стандартные модели КНС в корпусе из стеклопластика (SVT). Все станции комплектуются 2 насосами (1 рабочий + 1 резервный).</p>
          <div className="rounded-lg border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-900 hover:bg-slate-900 border-slate-700">
                  <TableHead className="text-xs whitespace-nowrap text-amber-400 font-semibold">Модель</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-center text-amber-400 font-semibold">Ø корпуса, мм</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-center text-amber-400 font-semibold">Высота, мм</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-center text-amber-400 font-semibold">Произв-ть, м³/ч</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-center text-amber-400 font-semibold">Напор, м</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-center text-amber-400 font-semibold">Мощность, кВт</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-center text-amber-400 font-semibold">Насосы</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {knsSvtProducts.map((p) => (
                  <TableRow key={p.article} className="odd:bg-white even:bg-slate-50 hover:bg-amber-50/40 transition-colors">
                    <TableCell className="text-sm font-medium whitespace-nowrap">{p.model}</TableCell>
                    <TableCell className="text-sm text-center">{p.diameter}</TableCell>
                    <TableCell className="text-sm text-center">{p.height}</TableCell>
                    <TableCell className="text-sm text-center">{p.flow}</TableCell>
                    <TableCell className="text-sm text-center">{p.head}</TableCell>
                    <TableCell className="text-sm text-center">{p.pumpPower}</TableCell>
                    <TableCell className="text-sm text-center">{p.pumpCount} (1+1)</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">* Возможно изготовление КНС по индивидуальным параметрам. Для расчёта стоимости оставьте заявку.</p>
        </section>

        {category && (
          <section id="katalog" className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Каталог КНС</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{category.subcategories.map((sub, i) => {
              const cc = (<><div className="aspect-[4/3] bg-muted flex items-center justify-center">{sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" /> : <ImageOff className="h-10 w-10 text-muted-foreground/40" />}</div><div className="px-3 py-2.5"><p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p><p className="text-sm font-medium text-foreground group-hover:text-amber-500 transition-colors mt-0.5">{sub.name}</p></div></>);
              const path = (sub as any).externalPath;
              if (path) return <Link key={sub.id} to={path} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] transition-all text-left">{cc}</Link>;
              return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] transition-all text-left">{cc}</button>;
            })}</div>
          </section>
        )}

        <section id="cta-form" className="mb-10 scroll-mt-20">
          <div className="rounded-xl bg-slate-900 text-white p-6 sm:p-8">
            <h2 className="text-base font-bold text-white mb-2 tracking-wide uppercase">Готовы заказать КНС?</h2>
            <p className="text-sm text-slate-300 mb-5">Оставьте заявку — расчёт в течение 24 часов.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
              <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
              <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите задачу…" rows={3} maxLength={1000} /></div>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-full">Отправить заявку</Button></div>
            </form>
          </div>
        </section>
        <PageFooter />
      </main>
    </>
  );
};

const KnsPage = () => (<CartProvider><Inner /></CartProvider>);
export default KnsPage;
