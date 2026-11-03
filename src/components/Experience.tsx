import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { cn } from "@/lib/utils";
import { experience, profile, type Role } from "@/content";

function RoleItem({ role, current }: { role: Role; current: boolean }) {
  return (
    <li className="relative pl-7">
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-[0.4em] h-[11px] w-[11px] rounded-full border-2 border-link",
          current ? "bg-link" : "bg-surface",
        )}
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-[19px] font-semibold tracking-snug">{role.title}</h4>
        <p className="text-[14px] tabular-nums text-faint">{role.dates}</p>
      </div>
      <ul className="mt-4 space-y-3">
        {role.points.map(([lead, rest]) => (
          <li key={lead} className="text-[15.5px] leading-relaxed text-mute">
            <span className="font-semibold text-ink">{lead}</span>
            {rest}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="container-page pt-24 sm:pt-32">
      <SectionHead
        title="Experience"
        action={
          <a href={profile.resume} target="_blank" rel="noreferrer" className="link text-[15px]">
            Full résumé (PDF) <ArrowUpRight size={16} aria-hidden />
          </a>
        }
      />
      <div className="mt-10 space-y-5">
        {experience.map((job) => (
          <Reveal key={job.company}>
            <article className="card grid gap-8 p-7 sm:p-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
              <header className="lg:sticky lg:top-24 lg:self-start">
                <h3 className="text-[1.75rem] font-semibold tracking-tighter">{job.company}</h3>
                <p className="mt-1 text-[15px] text-mute">{job.summary}</p>
                <p className="mt-3 text-[14px] tabular-nums text-faint">
                  {job.period} · {job.location}
                </p>
              </header>
              <ol
                className={cn(
                  "relative space-y-10",
                  // Timeline rail joining the roles at one company.
                  job.roles.length > 1 && "before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-line",
                )}
              >
                {job.roles.map((r, i) => (
                  <RoleItem key={r.title + r.dates} role={r} current={i === 0 && r.dates.endsWith("Present")} />
                ))}
              </ol>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
