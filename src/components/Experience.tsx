import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import Section from "./Section";
import { experience, profile } from "@/content";

// One row per role, newest first. A single-role job shows its team; multi-role jobs show the location.
const rows = experience.flatMap((job) =>
  job.roles.map((role) => ({ job, role, meta: job.roles.length === 1 ? `${job.summary} · ${job.location}` : job.location })),
);

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="group/list space-y-12 lg:space-y-2">
        {rows.map(({ job, role, meta }) => (
          <Reveal as="li" key={`${job.company}-${role.title}`}>
            <article className="row">
              {/* Keep "Apr 2024" together so a wrap only happens around the dash. */}
              <p className="label pt-1 leading-relaxed">{role.dates.replace(/ (\d{4})/g, "\u00a0$1")}</p>
              <div>
                <h3 className="text-[17px] font-semibold leading-snug tracking-snug text-ink">
                  {role.title} <span className="font-normal text-faint">·</span> {job.company}
                </h3>
                <p className="mt-1 text-[14px] text-faint">{meta}</p>
                <ul className="mt-4 space-y-2.5">
                  {role.points.map(([lead, rest]) => (
                    <li
                      key={lead}
                      className="relative pl-5 text-[15px] leading-relaxed before:absolute before:left-0 before:top-[0.72em] before:h-0.5 before:w-2 before:rounded-full before:bg-accent"
                    >
                      <span className="font-medium text-ink">{lead}</span>
                      {rest}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
      <Reveal>
        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          className="group mt-12 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink"
        >
          <span className="border-b border-line pb-0.5 transition-colors group-hover:border-accent">View full résumé</span>
          <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </Section>
  );
}
