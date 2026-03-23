import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import ArticleBreakdown, { type ArticleSegment } from "@/components/configurator/ArticleBreakdown";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";

interface HorizontalTankModel {
  art: string;
  vol: number;
  d: number;
  l: number;
}

interface HorizontalTankCalculatorProps {
  models: HorizontalTankModel[];
  articlePrefix: string;
  prefixLabel: string;
  heroImage: string;
}

const HorizontalTankCalculator = ({ models, articlePrefix, prefixLabel, heroImage }: HorizontalTankCalculatorProps) => {
  const volumes = useMemo(() => models.map((m) => m.vol), [models]);
  const minVol = volumes[0];
  const maxVol = volumes[volumes.length - 1];

  const [selectedVolume, setSelectedVolume] = useState(minVol);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const [selectedColor, setSelectedColor] = useState<MaterialColor>(
    materialSpecs[materials[0].name].colors[0]
  );

  const specs = materialSpecs[selectedMaterial];

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
            <div className="w-full max-w-[220px]">
              <img
                src={heroImage}
                alt="Горизонтальная ёмкость"
                className="w-full aspect-[4/3] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Result */}
        {(() => {
          const matCode = materials.find((m) => m.name === selectedMaterial)?.code || "PPC";
          const colorPart = selectedColor.colorCode ? `.${selectedColor.colorCode}` : "";
          const fullArticle = `СЗПК.${articlePrefix}.${matCode}${colorPart}.${matchedModel.vol}`;

          const segments: ArticleSegment[] = [
            { value: "СЗПК", label: "Компания", desc: "Сибирский завод полимерных конструкций" },
            { value: articlePrefix, label: "Тип", desc: prefixLabel },
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
