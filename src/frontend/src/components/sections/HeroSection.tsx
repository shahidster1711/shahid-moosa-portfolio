import { Button } from "@/components/ui/button";
import { ChevronDown, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TERMINAL_SEQUENCES = [
  {
    cmd: "$ query_optimizer --analyze \"SELECT * FROM events WHERE ts > NOW() - INTERVAL '7d'\"",
    out: "> Analyzing query plan... Index scan recommended on (ts, user_id)",
    outColor: "text-primary",
  },
  {
    cmd: "$ shard_monitor --cluster prod-us-east",
    out: "> Checking 24 shards... All healthy. Replication lag: 2ms",
    outColor: "text-primary",
  },
  {
    cmd: "$ consistency_check --model eventual",
    out: "> CAP theorem mode: AP (Available + Partition tolerant)",
    outColor: "text-accent",
  },
  {
    cmd: "$ latency_profile --p99 --service api-gateway",
    out: "> P99: 12ms | P999: 47ms | Throughput: 142k req/s",
    outColor: "text-primary",
  },
];

function LiveTerminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [phase, setPhase] = useState<"typing-cmd" | "showing-out" | "pausing">(
    "typing-cmd",
  );
  const [displayCmd, setDisplayCmd] = useState("");
  const [showOut, setShowOut] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typing animation
  useEffect(() => {
    const seq = TERMINAL_SEQUENCES[lineIndex];

    if (phase === "typing-cmd") {
      setDisplayCmd("");
      setShowOut(false);
      let i = 0;
      const id = setInterval(() => {
        i++;
        setDisplayCmd(seq.cmd.slice(0, i));
        if (i >= seq.cmd.length) {
          clearInterval(id);
          setTimeout(() => setPhase("showing-out"), 300);
        }
      }, 28);
      return () => clearInterval(id);
    }

    if (phase === "showing-out") {
      setShowOut(true);
      const id = setTimeout(() => setPhase("pausing"), 1800);
      return () => clearTimeout(id);
    }

    if (phase === "pausing") {
      const id = setTimeout(() => {
        setLineIndex((v) => (v + 1) % TERMINAL_SEQUENCES.length);
        setPhase("typing-cmd");
      }, 900);
      return () => clearTimeout(id);
    }
  }, [phase, lineIndex]);

  const seq = TERMINAL_SEQUENCES[lineIndex];

  return (
    <div
      ref={terminalRef}
      className="rounded-lg border border-border bg-card overflow-hidden font-mono text-sm shadow-glow-md"
      data-ocid="terminal-window"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
        <span className="w-3 h-3 rounded-full bg-destructive opacity-80" />
        <span className="w-3 h-3 rounded-full bg-accent opacity-80" />
        <span className="w-3 h-3 rounded-full bg-primary opacity-80" />
        <div className="flex items-center gap-1.5 ml-3 text-muted-foreground text-xs">
          <Terminal className="w-3 h-3" />
          <span>shahid@cluster-01 ~ bash</span>
        </div>
        <div className="ml-auto flex items-center">
          <img
            src="/assets/images/logo.png"
            alt="AI agent"
            className="w-5 h-5 object-contain opacity-70"
            style={{ filter: "drop-shadow(0 0 4px oklch(0.7 0.22 200 / 0.6))" }}
            aria-hidden="true"
          />
        </div>
      </div>
      {/* Content */}
      <div className="p-5 min-h-[120px] space-y-2">
        <p className="text-primary/80 text-xs mb-3 select-none">
          {"// Live terminal — distributed systems diagnostics"}
        </p>
        <p className="text-foreground/90 leading-relaxed break-all">
          {displayCmd}
          {phase === "typing-cmd" && (
            <span
              className={`inline-block w-2 h-4 bg-primary ml-0.5 align-text-bottom transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </p>
        {showOut && (
          <motion.p
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={`leading-relaxed ${seq.outColor}`}
          >
            {seq.out}
          </motion.p>
        )}
        {phase !== "typing-cmd" && (
          <p className="text-muted-foreground/60 text-xs pt-1">
            {"$ "}
            {phase === "pausing" && (
              <span
                className={`inline-block w-1.5 h-3.5 bg-muted-foreground/60 ml-0.5 align-text-bottom transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
              />
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  const handleScrollToWriting = () => {
    document.getElementById("writing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] [background-image:linear-gradient(oklch(var(--primary))_1px,transparent_1px),linear-gradient(90deg,oklch(var(--primary))_1px,transparent_1px)] [background-size:60px_60px]" />
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-[0.12] bg-primary" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-[0.08] bg-accent" />

      <div className="relative z-10 container max-w-5xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Headshot avatar */}
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-primary opacity-30 blur-[16px] scale-110 pointer-events-none" />
                  {/* Border ring */}
                  <div className="relative w-[140px] h-[140px] rounded-full p-[3px] bg-gradient-to-br from-primary via-primary/60 to-accent/40 shadow-[0_0_32px_4px_oklch(var(--primary)/0.35)]">
                    <img
                      src="/assets/images/headshot.jpeg"
                      alt="Shahid Moosa - Database Support Engineer"
                      className="w-full h-full rounded-full object-cover object-top"
                      data-ocid="hero-headshot"
                    />
                  </div>
                  {/* Online indicator dot */}
                  <span
                    className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_8px_2px_oklch(var(--primary)/0.6)]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <p className="font-mono text-primary text-base lg:text-lg mb-4 tracking-widest uppercase text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
                <motion.img
                  src="/assets/images/logo.png"
                  alt="AI agent logo"
                  className="w-5 h-5 object-contain"
                  style={{
                    filter: "drop-shadow(0 0 6px oklch(0.7 0.22 200 / 0.75))",
                  }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
                {"// Engineering at Scale"}
              </p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight mb-4 text-foreground text-center lg:text-left">
                <span className="text-primary text-glow-primary">
                  Shahid Moosa
                </span>
              </h1>
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-foreground/80 mb-5 text-center lg:text-left">
                Database Support Engineer
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md"
            >
              Specializing in cloud databases, high-scale query optimization,
              and reliable infrastructure. Building systems that stay standing
              when everything else breaks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                onClick={handleScrollToWriting}
                className="glow-primary transition-smooth"
                size="lg"
                data-ocid="hero-cta-writing"
              >
                Read My Writing
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="transition-smooth border-border hover:border-primary hover:text-primary"
                onClick={() =>
                  document
                    .getElementById("experience")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero-cta-experience"
              >
                View Experience
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 mt-10 pt-8 border-t border-border"
            >
              {[
                { value: "8+", label: "Years Engineering" },
                { value: "256", label: "Max Node Clusters" },
                { value: "38%", label: "P99 Latency Gain" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column: terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <LiveTerminal />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
