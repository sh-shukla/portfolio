// All site copy lives here. Facts mirror the resume PDF in public/.
const base = import.meta.env.BASE_URL;

export const profile = {
  name: "Shashank Shukla",
  title: "Senior Platform Engineer",
  // **word** renders highlighted.
  intro: "I build and run cloud platforms on **AWS**, **GCP** and **Kubernetes**, and the **AI** workloads on them. Currently at **Nielsen**, previously four years at **Conga**.",
  // The "Open to work" badge and the contact section. Set to [] to hide both.
  openTo: ["Platform", "DevOps", "SRE", "AI Infra"],
  email: "shashank.shukla1202@gmail.com",
  phone: "+91 77376 02733",
  photo: `${base}shashank_pic.jpg`,
  resume: `${base}Shashank_Shukla_DevOps_Resume.pdf`,
  resumeDownloadName: "Shashank_Shukla_Resume.pdf",
  linkedin: "https://www.linkedin.com/in/shashank-shukla-b84b7a162",
  github: "https://github.com/sh-shukla",
};

// Contact form backend: the Web app URL of contact/apps-script.gs, deployed in your Google account
// (setup steps are at the top of that file). While this is empty the form is hidden and only the
// email, LinkedIn, GitHub and phone buttons show.
export const contactForm = "";

// About section. Every fact here is on the master resume.
export const about = [
  "I'm a Senior DevOps Engineer at Nielsen on the Ads and Sports platform teams, where I lead a team of four DevOps engineers supporting 5–6 application teams.",
  "My work there covers a bring-your-own-cloud delivery platform, AI-driven incident response on Amazon Bedrock, self-hosted language models and running our EKS clusters.",
  "Before Nielsen I spent four years at Conga, going from Associate to Senior DevOps Engineer and leading a six-member DevOps/SRE team.",
];

export const stats = [
  { value: "5+", label: "years of experience" },
  { value: "12", label: "EKS clusters operated" },
  { value: "270+", label: "microservices" },
  { value: "6", label: "largest team led" },
];

export type Tile = {
  company: string;
  title: string;
  metric: string;
  metricLabel: string;
  body: string;
  tech: string[];
  // Optional extras for the big tile: a pipeline (each step named in the body), how it works, key numbers.
  steps?: string[];
  points?: string[];
  facts?: { value: string; label: string }[];
};

export const work: Tile[] = [
  {
    company: "Nielsen",
    title: "Bring-your-own-cloud delivery platform",
    metric: "45 min",
    metricLabel: "per customer install, was 6–7 hours",
    body: "Installs the full product into a customer's own AWS or GCP account from one config file: networking, Kubernetes, databases, then 40–45 microservices.",
    tech: ["Pulumi", "AWS", "GCP", "EKS", "Argo CD", "Karpenter"],
    steps: ["Config file", "Networking", "Kubernetes", "Databases", "40–45 services"],
    points: [
      "Pulumi builds the cloud layer: VPC, EKS, RDS, DynamoDB and S3",
      "Argo CD and Karpenter go in next, then Argo CD deploys the services",
      "Infra and app releases managed end to end, tied into the customer dashboard",
      "Upgrades run through the same pipeline; the same platform runs the SaaS product",
    ],
    facts: [
      { value: "4", label: "customers live" },
      { value: "AWS + GCP", label: "clouds supported" },
      { value: "1", label: "config file per customer" },
    ],
  },
  {
    company: "Nielsen",
    title: "AI incident response",
    metric: "12",
    metricLabel: "EKS clusters covered",
    body: "Bedrock models read Prometheus alerts against our runbooks, fix common failures like OOM kills, and hand the rest to on-call with a diagnosis.",
    tech: ["Amazon Bedrock", "Prometheus", "incident.io"],
  },
  {
    company: "Nielsen",
    title: "Self-hosted language models",
    metric: "~4x",
    metricLabel: "cheaper than managed APIs",
    body: "Two open-weight models on EKS, run as a fleet by a custom Kubernetes CRD.",
    tech: ["EKS", "Kubernetes CRDs"],
  },
  {
    company: "Nielsen",
    title: "Real-time ads infrastructure",
    metric: "<10 ms",
    metricLabel: "response target",
    body: "Built from scratch to production on AWS Local Zones and Global Accelerator, after ScyllaDB and Aerospike trials.",
    tech: ["Local Zones", "Global Accelerator", "ScyllaDB"],
  },
  {
    company: "Nielsen",
    title: "AWS cost reduction",
    metric: "$1.8K",
    metricLabel: "a month, plus ~30% off compute",
    body: "Consolidated 20+ load balancers behind NGINX Ingress and moved workloads to Graviton.",
    tech: ["NGINX Ingress", "Graviton", "Karpenter"],
  },
  {
    company: "Conga",
    title: "Release engineering",
    metric: "25 → 8 min",
    metricLabel: "deploys across 200+ microservices",
    body: "Blue-green deploys with under 30 seconds of downtime, shared Jenkins and Spinnaker pipelines, and auto-rollback that cut release failures 70%.",
    tech: ["Jenkins", "Spinnaker", "Terraform"],
  },
  {
    company: "Conga",
    title: "Disaster recovery",
    metric: "<10 min",
    metricLabel: "RTO for 200+ services",
    body: "Continuous replication and automated failover. RPO under 5 minutes, no data lost in drills or real failovers.",
    tech: ["AWS", "Replication"],
  },
];

// A point is [bold lead-in, rest of the sentence].
export type Point = [lead: string, rest: string];
export type Role = { title: string; dates: string; points: Point[] };
// stack: tools named in that job's bullets, shown as logo chips.
export type Job = { company: string; location: string; period: string; summary: string; stack: string[]; roles: Role[] };

export const experience: Job[] = [
  {
    company: "Nielsen",
    location: "Bangalore",
    period: "Jun 2025 – Present",
    summary: "Ads and Sports platform teams",
    stack: ["AWS", "GCP", "Kubernetes", "Pulumi", "Argo CD", "Karpenter", "Amazon Bedrock", "Prometheus", "Grafana", "Loki", "incident.io", "Kyverno", "HashiCorp Vault", "NGINX Ingress"],
    roles: [
      {
        title: "Senior DevOps Engineer",
        dates: "Jun 2025 – Present",
        points: [
          ["Architected a bring-your-own-cloud delivery platform", " that builds a complete production environment in a customer's AWS or GCP account from one config file. Setup and upgrades went from 6–7 hours to 45 minutes; live for 4 customers."],
          ["Built AI-driven incident response on Amazon Bedrock", " that remediates common failures across 12 EKS clusters automatically and sends the rest to on-call with a diagnosis."],
          ["Self-hosted two open-weight small language models on EKS", " through a custom Kubernetes CRD, at ~4x lower inference cost than managed APIs."],
          ["Operate 12 EKS clusters running 270+ microservices", ": zero-downtime upgrades to v1.34, NodeLocalDNS, Node Problem Detector and blue-green deployments. Node memory swap cut OOM kills ~70%."],
          ["Reduced AWS spend by ~$1,800/month", " by consolidating 20+ ALBs behind NGINX Ingress, and compute cost by ~30% with Graviton and Karpenter."],
          ["Built the real-time Ads platform infrastructure", " from scratch to production, designed for sub\u201110\u00a0ms responses on AWS Local Zones and Global Accelerator."],
          ["Built the observability and on-call stack", " on Prometheus, Loki, Grafana and incident.io, and hardened clusters with Kyverno and Vault."],
          ["Lead a 4-engineer DevOps team", " supporting 5–6 application teams."],
        ],
      },
    ],
  },
  {
    company: "Conga",
    location: "Bangalore",
    period: "Jul 2021 – Jun 2025",
    summary: "Associate to Senior DevOps Engineer",
    stack: ["AWS", "Jenkins", "Spinnaker", "Terraform", "Helm", "KEDA", "Karpenter", "Python", "Celery", "FastAPI", "Doppler"],
    roles: [
      {
        title: "Senior DevOps Engineer",
        dates: "Apr 2024 – Jun 2025",
        points: [
          ["Led a 6-member DevOps/SRE team", ", setting deployment standards, runbooks and SRE practices."],
          ["Cut deployment time from 25 to under 8 minutes", " across 200+ microservices, with under 30 seconds of downtime per release."],
          ["Reduced release failures 70% and manual rollback incidents 85%", " with automated validation and auto-rollback."],
          ["Tripled deployment frequency", " across 8+ teams with reusable Jenkins shared libraries and Spinnaker pipelines."],
          ["Built a CRM data-migration orchestrator", " in Python and Celery that ran 500+ concurrent workflows with zero data loss."],
          ["Built a SaaS API platform in FastAPI", " with 60+ endpoints."],
          ["Designed event-driven autoscaling with KEDA", " for NGINX and AWS SQS consumers."],
        ],
      },
      {
        title: "DevOps Engineer",
        dates: "Apr 2023 – Mar 2024",
        points: [
          ["Delivered disaster recovery for 200+ AWS services", " with RTO under 10 minutes and RPO under 5."],
          ["Cut release cycles from 2 weeks to 3 hours", " with Terraform automation."],
          ["Cut MTTR 50%", " with the observability stack and Doppler secrets management."],
          ["Cut AWS compute spend ~25%", " through Karpenter, cost audits and EC2 right-sizing."],
        ],
      },
      {
        title: "Associate DevOps Engineer",
        dates: "Jul 2021 – Mar 2023",
        points: [
          ["Cut build times from 20 to under 8 minutes", " by parallelizing and caching Jenkins pipelines."],
          ["Cut new-service setup from 4 to 2.4 hours", " with templatized Helm charts."],
          ["Built foundational Terraform modules", " for VPCs, IAM and EC2-based services."],
        ],
      },
    ],
  },
];

export const skills = [
  { group: "Cloud", items: ["AWS", "GCP", "EKS", "EC2", "RDS", "DynamoDB", "S3", "SQS", "IAM", "Local Zones"] },
  { group: "Kubernetes", items: ["Karpenter", "KEDA", "Helm", "Argo CD", "NGINX Ingress", "Kyverno", "CRDs and Operators", "Docker"] },
  { group: "IaC and CI/CD", items: ["Pulumi", "Terraform", "GitLab CI", "Jenkins", "Spinnaker", "Rancher Fleet", "JFrog Artifactory"] },
  { group: "Observability and SRE", items: ["Prometheus", "Alertmanager", "Grafana", "Loki", "CloudWatch", "incident.io", "Disaster recovery"] },
  { group: "AI and LLMOps", items: ["Amazon Bedrock", "Bedrock Knowledge Bases", "Self-hosted SLMs", "Runbook automation"] },
  { group: "Security", items: ["HashiCorp Vault", "Kyverno", "Checkmarx", "Doppler", "AWS STS", "CrowdStrike"] },
  { group: "Networking", items: ["NGINX", "CloudFront", "Cloudflare", "Global Accelerator"] },
  { group: "Languages and data", items: ["Python", "FastAPI", "Celery", "Go", "Bash", "Groovy", "Kafka", "Redis", "MongoDB", "ScyllaDB"] },
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
