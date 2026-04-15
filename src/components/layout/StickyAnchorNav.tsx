import { useState, useEffect, useRef } from "react";
import ContentContainer from "./ContentContainer";

interface Section {
  id: string;
  label: string;
}

interface StickyAnchorNavProps {
  sections: Section[];
}

export default function StickyAnchorNav({ sections }: StickyAnchorNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0.1 }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-[6rem] z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <ContentContainer wide>
        <nav className="flex flex-wrap gap-1.5 py-2.5 -mx-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                activeId === s.id
                  ? "bg-amber-500 text-slate-900 shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </ContentContainer>
    </div>
  );
}
