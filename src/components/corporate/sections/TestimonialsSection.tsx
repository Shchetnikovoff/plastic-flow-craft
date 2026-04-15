import TestimonialCarousel from "@/components/corporate/TestimonialCarousel";

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
}

export default function TestimonialsSection({
  title = "Отзывы клиентов",
  subtitle = "Нам доверяют предприятия по всей России",
}: TestimonialsSectionProps) {
  return (
    <section className="w-full bg-slate-900 overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <p className="mt-2 text-slate-400 text-lg">{subtitle}</p>
        <div className="mt-10">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}
