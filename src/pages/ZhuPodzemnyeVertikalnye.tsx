import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { Check, Droplets, Factory, Wrench, ShieldCheck, Clock, Truck, FlaskConical, Settings, Utensils, Building2, Beef, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

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
  "Надставка технического колодца (10–50 см)",
  "Лестница для обслуживания",
  "Крышка жироуловителя промышленного (чугун / ПП)",
  "Дозатор биопрепаратов",
  "Сигнализатор уровня жира",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
];

const Inner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; }
    toast.success("Заявка отправлена!");
    setForm({ name: "", phone: "", email: "", description: "" });
  };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka">Водоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka/zhirouloviteli">Жироуловители</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Подземные вертикальные</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Подземные вертикальные жироуловители</h1>
          <p className="text-sm text-muted-foreground mb-5">Цилиндрический корпус для заглублённого монтажа. Минимальная занимаемая площадь, обслуживание через горловину технического колодца.</p>
          <Button onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })} className="gap-2">Получить расчёт стоимости</Button>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            <img src="/images/zhu-pv-hero-ral7032.jpg" alt="Подземный вертикальный жироуловитель" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
            <img src="/images/zhu-pv-schema1.png" alt="Схема жироуловителя — вид спереди" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
            <img src="/images/zhu-pv-schema2.png" alt="Схема жироуловителя — разрез" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
          </div>
        </section>


        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "opisanie", label: "Описание" },
            { id: "modeli", label: "Модели" },
            { id: "princip", label: "Принцип работы" },
            { id: "opcii", label: "Опции" },
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
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>Подземные вертикальные жироуловители размещаются в грунте — на поверхность выходит только крышка технического колодца. Монтаж производится на бетонное основание (H-200 мм), с обсыпкой пескоцементной смесью 1:10, слоем не менее 200 мм.</p>
            <p>Предназначены для улавливания и удаления неэмульгированных жиров и масел из сточных вод кухонь, ресторанов, мясоперерабатывающих предприятий в соответствии со СНиП 2.04.01-85. Корпус из пищевого полипропилена, срок службы — не менее 25 лет.</p>
          </div>
        </section>

        <section id="modeli" className="mb-10">
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
                  <TableRow key={m.article} className="cursor-pointer hover:bg-primary/5 transition-colors" onClick={() => navigate(`/product/${encodeURIComponent(m.article)}`)}>
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
          <p className="text-xs text-muted-foreground">Возможно изготовление по индивидуальным размерам.</p>
        </section>

        <section id="princip" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Принцип работы</h2>
          <div className="space-y-3">
            {processSteps.map((s) => (
              <div key={s.step} className="flex gap-3 items-start rounded-lg border border-border bg-card p-3">
                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">{s.step}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="opcii" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Дополнительное оборудование</h2>
          <ul className="space-y-1.5">
            {optionsList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="cta-form" className="mb-10 rounded-lg border border-border bg-card p-6">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Оставить заявку</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label htmlFor="name" className="text-xs">Имя *</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" /></div>
            <div className="space-y-1.5"><Label htmlFor="phone" className="text-xs">Телефон *</Label><Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" /></div>
            <div className="space-y-1.5"><Label htmlFor="email" className="text-xs">E-mail</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="description" className="text-xs">Описание задачи</Label><Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Тип объекта, требуемая производительность…" rows={3} /></div>
            <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
          </form>
        </section>
        <PageFooter />
      </main>
    </>
  );
};

const ZhuPodzemnyeVertikalnye = () => (<CartProvider><Inner /></CartProvider>);
export default ZhuPodzemnyeVertikalnye;
