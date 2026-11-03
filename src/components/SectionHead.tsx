import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = { title: string; action?: ReactNode };

// Plain noun heading with an optional link on the right (e.g. the résumé PDF).
export default function SectionHead({ title, action }: Props) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <h2 className="headline-lg">{title}</h2>
      {action}
    </Reveal>
  );
}
