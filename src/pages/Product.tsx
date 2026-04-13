import { useState, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { KpProvider, useKp } from "@/contexts/KpContext";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { materials, materialSpecs, connectionTypes, baseSizes, type ConnectionType, type MaterialColor } from "@/data/products";
import { getProductImages } from "@/data/products";
import { baseTroynikSizes, troynikImages } from "@/data/troynikProducts";
import { razdvizhnoyImages, razdvizhnoyFlanecImages, getRazdvizhnoySizes } from "@/data/razdvizhnoyProducts";
import { vozdukhovodImages, getVozdukhovodSizes, vozdukhovodAvailableLengths } from "@/data/vozdukhovodProducts";
import { emkostGroups } from "@/data/emkostiProducts";
import { pozharnyeRect, pozharnyePodzem, pozharnyeHoriz } from "@/data/pozharnyeProducts";
import { perelivnyeProducts, ppColors } from "@/data/perelivnyeProducts";
import { podzemnyeProducts } from "@/data/podzemnyeProducts";
import { pryamougolnyeProducts } from "@/data/pryamougolnyeProducts";
import { pryamougolnyeVertikalnyeProducts } from "@/data/pryamougolnyeVertikalnyeProducts";
import { ffuModels } from "@/data/ffuProducts";
import { lamelnyjModels, parseLamelnyjArticle } from "@/data/lamelnyjProducts";
import { knsPpProducts } from "@/data/knsPpProducts";
import { knsSvtProducts } from "@/data/knsSvtProducts";
import ArticleBreakdown, { type ArticleSegment } from "@/components/configurator/ArticleBreakdown";
import ImageGalleryWithLightbox from "@/components/configurator/ImageGalleryWithLightbox";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight, FileDown, ClipboardList } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import ContactFormFields, { type ContactFormData, type ContactFormErrors, validateContactForm } from "@/components/ContactFormFields";
import { generateSpecPdf } from "@/lib/generateSpecPdf";
import { generateLetterheadPdf, type LetterheadProductData } from "@/lib/generateLetterheadPdf";
import DimensionOverlay from "@/components/DimensionOverlay";
import KpSheet from "@/components/KpSheet";

/** Image lookup map for tank type + color */
const tankImageMap: Record<string, Record<string, string>> = {
  "evpp-flat": { default: "/images/evpp-flat-hero.png", "5012": "/images/evpp-flat-hero-blue.png", "9003": "/images/evpp-flat-hero-white.png", black: "/images/evpp-flat-hero-black.png" },
  "evpp-sloped": { default: "/images/evpp-sloped-hero.png", "5012": "/images/evpp-sloped-hero-blue.png", "9003": "/images/evpp-sloped-hero-white.png", black: "/images/evpp-sloped-hero-black.png" },
  "evpp-conical": { default: "/images/evpp-conical-hero.png", "5012": "/images/evpp-conical-hero-blue.png", "9003": "/images/evpp-conical-hero-white.png", black: "/images/evpp-conical-hero-black.png" },
  "evpp-conusdno": { default: "/images/evpp-conusdno-hero.png", "5012": "/images/evpp-conusdno-hero-blue.png", "9003": "/images/evpp-conusdno-hero-white.png", black: "/images/evpp-conusdno-hero-black.png" },
};

function pickTankImage(catId: string, colorCode?: string): string {
  const map = tankImageMap[catId];
  if (!map) return "/images/emkosti-real-proizvodstvo.jpg";
  if (!colorCode) return map.default;
  const key = colorCode === "" ? "black" : colorCode;
  return map[key] || map.default;
}

/** Map material codes to full material names */
const materialCodeToName: Record<string, string> = {};
materials.forEach((m) => { materialCodeToName[m.code] = m.name; });

/** Try to parse extended article format: СЗПК.ЕВПП.PPC.7032.1000 */
function parseExtendedEmkostArticle(article: string) {
  const parts = article.split(".");
  if (parts.length < 4 || parts[0] !== "СЗПК") return null;

  // Type prefix can be multi-part: ЕВПП-НД, ЕВПП-КК, ЕВПП-КД
  const typePrefix = parts[1];
  
  // Try to detect material code in parts[2]
  const matCode = parts[2];
  const matName = materialCodeToName[matCode];
  if (!matName) return null;

  let colorCode: string | undefined;
  let volumeStr: string;
  if (parts.length >= 5) {
    colorCode = parts[3];
    volumeStr = parts[4];
  } else {
    volumeStr = parts[3];
  }

  const volume = parseInt(volumeStr, 10);
  if (isNaN(volume)) return null;

  const baseArticle = `СЗПК.${typePrefix}.${volume}`;

  for (const group of emkostGroups) {
    for (const cat of group.categories) {
      const item = cat.items.find((i) => i.article === baseArticle);
      if (item) {
        const isHorizontal = group.id.startsWith("horizontal");
        const specs = materialSpecs[matName];
        let selectedColor: MaterialColor | undefined;
        if (specs) {
          selectedColor = colorCode
            ? specs.colors.find((c) => c.colorCode === colorCode)
            : specs.colors[0];
        }

        const image = cat.id === "egpplst" ? "/images/egts-standartnaya-2.jpg"
          : cat.id === "egpplv" ? "/images/egts-vysokie-lozhementy-2.jpg"
          : pickTankImage(cat.id, selectedColor?.colorCode);
        const schemaImage = cat.id === "evpp-flat" ? "/images/evpp-flat-schema.png"
          : cat.id === "evpp-sloped" ? "/images/evpp-sloped-schema.png"
          : cat.id === "evpp-conical" ? "/images/evpp-conical-schema.png"
          : cat.id === "evpp-conusdno" ? "/images/evpp-conusdno-schema.png"
          : cat.id === "egpplst" ? "/images/egts-standart-schema.jpg"
          : cat.id === "egpplv" ? "/images/egts-vysokie-schema.jpg"
          : undefined;

        const matInfo = materials.find((m) => m.code === matCode);
        const colorLabel = selectedColor ? `${selectedColor.name} (${selectedColor.ral})` : "";

        return {
          productType: "emkost" as const,
          emkostType: isHorizontal ? "horizontal" : "vertical",
          title: `${isHorizontal ? "Горизонтальная" : "Вертикальная"} ёмкость ${item.volume.toLocaleString()} л`,
          subtitle: `${cat.title} — ${group.title}`,
          materialName: matInfo?.name || matName,
          materialCode: matCode,
          colorLabel,
          volume: item.volume,
          diameter: item.diameter,
          heightOrLength: item.height,
          heightLabel: cat.heightLabel,
          description: cat.description,
          image,
          schemaImage,
        };
      }
    }
  }
  return null;
}

/** Try to find an emkost (tank) product by article */
function parseEmkostArticle(article: string) {
  // First try extended format with material/color
  const extended = parseExtendedEmkostArticle(article);
  if (extended) return extended;

  // Fallback: base article match
  for (const group of emkostGroups) {
    for (const cat of group.categories) {
      const item = cat.items.find((i) => i.article === article);
      if (item) {
        const isHorizontal = group.id.startsWith("horizontal");
        const isPnd = group.id.includes("pnd");
        const materialName = isPnd ? "Полиэтилен (ПНД/HDPE)" : "Полипропилен (ПП)";
        let image = "/images/emkosti-real-proizvodstvo.jpg";
        if (isHorizontal) {
          if (cat.id.includes("lv")) image = "/images/egts-vysokie-lozhementy-2.jpg";
          else image = "/images/emkost-horiz-pp-low.png";
          if (isPnd) image = "/images/emkost-horiz-pnd-photo.jpg";
          if (cat.id === "egpplst") image = "/images/egts-standartnaya-2.jpg";
          if (cat.id === "egpplv") image = "/images/egts-vysokie-lozhementy-2.jpg";
        } else {
          image = pickTankImage(cat.id);
          if (isPnd) image = "/images/emkost-vert-pnd-photo.png";
        }
        const schemaImage = cat.id === "evpp-flat" ? "/images/evpp-flat-schema.png"
          : cat.id === "evpp-sloped" ? "/images/evpp-sloped-schema.png"
          : cat.id === "evpp-conical" ? "/images/evpp-conical-schema.png"
          : cat.id === "evpp-conusdno" ? "/images/evpp-conusdno-schema.png"
          : cat.id === "egpplst" ? "/images/egts-standart-schema.jpg"
          : cat.id === "egpplv" ? "/images/egts-vysokie-schema.jpg"
          : undefined;
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
          schemaImage,
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
  // Search in podzemnyeProducts (underground SVT tanks) — format: СЗПК.ЕСВП.{volume}
  if (article.startsWith("СЗПК.ЕСВП.")) {
    const item = podzemnyeProducts.find((p) => p.article === article);
    if (item) {
      return {
        productType: "emkost" as const,
        emkostType: "underground",
        title: `Ёмкость подземная из СВТ ${item.volume} м³`,
        subtitle: "Подземная ёмкость из спиральновитых труб",
        materialName: "Полиэтилен высокой плотности (ПНД/HDPE)",
        volume: item.volume * 1000,
        diameter: item.diameter,
        heightOrLength: item.length,
        heightLabel: "L, мм",
        description: `Подземная ёмкость из спиральновитых труб. Объём ${item.volume} м³, диаметр ${item.diameter} мм, длина ${item.length} мм.`,
        image: "/images/emkosti-podzemnye-svt-1.jpg",
        breadcrumbBack: { label: "Подземные ёмкости", path: "/catalog/emkosti/podzemnye" },
      };
    }
  }
  // Search in perelivnye (overflow tanks for pools) — format: СЗПК.ПЕ.ПП.{COLOR}.{VOLUME}
  if (article.startsWith("СЗПК.ПЕ.")) {
    const item = perelivnyeProducts.find((p) => p.article === article);
    if (item) {
      const color = ppColors.find((c) => c.code === item.colorCode);
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
        image: item.colorCode === "7032" ? "/images/emkost-perelivnaya-bassein-grey.jpg" : "/images/emkost-perelivnaya-bassein.jpg",
        rectDims: { length: item.length, width: item.width, height: item.height },
        perelivColor: color || null,
        perelivPoolVolume: item.poolVolume,
      };
    }
  }
  // Search in pryamougolnyeProducts (horizontal rectangular) — format: СЗПК.ЕПО.{matCode}.{colorCode}.{volume}
  if (article.startsWith("СЗПК.ЕПО.")) {
    const epoParts = article.split(".");
    if (epoParts.length >= 4) {
      const epoMatCode = epoParts[2];
      const epoMatInfo = materials.find((m) => m.code === epoMatCode);
      let epoColorCode: string | undefined;
      let epoVolumeStr: string;
      if (epoParts.length === 5) {
        epoColorCode = epoParts[3];
        epoVolumeStr = epoParts[4];
      } else if (epoParts.length === 4) {
        epoVolumeStr = epoParts[3];
      } else {
        epoVolumeStr = epoParts[epoParts.length - 1];
      }
      const epoVolume = parseInt(epoVolumeStr!, 10);
      const epoItem = !isNaN(epoVolume) ? pryamougolnyeProducts.find((p) => p.volume === epoVolume) : null;
      if (epoItem) {
        const epoColorFilters: Record<string, string> = {
          "7032": "none",
          "5012": "hue-rotate(190deg) saturate(1.8) brightness(0.95)",
          "9003": "brightness(1.25) saturate(0.15) contrast(1.1)",
          "": "brightness(0.35) saturate(0) contrast(1.2)",
        };
        const epoSpecs = epoMatInfo ? materialSpecs[epoMatInfo.name] : null;
        const epoColor = epoSpecs
          ? (epoColorCode ? epoSpecs.colors.find((c) => c.colorCode === epoColorCode) : epoSpecs.colors[0])
          : undefined;
        const epoImageKey = epoColor?.colorCode ?? "";
        const epoImage = "/images/emkost-pryam-goriz-render-grey.png";
        const epoImageFilter = epoColorFilters[epoImageKey] ?? "none";
        const epoColorLabel = epoColor ? `${epoColor.name} (${epoColor.ral})` : "";

        return {
          productType: "emkost" as const,
          emkostType: "rectangular",
          title: `Ёмкость прямоугольная горизонтальная в обрешётке ${epoItem.volume.toLocaleString()} л`,
          subtitle: "Прямоугольная горизонтальная ёмкость в металлической обрешётке",
          materialName: epoMatInfo?.name || "Полипропилен (ПП)",
          materialCode: epoMatCode,
          colorLabel: epoColorLabel,
          volume: epoItem.volume,
          diameter: 0,
          heightOrLength: epoItem.height,
          heightLabel: "H, мм",
          description: `Прямоугольная горизонтальная ёмкость в обрешётке. Размеры ${epoItem.length}×${epoItem.width}×${epoItem.height} мм, объём ${epoItem.volume.toLocaleString()} л. Материал: ${epoMatInfo?.name || epoMatCode}. ${epoColorLabel ? `Цвет: ${epoColorLabel}.` : ""}`,
          image: epoImage,
          imageFilter: epoImageFilter,
          rectDims: { length: epoItem.length, width: epoItem.width, height: epoItem.height },
          breadcrumbBack: { label: "Горизонтальные прямоугольные", path: "/catalog/emkosti/pryamougolnye/gorizontalnye" },
        };
      }
    }
    const itemBase = pryamougolnyeProducts.find((p) => p.article === article);
    if (itemBase) {
      return {
        productType: "emkost" as const,
        emkostType: "rectangular",
        title: `Ёмкость прямоугольная горизонтальная в обрешётке ${itemBase.volume.toLocaleString()} л`,
        subtitle: "Прямоугольная горизонтальная ёмкость из полипропилена / полиэтилена в металлической обрешётке",
        materialName: "Полипропилен (ПП) / Полиэтилен (ПНД)",
        volume: itemBase.volume,
        diameter: 0,
        heightOrLength: itemBase.height,
        heightLabel: "H, мм",
        description: `Прямоугольная горизонтальная ёмкость в обрешётке. Размеры ${itemBase.length}×${itemBase.width}×${itemBase.height} мм, объём ${itemBase.volume.toLocaleString()} л.`,
        image: "/images/emkost-pryam-goriz-render-grey.png",
        rectDims: { length: itemBase.length, width: itemBase.width, height: itemBase.height },
        breadcrumbBack: { label: "Горизонтальные прямоугольные", path: "/catalog/emkosti/pryamougolnye/gorizontalnye" },
      };
    }
  }
  // Search in pryamougolnyeVertikalnyeProducts — format: СЗПК.ЕПОВ.{matCode}.{colorCode}.{volume}
  if (article.startsWith("СЗПК.ЕПОВ.")) {
    const epovParts = article.split(".");
    if (epovParts.length >= 4) {
      const epovMatCode = epovParts[2];
      const epovMatInfo = materials.find((m) => m.code === epovMatCode);
      let epovColorCode: string | undefined;
      let epovVolumeStr: string;
      if (epovParts.length === 5) {
        epovColorCode = epovParts[3];
        epovVolumeStr = epovParts[4];
      } else if (epovParts.length === 4) {
        epovVolumeStr = epovParts[3];
      } else {
        epovVolumeStr = epovParts[epovParts.length - 1];
      }
      const epovVolume = parseInt(epovVolumeStr!, 10);
      const epovItem = !isNaN(epovVolume) ? pryamougolnyeVertikalnyeProducts.find((p) => p.volume === epovVolume) : null;
      if (epovItem) {
        const epovVertImages: Record<string, string> = {
          "7032": "/images/emkost-pryam-vert-gray.png",
          "5012": "/images/emkost-pryam-vert-blue.png",
          "9003": "/images/emkost-pryam-vert-white.png",
          "": "/images/emkost-pryam-vert-black.png",
        };
        const epovSpecs = epovMatInfo ? materialSpecs[epovMatInfo.name] : null;
        const epovColor = epovSpecs
          ? (epovColorCode ? epovSpecs.colors.find((c) => c.colorCode === epovColorCode) : epovSpecs.colors[0])
          : undefined;
        const epovImageKey = epovColor?.colorCode ?? "";
        const epovImage = epovVertImages[epovImageKey] || epovVertImages["7032"];
        const epovColorLabel = epovColor ? `${epovColor.name} (${epovColor.ral})` : "";

        return {
          productType: "emkost" as const,
          emkostType: "rectangular",
          title: `Ёмкость прямоугольная вертикальная в обрешётке ${epovItem.volume.toLocaleString()} л`,
          subtitle: "Прямоугольная вертикальная ёмкость в металлической обрешётке",
          materialName: epovMatInfo?.name || "Полипропилен (ПП)",
          materialCode: epovMatCode,
          colorLabel: epovColorLabel,
          volume: epovItem.volume,
          diameter: 0,
          heightOrLength: epovItem.height,
          heightLabel: "H, мм",
          description: `Прямоугольная вертикальная ёмкость в обрешётке. Размеры ${epovItem.width}×${epovItem.depth}×${epovItem.height} мм, объём ${epovItem.volume.toLocaleString()} л. Материал: ${epovMatInfo?.name || epovMatCode}. ${epovColorLabel ? `Цвет: ${epovColorLabel}.` : ""}`,
          image: epovImage,
          imageFilter: undefined,
          rectDims: { length: epovItem.width, width: epovItem.depth, height: epovItem.height },
          breadcrumbBack: { label: "Вертикальные прямоугольные", path: "/catalog/emkosti/pryamougolnye/vertikalnye" },
        };
      }
    }
  }
  return null;
}

/** Parse article to extract product params — new format: СЗПК.{TYPE}.{PARAMS} */
function parseArticle(article: string) {
  if (!article.startsWith("СЗПК.")) return null;
  const parts = article.split(".");
  if (parts.length < 4) return null;
  const type = parts[1]; // ОТВР, ОТВФ, ТР, ТРФ, ВК, РЭ, РЭФ, ОТВ

  // Troynik: СЗПК.ТР.PPC.7032.100x100 or СЗПК.ТРФ.PPC.7032.100x100
  if (type === "ТР" || type === "ТРФ") {
    const materialCode = parts[2];
    const material = materials.find((m) => m.code === materialCode);
    if (!material) return null;
    const specs = materialSpecs[material.name];
    const lastPart = parts[parts.length - 1]; // "100x100"
    const [dStr, d1Str] = lastPart.split("x");
    const d = parseInt(dStr);
    const d1 = parseInt(d1Str);
    const colorCode = parts.length === 5 ? parts[3] : null;
    const color = colorCode ? specs?.colors.find((c) => c.colorCode === colorCode) : specs?.colors[0];
    const sizeData = baseTroynikSizes.find((s) => s.d === d && s.d1 === d1);
    return {
      productType: "troynik" as const,
      connectionType: (type === "ТРФ" ? "flanec" : "rastrub") as ConnectionType,
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

  // Vozdukhovod: СЗПК.ВК.PPC.7032.200 or СЗПК.ВК.PPC.200
  if (type === "ВК") {
    const materialCode = parts[2];
    const material = materials.find((m) => m.code === materialCode);
    if (!material) return null;
    const specs = materialSpecs[material.name];
    const diameter = parseInt(parts[parts.length - 1]);
    const hasColor = parts.length === 5;
    const colorCode = hasColor ? parts[3] : specs?.colors[0]?.colorCode || "";
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

  // Razdvizhnoy: СЗПК.РЭ.PPC.7032.200 or СЗПК.РЭФ.PPC.7032.200
  if (type === "РЭ" || type === "РЭФ") {
    const isFlanec = type === "РЭФ";
    const materialCode = parts[2];
    const material = materials.find((m) => m.code === materialCode);
    if (!material) return null;
    const specs = materialSpecs[material.name];
    const diameter = parseInt(parts[parts.length - 1]);
    const hasColor = parts.length === 5;
    const colorCode = hasColor ? parts[3] : specs?.colors[0]?.colorCode || "";
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

  // Elbow: СЗПК.ОТВР.90.PPC.7032.200 or СЗПК.ОТВФ.90.PPC.200
  if (type === "ОТВР" || type === "ОТВФ" || type === "ОТВ") {
    const connectionType: ConnectionType = type === "ОТВФ" ? "flanec" : "rastrub";
    const angle = parseInt(parts[2]) as 90 | 60;
    const materialCode = parts[3];
    const diameter = parseInt(parts[parts.length - 1]);
    const colorCode = parts.length === 6 ? parts[4] : null;
    const material = materials.find((m) => m.code === materialCode);
    if (!material) return null;
    const specs = materialSpecs[material.name];
    const color = colorCode ? specs?.colors.find((c) => c.colorCode === colorCode) : specs?.colors[0];
    const sizeData = baseSizes.find((s) => s.diameter === diameter);
    return { productType: "otvod" as const, connectionType, angle, material, color, diameter, sizeData, troynikSize: null, razdvizhnoySize: null, vozdukhovodSize: null, specs };
  }

  return null;
}

const ProductDetailContent = () => {
  const { article } = useParams<{ article: string }>();
  const { addItem } = useCart();
  const { addItem: addToKp } = useKp();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [kpDialogOpen, setKpDialogOpen] = useState(false);
  const [kpQty, setKpQty] = useState("");
  const [kpPrice, setKpPrice] = useState("");
  const kpProductRef = useRef<Omit<LetterheadProductData, "quantity" | "pricePerUnit"> | null>(null);
  const [contactData, setContactData] = useState<ContactFormData>({ name: "", email: "", phone: "", inn: "" });
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});

  const openKpDialog = useCallback((product: Omit<LetterheadProductData, "quantity" | "pricePerUnit">) => {
    kpProductRef.current = product;
    setKpQty("");
    setKpPrice("");
    setKpDialogOpen(true);
  }, []);

  const handleKpDownload = useCallback(async () => {
    if (!kpProductRef.current) return;
    const quantity = kpQty ? parseInt(kpQty, 10) : undefined;
    const pricePerUnit = kpPrice ? parseFloat(kpPrice.replace(",", ".").replace(/\s/g, "")) : undefined;
    await generateLetterheadPdf({ ...kpProductRef.current, quantity, pricePerUnit });
    toast.success("Коммерческое предложение скачано");
    setKpDialogOpen(false);
  }, [kpQty, kpPrice]);

  const kpDialog = (
    <Dialog open={kpDialogOpen} onOpenChange={setKpDialogOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Коммерческое предложение</DialogTitle>
          <DialogDescription>
            Укажите количество и цену (необязательно) — они будут включены в PDF
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Количество, шт.</label>
            <input
              type="number"
              min="1"
              max="99999"
              placeholder="Например: 2"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={kpQty}
              onChange={(e) => setKpQty(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Цена за единицу, руб. (без НДС)</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Например: 150 000"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={kpPrice}
              onChange={(e) => setKpPrice(e.target.value.replace(/[^0-9.,\s]/g, "").slice(0, 15))}
            />
          </div>
          {kpQty && kpPrice && (() => {
            const q = parseInt(kpQty, 10);
            const p = parseFloat(kpPrice.replace(",", ".").replace(/\s/g, ""));
            if (!isNaN(q) && !isNaN(p) && q > 0 && p > 0) {
              const total = q * p;
              const totalVat = total * 1.2;
              const fmt = (n: number) => n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              return (
                <div className="rounded-md bg-muted p-3 text-xs space-y-1">
                  <p className="text-muted-foreground">Итого: <span className="font-semibold text-foreground">{fmt(total)} руб.</span> (без НДС)</p>
                  <p className="text-muted-foreground">С НДС (20%): <span className="font-semibold text-foreground">{fmt(totalVat)} руб.</span></p>
                </div>
              );
            }
            return null;
          })()}
          <Button className="w-full gap-2" onClick={handleKpDownload}>
            <FileDown className="h-4 w-4" />
            Скачать КП (PDF)
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">Поля не обязательны — оставьте пустыми для бланка</p>
        </div>
      </DialogContent>
    </Dialog>
  );

  const navigate = useNavigate();

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

    const isPerelivnaya = article.startsWith("СЗПК.ПЕ.");

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
            {"schemaImage" in emkost && emkost.schemaImage ? (
              <ImageGalleryWithLightbox
                images={[emkost.image, emkost.schemaImage]}
                selectedImage={selectedImage}
                onSelectedImageChange={setSelectedImage}
              />
            ) : (
              <div className={`${emkost.image.includes("perelivnaya") ? "aspect-[4/3]" : "aspect-square"} overflow-hidden rounded-lg border bg-card mb-3`}>
                {"rectDims" in emkost && emkost.rectDims && !emkost.image.includes("perelivnaya") ? (
                  <DimensionOverlay
                    imageSrc={emkost.image}
                    imageAlt={emkost.title}
                    length={emkost.rectDims.length}
                    width={emkost.rectDims.width}
                    height={emkost.rectDims.height}
                    imageStyle={"imageFilter" in emkost && emkost.imageFilter ? { filter: emkost.imageFilter } : undefined}
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
                  <img
                    src={emkost.image}
                    alt={emkost.title}
                    className="h-full w-full object-contain"
                    style={"imageFilter" in emkost && emkost.imageFilter ? { filter: emkost.imageFilter } : undefined}
                  />
                )}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{emkost.title}</h1>
            <p className="font-mono text-sm text-muted-foreground mb-2">{article}</p>

            {/* Article breakdown */}
            {(() => {
              const parts = article.split(".");
              const segments: ArticleSegment[] = [
                { value: "СЗПК", label: "Компания", desc: "Сибирский завод полимерных конструкций" },
                { value: parts[1] || "", label: "Тип", desc: emkost.subtitle.split(" — ")[0] || "Ёмкость" },
              ];
              if ("materialCode" in emkost && emkost.materialCode) {
                segments.push({ value: emkost.materialCode as string, label: "Материал", desc: emkost.materialName.split("(")[0].trim() });
              }
              if ("colorLabel" in emkost && emkost.colorLabel && parts.length >= 5) {
                const colorHex = (() => {
                  const mc = "materialCode" in emkost ? emkost.materialCode as string : "";
                  const mat = materials.find((m) => m.code === mc);
                  if (!mat) return undefined;
                  const sp = materialSpecs[mat.name];
                  const cc = parts[3];
                  return sp?.colors.find((c) => c.colorCode === cc)?.hex;
                })();
                segments.push({ value: parts[3], label: "Цвет", desc: emkost.colorLabel as string, hex: colorHex });
              }
              segments.push({ value: String(emkost.volume), label: "Объём, л", desc: `${emkost.volume.toLocaleString()} литров` });
              return <ArticleBreakdown exampleArticle={article} segments={segments} />;
            })()}

            <p className="text-sm text-muted-foreground mb-6">{emkost.subtitle}</p>

            {/* Color picker for perelivnye */}
            {"perelivColor" in emkost && emkost.perelivColor && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-2">Цвет полипропилена</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ppColors.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        if (c.code !== emkost.perelivColor!.code) {
                          navigate(`/product/СЗПК.ПЕ.ПП.${c.code}.${emkost.perelivPoolVolume}`, { replace: true });
                        }
                      }}
                      className={`rounded-lg border bg-card p-3 cursor-pointer transition-all ${
                        emkost.perelivColor!.code === c.code
                          ? "border-primary ring-1 ring-primary shadow-sm"
                          : "hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full border border-border shrink-0" style={{ backgroundColor: c.hex }} />
                        <span className="text-sm font-semibold text-foreground">{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.ral}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{c.application}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
              {"perelivColor" in emkost && emkost.perelivColor && (
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Цвет</span>
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border border-border shrink-0" style={{ backgroundColor: emkost.perelivColor.hex }} />
                    {emkost.perelivColor.name} ({emkost.perelivColor.ral})
                  </span>
                </div>
              )}
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
            <Button variant="outline" className="gap-2 w-full mt-2" onClick={() => openKpDialog({ model: emkost.title, article, specs: [["Объём", `${emkost.volume.toLocaleString()} л`], ...(emkost.diameter > 0 ? [["Диаметр (D)", `${emkost.diameter.toLocaleString()} мм`] as [string,string]] : []), [emkost.heightLabel, `${emkost.heightOrLength.toLocaleString()} мм`], ["Материал", emkost.materialName]] })}>
              <FileDown className="h-4 w-4" />
              Скачать коммерческое предложение (PDF)
            </Button>
            <Button variant="secondary" className="gap-2 w-full mt-2" onClick={() => { addToKp({ model: emkost.title, article, specs: [["Объём", `${emkost.volume.toLocaleString()} л`], ...(emkost.diameter > 0 ? [["Диаметр (D)", `${emkost.diameter.toLocaleString()} мм`] as [string,string]] : []), [emkost.heightLabel, `${emkost.heightOrLength.toLocaleString()} мм`], ["Материал", emkost.materialName]] }); toast.success("Добавлено в КП"); }}>
              <ClipboardList className="h-4 w-4" />
              Добавить в КП
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
        {kpDialog}
      </main>
    );
  }

  // Try KNS SVT
  if (article.startsWith("КНС-SVT-")) {
    const knsSvtItem = knsSvtProducts.find((p) => p.article === article);
    if (knsSvtItem) {
      const handleAddKnsSvt = () => {
        addItem({ article, diameter: knsSvtItem.diameter, wallThickness: 0 }, qty);
        toast.success(`${knsSvtItem.model} (${qty} шт.) добавлен в корзину`);
      };

      const handleKnsSvtSpecPdf = async () => {
        const errors = validateContactForm(contactData);
        setContactErrors(errors);
        if (Object.keys(errors).length > 0) return;

        await generateSpecPdf(
          {
            article,
            diameter: knsSvtItem.diameter,
            wallThickness: 0,
            socketThickness: 0,
            availableLength: null,
            connectionName: "",
            materialName: knsSvtItem.material,
            extraRows: [
              ["Модель", knsSvtItem.model],
              ["Диаметр корпуса", `${knsSvtItem.diameter} мм`],
              ["Высота", `${knsSvtItem.height} мм`],
              ["Производительность (Q)", `${knsSvtItem.flow} м³/ч`],
              ["Напор (H)", `${knsSvtItem.head} м`],
              ["Макс. расход (Qmax)", `${knsSvtItem.maxFlow} м³/ч`],
              ["Макс. напор (Hmax)", `${knsSvtItem.maxHead} м`],
              ["Кол-во насосов", `${knsSvtItem.pumpCount} шт.`],
              ["Мощность насосов", `${knsSvtItem.pumpPower} кВт`],
              ["Материал корпуса", knsSvtItem.material],
            ],
          },
          contactData
        );
        toast.success("PDF-спецификация скачана");
        setPdfDialogOpen(false);
      };

      const handleKnsSvtContactChange = (field: keyof ContactFormData, value: string) => {
        setContactData((prev) => ({ ...prev, [field]: value }));
        if (contactErrors[field]) {
          setContactErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      };

      return (
        <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/kns">КНС</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/kns/v-korpuse-svt">КНС в корпусе SVT</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{knsSvtItem.model}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-card">
                <img src="/images/kns-svt-cutaway.jpg" alt={`${knsSvtItem.model} — КНС в корпусе SVT`} className="h-full w-full object-contain p-4" />
              </div>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                {knsSvtItem.model}
              </h1>
              <p className="font-mono text-sm text-muted-foreground mb-4">{knsSvtItem.article}</p>

              <p className="text-sm text-muted-foreground mb-6">
                Канализационная насосная станция в корпусе из стеклопластика SVT. Производительность {knsSvtItem.flow} м³/ч, напор {knsSvtItem.head} м. Корпус устойчив к коррозии, срок службы от 30 лет.
              </p>

              <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-4">
                <div className="bg-card p-3">
                  <span className="block text-xs text-muted-foreground">Диаметр корпуса</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.diameter} мм</span>
                </div>
                <div className="bg-card p-3">
                  <span className="block text-xs text-muted-foreground">Высота</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.height} мм</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Производительность (Q)</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.flow} м³/ч</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Напор (H)</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.head} м</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Макс. расход (Qmax)</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.maxFlow} м³/ч</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Макс. напор (Hmax)</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.maxHead} м</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Кол-во насосов</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.pumpCount} шт.</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Мощность насосов</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.pumpPower} кВт</span>
                </div>
                <div className="bg-card p-3 border-t col-span-2">
                  <span className="block text-xs text-muted-foreground">Материал корпуса</span>
                  <span className="text-sm font-semibold text-foreground">{knsSvtItem.material}</span>
                </div>
              </div>

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
                <Button className="gap-2 flex-1" onClick={handleAddKnsSvt}>
                  <ShoppingCart className="h-4 w-4" />
                  В корзину
                </Button>
              </div>

              <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
                <FileDown className="h-4 w-4" />
                Скачать спецификацию (PDF)
              </Button>

              <Button variant="outline" className="gap-2 w-full mt-2" onClick={() => openKpDialog({ model: knsSvtItem.model, article: knsSvtItem.article, specs: [["Диаметр корпуса", `${knsSvtItem.diameter} мм`], ["Высота", `${knsSvtItem.height} мм`], ["Производительность (Q)", `${knsSvtItem.flow} м³/ч`], ["Напор (H)", `${knsSvtItem.head} м`], ["Макс. расход (Qmax)", `${knsSvtItem.maxFlow} м³/ч`], ["Макс. напор (Hmax)", `${knsSvtItem.maxHead} м`], ["Кол-во насосов", `${knsSvtItem.pumpCount} шт.`], ["Мощность насосов", `${knsSvtItem.pumpPower} кВт`], ["Материал корпуса", knsSvtItem.material]] })}>
                <FileDown className="h-4 w-4" />
                Скачать коммерческое предложение (PDF)
              </Button>
              <Button variant="secondary" className="gap-2 w-full mt-2" onClick={() => { addToKp({ model: knsSvtItem.model, article: knsSvtItem.article, specs: [["Диаметр корпуса", `${knsSvtItem.diameter} мм`], ["Высота", `${knsSvtItem.height} мм`], ["Производительность (Q)", `${knsSvtItem.flow} м³/ч`], ["Напор (H)", `${knsSvtItem.head} м`], ["Макс. расход (Qmax)", `${knsSvtItem.maxFlow} м³/ч`], ["Макс. напор (Hmax)", `${knsSvtItem.maxHead} м`], ["Кол-во насосов", `${knsSvtItem.pumpCount} шт.`], ["Мощность насосов", `${knsSvtItem.pumpPower} кВт`], ["Материал корпуса", knsSvtItem.material]] }); toast.success("Добавлено в КП"); }}>
                <ClipboardList className="h-4 w-4" />
                Добавить в КП
              </Button>
            </div>
          </div>

          <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Скачать спецификацию</DialogTitle>
                <DialogDescription>
                  Заполните контактные данные для скачивания PDF-спецификации
                </DialogDescription>
              </DialogHeader>
              <ContactFormFields data={contactData} errors={contactErrors} onChange={handleKnsSvtContactChange} />
              <Button className="w-full gap-2 mt-2" onClick={handleKnsSvtSpecPdf}>
                <FileDown className="h-4 w-4" />
                Скачать PDF
              </Button>
            </DialogContent>
          </Dialog>
          {kpDialog}
        </main>
      );
    }
  }

  // Try KNS PP (СЗПК.КНС.ПП.)
  if (article.startsWith("СЗПК.КНС.ПП.")) {
    const knsPpItem = knsPpProducts.find((p) => p.article === article);
    if (knsPpItem) {
      const handleAddKnsPp = () => {
        addItem({ article, diameter: knsPpItem.diameter, wallThickness: 0 }, qty);
        toast.success(`${knsPpItem.model} (${qty} шт.) добавлен в корзину`);
      };

      const handleKnsPpSpecPdf = async () => {
        const errors = validateContactForm(contactData);
        setContactErrors(errors);
        if (Object.keys(errors).length > 0) return;

        await generateSpecPdf(
          {
            article,
            diameter: knsPpItem.diameter,
            wallThickness: 0,
            socketThickness: 0,
            availableLength: null,
            connectionName: "",
            materialName: knsPpItem.material,
            extraRows: [
              ["Модель", knsPpItem.model],
              ["Диаметр корпуса", `${knsPpItem.diameter} мм`],
              ["Высота", `${knsPpItem.height} мм`],
              ["Производительность (Q)", `${knsPpItem.flow} м³/ч`],
              ["Напор (H)", `${knsPpItem.head} м`],
              ["Макс. расход (Qmax)", `${knsPpItem.maxFlow} м³/ч`],
              ["Макс. напор (Hmax)", `${knsPpItem.maxHead} м`],
              ["Кол-во насосов", `${knsPpItem.pumpCount} шт.`],
              ["Мощность насосов", `${knsPpItem.pumpPower} кВт`],
              ["Материал корпуса", knsPpItem.material],
            ],
          },
          contactData
        );
        toast.success("PDF-спецификация скачана");
        setPdfDialogOpen(false);
      };

      const handleKnsPpContactChange = (field: keyof ContactFormData, value: string) => {
        setContactData((prev) => ({ ...prev, [field]: value }));
        if (contactErrors[field]) {
          setContactErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      };

      return (
        <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/kns">КНС</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/kns/v-korpuse-polipropilen">КНС из полипропилена</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{knsPpItem.model}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-card">
                <img src="/images/kns-pp-cutaway-v3.jpg" alt={`${knsPpItem.model} — КНС из полипропилена`} className="h-full w-full object-contain p-4" />
              </div>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                {knsPpItem.model}
              </h1>
              <p className="font-mono text-sm text-muted-foreground mb-4">{knsPpItem.article}</p>

              <p className="text-sm text-muted-foreground mb-6">
                Канализационная насосная станция в корпусе из полипропилена. Производительность {knsPpItem.flow} м³/ч, напор {knsPpItem.head} м. Корпус химически стоек к кислотам и щелочам, срок службы от 25 лет.
              </p>

              <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-4">
                <div className="bg-card p-3">
                  <span className="block text-xs text-muted-foreground">Диаметр корпуса</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.diameter} мм</span>
                </div>
                <div className="bg-card p-3">
                  <span className="block text-xs text-muted-foreground">Высота</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.height} мм</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Производительность (Q)</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.flow} м³/ч</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Напор (H)</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.head} м</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Макс. расход (Qmax)</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.maxFlow} м³/ч</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Макс. напор (Hmax)</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.maxHead} м</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Кол-во насосов</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.pumpCount} шт.</span>
                </div>
                <div className="bg-card p-3 border-t">
                  <span className="block text-xs text-muted-foreground">Мощность насосов</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.pumpPower} кВт</span>
                </div>
                <div className="bg-card p-3 border-t col-span-2">
                  <span className="block text-xs text-muted-foreground">Материал корпуса</span>
                  <span className="text-sm font-semibold text-foreground">{knsPpItem.material}</span>
                </div>
              </div>

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
                <Button className="gap-2 flex-1" onClick={handleAddKnsPp}>
                  <ShoppingCart className="h-4 w-4" />
                  В корзину
                </Button>
              </div>

              <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
                <FileDown className="h-4 w-4" />
                Скачать спецификацию (PDF)
              </Button>

              <Button variant="outline" className="gap-2 w-full mt-2" onClick={() => openKpDialog({ model: knsPpItem.model, article: knsPpItem.article, specs: [["Диаметр корпуса", `${knsPpItem.diameter} мм`], ["Высота", `${knsPpItem.height} мм`], ["Производительность (Q)", `${knsPpItem.flow} м³/ч`], ["Напор (H)", `${knsPpItem.head} м`], ["Макс. расход (Qmax)", `${knsPpItem.maxFlow} м³/ч`], ["Макс. напор (Hmax)", `${knsPpItem.maxHead} м`], ["Кол-во насосов", `${knsPpItem.pumpCount} шт.`], ["Мощность насосов", `${knsPpItem.pumpPower} кВт`], ["Материал корпуса", knsPpItem.material]] })}>
                <FileDown className="h-4 w-4" />
                Скачать коммерческое предложение (PDF)
              </Button>
              <Button variant="secondary" className="gap-2 w-full mt-2" onClick={() => { addToKp({ model: knsPpItem.model, article: knsPpItem.article, specs: [["Диаметр корпуса", `${knsPpItem.diameter} мм`], ["Высота", `${knsPpItem.height} мм`], ["Производительность (Q)", `${knsPpItem.flow} м³/ч`], ["Напор (H)", `${knsPpItem.head} м`], ["Макс. расход (Qmax)", `${knsPpItem.maxFlow} м³/ч`], ["Макс. напор (Hmax)", `${knsPpItem.maxHead} м`], ["Кол-во насосов", `${knsPpItem.pumpCount} шт.`], ["Мощность насосов", `${knsPpItem.pumpPower} кВт`], ["Материал корпуса", knsPpItem.material]] }); toast.success("Добавлено в КП"); }}>
                <ClipboardList className="h-4 w-4" />
                Добавить в КП
              </Button>
            </div>
          </div>

          <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Скачать спецификацию</DialogTitle>
                <DialogDescription>
                  Заполните контактные данные для скачивания PDF-спецификации
                </DialogDescription>
              </DialogHeader>
              <ContactFormFields data={contactData} errors={contactErrors} onChange={handleKnsPpContactChange} />
              <Button className="w-full gap-2 mt-2" onClick={handleKnsPpSpecPdf}>
                <FileDown className="h-4 w-4" />
                Скачать PDF
              </Button>
            </DialogContent>
          </Dialog>
          {kpDialog}
        </main>
      );
    }
  }

  // Try FFU
  const ffuModel = ffuModels.find((m) => m.article === article || m.name === article) || null;
  if (ffuModel) {
    const handleAddFfu = () => {
      addItem({ article: ffuModel.article, diameter: 0, wallThickness: 0 }, qty);
      toast.success(`${ffuModel.article} (${qty} шт.) добавлен в корзину`);
    };

    const handleFfuSpecPdf = async () => {
      const errors = validateContactForm(contactData);
      setContactErrors(errors);
      if (Object.keys(errors).length > 0) return;

      await generateSpecPdf(
        {
          article: ffuModel.article,
          diameter: 0,
          wallThickness: 0,
          socketThickness: 0,
          availableLength: null,
          connectionName: "",
          materialName: "Полипропилен / ПВХ / Стеклопластик",
          productTitle: `Флотационно-фильтровальная установка ${ffuModel.name}`,
          extraRows: [
            ["Производительность", `${ffuModel.capacity} м³/ч`],
            ["Мощность", `${ffuModel.power} кВт`],
            ["Габариты (Д×Ш×В)", `${ffuModel.dimensions} мм`],
            ["Масса сухая", `${ffuModel.massDry} т`],
            ["Масса с водой", `${ffuModel.massWet} т`],
            ["Материал корпуса", "Полипропилен / ПВХ / Стеклопластик"],
            ["Рабочая температура", "до +60 °C"],
            ["Взвеш. вещества (вход)", "50–200 мг/л"],
            ["Взвеш. вещества (локальная)", "15–40 мг/л"],
            ["Взвеш. вещества (глубокая)", "3 мг/л"],
          ],
        },
        contactData
      );
      toast.success("PDF-спецификация скачана");
      setPdfDialogOpen(false);
    };

    const handleFfuKpPdf = () => {
      openKpDialog({ model: `Флотационно-фильтровальная установка ${ffuModel.name}`, article: ffuModel.article, specs: [["Производительность", `${ffuModel.capacity} м³/ч`], ["Мощность", `${ffuModel.power} кВт`], ["Габариты (Д×Ш×В)", `${ffuModel.dimensions} мм`], ["Масса сухая", `${ffuModel.massDry} т`], ["Масса с водой", `${ffuModel.massWet} т`], ["Материал корпуса", "Полипропилен / ПВХ / Стеклопластик"]] });
    };

    const handleFfuContactChange = (field: keyof ContactFormData, value: string) => {
      setContactData((prev) => ({ ...prev, [field]: value }));
      if (contactErrors[field]) {
        setContactErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

    return (
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka">Водоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka/ffu">ФФУ</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{ffuModel.name} ({ffuModel.article})</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-card">
              <img src="/images/ffu-real-3d.png" alt={`${ffuModel.article} — Флотационно-фильтровальная установка`} className="h-full w-full object-contain p-4" />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Флотационно-фильтровальная установка {ffuModel.name}
            </h1>
            <p className="font-mono text-sm text-muted-foreground mb-4">{ffuModel.article}</p>

            <ArticleBreakdown
              exampleArticle={ffuModel.article}
              segments={(() => {
                const parts = ffuModel.article.split(".");
                // СЗПК.ФФУ.01К.ПП
                const modelPart = parts[2] || "";
                const modMatch = modelPart.match(/^(\d+)([А-Яа-яA-Za-z]*)$/);
                const num = modMatch ? modMatch[1] : modelPart;
                const mod = modMatch ? modMatch[2] : "";
                const modMap: Record<string, string> = { "К": "Компактная", "М": "Модульная" };
                const segs = [
                  { value: parts[0], label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
                  { value: parts[1], label: "Тип", desc: "Флотационно-фильтровальная установка" },
                  { value: num, label: "Произв.", desc: `${ffuModel.capacity} м³/ч` },
                ];
                if (mod) {
                  segs.push({ value: mod, label: "Модиф.", desc: modMap[mod] || mod });
                }
                segs.push({ value: parts[3], label: "Материал", desc: "Полипропилен" });
                return segs;
              })()}
            />

            <p className="text-sm text-muted-foreground mb-6">
              ФФУ для глубокой очистки сточных вод от нефтепродуктов, жиров и взвешенных веществ. Производительность — {ffuModel.capacity} м³/ч.
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-4">
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Производительность</span>
                <span className="text-sm font-semibold text-foreground">{ffuModel.capacity} м³/ч</span>
              </div>
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Мощность</span>
                <span className="text-sm font-semibold text-foreground">{ffuModel.power} кВт</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Габариты (Д×Ш×В)</span>
                <span className="text-sm font-semibold text-foreground">{ffuModel.dimensions} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Масса сухая</span>
                <span className="text-sm font-semibold text-foreground">{ffuModel.massDry} т</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Масса с водой</span>
                <span className="text-sm font-semibold text-foreground">{ffuModel.massWet} т</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Материал корпуса</span>
                <span className="text-sm font-semibold text-foreground">ПП / ПВХ / СП</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Рабочая температура</span>
                <span className="text-sm font-semibold text-foreground">до +60 °C</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Эффективность очистки</span>
                <span className="text-sm font-semibold text-foreground">до 98%</span>
              </div>
            </div>

            {/* Suspended solids block */}
            <div className="rounded-lg border bg-card p-4 mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Взвешенные вещества</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="block text-xs text-muted-foreground mb-1">На входе</span>
                  <span className="text-sm font-semibold text-foreground">50–200 мг/л</span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground mb-1">Локальная очистка</span>
                  <span className="text-sm font-semibold text-foreground">15–40 мг/л</span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground mb-1">Глубокая очистка</span>
                  <span className="text-sm font-semibold text-foreground">3 мг/л</span>
                </div>
              </div>
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
              <Button className="gap-2 flex-1" onClick={handleAddFfu}>
                <ShoppingCart className="h-4 w-4" />
                В корзину
              </Button>
            </div>

            <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
              <FileDown className="h-4 w-4" />
              Скачать спецификацию (PDF)
            </Button>

            <Button variant="outline" className="gap-2 w-full mt-2" onClick={handleFfuKpPdf}>
              <FileDown className="h-4 w-4" />
              Скачать коммерческое предложение (PDF)
            </Button>
            <Button variant="secondary" className="gap-2 w-full mt-2" onClick={() => { addToKp({ model: `ФФУ ${ffuModel.name}`, article: ffuModel.article, specs: [["Производительность", `${ffuModel.capacity} м³/ч`], ["Мощность", `${ffuModel.power} кВт`], ["Габариты", `${ffuModel.dimensions} мм`]] }); toast.success("Добавлено в КП"); }}>
              <ClipboardList className="h-4 w-4" />
              Добавить в КП
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
            <ContactFormFields data={contactData} errors={contactErrors} onChange={handleFfuContactChange} />
            <Button className="w-full gap-2 mt-2" onClick={handleFfuSpecPdf}>
              <FileDown className="h-4 w-4" />
              Скачать PDF
            </Button>
          </DialogContent>
        </Dialog>
        {kpDialog}
      </main>
    );
  }

  // Try Lamella Settler (СЗПК.ЛО.)
  const lamParsed = parseLamelnyjArticle(article);
  const lamModel = lamParsed ? lamelnyjModels.find((m) => m.article === article) : null;
  if (lamParsed && lamModel) {
    const handleAddLam = () => {
      addItem({ article, diameter: 0, wallThickness: 0 }, qty);
      toast.success(`${article} (${qty} шт.) добавлен в корзину`);
    };

    const handleLamSpecPdf = async () => {
      const errors = validateContactForm(contactData);
      setContactErrors(errors);
      if (Object.keys(errors).length > 0) return;

      await generateSpecPdf(
        {
          article,
          diameter: 0,
          wallThickness: 0,
          socketThickness: 0,
          availableLength: null,
          connectionName: "",
          materialName: "Полипропилен / ПВХ / Стеклопластик",
          productTitle: `Тонкослойный (ламельный) отстойник ${article}`,
          extraRows: [
            ["Производительность", `${lamModel.capacity} м³/ч`],
            ["Габариты (Д×Ш×В)", `${lamModel.dimensions} мм`],
            ["Масса (сух./раб.)", `${lamModel.mass} кг`],
            ["Материал корпуса", "Полипропилен / ПВХ / Стеклопластик"],
            ["Рабочая температура", "до +60 °C"],
          ],
        },
        contactData
      );
      toast.success("PDF-спецификация скачана");
      setPdfDialogOpen(false);
    };

    const handleLamKpPdf = () => {
      openKpDialog({ model: `Тонкослойный (ламельный) отстойник ${lamModel.article}`, article, specs: [["Производительность", `${lamModel.capacity} м³/ч`], ["Габариты (Д×Ш×В)", `${lamModel.dimensions} мм`], ["Материал корпуса", lamParsed.materialName]] });
    };

    const handleLamContactChange = (field: keyof ContactFormData, value: string) => {
      setContactData((prev) => ({ ...prev, [field]: value }));
      if (contactErrors[field]) {
        setContactErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

    return (
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka">Водоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka/lamelnyj-otstojnik">Ламельный отстойник</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{lamModel.name} ({lamModel.article})</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-card">
              <img src={lamModel && parseFloat(lamModel.capacity) >= 20 ? "/images/lamelnyj-hero-real.jpg" : "/images/lamelnyj-thumb-new.png"} alt={`${article} — Тонкослойный ламельный отстойник`} className="h-full w-full object-contain p-4" />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Тонкослойный (ламельный) отстойник {lamModel.name}
            </h1>
            <p className="font-mono text-sm text-muted-foreground mb-4">{lamModel.article}</p>

            <ArticleBreakdown
              exampleArticle={lamModel.article}
              segments={[
                { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
                { value: lamParsed.type, label: "Тип", desc: lamParsed.typeDesc },
                { value: lamParsed.capacityCode, label: "Произв.", desc: `${lamParsed.capacity} м³/ч` },
                { value: lamParsed.materialCode, label: "Материал", desc: lamParsed.materialName },
              ]}
            />

            <p className="text-sm text-muted-foreground mb-6">
              Ламельный отстойник для механической очистки бытовых, промышленных и ливневых сточных вод. Производительность — {lamModel.capacity} м³/ч.
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-6">
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Производительность</span>
                <span className="text-sm font-semibold text-foreground">{lamModel.capacity} м³/ч</span>
              </div>
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Габариты (Д×Ш×В)</span>
                <span className="text-sm font-semibold text-foreground">{lamModel.dimensions} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Масса (сух./раб.)</span>
                <span className="text-sm font-semibold text-foreground">{lamModel.mass} кг</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Материал корпуса</span>
                <span className="text-sm font-semibold text-foreground">ПП / ПВХ / СП</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Рабочая температура</span>
                <span className="text-sm font-semibold text-foreground">до +60 °C</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Химическая стойкость</span>
                <span className="text-sm font-semibold text-foreground">Кислоты, щёлочи</span>
              </div>
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
              <Button className="gap-2 flex-1" onClick={handleAddLam}>
                <ShoppingCart className="h-4 w-4" />
                В корзину
              </Button>
            </div>

            <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
              <FileDown className="h-4 w-4" />
              Скачать спецификацию (PDF)
            </Button>

            <Button variant="outline" className="gap-2 w-full mt-2" onClick={handleLamKpPdf}>
              <FileDown className="h-4 w-4" />
              Скачать коммерческое предложение (PDF)
            </Button>
            <Button variant="secondary" className="gap-2 w-full mt-2" onClick={() => { addToKp({ model: `Тонкослойный (ламельный) отстойник ${lamModel.name}`, article: lamModel.article, specs: [["Производительность", `${lamModel.capacity} м³/ч`], ["Габариты (Д×Ш×В)", `${lamModel.dimensions} мм`], ["Масса (сух./раб.)", `${lamModel.mass} кг`], ["Материал корпуса", lamParsed.materialName]] }); toast.success("Добавлено в КП"); }}>
              <ClipboardList className="h-4 w-4" />
              Добавить в КП
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
            <ContactFormFields data={contactData} errors={contactErrors} onChange={handleLamContactChange} />
            <Button className="w-full gap-2 mt-2" onClick={handleLamSpecPdf}>
              <FileDown className="h-4 w-4" />
              Скачать PDF
            </Button>
          </DialogContent>
        </Dialog>
        {kpDialog}
      </main>
    );
  }

  // Try SPR (Станция приготовления реагентов — СЗПК.СПР.)
  const sprModels = [
    { name: "СПР-500", article: "СЗПК.СПР.500.ПП", capacity: "500", dimensions: "1700×1200×1540" },
    { name: "СПР-1000", article: "СЗПК.СПР.1000.ПП", capacity: "1 000", dimensions: "2000×1350×1540" },
    { name: "СПР-2000", article: "СЗПК.СПР.2000.ПП", capacity: "2 000", dimensions: "2300×1450×1940" },
    { name: "СПР-3000", article: "СЗПК.СПР.3000.ПП", capacity: "3 000", dimensions: "2700×1600×1940" },
    { name: "СПР-4000", article: "СЗПК.СПР.4000.ПП", capacity: "4 000", dimensions: "3200×1750×1940" },
    { name: "СПР-5000", article: "СЗПК.СПР.5000.ПП", capacity: "5 000", dimensions: "3300×1850×1940" },
    { name: "СПР-6000", article: "СЗПК.СПР.6000.ПП", capacity: "6 000", dimensions: "3500×1850×2140" },
    { name: "СПР-10000", article: "СЗПК.СПР.10000.ПП", capacity: "10 000", dimensions: "3900×1850×2140" },
  ];
  const sprModel = sprModels.find((m) => m.article === article) || null;
  if (sprModel) {
    const handleAddSpr = () => {
      addItem({ article: sprModel.article, diameter: 0, wallThickness: 0 }, qty);
      toast.success(`${sprModel.article} (${qty} шт.) добавлен в корзину`);
    };

    const handleSprSpecPdf = async () => {
      const errors = validateContactForm(contactData);
      setContactErrors(errors);
      if (Object.keys(errors).length > 0) return;

      await generateSpecPdf(
        {
          article: sprModel.article,
          diameter: 0,
          wallThickness: 0,
          socketThickness: 0,
          availableLength: null,
          connectionName: "",
          materialName: "Полипропилен (ПП)",
          productTitle: `Станция приготовления реагентов ${sprModel.name}`,
          extraRows: [
            ["Производительность", `${sprModel.capacity} л/ч`],
            ["Габариты (A×B×C)", `${sprModel.dimensions} мм`],
            ["Материал корпуса", "Полипропилен (ПП)"],
            ["Давление", "2–6 бар"],
            ["Время выдержки", "60 мин"],
            ["Концентрация раствора", "0,1–0,5%"],
            ["Степень защиты", "IP54"],
            ["Температура эксплуатации", "+5…+40 °C"],
          ],
        },
        contactData
      );
      toast.success("PDF-спецификация скачана");
      setPdfDialogOpen(false);
    };

    const handleSprKpPdf = () => {
      openKpDialog({ model: `Станция приготовления реагентов ${sprModel.name}`, article: sprModel.article, specs: [["Производительность", `${sprModel.capacity} л/ч`], ["Габариты (A×B×C)", `${sprModel.dimensions} мм`], ["Материал корпуса", "Полипропилен (ПП)"]] });
    };

    const handleSprContactChange = (field: keyof ContactFormData, value: string) => {
      setContactData((prev) => ({ ...prev, [field]: value }));
      if (contactErrors[field]) {
        setContactErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

    const sprParts = sprModel.article.split(".");
    const sprCap = sprParts[2] || "";

    return (
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka">Водоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka/stantsiya-dozirovaniya">Станции приготовления реагентов</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{sprModel.name} ({sprModel.article})</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ImageGalleryWithLightbox
          images={["/images/spr-hero-ral7032.jpg", "/images/spr-schema-front.gif", "/images/spr-schema-side.gif"]}
          selectedImage={selectedImage}
          onSelectedImageChange={setSelectedImage}
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Станция приготовления реагентов {sprModel.name}
            </h1>
            <p className="font-mono text-sm text-muted-foreground mb-4">{sprModel.article}</p>

            <ArticleBreakdown
              exampleArticle={sprModel.article}
              segments={[
                { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
                { value: "СПР", label: "Тип", desc: "Станция приготовления реагентов" },
                { value: sprCap, label: "Произв.", desc: `${sprModel.capacity} л/ч` },
                { value: sprParts[3], label: "Материал", desc: "Полипропилен" },
              ]}
            />

            <p className="text-sm text-muted-foreground mb-6">
              Автоматическая станция приготовления и дозирования коагулянтов и флокулянтов. Трёхкамерная система непрерывного действия, производительность — {sprModel.capacity} л/ч.
            </p>

            <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-6">
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Производительность</span>
                <span className="text-sm font-semibold text-foreground">{sprModel.capacity} л/ч</span>
              </div>
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Габариты (A×B×C)</span>
                <span className="text-sm font-semibold text-foreground">{sprModel.dimensions} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Давление</span>
                <span className="text-sm font-semibold text-foreground">2–6 бар</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Время выдержки</span>
                <span className="text-sm font-semibold text-foreground">60 мин</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Концентрация</span>
                <span className="text-sm font-semibold text-foreground">0,1–0,5%</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Степень защиты</span>
                <span className="text-sm font-semibold text-foreground">IP54</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Температура</span>
                <span className="text-sm font-semibold text-foreground">+5…+40 °C</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Материал корпуса</span>
                <span className="text-sm font-semibold text-foreground">Полипропилен (ПП)</span>
              </div>
            </div>

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
              <Button className="gap-2 flex-1" onClick={handleAddSpr}>
                <ShoppingCart className="h-4 w-4" />
                В корзину
              </Button>
            </div>

            <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
              <FileDown className="h-4 w-4" />
              Скачать спецификацию (PDF)
            </Button>

            <Button variant="outline" className="gap-2 w-full mt-2" onClick={handleSprKpPdf}>
              <FileDown className="h-4 w-4" />
              Скачать коммерческое предложение (PDF)
            </Button>
            <Button variant="secondary" className="gap-2 w-full mt-2" onClick={() => { addToKp({ model: `Станция приготовления реагентов ${sprModel.name}`, article: sprModel.article, specs: [["Производительность", `${sprModel.capacity} л/ч`], ["Габариты (A×B×C)", `${sprModel.dimensions} мм`], ["Материал корпуса", "Полипропилен (ПП)"]] }); toast.success("Добавлено в КП"); }}>
              <ClipboardList className="h-4 w-4" />
              Добавить в КП
            </Button>
          </div>
        </div>

        <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Скачать спецификацию</DialogTitle>
              <DialogDescription>
                Заполните контактные данные для скачивания PDF-спецификации
              </DialogDescription>
            </DialogHeader>
            <ContactFormFields data={contactData} errors={contactErrors} onChange={handleSprContactChange} />
            <Button className="w-full gap-2 mt-2" onClick={handleSprSpecPdf}>
              <FileDown className="h-4 w-4" />
              Скачать PDF
            </Button>
          </DialogContent>
        </Dialog>
        {kpDialog}
      </main>
    );
  }

  // Try Meshochnyj Obezvozhivatel (СЗПК.МО.)
  const moModels = [
    { name: "МО-1", article: "СЗПК.МО.01.ПП", capacity: "1,5", bags: "1", dimensions: "700×500×1420" },
    { name: "МО-2", article: "СЗПК.МО.02.ПП", capacity: "3", bags: "2", dimensions: "1100×500×1480" },
    { name: "МО-3", article: "СЗПК.МО.03.ПП", capacity: "4,5", bags: "3", dimensions: "1650×500×1480" },
    { name: "МО-4", article: "СЗПК.МО.04.ПП", capacity: "6", bags: "4", dimensions: "2200×500×1480" },
    { name: "МО-5", article: "СЗПК.МО.05.ПП", capacity: "7,5", bags: "5", dimensions: "2750×500×1480" },
    { name: "МО-6", article: "СЗПК.МО.06.ПП", capacity: "9", bags: "6", dimensions: "3300×500×1480" },
    { name: "МО-12", article: "СЗПК.МО.12.ПП", capacity: "12", bags: "12", dimensions: "6600×500×1480" },
  ];
  const moModel = moModels.find((m) => m.article === article) || null;
  if (moModel) {
    const handleAddMo = () => {
      addItem({ article: moModel.article, diameter: 0, wallThickness: 0 }, qty);
      toast.success(`${moModel.article} (${qty} шт.) добавлен в корзину`);
    };

    const handleMoSpecPdf = async () => {
      const errors = validateContactForm(contactData);
      setContactErrors(errors);
      if (Object.keys(errors).length > 0) return;

      await generateSpecPdf(
        {
          article: moModel.article,
          diameter: 0,
          wallThickness: 0,
          socketThickness: 0,
          availableLength: null,
          connectionName: "",
          materialName: "Полипропилен (ПП)",
          productTitle: `Мешочный обезвоживатель осадка ${moModel.name}`,
          extraRows: [
            ["Производительность", `${moModel.capacity} м³/сут`],
            ["Количество мешков", moModel.bags],
            ["Габариты (Д×Ш×В)", `${moModel.dimensions} мм`],
            ["Материал корпуса", "Полипропилен (ПП)"],
            ["Принцип работы", "Гравитационная фильтрация"],
            ["Энергопотребление", "Не требуется"],
          ],
        },
        contactData
      );
      toast.success("PDF-спецификация скачана");
      setPdfDialogOpen(false);
    };

    const handleMoKpPdf = () => {
      openKpDialog({ model: `Мешочный обезвоживатель осадка ${moModel.name}`, article: moModel.article, specs: [["Производительность", `${moModel.capacity} м³/сут`], ["Количество мешков", moModel.bags], ["Габариты (Д×Ш×В)", `${moModel.dimensions} мм`], ["Материал корпуса", "Полипропилен (ПП)"]] });
    };

    const handleMoContactChange = (field: keyof ContactFormData, value: string) => {
      setContactData((prev) => ({ ...prev, [field]: value }));
      if (contactErrors[field]) {
        setContactErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

    const moParts = moModel.article.split(".");
    const moNum = moParts[2] || "";

    return (
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka">Водоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka/meshochnyj-obezvozhivatel">Обезвоживатель</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{moModel.name} ({moModel.article})</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ImageGalleryWithLightbox
          images={["/images/obezvozhivatel-3d-ral7032.jpg", "/images/obezvozhivatel-schema-1.webp"]}
          selectedImage={selectedImage}
          onSelectedImageChange={setSelectedImage}
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Мешочный обезвоживатель осадка {moModel.name}
            </h1>
            <p className="font-mono text-sm text-muted-foreground mb-4">{moModel.article}</p>

            <ArticleBreakdown
              exampleArticle={moModel.article}
              segments={[
                { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
                { value: "МО", label: "Тип", desc: "Мешочный обезвоживатель" },
                { value: moNum, label: "Мешков", desc: `${moModel.bags} шт.` },
                { value: moParts[3], label: "Материал", desc: "Полипропилен" },
              ]}
            />

            <p className="text-sm text-muted-foreground mb-6">
              Обезвоживатель осадка для снижения влажности шламов методом гравитационной фильтрации через полимерные мешки. Производительность — {moModel.capacity} м³/сут.
            </p>

            <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-6">
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Производительность</span>
                <span className="text-sm font-semibold text-foreground">{moModel.capacity} м³/сут</span>
              </div>
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Количество мешков</span>
                <span className="text-sm font-semibold text-foreground">{moModel.bags}</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Габариты (Д×Ш×В)</span>
                <span className="text-sm font-semibold text-foreground">{moModel.dimensions} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Материал корпуса</span>
                <span className="text-sm font-semibold text-foreground">Полипропилен (ПП)</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Принцип работы</span>
                <span className="text-sm font-semibold text-foreground">Гравитационный</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Энергопотребление</span>
                <span className="text-sm font-semibold text-foreground">Не требуется</span>
              </div>
            </div>

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
              <Button className="gap-2 flex-1" onClick={handleAddMo}>
                <ShoppingCart className="h-4 w-4" />
                В корзину
              </Button>
            </div>

            <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
              <FileDown className="h-4 w-4" />
              Скачать спецификацию (PDF)
            </Button>

            <Button variant="outline" className="gap-2 w-full mt-2" onClick={handleMoKpPdf}>
              <FileDown className="h-4 w-4" />
              Скачать коммерческое предложение (PDF)
            </Button>
            <Button variant="secondary" className="gap-2 w-full mt-2" onClick={() => { addToKp({ model: `Мешочный обезвоживатель осадка ${moModel.name}`, article: moModel.article, specs: [["Производительность", `${moModel.capacity} м³/сут`], ["Количество мешков", moModel.bags], ["Габариты (Д×Ш×В)", `${moModel.dimensions} мм`], ["Материал корпуса", "Полипропилен (ПП)"]] }); toast.success("Добавлено в КП"); }}>
              <ClipboardList className="h-4 w-4" />
              Добавить в КП
            </Button>
          </div>
        </div>

        <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Скачать спецификацию</DialogTitle>
              <DialogDescription>
                Заполните контактные данные для скачивания PDF-спецификации
              </DialogDescription>
            </DialogHeader>
            <ContactFormFields data={contactData} errors={contactErrors} onChange={handleMoContactChange} />
            <Button className="w-full gap-2 mt-2" onClick={handleMoSpecPdf}>
              <FileDown className="h-4 w-4" />
              Скачать PDF
            </Button>
          </DialogContent>
        </Dialog>
        {kpDialog}
      </main>
    );
  }

  // Try Жироуловитель (СЗПК.ЖУ. / СЗПК.ЖУН. / СЗПК.ЖУГ. / СЗПК.ЖУП.)
  const zhuModels = [
    // Подземные вертикальные (ЖУ)
    { name: "ЖУ-1", article: "СЗПК.ЖУ.1.ПП", throughput: "1", peakDischarge: "500", diameter: "800", height: "1300", wellDiameter: "700", inletHeight: "1140", outletHeight: "1090", pipeDiameter: "110", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-2", article: "СЗПК.ЖУ.2.ПП", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1600", wellDiameter: "700", inletHeight: "1430", outletHeight: "1380", pipeDiameter: "110", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-3", article: "СЗПК.ЖУ.3.ПП", throughput: "3", peakDischarge: "1500", diameter: "1200", height: "1500", wellDiameter: "700", inletHeight: "1330", outletHeight: "1280", pipeDiameter: "110", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-4", article: "СЗПК.ЖУ.4.ПП", throughput: "4", peakDischarge: "2000", diameter: "1350", height: "1550", wellDiameter: "700", inletHeight: "1380", outletHeight: "1330", pipeDiameter: "160", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-5", article: "СЗПК.ЖУ.5.ПП", throughput: "5", peakDischarge: "2500", diameter: "1350", height: "2000", wellDiameter: "700", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "160", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-6", article: "СЗПК.ЖУ.6.ПП", throughput: "6", peakDischarge: "3000", diameter: "1450", height: "2000", wellDiameter: "700", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "160", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-7", article: "СЗПК.ЖУ.7.ПП", throughput: "7", peakDischarge: "3500", diameter: "1550", height: "2000", wellDiameter: "700", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "160", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-8", article: "СЗПК.ЖУ.8.ПП", throughput: "8", peakDischarge: "4000", diameter: "1650", height: "2000", wellDiameter: "700", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "200", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-9", article: "СЗПК.ЖУ.9.ПП", throughput: "9", peakDischarge: "4500", diameter: "1750", height: "2000", wellDiameter: "700", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "200", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-10", article: "СЗПК.ЖУ.10.ПП", throughput: "10", peakDischarge: "5000", diameter: "1850", height: "2000", wellDiameter: "700", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "200", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    { name: "ЖУ-15", article: "СЗПК.ЖУ.15.ПП", throughput: "15", peakDischarge: "7500", diameter: "2200", height: "2000", wellDiameter: "700", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "200", installType: "Подземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye", backLabel: "Подземные вертикальные" },
    // Наземные вертикальные (ЖУН)
    { name: "ЖУН-1", article: "СЗПК.ЖУН.1.ПП", throughput: "1", peakDischarge: "500", diameter: "800", height: "1300", wellDiameter: "-", inletHeight: "1140", outletHeight: "1090", pipeDiameter: "110", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-2", article: "СЗПК.ЖУН.2.ПП", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1600", wellDiameter: "-", inletHeight: "1430", outletHeight: "1380", pipeDiameter: "110", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-3", article: "СЗПК.ЖУН.3.ПП", throughput: "3", peakDischarge: "1500", diameter: "1200", height: "1500", wellDiameter: "-", inletHeight: "1330", outletHeight: "1280", pipeDiameter: "110", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-4", article: "СЗПК.ЖУН.4.ПП", throughput: "4", peakDischarge: "2000", diameter: "1350", height: "1550", wellDiameter: "-", inletHeight: "1380", outletHeight: "1330", pipeDiameter: "160", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-5", article: "СЗПК.ЖУН.5.ПП", throughput: "5", peakDischarge: "2500", diameter: "1350", height: "2000", wellDiameter: "-", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "160", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-6", article: "СЗПК.ЖУН.6.ПП", throughput: "6", peakDischarge: "3000", diameter: "1450", height: "2000", wellDiameter: "-", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "160", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-7", article: "СЗПК.ЖУН.7.ПП", throughput: "7", peakDischarge: "3500", diameter: "1550", height: "2000", wellDiameter: "-", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "160", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-8", article: "СЗПК.ЖУН.8.ПП", throughput: "8", peakDischarge: "4000", diameter: "1650", height: "2000", wellDiameter: "-", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "200", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-9", article: "СЗПК.ЖУН.9.ПП", throughput: "9", peakDischarge: "4500", diameter: "1750", height: "2000", wellDiameter: "-", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "200", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-10", article: "СЗПК.ЖУН.10.ПП", throughput: "10", peakDischarge: "5000", diameter: "1850", height: "2000", wellDiameter: "-", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "200", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    { name: "ЖУН-15", article: "СЗПК.ЖУН.15.ПП", throughput: "15", peakDischarge: "7500", diameter: "2200", height: "2000", wellDiameter: "-", inletHeight: "1830", outletHeight: "1780", pipeDiameter: "200", installType: "Наземный вертикальный", backLink: "/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye", backLabel: "Наземные вертикальные" },
    // Горизонтальные (ЖУГ)
    { name: "ЖУГ-1", article: "СЗПК.ЖУГ.1.ПП", throughput: "1", peakDischarge: "500", diameter: "800", height: "1200", wellDiameter: "-", inletHeight: "-", outletHeight: "-", pipeDiameter: "110", installType: "Горизонтальный", backLink: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye", backLabel: "Горизонтальные" },
    { name: "ЖУГ-2", article: "СЗПК.ЖУГ.2.ПП", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1500", wellDiameter: "-", inletHeight: "-", outletHeight: "-", pipeDiameter: "110", installType: "Горизонтальный", backLink: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye", backLabel: "Горизонтальные" },
    { name: "ЖУГ-3", article: "СЗПК.ЖУГ.3.ПП", throughput: "3", peakDischarge: "1500", diameter: "1000", height: "2000", wellDiameter: "-", inletHeight: "-", outletHeight: "-", pipeDiameter: "110", installType: "Горизонтальный", backLink: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye", backLabel: "Горизонтальные" },
    { name: "ЖУГ-5", article: "СЗПК.ЖУГ.5.ПП", throughput: "5", peakDischarge: "2500", diameter: "1200", height: "2400", wellDiameter: "-", inletHeight: "-", outletHeight: "-", pipeDiameter: "160", installType: "Горизонтальный", backLink: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye", backLabel: "Горизонтальные" },
    { name: "ЖУГ-10", article: "СЗПК.ЖУГ.10.ПП", throughput: "10", peakDischarge: "5000", diameter: "1400", height: "3500", wellDiameter: "-", inletHeight: "-", outletHeight: "-", pipeDiameter: "200", installType: "Горизонтальный", backLink: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye", backLabel: "Горизонтальные" },
    { name: "ЖУГ-15", article: "СЗПК.ЖУГ.15.ПП", throughput: "15", peakDischarge: "7500", diameter: "1600", height: "3900", wellDiameter: "-", inletHeight: "-", outletHeight: "-", pipeDiameter: "200", installType: "Горизонтальный", backLink: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye", backLabel: "Горизонтальные" },
    { name: "ЖУГ-20", article: "СЗПК.ЖУГ.20.ПП", throughput: "20", peakDischarge: "10000", diameter: "1600", height: "5100", wellDiameter: "-", inletHeight: "-", outletHeight: "-", pipeDiameter: "200", installType: "Горизонтальный", backLink: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye", backLabel: "Горизонтальные" },
    { name: "ЖУГ-25", article: "СЗПК.ЖУГ.25.ПП", throughput: "25", peakDischarge: "12500", diameter: "1600", height: "6300", wellDiameter: "-", inletHeight: "-", outletHeight: "-", pipeDiameter: "200", installType: "Горизонтальный", backLink: "/catalog/vodoochistka/zhirouloviteli/gorizontalnye", backLabel: "Горизонтальные" },
    // Прямоугольные (ЖУП)
    { name: "ЖУП-1", article: "СЗПК.ЖУП.1.ПП", throughput: "1", peakDischarge: "500", diameter: "1050×750", height: "1120", wellDiameter: "120", inletHeight: "840", outletHeight: "790", pipeDiameter: "110", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-2", article: "СЗПК.ЖУП.2.ПП", throughput: "2", peakDischarge: "1000", diameter: "1400×850", height: "1320", wellDiameter: "120", inletHeight: "940", outletHeight: "890", pipeDiameter: "110", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-3", article: "СЗПК.ЖУП.3.ПП", throughput: "3", peakDischarge: "1500", diameter: "1500×1000", height: "1320", wellDiameter: "120", inletHeight: "1040", outletHeight: "990", pipeDiameter: "110", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-4", article: "СЗПК.ЖУП.4.ПП", throughput: "4", peakDischarge: "2000", diameter: "1650×1000", height: "1500", wellDiameter: "120", inletHeight: "1120", outletHeight: "1070", pipeDiameter: "110", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-5", article: "СЗПК.ЖУП.5.ПП", throughput: "5", peakDischarge: "2500", diameter: "1650×1200", height: "1520", wellDiameter: "120", inletHeight: "1140", outletHeight: "1090", pipeDiameter: "160", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-6", article: "СЗПК.ЖУП.6.ПП", throughput: "6", peakDischarge: "3000", diameter: "1750×1250", height: "1670", wellDiameter: "120", inletHeight: "1290", outletHeight: "1240", pipeDiameter: "160", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-7", article: "СЗПК.ЖУП.7.ПП", throughput: "7", peakDischarge: "3500", diameter: "2000×1300", height: "1670", wellDiameter: "120", inletHeight: "1290", outletHeight: "1240", pipeDiameter: "160", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-8", article: "СЗПК.ЖУП.8.ПП", throughput: "8", peakDischarge: "4000", diameter: "2000×1500", height: "1670", wellDiameter: "120", inletHeight: "1290", outletHeight: "1240", pipeDiameter: "200", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-9", article: "СЗПК.ЖУП.9.ПП", throughput: "9", peakDischarge: "4500", diameter: "2300×1500", height: "1670", wellDiameter: "120", inletHeight: "1290", outletHeight: "1240", pipeDiameter: "200", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-10", article: "СЗПК.ЖУП.10.ПП", throughput: "10", peakDischarge: "5000", diameter: "2550×1500", height: "1670", wellDiameter: "120", inletHeight: "1290", outletHeight: "1240", pipeDiameter: "200", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-15", article: "СЗПК.ЖУП.15.ПП", throughput: "15", peakDischarge: "7500", diameter: "2800×1500", height: "2020", wellDiameter: "150", inletHeight: "1640", outletHeight: "1590", pipeDiameter: "200", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-20", article: "СЗПК.ЖУП.20.ПП", throughput: "20", peakDischarge: "10000", diameter: "3500×1600", height: "2020", wellDiameter: "150", inletHeight: "1640", outletHeight: "1590", pipeDiameter: "200", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
    { name: "ЖУП-25", article: "СЗПК.ЖУП.25.ПП", throughput: "25", peakDischarge: "12500", diameter: "4000×1650", height: "2120", wellDiameter: "150", inletHeight: "1740", outletHeight: "1690", pipeDiameter: "200", installType: "Прямоугольный наземный", backLink: "/catalog/vodoochistka/zhirouloviteli/pryamougolnye", backLabel: "Прямоугольные" },
  ];
  const zhuModel = zhuModels.find((m) => m.article === article) || null;
  if (zhuModel) {
    const handleAddZhu = () => {
      addItem({ article: zhuModel.article, diameter: 0, wallThickness: 0 }, qty);
      toast.success(`${zhuModel.article} (${qty} шт.) добавлен в корзину`);
    };

    const handleZhuSpecPdf = async () => {
      const errors = validateContactForm(contactData);
      setContactErrors(errors);
      if (Object.keys(errors).length > 0) return;

      await generateSpecPdf(
        {
          article: zhuModel.article,
          diameter: 0,
          wallThickness: 0,
          socketThickness: 0,
          availableLength: null,
          connectionName: "",
          materialName: "Полипропилен (ПП)",
          productTitle: `Промышленный жироуловитель ${zhuModel.name}`,
          extraRows: [
            ["Производительность", `${zhuModel.throughput} л/с`],
            ["Пиковый сброс", `${zhuModel.peakDischarge} л`],
            [zhuModel.article.includes(".ЖУП.") ? "Длина×Ширина корпуса" : "Ø корпуса", `${zhuModel.diameter} мм`],
            [zhuModel.article.includes(".ЖУП.") ? "Высота ёмкости" : "Высота корпуса", `${zhuModel.height} мм`],
            [zhuModel.article.includes(".ЖУП.") ? "Высота колодца" : "Ø колодца", `${zhuModel.wellDiameter} мм`],
            ["Высота входа", `${zhuModel.inletHeight} мм`],
            ["Высота выхода", `${zhuModel.outletHeight} мм`],
            ["Ø патрубков", `${zhuModel.pipeDiameter} мм`],
            ["Способ установки", zhuModel.installType],
            ["Материал корпуса", "Полипропилен (ПП)"],
            ["Принцип работы", "Гравитационная сепарация"],
          ],
        },
        contactData
      );
      toast.success("PDF-спецификация скачана");
      setPdfDialogOpen(false);
    };

    const handleZhuKpPdf = () => {
      openKpDialog({ model: `Промышленный жироуловитель ${zhuModel.name}`, article: zhuModel.article, specs: [["Производительность", `${zhuModel.throughput} л/с`], ["Пиковый сброс", `${zhuModel.peakDischarge} л`], [zhuModel.article.includes(".ЖУП.") ? "Длина×Ширина" : "Ø корпуса", `${zhuModel.diameter} мм`], ["Высота", `${zhuModel.height} мм`], ["Ø патрубков", `${zhuModel.pipeDiameter} мм`], ["Способ установки", zhuModel.installType], ["Материал корпуса", "Полипропилен (ПП)"]] });
    };

    const handleZhuContactChange = (field: keyof ContactFormData, value: string) => {
      setContactData((prev) => ({ ...prev, [field]: value }));
      if (contactErrors[field]) {
        setContactErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

    const zhuParts = zhuModel.article.split(".");
    const zhuThroughput = zhuParts[2] || "";

    const zhuAdditionalEquipment = [
      "Надставка технического колодца (10–50 см)",
      "Лестница для обслуживания",
      "Крышка жироуловителя промышленного (чугун / ПП)",
      "Дозатор биопрепаратов",
      "Сигнализатор уровня жира",
      "Автоматический сборщик жира с таймером",
      "Коалесцентный модуль для повышения эффективности",
    ];

    return (
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka">Водоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka/zhirouloviteli">Жироуловители</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={zhuModel.backLink}>{zhuModel.backLabel}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{zhuModel.name} ({zhuModel.article})</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ImageGalleryWithLightbox
          images={
            zhuModel.article.includes(".ЖУП.")
              ? ["/images/zhu-p-schema-rect.png", "/images/zhu-p-schema1.png", "/images/zhu-p-schema2.png", "/images/zhu-p-schema3.png", "/images/zhu-p-schema4.png"]
              : zhuModel.article.includes(".ЖУГ.")
              ? ["/images/zhu-g-hero-ral7032.jpg", "/images/zhu-g-schema1.png", "/images/zhu-g-schema2.png", "/images/zhu-g-schema3.png", "/images/zhu-g-schema4.png", "/images/zhu-g-schema5.jpg"]
              : ["/images/zhu-pv-hero-ral7032.jpg", "/images/zhu-pv-schema1.png", "/images/zhu-pv-schema2.png", "/images/zhu-pv-schema3.png", "/images/zhu-pv-schema4.png", "/images/zhu-pv-schema5.png"]
          }
          selectedImage={selectedImage}
          onSelectedImageChange={setSelectedImage}
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Жироуловитель {zhuModel.name} ({zhuModel.installType.toLowerCase()})
            </h1>
            <p className="font-mono text-sm text-muted-foreground mb-4">{zhuModel.article}</p>

            <ArticleBreakdown
              exampleArticle={zhuModel.article}
              segments={[
                { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
                { value: "ЖУ", label: "Тип", desc: "Жироуловитель" },
                { value: zhuThroughput, label: "Произв.", desc: `${zhuModel.throughput} л/с` },
                { value: zhuParts[3], label: "Материал", desc: "Полипропилен" },
              ]}
            />

            <p className="text-sm text-muted-foreground mb-6">
              {zhuModel.article.includes(".ЖУП.")
                ? `Промышленный прямоугольный жироуловитель производительностью ${zhuModel.throughput} л/с с пиковым сбросом ${zhuModel.peakDischarge} литров. Корпус из листового полипропилена с рёбрами жёсткости, герметичная крышка с уплотнителем EPDM, внутренние седиментационные пластины. Срок службы — не менее 25 лет.`
                : `Промышленный вертикальный жироуловитель производительностью ${zhuModel.throughput} л/с с пиковым сбросом ${zhuModel.peakDischarge} литров. Изготовлен из пищевого полипропилена, срок службы — не менее 25 лет. Предназначен для улавливания и удаления неэмульгированных жиров и масел из сточных вод кухонь, ресторанов, мясоперерабатывающих и других предприятий в соответствии со СНиП 2.04.01-85.`
              }
            </p>
          </div>

          <div>
            {/* Основные характеристики */}
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Основные характеристики</h3>
            <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-4">
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Производитель</span>
                <span className="text-sm font-semibold text-foreground">Пласт-Металл Про</span>
              </div>
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Способ установки</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.installType}</span>
              </div>
            </div>

            {/* Технические характеристики */}
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Технические характеристики</h3>
            <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-4">
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Производительность</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.throughput} л/с</span>
              </div>
              <div className="bg-card p-3">
                <span className="block text-xs text-muted-foreground">Пиковый сброс</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.peakDischarge} л</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">{zhuModel.article.includes(".ЖУП.") ? "Длина×Ширина корпуса" : "Ø корпуса"}</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.diameter} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">{zhuModel.article.includes(".ЖУП.") ? "Высота ёмкости" : "Высота корпуса"}</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.height} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">{zhuModel.article.includes(".ЖУП.") ? "Высота колодца" : "Ø колодца"}</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.wellDiameter} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">{zhuModel.article.includes(".ЖУП.") ? "Высота общая" : "Высота колодца"}</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.article.includes(".ЖУП.") ? `${parseInt(zhuModel.height) + parseInt(zhuModel.wellDiameter)} мм` : "Индивидуально"}</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Высота входа</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.inletHeight} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Высота выхода</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.outletHeight} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Ø патрубков</span>
                <span className="text-sm font-semibold text-foreground">{zhuModel.pipeDiameter} мм</span>
              </div>
              <div className="bg-card p-3 border-t">
                <span className="block text-xs text-muted-foreground">Материал</span>
                <span className="text-sm font-semibold text-foreground">Полипропилен (ПП)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Описание */}
        <section className="mt-8 mb-6 rounded-lg border bg-card p-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Описание</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            {zhuModel.article.includes(".ЖУП.") ? (
              <>
                <p>
                  Прямоугольный жироуловитель {zhuModel.name} — промышленное оборудование для крупных ресторанов и предприятий пищевой отрасли. Корпус прямоугольного сечения из листового полипропилена толщиной 5–10 мм с рёбрами жёсткости оптимален для установки в ограниченных пространствах технических помещений.
                </p>
                <p>
                  Производительность {zhuModel.throughput} л/с, пиковый сброс {zhuModel.peakDischarge} литров. Габариты корпуса: {zhuModel.diameter} мм, высота ёмкости {zhuModel.height} мм, высота колодца {zhuModel.wellDiameter} мм (общая высота {parseInt(zhuModel.height) + parseInt(zhuModel.wellDiameter)} мм). Оснащён герметичной откидной крышкой с уплотнителем EPDM, внутренними седиментационными пластинами для повышения эффективности сепарации и патрубками Ø{zhuModel.pipeDiameter} мм.
                </p>
                <p>
                  Сточная вода через входной патрубок (высота входа {zhuModel.inletHeight} мм) поступает в 1-й отсек — отстойник ила, где происходит отделение крупного мусора и тяжёлых загрязнений. Далее вода поступает во 2-й отсек — жироуловитель, где происходит окончательное отделение жиров. Очищенная вода через отводящий патрубок (высота выхода {zhuModel.outletHeight} мм) отводится в канализационную сеть.
                </p>
              </>
            ) : (
              <>
                <p>
                  Промышленный вертикальный жироуловитель — незаменимое устройство на любом производственном объекте, специализирующемся на изготовлении продуктов питания: промышленных цехах и предприятиях общественного питания.
                </p>
                <p>
                  Жироуловитель {zhuModel.name} производительностью {zhuModel.throughput} л/с имеет пиковый сброс {zhuModel.peakDischarge} литров, изготовлен из пищевого полипропилена, срок службы которого не менее 25 лет. Предназначен для улавливания и удаления неэмульгированных жиров и масел из сточных вод в соответствии со СНиП 2.04.01-85. Защищает бытовую канализацию от жирового загрязнения, повышает эффективность последующих очистных сооружений.
                </p>
                <p>
                  Сточная вода через входной патрубок поступает в 1-й отсек, выполняющий роль отстойника ила, где происходит отделение крупного мусора и тяжёлых загрязнений, оседающих на дне. Далее вода поступает во 2-й отсек, выполняющий функцию жироуловителя, в котором происходит окончательное отделение жиров. Очищенная вода через распределительный карман поступает в отводящий патрубок и отводится в канализационную сеть.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Дополнительное оборудование */}
        <section className="mb-6 rounded-lg border bg-card p-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Дополнительное оборудование</h2>
          <ul className="space-y-1.5">
            {zhuAdditionalEquipment.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Действия */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 border rounded-md">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center text-sm font-medium">{qty}</span>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty((q) => q + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="gap-2 flex-1" onClick={handleAddZhu}>
            <ShoppingCart className="h-4 w-4" />
            В корзину
          </Button>
        </div>

        <Button variant="outline" className="gap-2 w-full mb-2" onClick={() => setPdfDialogOpen(true)}>
          <FileDown className="h-4 w-4" />
          Скачать спецификацию (PDF)
        </Button>

        <Button variant="outline" className="gap-2 w-full" onClick={handleZhuKpPdf}>
          <FileDown className="h-4 w-4" />
          Скачать коммерческое предложение (PDF)
        </Button>

        <Button variant="secondary" className="gap-2 w-full mt-2" onClick={() => { addToKp({ model: `Жироуловитель ${zhuModel.name}`, article: zhuModel.article, specs: [["Производительность", `${zhuModel.throughput} л/с`], ["Пиковый сброс", `${zhuModel.peakDischarge} л`], ["Диаметр", `${zhuModel.diameter} мм`], ["Высота", `${zhuModel.height} мм`], ["Тип установки", zhuModel.installType]] }); toast.success("Добавлено в КП"); }}>
          <ClipboardList className="h-4 w-4" />
          Добавить в КП
        </Button>

        <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Скачать спецификацию</DialogTitle>
              <DialogDescription>
                Заполните контактные данные для скачивания PDF-спецификации
              </DialogDescription>
            </DialogHeader>
            <ContactFormFields data={contactData} errors={contactErrors} onChange={handleZhuContactChange} />
            <Button className="w-full gap-2 mt-2" onClick={handleZhuSpecPdf}>
              <FileDown className="h-4 w-4" />
              Скачать PDF
            </Button>
          </DialogContent>
        </Dialog>
        {kpDialog}
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
          <p className="font-mono text-sm text-muted-foreground mb-2">{article}</p>

          {/* Article breakdown for vent products */}
          {(() => {
            const parts = article.split(".");
            const typeCode = parts[1] || "";
            const typeLabels: Record<string, string> = {
              "ОТВР": "Отвод раструбный", "ОТВФ": "Отвод фланцевый", "ОТВ": "Отвод",
              "ТР": "Тройник раструбный", "ТРФ": "Тройник фланцевый",
              "РЭ": "Раздвижной элемент", "РЭФ": "Раздвижной фланцевый",
              "ВК": "Воздуховод круглый",
            };
            const segments: ArticleSegment[] = [
              { value: "СЗПК", label: "Компания", desc: "Сибирский завод полимерных конструкций" },
              { value: typeCode, label: "Тип", desc: typeLabels[typeCode] || typeCode },
            ];
            if (!isTroynik && !isVozdukhovod && !isRazdvizhnoy && parts[2]) {
              segments.push({ value: parts[2], label: "Угол", desc: `${parts[2]}°` });
            }
            if (material) {
              segments.push({ value: material.code, label: "Материал", desc: material.name.split("(")[0].trim() });
            }
            if (color?.colorCode) {
              segments.push({ value: color.colorCode, label: "Цвет", desc: `${color.name} (${color.ral})`, hex: color.hex });
            }
            if (isTroynik && troynikSize) {
              segments.push({ value: `${diameter}×${troynikSize.d1}`, label: "Диаметры", desc: `D ${diameter} мм × D1 ${troynikSize.d1} мм` });
            } else {
              segments.push({ value: String(diameter), label: "Диаметр", desc: `${diameter} мм` });
            }
            return <ArticleBreakdown exampleArticle={article} segments={segments} />;
          })()}

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

      {kpDialog}
    </main>
  );
};

const Product = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [kpOpen, setKpOpen] = useState(false);

  return (
    <CartProvider>
      <KpProvider>
        <div className="min-h-screen bg-background">
          <Header onCartOpen={() => setCartOpen(true)} onKpOpen={() => setKpOpen(true)} />
          <ProductDetailContent />
          <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
          <KpSheet open={kpOpen} onOpenChange={setKpOpen} />
        </div>
      </KpProvider>
    </CartProvider>
  );
};

export default Product;
