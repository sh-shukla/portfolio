import { Github, Linkedin, Mail, ArrowUp, Code, Server, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/shashank-shukla-b84b7a162", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Github, href: "https://github.com/sh-shukla", label: "GitHub", color: "hover:text-purple-400" },
    { icon: Mail, href: "mailto:shashank.shukla1202@gmail.com", label: "Email", color: "hover:text-green-400" }
  ];

  const floatingIcons = [
    { icon: Code, delay: 0, x: 20, y: 30 },
    { icon: Server, delay: 1, x: -30, y: 20 },
    { icon: Cloud, delay: 2, x: 40, y: -20 }
  ];

  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
      
      {/* Floating Background Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5"
          style={{ left: `${20 + index * 30}%`, top: `${30 + index * 20}%` }}
          animate={{
            x: [0, item.x, 0],
            y: [0, item.y, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <item.icon size={60} />
        </motion.div>
      ))}

      <div className="container-premium relative z-10">
        <div className="text-center mb-12">
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center w-16 h-16 glass-morphism-strong rounded-full mb-8 group premium-hover"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ArrowUp className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
          </motion.button>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold gradient-text-premium mb-4">Shashank Shukla</h3>
            <p className="text-xl text-muted-foreground mb-8">DevOps & SRE Engineer</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 glass-morphism rounded-full text-muted-foreground ${social.color} transition-all duration-300 group`}
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <social.icon size={24} className="group-hover:scale-110 transition-transform" />
              </motion.a>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-morphism p-8 rounded-2xl">
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                "Driving efficiency, scalability, and reliability through automation and innovation"
              </blockquote>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
            </div>
          </motion.div>

          {/* Skills Highlight */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
          >
            {[
              { label: "AWS Expert", value: "4.5+ Years" },
              { label: "Kubernetes", value: "CKA Certified" },
              { label: "Cost Savings", value: "95% Achieved" },
              { label: "Team Support", value: "10+ Teams" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 glass-morphism rounded-xl"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-sm font-semibold text-primary mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Final Message */}
          <motion.div
            className="border-t border-border/50 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              Ready to optimize your infrastructure? Let's connect and build something amazing together.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;