import { Activity, Boxes, BrainCircuit, Cloud, Database, GraduationCap, Network, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import Chip, { Logo } from "./Chip";
import Reveal from "./Reveal";
import Section from "./Section";
import { certifications, education, skills } from "@/content";

const icons: Record<string, LucideIcon> = {
  Cloud: Cloud,
  Kubernetes: Boxes,
  "IaC and CI/CD": Workflow,
  "Observability and SRE": Activity,
  "AI and LLMOps": BrainCircuit,
  Security: ShieldCheck,
  Networking: Network,
  "Languages and data": Database,
};

// Tools from the skills list that have a logo, in two rows for the marquee.
const rows = [
  ["AWS", "Google Cloud", "Kubernetes", "Docker", "Helm", "Argo CD", "Terraform", "Pulumi", "Jenkins", "GitLab CI", "Spinnaker", "Rancher Fleet", "JFrog Artifactory", "Checkmarx"],
  ["Prometheus", "Grafana", "HashiCorp Vault", "NGINX", "Cloudflare", "Python", "Go", "FastAPI", "Celery", "Kafka", "Redis", "MongoDB", "ScyllaDB", "Bash", "Groovy"],
];

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const tile = (name: string) => (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-line bg-panel px-4 py-3 text-[15px] font-medium text-ink">
      <Logo name={name} size={22} />
      {name}
    </span>
  );
  return (
    <div className="marquee">
      <div className={reverse ? "marquee-track reverse" : "marquee-track"}>
        <ul className="marquee-group">
          {items.map((n) => (
            <li key={n}>{tile(n)}</li>
          ))}
        </ul>
        <ul aria-hidden className="marquee-group marquee-copy">
          {items.map((n) => (
            <li key={n}>{tile(n)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" title="Skills and tools">
      <Reveal className="-mx-5 space-y-3 sm:-mx-8">
        <Marquee items={rows[0]} />
        <Marquee items={rows[1]} reverse />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skills.map((s, i) => {
          const Icon = icons[s.group] ?? Cloud;
          return (
            <Reveal key={s.group} delay={(i % 4) * 0.05} className="card p-6">
              <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-snug text-ink">{s.group}</h3>
              <ul aria-label={s.group} className="mt-4 flex flex-wrap gap-1.5">
                {s.items.map((x) => (
                  <Chip key={x} name={x} />
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.short} delay={i * 0.05} className="card flex items-center gap-5 p-6">
            <img src={c.image} alt={`${c.name} badge`} width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 object-contain" />
            <div>
              <p className="label text-faint">Certified</p>
              <h3 className="mt-1 text-[16px] font-semibold leading-snug text-ink">{c.name}</h3>
              <p className="mt-0.5 text-[13.5px] text-faint">{c.issuer}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.1} className="card flex items-center gap-5 p-6">
          <span aria-hidden className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <GraduationCap size={30} />
          </span>
          <div>
            <p className="label text-faint">Education</p>
            <h3 className="mt-1 text-[16px] font-semibold leading-snug text-ink">{education.degree}</h3>
            <p className="mt-0.5 text-[13.5px] text-faint">
              {education.school} · {education.years} · {education.note}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
