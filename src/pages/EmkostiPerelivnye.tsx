import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { perelivnyeProducts } from "@/data/perelivnyeProducts";
import { Check, Droplets, Wrench, ShieldCheck, Clock, Truck, FlaskConical, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

const whyUs = [
  "Изготовление из листового полипропилена (PP-H) толщиной 8–15 мм",
  "Индивидуальные размеры под параметры вашего бассейна",
  "Полная герметичность швов (экструзионная сварка)",
  "Устойчивость к хлорсодержащим реагентам и УФ-стабилизаторам",
  "Гарантия 5 лет, расчётный срок службы — от 30 лет",
];

const applications = [
  "Переливные бассейны частных домов и коттеджей",
  "Общественные и спортивные бассейны",
  "Аквапарки и СПА-комплексы",
  "Гостиничные и фитнес-бассейны",
  "Системы водоподготовки с рециркуляцией",
  "Бассейны с противотоком и гидромассажем",
];

const features = [
  "Сбор и хранение переливной воды из бассейна",
  "Компенсация объёма при входе/выходе купающихся",
  "Интеграция с системами фильтрации, обеззараживания и подогрева",
  "Буферная ёмкость для насосной станции рециркуляции",
  "Предотвращение перелива воды на обходную дорожку",
];

const specs = [
  { label: "Материал", value: "Полипропилен PP-H" },
  { label: "Толщина стенки", value: "8–15 мм" },
  { label: "Температура среды", value: "+5…+40 °C" },
  { label: "Рабочая среда", value: "Вода (в т. ч. хлорированная)" },
  { label: "Форма", value: "Прямоугольная" },
  { label: "Соединение", value: "Трубные штуцеры / фланцы" },
];

const options = [
  "Патрубки подачи и возврата воды (диаметр по проекту)",
  "Переливной лоток с сеткой-фильтром",
  "Датчики уровня воды (верхний / нижний)",
  "Крышка с ревизионным люком",
  "Дренажный патрубок для полного опорожнения",
  "Теплоизоляция корпуса (пенополиуретан, минвата)",
  "Рёбра жёсткости для заглублённой установки",
];

const advantages = [
  { icon: Settings, title: "Под ваш бассейн", text: "Рассчитаем объём и размеры ёмкости исходя из параметров бассейна и системы водоподготовки." },
  { icon: ShieldCheck, title: "Химическая стойкость", text: "Полипропилен не корродирует и устойчив к хлору, pH-корректорам и другим реагентам." },
  { icon: Clock, title: "Быстрое изготовление", text: "Средний срок — 7–14 рабочих дней. Стандартные размеры — от 5 дней." },
  { icon: Truck, title: "Доставка по РФ", text: "Организуем доставку транспортной компанией или собственным автопарком." },
  { icon: FlaskConical, title: "Комплексный подход", text: "Проектируем переливную систему целиком: ёмкость, насосы, фильтрация, автоматика." },
  { icon: Wrench, title: "Монтаж и сервис", text: "Установка на объекте, подключение к системе водоподготовки, обучение персонала." },
];

const ppColors = [
  { name: "Серый", ral: "RAL 7032", hex: "#b5b0a1", application: "внутри помещения" },
  { name: "Голубой", ral: "RAL 5012", hex: "#0089bf", application: "улица, УФ-защита" },
];

const EmkostiPerelivnyeInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedColor, setSelectedColor] = useState(ppColors[0]);

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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Переливные ёмкости для бассейнов</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Переливные ёмкости для бассейнов из полипропилена
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Надёжные буферные ёмкости для переливных бассейнов — сбор, хранение и рециркуляция воды.
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          {/* Hero image */}
          <div className="mt-6 rounded-lg border border-border overflow-hidden bg-card">
            <img src="/images/emkost-perelivnaya-bassein.jpg" alt="Переливная ёмкость для бассейна из полипропилена" className="w-full h-auto object-cover" />
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Переливные ёмкости: назначение и принцип работы
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Переливная ёмкость — ключевой элемент системы водоподготовки переливного бассейна. Она принимает воду, стекающую через переливной лоток, и служит буферным резервуаром перед подачей в систему фильтрации, обеззараживания и подогрева. Правильно подобранный объём компенсирует колебания уровня воды при использовании бассейна.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Функции */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Функции переливной ёмкости</h2>
          <div className="space-y-2">
            {features.map((item, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <Droplets className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Назначение */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Область применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((app, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <Droplets className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Характеристики */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Технические характеристики</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {specs.map((spec, i) => (
              <div key={i} className="rounded-lg border border-border bg-muted/30 p-3">
                <span className="block text-xs text-muted-foreground">{spec.label}</span>
                <span className="text-sm font-semibold text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-2">Дополнительные опции:</h3>
          <ul className="space-y-1.5">
            {options.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Типоразмерный ряд */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Размер ёмкости подбирается в зависимости от объёма бассейна. Ниже представлены стандартные модели — возможно изготовление по индивидуальным размерам.
          </p>
          <div className="rounded-lg border border-border overflow-auto">
           <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Артикул</TableHead>
                  <TableHead className="text-xs">Объём бассейна</TableHead>
                  <TableHead className="text-xs text-right">Длина, мм</TableHead>
                  <TableHead className="text-xs text-right">Ширина, мм</TableHead>
                  <TableHead className="text-xs text-right">Высота, мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {perelivnyeProducts.map((item) => (
                  <TableRow key={item.article} className="cursor-pointer hover:bg-muted/70" onClick={() => navigate(`/product/${item.article}`)}>
                      <TableCell className="text-xs font-medium font-mono text-primary">{item.article}</TableCell>
                      <TableCell className="text-xs font-medium">{item.label}</TableCell>
                      <TableCell className="text-xs text-right">{item.length.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-right">{item.width.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-right">{item.height.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Преимущества */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {advantages.map((adv) => (
              <Card key={adv.title}>
                <CardContent className="p-4 flex items-start gap-3">
                  <adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{adv.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Готовы заказать переливную ёмкость?</CardTitle>
              <p className="text-sm text-muted-foreground">
                Оставьте заявку — наш инженер подберёт объём ёмкости под ваш бассейн и подготовит расчёт стоимости в течение 24 часов.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Имя *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">Телефон *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">E-mail</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description" className="text-sm">Описание задачи</Label>
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Укажите объём бассейна, тип (скиммерный/переливной), особые требования..." rows={3} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Оставить заявку</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <PageFooter />
      </main>
    </>
  );
};

const EmkostiPerelivnye = () => (
  <CartProvider>
    <EmkostiPerelivnyeInner />
  </CartProvider>
);

export default EmkostiPerelivnye;
