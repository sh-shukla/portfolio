import Reveal from "./Reveal";
import { stats } from "@/content";

export default function Stats() {
  return (
    <section aria-label="Highlights" className="container-page pt-24 sm:pt-32">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line/70 pt-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal as="li" key={s.label} delay={i * 0.06}>
            <p className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold tracking-tighter text-ink">{s.value}</p>
            <p className="mt-2 text-[15px] leading-snug text-ink/85">{s.label}</p>
            <p className="mt-1 text-[13px] text-faint">{s.note}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
