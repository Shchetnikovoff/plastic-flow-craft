import type { ReactNode } from "react";

interface DarkInfoBlockProps {
  title: string;
  text: string;
  highlights?: { value: string; label: string }[];
  children?: ReactNode;
}

export default function DarkInfoBlock({ title, text, highlights, children }: DarkInfoBlockProps) {
  return (
    <section className="w-full bg-slate-900 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">{text}</p>

        {highlights && highlights.length > 0 && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <div className="text-2xl font-bold text-amber-400">{h.value}</div>
                <div className="mt-1 text-sm text-slate-400">{h.label}</div>
              </div>
            ))}
          </div>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
