// All site copy lives here. Facts mirror the master resume (resume/src/content.js).
const base = import.meta.env.BASE_URL;

export const profile = {
  name: "Shashank Shukla",
  title: "Senior Platform Engineer",
  location: "Bangalore, India",
  email: "shashank.shukla1202@gmail.com",
  phone: "+91 77376 02733",
  photo: `${base}shashank_pic.jpg`,
  resume: `${base}Shashank_Shukla_DevOps_Resume.pdf`,
  linkedin: "https://www.linkedin.com/in/shashank-shukla-b84b7a162",
  github: "https://github.com/sh-shukla",
};

export const hero = {
  eyebrow: "Senior Platform Engineer",
  line1: "Platforms that build,",
  line2: "ship and heal themselves.",
  lede:
    "I design and run cloud platforms on AWS, GCP and Kubernetes. Five years of turning manual operations into software, from a one-file customer installer to AI-driven incident response.",
};

export const stats = [
  { value: "45 min", label: "to stand up a full customer environment", note: "down from 6–7 hours" },
  { value: "12", label: "production EKS clusters operated", note: "270+ microservices" },
  { value: "$1.8K", label: "saved every month on load balancing", note: "plus ~30% on compute" },
  { value: "5+ yrs", label: "building platforms at scale", note: "Nielsen and Conga" },
];

export type Tile = {
  eyebrow: string;
  title: string;
  metric: string;
  metricLabel: string;
  body: string;
  tech: string[];
  tone: "dark" | "light" | "tint";
  wide?: boolean;
};

export const work: Tile[] = [
  {
    eyebrow: "Bring your own cloud",
    title: "One config file. A complete production environment.",
    metric: "45 min",
    metricLabel: "end to end, from 6–7 hours",
    body:
      "Architected the platform that installs the whole product into a customer's own AWS or GCP account: Pulumi provisions networking, Kubernetes, databases and storage, then Argo CD, Karpenter and 40–45 microservices follow. Infra and app upgrades run through the same pipeline from the customer dashboard. Live for 4 customers.",
    tech: ["Pulumi", "AWS", "GCP", "EKS", "Argo CD", "Karpenter"],
    tone: "dark",
    wide: true,
  },
  {
    eyebrow: "AI incident response",
    title: "Alerts that triage themselves.",
    metric: "12",
    metricLabel: "EKS clusters covered",
    body:
      "Prometheus alerts trigger Amazon Bedrock models grounded in a Bedrock Knowledge Base of runbooks. Common failures such as OOM kills are fixed automatically; the rest reach on-call through incident.io with a diagnosis attached.",
    tech: ["Amazon Bedrock", "Knowledge Bases", "Prometheus", "incident.io"],
    tone: "tint",
  },
  {
    eyebrow: "Self-hosted AI",
    title: "Language models, run as a fleet.",
    metric: "~4x",
    metricLabel: "lower inference cost",
    body: "Two open-weight small language models self-hosted on EKS, managed by a custom Kubernetes CRD instead of paying per call for managed APIs.",
    tech: ["EKS", "Kubernetes CRDs", "SLMs"],
    tone: "light",
  },
  {
    eyebrow: "Real-time ads",
    title: "Built for sub-10 ms.",
    metric: "<10 ms",
    metricLabel: "response target",
    body: "Took the real-time Ads platform's infrastructure from scratch to production on AWS Local Zones and Global Accelerator, after evaluating ScyllaDB and Aerospike with vendor teams.",
    tech: ["Local Zones", "Global Accelerator", "ScyllaDB", "Aerospike"],
    tone: "light",
  },
  {
    eyebrow: "Cost engineering",
    title: "Same platform. Smaller bill.",
    metric: "$1.8K/mo",
    metricLabel: "plus ~30% off compute",
    body: "Consolidated 20+ ALBs behind NGINX Ingress for 50+ services, then moved workloads to Graviton with multi-arch builds and right-sized Karpenter.",
    tech: ["NGINX Ingress", "Graviton", "Karpenter"],
    tone: "light",
  },
  {
    eyebrow: "Delivery at Conga",
    title: "Faster releases, fewer rollbacks.",
    metric: "25 → 8 min",
    metricLabel: "deploys across 200+ microservices",
    body:
      "Blue-green deployments brought per-release downtime under 30 seconds. Reusable Jenkins and Spinnaker pipelines tripled deployment frequency, and auto-rollback cut release failures 70%.",
    tech: ["Jenkins", "Spinnaker", "Blue-green", "Terraform"],
    tone: "tint",
    wide: true,
  },
  {
    eyebrow: "Disaster recovery",
    title: "Failover without data loss.",
    metric: "<10 min",
    metricLabel: "RTO for 200+ AWS services",
    body: "Continuous replication and automated failover kept RPO under 5 minutes, with zero data loss across drills and real failovers.",
    tech: ["AWS", "Replication", "Automated failover"],
    tone: "light",
  },
];

export type Role = { title: string; dates: string; points: string[] };
export type Job = { company: string; location: string; period: string; summary: string; roles: Role[] };

export const experience: Job[] = [
  {
    company: "Nielsen",
    location: "Bangalore",
    period: "2025 – Present",
    summary: "Platform and infrastructure for the Ads and Sports product teams.",
    roles: [
      {
        title: "Senior DevOps Engineer",
        dates: "Jun 2025 – Present",
        points: [
          "Architected a bring-your-own-cloud delivery platform that builds a complete production environment in a customer's AWS or GCP account from one config file, cutting setup and upgrades from 6–7 hours to 45 minutes.",
          "Built AI-driven incident response on Amazon Bedrock that auto-remediates common failures across 12 EKS clusters and escalates the rest with a diagnosis.",
          "Self-host two open-weight small language models on EKS through a custom Kubernetes CRD, at ~4x lower inference cost.",
          "Operate 12 EKS clusters running 270+ microservices: zero-downtime upgrades to v1.34, NodeLocalDNS, Node Problem Detector and blue-green deployments; node memory swap cut OOM kills ~70%.",
          "Reduced AWS spend by ~$1,800/month with ALB consolidation and ~30% on compute with Graviton and Karpenter.",
          "Built the observability and on-call stack on Prometheus, Loki, Grafana and incident.io, and hardened clusters with Kyverno and Vault.",
          "Lead a 4-engineer DevOps team supporting 5–6 application teams.",
        ],
      },
    ],
  },
  {
    company: "Conga",
    location: "Bangalore",
    period: "2021 – 2025",
    summary: "Four years from associate to senior, across delivery, reliability and developer platforms.",
    roles: [
      {
        title: "Senior DevOps Engineer",
        dates: "Apr 2024 – Jun 2025",
        points: [
          "Led a 6-member DevOps/SRE team, setting deployment standards, runbooks and SRE practices.",
          "Cut deployment time from 25 minutes to under 8 across 200+ microservices, with under 30 seconds of downtime per release.",
          "Reduced release failures 70% and rollback incidents 85% with automated validation and auto-rollback.",
          "Built a CRM data-migration orchestrator in Python and Celery that ran 500+ concurrent workflows with zero data loss, and a FastAPI SaaS platform with 60+ endpoints.",
          "Designed event-driven autoscaling with KEDA for NGINX and AWS SQS consumers.",
        ],
      },
      {
        title: "DevOps Engineer",
        dates: "Apr 2023 – Mar 2024",
        points: [
          "Delivered disaster recovery for 200+ AWS services with RTO under 10 minutes and RPO under 5.",
          "Cut release cycles from 2 weeks to 3 hours with Terraform automation.",
          "Cut MTTR 50% with the observability stack and Doppler secrets management.",
          "Cut AWS compute spend ~25% through Karpenter, cost audits and EC2 right-sizing.",
        ],
      },
      {
        title: "Associate DevOps Engineer",
        dates: "Jul 2021 – Mar 2023",
        points: [
          "Cut build times from 20 minutes to under 8 by parallelizing and caching Jenkins pipelines.",
          "Cut new-service setup from 4 to 2.4 hours with templatized Helm charts.",
          "Built foundational Terraform modules for VPCs, IAM and EC2-based services.",
        ],
      },
    ],
  },
];

export const skills = [
  { group: "Cloud", items: ["AWS", "EKS", "EC2", "RDS", "DynamoDB", "S3", "SQS", "Bedrock", "GCP"] },
  { group: "Kubernetes", items: ["Karpenter", "KEDA", "Helm", "Argo CD", "NGINX Ingress", "Kyverno", "CRDs", "Docker"] },
  { group: "Infrastructure as code", items: ["Pulumi", "Terraform", "GitLab CI", "Jenkins", "Spinnaker", "Rancher Fleet"] },
  { group: "Reliability", items: ["Prometheus", "Grafana", "Loki", "Alertmanager", "incident.io", "Disaster recovery"] },
  { group: "Security", items: ["HashiCorp Vault", "Kyverno", "Checkmarx", "Doppler", "AWS STS"] },
  { group: "Languages and data", items: ["Python", "FastAPI", "Celery", "Go", "Bash", "Kafka", "Redis", "MongoDB"] },
];

export const certifications = [
  { name: "Certified Kubernetes Administrator", short: "CKA", issuer: "The Linux Foundation", image: `${base}cka.png` },
  { name: "HashiCorp Certified: Terraform Associate", short: "Terraform Associate", issuer: "HashiCorp", image: `${base}terraform-certification.png` },
];

export const education = {
  degree: "B.Tech, Computer Science and Engineering",
  school: "M.S. Ramaiah University of Applied Sciences",
  years: "2017 – 2021",
  note: "CGPA 9.0",
};
