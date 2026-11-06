import { useRef, type CSSProperties, type PointerEvent } from "react";
import { Check, CircleCheck } from "lucide-react";
import Chip from "./Chip";
import Reveal from "./Reveal";
import Section from "./Section";
import { work } from "@/content";
import { cn } from "@/lib/utils";
import { useSeen } from "@/lib/motion";

// Bento layout on large screens: the first project is the big tile.
const spans = ["md:col-span-2 lg:col-span-4 lg:row-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3"];

// A CI-style run: each step ticks green in turn once the card is on screen.
function Pipeline({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const run = useSeen(ref, 0.5);
  return (
    <ol ref={ref} aria-label="Pipeline steps" className={cn("pipeline mt-8 grid gap-2 sm:flex sm:gap-0", run && "run")}>
      {steps.map((s, i) => (
        <li key={s} style={{ "--i": i } as CSSProperties} className="flex items-center gap-3 sm:flex-1 sm:flex-col sm:gap-2.5 sm:text-center">
          <span className="flex items-center sm:w-full">
            <span aria-hidden className={cn("stage-link l relative hidden h-0.5 flex-1 rounded-full bg-line sm:block", i === 0 && "invisible")} />
            <span aria-hidden className="stage-dot flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 sm:h-8 sm:w-8">
              <Check size={16} strokeWidth={3} />
            </span>
            <span aria-hidden className={cn("stage-link r relative hidden h-0.5 flex-1 rounded-full bg-line sm:block", i === steps.length - 1 && "invisible")} />
          </span>
          <span className="text-[13px] font-medium leading-tight text-ink">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Work() {
  const grid = useRef<HTMLDivElement>(null);

  // Feed the pointer position to every card so the border light can follow it across the grid.
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    for (const card of grid.current?.querySelectorAll<HTMLElement>(".glow-card") ?? []) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
  }

  return (
    <Section id="work" title="Selected work">
      <div ref={grid} onPointerMove={onPointerMove} className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {work.map((t, i) => {
          const big = i === 0;
          return (
            <Reveal key={t.title} delay={big ? 0 : (i % 3) * 0.06} className={cn("glow-card card", spans[i])}>
              <article className={cn("flex h-full flex-col p-6 sm:p-8", big && "lg:p-10")}>
                <p className="label text-faint">{t.company}</p>
                <p className={cn("grad-text mt-5 w-fit pb-1 font-semibold leading-none tracking-tightest", big ? "text-[clamp(3.5rem,7vw,5.5rem)]" : "text-[44px]")}>
                  {t.metric}
                </p>
                <p className="mt-1.5 text-[14px] text-faint">{t.metricLabel}</p>
                <h3 className={cn("mt-6 font-semibold tracking-snug text-ink", big ? "text-[clamp(1.375rem,2.2vw,1.75rem)]" : "text-[19px]")}>{t.title}</h3>
                <p className={cn("mt-2 leading-relaxed", big ? "max-w-[56ch] text-[16px]" : "text-[15px]")}>{t.body}</p>
                {t.steps && <Pipeline steps={t.steps} />}
                {t.points && (
                  <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-line pt-7 md:grid-cols-2">
                    {t.points.map((x) => (
                      <li key={x} className="flex gap-2.5 text-[14.5px] leading-snug">
                        <CircleCheck size={17} aria-hidden className="mt-px shrink-0 text-accent" />
                        {x}
                      </li>
                    ))}
                  </ul>
                )}
                {t.facts && (
                  <dl className="mt-7 grid gap-2 sm:grid-cols-3 sm:gap-3">
                    {t.facts.map((f) => (
                      <div key={f.label} className="flex items-baseline gap-2.5 rounded-2xl bg-canvas/70 px-4 py-3 sm:flex-col sm:items-start sm:gap-0 sm:py-3.5">
                        <dt className="text-[12.5px] leading-snug text-faint sm:mt-1">{f.label}</dt>
                        <dd className="order-first text-[clamp(1.125rem,1.8vw,1.5rem)] font-semibold tracking-tighter text-ink">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <ul aria-label="Tools" className="mt-auto flex flex-wrap gap-1.5 pt-7">
                  {t.tech.map((x) => (
                    <Chip key={x} name={x} />
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
