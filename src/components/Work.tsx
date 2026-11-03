import Reveal from "./Reveal";
import { cn } from "@/lib/utils";
import { work, type Tile } from "@/content";

function TileCard({ t }: { t: Tile }) {
  const dark = t.tone === "dark";
  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-tile p-8 sm:p-10",
        dark && "bg-black text-white",
        t.tone === "light" && "bg-white shadow-tile",
        t.tone === "tint" && "bg-gradient-to-br from-[#eef4ff] via-white to-[#f3efff] shadow-tile",
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-60"
          style={{ background: "radial-gradient(closest-side, rgba(41,151,255,0.45), rgba(41,151,255,0))" }}
        />
      )}
      <p className={cn("text-[14px] font-semibold", dark ? "text-accent-bright" : "text-accent")}>{t.eyebrow}</p>
      <h3 className={cn("mt-2 font-semibold tracking-tighter leading-[1.1]", t.wide ? "text-[clamp(1.6rem,3vw,2.4rem)] max-w-[22ch]" : "text-[1.6rem]")}>
        {t.title}
      </h3>
      <div className="mt-6">
        <p className={cn("font-semibold tracking-tightest leading-none", t.wide ? "text-[clamp(3rem,6vw,4.5rem)]" : "text-[3rem]")}>{t.metric}</p>
        <p className={cn("mt-2 text-[14px]", dark ? "text-white/60" : "text-faint")}>{t.metricLabel}</p>
      </div>
      <p className={cn("mt-6 text-[15px] leading-relaxed", dark ? "text-white/75" : "text-mute", t.wide && "max-w-[62ch]")}>{t.body}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-8">
        {t.tech.map((x) => (
          <li key={x} className={dark ? "chip-dark" : "chip"}>
            {x}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="container-page pt-28 sm:pt-40">
      <Reveal className="max-w-copy">
        <p className="eyebrow">Selected work</p>
        <h2 className="headline-lg mt-2">Software that runs the infrastructure.</h2>
        <p className="lede mt-4">The systems I designed and built, and what they changed.</p>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {work.map((t, i) => (
          <Reveal key={t.title} delay={(i % 3) * 0.06} className={cn(t.wide && "md:col-span-2")}>
            <TileCard t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
