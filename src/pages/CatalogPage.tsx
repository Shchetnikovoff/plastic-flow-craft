import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight, ImageOff, FlaskConical, Zap, Building2, Droplets,
  Beaker, Factory, Atom, Wind, ChevronDown, Check,
} from "lucide-react";
import { catalog, findCategory, findSubcategory } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";

/* ── Shared form logic ── */
const useCTAForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; }
    toast.success("Заявка отправлена!");
    setForm({ name: "", phone: "", email: "", description: "" });
  };
  return { form, setForm, handleSubmit };
};

const CTAForm = ({ id, form, setForm, handleSubmit }: {
  id: string;
  form: { name: string; phone: string; email: string; description: string };
  setForm: React.Dispatch<React.SetStateAction<typeof form>>;
  handleSubmit: (e: React.FormEvent) => void;
}) => (
  <section id={id} className="scroll-mt-20">
    <Card><CardContent className="p-6">
      <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Нужна консультация или расчёт?</h2>
      <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — ответим в течение 24 часов.</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
        <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
        <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
        <div className="space-y-1.5 sm:col-span-3"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите задачу..." rows={3} maxLength={1000} /></div>
        <div className="sm:col-span-3"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
      </form>
    </CardContent></Card>
  </section>
);

function CatalogFAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
      >
        {q}
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="px-4 pb-3 text-xs text-slate-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ── Category listing (root /catalog) ── */
const CategoryListing = () => {
  const { form, setForm, handleSubmit } = useCTAForm();
  const scrollToForm = () => { document.getElementById("catalog-cta-form")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <CorporatePageShell
      breadcrumbs={[{ label: "Каталог" }]}
      title="Каталог"
      accentWord="продукции"
      subtitle="Полный ассортимент полимерного оборудования для промышленных предприятий — от проектирования до монтажа."
      stats={[
        { value: "7+", label: "категорий" },
        { value: "500+", label: "проектов" },
        { value: "PP / PE / PVC", label: "материалы" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{ title: "Каталог продукции | СЗПК Пласт-Металл ПРО", description: "Полный каталог полимерного оборудования", keywords: "каталог, полимерное оборудование" }}
    >
      {/* Category sidebar + grid */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Направления</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <nav className="md:w-[220px] shrink-0">
              <ul className="space-y-0.5">
                {catalog.map((cat, i) => (
                  <li key={cat.id}>
                    <Link
                      to={`/catalog/${cat.slug}`}
                      className="group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-colors"
                    >
                      <span className="text-xs font-semibold shrink-0 text-slate-400 group-hover:text-amber-600">{i + 1}</span>
                      <span className="text-slate-700 group-hover:text-amber-600 transition-colors">{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {catalog.map((cat) => {
                const thumb = cat.image || cat.subcategories.find((s) => s.image)?.image;
                return (
                  <Link
                    key={cat.id}
                    to={`/catalog/${cat.slug}`}
                    className="group relative block rounded-2xl overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                      {thumb ? (
                        <img src={thumb} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <ImageOff className="h-10 w-10 text-slate-300" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-lg font-bold">{cat.name}</h3>
                      <p className="text-slate-300 text-xs mt-0.5">
                        {cat.subcategories.length} {cat.subcategories.length === 1 ? "позиция" : cat.subcategories.length < 5 ? "позиции" : "позиций"}
                      </p>
                      <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-semibold mt-2 group-hover:gap-2.5 transition-all duration-300">
                        Подробнее <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ ОТРАСЛИ ══════ */}
      <section className="w-full bg-white py-10 md:py-14 border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Отрасли применения</h2>
          <p className="text-sm text-slate-500 mb-8">Наше оборудование работает в ключевых отраслях промышленности</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: FlaskConical, name: "Химическая промышленность", href: "/catalog/emkosti/kisloty-shchelochi" },
              { icon: Zap, name: "Гальваника", href: "/catalog/galvanika" },
              { icon: Building2, name: "Металлургия", href: "/catalog/gidrometallurgiya" },
              { icon: Droplets, name: "Водоподготовка", href: "/catalog/vodopodgotovka" },
              { icon: Beaker, name: "Фармацевтика", href: "/catalog/emkosti" },
              { icon: Factory, name: "Пищевая отрасль", href: "/catalog/vodoochistka" },
              { icon: Atom, name: "Нефтехимия", href: "/catalog/reaktory" },
              { icon: Wind, name: "ЦБК и полиграфия", href: "/catalog/gazoochistka" },
            ].map((ind) => (
              <Link key={ind.name} to={ind.href} className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <ind.icon className="h-4 w-4 text-amber-400 group-hover:text-slate-900 transition-colors" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-700 text-center leading-tight group-hover:text-amber-600 transition-colors">{ind.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ СРАВНИТЕЛЬНАЯ ТАБЛИЦА ══════ */}
      <section className="w-full bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Сравнение категорий оборудования</h2>
          <p className="text-sm text-slate-500 mb-8">Основные характеристики по направлениям</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">Категория</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">Материалы</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">Температура</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">Объём / Размер</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">Срок</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Ёмкости", "PP, PE, PVC", "-50...+100 °C", "50 л — 300 м³", "10–21 дн."],
                  ["Водоочистка", "PP, PE", "-20...+80 °C", "до 100 м³/ч", "14–30 дн."],
                  ["Газоочистка", "PP, PVC", "-20...+80 °C", "500–100 000 м³/ч", "14–30 дн."],
                  ["Вентиляция", "PP, PE", "-20...+80 °C", "Ø 50–1200 мм", "7–14 дн."],
                  ["КНС", "PP, PE", "-20...+60 °C", "до 50 м³", "21–30 дн."],
                  ["Реакторы", "PP, PE, PVC", "-20...+100 °C", "до 50 м³", "21–30 дн."],
                  ["Гальваника", "PP, PVC", "-20...+80 °C", "по ТЗ", "14–30 дн."],
                ].map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-amber-50/50 transition-colors`}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{row[0]}</td>
                    <td className="px-4 py-3 text-slate-600">{row[1]}</td>
                    <td className="px-4 py-3 text-slate-600">{row[2]}</td>
                    <td className="px-4 py-3 text-slate-600">{row[3]}</td>
                    <td className="px-4 py-3 text-slate-600">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════ FAQ + SEO ТЕКСТ (2 колонки) ══════ */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0">
            {/* FAQ */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Частые вопросы</h2>
              <div className="space-y-2">
                {[
                  { q: "Как выбрать ёмкость из полипропилена?", a: "Определите рабочую среду, температуру и объём. Наши инженеры подберут оптимальный материал (PP, PE или PVC) и конструкцию ёмкости." },
                  { q: "Какой срок службы полимерного оборудования?", a: "От 30 до 50 лет при соблюдении условий эксплуатации. Полипропилен и полиэтилен не подвержены коррозии." },
                  { q: "Работаете с нестандартными заказами?", a: "Да, проектируем и изготавливаем оборудование любой сложности по чертежам заказчика или разрабатываем проект с нуля." },
                  { q: "Какие стандарты соблюдаете?", a: "ГОСТ, ТУ и международные стандарты качества. Все материалы сертифицированы." },
                  { q: "Выполняете монтаж?", a: "Да — полный цикл: доставка, шеф-монтаж, пусконаладка, обучение персонала и гарантийное обслуживание." },
                ].map((faq, i) => (
                  <CatalogFAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:flex items-stretch justify-center px-4">
              <div className="w-px bg-slate-200" />
            </div>
            <div className="lg:hidden h-px bg-slate-200 my-4" />

            {/* SEO текст */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Полимерное оборудование от производителя</h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  ООО СЗПК «Пласт-Металл Про» — производственно-инжиниринговая компания, специализирующаяся на
                  разработке, изготовлении и монтаже промышленного оборудования из химически стойких полимеров:
                  полипропилена (PP), полиэтилена (PE) и поливинилхлорида (PVC).
                </p>
                <p>
                  Наш каталог включает более 7 категорий оборудования: промышленные ёмкости объёмом от 50 литров
                  до 300 м³, системы водоочистки (ФФУ, ламельные отстойники, станции дозирования), газоочистное
                  оборудование (скрубберы, фильтры ФВГ, каплеуловители), вентиляцию из полипропилена, канализационные
                  насосные станции, химические реакторы и гальваническое оборудование.
                </p>
                <p>
                  Собственное производство с ЧПУ-оборудованием расположено в Ленинградской области. Осуществляем
                  доставку и монтаж по всей России и СНГ. Гарантия на всё оборудование — 5 лет, срок службы —
                  от 30 лет. Работаем как по типовым проектам, так и по индивидуальным ТЗ.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["полимерное оборудование", "ёмкости из полипропилена", "водоочистка", "газоочистка", "скрубберы", "КНС", "ГОСТ"].map((tag) => (
                  <span key={tag} className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </CorporatePageShell>
  );
};

/* ── Subcategory detail ── */
const SubcategoryDetail = ({ categorySlug, subSlug }: { categorySlug: string; subSlug: string }) => {
  const category = findCategory(categorySlug);
  if (!category) return <Navigate to="/catalog" replace />;
  const result = findSubcategory(categorySlug, subSlug);
  if (!result) return <Navigate to={`/catalog/${categorySlug}`} replace />;
  if (result.subcategory.externalPath) return <Navigate to={result.subcategory.externalPath} replace />;

  return (
    <CorporatePageShell
      breadcrumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name, href: `/catalog/${categorySlug}` }, { label: result.subcategory.name }]}
      title={result.subcategory.name}
      seo={{ title: `${result.subcategory.name} | СЗПК`, description: result.subcategory.description || result.subcategory.name, keywords: result.subcategory.name }}
    >
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden max-w-[800px]">
            {result.subcategory.image && (
              <div className="aspect-[16/9] bg-white flex items-center justify-center">
                <img src={result.subcategory.image} alt={result.subcategory.name} className="w-full h-full object-contain" />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{result.subcategory.name}</h2>
              <p className="text-sm text-slate-500">{result.subcategory.description || "Описание уточняйте по запросу."}</p>
              <a href="#cta-form" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-amber-600 hover:text-amber-500">
                Запросить расчёт <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </CorporatePageShell>
  );
};

/* ── Category page with subcategory browser ── */
const CategoryBrowser = ({ categorySlug }: { categorySlug: string }) => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory(categorySlug);
  if (!category) return <Navigate to="/catalog" replace />;

  const catIndex = catalog.findIndex((c) => c.slug === category.slug) + 1;
  const selectedSub = category.subcategories.find((s) => s.id === selectedSubId);

  return (
    <CorporatePageShell
      breadcrumbs={[{ label: "Каталог", href: "/catalog" }, { label: category.name }]}
      title={category.name}
      subtitle={category.description}
      seo={{ title: `${category.name} | СЗПК`, description: `${category.name} — полимерное оборудование`, keywords: category.name }}
    >
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar */}
            <nav className="md:w-[220px] shrink-0">
              <ul className="space-y-0.5">
                {category.subcategories.map((sub, i) => {
                  const isSelected = selectedSubId === sub.id;
                  return (
                    <li key={sub.id}>
                      <button
                        onClick={() => setSelectedSubId(isSelected ? null : sub.id)}
                        className={`group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left transition-colors ${
                          isSelected
                            ? "bg-amber-50 border border-amber-200"
                            : "hover:bg-slate-50 border border-transparent"
                        }`}
                      >
                        <span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-amber-600" : "text-slate-400"}`}>
                          {catIndex}.{i + 1}
                        </span>
                        <span className={`transition-colors ${isSelected ? "text-amber-600 font-semibold" : "text-slate-700 group-hover:text-amber-600"}`}>
                          {sub.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right content */}
            <div className="flex-1">
              {selectedSub ? (
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  <div className="aspect-[16/9] bg-slate-50 flex items-center justify-center">
                    {selectedSub.image ? (
                      <img src={selectedSub.image} alt={selectedSub.name} className="w-full h-full object-contain" />
                    ) : (
                      <ImageOff className="h-12 w-12 text-slate-300" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-400 font-semibold mb-1">
                      {catIndex}.{category.subcategories.findIndex((s) => s.id === selectedSub.id) + 1}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{selectedSub.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">
                      {selectedSub.description || "Описание уточняйте по запросу."}
                    </p>
                    {selectedSub.externalPath ? (
                      <Link to={selectedSub.externalPath} className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-500">
                        Перейти на страницу <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <a href="#cta-form" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-500">
                        Запросить расчёт <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <SubcategoryGrid category={category} catIndex={catIndex} onSelect={setSelectedSubId} />
              )}
            </div>
          </div>
        </div>
      </section>
    </CorporatePageShell>
  );
};

/* ── Subcategory card grid (extracted for readability) ── */
const SubcategoryGrid = ({ category, catIndex, onSelect }: {
  category: ReturnType<typeof findCategory> & {};
  catIndex: number;
  onSelect: (id: string) => void;
}) => {
  const groups = category.subcategories.reduce<Record<string, typeof category.subcategories>>((acc, sub) => {
    const key = sub.group || "";
    if (!acc[key]) acc[key] = [];
    acc[key].push(sub);
    return acc;
  }, {});
  const groupKeys = Object.keys(groups);
  const hasGroups = groupKeys.length > 1 || (groupKeys.length === 1 && groupKeys[0] !== "");

  const renderCard = (sub: typeof category.subcategories[number], i: number) => {
    const cardContent = (
      <>
        <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center">
          {sub.image ? (
            <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" />
          ) : (
            <ImageOff className="h-10 w-10 text-slate-300" />
          )}
        </div>
        <div className="px-3 py-2.5">
          <p className="text-xs text-slate-400 font-semibold">{catIndex}.{i + 1}</p>
          <p className="text-sm font-medium text-slate-700 group-hover:text-amber-600 transition-colors mt-0.5">{sub.name}</p>
        </div>
      </>
    );

    const cls = "group rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-amber-300 hover:shadow-md transition-all text-left";

    if (sub.externalPath) {
      return (
        <Link key={sub.id} to={sub.externalPath} className={`${cls} block`}>
          {cardContent}
        </Link>
      );
    }

    return (
      <button key={sub.id} onClick={() => onSelect(sub.id)} className={cls}>
        {cardContent}
      </button>
    );
  };

  if (!hasGroups) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {category.subcategories.map((sub, i) => renderCard(sub, i))}
      </div>
    );
  }

  let globalIndex = 0;
  return (
    <div className="space-y-6">
      {groupKeys.map((groupName) => {
        const items = groups[groupName];
        const startIndex = globalIndex;
        globalIndex += items.length;
        return (
          <div key={groupName}>
            {groupName && <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">{groupName}</h3>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((sub, i) => renderCard(sub, startIndex + i))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── Router entry point ── */
const CatalogPage = () => {
  const { categorySlug, subSlug } = useParams<{ categorySlug: string; subSlug?: string }>();

  if (!categorySlug) return <CategoryListing />;
  if (subSlug) return <SubcategoryDetail categorySlug={categorySlug} subSlug={subSlug} />;
  return <CategoryBrowser categorySlug={categorySlug} />;
};

export default CatalogPage;
