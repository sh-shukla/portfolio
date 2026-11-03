import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight, Download } from "lucide-react";
import Terminal from "./Terminal";
import Rich from "./Rich";
import { profile } from "@/content";
import { clamp, easeInOut, useReducedMotion, useScrollFrame } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/theme";

type Props = { theme: Theme; onToggleTheme: () => void };
const d = (s: number) => ({ animationDelay: `${s}s` });

// First screen. The stage is sticky inside a tall section; scrolling drives two phases:
//   --a: the copy lifts away and the terminal rises to the centre,
//   --c: the camera zooms into the terminal until its screen fills the window, then fades into the page.
// With reduced motion it is a plain, static hero.
export default function Hero({ theme, onToggleTheme }: Props) {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState(false);

  // Where the terminal sits, and how far it must scale to cover the screen.
  useEffect(() => {
    const s = stage.current;
    const t = win.current;
    if (!s || !t || reduce) return;
    const measure = () => {
      const dist = t.offsetTop + t.offsetHeight / 2 - s.clientHeight / 2;
      const zoom = Math.max(s.clientWidth / t.offsetWidth, s.clientHeight / t.offsetHeight) * 1.12;
      s.style.setProperty("--dist", `${Math.max(0, dist)}px`);
      s.style.setProperty("--zoom", zoom.toFixed(3));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(s);
    ro.observe(t);
    measure();
    return () => ro.disconnect();
  }, [reduce]);

  const update = useCallback(() => {
    const sec = section.current;
    const s = stage.current;
    if (!sec || !s) return;
    const total = sec.offsetHeight - s.clientHeight;
    const p = total > 0 ? clamp(-sec.getBoundingClientRect().top / total) : 0;
    const a = easeInOut(clamp(p / 0.32));
    // Ease-in, so the camera accelerates into the screen.
    const c = clamp((p - 0.42) / 0.58) ** 2;
    s.style.setProperty("--a", a.toFixed(4));
    s.style.setProperty("--c", c.toFixed(4));
    // Faded-out parts leave the tab order and stop catching clicks.
    s.dataset.copy = a > 0.8 ? "gone" : "";
    s.dataset.term = c > 0.67 ? "gone" : "";
    if (p > 0.04) setFinish(true);
  }, []);
  useScrollFrame(update, !reduce);

  return (
    <section ref={section} id="top" aria-label="Introduction" className={cn("relative", !reduce && "h-[230svh]")}>
      <div
        ref={stage}
        className={cn(
          "group/stage relative flex flex-col items-center overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pt-28 [@media(max-height:700px)]:pt-20",
          !reduce && "sticky top-0 h-[100svh] pb-0",
        )}
      >
        <div aria-hidden className="hero-fx pointer-events-none absolute inset-0">
          <div className="dot-grid absolute inset-0" />
          <div className="aurora absolute -inset-[10%]" />
        </div>

        <div className="hero-copy relative z-10 flex flex-col items-center text-center group-data-[copy=gone]/stage:invisible">
          {/* One pill on most screens; on small phones the areas drop to a second line. */}
          <p
            style={d(0)}
            className="animate-rise inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-canvas/60 px-3.5 py-1.5 text-[13px] font-medium text-ink/85 backdrop-blur-md max-[389px]:flex-col max-[389px]:gap-0.5 max-[389px]:rounded-2xl max-[389px]:px-4"
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-semibold text-accent">Open to work</span>
            </span>
            <span aria-hidden className="h-3.5 w-px bg-line max-[389px]:hidden" />
            <span>{profile.openTo.join(" · ")}</span>
          </p>
          <h1 style={d(0.08)} className="animate-rise mt-6 text-[clamp(3rem,9vw,6.5rem)] [@media(max-height:700px)]:mt-4 font-semibold leading-[0.95] tracking-tightest text-ink">
            {profile.name}
          </h1>
          <p style={d(0.16)} className="animate-rise grad-text mt-4 pb-1 text-[clamp(1.5rem,3.4vw,2.5rem)] font-semibold tracking-tighter [@media(max-height:700px)]:mt-2">
            {profile.title}
          </p>
          <p style={d(0.24)} className="animate-rise mt-4 max-w-[44ch] text-pretty [@media(max-height:700px)]:mt-3 text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed">
            <Rich text={profile.intro} />
          </p>
          <div style={d(0.32)} className="animate-rise mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 [@media(max-height:700px)]:mt-5">
            <a href={profile.resume} download={profile.resumeDownloadName} className="btn-primary h-11 px-6">
              <Download size={17} aria-hidden /> Download resume
            </a>
            <a href="#contact" className="group inline-flex items-center gap-0.5 text-[17px] font-medium text-accent">
              <span className="group-hover:underline">Get in touch</span>
              <ChevronRight size={18} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div ref={win} style={d(0.45)} className="animate-rise relative z-10 mt-12 w-full max-w-[880px] sm:mt-14 [@media(max-height:700px)]:mt-6">
          <div className="hero-term relative">
            {/* The screen itself stays solid while its text fades, so the zoom passes through a dark screen. */}
            <div aria-hidden className="absolute inset-0 rounded-2xl bg-term-bg" />
            <div className="hero-term-content relative group-data-[term=gone]/stage:invisible">
              <Terminal finish={finish} reduce={reduce} theme={theme} onToggleTheme={onToggleTheme} />
            </div>
            <div aria-hidden className="hero-term-cover pointer-events-none absolute inset-0 rounded-2xl bg-canvas" />
          </div>
        </div>

      </div>
    </section>
  );
}
