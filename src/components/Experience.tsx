import Reveal from "./Reveal";
import { experience } from "@/content";

export default function Experience() {
  return (
    <section id="experience" className="mt-28 bg-mist py-24 sm:mt-40 sm:py-32">
      <div className="container-page">
        <Reveal className="max-w-copy">
          <p className="eyebrow">Experience</p>
          <h2 className="headline-lg mt-2">Five years. Two companies. One habit: automate it.</h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          {experience.map((job) => (
            <Reveal key={job.company}>
              <article className="rounded-tile bg-white p-8 shadow-tile sm:p-12">
                <header className="grid gap-2 border-b border-line/60 pb-8 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <h3 className="text-[2rem] font-semibold tracking-tighter">{job.company}</h3>
                    <p className="mt-1 text-[17px] text-mute">{job.summary}</p>
                  </div>
                  <p className="text-[15px] text-faint md:text-right">
                    {job.period} · {job.location}
                  </p>
                </header>

                <div className="mt-8 space-y-10">
                  {job.roles.map((r) => (
                    <div key={r.title + r.dates} className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
                      <div>
                        <p className="text-[17px] font-semibold tracking-snug">{r.title}</p>
                        <p className="mt-1 text-[14px] text-faint">{r.dates}</p>
                      </div>
                      <ul className="space-y-3">
                        {r.points.map((p) => (
                          <li key={p} className="relative pl-5 text-[16px] leading-relaxed text-ink/85">
                            <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
