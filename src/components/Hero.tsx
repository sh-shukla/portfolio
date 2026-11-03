import { ChevronRight, Download } from "lucide-react";
import { hero, profile } from "@/content";

export default function Hero() {

  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[620px] w-[1100px] -translate-x-1/2 opacity-70"
        style={{ background: "radial-gradient(closest-side, rgba(0,113,227,0.10), rgba(0,113,227,0) 70%)" }}
      />
      <div className="container-page flex flex-col items-center text-center">
        <img
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={96}
          height={96}
          className="animate-rise h-24 w-24 rounded-full object-cover object-[50%_25%] shadow-tile ring-4 ring-white"
        />
        <p style={{ animationDelay: "0.05s" }} className="animate-rise eyebrow mt-6">
          {profile.name} · {hero.eyebrow}
        </p>
        <h1 style={{ animationDelay: "0.12s" }} className="animate-rise headline-xl mt-3">
          <span className="block">{hero.line1}</span>
          <span className="block text-faint">{hero.line2}</span>
        </h1>
        <p style={{ animationDelay: "0.2s" }} className="animate-rise lede mt-6 max-w-copy">
          {hero.lede}
        </p>
        <div style={{ animationDelay: "0.28s" }} className="animate-rise mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary">
            <Download size={18} aria-hidden /> Download résumé
          </a>
          <a href="#contact" className="btn-ghost">
            Get in touch <ChevronRight size={18} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
