import Reveal from "./Reveal";
import Section from "./Section";
import { about, stats } from "@/content";

export default function About() {
  return (
    <Section id="about" title="About">
      <Reveal className="space-y-4 text-[16px] leading-relaxed">
        {about.map((p) => (
          <p key={p} className="text-pretty">
            {p}
          </p>
        ))}
      </Reveal>
      <Reveal delay={0.08}>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col bg-canvas p-5">
              <dt className="mt-2 text-[13px] leading-snug text-faint">{s.label}</dt>
              <dd className="order-first text-[28px] font-semibold leading-none tracking-tighter text-ink tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
