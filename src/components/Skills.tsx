import Reveal from "./Reveal";
import { certifications, education, skills } from "@/content";

export default function Skills() {
  return (
    <section id="skills" className="container-page py-24 sm:py-32">
      <Reveal className="max-w-copy">
        <p className="eyebrow">Toolkit</p>
        <h2 className="headline-lg mt-2">The stack behind the work.</h2>
      </Reveal>

      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.05}>
            <h3 className="border-t border-line/70 pt-5 text-[17px] font-semibold tracking-snug">{s.group}</h3>
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

      <div className="mt-20 grid gap-5 md:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.short} delay={i * 0.06}>
            <article className="flex h-full items-center gap-5 rounded-tile bg-white p-6 shadow-tile">
              <img src={c.image} alt={`${c.name} badge`} width={72} height={72} loading="lazy" className="h-[72px] w-[72px] rounded-2xl object-cover" />
              <div>
                <p className="text-[13px] font-semibold text-accent">Certified</p>
                <h3 className="text-[17px] font-semibold leading-snug tracking-snug">{c.name}</h3>
                <p className="text-[14px] text-faint">{c.issuer}</p>
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.12}>
          <article className="flex h-full flex-col justify-center rounded-tile bg-white p-6 shadow-tile">
            <p className="text-[13px] font-semibold text-accent">Education</p>
            <h3 className="text-[17px] font-semibold leading-snug tracking-snug">{education.degree}</h3>
            <p className="text-[14px] text-faint">
              {education.school} · {education.years} · {education.note}
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
