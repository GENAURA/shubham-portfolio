import { portfolio } from "../data/portfolio";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="projects"
      label="05"
      title="Projects"
      subtitle="Things I’ve built"
      className="bg-[var(--color-bg)]"
    >
      <div className="space-y-6">
        {portfolio.projects.map((project, i) => (
          <article key={i} className="card card-glow card-hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400/90 ring-1 ring-amber-500/10 transition hover:bg-amber-500/15 hover:ring-amber-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 transition hover:text-amber-300"
                  >
                    Live <span aria-hidden>→</span>
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 transition hover:text-amber-300"
                  >
                    Repo <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
