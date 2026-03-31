import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, FeatureChecklist, FAQSection } from "@/components/corporate/sections";
import { Wrench, ShieldCheck, Clock, Truck, FlaskConical, Factory, Beaker, Settings, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const stats = [
  { value: "до 50 м³", label: "объём" },
  { value: "PP / PE / PVC", label: "материалы" },
  { value: "от 21 дня", label: "сроки" },
  { value: "5 лет", label: "гарантия" },
];

const whyUs = [
  "Собственное производство химических реакторов из полипропилена и полиэтилена",
  "Индивидуальное проектирование под конкретные химические процессы",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Химическая стойкость к широкому спектру агрессивных сред",
];

const applications = [
  { icon: FlaskConical, text: "Химическое осаждение и нейтрализация" },
  { icon: Beaker, text: "Приготовление и смешивание растворов" },
  { icon: Factory, text: "Гидрометаллургические процессы" },
  { icon: Settings, text: "Выщелачивание и экстракция" },
  { icon: Shield, text: "Процессы окисления и восстановления" },
  { icon: Wrench, text: "Электрохимические реакции" },
];

const modifications = [
  { title: "По материалу", items: ["Реакторы из полипропилена (PP) — до +100 °C", "Реакторы из полиэтилена (ПНД/HDPE) — до +60 °C", "Комбинированные конструкции с усиленным каркасом"] },
  { title: "По конструкции", items: ["С мешалкой (лопастной, рамной, якорной)", "С рубашкой обогрева/охлаждения", "С герметичной крышкой и патрубками", "Открытого и закрытого типа"] },
  { title: "Дополнительные опции", items: ["Датчики уровня, температуры, pH", "Системы дозирования реагентов", "Теплоизоляция", "Площадки обслуживания и лестницы"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Спроектируем реактор под ваши процессы и условия." },
  { icon: FlaskConical, title: "Подбор материала", text: "Учтём химическую среду, температуру и давление." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Проверка швов на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Монтаж и пусконаладка." },
  { icon: Shield, title: "Документация", text: "Паспорта и сертификаты." },
];

const faq = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по рабочей среде и температуре." },
  { q: "Какие сроки изготовления?", a: "14–30 рабочих дней в зависимости от сложности." },
  { q: "Проектируете под заказ?", a: "Да, по вашим ТЗ или с нуля." },
  { q: "Доставка и монтаж?", a: "Спецтранспорт по всей РФ, шеф-монтаж на объекте." },
  { q: "Какая гарантия?", a: "5 лет на всё оборудование." },
];

const ReaktoryPage = () => {
  return (
    <CorporatePageShell
      catalogTabs="reaktory"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Химические реакторы" },
      ]}
      title="Химические реакторы из полимеров"
      subtitle="Реакторы из полипропилена и полиэтилена для химических, гидрометаллургических и технологических процессов!"
      heroImage="/images/reaktor-pp-render.jpg"
      stats={stats}
    >
      <FeatureChecklist title="Почему выбирают нас" items={whyUs} />

      <section className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((a, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3">
                <a.icon className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-900">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Виды реакторов</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (
              <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-slate-200 bg-white px-4">
                <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline">{mod.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 pb-2">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                        <span className="text-amber-600 mt-1">•</span><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <AdvantagesGrid items={advantages} />

      <FAQSection items={faq} />
    </CorporatePageShell>
  );
};

export default ReaktoryPage;
