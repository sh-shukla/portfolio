import { Download, Github, Linkedin, Mail } from "lucide-react";
import { glance, profile } from "@/content";

const d = (s: number) => ({ animationDelay: `${s}s` });

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-28 sm:pt-36 lg:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[560px] w-[900px] opacity-60 dark:opacity-40"
        style={{ background: "radial-gradient(closest-side, rgb(0 113 227 / 0.12), rgb(0 113 227 / 0))" }}
      />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div>
          <h1 style={d(0.05)} className="animate-rise headline-xl">
            {profile.name}
          </h1>
          <p style={d(0.12)} className="animate-rise mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tighter text-faint">
            {profile.title}
          </p>
          <p style={d(0.2)} className="animate-rise lede mt-6 max-w-[40ch] text-pretty">
            {profile.intro}
          </p>
          <div style={d(0.28)} className="animate-rise mt-9 flex flex-wrap items-center gap-3">
            <a href={profile.resume} download={profile.resumeDownloadName} className="btn-primary">
              <Download size={17} aria-hidden /> Download résumé
            </a>
            <a href={`mailto:${profile.email}`} className="btn-secondary">
              <Mail size={17} aria-hidden /> Email me
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="btn-icon">
              <Linkedin size={18} aria-hidden />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="btn-icon">
              <Github size={18} aria-hidden />
            </a>
          </div>
        </div>

        <aside style={d(0.34)} aria-label="At a glance" className="animate-rise card p-6 sm:p-7">
          <div className="flex items-center gap-4">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={60}
              height={60}
              className="h-[60px] w-[60px] shrink-0 rounded-full object-cover object-[50%_25%]"
            />
            <div className="min-w-0">
              <p className="text-[16px] font-semibold tracking-snug">{profile.location}</p>
              {profile.availability && (
                <p className="mt-0.5 flex items-start gap-2 text-[14px] leading-snug text-ok">
                  <span aria-hidden className="mt-[0.4em] h-2 w-2 shrink-0 rounded-full bg-current" />
                  {profile.availability}
                </p>
              )}
            </div>
          </div>
          <dl className="mt-6 divide-y divide-line/70 border-t border-line/70">
            {glance.map((r) => (
              <div key={r.label} className="grid grid-cols-[88px_1fr] gap-4 py-3">
                <dt className="text-[14px] text-faint">{r.label}</dt>
                <dd className="text-[15px] leading-snug">{r.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
