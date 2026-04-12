import type {
  Experience,
  PersonalInfo,
  PhilosophyPillar,
  Project,
} from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Shahid Moosa",
  title: "Senior Database Support Engineer",
  location: "Port Blair, India",
  email: "connect2shahidmoosa@gmail.com",
  linkedIn: "https://www.linkedin.com/in/shahidmoosa/",
  github: "https://github.com/shahidmoosa",
  tagline:
    "Senior Database Support Engineer with nearly 6 years of expertise in Distributed SQL, PostgreSQL internals, and Cloud Infrastructure (AWS/Azure). Remote-native professional with a proven track record of scaling high-throughput databases for global enterprise clients. Adept at bridging the gap between Support and Engineering by building full-stack tools (React/Tailwind) to automate workflows. Specialist in disaster recovery and asynchronous cross-timezone collaboration.",
};

export const experiences: Experience[] = [
  {
    id: "singlestore",
    company: "SingleStore",
    logo: "https://logo.svgcdn.com/logos/singlestore-icon.svg",
    role: "Database Cloud Support Engineer",
    period: "01/2024 – Present",
    location: "Singapore (Remote)",
    description:
      "Tier-3 technical support for SingleStore's distributed architecture, troubleshooting complex sharding, replication, and partition tolerance issues for Fortune 500 clients.",
    highlights: [
      "Spearheaded Tier-3 technical support for SingleStore's distributed architecture, troubleshooting complex sharding, replication, and partition tolerance issues for Fortune 500 clients.",
      "Achieved 99.9% uptime for high-throughput workloads by performing deep-dive analysis of infrastructure bottlenecks using Linux system tools, SQL diagnostics, and Wireshark.",
      "Accelerated incident resolution by 15% by collaborating closely with Engineering to isolate bugs in the storage engine and query optimizer.",
      "Authored authoritative best-practice guides for deploying distributed clusters, focusing on High Availability (HA) and Disaster Recovery (DR).",
      "Built internal automation scripts to streamline log analysis, reducing case triage time.",
    ],
    technologies: [
      "SingleStore",
      "Distributed SQL",
      "Linux",
      "Wireshark",
      "SQL",
      "Python",
      "Bash",
      "Datadog",
      "Docker",
      "Git",
    ],
  },
  {
    id: "aws",
    company: "Amazon Web Services",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    role: "Cloud Support Associate (PostgreSQL)",
    period: "07/2022 – 01/2024",
    location: "Singapore",
    description:
      "Subject Matter Expert for Amazon RDS and Aurora PostgreSQL, resolving critical performance issues and guiding enterprise customers through zero-downtime migrations.",
    highlights: [
      "Served as Subject Matter Expert (SME) for Amazon RDS and Aurora PostgreSQL, diagnosing critical performance issues involving Autovacuum tuning, WAL usage, and lock contention.",
      "Guided 50+ enterprise customers through major version upgrades and zero-downtime migrations (DMS) with precision planning.",
      "Reduced issue resolution time by 20% by proactively identifying and escalating complex bugs to the RDS service team.",
      "Maintained a 4.8/5 CSAT rating by translating complex database concepts into clear, actionable advice for both technical and non-technical stakeholders.",
    ],
    technologies: [
      "AWS",
      "RDS",
      "Aurora PostgreSQL",
      "DynamoDB",
      "EC2",
      "PostgreSQL",
      "MySQL",
      "Python",
      "Bash",
      "Git",
    ],
  },
  {
    id: "infosys",
    company: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    role: "Senior System Associate",
    period: "04/2020 – 07/2022",
    location: "Bengaluru, India",
    description:
      "System administration for 100+ users, automating patch management and maintaining 99% uptime through proactive monitoring.",
    highlights: [
      "Administered Linux/Windows systems for 100+ users, automating patch management and configuration using PowerShell and Bash.",
      "Maintained 99% system uptime through proactive monitoring and independent resolution of network performance incidents.",
    ],
    technologies: [
      "Linux",
      "Windows",
      "PowerShell",
      "Bash",
      "AWS",
      "Azure",
      "Docker",
      "Git",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "andaman-planner",
    title: "Andaman Planner Pro",
    description:
      "Developing a full-stack AI-powered travel planning application for the Andaman Islands. Integrated AI algorithms to generate personalized itineraries based on user preferences and budget. Built a responsive, modern frontend using React and Tailwind CSS for a seamless user experience.",
    technologies: ["React", "Tailwind CSS", "Supabase", "AI/ML"],
    period: "Jan 2026",
    type: "AI Travel App",
    status: "In Progress",
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
