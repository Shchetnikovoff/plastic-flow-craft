import { useState } from "react";
import { Settings, Factory, HardHat, Wrench, FlaskConical, Shield, ShieldCheck, Clock, Truck, ImageOff } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { findCategory } from "@/data/catalog";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, FeatureChecklist } from "@/components/corporate/sections";

const whyUs = [
  "Комплексный подход: от проекта до ввода в эксплуатацию",
  "Собственная производственная база и квалифицированные монтажные бригады",
  "Опыт работы с крупными промышленными объектами",
  "Гарантия на все виды работ",
  "Соблюдение сроков и бюджета проекта",
];

const services = [
  { icon: Settings, text: "Проектирование водоподготовительного и водоочистного оборудования" },
  { icon: Factory, text: "Проектирование КНС (канализационных насосных станций)" },
  { icon: HardHat, text: "Монтаж ёмкостей и резервуаров" },
  { icon: Wrench, text: "Монтаж КНС" },
  { icon: FlaskConical, text: "Пусконаладочные работы" },
  { icon: Shield, text: "Гарантийное и постгарантийное обслуживание" },
];

const modifications = [
  { title: "Проектирование", items: ["Разработка проектной документации", "3D-моделирование и визуализация", "Гидравлические расчёты", "Подбор оборудования и материалов", "Согласование с надзорными органами"] },
  { title: "Монтаж", items: ["Монтаж ёмкостей (наземных и подземных)", "Монтаж КНС с подключением к сетям", "Монтаж трубопроводов и арматуры", "Установка насосного оборудования", "Электромонтажные работы"] },
  { title: "Пусконаладка и сервис", items: ["Пусконаладочные работы", "Обучение персонала заказчика", "Гарантийное обслуживание", "Постгарантийный сервис", "Поставка запасных частей"] },
];

const advantages = [
  { icon: Settings, title: "Комплексный подход", text: "Все работы — от проекта до сервиса — в одних руках." },
  { icon: ShieldCheck, title: "Качество работ", text: "Квалифицированные специалисты с допусками СРО." },
  { icon: Clock, title: "Соблюдение сроков", text: "Чёткий график выполнения работ." },
  { icon: Truck, title: "География", text: "Работаем по всей территории РФ." },
  { icon: Wrench, title: "Оборудование", text: "Используем сертифицированное оборудование." },
  { icon: Shield, title: "Гарантия", text: "Гарантия на все виды работ — от 2 лет." },
];

const UslugiPage = () => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("uslugi");
  const catIndex = 12;

  return (
    <CorporatePageShell
      catalogTabs="uslugi"
      title="Услуги и"
      accentWord="сервис"
      stats={[
        { value: "Монтаж", label: "на объекте" },
        { value: "Проектирование", label: "под ключ" },
        { value: "Доставка", label: "по всей РФ" },
        { value: "Обучение", label: "персонала" },
      ]}
    >
      {/* Hero images */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="text-sm text-slate-500 mb-5">Проектирование, монтаж и пусконаладка промышленного оборудования — полный цикл от идеи до ввода в эксплуатацию!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white"><img src="/images/uslugi-hero-1.png" alt="Монтаж оборудования" className="w-full object-contain" /></div>
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white"><img src="/images/uslugi-hero-2.png" alt="Проектирование и пусконаладка" className="w-full object-contain" /></div>
          </div>
        </div>
      </section>

      {/* About services */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Проектирование и монтаж: от идеи до результата</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">Мы оказываем полный спектр услуг по проектированию, монтажу и вводу в эксплуатацию промышленного оборудования: водоочистных и водоподготовительных систем, КНС, ёмкостей и резервуаров.</p>
          <FeatureChecklist title="Почему выбирают нас" items={whyUs} />
        </div>
      </section>

      {/* Services grid */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Наши услуги</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {services.map((a, i) => (
              <div key={i} className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-3">
                <a.icon className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-900">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work stages accordion */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Этапы работ</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (
              <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-slate-200 bg-white px-4">
                <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline">{mod.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 pb-2">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                        <span className="text-amber-600 mt-1">&#8226;</span><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Advantages */}
      <AdvantagesGrid items={advantages} columns={3} />

      {/* Service catalog */}
      {category && (
        <section className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Каталог услуг</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.subcategories.map((sub, i) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className="group rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-amber-300 hover:shadow-md transition-all text-left"
                >
                  <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                    {sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" /> : <ImageOff className="h-10 w-10 text-slate-300" />}
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-xs text-slate-500 font-semibold">{catIndex}.{i + 1}</p>
                    <p className="text-sm font-medium text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5">{sub.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </CorporatePageShell>
  );
};

export default UslugiPage;
