import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import ArticleBreakdown, { type ArticleSegment } from "@/components/configurator/ArticleBreakdown";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";

export type HorizontalTankType = "low" | "high";

interface HorizontalTankModel {
  art: string;
  vol: number;
  d: number;
  l: number;
}

const horizontalTypeConfig: Record<HorizontalTankType, {
  label: string;
  prefix: string;
  prefixLabel: string;
  image: string;
  models: HorizontalTankModel[];
}> = {
  low: {
    label: "Низкие ложементы",
    prefix: "ЕГППЛСТ",
    prefixLabel: "Низкие ложементы — Горизонтальные",
    image: "/images/egts-standartnaya-1.jpg",
    models: [
      { art: "СЗПК.ЕГППЛСТ.1000", vol: 1000, d: 940, l: 1500 },
      { art: "СЗПК.ЕГППЛСТ.2000", vol: 2000, d: 1330, l: 1500 },
      { art: "СЗПК.ЕГППЛСТ.3000", vol: 3000, d: 1600, l: 1500 },
      { art: "СЗПК.ЕГППЛСТ.4000", vol: 4000, d: 1600, l: 2000 },
      { art: "СЗПК.ЕГППЛСТ.5000", vol: 5000, d: 1700, l: 2300 },
      { art: "СЗПК.ЕГППЛСТ.6000", vol: 6000, d: 1850, l: 2300 },
      { art: "СЗПК.ЕГППЛСТ.8000", vol: 8000, d: 2260, l: 2000 },
      { art: "СЗПК.ЕГППЛСТ.10000", vol: 10000, d: 2350, l: 2350 },
      { art: "СЗПК.ЕГППЛСТ.12000", vol: 12000, d: 2350, l: 2800 },
      { art: "СЗПК.ЕГППЛСТ.15000", vol: 15000, d: 2350, l: 3500 },
      { art: "СЗПК.ЕГППЛСТ.20000", vol: 20000, d: 2380, l: 4500 },
      { art: "СЗПК.ЕГППЛСТ.25000", vol: 25000, d: 2370, l: 5700 },
      { art: "СЗПК.ЕГППЛСТ.30000", vol: 30000, d: 2400, l: 6650 },
      { art: "СЗПК.ЕГППЛСТ.35000", vol: 35000, d: 3050, l: 4800 },
      { art: "СЗПК.ЕГППЛСТ.40000", vol: 40000, d: 3050, l: 5600 },
      { art: "СЗПК.ЕГППЛСТ.45000", vol: 45000, d: 3050, l: 6200 },
      { art: "СЗПК.ЕГППЛСТ.50000", vol: 50000, d: 3050, l: 7000 },
    ],
  },
  high: {
    label: "Высокие ложементы",
    prefix: "ЕГППЛВ",
    prefixLabel: "Высокие ложементы — Горизонтальные",
    image: "/images/egts-vysokie-lozhementy-1.jpg",
    models: [
      { art: "СЗПК.ЕГППЛВ.1000", vol: 1000, d: 940, l: 1500 },
      { art: "СЗПК.ЕГППЛВ.2000", vol: 2000, d: 1330, l: 1500 },
      { art: "СЗПК.ЕГППЛВ.3000", vol: 3000, d: 1600, l: 1500 },
      { art: "СЗПК.ЕГППЛВ.4000", vol: 4000, d: 1600, l: 2000 },
      { art: "СЗПК.ЕГППЛВ.5000", vol: 5000, d: 1700, l: 2300 },
      { art: "СЗПК.ЕГППЛВ.6000", vol: 6000, d: 1850, l: 2300 },
      { art: "СЗПК.ЕГППЛВ.8000", vol: 8000, d: 2260, l: 2000 },
      { art: "СЗПК.ЕГППЛВ.10000", vol: 10000, d: 2350, l: 2350 },
      { art: "СЗПК.ЕГППЛВ.12000", vol: 12000, d: 2350, l: 2800 },
      { art: "СЗПК.ЕГППЛВ.15000", vol: 15000, d: 2350, l: 3500 },
      { art: "СЗПК.ЕГППЛВ.20000", vol: 20000, d: 2380, l: 4500 },
      { art: "СЗПК.ЕГППЛВ.25000", vol: 25000, d: 2370, l: 5700 },
      { art: "СЗПК.ЕГППЛВ.30000", vol: 30000, d: 2400, l: 6650 },
      { art: "СЗПК.ЕГППЛВ.35000", vol: 35000, d: 3050, l: 4800 },
      { art: "СЗПК.ЕГППЛВ.40000", vol: 40000, d: 3050, l: 5600 },
      { art: "СЗПК.ЕГППЛВ.45000", vol: 45000, d: 3050, l: 6200 },
      { art: "СЗПК.ЕГППЛВ.50000", vol: 50000, d: 3050, l: 7000 },
    ],
  },
};

interface HorizontalTankCalculatorProps {
  defaultType?: HorizontalTankType;
}

const HorizontalTankCalculator = ({ defaultType = "low" }: HorizontalTankCalculatorProps) => {
  const [selectedType, setSelectedType] = useState<HorizontalTankType>(defaultType);
  const config = horizontalTypeConfig[selectedType];
  const models = config.models;

  const volumes = useMemo(() => models.map((m) => m.vol), [models]);
  const minVol = volumes[0];
  const maxVol = volumes[volumes.length - 1];

  const [selectedVolume, setSelectedVolume] = useState(minVol);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const [selectedColor, setSelectedColor] = useState<MaterialColor>(
    materialSpecs[materials[0].name].colors[0]
  );

  const specs = materialSpecs[selectedMaterial];

  const getColorOverlay = useCallback((hex: string | undefined, colorCode: string | undefined): React.CSSProperties | null => {
    if (!hex) return null;
    // RAL 7032 (default grey) — no overlay
    if (colorCode === "7032") return null;
    // RAL 9003 (white)
    if (colorCode === "9003") return { backgroundColor: hex, mixBlendMode: "soft-light" as const, opacity: 0.5 };
    // PE100 black (no colorCode)
    if (!colorCode) return { backgroundColor: hex, mixBlendMode: "multiply" as const, opacity: 0.6 };
    // RAL 5012 (blue) and others
    return { backgroundColor: hex, mixBlendMode: "multiply" as const, opacity: 0.35 };
  }, []);

  const overlayStyle = useMemo(() => getColorOverlay(selectedColor.hex, selectedColor.colorCode), [getColorOverlay, selectedColor]);

  const matchedModel = useMemo(() => {
    let closest = models[0];
    let minDiff = Math.abs(models[0].vol - selectedVolume);
    for (const m of models) {
      const diff = Math.abs(m.vol - selectedVolume);
      if (diff < minDiff) {
        minDiff = diff;
        closest = m;
      }
    }
    return closest;
  }, [models, selectedVolume]);

  const handleMaterialChange = useCallback((matName: string) => {
    setSelectedMaterial(matName);
    const newSpecs = materialSpecs[matName];
    if (newSpecs && newSpecs.colors.length > 0) {
      setSelectedColor(newSpecs.colors[0]);
    }
  }, []);

  return (
    <section id="calculator" className="mb-10 scroll-mt-8">
      <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">
        Калькулятор подбора ёмкости
      </h2>
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Tank type selector */}
            <div>
              <span className="text-sm font-semibold text-foreground mb-2 block">Тип ложементов</span>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(horizontalTypeConfig) as HorizontalTankType[]).map((t) => {
                  const cfg = horizontalTypeConfig[t];
                  return (
                    <div
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`flex flex-col items-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
                        selectedType === t
                          ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
                          : "border-border hover:border-muted-foreground bg-card"
                      }`}
                    >
                      <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
                        <img
                          src={cfg.image}
                          alt={cfg.label}
                          className="w-full h-full object-contain"
                        />
                        {overlayStyle && (
                          <div className="absolute inset-0 pointer-events-none" style={overlayStyle} />
                        )}
                      </div>
                      <span className="text-xs font-medium text-foreground text-center leading-tight">
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Volume slider */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Объём: <span className="text-primary">{selectedVolume.toLocaleString("ru-RU")} л</span>
              </label>
              <Slider
                min={minVol}
                max={maxVol}
                step={1000}
                value={[selectedVolume]}
                onValueChange={([v]) => setSelectedVolume(v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{minVol.toLocaleString("ru-RU")} л</span>
                <span>{maxVol.toLocaleString("ru-RU")} л</span>
              </div>
            </div>

            {/* Material */}
            <div>
              <span className="text-sm font-semibold text-foreground mb-2 block">Материал</span>
              <div className="flex flex-wrap gap-2">
                {materials.map((mat) => (
                  <Badge
                    key={mat.name}
                    variant="outline"
                    className={`rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                      selectedMaterial === mat.name
                        ? "border-primary text-primary bg-primary/5"
                        : "hover:border-primary/50 hover:text-primary/80"
                    }`}
                    onClick={() => handleMaterialChange(mat.name)}
                  >
                    {mat.code}
                  </Badge>
                ))}
              </div>
              {specs && (
                <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                  <span>🌡 {specs.workingTemp}</span>
                </div>
              )}
            </div>

            {/* Colors */}
            {specs && (
              <div>
                <span className="text-sm font-semibold text-foreground mb-2 block">Цвет</span>
                <div className="flex flex-wrap gap-2">
                  {specs.colors.map((c) => (
                    <div
                      key={c.ral + c.colorCode}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-all ${
                        selectedColor.colorCode === c.colorCode
                          ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
                          : "border-border hover:border-muted-foreground bg-card"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-border shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs font-medium text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.ral}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Photo preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-[220px] relative overflow-hidden rounded-lg">
              <img
                src={config.image}
                alt={config.label}
                className="w-full aspect-[4/3] object-contain"
              />
              {overlayStyle && (
                <div className="absolute inset-0 pointer-events-none rounded-lg" style={overlayStyle} />
              )}
            </div>
          </div>
        </div>

        {/* Result */}
        {(() => {
          const matCode = materials.find((m) => m.name === selectedMaterial)?.code || "PPC";
          const colorPart = selectedColor.colorCode ? `.${selectedColor.colorCode}` : "";
          const fullArticle = `СЗПК.${config.prefix}.${matCode}${colorPart}.${matchedModel.vol}`;

          const segments: ArticleSegment[] = [
            { value: "СЗПК", label: "Компания", desc: "Сибирский завод полимерных конструкций" },
            { value: config.prefix, label: "Тип", desc: config.prefixLabel },
            { value: matCode, label: "Материал", desc: materials.find((m) => m.code === matCode)?.name.split("(")[0].trim() || matCode },
            ...(selectedColor.colorCode ? [{
              value: selectedColor.colorCode,
              label: "Цвет",
              desc: `${selectedColor.name} (${selectedColor.ral})`,
              hex: selectedColor.hex,
            }] : []),
            { value: String(matchedModel.vol), label: "Объём, л", desc: `${matchedModel.vol.toLocaleString("ru-RU")} литров` },
          ];

          return (
            <div className="mt-6 space-y-3">
              <ArticleBreakdown exampleArticle={fullArticle} segments={segments} />
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      Рекомендованная модель: <span className="text-primary">{fullArticle}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {matchedModel.vol.toLocaleString("ru-RU")} л · Ø{matchedModel.d.toLocaleString("ru-RU")} мм · L {matchedModel.l.toLocaleString("ru-RU")} мм
                      · {matCode} · {selectedColor.name} ({selectedColor.ral})
                    </p>
                  </div>
                  <Button asChild size="sm" className="gap-1.5">
                    <Link to={`/product/${encodeURIComponent(fullArticle)}`}>
                      Перейти к товару
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};

export default HorizontalTankCalculator;
