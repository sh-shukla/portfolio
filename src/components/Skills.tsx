import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { certifications, education, skills } from "@/content";

export default function Skills() {
  return (
    <section id="skills" className="container-page pt-24 sm:pt-32">
      <SectionHead title="Skills" />

      <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 4) * 0.05}>
            <h3 className="border-t border-line pt-4 text-[16px] font-semibold tracking-snug">{s.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.items.map((x) => (
                <li key={x} className="chip">
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.short} delay={i * 0.06}>
            <article className="card flex h-full items-center gap-5 p-6">
              <img src={c.image} alt={`${c.name} badge`} width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
              <div>
                <p className="text-[13px] font-semibold text-link">Certification</p>
                <h3 className="mt-0.5 text-[16px] font-semibold leading-snug tracking-snug">{c.name}</h3>
                <p className="text-[14px] text-faint">{c.issuer}</p>
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.12}>
          <article className="card flex h-full flex-col justify-center p-6">
            <p className="text-[13px] font-semibold text-link">Education</p>
            <h3 className="mt-0.5 text-[16px] font-semibold leading-snug tracking-snug">{education.degree}</h3>
            <p className="text-[14px] text-faint">{education.school}</p>
            <p className="text-[14px] text-faint">
              {education.years} · {education.note}
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
