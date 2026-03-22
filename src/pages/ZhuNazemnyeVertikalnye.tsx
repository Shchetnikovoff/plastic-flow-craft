import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

const models = [
  { article: "СЗПК.ЖУН.1.ПП", name: "ЖУН-1", throughput: "1", peakDischarge: "500", diameter: "800", height: "1300" },
  { article: "СЗПК.ЖУН.2.ПП", name: "ЖУН-2", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1600" },
  { article: "СЗПК.ЖУН.3.ПП", name: "ЖУН-3", throughput: "3", peakDischarge: "1500", diameter: "1200", height: "1500" },
  { article: "СЗПК.ЖУН.4.ПП", name: "ЖУН-4", throughput: "4", peakDischarge: "2000", diameter: "1350", height: "1550" },
  { article: "СЗПК.ЖУН.5.ПП", name: "ЖУН-5", throughput: "5", peakDischarge: "2500", diameter: "1350", height: "2000" },
  { article: "СЗПК.ЖУН.6.ПП", name: "ЖУН-6", throughput: "6", peakDischarge: "3000", diameter: "1450", height: "2000" },
  { article: "СЗПК.ЖУН.7.ПП", name: "ЖУН-7", throughput: "7", peakDischarge: "3500", diameter: "1550", height: "2000" },
  { article: "СЗПК.ЖУН.8.ПП", name: "ЖУН-8", throughput: "8", peakDischarge: "4000", diameter: "1650", height: "2000" },
  { article: "СЗПК.ЖУН.9.ПП", name: "ЖУН-9", throughput: "9", peakDischarge: "4500", diameter: "1750", height: "2000" },
  { article: "СЗПК.ЖУН.10.ПП", name: "ЖУН-10", throughput: "10", peakDischarge: "5000", diameter: "1850", height: "2000" },
  { article: "СЗПК.ЖУН.15.ПП", name: "ЖУН-15", throughput: "15", peakDischarge: "7500", diameter: "2200", height: "2000" },
];

const optionsList = [
  "Откидная крышка для обслуживания",
  "Датчик уровня жира с сигнализацией",
  "Дренажный насос для откачки осадка",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
  "Утеплённый корпус для эксплуатации при низких температурах",
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
            <BreadcrumbItem><BreadcrumbPage>Наземные вертикальные</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Наземные вертикальные жироуловители</h1>
          <p className="text-sm text-muted-foreground mb-5">Устанавливаются на ровную площадку внутри помещения или под навесом. Удобный доступ ко всем узлам, откидная крышка для обслуживания.</p>
          <Button onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })} className="gap-2">Получить расчёт стоимости</Button>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <img src="/images/zhu-nv-hero-ral7032.jpg" alt="Наземный вертикальный жироуловитель" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
            <img src="/images/zhu-pv-hero-ral7032.jpg" alt="Подземный вертикальный жироуловитель" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>Наземные вертикальные жироуловители устанавливаются в технических и подвальных помещениях с учётом удобства подхода для обслуживания и подключаются к производственной канализационной сети. Конструкция без технического колодца — корпус открытый, с откидной крышкой.</p>
            <p>Корпус из листового полипропилена, устойчив к агрессивным средам. Производительность от 1 до 15 л/с. Изготовление по индивидуальным размерам и конфигурации.</p>
          </div>
        </section>

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

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Дополнительное оборудование</h2>
          <ul className="space-y-1.5">
            {optionsList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /><span>{item}</span>
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

const ZhuNazemnyeVertikalnye = () => (<CartProvider><Inner /></CartProvider>);
export default ZhuNazemnyeVertikalnye;
