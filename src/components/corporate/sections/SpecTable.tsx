interface SpecTableProps {
  title: string;
  subtitle?: string;
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}

export default function SpecTable({ title, subtitle, headers, rows, caption }: SpecTableProps) {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle && (
          <p data-testid="section-subtitle" className="mt-2 text-slate-500 text-lg">
            {subtitle}
          </p>
        )}

        <div className="mt-10 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold text-slate-700 border-b border-slate-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-slate-100 hover:bg-amber-50/50 transition-colors ${
                    i % 2 === 1 ? "bg-slate-50/50" : ""
                  }`}
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {caption && (
          <p className="mt-3 text-xs text-slate-400">{caption}</p>
        )}
      </div>
    </section>
  );
}
