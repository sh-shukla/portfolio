import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import { profile } from "@/content";

type Status = "idle" | "sending" | "sent" | "error";
const FORM_ENDPOINT = "https://formspree.io/f/mzzvwyol";
const pill =
  "inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-4 text-[14px] font-medium text-white transition hover:bg-white hover:text-black";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (typeof navigator === "undefined" || !navigator.clipboard) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard refused: the address is still visible and selectable.
    }
  }

  return (
    <li>
      <button type="button" onClick={copy} className={pill}>
        {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
        <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
      </button>
    </li>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const label = "mb-1.5 block text-[13px] font-medium text-white/70";
  const field =
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[16px] text-white placeholder:text-white/35 outline-none transition focus:border-[#2997ff] focus:bg-white/[0.09]";

  return (
    <section id="contact" className="container-page py-24 sm:py-32">
      <Reveal>
        <div className="relative grid gap-12 overflow-hidden rounded-[32px] bg-[#0a0a0a] p-6 text-white ring-1 ring-white/10 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-14 dark:bg-surface">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full opacity-50"
            style={{ background: "radial-gradient(closest-side, rgb(41 151 255 / 0.35), rgb(41 151 255 / 0))" }}
          />
          <div className="relative">
            <h2 className="headline-lg">Contact</h2>
            <p className="mt-4 max-w-[40ch] text-[17px] leading-relaxed text-white/65">
              {profile.availability ? `${profile.availability}. ` : ""}Email is the fastest way to reach me.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-block text-[clamp(1.125rem,2.4vw,1.625rem)] font-semibold tracking-snug text-white underline decoration-white/25 underline-offset-8 transition [overflow-wrap:anywhere] hover:decoration-white"
            >
              {profile.email}
            </a>
            <ul className="mt-6 flex flex-wrap gap-3">
              <CopyEmail />
              {[
                { label: "LinkedIn", href: profile.linkedin },
                { label: "GitHub", href: profile.github },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className={pill}>
                    {l.label} <ArrowUpRight size={15} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[14px] text-white/60">
              {profile.location} ·{" "}
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="transition hover:text-white">
                {profile.phone}
              </a>
            </p>
          </div>

          <form onSubmit={onSubmit} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={label}>Name</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>Email</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
            </div>
            <label className="mt-4 block">
              <span className={label}>Message</span>
              <textarea name="message" required minLength={10} rows={6} placeholder="The role, the team, or just hello." className={`${field} resize-none`} />
            </label>
            <input type="hidden" name="_subject" value="Portfolio message" />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <button type="submit" disabled={status === "sending"} className="btn-primary mt-5 w-full disabled:opacity-60">
              {status === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden /> : status === "sent" ? <Check size={18} aria-hidden /> : null}
              {status === "sent" ? "Message sent" : status === "sending" ? "Sending" : "Send message"}
            </button>
            <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-center text-[14px] text-white/60">
              {status === "sent" && "Thanks. I'll reply soon."}
              {status === "error" && (
                <>
                  Couldn't send that. Email me at{" "}
                  <a className="underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                  .
                </>
              )}
            </p>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
