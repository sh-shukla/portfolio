import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { profile } from "@/content";

const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

// Highlights the link for whichever section crosses the middle of the viewport.
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const { theme, toggle } = useTheme();

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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-line/60 bg-canvas/80 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-14 items-center justify-between gap-4" aria-label="Main">
        <a href="#top" className="text-[15px] font-semibold tracking-snug" onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        <div className="flex items-center gap-1 md:gap-2">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[13px] transition-colors",
                    active === l.id ? "bg-ink/[0.07] font-medium text-ink" : "text-ink/70 hover:text-ink",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggle}
            aria-label={themeLabel}
            title={themeLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink/75 transition-colors hover:bg-ink/[0.07] hover:text-ink"
          >
            <ThemeIcon size={18} aria-hidden />
          </button>

          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-full bg-accent px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Résumé
          </a>

          <button
            type="button"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-page pb-4 md:hidden">
          <ul className="flex flex-col divide-y divide-line/60">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn("block py-3 text-[17px] font-medium", active === l.id ? "text-link" : "text-ink")}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
