import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, MapPin, Cloud, GitBranch, Database, TrendingUp } from "lucide-react";

const About = () => {
  const skillCategories = {
    "Cloud & Infrastructure": [
      "AWS (EC2, EKS, ALB, SQS, CloudWatch, Lambda)",
      "Kubernetes & Docker",
      "Terraform & Infrastructure as Code",
      "Multi-environment Management"
    ],
    "Backend & API Development": [
      "Python & FastAPI (60+ Production APIs)",
      "MongoDB & Database Design", 
      "Apache Kafka & Event Streaming",
      "Event-Driven Architecture & Microservices",
      "Custom Orchestrator Design (DAG-based)",
      "Data Migration & ETL Systems"
    ],
    "DevOps & Automation": [
      "CI/CD (Jenkins, GitLab CI, Spinnaker)",
      "Helm Charts & Package Management",
      "KEDA Autoscaling",
      "GitOps & Rancher Fleet"
    ],
    "Monitoring & SRE": [
      "Prometheus & Grafana",
      "Observability Stack",
      "Incident Response",
      "Performance Optimization"
    ],
    "Orchestration & Workflow": [
      "Custom Orchestrator Design",
      "Event-Driven Architecture",
      "Data Migration Systems",
      "Workflow Management (Airflow-like)"
    ]
  };

  const certifications = [
    { name: "Certified Kubernetes Administrator (CKA)", icon: Award, image: "/cka.png" },
    { name: "HashiCorp Certified: Terraform Associate", icon: Award, image: "/terraform-certification.png" },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            DevOps & SRE Engineer with 4.5+ years of experience specializing in automation, 
            cost optimization, and reliability engineering. Passionate about building scalable 
            infrastructure and driving operational efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Profile Info */}
          <div className="space-y-8">
            <Card className="glass-effect animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <GraduationCap className="mr-3 text-primary" size={24} />
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">B.Tech in Computer Science & Engineering</h4>
                    <p className="text-muted-foreground">M.S. Ramaiah University of Applied Sciences</p>
                    <p className="text-sm text-muted-foreground">2017-2021 | CGPA: 9.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Award className="mr-3 text-primary" size={24} />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                      <img 
                        src={cert.image} 
                        alt={cert.name}
                        className="w-10 h-10 mr-3 rounded object-contain bg-white p-1"
                      />
                      <span className="text-sm font-medium">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect animate-fade-in" style={{ animationDelay: '400ms' }}>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <MapPin className="mr-3 text-primary" size={24} />
                  Location & Contact
                </h3>
                <div className="space-y-2">
                  <p><strong>Location:</strong> Bangalore, India</p>
                  <p><strong>Email:</strong> shashank.shukla1202@gmail.com</p>
                  <p><strong>Phone:</strong> +91 7737602733</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6 text-center">Technical Expertise</h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="w-8 h-8 object-contain" />
                    </div>
                    <h4 className="font-bold text-primary mb-2">Cloud</h4>
                    <p className="text-xs text-muted-foreground">AWS, Kubernetes, Docker</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <img src="/devops.jpg" alt="DevOps" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <h4 className="font-bold text-primary mb-2">DevOps</h4>
                    <p className="text-xs text-muted-foreground">CI/CD, Terraform, Helm</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" className="w-8 h-8 object-contain" />
                    </div>
                    <h4 className="font-bold text-primary mb-2">Backend</h4>
                    <p className="text-xs text-muted-foreground">Python, FastAPI, Kafka</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg" alt="Prometheus" className="w-8 h-8 object-contain" />
                    </div>
                    <h4 className="font-bold text-primary mb-2">SRE</h4>
                    <p className="text-xs text-muted-foreground">Prometheus, Grafana</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Impact Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-primary/5">
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-xs text-muted-foreground">Cost Reduction</div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5">
                    <div className="text-2xl font-bold text-primary">10+</div>
                    <div className="text-xs text-muted-foreground">Teams Supported</div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Workflows</div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5">
                    <div className="text-2xl font-bold text-primary">0%</div>
                    <div className="text-xs text-muted-foreground">Data Loss</div>
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

export default About;