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
        "Built, solo, a bring-your-own-cloud deployment platform that provisions a customer's AWS or GCP account (VPC, EKS, RDS, DynamoDB, S3) with Pulumi, installs Argo CD and Karpenter, and deploys 40–45 microservices from a single config file — end-to-end installs and upgrades take 45 minutes instead of 6–7 hours, with 4 customers live in production",
        "Designed and built AI incident response — Prometheus alerts from 12 EKS clusters trigger Amazon Bedrock models grounded in a Bedrock Knowledge Base of runbooks and docs, which remediate common failures such as OOM kills automatically and route the rest to on-call through incident.io with a diagnosis attached",
        "Self-host two open-weight small language models on EKS as a fleet managed by a custom Kubernetes CRD, at ~4x lower inference cost than managed APIs",
        "Built the observability stack (Prometheus, Alertmanager, Loki, Grafana) and rolled out incident.io for alert routing, incident response and on-call support rotations",
        "Lead a 4-engineer DevOps team supporting 5–6 application teams including Ads and Sports; own GitLab CI, JFrog Artifactory with Vault integration and a Docusaurus developer portal",
        "Built from scratch and took to production the infrastructure for a real-time Ads platform targeting sub-10 ms responses — AWS Local Zones and Global Accelerator, after evaluating ScyllaDB and Aerospike with vendor teams",
        "Run 12 EKS clusters hosting 270+ microservices — zero-downtime v1.32→v1.34 upgrades, NodeLocalDNS, Node Problem Detector, Registry Proxy Cache & blue-green deployments; node memory swap cut OOM kills ~70%",
        "Cut AWS spend by ~$1,800/month by consolidating 20+ ALBs behind NGINX Ingress across 50+ services, and ~30% of compute cost by migrating to Graviton with multi-arch builds and Karpenter right-sizing",
        "Hardened clusters with Kyverno policies (mandatory resource limits, no privileged containers, workload health and autoscaling checks) and Vault dynamic secrets via Kubernetes and AWS STS auth; led CrowdStrike remediation across 15+ AWS accounts by rolling out patched AMIs fleet-wide"
      ],
      technologies: ["EKS", "GCP", "Pulumi", "Terraform", "Argo CD", "Amazon Bedrock", "SLMs", "Kubernetes CRDs", "Prometheus", "Loki", "Grafana", "incident.io", "Karpenter", "Graviton", "NGINX Ingress", "Kyverno", "Vault", "GitLab CI"]
    },
    {
      title: "Associate → Senior DevOps Engineer",
      company: "Conga",
      period: "Jul 2021 - Jun 2025 (4 years)",
      achievements: [
        "Led a 6-member DevOps/SRE team, setting deployment standards, runbooks and SRE practices",
        "Built a SaaS API platform in FastAPI (60+ endpoints) with CI/CD and canary rollouts",
        "Designed KEDA-based autoscaling for NGINX (on Prometheus metrics) and AWS SQS consumers, scaling workers on queue depth instead of fixed replicas",
        "Built a Python and Celery workflow orchestrator for CRM data migrations with DAG-based dependencies, retries, state tracking and a live dashboard — 500+ concurrent workflows with zero data loss",
        "Rolled out the observability stack and Doppler secrets management, halving MTTR",
        "Automated infrastructure with Terraform, reduced release cycles 2 weeks → 3 hours",
        "Created templatized Helm charts for stateless and stateful services, cutting new-service setup from 4 hours to 2.4 hours",
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