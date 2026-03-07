import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { emkostGroups } from "@/data/emkostiProducts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ImageGalleryWithLightbox,
  ArticleBreakdown,
  SelectorBadges,
  ProductPageShell,
  QuantityCell,
  AddToCartButton,
  type ArticleSegment,
} from "@/components/configurator";

/* ── image sets per group ── */
const groupImages: Record<string, string[]> = {
  "vertical-pp": ["/images/emkosti-hero-1.png", "/images/emkosti-hero-2.png", "/images/emkost-pryam-pp-1.png", "/images/emkost-pryam-pp-2.png"],
  "vertical-pnd": ["/images/emkost-pryam-pnd-1.jpg", "/images/emkost-pryam-pnd-2.png", "/images/emkosti-hero-1.png"],
  "horizontal-pp": ["/images/emkost-pryam-pp-3.png", "/images/emkost-pryam-pp-4.png", "/images/emkost-pryam-schema-1.jpg"],
  "horizontal-pnd": ["/images/emkost-pryam-pnd-1.jpg", "/images/emkost-pryam-pnd-2.png", "/images/emkost-pryam-schema-2.png"],
};

const orientationLabels: Record<string, string> = {
  "vertical-pp": "Вертикальная", "vertical-pnd": "Вертикальная",
  "horizontal-pp": "Горизонтальная", "horizontal-pnd": "Горизонтальная",
};

const materialLabels: Record<string, string> = {
  "vertical-pp": "Полипропилен (PP)", "vertical-pnd": "Полиэтилен (ПНД)",
  "horizontal-pp": "Полипропилен (PP)", "horizontal-pnd": "Полиэтилен (ПНД)",
};

const CatalogContent = () => {
  const { addItem } = useCart();
  const [selectedGroupId, setSelectedGroupId] = useState(emkostGroups[0].id);
  const group = emkostGroups.find((g) => g.id === selectedGroupId) || emkostGroups[0];
  const [selectedCatId, setSelectedCatId] = useState(group.categories[0].id);
  const category = group.categories.find((c) => c.id === selectedCatId) || group.categories[0];
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const images = groupImages[selectedGroupId] || groupImages["vertical-pp"];

  const handleGroupChange = (gId: string) => {
    setSelectedGroupId(gId);
    const g = emkostGroups.find((gr) => gr.id === gId)!;
    setSelectedCatId(g.categories[0].id);
    setQuantities({});
    setSelectedImage(0);
  };

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [article]: Math.max(1, (prev[article] || 1) + delta) }));
  };

  const handleAdd = (article: string, diameter: number) => {
    const qty = quantities[article] || 1;
    addItem({ article, diameter, wallThickness: 0 }, qty);
    toast.success(`${article} (${qty} шт.) добавлен в корзину`);
  };

  const firstItem = category.items[0];
  const articleParts = firstItem ? firstItem.article.split("-") : ["—", "—"];
  const articleSegments: ArticleSegment[] = [
    { value: articleParts[0], label: "Тип ёмкости", desc: group.title },
    { value: articleParts.slice(1).join("-") || "V", label: "Объём, л", desc: "Номинальный объём" },
  ];

  return (
    <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Конфигуратор</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ImageGalleryWithLightbox images={images} selectedImage={selectedImage} onSelectedImageChange={setSelectedImage} />

      {/* Description + Characteristics */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-8">
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Объём</span>
              <span className="text-sm font-semibold text-foreground">1 000–50 000 л</span>
            </div>
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Материал</span>
              <span className="text-sm font-semibold text-foreground">{materialLabels[selectedGroupId]}</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Ориентация</span>
              <span className="text-sm font-semibold text-foreground">{orientationLabels[selectedGroupId]}</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Модификация</span>
              <span className="text-sm font-semibold text-foreground">{category.title}</span>
            </div>
          </div>
        </div>
      </div>

      <SelectorBadges
        label="Тип ёмкости"
        options={emkostGroups.map((g) => ({ id: g.id, title: g.title }))}
        selected={selectedGroupId}
        onChange={handleGroupChange}
      />

      <SelectorBadges
        label="Модификация"
        options={group.categories.map((cat) => ({ id: cat.id, title: cat.title }))}
        selected={selectedCatId}
        onChange={(id) => { setSelectedCatId(id); setQuantities({}); }}
      />

      {/* Table */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase text-center">
          Технические характеристики — {group.title} — {category.title}
        </h2>

        <ArticleBreakdown exampleArticle={firstItem?.article || "—"} segments={articleSegments} />

        <div className="rounded-lg border overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                <TableHead className="text-primary-foreground font-semibold text-xs">Артикул</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Объём, л</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Ø, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">{category.heightLabel}</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center whitespace-nowrap">Кол-во</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.items.map((item, i) => (
                <TableRow key={item.article} className={`transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                  <TableCell className="font-mono text-xs text-primary whitespace-nowrap">{item.article}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{item.volume.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-sm">{item.diameter.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-sm text-primary">{item.height.toLocaleString()}</TableCell>
                  <TableCell>
                    <QuantityCell quantity={quantities[item.article] || 1} onDecrement={() => setQty(item.article, -1)} onIncrement={() => setQty(item.article, 1)} />
                  </TableCell>
                  <TableCell className="text-center">
                    <AddToCartButton onClick={() => handleAdd(item.article, item.diameter)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <footer className="border-t border-border pt-6 pb-4 mt-10 text-center text-xs text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">ООО СЗПК «Пласт-Металл ПРО»</p>
        <p>Ленинградская область, д. Разметелево, ул. Строителей 27</p>
        <p>Телефон: <a href="tel:+79633225540" className="text-primary hover:underline">+7 (963) 322-55-40</a> · E-mail: <a href="mailto:osobenkov@list.ru" className="text-primary hover:underline">osobenkov@list.ru</a></p>
        <p>Режим работы: пн.–пт. 9:00–18:00</p>
      </footer>
    </main>
  );
};

const EmkostiCatalog = () => (
  <ProductPageShell productType="otvod">
    <CatalogContent />
  </ProductPageShell>
);

export default EmkostiCatalog;
