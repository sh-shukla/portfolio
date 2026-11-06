import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Loader2, Phone } from "lucide-react";
import Reveal from "./Reveal";
import Section from "./Section";
import { copyEmail } from "@/lib/actions";
import { contactForm, profile } from "@/content";

type Status = "idle" | "sending" | "sent" | "error";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (typeof navigator === "undefined" || !navigator.clipboard) return null;

  async function copy() {
    // If the clipboard is refused, the address stays visible and selectable.
    if (!(await copyEmail())) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={copy} className="btn-ghost h-10 px-4 text-[14px]">
      {copied ? <Check size={15} aria-hidden className="text-accent" /> : <Copy size={15} aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

// ["Platform", "DevOps", "SRE", "AI Infra"] -> "Platform, DevOps, SRE and AI Infra"
const roles = profile.openTo;
const openTo = roles.length > 1 ? `${roles.slice(0, -1).join(", ")} and ${roles[roles.length - 1]}` : roles.join("");

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      // URL-encoded with no custom headers: a "simple" request, so the browser skips the CORS preflight
      // that Apps Script cannot answer. Success means the script reports the email as sent.
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
      const res = await fetch(contactForm, { method: "POST", body });
      const data = (await res.json()) as { ok?: boolean };
      if (!res.ok || data.ok !== true) throw new Error("not sent");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const label = "mb-1.5 block text-[13px] font-medium text-ink/80";
  const field =
    "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-[16px] text-ink placeholder:text-faint outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

  return (
    <Section id="contact" title="Get in touch">
      <Reveal>
        <p className="max-w-[48ch] text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed">
          {openTo ? `Open to ${openTo} roles. ` : ""}Email is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="grad-text mt-6 inline-block pb-1 text-[clamp(1.0625rem,5.4vw,3.25rem)] font-semibold leading-tight tracking-tighter [overflow-wrap:anywhere] hover:opacity-80"
        >
          {profile.email}
        </a>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <CopyEmail />
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost h-10 px-4 text-[14px]">
            LinkedIn <ArrowUpRight size={15} aria-hidden />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost h-10 px-4 text-[14px]">
            GitHub <ArrowUpRight size={15} aria-hidden />
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="btn-ghost h-10 px-4 text-[14px]">
            <Phone size={14} aria-hidden /> {profile.phone}
          </a>
        </div>
      </Reveal>

      {contactForm && (
        <Reveal delay={0.06}>
          <form onSubmit={onSubmit} className="card mt-14 p-6 sm:p-10">
            <h3 className="text-[22px] font-semibold tracking-snug text-ink">Or send a message</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
              <textarea name="message" required minLength={10} rows={5} placeholder="The role, the team, or just hello." className={`${field} resize-none`} />
            </label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === "sending"} className="btn-primary h-11 px-6 disabled:opacity-60">
                {status === "sending" ? <Loader2 size={17} className="animate-spin" aria-hidden /> : status === "sent" ? <Check size={17} aria-hidden /> : null}
                {status === "sent" ? "Message sent" : status === "sending" ? "Sending" : "Send message"}
              </button>
              <p role="status" aria-live="polite" className="text-[14px] text-faint">
                {status === "sent" && "Thanks. I'll reply soon."}
                {status === "error" && (
                  <>
                    Couldn't send that. Email me at{" "}
                    <a className="text-ink underline" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      )}
    </Section>
  );
}
