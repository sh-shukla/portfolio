import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Server, 
  Database, 
  GitBranch, 
  Shield, 
  Zap, 
  Settings, 
  TrendingUp,
  Code,
  Monitor
} from "lucide-react";

const Expertise = () => {
  const devopsExperience = [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "AWS expertise with EC2, EKS, ALB, SQS, CloudWatch, Lambda. Achieved 95% cost reduction through ALB consolidation.",
      achievements: ["95% Cost Reduction", "Multi-environment Setup", "Auto-scaling Implementation"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Settings,
      title: "Container Orchestration",
      description: "Kubernetes mastery with KEDA autoscaling, Helm charts, and GitOps workflows using Rancher Fleet.",
      achievements: ["500+ Concurrent Processes", "Zero Downtime Deployments", "Templatized Helm Charts"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: GitBranch,
      title: "CI/CD & Automation",
      description: "Built robust CI/CD pipelines with Jenkins, GitLab CI, Spinnaker. Implemented canary deployments and automated workflows.",
      achievements: ["40% Setup Time Reduction", "Automated Workflows", "Canary Deployments"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Monitor,
      title: "Observability & SRE",
      description: "Comprehensive monitoring with Prometheus, Grafana, and observability stack. Focus on reliability and performance.",
      achievements: ["60% Support Reduction", "Proactive Monitoring", "Incident Response"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const backendExperience = [
    {
      icon: Code,
      title: "API Development",
      description: "Built 60+ production FastAPI endpoints with event-driven architecture and comprehensive SaaS platform.",
      achievements: ["60+ API Endpoints", "Event-Driven Design", "SaaS Platform"],
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Database,
      title: "Data Architecture",
      description: "Designed resilient data migration systems with MongoDB, Apache Kafka, and custom orchestration platforms.",
      achievements: ["Zero Data Loss", "Custom Orchestrator", "Event Streaming"],
      color: "from-teal-500 to-green-500"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimized system performance with Karpenter, achieved 25% compute cost savings and efficient resource utilization.",
      achievements: ["25% Cost Savings", "Dynamic Scaling", "Resource Optimization"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Infrastructure as Code",
      description: "Terraform expertise for automated infrastructure deployment across multiple environments with security best practices.",
      achievements: ["Multi-environment IaC", "Security Compliance", "Automated Deployment"],
      color: "from-rose-500 to-pink-500"
    }
  ];

  const ExperienceCard = ({ experience, index, delay }: { experience: any, index: number, delay: number }) => (
    <Card 
      className="glass-effect hover:shadow-xl transition-all duration-500 group overflow-hidden animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6 relative">
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${experience.color} opacity-10 rounded-bl-full`}></div>
        
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${experience.color} bg-opacity-20 mr-4 group-hover:scale-110 transition-transform duration-300`}>
            <experience.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
            {experience.title}
          </h3>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {experience.description}
        </p>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-primary">Key Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {experience.achievements.map((achievement: string, i: number) => (
              <Badge 
                key={i} 
                className={`bg-gradient-to-r ${experience.color} text-white hover:scale-105 transition-transform duration-200`}
              >
                {achievement}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="expertise" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive expertise across DevOps/SRE and Backend Engineering domains
          </p>
        </div>

        {/* DevOps/SRE Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Server className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold gradient-text mb-2">DevOps & SRE</h3>
            <p className="text-muted-foreground">Infrastructure, automation, and reliability engineering</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devopsExperience.map((experience, index) => (
              <ExperienceCard 
                key={index} 
                experience={experience} 
                index={index} 
                delay={index * 100} 
              />
            ))}
          </div>
        </div>

        {/* Backend Engineering Section */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold gradient-text mb-2">Backend Engineering</h3>
            <p className="text-muted-foreground">API development, data architecture, and system optimization</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {backendExperience.map((experience, index) => (
              <ExperienceCard 
                key={index} 
                experience={experience} 
                index={index} 
                delay={(index + 4) * 100} 
              />
            ))}
          </div>
        </div>

        {/* Professional Journey Highlight */}
        <div className="mt-16 text-center">
          <Card className="glass-effect glow-effect max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="h-12 w-12 text-primary mr-4" />
                <div>
                  <h3 className="text-2xl font-bold gradient-text">Professional Journey</h3>
                  <p className="text-muted-foreground">4.5+ years of continuous growth and innovation</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="text-3xl font-bold text-primary mb-2">2021-2025</div>
                  <div className="text-sm font-semibold mb-1">Conga</div>
                  <div className="text-xs text-muted-foreground">DevOps Engineer → Senior DevOps Engineer</div>
                </div>
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="text-3xl font-bold text-primary mb-2">2025-Present</div>
                  <div className="text-sm font-semibold mb-1">Nielsen</div>
                  <div className="text-xs text-muted-foreground">Senior DevOps Engineer</div>
                </div>
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="text-3xl font-bold text-primary mb-2">Future</div>
                  <div className="text-sm font-semibold mb-1">Innovation</div>
                  <div className="text-xs text-muted-foreground">Continuous Learning & Growth</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Expertise;