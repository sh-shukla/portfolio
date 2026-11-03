import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { experience, profile, stats } from "@/content";
import { goTo, sections, type SectionId } from "@/lib/sections";
import { copyEmail, downloadResume, openInNewTab } from "@/lib/actions";
import type { Theme } from "@/lib/theme";

type Props = { finish: boolean; reduce: boolean; theme: Theme; onToggleTheme: () => void };
type Entry = { id: number; input: string; output: ReactNode };

const INTRO = "kubectl describe engineer shashank";
const years = stats.find((s) => s.label.includes("years"))?.value ?? "";
const describe: [string, ReactNode][] = [
  ["Name", profile.name],
  ["Role", profile.title],
  // Each area stays whole, so a narrow terminal wraps between areas, never inside one.
  [
    "Focus",
    profile.openTo.map((a, i) => (
      <Fragment key={a}>
        {i > 0 && " · "}
        <span className="whitespace-nowrap">{a}</span>
      </Fragment>
    )),
  ],
  ["Experience", `${years} years`],
  ["Stack", "AWS · GCP · Kubernetes"],
  ["Currently", experience[0].company],
  ...(profile.openTo.length ? [["Status", <span className="text-term-green">● Open to work</span>] as [string, ReactNode]] : []),
];

const sectionIds = sections.map((s) => s.id) as readonly string[];
const COMMANDS = ["help", "ls", "whoami", ...sectionIds, "resume", "email", "linkedin", "github", "theme", "clear"];

function Prompt() {
  return (
    <span aria-hidden className="select-none">
      <span className="text-term-green">➜</span>
      <span className="text-term-cyan">{" ~\u00a0"}</span>
    </span>
  );
}

function Describe() {
  return (
    <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
      {describe.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-term-cyan">{k}:</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// A small zsh: it types one command on load, then takes real commands (help, ls, work, resume...).
export default function Terminal({ finish, reduce, theme, onToggleTheme }: Props) {
  const [typed, setTyped] = useState(reduce ? INTRO.length : 0);
  const [printed, setPrinted] = useState(reduce);
  const [cleared, setCleared] = useState(false);
  const [log, setLog] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const nextId = useRef(0);
  const jumped = useRef(false);

  // Type the intro command, then print its output.
  useEffect(() => {
    if (typed < INTRO.length) {
      const t = window.setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 650 : 28 + Math.random() * 38);
      return () => window.clearTimeout(t);
    }
    if (!printed) {
      const t = window.setTimeout(() => setPrinted(true), 280);
      return () => window.clearTimeout(t);
    }
  }, [typed, printed]);

  // Scrolling away (or reduced motion) skips straight to the finished intro.
  useEffect(() => {
    if (finish || reduce) {
      setTyped(INTRO.length);
      setPrinted(true);
    }
  }, [finish, reduce]);

  useEffect(() => {
    const el = body.current;
    if (!el || !log.length) return;
    el.scrollTop = el.scrollHeight;
    // Keep the prompt on screen after output, unless the command just jumped to a section.
    if (!jumped.current) input.current?.scrollIntoView({ block: "nearest" });
    jumped.current = false;
  }, [log]);

  const introDone = typed >= INTRO.length && printed;

  function respond(raw: string): ReactNode {
    const [cmd = "", ...args] = raw.trim().toLowerCase().split(/\s+/);
    const target = (cmd === "cd" || cmd === "open" ? args[0] ?? "" : cmd).replace(/^~?\/?/, "").replace(/\/$/, "");

    if (sectionIds.includes(target)) {
      jumped.current = true;
      goTo(target as SectionId);
      return <span className="text-term-dim">→ ~/{target}</span>;
    }
    if (target === "resume" || target === "resume.pdf" || (cmd === "cat" && args[0] === "resume.pdf")) {
      downloadResume();
      return <span className="text-term-dim">Downloading {profile.resumeDownloadName}</span>;
    }
    switch (cmd) {
      case "":
        return null;
      case "help":
        return (
          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
            {[
              [sectionIds.join("  "), "jump to a section"],
              ["resume", "download my resume (PDF)"],
              ["email", "copy my email address"],
              ["linkedin, github", "open my profiles"],
              ["theme", "switch light / dark"],
              ["ls, whoami, clear", "the usual"],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-term-cyan">{k}</dt>
                <dd className="text-term-dim">{v}</dd>
              </div>
            ))}
          </dl>
        );
      case "ls":
        return (
          <span>
            {sectionIds.map((s) => (
              <span key={s} className="mr-3 text-term-blue">
                {s}/
              </span>
            ))}
            resume.pdf
          </span>
        );
      case "whoami":
        return `${profile.name}, ${profile.title}`;
      case "pwd":
        return "/home/shashank";
      case "email":
      case "mail":
        void copyEmail().then((ok) => appendNote(ok ? `Copied ${profile.email}` : profile.email));
        return null;
      case "linkedin":
      case "github":
        openInNewTab(cmd === "linkedin" ? profile.linkedin : profile.github);
        return <span className="text-term-dim">Opening {cmd === "linkedin" ? "LinkedIn" : "GitHub"} ↗</span>;
      case "theme": {
        const want = args[0];
        if (want !== theme) onToggleTheme();
        return <span className="text-term-dim">Theme: {want === "light" || want === "dark" ? want : theme === "dark" ? "light" : "dark"}</span>;
      }
      case "kubectl":
        return <Describe />;
      case "sudo":
        return "shashank is not in the sudoers file. This incident will be reported.";
      case "hire":
        return (
          <span>
            Good call. Type <span className="text-term-cyan">email</span> or <span className="text-term-cyan">resume</span>.
          </span>
        );
      default:
        return (
          <span>
            zsh: command not found: {cmd}. Type <span className="text-term-cyan">help</span>.
          </span>
        );
    }
  }

  function appendNote(text: string) {
    setLog((l) => [...l, { id: nextId.current++, input: "", output: <span className="text-term-dim">{text}</span> }]);
  }

  function run() {
    const raw = value;
    setValue("");
    cursor.current = -1;
    if (raw.trim()) history.current.unshift(raw.trim());
    if (/^(clear|cls)$/i.test(raw.trim())) {
      setLog([]);
      setCleared(true);
      return;
    }
    const output = respond(raw);
    setLog((l) => [...l, { id: nextId.current++, input: raw.trim(), output }]);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      run();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const h = history.current;
      cursor.current = e.key === "ArrowUp" ? Math.min(cursor.current + 1, h.length - 1) : Math.max(cursor.current - 1, -1);
      setValue(cursor.current >= 0 ? h[cursor.current] : "");
    } else if (e.key === "Tab" && value.trim()) {
      const matches = COMMANDS.filter((c) => c.startsWith(value.trim().toLowerCase()));
      if (matches.length === 1) {
        e.preventDefault();
        setValue(matches[0]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLog([]);
      setCleared(true);
    }
  }

  // Clicking anywhere in the window focuses the prompt, unless the visitor is selecting text.
  function focusPrompt() {
    if (window.getSelection()?.toString()) return;
    input.current?.focus({ preventScroll: true });
  }

  return (
    <div
      onClick={focusPrompt}
      className="overflow-hidden rounded-2xl bg-term-bg text-left font-mono text-[12px] leading-[1.7] text-term-ink shadow-[0_40px_120px_-30px_rgb(0_0_0/0.55),0_0_0_1px_rgb(255_255_255/0.08)] ring-term-green/40 transition-shadow focus-within:ring-2 sm:text-[13.5px] lg:text-[14.5px]"
    >
      <div className="flex h-10 items-center gap-2 bg-term-bar px-4">
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#28c840]" />
        <p className="flex-1 truncate pr-12 text-center text-[12px] text-term-dim">shashank@platform: ~ — zsh</p>
      </div>
      <div ref={body} className="h-[270px] overflow-y-auto px-4 py-3.5 [scrollbar-width:thin] sm:h-[300px] sm:px-5 sm:py-4 lg:h-[330px] lg:px-6 lg:py-5">
        {!cleared && (
          <>
            <div aria-hidden>
              <p className="break-words">
                <Prompt />
                {INTRO.slice(0, typed)}
                {!introDone && <span className="ml-px inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] animate-blink bg-term-ink" />}
              </p>
              {printed && (
                <div className="mt-0.5">
                  <Describe />
                </div>
              )}
            </div>
            <div className="sr-only">
              <p>Terminal. Output of kubectl describe engineer shashank:</p>
              <Describe />
            </div>
          </>
        )}

        <div role="log" aria-live="polite" aria-label="Terminal output">
          {log.map((e) => (
            <div key={e.id} className="mt-1">
              {e.input && (
                <p className="break-words">
                  <Prompt />
                  {e.input}
                </p>
              )}
              {e.output && <div className="break-words">{e.output}</div>}
            </div>
          ))}
        </div>

        <div className={introDone ? "mt-1 flex items-center" : "invisible mt-1 flex items-center"}>
          <Prompt />
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command. Type help to see what it can do.
          </label>
          <span className="relative min-w-0 flex-1">
            <input
              ref={input}
              id="terminal-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              className="w-full bg-transparent text-[16px] text-term-ink caret-term-green outline-none focus-visible:outline-none sm:text-[13.5px] lg:text-[14.5px]"
            />
            {!focused && !value && (
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-term-dim">
                <span className="mr-2 inline-block h-[1.1em] w-[0.6em] animate-blink bg-term-green" />
                type <span className="mx-1 text-term-ink">help</span> or scroll
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
