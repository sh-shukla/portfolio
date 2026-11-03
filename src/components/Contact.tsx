import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import { profile } from "@/content";

type Status = "idle" | "sending" | "sent" | "error";
const FORM_ENDPOINT = "https://formspree.io/f/mzzvwyol";

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

  const field =
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[16px] text-white placeholder:text-white/40 outline-none transition focus:border-accent-bright focus:bg-white/[0.09]";

  return (
    <section id="contact" className="bg-black py-24 text-white sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-[15px] font-semibold text-accent-bright">Contact</p>
          <h2 className="headline-lg mt-2">Let's build something reliable.</h2>
          <p className="mt-5 max-w-[46ch] text-[19px] leading-relaxed text-white/65">
            Open to senior platform, DevOps and SRE roles. The fastest way to reach me is email.
          </p>
          <a href={`mailto:${profile.email}`} className="mt-8 inline-block break-all text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold tracking-snug text-white underline decoration-white/25 underline-offset-8 transition hover:decoration-white">
            {profile.email}
          </a>
          <ul className="mt-10 flex flex-wrap gap-3">
            {[
              { label: "LinkedIn", href: profile.linkedin },
              { label: "GitHub", href: profile.github },
              { label: "Résumé (PDF)", href: profile.resume },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-white hover:text-black">
                  {l.label} <ArrowUpRight size={16} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[15px] text-white/50">
            {profile.location} · <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-white">{profile.phone}</a>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="rounded-tile border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Name</span>
                <input name="name" required autoComplete="name" placeholder="Name" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="sr-only">Message</span>
              <textarea name="message" required minLength={10} rows={6} placeholder="What are you working on?" className={`${field} resize-none`} />
            </label>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <button type="submit" disabled={status === "sending"} className="btn-primary mt-5 w-full disabled:opacity-60">
              {status === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden /> : status === "sent" ? <Check size={18} aria-hidden /> : null}
              {status === "sent" ? "Message sent" : "Send message"}
            </button>
            <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-center text-[14px] text-white/60">
              {status === "sent" && "Thanks. I'll reply within a couple of days."}
              {status === "error" && (
                <>
                  Couldn't send that. Email me at <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
                </>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
