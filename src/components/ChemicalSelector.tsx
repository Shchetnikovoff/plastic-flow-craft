import { useState, useMemo } from "react";
import { Plus, Trash2, Search, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  getSubstanceNames,
  findCompatibility,
  isSuitable,
  ratingLabels,
  ratingColors,
  materialInfo,
  type Rating,
} from "@/data/chemicalResistance";

interface ChemicalRow {
  id: number;
  substance: string;
  concentration: string;
  temperature: string;
}

const emptyRow = (): ChemicalRow => ({
  id: Date.now() + Math.random(),
  substance: "",
  concentration: "",
  temperature: "20",
});

interface Props {
  /** Compact mode hides the result summary cards (useful inside calculator) */
  compact?: boolean;
}

const RatingBadge = ({ rating }: { rating: Rating }) => (
  <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${ratingColors[rating]}`}>
    {rating === "A" || rating === "B" ? (
      <CheckCircle2 className="h-3 w-3" />
    ) : rating === "C" ? (
      <AlertTriangle className="h-3 w-3" />
    ) : (
      <XCircle className="h-3 w-3" />
    )}
    {ratingLabels[rating]}
  </span>
);

export default function ChemicalSelector({ compact = false }: Props) {
  const [rows, setRows] = useState<ChemicalRow[]>([emptyRow()]);
  const [openSuggest, setOpenSuggest] = useState<number | null>(null);

  const allNames = useMemo(() => getSubstanceNames(), []);

  const addRow = () => setRows((r) => [...r, emptyRow()]);

  const removeRow = (id: number) =>
    setRows((r) => (r.length === 1 ? [emptyRow()] : r.filter((row) => row.id !== id)));

  const updateRow = (id: number, field: keyof ChemicalRow, value: string) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

  // Filter suggestions for a given row
  const getSuggestions = (query: string) => {
    if (!query || query.length < 1) return allNames.slice(0, 15);
    const q = query.toLowerCase();
    return allNames.filter((n) => n.toLowerCase().includes(q)).slice(0, 10);
  };

  // Compute results for all filled rows
  const results = useMemo(() => {
    const filledRows = rows.filter((r) => r.substance.trim());
    if (filledRows.length === 0) return null;

    const rowResults = filledRows.map((r) => {
      const conc = parseFloat(r.concentration) || 0;
      const temp = parseFloat(r.temperature) || 20;
      const compat = findCompatibility(r.substance, conc, temp);
      return { row: r, compat };
    });

    // Aggregate: worst rating per material across all substances
    let worstPp: Rating = "A";
    let worstPe: Rating = "A";
    let worstPvc: Rating = "A";

    const order: Record<Rating, number> = { A: 0, B: 1, C: 2, X: 3 };

    for (const { compat } of rowResults) {
      if (!compat) {
        worstPp = "X";
        worstPe = "X";
        worstPvc = "X";
        continue;
      }
      if (order[compat.pp] > order[worstPp]) worstPp = compat.pp;
      if (order[compat.pe] > order[worstPe]) worstPe = compat.pe;
      if (order[compat.pvc] > order[worstPvc]) worstPvc = compat.pvc;
    }

    return { rowResults, worstPp, worstPe, worstPvc };
  }, [rows]);

  const hasSuitable = results
    ? isSuitable(results.worstPp) || isSuitable(results.worstPe) || isSuitable(results.worstPvc)
    : false;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
          Подбор материала по химической стойкости
        </h3>
      </div>

      <p className="text-xs text-muted-foreground">
        Укажите вещества, с которыми будет контактировать ёмкость. Система подберёт подходящий материал.
      </p>

      {/* Rows */}
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div key={row.id} className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Вещество {idx + 1}</span>
              {rows.length > 1 && (
                <button
                  onClick={() => removeRow(row.id)}
                  className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                  title="Удалить строку"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Substance */}
              <div className="relative sm:col-span-1">
                <Label className="text-xs text-muted-foreground mb-1 block">Наименование</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    value={row.substance}
                    onChange={(e) => {
                      updateRow(row.id, "substance", e.target.value);
                      setOpenSuggest(row.id);
                    }}
                    onFocus={() => setOpenSuggest(row.id)}
                    onBlur={() => setTimeout(() => setOpenSuggest(null), 150)}
                    placeholder="Начните вводить..."
                    className="pl-7 text-xs h-8"
                  />
                </div>
                {openSuggest === row.id && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-md border border-border bg-popover shadow-md">
                    {getSuggestions(row.substance).map((name) => (
                      <button
                        key={name}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          updateRow(row.id, "substance", name);
                          setOpenSuggest(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {name}
                      </button>
                    ))}
                    {getSuggestions(row.substance).length === 0 && (
                      <div className="px-3 py-2 text-xs text-muted-foreground">Не найдено</div>
                    )}
                  </div>
                )}
              </div>

              {/* Concentration */}
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Концентрация, %</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={row.concentration}
                  onChange={(e) => updateRow(row.id, "concentration", e.target.value)}
                  placeholder="0–100"
                  className="text-xs h-8"
                />
              </div>

              {/* Temperature */}
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Температура, °C</Label>
                <Input
                  type="number"
                  min={-60}
                  max={120}
                  value={row.temperature}
                  onChange={(e) => updateRow(row.id, "temperature", e.target.value)}
                  placeholder="20"
                  className="text-xs h-8"
                />
              </div>
            </div>

            {/* Inline result for this row */}
            {row.substance.trim() && (() => {
              const conc = parseFloat(row.concentration) || 0;
              const temp = parseFloat(row.temperature) || 20;
              const compat = findCompatibility(row.substance, conc, temp);
              if (!compat) return (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600">
                  <AlertTriangle className="h-3 w-3" />
                  Вещество не найдено в базе данных
                </div>
              );
              return (
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground self-center">PP:</span>
                  <RatingBadge rating={compat.pp} />
                  <span className="text-xs text-muted-foreground self-center">PE:</span>
                  <RatingBadge rating={compat.pe} />
                  <span className="text-xs text-muted-foreground self-center">PVC:</span>
                  <RatingBadge rating={compat.pvc} />
                </div>
              );
            })()}
          </div>
        ))}
      </div>

      {/* Add row button */}
      <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5 text-xs">
        <Plus className="h-3.5 w-3.5" />
        Добавить вещество
      </Button>

      {/* Aggregate results */}
      {results && !compact && (
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-bold text-foreground">Результат подбора материала</h4>

          {!hasSuitable && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
              <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Ни один стандартный материал не подходит</p>
                <p className="text-xs text-red-600 mt-0.5">
                  Для данной комбинации веществ рекомендуем проконсультироваться с инженером для подбора специального материала (PVDF, ECTFE, футеровка и др.)
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(["pp", "pe", "pvc"] as const).map((mat) => {
              const rating = results[`worst${mat[0].toUpperCase()}${mat.slice(1)}` as "worstPp" | "worstPe" | "worstPvc"];
              const suitable = isSuitable(rating);
              const info = materialInfo[mat];
              return (
                <Card key={mat} className={suitable ? "border-green-200 bg-green-50/50" : "opacity-60"}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">{info.name}</p>
                      {suitable && <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Диапазон: {info.tempRange}</p>
                    <RatingBadge rating={rating} />
                    {suitable && (
                      <p className="text-xs text-green-700 mt-2 font-medium">Рекомендован</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>
              Рейтинг рассчитан по наихудшему показателю среди всех указанных веществ.
              A — отлично, B — хорошо, C — ограниченно, X — не рекомендуется.
              Для окончательного подбора проконсультируйтесь с инженером.
            </span>
          </div>
        </div>
      )}

      {/* Compact aggregate (for calculator) */}
      {results && compact && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-foreground">Пригодные материалы:</span>
          {(["pp", "pe", "pvc"] as const).map((mat) => {
            const rating = results[`worst${mat[0].toUpperCase()}${mat.slice(1)}` as "worstPp" | "worstPe" | "worstPvc"];
            const suitable = isSuitable(rating);
            if (!suitable) return null;
            return (
              <span key={mat} className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                <CheckCircle2 className="h-3 w-3" />
                {materialInfo[mat].name}
              </span>
            );
          })}
          {!hasSuitable && (
            <span className="text-xs text-red-600 font-medium">Нет подходящих — требуется консультация</span>
          )}
        </div>
      )}
    </div>
  );
}
