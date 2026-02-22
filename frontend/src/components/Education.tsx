import { portfolio } from "../data/portfolio";
import { Section } from "./Section";

export function Education() {
  return (
    <Section
      id="education"
      label="03"
      title="Education"
      subtitle="Academic background"
      className="bg-[var(--color-surface)]/40"
    >
      <div className="space-y-8">
        {portfolio.education.map((edu, i) => (
          <article key={i} className="card card-glow card-hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-amber-400">
                {edu.title}
              </h3>
              <p className="mt-1 text-white font-medium">
                {edu.org}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                {edu.period}
                {edu.location && ` · ${edu.location}`}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
