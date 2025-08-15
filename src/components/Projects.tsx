import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, TrendingDown, Zap, Shield, Cloud, Cpu, GitBranch, Database } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "AWS ALB Consolidation",
      description: "Consolidated 20+ AWS ALBs into a single ALB architecture, achieving 95% cost reduction while maintaining performance and reliability.",
      icon: TrendingDown,
      technologies: ["AWS ALB", "Terraform", "Cost Optimization", "Architecture"],
      metrics: "95% Cost Reduction",
      category: "Infrastructure"
    },
    {
      title: "AI-Powered DevOps Self-Service Platform",
      description: "Built an AI-based internal documentation hub that reduced support requests by 60% and improved developer productivity.",
      icon: Database,
      technologies: ["AI/ML", "FastAPI", "Documentation", "Automation"],
      metrics: "60% Support Reduction",
      category: "Platform"
    },
    {
      title: "CRM Data Migration Orchestrator",
      description: "Built a resilient event-driven orchestration platform for seamless CRM data migration. Features DAG-based workflow management, state tracking, and concurrent processing of 500+ workflows.",
      icon: GitBranch,
      technologies: ["Python", "FastAPI", "Kafka", "MongoDB", "Event Architecture", "DAGs"],
      metrics: "500+ Concurrent Processes",
      category: "Backend"
    },
    {
      title: "SaaS API Platform with Canary Rollouts",
      description: "Developed a comprehensive SaaS API platform with 60+ FastAPI endpoints and implemented CI/CD canary deployment strategies.",
      icon: Zap,
      technologies: ["FastAPI", "SaaS", "CI/CD", "Canary Deployments"],
      metrics: "60+ API Endpoints",
      category: "Development"
    },
    {
      title: "Kubernetes Scalable Architecture",
      description: "Designed and implemented scalable Kubernetes setups with auto-scaling capabilities, presented architecture to 200+ attendees.",
      icon: Cloud,
      technologies: ["Kubernetes", "KEDA", "Auto-scaling", "Architecture"],
      metrics: "200+ Attendees",
      category: "Architecture"
    },
    {
      title: "Infrastructure as Code (Terraform)",
      description: "Created comprehensive, reusable Terraform modules for automated multi-environment cloud infrastructure deployment.",
      icon: Shield,
      technologies: ["Terraform", "IaC", "Multi-environment", "Automation"],
      metrics: "Multi-environment",
      category: "Infrastructure"
    },
    {
      title: "Cloud Cost Optimization Suite",
      description: "Implemented Karpenter for dynamic node scaling achieving 25% compute cost savings and conducted comprehensive AWS cost audits.",
      icon: Cpu,
      technologies: ["Karpenter", "AWS", "Cost Optimization", "Node Scaling"],
      metrics: "25% Cost Savings",
      category: "Optimization"
    }
  ];

  const categories = ["All", "Infrastructure", "Platform", "Backend", "Development", "Architecture", "Optimization"];

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-background" />
      <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-primary/8 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/12 rounded-full blur-3xl opacity-50" />
      <div className="container-premium relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-premium mb-6">Featured Projects</h2>
          <p className="subheading-premium max-w-4xl mx-auto">
            Key projects showcasing DevOps automation and Backend development expertise
          </p>
        </motion.div>

        {/* DevOps Projects */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold gradient-text-premium mb-4">DevOps & Infrastructure</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingDown,
                title: "AWS Cost Optimization",
                description: "Consolidated 20+ ALBs into single architecture, achieving 95% cost reduction.",
                metrics: "95% Cost Saved",
                tech: ["AWS ALB", "Terraform", "Cost Analysis"],
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Zap,
                title: "Kubernetes Auto-scaling",
                description: "Implemented KEDA autoscaling with Karpenter for dynamic resource management.",
                metrics: "25% Compute Savings",
                tech: ["KEDA", "Karpenter", "Kubernetes"],
                gradient: "from-blue-500 to-purple-500"
              },
              {
                icon: Shield,
                title: "Infrastructure as Code",
                description: "Built comprehensive Terraform modules for multi-environment deployments.",
                metrics: "5 Environments",
                tech: ["Terraform", "IaC", "Multi-env"],
                gradient: "from-green-500 to-teal-500"
              },
              {
                icon: GitBranch,
                title: "CI/CD Automation",
                description: "Designed CI/CD pipelines with canary deployments and automated workflows.",
                metrics: "40% Time Saved",
                tech: ["Jenkins", "GitLab CI", "Helm"],
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="glass-morphism-strong premium-hover h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${project.gradient} opacity-10 rounded-bl-full`}></div>
                  <CardContent className="p-6 relative z-10">
                    <motion.div 
                      className={`p-4 rounded-xl bg-gradient-to-br ${project.gradient} mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <project.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                    <Badge className={`bg-gradient-to-r ${project.gradient} text-white mb-4 glow-pulse`}>{project.metrics}</Badge>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-secondary/30">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backend Project */}
        <div>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold gradient-text-premium mb-4">Backend Engineering</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism-strong premium-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-primary/60 opacity-5 rounded-bl-full"></div>
              <CardContent className="p-10 relative z-10">
                <div className="flex items-center mb-8">
                  <motion.div 
                    className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/60 mr-8 glow-pulse"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Database className="h-10 w-10 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold gradient-text-premium mb-3">CRM Data Migration Orchestrator</h3>
                    <p className="text-muted-foreground text-lg">Event-driven orchestration platform for seamless CRM data migration</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-bold text-primary mb-4 text-lg">Key Features</h4>
                    <div className="space-y-3">
                      {[
                        "DAG-based workflow management",
                        "Real-time state tracking and monitoring",
                        "500+ concurrent process handling",
                        "Zero data loss architecture",
                        "Event-driven microservices design"
                      ].map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start p-3 rounded-lg glass-morphism"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-4 text-lg">Technology Stack</h4>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {["Python", "FastAPI", "Apache Kafka", "MongoDB", "Event Architecture", "DAGs", "Microservices"].map((tech, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge className="bg-gradient-to-r from-primary to-primary/60 text-white px-3 py-1">{tech}</Badge>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg px-4 py-2 glow-pulse">
                        500+ Concurrent Processes
                      </Badge>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default Projects;