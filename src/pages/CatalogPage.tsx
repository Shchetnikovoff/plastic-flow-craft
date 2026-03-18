import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Construction, ImageOff } from "lucide-react";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { catalog, findCategory, findSubcategory } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CatalogPageInner = () => {
  const { categorySlug, subSlug } = useParams<{ categorySlug: string; subSlug?: string }>();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; }
    toast.success("Заявка отправлена!");
    setForm({ name: "", phone: "", email: "", description: "" });
  };
  const scrollToForm = () => { document.getElementById("catalog-cta-form")?.scrollIntoView({ behavior: "smooth" }); };

  // Category listing (no slug)
  if (!categorySlug) {
    return (
      <>
        <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
          {/* Hero */}
          <section className="mb-10">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Каталог продукции</h1>
            <p className="text-sm text-muted-foreground mb-5">Полный ассортимент полимерного оборудования для промышленных предприятий — от проектирования до монтажа.</p>
            <Button onClick={scrollToForm}>Получить расчёт стоимости</Button>
          </section>

          {/* Category grid */}
          <section className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Направления</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {catalog.map((cat) => {
                const thumb = cat.image || cat.subcategories.find((s) => s.image)?.image;
                return (
                  <Link
                    key={cat.id}
                    to={`/catalog/${cat.slug}`}
                    className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="aspect-video bg-white flex items-center justify-center">
                      {thumb ? (
                        <img src={thumb} alt={cat.name} className="w-full h-full object-contain" />
                      ) : (
                        <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                      )}
                    </div>
                    <div className="px-3 py-2.5">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cat.subcategories.length} {cat.subcategories.length === 1 ? "позиция" : cat.subcategories.length < 5 ? "позиции" : "позиций"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CTA form */}
          <section id="catalog-cta-form" className="mb-10 scroll-mt-20">
            <Card><CardContent className="p-6">
              <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Нужна консультация или расчёт?</h2>
              <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — ответим в течение 24 часов.</p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
                <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
                <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
                <div className="space-y-1.5 sm:col-span-3"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите задачу…" rows={3} maxLength={1000} /></div>
                <div className="sm:col-span-3"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
              </form>
            </CardContent></Card>
          </section>

          <PageFooter />
        </main>
      </>
    );
  }

  const category = findCategory(categorySlug);
  if (!category) return <Navigate to="/catalog" replace />;

  // Subcategory detail page
  if (subSlug) {
    const result = findSubcategory(categorySlug, subSlug);
    if (!result) return <Navigate to={`/catalog/${categorySlug}`} replace />;
    // If it has externalPath, redirect
    if (result.subcategory.externalPath) {
      return <Navigate to={result.subcategory.externalPath} replace />;
    }

    return (
      <>
        <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/catalog">Каталог</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/catalog/${category.slug}`}>{category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{result.subcategory.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="rounded-xl border border-border bg-card p-8">
            {result.subcategory.image && (
              <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden mb-4">
                <img src={result.subcategory.image} alt={result.subcategory.name} className="w-full h-full object-contain" />
              </div>
            )}
            <h2 className="text-xl font-bold text-foreground mb-2">{result.subcategory.name}</h2>
            <p className="text-sm text-muted-foreground">{result.subcategory.description || "Описание уточняйте по запросу."}</p>
            <a href="#cta-form" className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary hover:underline">Запросить расчёт →</a>
          </div>
        </main>
      </>
    );
  }

  // Category page with list of subcategories
  // Find category index for numbering (1-based)
  const catIndex = catalog.findIndex((c) => c.slug === category.slug) + 1;

  const selectedSub = category.subcategories.find((s) => s.id === selectedSubId);

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/catalog">Каталог</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Description banner */}
        {category.description && (
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">{category.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
          </div>
        )}
        {!category.description && (
          <h2 className="text-2xl font-bold text-foreground mb-6">{category.name}</h2>
        )}

        {/* Two-column layout: sidebar + detail card */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar — numbered list */}
          <nav className="md:w-[260px] shrink-0">
            <ul className="space-y-0.5">
              {category.subcategories.map((sub, i) => {
                const isSelected = selectedSubId === sub.id;
                return (
                  <li key={sub.id}>
                    <button
                      onClick={() => setSelectedSubId(isSelected ? null : sub.id)}
                      className={`group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left transition-colors ${
                        isSelected
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted border border-transparent"
                      }`}
                    >
                      <span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                        {catIndex}.{i + 1}
                      </span>
                      <span className={`transition-colors ${isSelected ? "text-primary font-semibold" : "text-foreground group-hover:text-primary"}`}>
                        {sub.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right content — selected item detail or card grid */}
          <div className="flex-1">
            {selectedSub ? (
              <div className="rounded-xl border border-border bg-card overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
                {/* Image */}
                <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                  {selectedSub.image ? (
                    <img
                      src={selectedSub.image}
                      alt={selectedSub.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageOff className="h-12 w-12 text-muted-foreground/40" />
                  )}
                </div>
                {/* Info */}
                <div className="p-5">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">
                    {catIndex}.{category.subcategories.findIndex((s) => s.id === selectedSub.id) + 1}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-2">{selectedSub.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedSub.description || "Описание уточняйте по запросу."}
                  </p>
                  {selectedSub.externalPath ? (
                    <Link
                      to={selectedSub.externalPath}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      Перейти на страницу
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <a href="#cta-form" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      Запросить расчёт →
                    </a>
                  )}
                </div>
              </div>
            ) : (
              (() => {
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
                      <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                        {sub.image ? (
                          <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                        )}
                      </div>
                      <div className="px-3 py-2.5">
                        <p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">
                          {sub.name}
                        </p>
                      </div>
                    </>
                  );

                  if (sub.externalPath) {
                    return (
                      <Link
                        key={sub.id}
                        to={sub.externalPath}
                        className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left block"
                      >
                        {cardContent}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubId(sub.id)}
                      className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left"
                    >
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
                          {groupName && (
                            <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">{groupName}</h3>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {items.map((sub, i) => renderCard(sub, startIndex + i))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()
            )}
          </div>
        </div>
        <PageFooter />
      </main>
    </>
  );
};

const CatalogPage = () => (
  <CartProvider>
    <CatalogPageInner />
  </CartProvider>
);

export default CatalogPage;
