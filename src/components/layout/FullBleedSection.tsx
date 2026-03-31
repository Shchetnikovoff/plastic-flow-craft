import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ContentContainer from "./ContentContainer";

interface FullBleedSectionProps {
  children: React.ReactNode;
  /** Classes for the outer full-width wrapper (bg-*, py-*, border-*) */
  className?: string;
  /** Classes for the inner ContentContainer */
  innerClassName?: string;
  id?: string;
  wide?: boolean;
  narrow?: boolean;
  /** Disable scroll-reveal animation */
  noAnimate?: boolean;
}

/** Full-width background section with constrained inner content and scroll-reveal */
export default function FullBleedSection({
  children,
  className,
  innerClassName,
  id,
  wide,
  narrow,
  noAnimate,
}: FullBleedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (noAnimate) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [noAnimate]);

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "scroll-mt-40 transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      <ContentContainer wide={wide} narrow={narrow} className={innerClassName}>
        {children}
      </ContentContainer>
    </section>
  );
}
