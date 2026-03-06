import { Badge } from "@/components/ui/badge";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";

interface MaterialSectionProps {
  selectedMaterial: string;
  selectedColor: MaterialColor | undefined;
  onMaterialChange: (material: string) => void;
  onColorChange: (color: MaterialColor) => void;
}

const MaterialSection = ({ selectedMaterial, selectedColor, onMaterialChange, onColorChange }: MaterialSectionProps) => {
  const specs = materialSpecs[selectedMaterial];

  return (
    <>
      {/* Material badges */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Материалы</h2>
        <div className="flex flex-wrap gap-2">
          {materials.map((mat) => (
            <Badge
              key={mat.name}
              variant="outline"
              className={`rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                selectedMaterial === mat.name
                  ? "border-primary text-primary bg-primary/5"
                  : "hover:border-primary/50 hover:text-primary/80"
              }`}
              onClick={() => onMaterialChange(mat.name)}
            >
              {mat.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Plastic specs + colors */}
      {specs && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики пластика</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-4">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Рабочая температура</span>
              <span className="text-sm font-semibold text-foreground">{specs.workingTemp}</span>
            </div>
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Химическая стойкость</span>
              <span className="text-sm font-semibold text-foreground">{specs.chemicalResistance}</span>
            </div>
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Доступные цвета</h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {specs.colors.map((c) => (
              <div
                key={c.ral}
                onClick={() => onColorChange(c)}
                className={`rounded-lg border bg-card p-3 cursor-pointer transition-all ${
                  selectedColor?.colorCode === c.colorCode
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
    </>
  );
};

export default MaterialSection;
