import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const SectionSeparator = () => (
  <div className="relative h-20 flex items-center justify-center">
    {/* Elegant ornamental design */}
    <div className="relative flex items-center">
      {/* Left ornament */}
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-primary/20 rounded-full" />
        <div className="w-1 h-1 bg-primary/30 rounded-full" />
        <div className="w-20 h-px bg-gradient-to-r from-primary/40 to-primary/10" />
      </div>
      
      {/* Center jewel */}
      <div className="relative mx-8">
        <div className="w-4 h-4 bg-gradient-to-br from-primary/40 to-primary/10 rotate-45 rounded-sm border border-primary/20" />
        <div className="absolute top-1 left-1 w-2 h-2 bg-primary/60 rotate-45 rounded-sm" />
      </div>
      
      {/* Right ornament */}
      <div className="flex items-center space-x-2">
        <div className="w-20 h-px bg-gradient-to-l from-primary/40 to-primary/10" />
        <div className="w-1 h-1 bg-primary/30 rounded-full" />
        <div className="w-2 h-2 bg-primary/20 rounded-full" />
      </div>
    </div>
  </div>
);

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleLoadingComplete = () => {
    setIsCollapsed(true);
    setTimeout(() => setShowLoading(false), 100);
  };

  return (
    <>
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} isCollapsed={isCollapsed} />
        )}
      </AnimatePresence>
      
      <div 
        className="min-h-screen bg-background" 
        style={{ 
          opacity: showLoading && !isCollapsed ? 0 : 1, 
          transition: 'opacity 0.3s ease-in-out' 
        }}
      >
        <Header isCollapsed={isCollapsed} />
        <main>
          <Hero />
          <SectionSeparator />
          <About />
          <SectionSeparator />
          <Experience />
          <SectionSeparator />
          <Projects />
          <SectionSeparator />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;