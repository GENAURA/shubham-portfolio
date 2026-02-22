import { portfolio } from "../data/portfolio";

interface HeroProps {
  onOpenChat?: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  return (
    <section className="relative z-10 flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-10%,rgba(245,158,11,0.14),transparent_50%)]" />
      <div className="relative z-10 max-w-3xl text-center">
        <p className="reveal in-view mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400/90">
          Hello, I’m
        </p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl reveal in-view">
          <span className="gradient-text-animate">
            {portfolio.name}
          </span>
        </h1>
        <p className="reveal in-view mt-6 text-xl font-semibold text-amber-400/95 sm:text-2xl">
          {portfolio.tagline}
        </p>
        <p className="reveal in-view mx-auto mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {portfolio.about}
        </p>
        <div className="reveal in-view mt-14 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${portfolio.email}`}
            className="btn-primary"
          >
            Get in touch
          </a>
          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              className="btn-ghost inline-flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Ask AI
            </button>
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
      </div>
    </section>
  );
}
