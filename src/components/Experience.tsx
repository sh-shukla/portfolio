import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Experience = () => {


  const experiences = [
    {
      title: "Senior DevOps Engineer",
      company: "Nielsen",
      period: "Jun 2025 - Present",
      achievements: [
        "Built from scratch a private-cloud deployment platform that ships the full product into each customer's own AWS or GCP account from one config file (Pulumi, Terraform, Argo CD GitOps) — deployments cut from 6–7 hours to 48 minutes; 4 live customers run their releases on it",
        "AI incident response — Prometheus alerts trigger Amazon Bedrock LLMs grounded in an org knowledge graph of docs and runbooks; ~60% of Kubernetes alerts auto-resolve, the rest go to on-call with full context",
        "Self-hosted 2 small language models (SLMs) on EKS, run as a fleet via a custom Kubernetes CRD, at ~4x lower cost",
        "Built the observability stack (Prometheus, Alertmanager, Loki, Grafana) and rolled out incident.io for alert routing, incident response and on-call support rotations",
        "Led a 4-member DevOps team supporting 5–6 application teams; owned GitLab CI, JFrog Artifactory + Vault and a Docusaurus developer portal",
        "Architected end-to-end infra for a real-time Ads platform with <10ms latency — ScyllaDB/Aerospike POC, AWS Local Zones & Global Accelerator",
        "EKS reliability across 8+ clusters — zero-downtime v1.32→v1.34 upgrades, NodeLocalDNS, Node Problem Detector, Registry Proxy Cache & blue-green deployments; node memory swap cut OOM kills ~70%",
        "Cut infrastructure costs 25-40% — consolidated 20+ ALBs behind NGINX Ingress (95% lower load balancer spend), Graviton ARM adoption with multi-arch builds, and Karpenter right-sizing",
        "Hardened cluster security with Kyverno admission policies, Vault dynamic secrets (K8s auth + AWS STS), and led CrowdStrike remediation across 15+ AWS accounts"
      ],
      technologies: ["EKS", "GCP", "Pulumi", "Terraform", "Argo CD", "Amazon Bedrock", "SLMs", "Kubernetes CRDs", "Prometheus", "Loki", "Grafana", "incident.io", "Karpenter", "Graviton", "NGINX Ingress", "Kyverno", "Vault", "GitLab CI"]
    },
    {
      title: "Associate → Senior DevOps Engineer",
      company: "Conga",
      period: "Jul 2021 - Jun 2025 (4 years)",
      achievements: [
        "Led a 6-member DevOps/SRE team, setting deployment standards, runbooks and SRE practices",
        "Built SaaS API platform with FastAPI (60+ endpoints), integrated CI/CD & canary rollouts",
        "Implemented KEDA-based autoscaling for NGINX and SQS consumers",
        "Built workflow orchestration tool for data migration lifecycle management",
        "Rolled out the observability stack and Doppler secrets management, halving MTTR",
        "Automated infrastructure with Terraform, reduced release cycles 2 weeks → 3 hours",
        "Created templatized Helm charts, cutting deployment setup time by 40%",
      ],
      technologies: ["FastAPI", "KEDA", "Terraform", "Kubernetes", "Helm", "Python", "Prometheus", "Grafana", "Doppler"]
    }
  ];

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/5 to-background" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-secondary/15 rounded-full blur-3xl opacity-60" />
      <div className="container-premium relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-premium mb-6">Professional Experience</h2>
          <p className="subheading-premium max-w-4xl mx-auto">
            5+ years shipping production infrastructure at scale across Kubernetes, AWS, AI/ML workloads, and security-first automation.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Clean Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Simple Timeline Dot */}
                  <div className="absolute left-4 w-4 h-4 bg-primary rounded-full border-2 border-background hidden md:block"></div>
                  
                  <Card className="ml-0 md:ml-16 glass-morphism-strong smooth-hover">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <motion.h3 
                          className="text-2xl font-bold mb-2 cursor-pointer hover:text-primary transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            const urls = {
                              'Nielsen': 'https://www.linkedin.com/company/nielsen/about/',
                              'Conga': 'https://www.linkedin.com/company/conga/about/'
                            };
                            window.open(urls[exp.company as keyof typeof urls], '_blank');
                          }}
                        >
                          {exp.company} ↗
                        </motion.h3>
                        <p className="text-lg font-medium text-muted-foreground mb-1">{exp.title}</p>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3 text-base">Key Achievements</h4>
                          <div className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-start p-3 rounded-lg bg-secondary/30">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                <span className="text-sm leading-relaxed">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 pt-3">
                          {exp.technologies.map((tech, i) => (
                            <motion.div
                              key={i}
                              className="relative group"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              whileHover={{ y: -1 }}
                              viewport={{ once: true }}
                            >
                              <div className="absolute inset-0 bg-black/20 rounded-md blur-sm transform translate-y-0.5 group-hover:translate-y-1 transition-transform"></div>
                              <Badge className="relative bg-secondary/80 text-muted-foreground border border-border text-xs px-2 py-1 font-normal shadow-sm">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;