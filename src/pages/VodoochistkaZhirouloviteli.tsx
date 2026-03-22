import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Droplets, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Utensils, Building2, Beef, Warehouse,
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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

/* ── static data ── */

const whyUs = [
  "Защита канализации от жировых отложений и засоров",
  "Соответствие требованиям СанПиН и нормам сброса",
  "Наземная и подземная установка",
  "Корпус из листового полипропилена — устойчив к агрессивным средам",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
];

const purposeItems = [
  { icon: Utensils, text: "Рестораны, кафе и столовые" },
  { icon: Factory, text: "Пищевые производства" },
  { icon: Beef, text: "Мясоперерабатывающие комбинаты" },
  { icon: Building2, text: "Гостиницы и санатории" },
  { icon: Warehouse, text: "Фабрики-кухни и кейтеринг" },
  { icon: Droplets, text: "Молочные и масложировые заводы" },
];

const typeCards = [
  {
    title: "Подземные вертикальные",
    desc: "Цилиндрический корпус для заглублённого монтажа. Минимальная занимаемая площадь, обслуживание через горловину.",
    image: "/images/zhu-underground-ral.jpg",
    anchor: "podzemnye-vertikalnye",
  },
  {
    title: "Наземные вертикальные",
    desc: "Устанавливаются на ровную площадку внутри помещения или под навесом. Удобный доступ ко всем узлам.",
    image: "/images/zhu-vertical-ral.jpg",
    anchor: "nazemnye-vertikalnye",
  },
  {
    title: "Горизонтальные",
    desc: "Увеличенная зона отстаивания для больших объёмов стоков. Наземное и подземное исполнение.",
    image: "/images/zhu-horizontal-ral.jpg",
    anchor: "gorizontalnye",
  },
  {
    title: "Прямоугольные наземные",
    desc: "Корпус прямоугольного сечения из листового ПП. Оптимальны для ограниченных пространств.",
    image: "/images/zhu-rectangular-ral.jpg",
    anchor: "pryamougolnye",
  },
];

const models = [
  { article: "СЗПК.ЖУ.1.ПП", name: "ЖУ-1", throughput: "1", peakDischarge: "500", diameter: "800", height: "1300" },
  { article: "СЗПК.ЖУ.2.ПП", name: "ЖУ-2", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1600" },
  { article: "СЗПК.ЖУ.3.ПП", name: "ЖУ-3", throughput: "3", peakDischarge: "1500", diameter: "1200", height: "1500" },
  { article: "СЗПК.ЖУ.4.ПП", name: "ЖУ-4", throughput: "4", peakDischarge: "2000", diameter: "1350", height: "1550" },
  { article: "СЗПК.ЖУ.5.ПП", name: "ЖУ-5", throughput: "5", peakDischarge: "2500", diameter: "1350", height: "2000" },
  { article: "СЗПК.ЖУ.6.ПП", name: "ЖУ-6", throughput: "6", peakDischarge: "3000", diameter: "1450", height: "2000" },
  { article: "СЗПК.ЖУ.7.ПП", name: "ЖУ-7", throughput: "7", peakDischarge: "3500", diameter: "1550", height: "2000" },
  { article: "СЗПК.ЖУ.8.ПП", name: "ЖУ-8", throughput: "8", peakDischarge: "4000", diameter: "1650", height: "2000" },
  { article: "СЗПК.ЖУ.9.ПП", name: "ЖУ-9", throughput: "9", peakDischarge: "4500", diameter: "1750", height: "2000" },
  { article: "СЗПК.ЖУ.10.ПП", name: "ЖУ-10", throughput: "10", peakDischarge: "5000", diameter: "1850", height: "2000" },
  { article: "СЗПК.ЖУ.15.ПП", name: "ЖУ-15", throughput: "15", peakDischarge: "7500", diameter: "2200", height: "2000" },
];

const processSteps = [
  { step: "1", title: "Приём стоков", desc: "Жиросодержащие сточные воды поступают через входной патрубок в приёмную камеру." },
  { step: "2", title: "Гравитационное разделение", desc: "Жиры и масла всплывают на поверхность благодаря разности плотностей. Тяжёлые частицы оседают на дно." },
  { step: "3", title: "Накопление жира", desc: "Жировой слой накапливается в верхней зоне и периодически удаляется (вручную или автоматически)." },
  { step: "4", title: "Отвод очищенной воды", desc: "Очищенная вода забирается из средней зоны через выходной патрубок и направляется в канализацию." },
];

const optionsList = [
  "Дренажный насос для откачки осадка",
  "Датчик уровня жира с сигнализацией",
  "Лестница для обслуживания (подземные модели)",
  "Удлинённая горловина для заглублённого монтажа",
  "Утеплённый корпус для эксплуатации при низких температурах",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальный подбор", text: "Рассчитаем производительность под ваш объект и тип стоков." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Гидравлические испытания каждого изделия перед отгрузкой." },
  { icon: Clock, title: "Оперативность", text: "Изготовление — 10–20 рабочих дней, монтаж — 1–3 дня." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: Truck, title: "Доставка", text: "Доставка по всей России. Упаковка для безопасной транспортировки." },
  { icon: FlaskConical, title: "Документация", text: "Паспорт изделия, сертификаты соответствия, инструкция по эксплуатации." },
];

/* ── component ── */

const VodoochistkaZhirouloviteliInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka">Водоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Жироуловители промышленные</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Промышленные жироуловители
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Эффективное удаление жиров, масел и нефтепродуктов из сточных вод предприятий общественного питания и пищевой промышленности.
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <img src="/images/zhu-vertical-ral.jpg" alt="Наземный вертикальный жироуловитель" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
            <img src="/images/zhu-rectangular-ral.jpg" alt="Прямоугольный жироуловитель" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Жироуловители для промышленных и коммерческих объектов
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Промышленные жироуловители предназначены для очистки сточных вод от неэмульгированных жиров, масел и жировых отложений перед сбросом в систему канализации. Применяются для очистки больших объёмов сточных вод — до 15 л/с. Выпускаются в стандартном исполнении и под заказ с учётом местных условий монтажа. Промышленное оборудование может быть в наземном и подземном исполнении, круглого или прямоугольного сечения.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Наземные жироуловители устанавливаются в технических и подвальных помещениях с учётом удобства подхода для обслуживания и подключаются к производственной канализационной сети. Подземные модели размещаются в грунте — на поверхность выходит только крышка технического колодца. Монтаж производится на бетонное основание (H-200 мм), с обсыпкой пескоцементной смесью 1:10, слоем не менее 200 мм.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают наши жироуловители:</h3>
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
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение и области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {purposeItems.map((area, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <area.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{area.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Виды */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды жироуловителей</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {typeCards.map((card, i) => (
              <Card key={i} className="border-border overflow-hidden">
                <div className="aspect-square bg-card p-2">
                  <img src={card.image} alt={card.title} className="w-full h-full object-contain" />
                </div>
                <CardContent className="p-3 pt-0">
                  <h3 className="text-xs font-semibold text-foreground mb-1">{card.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-snug">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3: Модельный ряд */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Модельный ряд</h2>
          <div className="rounded-lg border border-border overflow-auto mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Артикул</TableHead>
                  <TableHead className="text-xs">Модель</TableHead>
                  <TableHead className="text-xs text-right">л/с</TableHead>
                  <TableHead className="text-xs text-right">Пиковый сброс, л</TableHead>
                  <TableHead className="text-xs text-right">Ø корпуса, мм</TableHead>
                  <TableHead className="text-xs text-right">Высота, мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m) => (
                  <TableRow
                    key={m.article}
                    className="cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => navigate(`/product/${encodeURIComponent(m.article)}`)}
                  >
                    <TableCell className="text-xs font-mono font-medium text-primary underline">{m.article}</TableCell>
                    <TableCell className="text-xs font-medium">{m.name}</TableCell>
                    <TableCell className="text-xs text-right">{m.throughput}</TableCell>
                    <TableCell className="text-xs text-right">{m.peakDischarge}</TableCell>
                    <TableCell className="text-xs text-right">{m.diameter}</TableCell>
                    <TableCell className="text-xs text-right">{m.height}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground">
            Возможно изготовление жироуловителей по индивидуальным размерам и производительности.
          </p>
        </section>

        {/* Section 4: Принцип работы */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Принцип работы</h2>
          <div className="space-y-3">
            {processSteps.map((s) => (
              <div key={s.step} className="flex gap-3 items-start rounded-lg border border-border bg-card p-3">
                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {s.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Доп. опции */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Дополнительные опции</h2>
          <ul className="space-y-1.5">
            {optionsList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6: Преимущества */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {partnershipAdvantages.map((a, i) => (
              <Card key={i} className="border-border">
                <CardContent className="flex items-start gap-3 p-4">
                  <a.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 7: Горизонтальные жироуловители */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Горизонтальные жироуловители</h2>
          <div className="rounded-lg border border-border overflow-auto text-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Артикул</TableHead>
                  <TableHead className="text-xs text-right">Произв., л/с</TableHead>
                  <TableHead className="text-xs text-right">Габариты, мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { article: "ПЭ-3,5-500", throughput: "1", dimensions: "Ø800×L1200" },
                  { article: "ПЭ-7-1000", throughput: "2", dimensions: "Ø1000×L1500" },
                  { article: "ПЭ-11-1500", throughput: "3", dimensions: "Ø1000×L2000" },
                  { article: "ПЭ-15-2000", throughput: "4", dimensions: "Ø1200×L2000" },
                  { article: "ПЭ-18-2500", throughput: "5", dimensions: "Ø1200×L2400" },
                  { article: "ПЭ-22-3000", throughput: "6", dimensions: "Ø1280×L2600" },
                  { article: "ПЭ-25-3500", throughput: "7", dimensions: "Ø1280×L2900" },
                  { article: "ПЭ-29-4000", throughput: "8", dimensions: "Ø1280×L3300" },
                  { article: "ПЭ-32-4500", throughput: "9", dimensions: "Ø1280×L3750" },
                  { article: "ПЭ-36-5000", throughput: "10", dimensions: "Ø1400×L3500" },
                  { article: "ПЭ-54-7500", throughput: "15", dimensions: "Ø1600×L3900" },
                  { article: "ПЭ-72-10000", throughput: "20", dimensions: "Ø1600×L5100" },
                  { article: "ПЭ-90-12500", throughput: "25", dimensions: "Ø1600×L6300" },
                ].map((m) => (
                  <TableRow key={m.article} className="even:bg-muted/30">
                    <TableCell className="text-xs font-medium">{m.article}</TableCell>
                    <TableCell className="text-xs text-right">{m.throughput}</TableCell>
                    <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Возможно изготовление горизонтальных жироуловителей по индивидуальным размерам.
          </p>
        </section>

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 rounded-lg border border-border bg-card p-6">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Оставить заявку</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs">Имя *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs">Телефон *</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">E-mail</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="description" className="text-xs">Описание задачи</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Тип объекта, требуемая производительность, особые условия…" rows={3} />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button>
            </div>
          </form>
        </section>

        <PageFooter />
      </main>
    </>
  );
};

const VodoochistkaZhirouloviteli = () => (
  <CartProvider>
    <VodoochistkaZhirouloviteliInner />
  </CartProvider>
);

export default VodoochistkaZhirouloviteli;
