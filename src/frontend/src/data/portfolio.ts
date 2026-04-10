import type { Experience, PersonalInfo, PhilosophyPillar } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Shahid Moosa",
  title: "Database Support Engineer",
  location: "Singapore",
  email: "connect2shahidmoosa@gmail.com",
  linkedIn: "https://www.linkedin.com/in/shahidmoosa/",
  github: "https://github.com/shahidmoosa",
  tagline:
    "Architecting scale, reliability, and efficiency for complex distributed systems.",
};

export const experiences: Experience[] = [
  {
    id: "singlestore",
    company: "SingleStore",
    logo: "https://cdn.brandfetch.io/singlestore.com/w/400/h/400",
    role: "Senior Software Engineer — Query Optimization",
    period: "2022 – Present",
    location: "Remote / Singapore",
    description:
      "Working on the core query optimizer for SingleStore's distributed SQL engine, focusing on high-throughput OLAP workloads and cross-shard query planning.",
    highlights: [
      "Reduced P99 latency on analytical queries by 38% through predicate pushdown and partition pruning improvements",
      "Designed and implemented adaptive join ordering for distributed hash joins across 256-node clusters",
      "Led migration of query plan caching infrastructure to reduce cold-start overhead by 60%",
      "Mentored 3 junior engineers on distributed query execution internals",
    ],
    technologies: [
      "C++",
      "SQL",
      "Distributed Systems",
      "Query Planning",
      "OLAP",
      "Kubernetes",
    ],
  },
  {
    id: "aws",
    company: "Amazon Web Services",
    role: "Software Development Engineer II — RDS",
    period: "2019 – 2022",
    location: "Seattle, WA",
    description:
      "Contributed to Amazon RDS and Aurora PostgreSQL, working on storage engine internals, replication reliability, and automated failover mechanisms.",
    highlights: [
      "Built automated failover health checks reducing undetected failures by 91% across Aurora clusters",
      "Implemented WAL shipping optimizations that improved replica lag by 45% under write-heavy workloads",
      "Designed the checkpoint pacing algorithm that reduced I/O spikes during high-load periods",
      "Delivered 5 customer-facing features shipped to General Availability",
    ],
    technologies: [
      "PostgreSQL",
      "C",
      "Python",
      "AWS",
      "Aurora",
      "Storage Engines",
      "Replication",
    ],
  },
  {
    id: "infosys",
    company: "Infosys",
    role: "Technology Analyst — Cloud Infrastructure",
    period: "2016 – 2019",
    location: "Bengaluru, India",
    description:
      "Designed and operated cloud-native infrastructure for enterprise clients migrating from on-premise data centers to AWS and Azure environments.",
    highlights: [
      "Architected a multi-region active-active setup for a financial services client handling 50K TPS",
      "Reduced cloud spend by $2.1M annually through reserved instance planning and right-sizing automation",
      "Built CI/CD pipelines cutting deployment time from 4 hours to 12 minutes for 8 engineering teams",
      "Led a team of 6 engineers delivering a greenfield microservices platform",
    ],
    technologies: [
      "AWS",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Python",
      "Ansible",
      "CI/CD",
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
