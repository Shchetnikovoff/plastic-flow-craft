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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left — features */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Наши преимущества
            </h3>
            <div className="space-y-3">
              {features.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 mt-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-slate-700 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — applications */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              {applicationsTitle}
            </h3>
            <div className="space-y-3">
              {applications.map((app) => {
                const Icon = app.icon;
                return (
                  <div key={app.name} className="flex items-center gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900">
                      <Icon className="h-3 w-3 text-amber-400" />
                    </div>
                    <span className="text-sm text-slate-700 leading-snug">{app.name}</span>
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
