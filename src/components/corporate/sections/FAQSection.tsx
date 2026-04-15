import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQSection({
  title = "Частые вопросы",
  subtitle,
  items,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[680px] px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-slate-500 text-lg text-center">{subtitle}</p>
        )}

        <div className="mt-10 space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="rounded-lg border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  {item.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  data-state={isOpen ? "open" : "closed"}
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
