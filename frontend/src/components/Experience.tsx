import { portfolio } from "../data/portfolio";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      label="02"
      title="Experience"
      subtitle="Roles and impact"
      className="bg-[var(--color-bg)]"
    >
      <div className="space-y-8">
        {portfolio.experience.map((job, i) => (
          <article
            key={i}
            className="card card-glow card-hover-lift group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-amber-400">
                {job.role}
              </h3>
              <span className="text-sm text-zinc-500">
                {job.period}
                {job.company !== "—" && ` · ${job.company}`}
              </span>
            </div>
            <ul className="relative mt-5 space-y-2.5">
              {job.points.map((point, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
