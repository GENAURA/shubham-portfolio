import { Section } from "./Section";

interface AIChatSectionProps {
  onOpenChat: () => void;
}

export function AIChatSection({ onOpenChat }: AIChatSectionProps) {
  return (
    <Section
      id="ai-chat"
      label="08"
      title="AI Chat"
      subtitle="Ask anything about my experience, skills, or projects. Answers are based on my resume."
      className="border-t border-white/[0.06] bg-[var(--color-bg)]"
    >
      <div className="card-glow flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center md:p-12">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 ring-1 ring-amber-500/20">
          <svg
            className="h-7 w-7 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
          Chat with my resume
        </h3>
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          Use the AI assistant to ask about my background, tech stack, or projects. Click below to open the chat.
        </p>
        <button
          type="button"
          onClick={onOpenChat}
          className="btn-primary mt-6"
        >
          Open AI Chat
        </button>
      </div>
    </Section>
  );
}
