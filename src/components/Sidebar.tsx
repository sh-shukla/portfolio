import { Fragment } from "react";
import { Download, Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { sections, type SectionId } from "@/lib/sections";
import type { Theme } from "@/lib/theme";
import { profile } from "@/content";

type Props = { active: SectionId | null; theme: Theme; onToggleTheme: () => void };

const d = (s: number) => ({ animationDelay: `${s}s` });

// "**word**" in content renders highlighted, so the key terms stand out when skimming.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-medium text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

// Photo with an accent ring that draws itself in once on load.
function Portrait() {
  return (
    <div className="relative h-20 w-20 shrink-0 lg:[@media(max-height:800px)]:h-16 lg:[@media(max-height:800px)]:w-16 lg:[@media(max-height:640px)]:hidden">
      <svg aria-hidden viewBox="0 0 100 100" className="absolute -left-[5px] -top-[5px] h-[calc(100%+10px)] w-[calc(100%+10px)] -rotate-90">
        <defs>
          <linearGradient id="portrait-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "rgb(var(--accent))" }} />
            <stop offset="1" style={{ stopColor: "rgb(var(--accent))", stopOpacity: 0.25 }} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48.5" pathLength={1} stroke="url(#portrait-ring)" className="ring-draw" />
      </svg>
      <img
        src={profile.photo}
        alt={`Portrait of ${profile.name}`}
        width={80}
        height={80}
        className="relative h-full w-full rounded-full object-cover object-[50%_25%]"
      />
    </div>
  );
}

export default function Sidebar({ active, theme, onToggleTheme }: Props) {
  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="pt-24 sm:pt-28 lg:sticky lg:top-0 lg:-mx-3 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:overflow-y-auto lg:px-3 lg:pb-12 lg:pt-16 lg:[@media(max-height:800px)]:pt-12 lg:[@media(max-height:640px)]:pb-6 lg:[@media(max-height:640px)]:pt-10">
      <div>
        <div style={d(0)} className="animate-rise flex items-center gap-5">
          <Portrait />
          {profile.openTo.length > 0 && (
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-surface py-1 pl-2.5 pr-3 text-[13px] font-semibold leading-5 text-accent shadow-[0_0_0_4px_rgb(var(--accent)/0.08)]">
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open to work
              </p>
              <p className="mt-2 pl-1 text-[14px] font-medium text-ink/80">
                {profile.openTo.map((r, i) => (
                  <Fragment key={r}>
                    {i > 0 && (
                      <>
                        {" "}
                        <span aria-hidden className="text-accent">
                          ·
                        </span>{" "}
                      </>
                    )}
                    {r}
                  </Fragment>
                ))}
              </p>
            </div>
          )}
        </div>

        <h1
          style={d(0.06)}
          className="animate-rise mt-7 text-[clamp(2.5rem,4.6vw,3.25rem)] font-semibold leading-[1.04] tracking-tightest text-ink lg:[@media(max-height:800px)]:mt-5 lg:[@media(max-height:640px)]:mt-4"
        >
          <span className="sheen">{profile.name}</span>
        </h1>
        <p style={d(0.12)} className="animate-rise mt-3 text-[clamp(1.125rem,1.6vw,1.25rem)] font-medium tracking-snug text-ink/90">
          {profile.title}
        </p>
        <p style={d(0.18)} className="animate-rise mt-4 max-w-[36ch] text-pretty text-[16px] leading-relaxed">
          <Rich text={profile.intro} />
        </p>

        <nav style={d(0.24)} aria-label="Sections" className="animate-rise mt-12 hidden lg:block lg:[@media(max-height:800px)]:mt-8 lg:[@media(max-height:640px)]:mt-5">
          <ul>
            {sections.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={on ? "true" : undefined} className="group flex w-max items-center gap-4 py-2.5 lg:[@media(max-height:800px)]:py-[7px] lg:[@media(max-height:640px)]:py-[5px]">
                    <span
                      aria-hidden
                      className={cn(
                        "h-px transition-all duration-300 group-hover:w-16 group-hover:bg-ink group-focus-visible:w-16 motion-reduce:transition-none",
                        on ? "w-16 bg-accent" : "w-8 bg-faint/70",
                      )}
                    />
                    <span className={cn("label transition-colors group-hover:text-ink", on && "text-ink")}>{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div style={d(0.3)} className="animate-rise mt-8 flex flex-wrap items-center gap-2 lg:mt-10 lg:[@media(max-height:640px)]:mt-6">
        <a href={profile.resume} download={profile.resumeDownloadName} className="btn-primary hover:shadow-[0_8px_24px_-8px_rgb(var(--accent)/0.7)]">
          <Download size={16} aria-hidden />
          <span className="max-[359px]:hidden">Download résumé</span>
          <span className="hidden max-[359px]:inline">Résumé</span>
        </a>
        {/* Icon-only where the row would otherwise wrap (small phones and the narrow lg sidebar). */}
        <a href={`mailto:${profile.email}`} title="Email" className="btn-ghost max-sm:w-10 max-sm:px-0 lg:max-xl:w-10 lg:max-xl:px-0">
          <Mail size={16} aria-hidden />
          <span className="max-sm:sr-only lg:max-xl:sr-only">Email</span>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="icon-btn">
          <Linkedin size={18} aria-hidden />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="icon-btn">
          <Github size={18} aria-hidden />
        </a>
        <button type="button" onClick={onToggleTheme} aria-label={themeLabel} title={themeLabel} className="icon-btn hidden lg:inline-flex">
          <ThemeIcon size={18} aria-hidden />
        </button>
      </div>
    </header>
  );
}
