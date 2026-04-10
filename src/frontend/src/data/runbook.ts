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
        symptom: "High compile count",
        signals: "compiled.*in logs",
        cause: "Adhoc queries / plan cache churn",
        confidence: 4,
      },
      {
        symptom: "Sync→async spikes",
        signals: "Logs",
        cause: "CPU pressure / compile fallback",
        confidence: 4,
      },
      {
        symptom: "High CPU",
        signals: "top_stdout",
        cause: "Compilation / heavy queries",
        confidence: 3,
      },
      {
        symptom: "Ready queue warnings",
        signals: "ready queue has not decreased",
        cause: "Scheduler backlog / CPU or locks",
        confidence: 3,
      },
    ],
    memory: [
      {
        symptom: "Nonfatal buffer manager",
        signals: "Logs",
        cause: "Query exceeded maximum_memory",
        confidence: 5,
      },
      {
        symptom: "Query failures (memory)",
        signals: "Errors",
        cause: "Table / intermediate memory spike",
        confidence: 4,
      },
      {
        symptom: "OS OOM killer",
        signals: "dmesg",
        cause: "Host misconfig or overcommit",
        confidence: 5,
      },
    ],
    disk: [
      {
        symptom: "fsync is behind",
        signals: "Logs",
        cause: "Disk latency / IO bottleneck",
        confidence: 4,
      },
      {
        symptom: "Retry loop stalling",
        signals: "Logs",
        cause: "Storage backpressure",
        confidence: 3,
      },
      {
        symptom: "Slow backups",
        signals: "backup history",
        cause: "IO saturation",
        confidence: 3,
      },
    ],
    network: [
      {
        symptom: "ETIMEDOUT",
        signals: "Logs",
        cause: "Network OR node overload",
        confidence: 3,
      },
      {
        symptom: "Node disconnects",
        signals: "Logs",
        cause: "Infra / NIC / CPU starvation",
        confidence: 3,
      },
    ],
    workload: [
      {
        symptom: "Many active queries",
        signals: "processlist",
        cause: "Query pileup",
        confidence: 3,
      },
      {
        symptom: "Sleeping + open txns",
        signals: "processlist",
        cause: "App bug / connection misuse",
        confidence: 4,
      },
      {
        symptom: "Large memory tables",
        signals: "show table status",
        cause: "Skew / bad schema",
        confidence: 3,
      },
    ],
    replication: [
      {
        symptom: "Missing replicas",
        signals: "cluster status",
        cause: "Node failure",
        confidence: 4,
      },
      {
        symptom: "Slow writes",
        signals: "logs",
        cause: "sync replication lag",
        confidence: 3,
      },
      {
        symptom: "Failover events",
        signals: "logs",
        cause: "instability / restart",
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
          next: "Check cluster status → Node offline? → Check logs for restart/crash → Check dmesg for OOM → Check disk full?",
        },
        {
          label: "Yes → Are queries slow?",
          next: "Check CPU (top) → High? Check compile count + sync→async spikes → Check disk: fsync behind? → Check processlist: long-running queries?",
        },
        {
          label: "Query failures?",
          next: "Memory errors? → Check Nonfatal logs → Compare maximum_memory vs usage → Check table memory",
        },
        {
          label: "ETIMEDOUT present?",
          next: "Check NIC errors → Check CPU saturation → Check leaf responsiveness",
        },
        {
          label: "Writes slow?",
          next: "fsync behind? → Retry loop stalling? → Disk usage >85%?",
        },
      ],
    },
  ],

  deepDiveModules: [
    {
      title: "Module A: Compilation Storm",
      indicators: ["High compile/hour", "sync → async transitions"],
      rootCauses: ["Non-parameterized queries", "Query churn"],
      fixes: ["Parameterize queries", "Increase plancache efficiency"],
    },
    {
      title: "Module B: Memory Pressure",
      indicators: ["Nonfatal buffer manager logs", "Query failures"],
      steps: ["Compare maximum_memory vs Total_server_memory"],
    },
    {
      title: "Module C: Disk Bottleneck",
      indicators: ["fsync lag", "backup slowdown"],
      steps: ["Check disk latency", "Check blob size growth"],
    },
    {
      title: "Module D: Network vs CPU Ambiguity",
      indicators: ["ETIMEDOUT errors"],
      steps: [
        "CPU high → NOT network",
        "NIC errors → IS network",
        "Disk slow → cascading timeout",
      ],
    },
    {
      title: "Module E: Replication Issues",
      indicators: ["Missing sync replicas", "Partition role imbalance"],
      steps: ["Check partition roles", "Check missing sync replicas"],
    },
  ],

  heuristics: [
    {
      rule: 1,
      title: "Never trust a single signal",
      detail: "Always correlate: Logs + OS + InfoSchema",
    },
    {
      rule: 2,
      title: "Time correlation > raw logs",
      detail: "Focus on spikes, not totals",
    },
    {
      rule: 3,
      title: "Weakest node defines the cluster",
      detail: "One bad leaf → fanout slowdown for all queries",
    },
    {
      rule: 4,
      title: "Aggregator vs Leaf separation",
      detail:
        "Aggregator → compile, routing issues. Leaf → memory, disk issues",
    },
    {
      rule: 5,
      title: "Most incidents are NOT infra",
      detail: "Top real causes: bad queries, memory misconfig, disk saturation",
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
   - CPU spike + compile storm → query issue

4. Root Cause:
   - <specific cause>

5. Supporting Evidence:
   - logs / metrics

6. Recommended Fix:
   - Immediate:
   - Long-term:`;
