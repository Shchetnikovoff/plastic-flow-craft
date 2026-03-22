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
  { article: "СЗПК.ЖУП.1.ПП", name: "ЖУП-1", throughput: "1", peakDischarge: "500", dimensions: "600×400×800" },
  { article: "СЗПК.ЖУП.2.ПП", name: "ЖУП-2", throughput: "2", peakDischarge: "1000", dimensions: "800×500×900" },
  { article: "СЗПК.ЖУП.3.ПП", name: "ЖУП-3", throughput: "3", peakDischarge: "1500", dimensions: "1000×600×1000" },
  { article: "СЗПК.ЖУП.4.ПП", name: "ЖУП-4", throughput: "4", peakDischarge: "2000", dimensions: "1200×700×1000" },
  { article: "СЗПК.ЖУП.5.ПП", name: "ЖУП-5", throughput: "5", peakDischarge: "2500", dimensions: "1400×800×1100" },
  { article: "СЗПК.ЖУП.6.ПП", name: "ЖУП-6", throughput: "6", peakDischarge: "3000", dimensions: "1500×900×1100" },
  { article: "СЗПК.ЖУП.8.ПП", name: "ЖУП-8", throughput: "8", peakDischarge: "4000", dimensions: "1800×1000×1200" },
  { article: "СЗПК.ЖУП.10.ПП", name: "ЖУП-10", throughput: "10", peakDischarge: "5000", dimensions: "2000×1100×1200" },
  { article: "СЗПК.ЖУП.15.ПП", name: "ЖУП-15", throughput: "15", peakDischarge: "7500", dimensions: "2400×1200×1300" },
];

const optionsList = [
  "Откидная крышка для обслуживания",
  "Датчик уровня жира с сигнализацией",
  "Дренажный насос для откачки осадка",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
  "Рёбра жёсткости для повышенных нагрузок",
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
            <BreadcrumbItem><BreadcrumbPage>Прямоугольные наземные</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Прямоугольные наземные жироуловители</h1>
          <p className="text-sm text-muted-foreground mb-5">Корпус прямоугольного сечения из листового ПП с рёбрами жёсткости. Оптимальны для встраивания в ограниченные пространства технических помещений.</p>
          <Button onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })} className="gap-2">Получить расчёт стоимости</Button>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <img src="/images/zhu-p-hero-ral7032.jpg" alt="Прямоугольный жироуловитель" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
            <img src="/images/zhu-nv-hero-ral7032.jpg" alt="Вертикальный жироуловитель" className="rounded-lg border border-border object-contain w-full aspect-[4/3]" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>Прямоугольные жироуловители из листового полипропилена с рёбрами жёсткости — оптимальное решение для ограниченных пространств технических помещений. Компактная форма позволяет устанавливать оборудование вплотную к стенам.</p>
            <p>Изготавливаются по индивидуальным размерам с учётом производительности и особенностей объекта. Производительность от 1 до 15 л/с. Откидная крышка обеспечивает удобное обслуживание.</p>
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
                  <TableHead className="text-xs text-right">Произв., л/с</TableHead>
                  <TableHead className="text-xs text-right">Пиковый сброс, л</TableHead>
                  <TableHead className="text-xs text-right">Габариты (Д×Ш×В), мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m) => (
                  <TableRow key={m.article} className="cursor-pointer hover:bg-primary/5 transition-colors" onClick={() => navigate(`/product/${encodeURIComponent(m.article)}`)}>
                    <TableCell className="text-xs font-mono font-medium text-primary underline">{m.article}</TableCell>
                    <TableCell className="text-xs font-medium">{m.name}</TableCell>
                    <TableCell className="text-xs text-right">{m.throughput}</TableCell>
                    <TableCell className="text-xs text-right">{m.peakDischarge}</TableCell>
                    <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
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

const ZhuPryamougolnye = () => (<CartProvider><Inner /></CartProvider>);
export default ZhuPryamougolnye;
