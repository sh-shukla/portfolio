import type { ReactNode } from "react";
import type { SectionId } from "@/lib/sections";

type Props = { id: SectionId; title: string; children: ReactNode };

// On phones the heading sticks under the top bar, so you always know where you are.
export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mb-24 scroll-mt-14 sm:mb-32 lg:mb-36 lg:scroll-mt-20">
      <div className="sticky top-14 z-20 -mx-5 mb-6 bg-canvas/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:mb-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <h2 id={`${id}-title`} className="flex items-center gap-4 font-mono text-[12px] font-medium uppercase tracking-label text-ink">
          {title}
          <span aria-hidden className="h-px flex-1 bg-line" />
        </h2>
      </div>
      {children}
    </section>
  );
}
