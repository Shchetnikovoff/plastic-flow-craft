import { Phone, Mail, ArrowRight } from "lucide-react";
import ContentContainer from "@/components/layout/ContentContainer";

interface Props {
  title?: string;
  subtitle?: string;
}

/** Dark CTA section — no form, just contact info */
export default function DarkCTAForm({
  title = "Готовы обсудить проект?",
  subtitle = "Звоните или пишите — инженер ответит в течение часа",
}: Props) {
  return (
    <section id="cta-form" className="scroll-mt-40 bg-slate-900 py-12 md:py-16">
      <ContentContainer className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-slate-400 text-sm mt-2">{subtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="tel:+78122426006" className="flex items-center gap-2 text-white text-lg font-semibold hover:text-amber-400 transition-colors">
            <Phone className="h-5 w-5" /> +7 (812) 242-60-06
          </a>
          <a
            href="mailto:info@plast-metall.pro"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-3 text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            <Mail className="h-4 w-4" />
            Написать на почту
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </ContentContainer>
    </section>
  );
}
