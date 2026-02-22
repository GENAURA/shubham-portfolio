import { portfolio } from "../data/portfolio";
import { Section } from "./Section";

export function Achievements() {
  return (
    <Section
      id="achievements"
      label="06"
      title="Achievements"
      subtitle="Hackathons, contests & milestones"
      className="bg-[var(--color-bg)]"
    >
      <ul className="space-y-4">
        {portfolio.achievements.map((item, i) => (
          <li
            key={i}
            className="card card-glow card-hover-lift flex gap-4 rounded-2xl p-5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-sm font-bold text-amber-400">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-zinc-300">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
