import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-black/[0.06] bg-canvas/75 backdrop-blur-xl backdrop-saturate-150" : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-12 items-center justify-between" aria-label="Main">
        <a href="#top" className="text-[15px] font-semibold tracking-snug text-ink" onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] text-ink/80 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-accent px-3.5 py-1 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="container-page pb-6 md:hidden">
          <ul className="flex flex-col divide-y divide-black/[0.06]">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block py-3 text-[17px] font-medium text-ink" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary w-full">
                Download résumé
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
