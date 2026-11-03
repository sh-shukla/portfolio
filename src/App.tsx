import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-ink focus:shadow-tile"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
