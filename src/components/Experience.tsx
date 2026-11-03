import { useCallback, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Chip from "./Chip";
import Reveal from "./Reveal";
import Section from "./Section";
import { experience, profile } from "@/content";
import { clamp, useReducedMotion, useScrollFrame } from "@/lib/motion";

// "Jun 2025" stays on one line.
const nb = (s: string) => s.replace(/ (\d{4})/g, " $1");

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The rail fills as the timeline passes the middle of the screen.
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--tp", clamp((window.innerHeight * 0.6 - r.top) / r.height).toFixed(3));
  }, []);
  useScrollFrame(update, !reduce);

  return (
    <Section id="experience" title="Experience">
      <div ref={ref} className="relative">
        <div aria-hidden className="absolute bottom-3 left-[7px] top-3 w-0.5 overflow-hidden rounded-full bg-line">
          <div className="rail-fill h-full w-full bg-gradient-to-b from-[rgb(var(--g1))] via-[rgb(var(--g2))] to-[rgb(var(--g3))]" />
        </div>

        <ol className="space-y-6 sm:space-y-8">
          {experience.map((job) => (
            <li key={job.company} className="relative pl-9 sm:pl-12">
              <span aria-hidden className="absolute left-0 top-9 h-4 w-4 rounded-full border-[3px] border-accent bg-canvas sm:top-11" />
              <Reveal className="card p-6 sm:p-10">
                <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tighter text-ink">{job.company}</h3>
                  <p className="font-mono text-[13px] text-faint">{nb(job.period)}</p>
                </header>
                <p className="mt-1 text-[15px]">{job.summary}</p>

                <div className="mt-8 space-y-9">
                  {job.roles.map((role) => (
                    <div key={role.title}>
                      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="text-[18px] font-semibold tracking-snug text-ink">{role.title}</h4>
                        {job.roles.length > 1 && <p className="font-mono text-[12.5px] text-faint">{nb(role.dates)}</p>}
                      </div>
                      <ul className="space-y-2.5">
                        {role.points.map(([lead, rest]) => (
                          <li
                            key={lead}
                            className="relative pl-5 text-[15.5px] leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
                          >
                            <span className="font-medium text-ink">{lead}</span>
                            {rest}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <ul aria-label="Tools" className="mt-8 flex flex-wrap gap-1.5 border-t border-line pt-6">
                  {job.stack.map((x) => (
                    <Chip key={x} name={x} />
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-8 pl-9 sm:pl-12">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-[17px] font-medium text-accent">
            <span className="group-hover:underline">View full resume</span>
            <ArrowUpRight size={17} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
