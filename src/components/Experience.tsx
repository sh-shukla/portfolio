import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior DevOps Engineer",
      company: "Nielsen",
      period: "Jun 2025 - Present",
      location: "Bangalore, India",
      achievements: [
        "AWS ALB consolidation reducing cloud spend by 95%",
        "Built AI-powered documentation platform reducing support requests by 60%",
        "Optimized Karpenter for 25% compute cost savings"
      ],
      technologies: ["AWS", "Kubernetes", "AI Platform", "Karpenter", "ALB"]
    },
    {
      title: "Senior DevOps Engineer",
      company: "Conga",
      period: "Apr 2024 - Jun 2025",
      location: "Bangalore, India",
      achievements: [
        "Implemented KEDA autoscaling for dynamic workload management",
        "Led team initiatives and mentored junior engineers",
        "Developed SaaS API platform with 60+ FastAPI endpoints",
        "Designed orchestration tools for streamlined operations"
      ],
      technologies: ["KEDA", "FastAPI", "SaaS", "Team Leadership", "Orchestration"]
    },
    {
      title: "DevOps Engineer",
      company: "Conga",
      period: "Apr 2023 - Mar 2024",
      location: "Bangalore, India",
      achievements: [
        "Automated infrastructure with Terraform modules",
        "Built comprehensive observability stack",
        "Streamlined microservice deployments",
        "Reduced deployment time by 40% with automation"
      ],
      technologies: ["Terraform", "Observability", "Microservices", "Automation"]
    },
    {
      title: "Associate DevOps Engineer",
      company: "Conga",
      period: "Jul 2021 - Mar 2023",
      location: "Bangalore, India",
      achievements: [
        "Created templatized Helm charts reducing setup time by 40%",
        "Implemented CI/CD automation workflows",
        "Established best practices for container orchestration",
        "Contributed to infrastructure standardization"
      ],
      technologies: ["Helm", "CI/CD", "Docker", "Infrastructure as Code"]
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

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block glow-effect"></div>
                  
                  <Card className="ml-0 md:ml-20 glass-effect hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-primary mb-1">{exp.title}</h3>
                          <div className="flex items-center text-lg font-semibold mb-2">
                            <Building className="mr-2 h-5 w-5 text-muted-foreground" />
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end space-y-1">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">Key Achievements:</h4>
                          <ul className="space-y-1 text-muted-foreground">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-primary mr-2 mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                              >
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