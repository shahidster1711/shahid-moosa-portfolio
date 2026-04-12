import { VoiceIntroButton } from "@/components/ui/VoiceIntroButton";
import { Button } from "@/components/ui/button";
import { ChevronDown, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TERMINAL_SEQUENCES = [
  {
    cmd: "$ singlestore_diag --cluster prod-sg01 --check replication",
    out: "> Replication lag: 1ms | Leaf nodes: 8/8 healthy | No stalls detected",
    outColor: "text-primary",
  },
  {
    cmd: "$ incident --severity P1 --type ingest_pipeline_stall",
    out: "> Triaging... Pipeline offset stalled at partition 3. Escalating to engineering.",
    outColor: "text-accent",
  },
  {
    cmd: "$ node_health --cluster prod-sg01 --aggregator",
    out: "> Aggregator memory: 72% | CPU: 41% | Query concurrency: 18 active",
    outColor: "text-primary",
  },
  {
    cmd: "$ runbook --issue slow_queries --suggest",
    out: "> Check: missing indexes, skewed partitions, compilation storm, resource contention",
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
            src="/assets/images/logo.svg"
            alt="AI agent"
            width={20}
            height={20}
            decoding="async"
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(id);
  }, []);

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
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Headshot avatar */}
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-primary opacity-30 blur-[16px] scale-110 pointer-events-none" />
                  {/* Border ring */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-[3px] bg-gradient-to-br from-primary via-primary/60 to-accent/40 shadow-[0_0_32px_4px_oklch(var(--primary)/0.35)]">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="./assets/images/headshot.webp 1x, ./assets/images/headshot-2x.webp 2x"
                      />
                      <img
                        src="./assets/images/headshot.jpeg"
                        alt="Shahid Moosa — Senior Database Support Engineer"
                        width={192}
                        height={192}
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full rounded-full object-cover object-center"
                        data-ocid="hero-headshot"
                      />
                    </picture>
                  </div>
                  {/* Online indicator dot */}
                  <span
                    className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_8px_2px_oklch(var(--primary)/0.6)]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Voice Intro — entrance after avatar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex justify-center lg:justify-start mb-5"
              >
                <VoiceIntroButton />
              </motion.div>

              <p className="font-mono text-primary text-base lg:text-lg mb-4 tracking-widest uppercase text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
                <motion.img
                  src="/assets/images/logo.svg"
                  alt="AI agent logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                  style={{
                    filter: "drop-shadow(0 0 6px oklch(0.7 0.22 200 / 0.75))",
                  }}
                  animate={
                    mounted ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.7 }
                  }
                  transition={
                    mounted
                      ? {
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }
                      : {}
                  }
                  aria-hidden="true"
                />
                {"// Cloud Database Support"}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-foreground text-center lg:text-left">
                <span className="text-primary text-glow-primary">
                  Shahid Moosa
                </span>
              </h1>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground/80 mb-5 text-center lg:text-left">
                Senior Database Support Engineer
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8 max-w-md"
            >
              Nearly 6 years of expertise in Distributed SQL, PostgreSQL
              internals, and Cloud Infrastructure (AWS/Azure). Specialist in
              disaster recovery and building full-stack tools to automate
              engineering workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
              animate={mounted ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 mt-10 pt-8 border-t border-border"
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "Tier-2/3", label: "Support Level" },
                { value: "Enterprise", label: "Clusters" },
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
            animate={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <LiveTerminal />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
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
