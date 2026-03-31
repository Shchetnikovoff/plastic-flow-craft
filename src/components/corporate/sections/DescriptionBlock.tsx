import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DescriptionBlockProps {
  title: string;
  subtitle?: string;
  features: string[];
  applicationsTitle?: string;
  applications: { icon: LucideIcon; name: string }[];
}

export default function DescriptionBlock({
  title,
  subtitle,
  features,
  applicationsTitle = "Назначение",
  applications,
}: DescriptionBlockProps) {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm text-slate-500 max-w-[700px]">{subtitle}</p>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left — features checklist */}
          <div className="space-y-2.5">
            {features.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          {/* Right — applications */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              {applicationsTitle}
            </h3>
            <div className="space-y-2">
              {applications.map((app) => {
                const Icon = app.icon;
                return (
                  <div key={app.name} className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100">
                      <Icon className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-sm text-slate-600">{app.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
