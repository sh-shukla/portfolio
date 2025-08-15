import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, MapPin } from "lucide-react";

const About = () => {
  const skills = [
    "AWS (EC2, EKS, ALB, SQS, CloudWatch)",
    "Kubernetes",
    "Docker", 
    "Terraform",
    "Helm",
    "Jenkins",
    "Spinnaker",
    "GitLab CI",
    "Prometheus",
    "Grafana",
    "KEDA",
    "Python",
    "Bash",
    "Go"
  ];

  const certifications = [
    { name: "Certified Kubernetes Administrator (CKA)", icon: Award },
    { name: "HashiCorp Certified: Terraform Associate", icon: Award },
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
                    <div key={index} className="flex items-center">
                      <cert.icon className="mr-3 text-primary" size={20} />
                      <span>{cert.name}</span>
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
          <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Card className="glass-effect h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Core Technologies & Skills</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-primary">Expertise Areas</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Infrastructure Automation & Optimization</li>
                      <li>• Kubernetes & Container Orchestration</li>
                      <li>• CI/CD Pipeline Implementation</li>
                      <li>• Cloud Cost Optimization</li>
                      <li>• Site Reliability Engineering</li>
                      <li>• Monitoring & Observability</li>
                    </ul>
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