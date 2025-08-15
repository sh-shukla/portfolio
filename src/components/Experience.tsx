import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior DevOps Engineer",
      company: "Nielsen",
      period: "Jun 2025 - Present",
      achievements: [
        "Consolidated 20+ ALBs into single ALB, reducing AWS costs by 95%",
        "Built AI-powered DevOps self-service documentation, reducing support tickets",
        "Optimized Karpenter node scaling, improving infrastructure cost efficiency"
      ],
      technologies: ["AWS ALB", "AI Platform", "Karpenter", "Cost Optimization"]
    },
    {
      title: "Associate → Senior DevOps Engineer",
      company: "Conga",
      period: "Jul 2021 - Jun 2025 (4 years)",
      achievements: [
        "Led 6-engineer DevOps team, creating deployment standards & runbooks",
        "Built SaaS API platform with FastAPI (60+ endpoints), integrated CI/CD & canary rollouts",
        "Implemented KEDA-based autoscaling for NGINX and SQS consumers",
        "Built workflow orchestration tool for data migration lifecycle management",
        "Automated infrastructure with Terraform, reduced release cycles 2 weeks → 3 hours",
        "Created templatized Helm charts, cutting deployment setup time by 40%",
        "Built observability stack cutting MTTR by ~50%"
      ],
      technologies: ["FastAPI", "KEDA", "Terraform", "Kubernetes", "Helm", "Python", "Prometheus", "Grafana"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey of continuous growth and innovation in DevOps and Site Reliability Engineering
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block glow-effect"></div>
                  
                  <Card className="ml-0 md:ml-20 glass-effect hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold gradient-text mb-1">{exp.company}</h3>
                          <p className="text-lg font-semibold text-muted-foreground mb-1">{exp.title}</p>
                          <p className="text-sm text-muted-foreground">{exp.period}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-4 flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                            Key Achievements
                          </h4>
                          <div className="space-y-3">
                            {exp.achievements.map((achievement, i) => (
                              <div 
                                key={i} 
                                className="group flex items-start p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                                style={{ animationDelay: `${i * 100}ms` }}
                              >
                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform group-hover:shadow-[0_0_10px_rgba(156,163,175,0.8)]"></div>
                                <span className="text-sm text-foreground leading-relaxed group-hover:text-gray-200 transition-colors">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <Badge key={i} className="bg-primary/20 text-primary text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;