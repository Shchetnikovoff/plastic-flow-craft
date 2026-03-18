import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { materials, materialSpecs, connectionTypes, baseSizes, type ConnectionType } from "@/data/products";
import { getProductImages } from "@/data/products";
import { baseTroynikSizes, troynikImages } from "@/data/troynikProducts";
import { razdvizhnoyImages, razdvizhnoyFlanecImages, getRazdvizhnoySizes } from "@/data/razdvizhnoyProducts";
import { vozdukhovodImages, getVozdukhovodSizes, vozdukhovodAvailableLengths } from "@/data/vozdukhovodProducts";
import { emkostGroups } from "@/data/emkostiProducts";
import { pozharnyeRect, pozharnyePodzem, pozharnyeHoriz } from "@/data/pozharnyeProducts";
import { perelivnyeProducts } from "@/data/perelivnyeProducts";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import ContactFormFields, { type ContactFormData, type ContactFormErrors, validateContactForm } from "@/components/ContactFormFields";
import { generateSpecPdf } from "@/lib/generateSpecPdf";
import DimensionOverlay from "@/components/DimensionOverlay";

/** Try to find an emkost (tank) product by article */
function parseEmkostArticle(article: string) {
  // Search in emkostGroups (vertical/horizontal tanks)
  for (const group of emkostGroups) {
    for (const cat of group.categories) {
      const item = cat.items.find((i) => i.article === article);
      if (item) {
        const isHorizontal = group.id.startsWith("horizontal");
        const isPnd = group.id.includes("pnd");
        const materialName = isPnd ? "Полиэтилен (ПНД/HDPE)" : "Полипропилен (ПП)";
        // Pick image based on tank type
        let image = "/images/emkosti-real-proizvodstvo.jpg";
        if (isHorizontal) {
          if (cat.id.includes("lv")) image = "/images/emkost-horiz-pp-high.png";
          else image = "/images/emkost-horiz-pp-low.png";
          if (isPnd) image = "/images/emkost-horiz-pnd-photo.jpg";
        } else {
          if (cat.id.includes("sloped")) image = "/images/emkost-vert-pp-sloped.png";
          else if (cat.id.includes("conical")) image = "/images/emkost-vert-pp-conical.png";
          else image = "/images/emkost-vert-pp-flat.jpg";
          if (isPnd) image = "/images/emkost-vert-pnd-photo.png";
        }
        return {
          productType: "emkost" as const,
          emkostType: isHorizontal ? "horizontal" : "vertical",
          title: `${isHorizontal ? "Горизонтальная" : "Вертикальная"} ёмкость ${item.volume.toLocaleString()} л`,
          subtitle: `${cat.title} — ${group.title}`,
          materialName,
          volume: item.volume,
          diameter: item.diameter,
          heightOrLength: item.height,
          heightLabel: cat.heightLabel,
          description: cat.description,
          image,
        };
      }
    }
  }
  // Search in pozharnyeRect
  const rect = pozharnyeRect.find((p) => p.article === article);
  if (rect) {
    return {
      productType: "emkost" as const,
      emkostType: "rectangular",
      title: `Ёмкость пожарная прямоугольная ${rect.volume.toLocaleString()} л`,
      subtitle: "Пожарная ёмкость прямоугольная",
      materialName: "Полипропилен (ПП)",
      volume: rect.volume,
      diameter: 0,
      heightOrLength: rect.height,
      heightLabel: "H, мм",
      description: `Размеры: ${rect.length}×${rect.width}×${rect.height} мм`,
      image: "/images/emkost-pryam-pp-1.png",
      rectDims: { length: rect.length, width: rect.width, height: rect.height },
    };
  }
  // Search in pozharnyePodzem
  const pdz = pozharnyePodzem.find((p) => p.article === article);
  if (pdz) {
    return {
      productType: "emkost" as const,
      emkostType: "underground",
      title: `Ёмкость пожарная подземная ${pdz.volumeM3} м³`,
      subtitle: "Пожарная ёмкость подземная",
      materialName: "Полипропилен (ПП)",
      volume: pdz.volumeM3 * 1000,
      diameter: pdz.diameter,
      heightOrLength: pdz.length,
      heightLabel: "L, мм",
      description: `Подземная цилиндрическая ёмкость. Диаметр ${pdz.diameter} мм, длина ${pdz.length} мм.`,
      image: "/images/emkosti-podzemnye-1.jpg",
    };
  }
  // Search in pozharnyeHoriz
  const horiz = pozharnyeHoriz.find((p) => p.article === article);
  if (horiz) {
    return {
      productType: "emkost" as const,
      emkostType: "horizontal",
      title: `Ёмкость пожарная горизонтальная ${horiz.volume.toLocaleString()} л`,
      subtitle: "Пожарная ёмкость горизонтальная",
      materialName: "Полипропилен (ПП)",
      volume: horiz.volume,
      diameter: horiz.diameter,
      heightOrLength: horiz.length,
      heightLabel: "L, мм",
      description: `Горизонтальная цилиндрическая ёмкость. Диаметр ${horiz.diameter} мм, длина ${horiz.length} мм.`,
      image: "/images/emkosti-hero-2.png",
    };
  }
  // Search in perelivnye (overflow tanks for pools)
  if (article.startsWith("ПЕ-")) {
    const item = perelivnyeProducts.find((p) => p.article === article);
    if (item) {
      return {
        productType: "emkost" as const,
        emkostType: "rectangular",
        title: `Переливная ёмкость для бассейна ${item.label}`,
        subtitle: "Переливная ёмкость для бассейна из полипропилена",
        materialName: "Полипропилен (PP-H)",
        volume: item.length * item.width * item.height / 1e6,
        diameter: 0,
        heightOrLength: item.height,
        heightLabel: "H, мм",
        description: `Переливная ёмкость для бассейна ${item.label}, полипропилен PP-H, размеры ${item.length}×${item.width}×${item.height} мм`,
        image: "/images/emkost-perelivnaya-bassein.jpg",
        rectDims: { length: item.length, width: item.width, height: item.height },
      };
    }
  }
  return null;
}

/** Parse article to extract product params */
function parseArticle(article: string) {
  // Troynik format: ТР-MATERIAL[-COLOR]-DxD1
  if (article.startsWith("ТР-")) {
    const parts = article.split("-");
    const materialCode = parts[1];
    const material = materials.find((m) => m.code === materialCode);
    if (!material) return null;
    const specs = materialSpecs[material.name];
    const lastPart = parts[parts.length - 1]; // "DxD1"
    const [dStr, d1Str] = lastPart.split("x");
    const d = parseInt(dStr);
    const d1 = parseInt(d1Str);
    const colorCode = parts.length === 4 ? parts[2] : null;
    const color = colorCode ? specs?.colors.find((c) => c.colorCode === colorCode) : specs?.colors[0];
    const sizeData = baseTroynikSizes.find((s) => s.d === d && s.d1 === d1);
    return {
      productType: "troynik" as const,
      connectionType: "rastrub" as ConnectionType,
      angle: 90 as const,
      material,
      color,
      diameter: d,
      sizeData: sizeData ? { wallThickness: sizeData.wallThickness, socketThickness: sizeData.socket, availableLength: sizeData.l } : null,
      troynikSize: sizeData || null,
      razdvizhnoySize: null,
      vozdukhovodSize: null,
    };
  }

  // Vozdukhovod format: ВК-MATERIAL[-COLOR]-DIAMETER
  if (article.startsWith("ВК-")) {
    const stripped = article.replace("ВК-", "");
    const parts = stripped.split("-");
    const materialCode = parts[0];
    const material = materials.find((m) => m.code === materialCode);
    if (!material) return null;
    const specs = materialSpecs[material.name];
    const diameter = parseInt(parts[parts.length - 1]);
    const hasColor = parts.length === 3;
    const colorCode = hasColor ? parts[1] : specs?.colors[0]?.colorCode || "";
    const color = hasColor ? specs?.colors.find((c) => c.colorCode === colorCode) : specs?.colors[0];
    const sizes = getVozdukhovodSizes(material.name, colorCode);
    const sizeEntry = sizes.find((s) => s.diameter === diameter);
    const sizeData = sizeEntry ? { wallThickness: sizeEntry.wallThickness, socketThickness: sizeEntry.socketThickness, availableLength: null as number | null } : null;
    return {
      productType: "vozdukhovod" as const,
      connectionType: "rastrub" as ConnectionType,
      angle: 90 as const,
      material,
      color,
      diameter,
      sizeData,
      troynikSize: null,
      razdvizhnoySize: null,
      vozdukhovodSize: sizeEntry ? { availableLengths: vozdukhovodAvailableLengths } : null,
      specs,
    };
  }

  // Razdvizhnoy format: РЭ-MATERIAL[-COLOR]-DIAMETER or РЭ-Ф-MATERIAL[-COLOR]-DIAMETER (flanec)
  if (article.startsWith("РЭ-")) {
    const isFlanec = article.startsWith("РЭ-Ф-");
    const stripped = isFlanec ? article.replace("РЭ-Ф-", "") : article.replace("РЭ-", "");
    const parts = stripped.split("-");
    const materialCode = parts[0];
    const material = materials.find((m) => m.code === materialCode);
    if (!material) return null;
    const specs = materialSpecs[material.name];
    const diameter = parseInt(parts[parts.length - 1]);
    const hasColor = parts.length === 3;
    const colorCode = hasColor ? parts[1] : specs?.colors[0]?.colorCode || "";
    const color = hasColor ? specs?.colors.find((c) => c.colorCode === colorCode) : specs?.colors[0];
    const sizes = getRazdvizhnoySizes(material.name, colorCode);
    const sizeEntry = sizes.find((s) => s.diameter === diameter);
    const sizeData = sizeEntry ? { wallThickness: sizeEntry.wallThickness, socketThickness: sizeEntry.socket, availableLength: null as number | null } : null;
    return {
      productType: "razdvizhnoy" as const,
      connectionType: (isFlanec ? "flanec" : "rastrub") as ConnectionType,
      angle: 90 as const,
      material,
      color,
      diameter,
      sizeData,
      troynikSize: null,
      razdvizhnoySize: sizeEntry ? { lMin: sizeEntry.lMin, lMax: sizeEntry.lMax } : null,
      vozdukhovodSize: null,
      specs,
    };
  }

  // Elbow format: PREFIX-ANGLE-MATERIAL[-COLOR]-DIAMETER
  const parts = article.split("-");
  if (parts.length < 4) return null;
  const prefix = parts[0];
  const connectionType: ConnectionType = prefix === "ОТВФ" ? "flanec" : "rastrub";
  const angle = parseInt(parts[1]) as 90 | 60;
  const materialCode = parts[2];
  const diameter = parseInt(parts[parts.length - 1]);
  const colorCode = parts.length === 5 ? parts[3] : null;
  const material = materials.find((m) => m.code === materialCode);
  if (!material) return null;
  const specs = materialSpecs[material.name];
  const color = colorCode ? specs?.colors.find((c) => c.colorCode === colorCode) : specs?.colors[0];
  const sizeData = baseSizes.find((s) => s.diameter === diameter);
  return { productType: "otvod" as const, connectionType, angle, material, color, diameter, sizeData, troynikSize: null, razdvizhnoySize: null, vozdukhovodSize: null, specs };
}

const ProductDetailContent = () => {
  const { article } = useParams<{ article: string }>();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [contactData, setContactData] = useState<ContactFormData>({ name: "", email: "", phone: "", inn: "" });
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});

  if (!article) return <div className="p-8 text-center text-muted-foreground">Артикул не указан</div>;

  // Try emkost first
  const emkost = parseEmkostArticle(article);
  if (emkost) {
    const handleAddEmkost = () => {
      addItem({ article, diameter: emkost.diameter, wallThickness: 0 }, qty);
      toast.success(`${article} (${qty} шт.) добавлен в корзину`);
    };

    const handleEmkostPdf = async () => {
      const errors = validateContactForm(contactData);
      setContactErrors(errors);
      if (Object.keys(errors).length > 0) return;

      await generateSpecPdf(
        {
          article,
          diameter: emkost.diameter,
          wallThickness: 0,
          socketThickness: 0,
          availableLength: null,
          connectionName: "",
          materialName: emkost.materialName,
        },
        contactData
      );
      toast.success("PDF-спецификация скачана");
      setPdfDialogOpen(false);
    };

    const handleEmkostContactChange = (field: keyof ContactFormData, value: string) => {
      setContactData((prev) => ({ ...prev, [field]: value }));
      if (contactErrors[field]) {
        setContactErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

    const isPerelivnaya = article.startsWith("ПЕ-");

    return (
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            {isPerelivnaya && (
              <>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti/perelivnye-bassejny">Переливные</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem><BreadcrumbPage>{article}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg border bg-card mb-3">
              {"rectDims" in emkost && emkost.rectDims && !emkost.image.includes("perelivnaya") ? (
                <DimensionOverlay
                  imageSrc={emkost.image}
                  imageAlt={emkost.title}
                  length={emkost.rectDims.length}
                  width={emkost.rectDims.width}
                  height={emkost.rectDims.height}
                  isoCorners={
                    emkost.image.includes("pryam")
                      ? {
                          frontTopLeft:  { x: 60,  y: 65  },
                          frontTopRight: { x: 290, y: 45  },
                          frontBotLeft:  { x: 60,  y: 310 },
                          frontBotRight: { x: 290, y: 330 },
                          backTopRight:  { x: 345, y: 30  },
                          backBotRight:  { x: 345, y: 290 },
                        }
                      : undefined
                  }
                />
              ) : (
                <img src={emkost.image} alt={emkost.title} className="h-full w-full object-contain p-4" />
              )}
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{emkost.title}</h1>
            <p className="font-mono text-sm text-muted-foreground mb-2">{article}</p>
            <p className="text-sm text-muted-foreground mb-6">{emkost.subtitle}</p>

            <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-6">
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Объём</span>
                <span className="text-sm font-semibold text-foreground">{emkost.volume.toLocaleString()} л</span>
              </div>
              {emkost.diameter > 0 && (
                <div className="bg-card p-3">
                  <span className="block text-xs text-muted-foreground">Диаметр (D)</span>
                  <span className="text-sm font-semibold text-foreground">{emkost.diameter.toLocaleString()} мм</span>
                </div>
              )}
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">{emkost.heightLabel}</span>
                <span className="text-sm font-semibold text-foreground">{emkost.heightOrLength.toLocaleString()} мм</span>
              </div>
              {"rectDims" in emkost && emkost.rectDims && (
                <>
                  <div className="bg-card p-3 border-t">
                    <span className="block text-xs text-muted-foreground">Длина (L)</span>
                    <span className="text-sm font-semibold text-foreground">{emkost.rectDims.length.toLocaleString()} мм</span>
                  </div>
                  <div className="bg-card p-3 border-t">
                    <span className="block text-xs text-muted-foreground">Ширина (W)</span>
                    <span className="text-sm font-semibold text-foreground">{emkost.rectDims.width.toLocaleString()} мм</span>
                  </div>
                </>
              )}
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Материал</span>
                <span className="text-sm font-semibold text-foreground">{emkost.materialName}</span>
              </div>
            </div>

            {emkost.description && (
              <p className="text-sm text-muted-foreground mb-6">{emkost.description}</p>
            )}

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border rounded-md">
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty((q) => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button className="gap-2 flex-1" onClick={handleAddEmkost}>
                <ShoppingCart className="h-4 w-4" />
                В корзину
              </Button>
            </div>
            <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
              <FileDown className="h-4 w-4" />
              Скачать спецификацию (PDF)
            </Button>
          </div>
        </div>

        {/* PDF Download Dialog */}
        <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Скачать спецификацию</DialogTitle>
              <DialogDescription>
                Заполните контактные данные для скачивания PDF-спецификации
              </DialogDescription>
            </DialogHeader>
            <ContactFormFields data={contactData} errors={contactErrors} onChange={handleEmkostContactChange} />
            <Button className="w-full gap-2 mt-2" onClick={handleEmkostPdf}>
              <FileDown className="h-4 w-4" />
              Скачать PDF
            </Button>
          </DialogContent>
        </Dialog>
      </main>
    );
  }

  const parsed = parseArticle(article);
  if (!parsed) {
    return (
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Каталог</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{article}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="text-center text-muted-foreground">Товар с артикулом «{article}» не найден</p>
      </main>
    );
  }

  const { productType, connectionType, angle, material, color, diameter, sizeData, troynikSize, razdvizhnoySize, vozdukhovodSize, specs } = parsed;
  const conn = connectionTypes.find((c) => c.id === connectionType);
  const isTroynik = productType === "troynik";
  const isRazdvizhnoy = productType === "razdvizhnoy";
  const isVozdukhovod = productType === "vozdukhovod";
  const productImages = isVozdukhovod ? vozdukhovodImages : isRazdvizhnoy ? (connectionType === "flanec" ? razdvizhnoyFlanecImages : razdvizhnoyImages) : isTroynik ? troynikImages : getProductImages(connectionType, angle);

  const handleAdd = () => {
    addItem(
      { article, diameter, wallThickness: sizeData?.wallThickness || 0 },
      qty
    );
    toast.success(`${article} (${qty} шт.) добавлен в корзину`);
  };

  const handleDownloadPdf = async () => {
    const errors = validateContactForm(contactData);
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await generateSpecPdf(
      {
        article,
        diameter,
        wallThickness: sizeData?.wallThickness || 0,
        socketThickness: sizeData?.socketThickness || 0,
        availableLength: sizeData?.availableLength ?? null,
        connectionName: conn?.name || "",
        materialName: material.name,
        workingTemp: specs?.workingTemp,
        chemicalResistance: specs?.chemicalResistance,
        colorName: color?.name,
        colorRal: color?.ral,
      },
      contactData
    );
    toast.success("PDF-спецификация скачана");
    setPdfDialogOpen(false);
  };

  const handleContactChange = (field: keyof ContactFormData, value: string) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
    if (contactErrors[field]) {
      setContactErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={isVozdukhovod ? "/vozdukhovod" : isRazdvizhnoy ? "/razdvizhnoy" : isTroynik ? "/troynik" : "/"}>Каталог</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{article}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Gallery */}
        <div>
          <div
            className="aspect-square overflow-hidden rounded-lg border bg-card cursor-zoom-in mb-3"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={productImages[selectedImage]}
              alt={`Фото ${selectedImage + 1}`}
              className="h-full w-full object-contain p-4"
            />
          </div>
          <div className="flex gap-2">
            {productImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square w-16 overflow-hidden rounded border-2 transition-all ${
                  i === selectedImage ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
                }`}
              >
                <img src={src} alt={`Миниатюра ${i + 1}`} className="h-full w-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
            {isVozdukhovod ? "Воздуховод вентиляционный круглый" : isRazdvizhnoy ? "Раздвижной элемент вентиляционный" : isTroynik ? "Тройник вентиляционный" : `Отвод вентиляционный ${angle}°`}
          </h1>
          <p className="font-mono text-sm text-muted-foreground mb-6">{article}</p>

          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-6">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">{isTroynik ? "Диаметр D" : "Диаметр (DN)"}</span>
              <span className="text-sm font-semibold text-foreground">{diameter} мм</span>
            </div>
            {isTroynik && troynikSize && (
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Диаметр D1</span>
                <span className="text-sm font-semibold text-foreground">{troynikSize.d1} мм</span>
              </div>
            )}
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Соединение</span>
              <span className="text-sm font-semibold text-foreground">{conn?.name}</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Толщина стенки (S)</span>
              <span className="text-sm font-semibold text-foreground">{sizeData?.wallThickness} мм</span>
            </div>
            {isVozdukhovod && vozdukhovodSize ? (
              <>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Длина (L)</span>
                  <span className="text-sm font-semibold text-foreground">{vozdukhovodSize.availableLengths.join(", ")} мм</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Толщина раструба (Sp)</span>
                  <span className="text-sm font-semibold text-foreground">{sizeData?.socketThickness} мм</span>
                </div>
              </>
            ) : isRazdvizhnoy && razdvizhnoySize ? (
              <>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">L min</span>
                  <span className="text-sm font-semibold text-foreground">{razdvizhnoySize.lMin} мм</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">L max</span>
                  <span className="text-sm font-semibold text-foreground">{razdvizhnoySize.lMax} мм</span>
                </div>
              </>
            ) : (
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Длина (L)</span>
                <span className="text-sm font-semibold text-foreground">{sizeData?.availableLength ?? "—"} мм</span>
              </div>
            )}
            {isTroynik && troynikSize && (
              <>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">L1, мм</span>
                  <span className="text-sm font-semibold text-foreground">{troynikSize.l1}</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">A, мм</span>
                  <span className="text-sm font-semibold text-foreground">{troynikSize.a}</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">B, мм</span>
                  <span className="text-sm font-semibold text-foreground">{troynikSize.b}</span>
                </div>
              </>
            )}
            {!isTroynik && !isRazdvizhnoy && !isVozdukhovod && (
              <>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Толщина раструба (Sp)</span>
                  <span className="text-sm font-semibold text-foreground">{sizeData?.socketThickness} мм</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Угол</span>
                  <span className="text-sm font-semibold text-foreground">{angle}°</span>
                </div>
              </>
            )}
          </div>

          {/* Material info */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide">Материал</h2>
            <p className="text-sm text-foreground mb-1">{material.name}</p>
            {specs && (
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>Рабочая температура: {specs.workingTemp}</p>
                <p>Химическая стойкость: {specs.chemicalResistance}</p>
              </div>
            )}
            {color && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                <span className="text-sm text-foreground">{color.name}</span>
                {color.ral !== "—" && <span className="text-xs text-muted-foreground">{color.ral}</span>}
              </div>
            )}
          </div>

          {/* Add to cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border rounded-md">
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="gap-2 flex-1" onClick={handleAdd}>
              <ShoppingCart className="h-4 w-4" />
              В корзину
            </Button>
          </div>
          <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
            <FileDown className="h-4 w-4" />
            Скачать спецификацию (PDF)
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-2 bg-background">
          <div className="relative">
            <img
              src={productImages[selectedImage]}
              alt={`Фото ${selectedImage + 1}`}
              className="w-full h-auto object-contain max-h-[80vh]"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Download Dialog */}
      <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Скачать спецификацию</DialogTitle>
            <DialogDescription>
              Заполните контактные данные для скачивания PDF-спецификации
            </DialogDescription>
          </DialogHeader>
          <ContactFormFields data={contactData} errors={contactErrors} onChange={handleContactChange} />
          <Button className="w-full gap-2 mt-2" onClick={handleDownloadPdf}>
            <FileDown className="h-4 w-4" />
            Скачать PDF
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
};

const Product = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartOpen={() => setCartOpen(true)} />
        <ProductDetailContent />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </CartProvider>
  );
};

export default Product;
