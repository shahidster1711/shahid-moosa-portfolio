import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OUTPUT_TEMPLATE, runbookData } from "@/data/runbook";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  Brain,
  Database,
  GitBranch,
  HardDrive,
  Network,
  Server,
  Shield,
  Wifi,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ── Category colors ───────────────────────────────────────────────────────────
const categoryStyles: Record<
  string,
  { badge: string; icon: string; bg: string; border: string }
> = {
  red: {
    badge: "bg-destructive/15 text-destructive border-destructive/30",
    icon: "text-destructive",
    bg: "bg-destructive/5",
    border: "border-destructive/20",
  },
  orange: {
    badge: "bg-accent/15 text-accent border-accent/30",
    icon: "text-accent",
    bg: "bg-accent/5",
    border: "border-accent/20",
  },
  yellow: {
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    icon: "text-yellow-400",
    bg: "bg-yellow-500/5",
    border: "border-yellow-500/20",
  },
  blue: {
    badge: "bg-primary/15 text-primary border-primary/30",
    icon: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  Availability: <Server className="w-5 h-5" />,
  Performance: <Activity className="w-5 h-5" />,
  Errors: <AlertTriangle className="w-5 h-5" />,
  "Data Risk": <Shield className="w-5 h-5" />,
};

const tabIcons: Record<string, React.ReactNode> = {
  performance: <Zap className="w-3.5 h-3.5" />,
  memory: <Brain className="w-3.5 h-3.5" />,
  disk: <HardDrive className="w-3.5 h-3.5" />,
  network: <Wifi className="w-3.5 h-3.5" />,
  workload: <Database className="w-3.5 h-3.5" />,
  replication: <Network className="w-3.5 h-3.5" />,
};

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

// ── Confidence stars ──────────────────────────────────────────────────────────
function ConfidenceStars({ level }: { level: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`Confidence: ${level} out of 5`}
    >
      {STAR_POSITIONS.map((pos) => (
        <span
          key={pos}
          className={cn(
            "text-xs",
            pos <= level ? "text-accent" : "text-muted-foreground/30",
          )}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// ── Incident classification panel ─────────────────────────────────────────────
function IncidentClassification() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded bg-destructive/15 border border-destructive/30 flex items-center justify-center">
          <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Step 0 — Incident Classification
        </h2>
        <Badge variant="outline" className="font-mono text-xs ml-2">
          DO THIS FIRST
        </Badge>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {runbookData.incidentCategories.map((cat) => {
          const styles = categoryStyles[cat.color];
          return (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={cn(
                "rounded-lg border p-4 flex flex-col gap-2",
                styles.bg,
                styles.border,
              )}
              data-ocid={`incident-category-${cat.label.toLowerCase().replace(" ", "-")}`}
            >
              <div className={cn("flex items-center gap-2", styles.icon)}>
                {categoryIcons[cat.label]}
                <span className="font-display font-semibold text-sm">
                  {cat.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cat.examples}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Symptom mapping tabs ──────────────────────────────────────────────────────
function SymptomMappingTabs() {
  const tabs = Object.keys(runbookData.symptomMappings);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Database className="w-3.5 h-3.5 text-primary" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Symptom → Root Cause Mapping
        </h2>
      </div>

      <Tabs defaultValue="performance" data-ocid="symptom-tabs">
        <TabsList className="flex-wrap h-auto gap-1 mb-4 bg-muted/40 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="flex items-center gap-1.5 font-mono text-sm capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid={`tab-${tab}`}
            >
              {tabIcons[tab]}
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-base">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="text-left px-4 py-3 font-mono text-sm text-muted-foreground uppercase tracking-wider">
                        Symptom
                      </th>
                      <th className="text-left px-4 py-3 font-mono text-sm text-muted-foreground uppercase tracking-wider">
                        Logs / Signals
                      </th>
                      <th className="text-left px-4 py-3 font-mono text-sm text-muted-foreground uppercase tracking-wider">
                        Likely Root Cause
                      </th>
                      <th className="text-left px-4 py-3 font-mono text-sm text-muted-foreground uppercase tracking-wider">
                        Confidence
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {runbookData.symptomMappings[tab].map((row) => (
                      <tr
                        key={`${tab}-${row.symptom}`}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`symptom-row-${tab}-${row.symptom.toLowerCase().replace(/\W/g, "-")}`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {row.symptom}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                          {row.signals}
                        </td>
                        <td className="px-4 py-3 text-foreground/80">
                          {row.cause}
                        </td>
                        <td className="px-4 py-3">
                          <ConfidenceStars level={row.confidence} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}

// ── Decision tree ─────────────────────────────────────────────────────────────
const DECISION_PATH_CLASSES = [
  "border-destructive/40 bg-destructive/5 text-destructive",
  "border-accent/40 bg-accent/5 text-accent",
  "border-yellow-500/40 bg-yellow-500/5 text-yellow-400",
  "border-primary/40 bg-primary/5 text-primary",
  "border-primary/30 bg-primary/5 text-primary",
] as const;

function DecisionTree() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded bg-accent/15 border border-accent/30 flex items-center justify-center">
          <GitBranch className="w-3.5 h-3.5 text-accent" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Decision Tree
        </h2>
        <Badge
          variant="outline"
          className="font-mono text-xs ml-2 text-muted-foreground"
        >
          Battle-tested
        </Badge>
      </div>

      <div className="rounded-lg border border-border bg-card/60 p-6">
        {/* Entry point */}
        <div className="flex justify-center mb-6">
          <div className="rounded-lg border-2 border-primary bg-primary/10 px-6 py-3 font-display font-semibold text-primary text-center shadow-glow-sm">
            {runbookData.decisionTree[0].step}
          </div>
        </div>

        {/* Branches */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
          data-ocid="decision-tree"
        >
          {runbookData.decisionTree[0].options.map((opt) => {
            const colorClass =
              DECISION_PATH_CLASSES[
                runbookData.decisionTree[0].options.indexOf(opt)
              ] ?? DECISION_PATH_CLASSES[4];
            return (
              <motion.div
                key={opt.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "rounded-lg border p-4 flex flex-col gap-2",
                  colorClass,
                )}
                data-ocid={`decision-path-${opt.label.toLowerCase().replace(/\W/g, "-")}`}
              >
                <p className="font-display font-semibold text-base leading-tight">
                  {opt.label}
                </p>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {opt.next}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ── Deep dive accordion ───────────────────────────────────────────────────────
function DeepDiveModules() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Brain className="w-3.5 h-3.5 text-primary" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Deep Dive Modules
        </h2>
        <Badge
          variant="outline"
          className="font-mono text-xs ml-2 text-muted-foreground"
        >
          L3 Level
        </Badge>
      </div>

      <Accordion
        type="multiple"
        className="space-y-2"
        data-ocid="deep-dive-accordion"
      >
        {runbookData.deepDiveModules.map((mod) => {
          const modKey = mod.title.toLowerCase().replace(/\W/g, "-");
          return (
            <AccordionItem
              key={mod.title}
              value={modKey}
              className="border border-border rounded-lg bg-card/40 px-4 overflow-hidden"
              data-ocid={`module-${modKey}`}
            >
              <AccordionTrigger className="font-display font-semibold text-base hover:no-underline hover:text-primary py-4">
                {mod.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4 space-y-4">
                <div>
                  <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Indicators
                  </p>
                  <ul className="space-y-1">
                    {mod.indicators.map((ind) => (
                      <li
                        key={ind}
                        className="flex items-center gap-2 text-base text-foreground/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
                {mod.rootCauses && (
                  <div>
                    <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Root Causes
                    </p>
                    <ul className="space-y-1">
                      {mod.rootCauses.map((rc) => (
                        <li
                          key={rc}
                          className="flex items-center gap-2 text-base text-foreground/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                          {rc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {mod.fixes && (
                  <div>
                    <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Fixes
                    </p>
                    <ul className="space-y-1">
                      {mod.fixes.map((fix) => (
                        <li
                          key={fix}
                          className="flex items-center gap-2 text-base text-foreground/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {fix}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {mod.steps && (
                  <div>
                    <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Investigation Steps
                    </p>
                    <ol className="space-y-1">
                      {mod.steps.map((step, stepIdx) => (
                        <li
                          key={step}
                          className="flex items-start gap-2 text-base text-foreground/80"
                        >
                          <span className="font-mono text-xs text-primary/60 mt-0.5 flex-shrink-0">
                            {stepIdx + 1}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </motion.div>
  );
}

// ── Heuristics panel ──────────────────────────────────────────────────────────
function HeuristicsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded bg-accent/15 border border-accent/30 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-accent" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          L3 Heuristics
        </h2>
        <Badge
          variant="outline"
          className="font-mono text-xs ml-2 text-accent border-accent/30"
        >
          Expert Mode
        </Badge>
      </div>

      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        data-ocid="heuristics-panel"
      >
        {runbookData.heuristics.map((h) => (
          <motion.div
            key={`rule-${h.rule}`}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border border-border bg-card/60 p-4 flex flex-col gap-2 hover:border-primary/40 hover:bg-card transition-all duration-200"
            data-ocid={`heuristic-rule-${h.rule}`}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent border border-accent/30 rounded px-1.5 py-0.5 bg-accent/10">
                Rule {h.rule}
              </span>{" "}
              <span className="font-display font-semibold text-base text-foreground">
                {h.title}
              </span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {h.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Output template ───────────────────────────────────────────────────────────
function OutputTemplate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded bg-muted border border-border flex items-center justify-center">
          <Server className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Final Output Template
        </h2>
        <Badge
          variant="outline"
          className="font-mono text-xs ml-2 text-muted-foreground"
        >
          For Tickets
        </Badge>
      </div>

      <div
        className="rounded-lg border border-border bg-card overflow-hidden"
        data-ocid="output-template"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
          <span className="w-3 h-3 rounded-full bg-destructive opacity-80" />
          <span className="w-3 h-3 rounded-full bg-accent opacity-80" />
          <span className="w-3 h-3 rounded-full bg-primary opacity-80" />
          <span className="font-mono text-xs text-muted-foreground ml-2">
            incident-response.md
          </span>
        </div>
        <pre className="p-5 font-mono text-base text-foreground/80 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          <code>{OUTPUT_TEMPLATE}</code>
        </pre>
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function L3RunbookSection() {
  return (
    <section className="py-20 bg-background relative" id="runbook">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-[0.06] bg-primary" />

      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://cdn.brandfetch.io/singlestore.com/w/400/h/400"
              alt="SingleStore"
              className="h-6 w-auto object-contain rounded opacity-90"
            />
            <p className="font-mono text-primary text-sm tracking-widest uppercase">
              {"// SingleStore L3 Support"}
            </p>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            L3 Incident{" "}
            <span className="text-primary text-glow-primary">
              Investigation
            </span>{" "}
            Runbook
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Structured exactly like internal escalation playbooks used in
            high-severity incidents. Battle-tested workflows for diagnosing
            SingleStore cluster failures.
          </p>
        </motion.div>

        <IncidentClassification />
        <SymptomMappingTabs />
        <DecisionTree />
        <DeepDiveModules />
        <HeuristicsPanel />
        <OutputTemplate />
      </div>
    </section>
  );
}
