import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { Building2, Phone, Mail, MapPin, Factory, ShieldCheck, Clock, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageFooter from "@/components/PageFooter";

const strengths = [
  { icon: Factory, title: "Собственное производство", text: "Полный цикл изготовления оборудования из химическистойких инженерных пластиков на собственных производственных площадках." },
  { icon: ShieldCheck, title: "Гарантия качества", text: "Соответствие ГОСТ, ТУ и международным стандартам. Сертификаты на все материалы и готовые изделия." },
  { icon: Clock, title: "Более 15 лет опыта", text: "Успешная реализация проектов для химической, металлургической, фармацевтической и других отраслей." },
  { icon: Truck, title: "Полный цикл услуг", text: "Проектирование, производство, доставка, монтаж и пусконаладка оборудования под ключ." },
];

const AboutPageContent = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>О компании</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-8">
          {/* Hero */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary shrink-0" />
              ООО СЗПК «Пласт-Металл Про»
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              ООО НПО «Нева-Актив» — производственно-инжиниринговая компания, ведущая деятельность по разработке,
              изготовлению и монтажу оборудования из химическистойких инженерных пластиков для гальванических производств
              и защиты окружающей среды от промышленных загрязнений. Решения в области гальванических покрытий,
              очистка сточных вод, местной вентиляции и очистке воздуха, автоматизации технологических процессов.
            </p>
          </div>

          {/* Strengths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {strengths.map((s, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-5 flex gap-4">
                  <s.icon className="h-8 w-8 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contacts */}
          <Card className="border-border">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-bold mb-4">Контакты</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <a href="tel:+79633225540" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 text-primary shrink-0" /> +7 963 322-55-40
                </a>
                <a href="mailto:osobenkov@list.ru" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 text-primary shrink-0" /> osobenkov@list.ru
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" /> Ленинградская обл., д. Разметелево
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <PageFooter />
    </div>
  );
};

const AboutPage = () => (
  <CartProvider>
    <AboutPageContent />
  </CartProvider>
);

export default AboutPage;
