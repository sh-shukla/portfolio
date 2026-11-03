import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

type Props = { id: string; title: string; hideTitle?: boolean; children: ReactNode; className?: string };

// Each section opens with its shell path (~/work), echoing the terminal, then a large plain heading.
export default function Section({ id, title, hideTitle, children, className }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-12 py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="label" aria-hidden>
            ~/{id}
          </p>
          <h2 id={`${id}-title`} className={hideTitle ? "sr-only" : "mt-3 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tightest text-ink"}>
            {title}
          </h2>
        </Reveal>
        <div className={hideTitle ? "mt-8" : "mt-12 sm:mt-16"}>{children}</div>
      </div>
    </section>
  );
}
