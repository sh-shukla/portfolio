import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, TrendingDown, Zap, Shield, Cloud, Cpu, GitBranch } from "lucide-react";

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
      icon: Zap,
      technologies: ["AI/ML", "FastAPI", "Documentation", "Automation"],
      metrics: "60% Support Reduction",
      category: "Platform"
    },
    {
      title: "SaaS API Platform with Canary Rollouts",
      description: "Developed a comprehensive SaaS API platform with 60+ FastAPI endpoints and implemented CI/CD canary deployment strategies.",
      icon: GitBranch,
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

  const categories = ["All", "Infrastructure", "Platform", "Development", "Architecture", "Optimization"];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A selection of impactful projects demonstrating expertise in DevOps, 
            SRE, and cloud infrastructure optimization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="glass-effect hover:shadow-lg transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <project.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    {project.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-primary">Impact</h4>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                      {project.metrics}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="text-xs bg-secondary/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground flex-1"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Projects
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;