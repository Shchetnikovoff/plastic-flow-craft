import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Settings, ShieldCheck, Clock, Wrench, Truck, FlaskConical,
  Filter, Droplets, Eye, Gauge, Package,
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

/* ── static data ── */

const whyUs = [
  "Степень очистки ≥ 96%",
  "Производительность от 2 500 до 80 000 м³/ч",
  "Фильтрующий элемент — иглопробивное полотно на основе полипропилена",
  "Сухое и мокрое (с системой орошения) исполнение",
  "Корпус из ПП, ПНД или ПВХ",
  "Двустороннее обслуживание (кроме ФВГ-6,4)",
];

const specs = [
  { model: "ФВГ-0,37", flow: "2 500–5 000", area: "0,37", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
  { model: "ФВГ-0,74", flow: "5 000–10 000", area: "0,74", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
  { model: "ФВГ-1,6", flow: "10 000–20 000", area: "1,6", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
  { model: "ФВГ-3,2", flow: "20 000–40 000", area: "3,2", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
  { model: "ФВГ-6,4", flow: "60 000–80 000", area: "6,4", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
];

const dims = [
  { model: "ФВГ-0,37", L: "1050", L1: "480", H: "1000", H1: "600", H2: "700", D: "355", D1: "355", D2: "450" },
  { model: "ФВГ-0,74", L: "1100", L1: "480", H: "1000", H1: "600", H2: "700", D: "400", D1: "400", D2: "700" },
  { model: "ФВГ-1,6", L: "1150", L1: "480", H: "1200", H1: "830", H2: "900", D: "400", D1: "400", D2: "950" },
  { model: "ФВГ-3,2", L: "1350", L1: "480", H: "1250", H1: "830", H2: "950", D: "630", D1: "630", D2: "1050" },
  { model: "ФВГ-6,4", L: "1600", L1: "480", H: "2000", H1: "1550", H2: "2000", D: "1300", D1: "1300", D2: "1800" },
];

const designation = [
  { code: "ФВГ", meaning: "фильтр волокнистый для гальванических ванн" },
  { code: "ФВК", meaning: "фильтр кассетный гальванический" },
  { code: "0,37 / 0,74 / 1,6 / 3,2 / 6,4", meaning: "площадь поверхности фильтрования, м²" },
  { code: "1", meaning: "сухой фильтр (без системы орошения)" },
  { code: "2", meaning: "мокрый фильтр (с системой орошения)" },
  { code: "ПП, ПНД, ПВХ", meaning: "материал корпуса" },
  { code: "Л / П", meaning: "сторона обслуживания (только для ФВГ-6,4)" },
];

const wetAdvantages = [
  { icon: Package, title: "Простота конструкции", text: "Сравнительно невысокая стоимость изготовления и обслуживания." },
  { icon: Filter, title: "Высокая эффективность", text: "Превосходит сухие механические пылеуловители инерционного типа." },
  { icon: Gauge, title: "Компактные габариты", text: "Меньшие размеры по сравнению с тканевыми фильтрами и электрофильтрами." },
  { icon: Droplets, title: "Комплексная очистка", text: "Улавливание твёрдых частиц вместе с парами и газообразными компонентами." },
];

const extras = [
  { icon: Droplets, text: "Ёмкость для орошающей жидкости" },
  { icon: Settings, text: "Насос орошения" },
  { icon: Gauge, text: "Визуальный уровнемер жидкости" },
  { icon: Eye, text: "Смотровые окна в корпусе ФВГ" },
  { icon: Wrench, text: "Химически стойкая запорная арматура" },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальное проектирование", text: "Расчёт фильтра под конкретный состав выбросов, производительность и условия эксплуатации." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Испытания каждого изделия. Сварка по ГОСТ, материалы с сертификатами." },
  { icon: Clock, title: "Оперативность", text: "Изготовление — 10–25 рабочих дней. Монтаж — 1–3 дня." },
  { icon: Wrench, title: "Монтаж и сервис", text: "Шеф-монтаж, пусконаладка, обучение персонала, гарантийное обслуживание." },
  { icon: Truck, title: "Доставка по РФ", text: "Доставка спецтранспортом по всей России. Надёжная упаковка." },
  { icon: FlaskConical, title: "Документация", text: "Паспорт изделия, проект, сертификаты соответствия." },
];

/* ── component ── */

const GazoochistkaFvgInner = () => {
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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/gazoochistka">Газоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Фильтры ФВГ / ФВК</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Фильтры волокнистые гальванические (ФВГ / ФВК)
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Высокоэффективная очистка воздушных вентиляционных выбросов в гальванических, травильных и химических производствах, из вытяжных шкафов и лабораторных помещений. Производительность от 2 500 до 80 000 м³/ч.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <img src="/images/fvg-hero-1.png" alt="Фильтр ФВГ — общий вид" className="rounded-lg border border-border object-cover w-full aspect-[4/3]" />
            <img src="/images/fvg-hero-2.png" alt="Фильтрующие элементы ФВГ" className="rounded-lg border border-border object-cover w-full aspect-[4/3]" />
          </div>
          <Button onClick={scrollToForm} className="gap-2">Получить расчёт стоимости</Button>
        </section>

        {/* Why us */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Почему выбирают наши фильтры</h2>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Principle */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Принцип работы</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Внутри корпуса фильтра размещена кассета с фильтрующим иглопробивным полотном на основе полипропилена. Кассета изготовлена в виде вертикально расположенных складок. Установка и смена кассет осуществляются через монтажный люк в верхней части корпуса.
            </p>
            <p>
              Фильтр работает в режиме накопления уловленного продукта на поверхности фильтрующего материала с частичным стоком жидкости. При достижении перепада давления 700 Па (70 мм рт. ст.) фильтр подвергается периодической промывке — обычно один раз в 15–20 суток — с помощью переносной форсунки через промывочные люки.
            </p>
            <p>
              Система орошения (для мокрого исполнения) включает патрубок для подключения трубопровода орошающей жидкости, одну или несколько форсунок и патрубок отвода жидкости.
            </p>
          </div>
        </section>

        {/* Designation */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Условное обозначение</h2>
          <p className="text-sm text-muted-foreground mb-3">Пример: <span className="font-semibold text-foreground">ФВГ-0,37-1-ПП</span></p>
          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Обозначение</TableHead>
                  <TableHead className="text-xs">Расшифровка</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {designation.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium whitespace-nowrap">{d.code}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{d.meaning}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Specs table */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Технические характеристики</h2>
          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Фильтр</TableHead>
                  <TableHead className="text-xs text-right">Произв., м³/ч</TableHead>
                  <TableHead className="text-xs text-right">Площадь, м²</TableHead>
                  <TableHead className="text-xs text-right">Макс. конц., мг/м³</TableHead>
                  <TableHead className="text-xs text-right">Сопр. нач., Па</TableHead>
                  <TableHead className="text-xs text-right">Сопр. кон., Па</TableHead>
                  <TableHead className="text-xs text-right">Очистка, %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specs.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium">{s.model}</TableCell>
                    <TableCell className="text-xs text-right">{s.flow}</TableCell>
                    <TableCell className="text-xs text-right">{s.area}</TableCell>
                    <TableCell className="text-xs text-right">{s.conc}</TableCell>
                    <TableCell className="text-xs text-right">{s.rStart}</TableCell>
                    <TableCell className="text-xs text-right">{s.rEnd}</TableCell>
                    <TableCell className="text-xs text-right">{s.eff}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Dimensions table */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Габаритные размеры, мм</h2>
          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Тип</TableHead>
                  <TableHead className="text-xs text-right">L</TableHead>
                  <TableHead className="text-xs text-right">L1</TableHead>
                  <TableHead className="text-xs text-right">H</TableHead>
                  <TableHead className="text-xs text-right">H1</TableHead>
                  <TableHead className="text-xs text-right">H2</TableHead>
                  <TableHead className="text-xs text-right">D</TableHead>
                  <TableHead className="text-xs text-right">D1</TableHead>
                  <TableHead className="text-xs text-right">D2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dims.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium">{d.model}</TableCell>
                    <TableCell className="text-xs text-right">{d.L}</TableCell>
                    <TableCell className="text-xs text-right">{d.L1}</TableCell>
                    <TableCell className="text-xs text-right">{d.H}</TableCell>
                    <TableCell className="text-xs text-right">{d.H1}</TableCell>
                    <TableCell className="text-xs text-right">{d.H2}</TableCell>
                    <TableCell className="text-xs text-right">{d.D}</TableCell>
                    <TableCell className="text-xs text-right">{d.D1}</TableCell>
                    <TableCell className="text-xs text-right">{d.D2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Wet cleaning advantages */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Достоинства мокрой очистки газов</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {wetAdvantages.map((a, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <a.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Extras */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Дополнительная комплектация</h2>
          <ul className="space-y-2">
            {extras.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Partnership */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partnershipAdvantages.map((a, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <a.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA form */}
        <section id="cta-form" className="mb-10 scroll-mt-24">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-base font-bold text-foreground mb-1 tracking-wide uppercase">Запросить расчёт</h2>
              <p className="text-xs text-muted-foreground mb-4">Заполните форму — мы подберём фильтр под ваши параметры и подготовим коммерческое предложение.</p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Имя *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван Петров" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Телефон *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="email" className="text-xs">E-mail</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="info@company.ru" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="description" className="text-xs">Описание задачи</Label>
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Тип производства, состав выбросов, требуемая производительность…" rows={4} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

const GazoochistkaFvg = () => (
  <CartProvider>
    <GazoochistkaFvgInner />
  </CartProvider>
);

export default GazoochistkaFvg;
