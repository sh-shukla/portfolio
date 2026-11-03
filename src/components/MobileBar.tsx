import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { sections, type SectionId } from "@/lib/sections";
import type { Theme } from "@/lib/theme";
import { profile } from "@/content";

type Props = { active: SectionId | null; theme: Theme; onToggleTheme: () => void };

// Phones and tablets only: the sidebar nav is hidden there, so this bar carries it.
export default function MobileBar({ active, theme, onToggleTheme }: Props) {
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
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 lg:hidden",
        scrolled || open ? "border-line/70 bg-canvas/85 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-page items-center justify-between gap-3 px-5 sm:px-8">
        <a href="#top" onClick={() => setOpen(false)} className="whitespace-nowrap text-[15px] font-semibold tracking-snug text-ink">
          {profile.name}
        </a>
        <div className="-mr-2 flex items-center gap-1 max-[359px]:gap-0">
          <button type="button" onClick={onToggleTheme} aria-label={themeLabel} title={themeLabel} className="icon-btn">
            <ThemeIcon size={18} aria-hidden />
          </button>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary h-8 px-3 text-[13px] max-[359px]:px-2.5">
            Résumé
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="icon-btn text-ink"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" className="mx-auto max-w-page divide-y divide-line/70 px-5 pb-3 sm:px-8">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === s.id ? "true" : undefined}
                className={cn("flex items-center justify-between py-3 text-[17px] font-medium", active === s.id ? "text-accent" : "text-ink")}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
