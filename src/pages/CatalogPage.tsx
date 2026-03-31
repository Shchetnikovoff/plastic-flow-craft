import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ImageOff } from "lucide-react";
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
      {/* Category grid */}
      <section className="w-full bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Направления</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
