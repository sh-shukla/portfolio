import { ExternalLink, Github } from "lucide-react";
import Chip from "./Chip";
import Reveal from "./Reveal";
import Section from "./Section";
import { projects } from "@/content";

export default function OpenSource() {
  return (
    <Section id="opensource" title="Open source">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.05} className="card flex flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[17px] font-semibold tracking-snug text-ink">{p.name}</h3>
              <div className="flex shrink-0 items-center gap-2.5">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.name} — live site`} className="text-faint transition-colors hover:text-accent">
                    <ExternalLink size={18} />
                  </a>
                )}
                <a href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.name} on GitHub`} className="text-faint transition-colors hover:text-accent">
                  <Github size={18} />
                </a>
              </div>
            </div>
            <p className="mt-2 text-[14.5px] leading-relaxed text-faint">{p.tagline}</p>
            <ul aria-label={`${p.name} tech`} className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {p.tech.map((t) => (
                <Chip key={t} name={t} />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
