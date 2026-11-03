import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Loader2, Phone } from "lucide-react";
import Reveal from "./Reveal";
import Section from "./Section";
import { copyEmail } from "@/lib/actions";
import { profile } from "@/content";

type Status = "idle" | "sending" | "sent" | "error";
const FORM_ENDPOINT = "https://formspree.io/f/mzzvwyol";

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
    <button type="button" onClick={copy} className="btn-ghost h-9 px-3.5 text-[13px]">
      {copied ? <Check size={15} aria-hidden className="text-accent" /> : <Copy size={15} aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

// ["Platform", "DevOps", "SRE"] -> "Platform, DevOps and SRE"
const roles = profile.openTo;
const openTo = roles.length > 1 ? `${roles.slice(0, -1).join(", ")} and ${roles[roles.length - 1]}` : roles.join("");

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

  const label = "mb-1.5 block text-[13px] font-medium text-ink/80";
  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[16px] text-ink placeholder:text-faint outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

  return (
    <Section id="contact" title="Contact">
      <Reveal>
        <p className="max-w-[46ch] text-[16px] leading-relaxed">
          {openTo ? `Open to ${openTo} roles. ` : ""}Email is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-block text-[clamp(1.25rem,2.6vw,1.75rem)] font-semibold tracking-tighter text-ink underline decoration-line decoration-2 underline-offset-[6px] transition-colors [overflow-wrap:anywhere] hover:decoration-accent"
        >
          {profile.email}
        </a>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <CopyEmail />
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost h-9 px-3.5 text-[13px]">
            LinkedIn <ArrowUpRight size={15} aria-hidden />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost h-9 px-3.5 text-[13px]">
            GitHub <ArrowUpRight size={15} aria-hidden />
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="btn-ghost h-9 px-3.5 text-[13px]">
            <Phone size={14} aria-hidden /> {profile.phone}
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <form onSubmit={onSubmit} className="mt-12 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
          <p className="label">Or send a message</p>
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
          <input type="hidden" name="_subject" value="Portfolio message" />
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "sending"} className="btn-primary h-11 px-5 disabled:opacity-60">
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
    </Section>
  );
}
