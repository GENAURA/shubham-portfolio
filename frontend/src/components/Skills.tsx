import { portfolio } from "../data/portfolio";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section
      id="skills"
      label="04"
      title="Skills"
      subtitle="Technologies and tools I work with"
      className="bg-[var(--color-surface)]/40"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {portfolio.skills.map((group, i) => (
          <div key={i} className="card card-glow card-hover-lift group">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-amber-400/90">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, j) => (
                <span
                  key={j}
                  className="rounded-full border border-white/[0.06] bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition-all duration-300 hover:border-amber-500/25 hover:bg-amber-500/10 hover:text-amber-200 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
