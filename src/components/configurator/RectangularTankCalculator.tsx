import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { pryamougolnyeProducts } from "@/data/pryamougolnyeProducts";
import { materials, materialSpecs } from "@/data/products";
import ArticleBreakdown, { ArticleSegment } from "./ArticleBreakdown";

const volumes = pryamougolnyeProducts.map((p) => p.volume);

function getColorOverlay(hex: string, colorCode: string) {
  if (!colorCode && hex === "#1C1C1C") return { backgroundColor: hex, mixBlendMode: "multiply" as const, opacity: 0.55 };
  if (colorCode === "9003") return { backgroundColor: hex, mixBlendMode: "screen" as const, opacity: 0.15 };
  if (colorCode === "7032") return null;
  return { backgroundColor: hex, mixBlendMode: "multiply" as const, opacity: 0.35 };
}

const RectangularTankCalculator = () => {
  const [volIdx, setVolIdx] = useState(0);
  const [matIdx, setMatIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);

  const mat = materials[matIdx];
  const specs = materialSpecs[mat.name];
  const colors = specs.colors;
  const color = colors[Math.min(colorIdx, colors.length - 1)];

  const volume = volumes[volIdx];
  const product = pryamougolnyeProducts.find((p) => p.volume === volume)!;

  const hasMultipleColors = colors.length > 1;
  const articleStr = hasMultipleColors
    ? `СЗПК.ЕПО.${mat.code}.${color.colorCode}.${volume}`
    : `СЗПК.ЕПО.${mat.code}.${volume}`;

  const segments: ArticleSegment[] = useMemo(() => {
    const segs: ArticleSegment[] = [
      { value: "СЗПК", label: "Бренд", desc: "СибЗавод ПолимерКомпозит" },
      { value: "ЕПО", label: "Тип", desc: "Прямоугольная в обрешётке" },
      { value: mat.code, label: "Материал", desc: mat.name.split("(")[0].trim() },
    ];
    if (hasMultipleColors) {
      segs.push({ value: color.colorCode, label: "Цвет", desc: `${color.name} ${color.ral}`, hex: color.hex });
    }
    segs.push({ value: String(volume), label: "Объём", desc: `${volume.toLocaleString("ru-RU")} литров` });
    return segs;
  }, [mat, color, volume, hasMultipleColors]);

  const overlay = getColorOverlay(color.hex, color.colorCode);

  return (
    <section id="calculator" className="mb-10 scroll-mt-8">
      <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Калькулятор подбора</h2>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-muted flex items-center justify-center p-6">
            <div className="relative w-full max-w-[320px]">
              <img src="/images/emkost-pryam-pp-1.png" alt="Прямоугольная ёмкость" className="w-full h-auto rounded-lg" />
              {overlay && (
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    backgroundColor: overlay.backgroundColor,
                    mixBlendMode: overlay.mixBlendMode,
                    opacity: overlay.opacity,
                  }}
                />
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 sm:p-6 space-y-5">
            {/* Volume */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Объём</p>
              <div className="flex items-center gap-3">
                <Slider
                  min={0}
                  max={volumes.length - 1}
                  step={1}
                  value={[volIdx]}
                  onValueChange={([v]) => setVolIdx(v)}
                  className="flex-1"
                />
                <span className="text-sm font-bold text-foreground min-w-[70px] text-right">
                  {volume.toLocaleString("ru-RU")} л
                </span>
              </div>
            </div>

            {/* Material */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Материал</p>
              <div className="flex flex-wrap gap-1.5">
                {materials.map((m, i) => (
                  <Badge
                    key={m.code}
                    variant="outline"
                    className={`cursor-pointer text-[11px] px-2.5 py-1 rounded-full transition-colors ${
                      i === matIdx ? "border-primary text-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => { setMatIdx(i); setColorIdx(0); }}
                  >
                    {m.code}
                  </Badge>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{specs.workingTemp}</p>
            </div>

            {/* Color */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Цвет</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((c, i) => (
                  <button
                    key={c.colorCode || c.name}
                    onClick={() => setColorIdx(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      i === (colorIdx >= colors.length ? 0 : colorIdx)
                        ? "border-primary ring-2 ring-primary/30 scale-110"
                        : "border-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={`${c.name} ${c.ral}`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                {color.name} {color.ral} — {color.application}
              </p>
            </div>

            {/* Result */}
            <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5">
              <p className="text-xs text-muted-foreground">Габариты (Д×Ш×В):</p>
              <p className="text-sm font-bold text-foreground">{product.dimensions} мм</p>
              <p className="text-xs text-muted-foreground">Артикул:</p>
              <p className="text-sm font-mono font-bold text-foreground">{articleStr}</p>
            </div>

            <Link to={`/product/${encodeURIComponent(articleStr)}`}>
              <Button className="w-full gap-2 mt-1">
                Перейти к товару <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Article breakdown */}
        <div className="px-4 sm:px-6 pb-4">
          <ArticleBreakdown exampleArticle={articleStr} segments={segments} />
        </div>
      </div>
    </section>
  );
};

export default RectangularTankCalculator;
