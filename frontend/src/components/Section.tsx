import { useInView } from "../hooks/useInView";

interface SectionProps {
  id?: string;
  label?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  noReveal?: boolean;
}

export function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = "",
  innerClassName = "",
  noReveal,
}: SectionProps) {
  const { ref, inView } = useInView();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative z-10 px-6 py-16 md:py-24 ${className}`}
    >
      <div className={`mx-auto max-w-3xl ${innerClassName}`}>
        {(label || title) && (
          <header className="mb-12">
            {label && (
              <p className={`section-label ${!noReveal ? "reveal" : ""} ${inView ? "in-view" : ""}`}>
                {label}
              </p>
            )}
            <h2
              className={`section-title-underline font-display text-3xl font-bold tracking-tight text-white md:text-4xl ${
                !noReveal ? "reveal reveal-delay-1" : ""
              } ${inView ? "in-view" : ""}`}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`mt-2 text-zinc-500 ${!noReveal ? "reveal reveal-delay-2" : ""} ${
                  inView ? "in-view" : ""
                }`}
              >
                {subtitle}
              </p>
            )}
          </header>
        )}
        {noReveal ? (
          children
        ) : (
          <div className={`reveal reveal-delay-3 ${inView ? "in-view" : ""}`}>{children}</div>
        )}
      </div>
    </section>
  );
}
