import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import profileImage from "@/assets/shashank-profile.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { number: "4.5+", label: "Years of Experience" },
    { number: "20+", label: "Projects Deployed" },
    { number: "95%", label: "Cost Reduction" },
    { number: "60%", label: "Efficiency Improvement" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in">
            <div className="space-y-4">
              <p className="text-primary font-medium">DevOps & SRE Engineer</p>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Hello I'm{" "}
                <span className="gradient-text">
                  Shashank Shukla
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                🚀 From Bangalore | AWS & Kubernetes Specialist | 
                Driving efficiency, scalability, and reliability through automation and innovation
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-effect"
              >
                Let's Connect <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            <div className="flex space-x-6">
              <a 
                href="https://linkedin.com/in/shashank-shukla" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://github.com/shashank-shukla" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github size={24} />
              </a>
              <a 
                href="mailto:shashank.shukla1202@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center animate-fade-in">
            <div className="relative">
              <div className="w-80 h-80 rounded-full border-4 border-primary glow-effect floating">
                <img
                  src={profileImage}
                  alt="Shashank Shukla"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-full animate-glow"></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;