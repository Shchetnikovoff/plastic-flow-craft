import { useNavigate } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { FeatureChecklist, SpecTable, FAQSection } from "@/components/corporate/sections";
import { TankCalculator } from "@/components/configurator";

const models = [
  { art: "СЗПК.ЕВПП-КД.1000", vol: 1000, d: 940, h: 1500 },
  { art: "СЗПК.ЕВПП-КД.2000", vol: 2000, d: 1330, h: 1500 },
  { art: "СЗПК.ЕВПП-КД.3000", vol: 3000, d: 1600, h: 1500 },
  { art: "СЗПК.ЕВПП-КД.4000", vol: 4000, d: 1600, h: 2000 },
  { art: "СЗПК.ЕВПП-КД.5000", vol: 5000, d: 1700, h: 2300 },
  { art: "СЗПК.ЕВПП-КД.6000", vol: 6000, d: 1850, h: 2300 },
  { art: "СЗПК.ЕВПП-КД.8000", vol: 8000, d: 2260, h: 2000 },
  { art: "СЗПК.ЕВПП-КД.10000", vol: 10000, d: 2350, h: 2350 },
  { art: "СЗПК.ЕВПП-КД.12000", vol: 12000, d: 2350, h: 2800 },
  { art: "СЗПК.ЕВПП-КД.15000", vol: 15000, d: 2350, h: 3500 },
  { art: "СЗПК.ЕВПП-КД.20000", vol: 20000, d: 2380, h: 4500 },
  { art: "СЗПК.ЕВПП-КД.25000", vol: 25000, d: 2370, h: 5700 },
  { art: "СЗПК.ЕВПП-КД.30000", vol: 30000, d: 2400, h: 6650 },
  { art: "СЗПК.ЕВПП-КД.35000", vol: 35000, d: 3050, h: 4800 },
  { art: "СЗПК.ЕВПП-КД.40000", vol: 40000, d: 3050, h: 5600 },
  { art: "СЗПК.ЕВПП-КД.45000", vol: 45000, d: 3050, h: 6200 },
  { art: "СЗПК.ЕВПП-КД.50000", vol: 50000, d: 3050, h: 7000 },
];

const features = [
  "Конусное дно — гравитационный сбор осадка и полный слив жидкости",
  "Донный патрубок — контролируемый отвод осадка",
  "Плоская крыша с люком для обслуживания",
  "Опорная рама — устойчивая установка на любой поверхности",
  "Материал: листовой полипропилен (ПП)",
  "Объём от 1 000 до 50 000 литров",
];

const emkostiStats = [
  { value: "50 л — 300 м³", label: "диапазон объёмов" },
  { value: "PP / PE / PVC", label: "материалы" },
  { value: "от 10 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqEmkosti = [
  { q: "Из каких материалов изготавливаются ёмкости?", a: "Листовой полипропилен (PP-H, PP-C, PPs), полиэтилен (PE 100), ПВХ (PVC). Подбор — по рабочей среде, температуре и концентрации." },
  { q: "Какой диапазон объёмов?", a: "От 50 литров до 300 м³. Нестандартные размеры — по ТЗ заказчика." },
  { q: "Какие сроки изготовления?", a: "Стандартные ёмкости — 10–21 рабочий день. Нестандартные — от 15 дней." },
  { q: "Есть ли доставка?", a: "Да, доставка спецтранспортом по всей РФ. Производство — Ленинградская область." },
  { q: "Можно заказать по своим чертежам?", a: "Да, изготовим по вашим чертежам и ТЗ, а также спроектируем с нуля под ваши задачи." },
];

const EmkostiEvppConusDno = () => {
  const navigate = useNavigate();

  return (
    <CorporatePageShell
      catalogTabs="emkosti"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Ёмкости", href: "/catalog/emkosti" },
        { label: "Цилиндрические вертикальные", href: "/catalog/emkosti/vertikalnye" },
        { label: "С конусным дном" },
      ]}
      title="Вертикальная ёмкость"
      accentWord="с конусным дном"
      subtitle="Вертикальная цилиндрическая ёмкость с конусообразным дном для полного слива жидкости и осаждения взвесей. Конусная форма дна обеспечивает сбор осадка в нижней точке."
      badge="Раздел 6.1.4"
      heroImage="/images/emkosti-collage-hero.png"
      stats={emkostiStats}
      seo={{
        title: "Вертикальная ёмкость с конусным дном | СЗПК Пласт-Металл ПРО",
        description: "Цилиндрическая вертикальная ёмкость из полипропилена с конусным дном для сбора осадка и полного слива. Объём от 1 000 до 50 000 литров.",
        keywords: "ЕВПП конусное дно, вертикальная ёмкость, сбор осадка, полипропилен",
      }}
    >
      {/* Hero images */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <img src="/images/evpp-conusdno-hero.png" alt="Вертикальная ёмкость с конусным дном" className="w-full h-auto object-contain" />
            </div>
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <img src="/images/evpp-conusdno-schema.png" alt="Схема ёмкости с конусным дном" className="w-full h-auto object-contain" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <TankCalculator models={models} defaultType="conusdno" />
        </div>
      </section>

      {/* Features */}
      <FeatureChecklist
        title="Особенности конструкции"
        subtitle="Вертикальная цилиндрическая ёмкость с конусным дном предназначена для процессов, требующих полного слива жидкости, сбора и отвода осадка. Конусообразная форма дна обеспечивает гравитационное осаждение взвешенных частиц в нижнюю точку с последующим контролируемым удалением через донный патрубок."
        items={features}
        columns={1}
      />

      {/* Model table */}
      <SpecTable
        title="Модельный ряд"
        subtitle="Кликните на строку для перехода в карточку товара"
        headers={["Артикул", "Объём, л", "Ø, мм", "H, мм"]}
        rows={models.map((m) => [m.art, m.vol.toLocaleString("ru-RU"), m.d.toLocaleString("ru-RU"), m.h.toLocaleString("ru-RU")])}
        caption="Возможно изготовление нестандартных размеров по ТЗ заказчика"
      />

      {/* FAQ */}
      <FAQSection items={faqEmkosti} />
    </CorporatePageShell>
  );
};

export default EmkostiEvppConusDno;
