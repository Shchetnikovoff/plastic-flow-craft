import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import PageFooter from "@/components/PageFooter";
import ChemicalSelector from "@/components/ChemicalSelector";
import {
  chemicalDatabase,
  ratingLabels,
  ratingColors,
  type Rating,
  type ChemicalEntry,
} from "@/data/chemicalResistance";

const RatingCell = ({ rating }: { rating: Rating }) => (
  <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium border ${ratingColors[rating]}`}>
    {rating} — {ratingLabels[rating]}
  </span>
);

const ChemicalResistancePageInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [tempFilter, setTempFilter] = useState<"20" | "60">("20");

  // Deduplicate and group by substance name
  const grouped = useMemo(() => {
    const map = new Map<string, ChemicalEntry[]>();
    for (const entry of chemicalDatabase) {
      const existing = map.get(entry.name) || [];
      existing.push(entry);
      map.set(entry.name, existing);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], "ru"));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return grouped;
    const q = search.toLowerCase();
    return grouped.filter(([name]) => name.toLowerCase().includes(q));
  }, [grouped, search]);

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>База знаний — Химическая стойкость</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-8">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            База знаний: Химическая стойкость материалов
          </h1>
          <p className="text-sm text-muted-foreground">
            Справочник для инженеров по подбору материалов (PP, PE, PVC) для работы с агрессивными средами.
            Интерактивный калькулятор и полная таблица совместимости.
          </p>
        </section>

        <Tabs defaultValue="calculator" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Калькулятор подбора</TabsTrigger>
            <TabsTrigger value="table">Полная таблица</TabsTrigger>
          </TabsList>

          {/* Tab 1: Interactive calculator */}
          <TabsContent value="calculator" className="mt-4">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <ChemicalSelector />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Full reference table */}
          <TabsContent value="table" className="mt-4 space-y-4">
            {/* Search + temp filter */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск по названию вещества..."
                  className="pl-8 text-sm"
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Температура:</span>
                <button
                  onClick={() => setTempFilter("20")}
                  className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                    tempFilter === "20" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  ≤ 20 °C
                </button>
                <button
                  onClick={() => setTempFilter("60")}
                  className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                    tempFilter === "60" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  ≤ 60 °C
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Найдено веществ: {filtered.length} из {grouped.length}
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-2">
              {(["A", "B", "C", "X"] as Rating[]).map((r) => (
                <span key={r} className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium ${ratingColors[r]}`}>
                  {r} — {ratingLabels[r]}
                </span>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-3 py-2 text-xs font-semibold text-foreground">Вещество</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-foreground w-20">Конц., %</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-foreground">PP</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-foreground">PE</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-foreground">PVC</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(([name, entries]) =>
                    entries.map((entry, idx) => (
                      <tr
                        key={`${name}-${entry.maxConcentration}`}
                        className={idx % 2 === 0 ? "bg-card" : "bg-muted/10"}
                      >
                        {idx === 0 ? (
                          <td
                            className="px-3 py-1.5 text-xs text-foreground font-medium align-top"
                            rowSpan={entries.length}
                          >
                            {name}
                          </td>
                        ) : null}
                        <td className="px-3 py-1.5 text-xs text-center text-muted-foreground">
                          до {entry.maxConcentration}%
                        </td>
                        <td className="px-3 py-1.5 text-center">
                          <RatingCell rating={tempFilter === "20" ? entry.pp20 : entry.pp60} />
                        </td>
                        <td className="px-3 py-1.5 text-center">
                          <RatingCell rating={tempFilter === "20" ? entry.pe20 : entry.pe60} />
                        </td>
                        <td className="px-3 py-1.5 text-center">
                          <RatingCell rating={tempFilter === "20" ? entry.pvc20 : entry.pvc60} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <PageFooter />
      </main>
    </>
  );
};

const ChemicalResistancePage = () => (
  <CartProvider>
    <ChemicalResistancePageInner />
  </CartProvider>
);

export default ChemicalResistancePage;
