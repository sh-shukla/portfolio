import { Card, CardContent } from "@/components/ui/card";
import { Award, GraduationCap, MapPin, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [expandedMetric, setExpandedMetric] = useState<number | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({ title: "Copied!", description: `${field} copied to clipboard` });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({ title: "Error", description: "Failed to copy", variant: "destructive" });
    }
  };

  const certifications = [
    { name: "Certified Kubernetes Administrator (CKA)", icon: Award, image: "./cka.png" },
    { name: "HashiCorp Certified: Terraform Associate", icon: Award, image: "./terraform-certification.png" },
  ];

  const techStack = [
    {
      title: "Cloud & Kubernetes",
      description: "AWS (EKS, EC2, ALB, Lambda, SQS, MSK), GCP, Kubernetes, Karpenter, Helm, KEDA",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      title: "Platform & Security",
      description: "Pulumi, Terraform, Argo CD, GitLab CI, JFrog Artifactory, Kyverno, HashiCorp Vault",
      image: "./devops.jpg",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "AI/ML & Data Infra",
      description: "Amazon Bedrock, self-hosted SLMs on EKS, GPU workload orchestration, Apache Flink, Spark on K8s, ScyllaDB, Aerospike, Kafka/MSK",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Observability & SRE",
      description: "Prometheus, Alertmanager, Grafana, Loki, CloudWatch, incident.io, Bedrock AIOps",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  const metrics = [
    {
      value: "48 min",
      label: "Private-Cloud Deploys",
      description: "Down from 6–7 hours",
      details: [
        "Built from scratch to ship the full product into each customer's own AWS or GCP account",
        "Each deployment is driven by a single config file",
        "Pulumi and Terraform for infrastructure, Argo CD GitOps for applications",
        "4 live customers run their releases and upgrades through it",
        "Deployment time cut from 6–7 hours to 48 minutes"
      ]
    },
    {
      value: "60%",
      label: "K8s Alerts Auto-Resolved",
      description: "AI Incident Response",
      details: [
        "Prometheus alerts trigger Amazon Bedrock LLMs",
        "Models are grounded in an org knowledge graph of docs and runbooks",
        "Minor issues are fixed automatically by matching a runbook",
        "Everything else goes to on-call through incident.io with full context",
        "Around 60% of Kubernetes alerts now resolve without a human"
      ]
    },
    {
      value: "4x",
      label: "Lower AI Model Cost",
      description: "Self-Hosted SLMs on EKS",
      details: [
        "2 small language models self-hosted on Amazon EKS",
        "A custom Kubernetes CRD runs and manages the model fleet",
        "Around 4x cost reduction for model inference"
      ]
    },
    {
      value: "95%",
      label: "Load Balancer Spend Cut",
      description: "ALB → NGINX Ingress",
      details: [
        "Consolidated 20+ ALBs into a single ALB behind NGINX Ingress",
        "Migrated 50+ services to the NGINX Ingress Controller",
        "Led Graviton ARM adoption with multi-arch container builds (amd64 + arm64)",
        "Right-sized Karpenter autoscaling, cutting compute spend 25%",
        "25-40% overall infrastructure cost reduction"
      ]
    },
    {
      value: "70%",
      label: "Fewer OOM Kills",
      description: "EKS Reliability at Scale",
      details: [
        "Managed 270+ microservices across 8+ EKS clusters",
        "Enabled memory swap on EKS nodes, cutting OOM kills ~70%",
        "Zero-downtime EKS upgrades from v1.32 to v1.34 across prod/stage/dev",
        "Implemented NodeLocalDNS, Node Problem Detector and Registry Proxy Cache",
        "Enforced Kyverno admission policies — no privileged containers, required resource limits"
      ]
    },
    {
      value: "<10ms",
      label: "Ad Platform Latency",
      description: "Real-time Infrastructure",
      details: [
        "Architected end-to-end infrastructure for Nielsen's real-time Ads platform",
        "Conducted POCs with ScyllaDB and Aerospike vendor teams for sub-10ms data access",
        "Leveraged AWS Local Zones for ultra-low latency compute closer to end users",
        "Utilized AWS Global Accelerator for optimized global traffic routing",
        "Platform now handles millions of ad decisions daily"
      ]
    }
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-40" />
      <div className="container-premium relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="heading-premium mb-6">About Me</h2>
          <p className="subheading-premium max-w-4xl mx-auto">
            DevOps, Platform & SRE engineer with 5+ years building and running AWS, GCP and Kubernetes platforms — private-cloud delivery, AIOps and self-hosted AI infrastructure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-morphism-strong premium-hover h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-morphism rounded-full mr-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Education</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">B.Tech in Computer Science</h4>
                    <p className="text-muted-foreground mb-1">M.S. Ramaiah University of Applied Sciences</p>
                    <p className="text-sm text-muted-foreground">2017-2021 | CGPA: 9.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-morphism-strong premium-hover h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-morphism rounded-full mr-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 glass-morphism rounded-xl smooth-hover"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img 
                        src={cert.image} 
                        alt={cert.name}
                        className="w-12 h-12 mr-4 rounded-lg object-contain bg-white p-2"
                      />
                      <span className="text-sm font-medium">{cert.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="glass-morphism-strong premium-hover h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-morphism rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Location & Contact</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-muted-foreground">Bangalore, India</p>
                  </div>
                  <motion.div 
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => copyToClipboard("shashank.shukla1202@gmail.com", "Email")}
                  >
                    <p className="font-medium mb-1 flex items-center">
                      Email
                      <motion.div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedField === "Email" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </motion.div>
                    </p>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">shashank.shukla1202@gmail.com</p>
                  </motion.div>
                  <motion.div 
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => copyToClipboard("+91 7737602733", "Phone")}
                  >
                    <p className="font-medium mb-1 flex items-center">
                      Phone
                      <motion.div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedField === "Phone" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </motion.div>
                    </p>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">+91 7737602733</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Technical Expertise */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold gradient-text mb-4">Technical Expertise</h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="text-center glass-morphism-strong p-8 rounded-2xl premium-hover group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ y: -12, scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <img src={tech.image} alt={tech.title} className="w-10 h-10 object-contain" />
                </motion.div>
                <h4 className="font-bold text-lg mb-2">{tech.title}</h4>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card className="glass-morphism-strong">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Impact Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 glass-morphism rounded-xl smooth-hover group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.4 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    onClick={() => setExpandedMetric(expandedMetric === index ? null : index)}
                  >
                    <motion.div
                      className="text-4xl font-bold gradient-text-premium mb-2"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.6 + index * 0.1, type: "spring" }}
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-sm font-semibold mb-1">{metric.label}</div>
                    <div className="text-xs text-muted-foreground mb-2">{metric.description}</div>
                    
                    <div className="text-xs text-primary/60 mt-2 opacity-70">
                      💡 Click for details
                    </div>
                    
                    {expandedMetric === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-primary/20 text-left"
                      >
                        <div className="space-y-2">
                          {metric.details.map((detail, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start text-xs text-muted-foreground"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                              {detail}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;