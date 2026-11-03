import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  Briefcase,
  Copy,
  Download,
  FileText,
  Github,
  Layers,
  Linkedin,
  Mail,
  MessageSquare,
  Moon,
  Search,
  Sun,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { copyEmail, downloadResume, openInNewTab, toast } from "@/lib/actions";
import { goTo, sections, type SectionId } from "@/lib/sections";
import type { Theme } from "@/lib/theme";
import { profile } from "@/content";

type Group = "Go to" | "Actions" | "Links";
type Command = { id: string; group: Group; label: string; icon: LucideIcon; hint?: string; keywords?: string; run: () => void };
type Props = { open: boolean; onClose: () => void; theme: Theme; onToggleTheme: () => void };

const GROUPS: Group[] = ["Go to", "Actions", "Links"];
const sectionIcons: Record<SectionId, LucideIcon> = { about: User, work: Layers, experience: Briefcase, skills: Wrench, contact: MessageSquare };

function matches(c: Command, terms: string[]) {
  const hay = `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase();
  return terms.every((t) => hay.includes(t));
}

// ⌘K / Ctrl+K. A native modal <dialog> gives focus trapping, Escape and an inert page for free.
export default function CommandPalette({ open, onClose, theme, onToggleTheme }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((s) => ({
        id: `go-${s.id}`,
        group: "Go to" as const,
        label: s.label,
        icon: sectionIcons[s.id],
        keywords: s.id === "work" ? "projects selected" : s.id === "contact" ? "message hire" : undefined,
        run: () => goTo(s.id),
      })),
      { id: "resume-download", group: "Actions", label: "Download résumé", icon: Download, hint: "PDF", keywords: "resume cv", run: downloadResume },
      { id: "resume-open", group: "Actions", label: "Open résumé in a new tab", icon: FileText, keywords: "resume cv view", run: () => openInNewTab(profile.resume) },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        icon: Copy,
        hint: profile.email,
        keywords: "contact clipboard",
        run: () => void copyEmail().then((ok) => toast(ok ? "Email copied" : `Couldn't copy. Email: ${profile.email}`)),
      },
      { id: "email", group: "Actions", label: "Send an email", icon: Mail, keywords: "contact mail", run: () => (window.location.href = `mailto:${profile.email}`) },
      {
        id: "theme",
        group: "Actions",
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        icon: theme === "dark" ? Sun : Moon,
        keywords: "theme appearance dark light",
        run: onToggleTheme,
      },
      { id: "linkedin", group: "Links", label: "LinkedIn", icon: Linkedin, hint: "↗", keywords: "profile social", run: () => openInNewTab(profile.linkedin) },
      { id: "github", group: "Links", label: "GitHub", icon: Github, hint: "↗", keywords: "code profile", run: () => openInNewTab(profile.github) },
    ],
    [theme, onToggleTheme],
  );

  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = terms.length ? commands.filter((c) => matches(c, terms)) : commands;
  const current = results[Math.min(index, results.length - 1)];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      d.showModal();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => {
    if (current) document.getElementById(`cmd-${current.id}`)?.scrollIntoView({ block: "nearest" });
  }, [current]);

  function handleClose() {
    setQuery("");
    setIndex(0);
    onClose();
  }

  function run(c: Command) {
    const navigating = c.group === "Go to";
    dialog.current?.close();
    if (navigating) (document.activeElement as HTMLElement | null)?.blur();
    else returnFocus.current?.focus({ preventScroll: true });
    c.run();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    const at = Math.min(index, results.length - 1);
    if (e.key === "ArrowDown") setIndex((at + 1) % results.length);
    else if (e.key === "ArrowUp") setIndex((at - 1 + results.length) % results.length);
    else if (e.key === "Home") setIndex(0);
    else if (e.key === "End") setIndex(results.length - 1);
    else if (e.key === "Enter" && current) run(current);
    else return;
    e.preventDefault();
  }

  let n = -1;
  return (
    <dialog
      ref={dialog}
      aria-label="Quick actions"
      className="palette"
      onClose={handleClose}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search size={17} aria-hidden className="shrink-0 text-faint" />
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-autocomplete="list"
          aria-activedescendant={current ? `cmd-${current.id}` : undefined}
          aria-label="Search actions"
          placeholder="Search or jump to…"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-faint"
        />
        <kbd className="kbd">esc</kbd>
      </div>

      <div id="palette-list" role="listbox" aria-label="Actions" className="max-h-[min(56vh,420px)] overflow-y-auto overscroll-contain p-2">
        {GROUPS.map((g) => {
          const items = results.filter((c) => c.group === g);
          if (!items.length) return null;
          const gid = `grp-${g.replace(/\s/g, "").toLowerCase()}`;
          return (
            <div key={g} role="group" aria-labelledby={gid} className="pb-1">
              <div id={gid} aria-hidden className="px-3 pb-1.5 pt-2.5 font-mono text-[11px] uppercase tracking-label text-faint">
                {g}
              </div>
              {items.map((c) => {
                n += 1;
                const on = c === current;
                const i = n;
                return (
                  <div
                    key={c.id}
                    id={`cmd-${c.id}`}
                    role="option"
                    aria-selected={on}
                    onMouseMove={() => i !== index && setIndex(i)}
                    onClick={() => run(c)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors duration-100",
                      on ? "bg-ink/[0.06] text-ink" : "text-mute",
                    )}
                  >
                    <c.icon size={16} aria-hidden className={cn("shrink-0", on ? "text-accent" : "text-faint")} />
                    <span className="min-w-0 flex-1 truncate">{c.label}</span>
                    {c.hint && <span className="hidden truncate font-mono text-[12px] text-faint sm:block">{c.hint}</span>}
                  </div>
                );
              })}
            </div>
          );
        })}
        {!results.length && <p className="px-3 py-10 text-center text-[14px] text-faint">No results for “{query}”</p>}
      </div>

      <div aria-hidden className="hidden items-center gap-4 border-t border-line px-4 py-2.5 text-[12px] text-faint sm:flex">
        <span className="flex items-center gap-1.5">
          <span className="kbd">↑</span>
          <span className="kbd">↓</span> move
        </span>
        <span className="flex items-center gap-1.5">
          <span className="kbd">↵</span> select
        </span>
        <span className="flex items-center gap-1.5">
          <span className="kbd">esc</span> close
        </span>
      </div>
    </dialog>
  );
}
