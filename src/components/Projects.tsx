import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, TrendingDown, Zap, Shield, Cloud, Cpu, GitBranch, Database } from "lucide-react";

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
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Key projects showcasing DevOps automation and Backend development expertise
          </p>
        </div>

        {/* DevOps Projects */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-2">DevOps & Infrastructure</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingDown,
                title: "AWS Cost Optimization",
                description: "Consolidated 20+ ALBs into single architecture, achieving 95% cost reduction.",
                metrics: "95% Cost Saved",
                tech: ["AWS ALB", "Terraform", "Cost Analysis"]
              },
              {
                icon: Zap,
                title: "Kubernetes Auto-scaling",
                description: "Implemented KEDA autoscaling with Karpenter for dynamic resource management.",
                metrics: "25% Compute Savings",
                tech: ["KEDA", "Karpenter", "Kubernetes"]
              },
              {
                icon: Shield,
                title: "Infrastructure as Code",
                description: "Built comprehensive Terraform modules for multi-environment deployments.",
                metrics: "5 Environments",
                tech: ["Terraform", "IaC", "Multi-env"]
              },
              {
                icon: GitBranch,
                title: "CI/CD Automation",
                description: "Designed CI/CD pipelines with canary deployments and automated workflows.",
                metrics: "40% Time Saved",
                tech: ["Jenkins", "GitLab CI", "Helm"]
              }
            ].map((project, index) => (
              <Card key={index} className="glass-effect hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-primary/10 mb-4 w-fit">
                    <project.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <Badge className="bg-primary/20 text-primary mb-3">{project.metrics}</Badge>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Backend Project */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-2">Backend Engineering</h3>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="glass-effect hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-4 rounded-lg bg-primary/10 mr-6">
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">CRM Data Migration Orchestrator</h3>
                    <p className="text-muted-foreground">Event-driven orchestration platform for seamless CRM data migration</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Key Features</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• DAG-based workflow management</li>
                      <li>• Real-time state tracking and monitoring</li>
                      <li>• 500+ concurrent process handling</li>
                      <li>• Zero data loss architecture</li>
                      <li>• Event-driven microservices design</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "FastAPI", "Apache Kafka", "MongoDB", "Event Architecture", "DAGs", "Microservices"].map((tech, i) => (
                        <Badge key={i} className="bg-primary/20 text-primary">{tech}</Badge>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Badge className="bg-green-500/20 text-green-400">500+ Concurrent Processes</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Projects;