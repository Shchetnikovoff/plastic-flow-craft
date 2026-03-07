import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Construction, ImageOff } from "lucide-react";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { catalog, findCategory, findSubcategory } from "@/data/catalog";
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

  // Category listing (no slug)
  if (!categorySlug) {
    return (
      <>
        <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Каталог продукции</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalog.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.slug}`}
                className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {cat.subcategories.length} {cat.subcategories.length === 1 ? "позиция" : cat.subcategories.length < 5 ? "позиции" : "позиций"}
                </p>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary mt-3 transition-colors" />
              </Link>
            ))}
          </div>
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

          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">{result.subcategory.name}</h2>
            <p className="text-muted-foreground">Раздел в разработке. Информация появится в ближайшее время.</p>
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
                    Раздел в разработке. Информация появится в ближайшее время.
                  </p>
                  {selectedSub.externalPath && (
                    <Link
                      to={selectedSub.externalPath}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      Перейти на страницу
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.subcategories.map((sub, i) => {
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
                })}
              </div>
            )}
          </div>
        </div>
        <footer className="border-t border-border pt-6 pb-4 mt-10 text-center text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">ООО СЗПК «Пласт-Металл ПРО»</p>
          <p>Ленинградская область, д. Разметелево, ул. Строителей 27</p>
          <p>Телефон: +7 (963) 322-55-40 · E-mail: osobenkov@list.ru</p>
          <p>Режим работы: пн.–пт. 9:00–18:00</p>
        </footer>
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
