import { type ReactNode } from "react";

export interface CharCell {
  label: string;
  value: ReactNode;
}

interface CharacteristicsGridProps {
  cells: CharCell[];
}

const CharacteristicsGrid = ({ cells }: CharacteristicsGridProps) => (
  <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
    {cells.map((cell, i) => (
      <div key={cell.label} className={`bg-card p-3 ${i >= 2 ? "border-t" : ""}`}>
        <span className="block text-xs text-muted-foreground">{cell.label}</span>
        <span className="text-sm font-semibold text-foreground">{cell.value}</span>
      </div>
    ))}
  </div>
);

export default CharacteristicsGrid;
