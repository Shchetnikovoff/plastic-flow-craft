import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Droplets, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Waves, Fuel, Mountain,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

/* ── static data ── */

const whyUs = [
  "Подземная установка — экономия площади на объекте",
  "Корпус из спиральновитых труб СВТ — высочайшая прочность и кольцевая жёсткость",
  "Срок службы — свыше 50 лет",
  "Изготовление по чертежам и ТЗ заказчика",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Гарантия 5 лет на все изделия",
];

const losModels = [
  { throughput: "2", diameter: "1500", length: "2600", drop: "120", pipes: "110", sorbent: "0,5" },
  { throughput: "5", diameter: "1500", length: "6500", drop: "200", pipes: "160", sorbent: "1" },
  { throughput: "10", diameter: "2000", length: "5500", drop: "200", pipes: "160", sorbent: "2" },
  { throughput: "15", diameter: "2000", length: "7400", drop: "200", pipes: "200", sorbent: "2,7" },
  { throughput: "20", diameter: "2000", length: "9000", drop: "300", pipes: "200", sorbent: "3,6" },
  { throughput: "25", diameter: "2000", length: "10000", drop: "300", pipes: "200", sorbent: "4,5" },
  { throughput: "30", diameter: "2000", length: "11500", drop: "300", pipes: "250", sorbent: "5,4" },
  { throughput: "40", diameter: "2400", length: "11000", drop: "300", pipes: "250", sorbent: "6,4" },
  { throughput: "50", diameter: "2400", length: "12200", drop: "300", pipes: "250", sorbent: "8,4" },
  { throughput: "60", diameter: "2400", length: "13000", drop: "300", pipes: "315", sorbent: "10" },
  { throughput: "70", diameter: "3000", length: "9500", drop: "400", pipes: "315", sorbent: "11,5" },
  { throughput: "80", diameter: "3000", length: "11800", drop: "400", pipes: "315", sorbent: "13,1" },
  { throughput: "90", diameter: "3000", length: "13600", drop: "400", pipes: "400", sorbent: "15,1" },
];

const peskModels = [
  { throughput: "2", diameter: "1500", length: "2600", drop: "120", pipes: "110" },
  { throughput: "5", diameter: "1500", length: "6500", drop: "200", pipes: "160" },
  { throughput: "10", diameter: "2000", length: "5500", drop: "200", pipes: "160" },
  { throughput: "15", diameter: "2000", length: "7400", drop: "200", pipes: "200" },
  { throughput: "20", diameter: "2000", length: "9000", drop: "300", pipes: "200" },
  { throughput: "25", diameter: "2000", length: "10000", drop: "300", pipes: "200" },
  { throughput: "30", diameter: "2000", length: "11500", drop: "300", pipes: "250" },
  { throughput: "40", diameter: "2400", length: "11000", drop: "300", pipes: "250" },
  { throughput: "50", diameter: "2400", length: "12200", drop: "300", pipes: "250" },
  { throughput: "60", diameter: "2400", length: "13000", drop: "300", pipes: "315" },
  { throughput: "70", diameter: "3000", length: "9500", drop: "400", pipes: "315" },
  { throughput: "80", diameter: "3000", length: "11800", drop: "400", pipes: "315" },
  { throughput: "90", diameter: "3000", length: "13600", drop: "400", pipes: "400" },
];

const neftModels = [
  { throughput: "2", diameter: "1500", length: "2600", pipes: "110" },
  { throughput: "5", diameter: "1500", length: "6500", pipes: "160" },
  { throughput: "10", diameter: "2000", length: "5500", pipes: "160" },
  { throughput: "15", diameter: "2000", length: "7400", pipes: "200" },
  { throughput: "20", diameter: "2000", length: "9000", pipes: "200" },
  { throughput: "25", diameter: "2000", length: "10000", pipes: "200" },
  { throughput: "30", diameter: "2000", length: "11500", pipes: "250" },
  { throughput: "40", diameter: "2400", length: "11000", pipes: "250" },
  { throughput: "50", diameter: "2400", length: "12200", pipes: "250" },
  { throughput: "60", diameter: "2400", length: "13000", pipes: "315" },
  { throughput: "70", diameter: "3000", length: "9500", pipes: "315" },
  { throughput: "80", diameter: "3000", length: "11800", pipes: "315" },
  { throughput: "90", diameter: "3000", length: "13600", pipes: "400" },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальное проектирование", text: "Разработка ЛОС под параметры объекта: состав стоков, производительность, глубина залегания." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Гидравлические испытания каждого изделия. Корпус из СВТ — кольцевая жёсткость SN8–SN16." },
  { icon: Clock, title: "Оперативность", text: "Изготовление — 15–25 рабочих дней. Монтаж — 2–5 дней." },
  { icon: Wrench, title: "Монтаж и сервис", text: "Шеф-монтаж, пусконаладка, обучение персонала, гарантийное обслуживание." },
  { icon: Truck, title: "Доставка по РФ", text: "Доставка спецтранспортом по всей России. Надёжная упаковка." },
  { icon: FlaskConical, title: "Документация", text: "Паспорт изделия, проект, сертификаты соответствия, инструкция по эксплуатации." },
];

/* ── component ── */

const VodoochistkaLosInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
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
            <BreadcrumbItem><BreadcrumbPage>ЛОС — локальные очистные сооружения</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Локальные очистные сооружения (ЛОС)
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Глубокая очистка хозяйственно-бытовых, ливневых и промышленных сточных вод. Корпус из спиральновитых труб СВТ для подземной установки.
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/los-hero-1.jpg" alt="Локальное очистное сооружение ЛОС" className="w-full object-contain" />
              <p className="text-xs text-muted-foreground p-2 text-center">ЛОС</p>
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/los-peskoulovitel-1.jpg" alt="Пескоуловитель" className="w-full object-contain" />
              <p className="text-xs text-muted-foreground p-2 text-center">Пескоуловитель</p>
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/los-nefteulovitel-1.jpg" alt="Нефтеуловитель" className="w-full object-contain" />
              <p className="text-xs text-muted-foreground p-2 text-center">Нефтеуловитель</p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Комплексные решения очистки сточных вод
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Локальные очистные сооружения (ЛОС) предназначены для глубокой очистки хозяйственно-бытовых, ливневых и производственных стоков до нормативов сброса в водоёмы рыбохозяйственного значения. В линейку входят: ЛОС (комплексная очистка), пескоуловители (удаление взвешенных частиц) и нефтеуловители (выделение нефтепродуктов).
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают наши ЛОС:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Product tabs */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>

          <Tabs defaultValue="los" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="los" className="text-xs sm:text-sm">ЛОС</TabsTrigger>
              <TabsTrigger value="pesk" className="text-xs sm:text-sm">Пескоуловитель</TabsTrigger>
              <TabsTrigger value="neft" className="text-xs sm:text-sm">Нефтеуловитель</TabsTrigger>
            </TabsList>

            {/* ЛОС tab */}
            <TabsContent value="los">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <img src="/images/los-hero-1.jpg" alt="ЛОС" className="w-full sm:w-48 object-contain rounded-lg border border-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Локальное очистное сооружение (ЛОС)</h3>
                  <p className="text-xs text-muted-foreground">
                    Глубокая очистка хозяйственно-бытовых, ливневых и промышленных стоков. Многоступенчатая система: механическая очистка, отстаивание, сорбционная доочистка. Корпус из спиральновитых труб СВТ обеспечивает подземную установку с кольцевой жёсткостью SN8–SN16.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Произв., л/с</TableHead>
                      <TableHead className="text-xs text-right">Ø, мм</TableHead>
                      <TableHead className="text-xs text-right">Длина, мм</TableHead>
                      <TableHead className="text-xs text-right">Перепад, мм</TableHead>
                      <TableHead className="text-xs text-right">Ø труб, мм</TableHead>
                      <TableHead className="text-xs text-right">Сорбент, м³</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {losModels.map((m, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-medium">{m.throughput}</TableCell>
                        <TableCell className="text-xs text-right">{m.diameter}</TableCell>
                        <TableCell className="text-xs text-right">{m.length}</TableCell>
                        <TableCell className="text-xs text-right">{m.drop}</TableCell>
                        <TableCell className="text-xs text-right">{m.pipes}</TableCell>
                        <TableCell className="text-xs text-right">{m.sorbent}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Пескоуловитель tab */}
            <TabsContent value="pesk">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <img src="/images/los-peskoulovitel-1.jpg" alt="Пескоуловитель" className="w-full sm:w-48 object-contain rounded-lg border border-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Пескоуловитель</h3>
                  <p className="text-xs text-muted-foreground">
                    Очистка поверхностных сточных вод от тонкодисперсных взвешенных частиц (песка, ила, грунта). Гравитационный принцип действия. Устанавливается как первая ступень очистки перед нефтеуловителем или ЛОС.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Произв., л/с</TableHead>
                      <TableHead className="text-xs text-right">Ø, мм</TableHead>
                      <TableHead className="text-xs text-right">Длина, мм</TableHead>
                      <TableHead className="text-xs text-right">Перепад, мм</TableHead>
                      <TableHead className="text-xs text-right">Ø труб, мм</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {peskModels.map((m, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-medium">{m.throughput}</TableCell>
                        <TableCell className="text-xs text-right">{m.diameter}</TableCell>
                        <TableCell className="text-xs text-right">{m.length}</TableCell>
                        <TableCell className="text-xs text-right">{m.drop}</TableCell>
                        <TableCell className="text-xs text-right">{m.pipes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Нефтеуловитель tab */}
            <TabsContent value="neft">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <img src="/images/los-nefteulovitel-1.jpg" alt="Нефтеуловитель" className="w-full sm:w-48 object-contain rounded-lg border border-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Нефтеуловитель</h3>
                  <p className="text-xs text-muted-foreground">
                    Выделение нефтепродуктов из поверхностных и производственных стоков. Принцип работы основан на разности плотностей воды и нефтепродуктов. Применяется на АЗС, автомойках, промышленных площадках, складах ГСМ.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Произв., л/с</TableHead>
                      <TableHead className="text-xs text-right">Ø, мм</TableHead>
                      <TableHead className="text-xs text-right">Длина, мм</TableHead>
                      <TableHead className="text-xs text-right">Ø труб, мм</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {neftModels.map((m, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-medium">{m.throughput}</TableCell>
                        <TableCell className="text-xs text-right">{m.diameter}</TableCell>
                        <TableCell className="text-xs text-right">{m.length}</TableCell>
                        <TableCell className="text-xs text-right">{m.pipes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground mt-3">
            Возможно изготовление ЛОС по индивидуальным параметрам: производительность, глубина залегания, состав стоков.
          </p>
        </section>

        {/* Преимущества */}
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
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите ваш объект, требуемую производительность, состав стоков..." rows={3} />
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

const VodoochistkaLos = () => (
  <CartProvider>
    <VodoochistkaLosInner />
  </CartProvider>
);

export default VodoochistkaLos;
