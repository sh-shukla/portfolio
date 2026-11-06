import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { logoFor } from "@/lib/logos";

export function Logo({ name, size = 14, className }: { name: string; size?: number; className?: string }) {
  const logo = logoFor(name);
  if (!logo) return null;
  return (
    <svg
      aria-hidden
      viewBox={logo.viewBox}
      width={size}
      height={size}
      style={{ "--brand": logo.hex } as CSSProperties}
      className={cn("logo shrink-0", !logo.light && "logo-ink-light", !logo.dark && "logo-ink-dark", className)}
    >
      {logo.paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill} />
      ))}
    </svg>
  );
}

// A tool name with its logo when one exists; plain text otherwise.
export default function Chip({ name, className }: { name: string; className?: string }) {
  return (
    <li className={cn("chip", className)}>
      <Logo name={name} />
      {name}
    </li>
  );
}
