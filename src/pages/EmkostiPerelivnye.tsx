import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, FeatureChecklist, DarkInfoBlock, FAQSection } from "@/components/corporate/sections";
import { perelivnyeProducts, ppColors } from "@/data/perelivnyeProducts";
import { Wrench, ShieldCheck, Clock, Truck, FlaskConical, Settings } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

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

const faqItems = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Какой объём?", a: "50 л — 300 м³, нестандарт по ТЗ." },
  { q: "Сроки?", a: "10–21 день стандарт, от 15 нестандарт." },
  { q: "Доставка?", a: "Спецтранспорт по всей РФ." },
  { q: "По своим чертежам?", a: "Да, изготовим и спроектируем." },
];

const EmkostiPerelivnye = () => {
  const navigate = useNavigate();
  const [selectedColorCode, setSelectedColorCode] = useState(ppColors[0].code);
  const selectedColor = ppColors.find((c) => c.code === selectedColorCode) || ppColors[0];
  const filteredProducts = perelivnyeProducts.filter((p) => p.colorCode === selectedColorCode);

  return (
    <CorporatePageShell
      catalogTabs="emkosti"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Ёмкости", href: "/catalog/emkosti" },
        { label: "Переливные ёмкости для бассейнов" },
      ]}
      title="Переливные ёмкости"
      accentWord="для бассейнов"
      subtitle="Надёжные буферные ёмкости для переливных бассейнов — сбор, хранение и рециркуляция воды"
      badge="Полипропилен PP-H"
      heroImage="/images/emkosti-collage-hero.png"
      stats={[
        { value: "50 л — 300 м³", label: "диапазон объёмов" },
        { value: "PP / PE / PVC", label: "материалы" },
        { value: "от 10 дней", label: "срок изготовления" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{
        title: "Переливные ёмкости для бассейнов из полипропилена",
        description: "Производство переливных ёмкостей из полипропилена PP-H для бассейнов. Индивидуальные размеры, гарантия 5 лет.",
        keywords: "переливные ёмкости, ёмкости для бассейнов, полипропилен, буферная ёмкость, СЗПК",
      }}
    >
      {/* Color selector */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Цвет полипропилена</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {ppColors.map((c) => (
              <div
                key={c.ral}
                onClick={() => setSelectedColorCode(c.code)}
                className={`rounded-xl border bg-white p-4 cursor-pointer transition-all ${
                  selectedColor.code === c.code
                    ? "border-amber-500 ring-1 ring-amber-500 shadow-md"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-slate-200 shrink-0" style={{ backgroundColor: c.hex }} />
                  <span className="text-sm font-semibold text-slate-900">{c.name}</span>
                  <span className="text-xs text-slate-500">{c.ral}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">{c.application}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DarkInfoBlock
        title="Назначение и принцип работы"
        text="Переливная ёмкость — ключевой элемент системы водоподготовки переливного бассейна. Она принимает воду, стекающую через переливной лоток, и служит буферным резервуаром перед подачей в систему фильтрации, обеззараживания и подогрева. Правильно подобранный объём компенсирует колебания уровня воды при использовании бассейна."
        highlights={[
          { value: "PP-H", label: "материал" },
          { value: "8–15 мм", label: "толщина стенки" },
          { value: "+5…+40 °C", label: "температура среды" },
          { value: "от 30 лет", label: "срок службы" },
        ]}
      />

      <FeatureChecklist title="Почему выбирают нас" items={whyUs} />

      <FeatureChecklist title="Функции переливной ёмкости" items={features} columns={1} />

      <FeatureChecklist title="Область применения" items={applications} />

      <FeatureChecklist title="Дополнительные опции" items={options} />

      {/* Product table */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Типоразмерный ряд</h2>
          <p className="mt-2 text-slate-500 text-lg">
            Размер ёмкости подбирается в зависимости от объёма бассейна. Ниже представлены стандартные модели — возможно изготовление по индивидуальным размерам.
          </p>
          <div className="mt-10 rounded-lg border border-slate-200 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="text-xs font-semibold text-slate-700">Артикул</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700">Объём бассейна</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700 text-right">Длина, мм</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700 text-right">Ширина, мм</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700 text-right">Высота, мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((item) => (
                  <TableRow key={item.article} className="cursor-pointer hover:bg-amber-50/50" onClick={() => navigate(`/product/${item.article}`)}>
                    <TableCell className="text-xs font-medium font-mono text-amber-600">{item.article}</TableCell>
                    <TableCell className="text-xs font-medium">{item.label}</TableCell>
                    <TableCell className="text-xs text-right">{item.length.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-right">{item.width.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-right">{item.height.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <AdvantagesGrid title="Преимущества сотрудничества" items={advantages} />

      <FAQSection items={faqItems} />
    </CorporatePageShell>
  );
};

export default EmkostiPerelivnye;
