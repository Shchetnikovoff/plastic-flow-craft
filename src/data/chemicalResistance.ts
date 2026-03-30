/**
 * Comprehensive chemical resistance database for PP, PE (HDPE), PVC.
 *
 * Rating scale:
 *   "A" — Excellent (recommended, long-term contact)
 *   "B" — Good (suitable with limitations)
 *   "C" — Fair (short-term / limited contact only)
 *   "X" — Not recommended
 *
 * Each entry specifies max concentration (%) and ratings at two
 * temperature thresholds: ≤20 °C and ≤60 °C.  When the working
 * temperature exceeds 60 °C the next-worse rating applies
 * automatically (A→B, B→C, C→X, X→X).
 */

export type Rating = "A" | "B" | "C" | "X";

export interface ChemicalEntry {
  /** Display name (Russian) */
  name: string;
  /** Max concentration the rating is valid for (%) */
  maxConcentration: number;
  /** Ratings at ≤ 20 °C */
  pp20: Rating;
  pe20: Rating;
  pvc20: Rating;
  /** Ratings at ≤ 60 °C */
  pp60: Rating;
  pe60: Rating;
  pvc60: Rating;
}

export const chemicalDatabase: ChemicalEntry[] = [
  // ── Кислоты ──
  { name: "Азотная кислота", maxConcentration: 10, pp20: "A", pe20: "B", pvc20: "A", pp60: "B", pe60: "C", pvc60: "B" },
  { name: "Азотная кислота", maxConcentration: 25, pp20: "B", pe20: "C", pvc20: "A", pp60: "C", pe60: "X", pvc60: "B" },
  { name: "Азотная кислота", maxConcentration: 40, pp20: "C", pe20: "X", pvc20: "B", pp60: "X", pe60: "X", pvc60: "C" },
  { name: "Азотная кислота", maxConcentration: 65, pp20: "X", pe20: "X", pvc20: "C", pp60: "X", pe60: "X", pvc60: "X" },

  { name: "Серная кислота", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Серная кислота", maxConcentration: 30, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Серная кислота", maxConcentration: 50, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },
  { name: "Серная кислота", maxConcentration: 70, pp20: "B", pe20: "B", pvc20: "X", pp60: "C", pe60: "X", pvc60: "X" },
  { name: "Серная кислота", maxConcentration: 96, pp20: "C", pe20: "X", pvc20: "X", pp60: "X", pe60: "X", pvc60: "X" },

  { name: "Соляная кислота", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Соляная кислота", maxConcentration: 20, pp20: "A", pe20: "A", pvc20: "B", pp60: "A", pe60: "B", pvc60: "C" },
  { name: "Соляная кислота", maxConcentration: 37, pp20: "A", pe20: "B", pvc20: "C", pp60: "A", pe60: "C", pvc60: "X" },

  { name: "Фосфорная кислота", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "B" },
  { name: "Фосфорная кислота", maxConcentration: 40, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Фосфорная кислота", maxConcentration: 85, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },

  { name: "Уксусная кислота", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Уксусная кислота", maxConcentration: 50, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },
  { name: "Уксусная кислота", maxConcentration: 100, pp20: "B", pe20: "C", pvc20: "X", pp60: "C", pe60: "X", pvc60: "X" },

  { name: "Плавиковая кислота (HF)", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "B", pp60: "B", pe60: "B", pvc60: "C" },
  { name: "Плавиковая кислота (HF)", maxConcentration: 40, pp20: "A", pe20: "B", pvc20: "C", pp60: "B", pe60: "C", pvc60: "X" },
  { name: "Плавиковая кислота (HF)", maxConcentration: 60, pp20: "B", pe20: "C", pvc20: "X", pp60: "C", pe60: "X", pvc60: "X" },

  { name: "Хромовая кислота", maxConcentration: 10, pp20: "A", pe20: "B", pvc20: "A", pp60: "B", pe60: "C", pvc60: "B" },
  { name: "Хромовая кислота", maxConcentration: 30, pp20: "B", pe20: "C", pvc20: "B", pp60: "C", pe60: "X", pvc60: "C" },
  { name: "Хромовая кислота", maxConcentration: 50, pp20: "C", pe20: "X", pvc20: "C", pp60: "X", pe60: "X", pvc60: "X" },

  { name: "Лимонная кислота", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Лимонная кислота", maxConcentration: 50, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },

  { name: "Молочная кислота", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Молочная кислота", maxConcentration: 90, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },

  { name: "Щавелевая кислота", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Щавелевая кислота", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },

  { name: "Борная кислота", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },

  { name: "Муравьиная кислота", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Муравьиная кислота", maxConcentration: 50, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },
  { name: "Муравьиная кислота", maxConcentration: 100, pp20: "B", pe20: "C", pvc20: "X", pp60: "C", pe60: "X", pvc60: "X" },

  { name: "Олеиновая кислота", maxConcentration: 100, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },

  { name: "Винная кислота", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },

  // ── Щёлочи ──
  { name: "Гидроксид натрия (NaOH)", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Гидроксид натрия (NaOH)", maxConcentration: 30, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Гидроксид натрия (NaOH)", maxConcentration: 50, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },

  { name: "Гидроксид калия (KOH)", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Гидроксид калия (KOH)", maxConcentration: 30, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Гидроксид калия (KOH)", maxConcentration: 50, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },

  { name: "Гидроксид кальция (Ca(OH)₂)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "B" },

  { name: "Гидроксид аммония (NH₄OH)", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Гидроксид аммония (NH₄OH)", maxConcentration: 30, pp20: "A", pe20: "A", pvc20: "B", pp60: "A", pe60: "B", pvc60: "C" },

  // ── Соли ──
  { name: "Хлорид натрия (NaCl)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Хлорид кальция (CaCl₂)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Хлорид железа (FeCl₃)", maxConcentration: 30, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Сульфат натрия (Na₂SO₄)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Сульфат меди (CuSO₄)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Сульфат алюминия (Al₂(SO₄)₃)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Нитрат натрия (NaNO₃)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Нитрат кальция (Ca(NO₃)₂)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Карбонат натрия (Na₂CO₃)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "B" },
  { name: "Бихромат калия (K₂Cr₂O₇)", maxConcentration: 30, pp20: "A", pe20: "B", pvc20: "A", pp60: "B", pe60: "C", pvc60: "B" },

  // ── Гипохлориты / Окислители ──
  { name: "Гипохлорит натрия (NaClO)", maxConcentration: 5, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Гипохлорит натрия (NaClO)", maxConcentration: 15, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },
  { name: "Перекись водорода (H₂O₂)", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Перекись водорода (H₂O₂)", maxConcentration: 30, pp20: "B", pe20: "B", pvc20: "B", pp60: "C", pe60: "C", pvc60: "C" },
  { name: "Перекись водорода (H₂O₂)", maxConcentration: 90, pp20: "C", pe20: "X", pvc20: "X", pp60: "X", pe60: "X", pvc60: "X" },

  { name: "Хлор (водный раствор)", maxConcentration: 100, pp20: "A", pe20: "B", pvc20: "A", pp60: "B", pe60: "C", pvc60: "B" },

  // ── Растворители / Органика ──
  { name: "Этанол (этиловый спирт)", maxConcentration: 50, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Этанол (этиловый спирт)", maxConcentration: 96, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },

  { name: "Метанол (метиловый спирт)", maxConcentration: 100, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },

  { name: "Изопропиловый спирт", maxConcentration: 100, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },

  { name: "Формальдегид", maxConcentration: 37, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },

  { name: "Глицерин", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },

  { name: "Этиленгликоль", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },

  { name: "Ацетон", maxConcentration: 100, pp20: "B", pe20: "C", pvc20: "X", pp60: "C", pe60: "X", pvc60: "X" },

  { name: "Бензол", maxConcentration: 100, pp20: "C", pe20: "X", pvc20: "X", pp60: "X", pe60: "X", pvc60: "X" },
  { name: "Толуол", maxConcentration: 100, pp20: "C", pe20: "X", pvc20: "X", pp60: "X", pe60: "X", pvc60: "X" },
  { name: "Ксилол", maxConcentration: 100, pp20: "C", pe20: "X", pvc20: "X", pp60: "X", pe60: "X", pvc60: "X" },

  { name: "Дихлорметан (метиленхлорид)", maxConcentration: 100, pp20: "X", pe20: "X", pvc20: "X", pp60: "X", pe60: "X", pvc60: "X" },

  { name: "Фенол", maxConcentration: 10, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },
  { name: "Фенол", maxConcentration: 100, pp20: "C", pe20: "X", pvc20: "X", pp60: "X", pe60: "X", pvc60: "X" },

  // ── Промышленные среды ──
  { name: "Морская вода", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Дистиллированная вода", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Сточные воды (бытовые)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },

  { name: "Хлорное железо (травильный раствор)", maxConcentration: 40, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },

  { name: "Аммиак (водный раствор)", maxConcentration: 10, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "B" },
  { name: "Аммиак (водный раствор)", maxConcentration: 30, pp20: "A", pe20: "A", pvc20: "B", pp60: "A", pe60: "B", pvc60: "C" },

  { name: "Мочевина (карбамид)", maxConcentration: 50, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },

  { name: "Жиры и масла (растительные)", maxConcentration: 100, pp20: "A", pe20: "B", pvc20: "B", pp60: "B", pe60: "C", pvc60: "C" },
  { name: "Минеральные масла", maxConcentration: 100, pp20: "B", pe20: "C", pvc20: "X", pp60: "C", pe60: "X", pvc60: "X" },

  { name: "Дизельное топливо", maxConcentration: 100, pp20: "B", pe20: "C", pvc20: "X", pp60: "C", pe60: "X", pvc60: "X" },
  { name: "Бензин", maxConcentration: 100, pp20: "C", pe20: "X", pvc20: "X", pp60: "X", pe60: "X", pvc60: "X" },

  { name: "Молоко", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Пиво / вино", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },
  { name: "Сахарный раствор", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "A", pvc60: "A" },

  // ── Гальваника ──
  { name: "Хромовый ангидрид (CrO₃)", maxConcentration: 30, pp20: "B", pe20: "C", pvc20: "A", pp60: "C", pe60: "X", pvc60: "B" },
  { name: "Сульфаминовая кислота", maxConcentration: 20, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Цианид натрия (NaCN)", maxConcentration: 30, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
  { name: "Никелевый электролит (Уоттса)", maxConcentration: 100, pp20: "A", pe20: "A", pvc20: "A", pp60: "A", pe60: "B", pvc60: "B" },
];

/** Get unique substance names for autocomplete */
export function getSubstanceNames(): string[] {
  const names = new Set(chemicalDatabase.map((e) => e.name));
  return Array.from(names).sort((a, b) => a.localeCompare(b, "ru"));
}

/** Find the best matching entry for a substance, concentration, and temperature */
export function findCompatibility(
  substanceName: string,
  concentration: number,
  temperature: number
): { pp: Rating; pe: Rating; pvc: Rating } | null {
  // Find all entries for this substance
  const entries = chemicalDatabase
    .filter((e) => e.name === substanceName)
    .sort((a, b) => a.maxConcentration - b.maxConcentration);

  if (entries.length === 0) return null;

  // Pick the entry whose maxConcentration >= requested concentration
  // If none, pick the highest one available
  let entry = entries.find((e) => e.maxConcentration >= concentration);
  if (!entry) entry = entries[entries.length - 1];

  // Determine temperature bucket
  const useHigh = temperature > 20;
  const useExtraHigh = temperature > 60;

  let pp: Rating, pe: Rating, pvc: Rating;

  if (useHigh) {
    pp = entry.pp60;
    pe = entry.pe60;
    pvc = entry.pvc60;
  } else {
    pp = entry.pp20;
    pe = entry.pe20;
    pvc = entry.pvc20;
  }

  // Above 60 °C: degrade ratings by one step
  if (useExtraHigh) {
    pp = degradeRating(pp);
    pe = degradeRating(pe);
    pvc = degradeRating(pvc);
  }

  return { pp, pe, pvc };
}

function degradeRating(r: Rating): Rating {
  if (r === "A") return "B";
  if (r === "B") return "C";
  return "X";
}

export const ratingLabels: Record<Rating, string> = {
  A: "Отлично",
  B: "Хорошо",
  C: "Ограниченно",
  X: "Не рекомендуется",
};

export const ratingColors: Record<Rating, string> = {
  A: "text-green-600 bg-green-50 border-green-200",
  B: "text-blue-600 bg-blue-50 border-blue-200",
  C: "text-amber-600 bg-amber-50 border-amber-200",
  X: "text-red-600 bg-red-50 border-red-200",
};

/** Check if material is suitable (A or B rating) */
export function isSuitable(rating: Rating): boolean {
  return rating === "A" || rating === "B";
}

/** Material display info */
export const materialInfo = {
  pp: { name: "Полипропилен (PP)", tempRange: "от −20 °C до +100 °C" },
  pe: { name: "Полиэтилен (PE-HD)", tempRange: "от −50 °C до +60 °C" },
  pvc: { name: "ПВХ (PVC)", tempRange: "до +60 °C" },
} as const;
