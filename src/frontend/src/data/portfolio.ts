import type { Experience, PersonalInfo, PhilosophyPillar } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Shahid Moosa",
  title: "Database Cloud Support Engineer",
  location: "Singapore",
  email: "connect2shahidmoosa@gmail.com",
  linkedIn: "https://www.linkedin.com/in/shahidmoosa/",
  github: "https://github.com/shahidmoosa",
  tagline:
    "Helping enterprise customers unlock the full potential of cloud databases through expert support, incident management, and deep technical knowledge.",
};

export const experiences: Experience[] = [
  {
    id: "singlestore",
    company: "SingleStore",
    logo: "https://cdn.brandfetch.io/singlestore.com/w/400/h/400",
    role: "Database Cloud Support Engineer",
    period: "01/2024 – Present",
    location: "Singapore (Remote)",
    description:
      "Provide Tier-2/3 technical support for enterprise customers running SingleStore distributed columnar clusters in production environments.",
    highlights: [
      "Diagnose and resolve complex issues across replication, ingest pipelines, node health, and query performance for enterprise production clusters",
      "Lead high-severity incident management (P1/P2) following ITIL processes, coordinating with engineering teams to drive timely resolution",
      "Collaborate directly with SingleStore engineering teams to escalate, investigate, and resolve critical product defects",
      "Author technical documentation, runbooks, and knowledge base articles to improve team efficiency and self-service resolution",
      "Conduct customer enablement sessions to improve adoption and effective use of SingleStore capabilities",
    ],
    technologies: [
      "SingleStore",
      "SQL",
      "Distributed Databases",
      "Incident Management",
      "ITIL",
      "Columnar Storage",
      "Replication",
      "Cloud Infrastructure",
    ],
  },
  {
    id: "aws",
    company: "Amazon Web Services",
    role: "Cloud Support Engineer",
    period: "07/2022 – 01/2024",
    location: "Singapore",
    description:
      "Provided technical support for AWS customers across cloud infrastructure services.",
    highlights: [
      "Resolved complex technical issues for enterprise AWS customers across compute, networking, and database services",
      "Assisted customers with architecture reviews, performance troubleshooting, and cost optimization",
      "Collaborated with AWS service teams to escalate and resolve critical product issues",
      "Documented solutions and contributed to internal knowledge base for common customer issues",
    ],
    technologies: [
      "AWS",
      "EC2",
      "RDS",
      "S3",
      "VPC",
      "IAM",
      "CloudWatch",
      "Terraform",
      "Python",
    ],
  },
  {
    id: "infosys",
    company: "Infosys",
    role: "Senior System Associate",
    period: "04/2020 – 07/2022",
    location: "Bengaluru, India",
    description:
      "Delivered cloud infrastructure and system administration services for enterprise clients.",
    highlights: [
      "Administered and maintained cloud infrastructure for enterprise clients on AWS and Azure platforms",
      "Supported CI/CD pipeline operations and deployment processes for engineering teams",
      "Performed system monitoring, incident triage, and escalation for production environments",
      "Collaborated with senior engineers on infrastructure projects and client deliverables",
    ],
    technologies: [
      "AWS",
      "Azure",
      "Linux",
      "Python",
      "Terraform",
      "CI/CD",
      "Docker",
    ],
  },
];

export const philosophyPillars: PhilosophyPillar[] = [
  {
    id: "data-product",
    icon: "Database",
    title: "Data is the Product",
    description:
      "Every query matters. I treat database interactions with the gravity of revenue impact — because slow queries aren't just performance bugs, they're business failures waiting to happen. The difference between a 50ms and 500ms response is the difference between growth and churn.",
  },
  {
    id: "fast-debugging",
    icon: "Zap",
    title: "Fast Debugging",
    description:
      "Distributed systems fail in creative ways. The skill that separates good engineers from great ones is developing intuition for root causes before the logs tell you. I invest in observability infrastructure precisely because it compresses the time between 'something is wrong' and 'here is why.'",
  },
  {
    id: "reliability-first",
    icon: "Shield",
    title: "Reliability Over Features",
    description:
      "Clever solutions that fail at 3 AM are not clever. I prioritize boring, proven infrastructure over novel approaches that introduce unknown failure modes. The right abstraction is one that keeps working when you've forgotten how it works.",
  },
  {
    id: "knowledge-sharing",
    icon: "BookOpen",
    title: "Knowledge Sharing",
    description:
      "The best engineers raise the floor of the team, not just the ceiling of their own output. I write technical deep dives, review with context not just correctness, and document the decisions that will confuse future engineers — including future me.",
  },
];
