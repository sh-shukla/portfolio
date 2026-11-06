import { useEffect, useState } from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { sections, type SectionId } from "@/lib/sections";
import type { Theme } from "@/lib/theme";
import { profile } from "@/content";

type Props = { active: SectionId | null; theme: Theme; onToggleTheme: () => void };

// Apple-style local nav: a thin frosted bar. Links collapse into a menu below md.
export default function Nav({ active, theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line/60 bg-canvas/75 backdrop-blur-xl backdrop-saturate-150" : "border-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-12 max-w-content items-center justify-between gap-3 px-5 sm:px-8">
        <a href="#top" onClick={() => setOpen(false)} className="whitespace-nowrap text-[17px] font-semibold tracking-snug text-ink max-[359px]:text-[15px]">
          {profile.name}
        </a>
        <div className="-mr-1.5 flex items-center gap-1 max-[359px]:gap-0">
          <ul className="mr-3 hidden items-center gap-6 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={cn("text-[13px] transition-colors hover:text-ink", active === s.id ? "text-ink" : "text-ink/65")}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={onToggleTheme} aria-label={themeLabel} title={themeLabel} className="icon-btn max-[359px]:w-8">
            <ThemeIcon size={17} aria-hidden />
          </button>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary ml-1 h-7 px-3.5 text-[12.5px] max-[359px]:px-2.5">
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="icon-btn md:hidden max-[359px]:w-8"
          >
            <ChevronDown size={19} aria-hidden className={cn("transition-transform duration-300", open && "rotate-180")} />
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" className="mx-auto max-w-content px-5 pb-4 pt-1 sm:px-8 md:hidden">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === s.id ? "true" : undefined}
                className={cn("block py-2.5 text-[24px] font-semibold tracking-tighter", active === s.id ? "text-accent" : "text-ink")}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
