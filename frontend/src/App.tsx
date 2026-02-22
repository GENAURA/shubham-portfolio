import { useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Achievements } from "./components/Achievements";
import { Contact } from "./components/Contact";
import { AIChatSection } from "./components/AIChatSection";
import { Chat } from "./components/Chat";

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-zinc-200 antialiased">
      <Nav onOpenChat={() => setChatOpen(true)} />
      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
        <AIChatSection onOpenChat={() => setChatOpen(true)} />
      </main>
      <Chat open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}

export default App;
