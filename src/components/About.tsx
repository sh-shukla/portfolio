import { Card, CardContent } from "@/components/ui/card";
import { Award, GraduationCap, MapPin, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [expandedMetric, setExpandedMetric] = useState<number | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({ title: "Copied!", description: `${field} copied to clipboard` });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({ title: "Error", description: "Failed to copy", variant: "destructive" });
    }
  };

  const certifications = [
    { name: "Certified Kubernetes Administrator (CKA)", icon: Award, image: "/cka.png" },
    { name: "HashiCorp Certified: Terraform Associate", icon: Award, image: "/terraform-certification.png" },
  ];

  const techStack = [
    {
      title: "Cloud Infrastructure",
      description: "AWS (EC2, EKS, ALB, Lambda), Kubernetes, Docker, Multi-Cloud",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      title: "DevOps & Automation",
      description: "CI/CD Pipelines, Terraform, Helm Charts, Jenkins, GitLab CI, Spinnaker",
      image: "/devops.jpg",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Backend Engineering",
      description: "Python, FastAPI (60+ APIs), Apache Kafka, MongoDB, Event-Driven Architecture",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "SRE & Monitoring",
      description: "Prometheus, Grafana, CloudWatch, Observability Stack, KEDA Autoscaling",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  const metrics = [
    { 
      value: "95%", 
      label: "AWS Cost Reduction", 
      description: "ALB Consolidation",
      details: [
        "Analyzed 20+ Application Load Balancers across multiple environments",
        "Designed single ALB architecture with intelligent path-based routing",
        "Implemented listener rules and target groups for service isolation",
        "Migrated services with zero downtime using blue-green deployment",
        "Achieved 95% cost reduction through resource optimization"
      ]
    },
    { 
      value: "10+", 
      label: "Product Teams", 
      description: "DevOps Support",
      details: [
        "Provided DevOps expertise across e-commerce, fintech, and healthcare verticals",
        "Established CI/CD pipelines for diverse technology stacks (Node.js, Python, Java)",
        "Created standardized deployment templates and infrastructure as code",
        "Conducted knowledge transfer sessions and technical mentoring",
        "Implemented monitoring and alerting strategies for each product team"
      ]
    },
    { 
      value: "500+", 
      label: "Concurrent Processes", 
      description: "Data Migration Platform",
      details: [
        "Built custom orchestration platform using Python and Celery",
        "Implemented DAG-based workflow management for complex dependencies",
        "Designed fault-tolerant system with automatic retry mechanisms",
        "Created real-time monitoring dashboard for process tracking",
        "Achieved zero data loss during large-scale CRM migrations"
      ]
    },
    { 
      value: "100+", 
      label: "Microservices", 
      description: "Multi-Environment Management",
      details: [
        "Managed microservices across 5 environments (dev, qa, stage, perf, prod)",
        "Implemented service mesh using Istio for secure inter-service communication",
        "Configured auto-scaling policies based on CPU, memory, and custom metrics",
        "Established comprehensive logging and distributed tracing",
        "Maintained 99.9% uptime across all services and environments"
      ]
    },
    { 
      value: "40%", 
      label: "Setup Time Reduction", 
      description: "Helm Chart Templates",
      details: [
        "Created reusable Helm chart templates for common deployment patterns",
        "Standardized configuration management across all environments",
        "Implemented automated testing and validation for Helm charts",
        "Reduced new service deployment time from 4 hours to 2.4 hours",
        "Established best practices documentation and training materials"
      ]
    },
    { 
      value: "50%", 
      label: "MTTR Reduction", 
      description: "Observability Implementation",
      details: [
        "Deployed Prometheus and Grafana stack for comprehensive monitoring",
        "Created custom dashboards for application and infrastructure metrics",
        "Implemented proactive alerting with PagerDuty integration",
        "Established incident response procedures and runbooks",
        "Reduced Mean Time To Recovery from 2 hours to 1 hour"
      ]
    }
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-40" />
      <div className="container-premium relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="heading-premium mb-6">About Me</h2>
          <p className="subheading-premium max-w-4xl mx-auto">
            DevOps & SRE Engineer with 4.5+ years of experience specializing in automation, 
            cost optimization, and reliability engineering. Passionate about building scalable 
            infrastructure and driving operational efficiency.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-morphism-strong premium-hover h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-morphism rounded-full mr-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Education</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">B.Tech in Computer Science</h4>
                    <p className="text-muted-foreground mb-1">M.S. Ramaiah University of Applied Sciences</p>
                    <p className="text-sm text-muted-foreground">2017-2021 | CGPA: 9.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-morphism-strong premium-hover h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-morphism rounded-full mr-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 glass-morphism rounded-xl smooth-hover"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img 
                        src={cert.image} 
                        alt={cert.name}
                        className="w-12 h-12 mr-4 rounded-lg object-contain bg-white p-2"
                      />
                      <span className="text-sm font-medium">{cert.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="glass-morphism-strong premium-hover h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-morphism rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Location & Contact</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-muted-foreground">Bangalore, India</p>
                  </div>
                  <motion.div 
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => copyToClipboard("shashank.shukla1202@gmail.com", "Email")}
                  >
                    <p className="font-medium mb-1 flex items-center">
                      Email
                      <motion.div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedField === "Email" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </motion.div>
                    </p>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">shashank.shukla1202@gmail.com</p>
                  </motion.div>
                  <motion.div 
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => copyToClipboard("+91 7737602733", "Phone")}
                  >
                    <p className="font-medium mb-1 flex items-center">
                      Phone
                      <motion.div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedField === "Phone" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </motion.div>
                    </p>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">+91 7737602733</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Technical Expertise */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold gradient-text mb-4">Technical Expertise</h3>
            <p className="text-muted-foreground text-lg">Core technologies and platforms I work with</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="text-center glass-morphism-strong p-8 rounded-2xl premium-hover group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ y: -12, scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <img src={tech.image} alt={tech.title} className="w-10 h-10 object-contain" />
                </motion.div>
                <h4 className="font-bold text-lg mb-2">{tech.title}</h4>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card className="glass-morphism-strong">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Impact Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 glass-morphism rounded-xl smooth-hover group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.4 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    onClick={() => setExpandedMetric(expandedMetric === index ? null : index)}
                  >
                    <motion.div
                      className="text-4xl font-bold gradient-text-premium mb-2"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.6 + index * 0.1, type: "spring" }}
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-sm font-semibold mb-1">{metric.label}</div>
                    <div className="text-xs text-muted-foreground mb-2">{metric.description}</div>
                    
                    <div className="text-xs text-primary/60 mt-2 opacity-70">
                      💡 Click for details
                    </div>
                    
                    {expandedMetric === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-primary/20 text-left"
                      >
                        <div className="space-y-2">
                          {metric.details.map((detail, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start text-xs text-muted-foreground"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                              {detail}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;