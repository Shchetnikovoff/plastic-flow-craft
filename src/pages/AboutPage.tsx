import { Phone, Mail, MapPin, Factory, ShieldCheck, Clock, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, FAQSection } from "@/components/corporate/sections";

const strengths = [
  { icon: Factory, title: "Собственное производство", text: "Полный цикл изготовления оборудования из химическистойких инженерных пластиков на собственных производственных площадках." },
  { icon: ShieldCheck, title: "Гарантия качества", text: "Соответствие ГОСТ, ТУ и международным стандартам. Сертификаты на все материалы и готовые изделия." },
  { icon: Clock, title: "Более 15 лет опыта", text: "Успешная реализация проектов для химической, металлургической, фармацевтической и других отраслей." },
  { icon: Truck, title: "Полный цикл услуг", text: "Проектирование, производство, доставка, монтаж и пусконаладка оборудования под ключ." },
];

const faqItems = [
  { q: "Где находится производство?", a: "Ленинградская область, д. Разметелево." },
  { q: "Какой опыт?", a: "Более 15 лет в производстве полимерного оборудования." },
  { q: "Работаете по всей России?", a: "Да, доставка и монтаж по всей РФ." },
  { q: "Какая гарантия?", a: "5 лет на все изделия. Срок службы — от 30 лет." },
  { q: "Можно приехать на производство?", a: "Да, организуем экскурсию по предварительной договорённости." },
];

const AboutPage = () => (
  <CorporatePageShell
    title="О компании"
    accentWord="Пласт-Металл Про"
    badge="Более 500 проектов"
    stats={[
      { value: "500+", label: "проектов" },
      { value: "15+ лет", label: "опыта" },
      { value: "5 лет", label: "гарантия" },
      { value: "24 ч", label: "расчёт стоимости" },
    ]}
  >
    {/* Description */}
    <section>
      <p className="text-slate-500 leading-relaxed">
        ООО НПО «Нева-Актив» — производственно-инжиниринговая компания, ведущая деятельность по разработке,
        изготовлению и монтажу оборудования из химическистойких инженерных пластиков для гальванических производств
        и защиты окружающей среды от промышленных загрязнений. Решения в области гальванических покрытий,
        очистка сточных вод, местной вентиляции и очистке воздуха, автоматизации технологических процессов.
      </p>
    </section>

    {/* Strengths */}
    <AdvantagesGrid items={strengths} />

    {/* Contacts */}
    <Card className="border-slate-200">
      <CardContent className="p-6 space-y-3">
        <h2 className="text-xl font-bold mb-4">Контакты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <a href="tel:+79633225540" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
            <Phone className="h-4 w-4 text-amber-600 shrink-0" /> +7 963 322-55-40
          </a>
          <a href="mailto:osobenkov@list.ru" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
            <Mail className="h-4 w-4 text-amber-600 shrink-0" /> osobenkov@list.ru
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-600 shrink-0" /> Ленинградская обл., д. Разметелево
          </span>
        </div>
      </CardContent>
    </Card>

    {/* FAQ */}
    <FAQSection items={faqItems} />
  </CorporatePageShell>
);

export default AboutPage;
