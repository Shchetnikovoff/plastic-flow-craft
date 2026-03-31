import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentContainer from "@/components/layout/ContentContainer";

interface Props {
  text?: string;
}

export default function MidPageCTA({ text = "Нужна консультация по подбору оборудования?" }: Props) {
  return (
    <section className="bg-slate-900 py-8">
      <ContentContainer className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white text-sm sm:text-base font-medium">{text}</div>
        <div className="flex items-center gap-4">
          <a href="tel:+78122426006" className="text-slate-300 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
            <Phone className="h-4 w-4" /> +7 (812) 242-60-06
          </a>
          <Button
            onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-6"
          >
            Оставить заявку
          </Button>
        </div>
      </ContentContainer>
    </section>
  );
}
