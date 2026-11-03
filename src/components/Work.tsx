import Reveal from "./Reveal";
import Section from "./Section";
import { work } from "@/content";

export default function Work() {
  return (
    <Section id="work" title="Selected work">
      <ol className="group/list space-y-10 lg:space-y-2">
        {work.map((t) => (
          <Reveal as="li" key={t.title}>
            <article className="row">
              <div>
                <p className="whitespace-nowrap text-[26px] font-semibold leading-none tracking-tighter text-accent tabular-nums">{t.metric}</p>
                <p className="mt-2 text-[13px] sm:max-w-[24ch] leading-snug text-faint">{t.metricLabel}</p>
              </div>
              <div>
                <p className="label">{t.company}</p>
                <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-snug text-ink">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{t.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools">
                  {t.tech.map((x) => (
                    <li key={x} className="pill">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
