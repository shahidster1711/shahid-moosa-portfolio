import type { RunbookData } from "@/types";

export const runbookData: RunbookData = {
  incidentCategories: [
    {
      label: "Availability",
      color: "red",
      examples: "Node down, cluster offline",
    },
    {
      label: "Performance",
      color: "orange",
      examples: "Slow queries, high latency",
    },
    {
      label: "Errors",
      color: "yellow",
      examples: "OOM, query failures",
    },
    {
      label: "Data Risk",
      color: "blue",
      examples: "Backup failure, replication issues",
    },
  ],

  symptomMappings: {
    performance: [
      {
        symptom: "High query compilation rate",
        signals: "compilation events in logs",
        cause: "Ad-hoc queries / plan cache churn",
        confidence: 4,
      },
      {
        symptom: "Replication mode transitions",
        signals: "Replication state logs",
        cause: "CPU pressure / synchronous replication fallback",
        confidence: 4,
      },
      {
        symptom: "High CPU utilization",
        signals: "OS process monitor",
        cause: "Query compilation overhead / heavy workloads",
        confidence: 3,
      },
      {
        symptom: "Scheduler queue buildup",
        signals: "ready queue warnings in logs",
        cause: "Worker thread backlog / CPU saturation or lock contention",
        confidence: 3,
      },
    ],
    memory: [
      {
        symptom: "Buffer manager allocation failure",
        signals: "Error logs",
        cause: "Query exceeded configured memory limit",
        confidence: 5,
      },
      {
        symptom: "Query failures (memory)",
        signals: "Error logs",
        cause: "Table or intermediate result memory spike",
        confidence: 4,
      },
      {
        symptom: "OS OOM killer triggered",
        signals: "Kernel ring buffer (dmesg)",
        cause: "Host memory misconfiguration or memory overcommit",
        confidence: 5,
      },
    ],
    disk: [
      {
        symptom: "Disk flush operations lagging",
        signals: "Storage subsystem logs",
        cause: "Disk latency / IO bottleneck",
        confidence: 4,
      },
      {
        symptom: "Write retry loop stalling",
        signals: "Storage error logs",
        cause: "Storage backpressure / queue saturation",
        confidence: 3,
      },
      {
        symptom: "Slow backups",
        signals: "Backup history / job logs",
        cause: "IO saturation during backup window",
        confidence: 3,
      },
    ],
    network: [
      {
        symptom: "Connection timeout errors",
        signals: "Application and DB error logs",
        cause: "Network congestion OR node overload",
        confidence: 3,
      },
      {
        symptom: "Node disconnects",
        signals: "Cluster health logs",
        cause: "Infrastructure failure / NIC errors / CPU starvation",
        confidence: 3,
      },
    ],
    workload: [
      {
        symptom: "Many concurrent active queries",
        signals: "Active session list",
        cause: "Query pileup / insufficient concurrency slots",
        confidence: 3,
      },
      {
        symptom: "Idle connections with open transactions",
        signals: "Active session list",
        cause: "Application bug / connection pool misuse",
        confidence: 4,
      },
      {
        symptom: "Large in-memory tables",
        signals: "Table metadata statistics",
        cause: "Data skew / poorly designed schema",
        confidence: 3,
      },
    ],
    replication: [
      {
        symptom: "Missing synchronous replicas",
        signals: "Cluster topology status",
        cause: "Node failure / replica lag",
        confidence: 4,
      },
      {
        symptom: "Slow write throughput",
        signals: "Write latency metrics / logs",
        cause: "Synchronous replication lag on slow replicas",
        confidence: 3,
      },
      {
        symptom: "Unexpected failover events",
        signals: "Cluster event logs",
        cause: "Node instability / unexpected restarts",
        confidence: 3,
      },
    ],
  },

  decisionTree: [
    {
      step: "Is the cluster AVAILABLE?",
      options: [
        {
          label: "No → Availability Path",
          next: "Check cluster topology status → Node offline? → Inspect logs for restart/crash → Check OS OOM events → Check disk capacity",
        },
        {
          label: "Yes → Are queries slow?",
          next: "Check CPU utilization → High? Check query compilation rate + replication mode transitions → Check disk: flush operations lagging? → Check session list: long-running queries?",
        },
        {
          label: "Query failures?",
          next: "Memory errors? → Check buffer manager logs → Compare memory limits vs actual usage → Inspect large in-memory tables",
        },
        {
          label: "Connection timeouts present?",
          next: "Check NIC errors → Check CPU saturation → Check worker node responsiveness",
        },
        {
          label: "Writes slow?",
          next: "Disk flush lagging? → Write retry loop stalling? → Disk usage >85%?",
        },
      ],
    },
  ],

  deepDiveModules: [
    {
      title: "Module A: Query Compilation Bottleneck",
      indicators: [
        "High query compilation rate per hour",
        "Frequent synchronous-to-asynchronous replication transitions",
      ],
      rootCauses: [
        "Non-parameterized or dynamically generated SQL queries",
        "Plan cache eviction due to query churn",
      ],
      fixes: [
        "Parameterize all application queries to enable plan reuse",
        "Tune plan cache size and eviction thresholds",
      ],
    },
    {
      title: "Module B: Memory Pressure",
      indicators: [
        "Buffer manager allocation failure events in logs",
        "Query failures with out-of-memory errors",
      ],
      steps: [
        "Compare configured memory limit vs actual server memory",
        "Identify top memory-consuming queries from session stats",
        "Check for large intermediate result sets or in-memory table accumulation",
      ],
    },
    {
      title: "Module C: Disk Bottleneck",
      indicators: [
        "Disk flush operation lag warnings",
        "Backup jobs running significantly slower than baseline",
      ],
      steps: [
        "Measure disk read/write latency using OS-level IO stats",
        "Check for data growth causing storage capacity issues",
        "Identify competing IO workloads (backups, snapshots, compaction)",
      ],
    },
    {
      title: "Module D: Network vs CPU Ambiguity",
      indicators: ["Connection timeout errors appearing intermittently"],
      steps: [
        "If CPU is high → root cause is likely compute, not network",
        "If NIC errors present in OS logs → root cause is network layer",
        "If disk IO is slow → timeouts may be cascading from storage latency",
        "Correlate all three signals before concluding",
      ],
    },
    {
      title: "Module E: Replication Issues",
      indicators: [
        "Missing or lagging synchronous replicas in cluster status",
        "Shard role imbalance across worker nodes",
      ],
      steps: [
        "Inspect shard roles and replica assignment across all nodes",
        "Check for missing synchronous replicas and identify cause",
        "Review replication lag metrics and identify the slowest replica",
      ],
    },
  ],

  heuristics: [
    {
      rule: 1,
      title: "Never trust a single signal",
      detail:
        "Always correlate: application logs + OS metrics + database metadata. One signal misleads; three signals converge on truth.",
    },
    {
      rule: 2,
      title: "Time correlation beats raw counts",
      detail:
        "Focus on spikes and inflection points, not running totals. When did the metric deviate from baseline?",
    },
    {
      rule: 3,
      title: "Weakest node defines the cluster",
      detail:
        "One degraded worker node creates fanout slowdowns across all queries routed through it.",
    },
    {
      rule: 4,
      title: "Coordinator vs worker node separation",
      detail:
        "Coordinator nodes surface compilation and routing issues. Worker nodes surface memory and disk issues. Separate them in your investigation.",
    },
    {
      rule: 5,
      title: "Most incidents are NOT infrastructure",
      detail:
        "Top real causes: bad queries, memory misconfiguration, disk saturation. Blame the workload before the hardware.",
    },
  ],
};

export const OUTPUT_TEMPLATE = `1. Incident Summary:
   - Impact:
   - Timeframe:

2. Key Findings:
   - Signal 1:
   - Signal 2:

3. Correlation:
   - CPU spike + high compilation rate → query workload issue

4. Root Cause:
   - <specific cause>

5. Supporting Evidence:
   - logs / metrics / session data

6. Recommended Fix:
   - Immediate:
   - Long-term:`;
