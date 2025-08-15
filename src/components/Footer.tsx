import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <button 
              onClick={scrollToTop}
              className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity duration-300"
            >
              Shashank Shukla
            </button>
            <p className="text-muted-foreground mt-2">
              DevOps & SRE Engineer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://linkedin.com/in/shashank-shukla" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://github.com/shashank-shukla" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="mailto:shashank.shukla1202@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-right md:text-right text-center">
            <p className="text-muted-foreground flex items-center justify-center md:justify-end">
              Made with <Heart className="mx-1 h-4 w-4 text-red-500" fill="currentColor" /> 
              © {currentYear}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            "Driving efficiency, scalability, and reliability through automation and innovation"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;