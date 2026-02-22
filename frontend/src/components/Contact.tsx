import { portfolio } from "../data/portfolio";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section
      id="contact"
      label="07"
      title="Contact"
      subtitle="I’m open to collaboration and new opportunities."
      className="bg-[var(--color-surface)]/40"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`mailto:${portfolio.email}`} className="btn-primary">
            Email me
          </a>
          {portfolio.phone && (
            <a
              href={`tel:${portfolio.phone.replace(/\s/g, "")}`}
              className="btn-ghost"
            >
              Call / WhatsApp
            </a>
          )}
          {portfolio.github && (
            <a
              href={portfolio.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub
            </a>
          )}
          {portfolio.linkedin && (
            <a
              href={portfolio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              LinkedIn
            </a>
          )}
        </div>
        {portfolio.phone && (
          <p className="mt-4 text-sm text-zinc-500">
            {portfolio.phone}
          </p>
        )}
        <p className="mt-10 text-sm text-zinc-500">
          Or use the <span className="text-amber-400/90">AI chat</span> to ask about my experience and skills.
        </p>
      </div>
    </Section>
  );
}
