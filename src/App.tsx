import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTheme } from "@/lib/theme";
import { useActiveSection } from "@/lib/useActiveSection";

export default function App() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <Nav active={active} theme={theme} onToggleTheme={toggle} />
      <Hero theme={theme} onToggleTheme={toggle} />
      <main id="main" tabIndex={-1} className="outline-none">
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
