import { Badge } from "@/components/ui/badge";

interface SelectorBadgesProps {
  label: string;
  options: { id: string; title: string }[];
  selected: string;
  onChange: (id: string) => void;
}

const SelectorBadges = ({ label, options, selected, onChange }: SelectorBadgesProps) => (
  <div className="mb-8">
    <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">{label}</h2>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Badge
          key={opt.id}
          variant="outline"
          className={`rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
            selected === opt.id
              ? "border-primary text-primary bg-primary/5"
              : "hover:border-primary/50 hover:text-primary/80"
          }`}
          onClick={() => onChange(opt.id)}
        >
          {opt.title}
        </Badge>
      ))}
    </div>
  </div>
);

export default SelectorBadges;
