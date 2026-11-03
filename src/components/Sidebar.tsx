import { useEffect, useState } from "react";
import { Download, Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { sections, type SectionId } from "@/lib/sections";
import type { Theme } from "@/lib/theme";
import { profile } from "@/content";

type Props = { active: SectionId | null; theme: Theme; onToggleTheme: () => void; onOpenPalette: () => void };

const d = (s: number) => ({ animationDelay: `${s}s` });
const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

// Bangalore time, so people in other time zones know when a reply is likely.
function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }).format(now);
  return <time dateTime={now.toISOString()}>{time} IST</time>;
}

export default function Sidebar({ active, theme, onToggleTheme, onOpenPalette }: Props) {
  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="pt-24 sm:pt-28 lg:sticky lg:top-0 lg:-mx-3 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:overflow-y-auto lg:px-3 lg:pb-12 lg:pt-16 lg:[@media(max-height:800px)]:pt-12 lg:[@media(max-height:640px)]:pb-4 lg:[@media(max-height:640px)]:pt-8">
      <div>
        <img
          style={d(0)}
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={64}
          height={64}
          className="animate-rise h-16 w-16 rounded-full object-cover object-[50%_25%] ring-1 ring-line lg:[@media(max-height:800px)]:hidden"
        />
        <h1 style={d(0.06)} className="animate-rise mt-6 text-[clamp(2.5rem,4.6vw,3.25rem)] lg:[@media(max-height:800px)]:mt-0 font-semibold leading-[1.02] tracking-tightest text-ink">
          {profile.name}
        </h1>
        <p style={d(0.12)} className="animate-rise mt-3 text-[clamp(1.125rem,1.6vw,1.25rem)] font-medium tracking-snug text-ink/90">
          {profile.title}
        </p>
        <p style={d(0.18)} className="animate-rise mt-4 max-w-[34ch] text-pretty text-[16px] leading-relaxed">
          {profile.intro}
        </p>
        {profile.availability && (
          <p style={d(0.24)} className="animate-rise mt-5 flex items-start gap-2.5 text-[14px] leading-snug text-accent">
            <span aria-hidden className="relative mt-[0.35em] flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </p>
        )}

        <nav style={d(0.3)} aria-label="Sections" className="animate-rise mt-12 hidden lg:block lg:[@media(max-height:800px)]:mt-8 lg:[@media(max-height:640px)]:mt-5">
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
                        on ? "w-16 bg-ink" : "w-8 bg-faint/70",
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

      <div style={d(0.36)} className="animate-rise mt-8 lg:mt-10 lg:[@media(max-height:640px)]:mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <a href={profile.resume} download={profile.resumeDownloadName} className="btn-primary">
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
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-faint">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
            className="hidden items-center gap-2 rounded-full border border-line py-1 pl-1.5 pr-3 transition-colors hover:border-ink/25 hover:text-ink lg:inline-flex"
          >
            <span className="kbd">{isMac ? "⌘K" : "Ctrl K"}</span> Quick actions
          </button>
          <span>
            {profile.location} · <LocalTime />
          </span>
        </div>
      </div>
    </header>
  );
}
