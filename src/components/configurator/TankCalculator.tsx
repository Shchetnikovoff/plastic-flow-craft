import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";

export type TankType = "flat" | "sloped" | "conical" | "conusdno";

interface TankModel {
  art: string;
  vol: number;
  d: number;
  h: number;
}

interface TankCalculatorProps {
  models: TankModel[];
  defaultType: TankType;
}

const tankTypeLabels: Record<TankType, string> = {
  flat: "Плоская крыша",
  sloped: "Наклонное дно",
  conical: "Коническая крыша",
  conusdno: "Конусное дно",
};

const TankSvg = ({ type, color }: { type: TankType; color: string }) => {
  const dk = "#3A3D3F";
  const id = `tank-${type}`;
  return (
    <svg viewBox="0 0 220 300" className="w-full h-full max-h-[280px]">
      <defs>
        {/* Highlight gradient for 3D cylinder effect */}
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.12" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="65%" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-vert`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.10" />
        </linearGradient>
      </defs>

      {/* ── Support legs (conusdno only, drawn first so body overlaps) ── */}
      {type === "conusdno" && (
        <g>
          <rect x="58" y="220" width="7" height="58" rx="1" fill={dk} opacity="0.7" />
          <rect x="155" y="220" width="7" height="58" rx="1" fill={dk} opacity="0.7" />
          {/* Cross brace */}
          <line x1="62" y1="255" x2="158" y2="255" stroke={dk} strokeWidth="3" opacity="0.4" />
          {/* Base plates */}
          <rect x="48" y="276" width="27" height="5" rx="1.5" fill={dk} opacity="0.55" />
          <rect x="145" y="276" width="27" height="5" rx="1.5" fill={dk} opacity="0.55" />
        </g>
      )}

      {/* ── Cylinder body ── */}
      <rect x="55" y="65" width="110" height="155" fill={color} className="transition-colors duration-300" />
      <rect x="55" y="65" width="110" height="155" fill={`url(#${id}-body)`} />
      <rect x="55" y="65" width="110" height="155" fill={`url(#${id}-vert)`} />

      {/* Body outline */}
      <line x1="55" y1="65" x2="55" y2="220" stroke={dk} strokeWidth="1.5" />
      <line x1="165" y1="65" x2="165" y2="220" stroke={dk} strokeWidth="1.5" />

      {/* Reinforcement ribs */}
      {[105, 140, 175].map((y) => (
        <g key={y}>
          <rect x="55" y={y} width="110" height="4" fill={dk} opacity="0.12" rx="0.5" />
          <line x1="55" y1={y + 2} x2="165" y2={y + 2} stroke={dk} strokeWidth="0.6" opacity="0.25" />
        </g>
      ))}

      {/* Welding seam (vertical center) */}
      <line x1="110" y1="65" x2="110" y2="220" stroke={dk} strokeWidth="0.4" opacity="0.12" strokeDasharray="6 4" />

      {/* Level indicator strip */}
      <rect x="157" y="80" width="4" height="125" rx="1" fill="#fff" opacity="0.25" />
      <rect x="157" y="80" width="4" height="125" rx="1" stroke={dk} strokeWidth="0.5" opacity="0.3" fill="none" />

      {/* ── Inlet nozzle (left side) ── */}
      <rect x="38" y="90" width="17" height="10" rx="2" fill={dk} opacity="0.6" />
      <rect x="35" y="88" width="6" height="14" rx="1.5" fill={dk} opacity="0.45" />

      {/* ── Outlet nozzle (right side, lower) ── */}
      <rect x="165" y="185" width="17" height="10" rx="2" fill={dk} opacity="0.6" />
      <rect x="179" y="183" width="6" height="14" rx="1.5" fill={dk} opacity="0.45" />

      {/* ── TOP ── */}
      {type === "conical" ? (
        <g>
          {/* Cone roof */}
          <polygon points="55,65 110,18 165,65" fill={color} stroke={dk} strokeWidth="1.5" className="transition-colors duration-300" />
          <polygon points="55,65 110,18 165,65" fill={`url(#${id}-body)`} />
          {/* Apex cap */}
          <circle cx="110" cy="18" r="4" fill={dk} opacity="0.5" />
          {/* Hatch on cone slope */}
          <ellipse cx="95" cy="48" rx="12" ry="5" fill={dk} opacity="0.3" stroke={dk} strokeWidth="0.8" />
          {[80, 87, 95, 103, 110].map((x) => (
            <circle key={x} cx={x - 7} cy={48} r="1" fill={dk} opacity="0.4" />
          ))}
        </g>
      ) : (
        <g>
          {/* Flat elliptical lid */}
          <ellipse cx="110" cy="65" rx="55" ry="14" fill={color} stroke={dk} strokeWidth="1.5" className="transition-colors duration-300" />
          <ellipse cx="110" cy="65" rx="55" ry="14" fill={`url(#${id}-body)`} />
          {/* Hatch Ø800 representation */}
          <ellipse cx="110" cy="63" rx="18" ry="5" fill={dk} opacity="0.15" stroke={dk} strokeWidth="1" />
          {/* Bolt dots around hatch */}
          {[88, 95, 102, 110, 118, 125, 132].map((x) => (
            <circle key={x} cx={x} cy={63 + Math.sin((x - 110) * 0.15) * 4.5} r="1.2" fill={dk} opacity="0.35" />
          ))}
          {/* Hatch handle */}
          <rect x="106" y="59" width="8" height="3" rx="1" fill={dk} opacity="0.4" />
        </g>
      )}

      {/* ── BOTTOM ── */}
      {type === "sloped" ? (
        <g>
          {/* Angled bottom plate */}
          <polygon points="55,220 165,220 165,238 55,228" fill={color} stroke={dk} strokeWidth="1.5" className="transition-colors duration-300" />
          <polygon points="55,220 165,220 165,238 55,228" fill={`url(#${id}-body)`} />
          {/* Drain nozzle at low point */}
          <rect x="155" y="236" width="12" height="8" rx="2" fill={dk} opacity="0.6" />
          <rect x="164" y="234" width="5" height="12" rx="1.5" fill={dk} opacity="0.45" />
        </g>
      ) : type === "conusdno" ? (
        <g>
          {/* Inverted cone bottom */}
          <polygon points="55,220 110,268 165,220" fill={color} stroke={dk} strokeWidth="1.5" className="transition-colors duration-300" />
          <polygon points="55,220 110,268 165,220" fill={`url(#${id}-body)`} />
          {/* Drain valve at apex */}
          <rect x="103" y="266" width="14" height="10" rx="2" fill={dk} opacity="0.7" />
          <circle cx="110" cy="271" r="2.5" fill={dk} opacity="0.5" />
        </g>
      ) : (
        <g>
          {/* Flat elliptical bottom */}
          <ellipse cx="110" cy="220" rx="55" ry="14" fill={color} stroke={dk} strokeWidth="1.5" className="transition-colors duration-300" />
          <ellipse cx="110" cy="220" rx="55" ry="14" fill={`url(#${id}-body)`} />
          {/* Drain nozzle at bottom center */}
          <rect x="104" y="230" width="12" height="8" rx="2" fill={dk} opacity="0.6" />
        </g>
      )}
    </svg>
  );
};

const TankCalculator = ({ models, defaultType }: TankCalculatorProps) => {
  const volumes = useMemo(() => models.map((m) => m.vol), [models]);
  const minVol = volumes[0];
  const maxVol = volumes[volumes.length - 1];

  const [selectedVolume, setSelectedVolume] = useState(minVol);
  const [selectedType, setSelectedType] = useState<TankType>(defaultType);
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

  const handleMaterialChange = (matName: string) => {
    setSelectedMaterial(matName);
    const newSpecs = materialSpecs[matName];
    if (newSpecs && newSpecs.colors.length > 0) {
      setSelectedColor(newSpecs.colors[0]);
    }
  };

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

            {/* Tank type */}
            <div>
              <span className="text-sm font-semibold text-foreground mb-2 block">Тип ёмкости</span>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(tankTypeLabels) as TankType[]).map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className={`rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                      selectedType === t
                        ? "border-primary text-primary bg-primary/5"
                        : "hover:border-primary/50 hover:text-primary/80"
                    }`}
                    onClick={() => setSelectedType(t)}
                  >
                    {tankTypeLabels[t]}
                  </Badge>
                ))}
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

          {/* SVG preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-[200px]">
              <TankSvg type={selectedType} color={selectedColor.hex} />
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                Рекомендованная модель: <span className="text-primary">{matchedModel.art}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {matchedModel.vol.toLocaleString("ru-RU")} л · Ø{matchedModel.d.toLocaleString("ru-RU")} мм · H {matchedModel.h.toLocaleString("ru-RU")} мм
                · {materials.find((m) => m.name === selectedMaterial)?.code} · {selectedColor.name} ({selectedColor.ral})
              </p>
            </div>
            <Button asChild size="sm" className="gap-1.5">
              <Link to={`/product/${encodeURIComponent(matchedModel.art)}`}>
                Перейти к товару
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TankCalculator;
