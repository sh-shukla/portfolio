import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { number: "4.5+", label: "Years of Experience" },
    { number: "100+", label: "Microservices Managed" },
    { number: "10+", label: "Product Teams Supported" },
    { number: "95%", label: "Cost Reduction Achieved" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Interactive mouse follower */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <motion.p 
                className="text-primary font-medium text-lg tracking-wide mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                DevOps & SRE Engineer
              </motion.p>
              
              <h1 className="heading-premium">
                Hello I'm{" "}
                <motion.span
                  className="gradient-text-premium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Shashank Shukla
                </motion.span>
              </h1>
              
              <motion.p
                className="subheading-premium max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                🚀 From Bangalore | AWS & Kubernetes Specialist | 
                Driving efficiency, scalability, and reliability through automation and innovation
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="glass-morphism-strong premium-hover border-0 text-white font-medium px-8 py-6 text-lg"
              >
                Let's Connect <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="glass-morphism smooth-hover border-white/20 text-white hover:text-white px-8 py-6 text-lg"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = './Shashank_Shukla_DevOps_Resume.pdf';
                  link.download = 'Shashank_Shukla_DevOps_Resume.pdf';
                  link.click();
                }}
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </motion.div>

            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/shashank-shukla-b84b7a162/" },
                { icon: Github, href: "https://github.com/sh-shukla" },
                { icon: Mail, href: "mailto:shashank.shukla1202@gmail.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-morphism smooth-hover rounded-full text-white/70 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full glass-morphism-strong floating overflow-hidden">
                <img
                  src="./shashank_pic.jpg"
                  alt="Shashank Shukla"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Animated rings */}
              <motion.div
                className="absolute -inset-4 border-2 border-primary/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 border border-primary/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center glass-morphism p-6 rounded-2xl smooth-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <motion.div
                className="text-4xl lg:text-5xl font-bold gradient-text-premium mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;