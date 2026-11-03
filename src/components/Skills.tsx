import Reveal from "./Reveal";
import Section from "./Section";
import { certifications, education, skills } from "@/content";

const grid = "grid gap-3 sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-8";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-7">
        {skills.map((s) => (
          <Reveal key={s.group} className={grid}>
            <dt className="label pt-1 leading-relaxed">{s.group}</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {s.items.map((x) => (
                  <li key={x} className="tag">
                    {x}
                  </li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>

      <Reveal className={`${grid} mt-14 border-t border-line pt-10`}>
        <h3 className="label pt-1">Certified</h3>
        <ul className="grid gap-5">
          {certifications.map((c) => (
            <li key={c.short} className="flex items-center gap-4">
              <img src={c.image} alt={`${c.name} badge`} width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
              <div>
                <p className="text-[15px] font-medium leading-snug text-ink">{c.name}</p>
                <p className="mt-0.5 text-[13px] text-faint">{c.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className={`${grid} mt-10`}>
        <h3 className="label pt-1">Education</h3>
        <div>
          <p className="text-[15px] font-medium leading-snug text-ink">{education.degree}</p>
          <p className="mt-0.5 text-[14px]">{education.school}</p>
          <p className="mt-0.5 text-[13px] text-faint">
            {education.years} · {education.note}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
