import { useCallback, useEffect, useState } from "react";
import Spotlight from "@/components/Spotlight";
import MobileBar from "@/components/MobileBar";
import Sidebar from "@/components/Sidebar";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import Toast from "@/components/Toast";
import { useTheme } from "@/lib/theme";
import { useActiveSection } from "@/lib/useActiveSection";

export default function App() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection();
  const [palette, setPalette] = useState(false);
  const closePalette = useCallback(() => setPalette(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div aria-hidden className="aura-wrap">
        <div className="aura" />
      </div>
      <Spotlight />
      <div id="top" className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        <MobileBar active={active} theme={theme} onToggleTheme={toggle} />
        <div className="mx-auto max-w-page px-5 sm:px-8 lg:flex lg:justify-between lg:gap-12 lg:px-12">
          <Sidebar active={active} theme={theme} onToggleTheme={toggle} />
          <main id="main" className="pb-12 pt-12 sm:pt-16 lg:w-[52%] lg:pb-20 lg:pt-16">
            <About />
            <Work />
            <Experience />
            <Skills />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
      <CommandPalette open={palette} onClose={closePalette} theme={theme} onToggleTheme={toggle} />
      <Toast />
    </>
  );
}
