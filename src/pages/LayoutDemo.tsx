import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import Header from "@/components/Header";
import { catalog } from "@/data/catalog";
import { useState } from "react";
import { CartProvider } from "@/contexts/CartContext";

const LayoutDemoInner = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const getThumb = (cat: typeof catalog[number]) =>
    cat.image || cat.subcategories.find((s) => s.image)?.image;

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <main className="mx-auto max-w-[1200px] px-4 py-8 space-y-16">

        {/* Variant 1: 2 columns, 16:9 */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">Вариант 1 — 2 колонки (16:9)</h2>
          <p className="text-sm text-muted-foreground mb-4">Крупные карточки с широкими изображениями</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {catalog.map((cat) => {
              const thumb = getThumb(cat);
              return (
                <div key={cat.id} className="rounded-lg border border-border bg-card overflow-hidden">
                  <div className="aspect-[16/9] bg-white flex items-center justify-center">
                    {thumb ? (
                      <img src={thumb} alt={cat.name} className="w-full h-full object-contain" />
                    ) : (
                      <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.subcategories.length} позиций</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Variant 2: 1 column, horizontal cards */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">Вариант 2 — 1 колонка (горизонтальные)</h2>
          <p className="text-sm text-muted-foreground mb-4">Изображение слева, описание справа</p>
          <div className="space-y-4">
            {catalog.map((cat) => {
              const thumb = getThumb(cat);
              return (
                <div key={cat.id} className="rounded-lg border border-border bg-card overflow-hidden flex flex-col sm:flex-row">
                  <div className="sm:w-[320px] shrink-0 aspect-[16/9] sm:aspect-auto bg-white flex items-center justify-center">
                    {thumb ? (
                      <img src={thumb} alt={cat.name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="px-5 py-4 flex flex-col justify-center">
                    <h3 className="text-base font-semibold text-foreground">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cat.description || "Описание уточняйте по запросу."}</p>
                    <p className="text-xs text-muted-foreground mt-2">{cat.subcategories.length} позиций</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Variant 3: 3 columns */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">Вариант 3 — 3 колонки</h2>
          <p className="text-sm text-muted-foreground mb-4">Средний размер, компактная сетка</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalog.map((cat) => {
              const thumb = getThumb(cat);
              return (
                <div key={cat.id} className="rounded-lg border border-border bg-card overflow-hidden">
                  <div className="aspect-[4/3] bg-white flex items-center justify-center">
                    {thumb ? (
                      <img src={thumb} alt={cat.name} className="w-full h-full object-contain" />
                    ) : (
                      <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="px-3 py-2.5">
                    <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.subcategories.length} позиций</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </>
  );
};

const LayoutDemo = () => (
  <CartProvider>
    <LayoutDemoInner />
  </CartProvider>
);

export default LayoutDemo;
