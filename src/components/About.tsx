import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Reveal from "./Reveal";
import Section from "./Section";
import { about, profile, stats } from "@/content";
import { clamp, useReducedMotion, useScrollFrame, useSeen } from "@/lib/motion";

// The About copy, word by word: each word lights up as the paragraph scrolls past.
function ScrubText() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const words = about.map((p) => p.split(" "));
  const total = words.reduce((n, w) => n + w.length, 0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the top reaches 85% of the screen, 1 when the bottom reaches 60%.
    const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.25));
    el.style.setProperty("--p", p.toFixed(3));
  }, []);
  useScrollFrame(update, !reduce);

  let i = 0;
  return (
    <div ref={ref} style={{ "--n": total } as CSSProperties} className="space-y-6">
      {words.map((ws, pi) => (
        <p key={pi} className="text-[clamp(1.375rem,2.6vw,2.125rem)] font-semibold leading-[1.28] tracking-tighter text-ink">
          {ws.map((w, wi) => (
            <span key={wi} className={reduce ? undefined : "scrub-word"} style={{ "--i": i++ } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

// "270+" counts up from 0 when it first comes into view. Screen readers get the final value.
function Count({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useSeen(ref, 0.6);
  const reduce = useReducedMotion();
  const [, prefix = "", num = "", suffix = ""] = value.match(/^(\D*)(\d+)(.*)$/) ?? [];
  const target = Number(num);
  const [n, setN] = useState(reduce || !num ? target : 0);

  useEffect(() => {
    if (!seen || reduce || !num) return setN(target);
    let frame = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const k = clamp((t - start) / 1200);
      setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, reduce, num, target]);

  return (
    <span ref={ref}>
      <span aria-hidden>{num ? `${prefix}${n}${suffix}` : value}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

export default function About() {
  return (
    <Section id="about" title="About" hideTitle>
      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <figure className="relative w-full max-w-[260px] overflow-hidden rounded-[28px] bg-panel">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={520}
              height={520}
              loading="lazy"
              className="aspect-square w-full object-cover object-[50%_30%]"
            />
            {profile.openTo.length > 0 && (
              <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur-md">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
                Open to work
              </figcaption>
            )}
          </figure>
        </Reveal>
        <ScrubText />
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 lg:grid-cols-4 lg:gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="card flex flex-col p-6 sm:p-7">
            <dt className="mt-2 text-[15px] leading-snug">{s.label}</dt>
            <dd className="grad-text order-first text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-tightest tabular-nums">
              <Count value={s.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
