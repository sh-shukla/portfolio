import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-8 text-center border-t border-border/50 space-y-4">
      <button onClick={scrollToTop} className="inline-flex items-center justify-center w-16 h-16 glass-morphism-strong rounded-full group premium-hover">
        <ArrowUp className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
      </button>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Shashank Shukla. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
