import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" };
type Phase = "static" | "waiting" | "shown";

// Progressive reveal: content is visible by default. Only elements that start below the fold
// are hidden on mount, then fade up when they scroll into view. No JS, reduced motion, or
// crawlers: everything simply renders.
export default function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setPhase("waiting");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined = phase === "shown" ? { transitionDelay: `${delay}s` } : undefined;
  const cls = cn(
    phase !== "static" && "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    phase === "waiting" && "translate-y-7 opacity-0",
    phase === "shown" && "translate-y-0 opacity-100",
    className,
  );
  const Tag = as;
  return (
    <Tag ref={ref as never} className={cls} style={style}>
      {children}
    </Tag>
  );
}
