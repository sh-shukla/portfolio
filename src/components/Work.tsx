import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { cn } from "@/lib/utils";
import { work, type Tile } from "@/content";

function TileCard({ t }: { t: Tile }) {
  const feature = t.tone === "feature";
  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-tile p-7 sm:p-10",
        feature && "bg-[#0a0a0a] text-white ring-1 ring-white/10 dark:bg-surface dark:ring-[#2997ff]/30",
        t.tone === "plain" && "card",
        t.tone === "tint" && "card bg-gradient-to-br from-[#eef4ff] via-white to-[#f3efff] dark:from-[#0f1c31] dark:via-surface dark:to-[#1b1530]",
      )}
    >
      {feature && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-60"
          style={{ background: "radial-gradient(closest-side, rgb(41 151 255 / 0.45), rgb(41 151 255 / 0))" }}
        />
      )}
      <p className={cn("relative text-[13px] font-medium", feature ? "text-white/60" : "text-faint")}>{t.company}</p>
      <h3 className={cn("relative mt-2 font-semibold tracking-tighter", t.wide ? "max-w-[22ch] text-[clamp(1.5rem,3vw,2.25rem)]" : "text-[1.5rem]", "leading-[1.12]")}>
        {t.title}
      </h3>
      <div className="relative mt-6">
        <p className={cn("font-semibold tracking-tightest tabular-nums", t.wide ? "text-[clamp(2.75rem,6vw,4.25rem)]" : "text-[2.75rem]", "leading-none")}>{t.metric}</p>
        <p className={cn("mt-2 text-[14px]", feature ? "text-white/60" : "text-faint")}>{t.metricLabel}</p>
      </div>
      <p className={cn("relative mt-6 text-[15px] leading-relaxed", feature ? "text-white/75" : "text-mute", t.wide && "max-w-[62ch]")}>{t.body}</p>
      <ul className="relative mt-auto flex flex-wrap gap-2 pt-8" aria-label="Tools">
        {t.tech.map((x) => (
          <li key={x} className={feature ? "chip-dark" : "chip"}>
            {x}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="container-page pt-20 sm:pt-28">
      <SectionHead title="Selected work" />
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {work.map((t, i) => (
          <Reveal key={t.title} delay={(i % 3) * 0.06} className={cn(t.wide && "md:col-span-2")}>
            <TileCard t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
