import { useState, useEffect } from "react";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
  { href: "#ai-chat", label: "AI Chat", isButton: true },
];

interface NavProps {
  onOpenChat?: () => void;
}

export function Nav({ onOpenChat }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[var(--color-bg)]/90 backdrop-blur-xl shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-white transition hover:opacity-90"
        >
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Portfolio
          </span>
        </a>
        <button
          type="button"
          className="rounded-lg p-2.5 text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div
          className={`absolute top-full left-0 right-0 flex flex-col gap-0.5 border-b border-white/[0.06] bg-[var(--color-surface)]/95 p-4 backdrop-blur-xl md:static md:flex md:flex-row md:gap-1 md:border-0 md:bg-transparent md:p-0 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {links.map(({ href, label, isButton }) =>
            isButton && onOpenChat ? (
              <button
                key={href}
                type="button"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-amber-400 transition hover:bg-white/5"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenChat();
                }}
              >
                {label}
              </button>
            ) : (
              <a
                key={href}
                href={href}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-amber-400"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
