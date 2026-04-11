import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const CAPABILITY_CHIPS = [
  "Real-Time HTAP",
  "Vector & AI Search",
  "10-100x Faster",
  "Millisecond Latency",
  "Enterprise Scale",
  "MySQL Compatible",
];

export function CompanySection() {
  return (
    <section
      id="company"
      className="relative py-20 overflow-hidden bg-background"
      data-ocid="company-section"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[140px] pointer-events-none opacity-[0.07] bg-primary" />

      <div className="relative z-10 container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Section label */}
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-primary/50" />
            Where I Work
          </p>

          {/* Main card */}
          <div
            className="relative rounded-2xl border border-primary/30 bg-card p-8 md:p-10 overflow-hidden
              transition-shadow duration-300 hover:shadow-[0_0_40px_oklch(var(--primary)/0.18),0_0_80px_oklch(var(--primary)/0.08)]
              shadow-[0_0_20px_oklch(var(--primary)/0.10)]"
            data-ocid="company-card"
          >
            {/* Decorative watermark */}
            <div
              className="absolute -right-8 -top-8 font-display font-black text-[10rem] leading-none text-primary/[0.03] select-none pointer-events-none tracking-tighter"
              aria-hidden="true"
            >
              S
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start relative">
              {/* Left: Company identity */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src="https://cdn.brandfetch.io/singlestore.com/w/400/h/400"
                    alt="SingleStore"
                    className="h-10 w-auto object-contain rounded-md transition-shadow duration-300"
                    style={{ filter: "drop-shadow(0 0 0px transparent)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "drop-shadow(0 0 8px oklch(0.78 0.18 190 / 0.7))";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "drop-shadow(0 0 0px transparent)";
                    }}
                  />
                  <h2
                    className="font-display text-4xl font-bold leading-tight"
                    style={{
                      color: "#EE00F5",
                      textShadow: "0 0 20px #EE00F5aa, 0 0 40px #EE00F588",
                    }}
                  >
                    SingleStore
                  </h2>
                </div>
                <p className="text-muted-foreground text-base leading-snug mb-6">
                  The Real-Time Data Platform for the AI Era
                </p>

                {/* Capability chips */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.15,
                      },
                    },
                  }}
                >
                  {CAPABILITY_CHIPS.map((chip) => (
                    <motion.div
                      key={chip}
                      variants={{
                        hidden: { opacity: 0, scale: 0.85 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          transition: { duration: 0.3 },
                        },
                      }}
                    >
                      <Badge
                        variant="outline"
                        className="rounded-full px-3 py-1 text-xs font-mono text-primary border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors duration-200 cursor-default"
                      >
                        {chip}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right: Body + CTA */}
              <div className="space-y-4">
                <p className="text-foreground/90 text-base leading-relaxed">
                  I'm a Database Cloud Support Engineer at SingleStore — the
                  unified real-time data platform powering some of the world's
                  most demanding workloads. SingleStore enables enterprises to
                  transact, analyze, and search across live data simultaneously,
                  with millisecond latency at massive scale.
                </p>
                <p className="text-foreground/90 text-base leading-relaxed">
                  My role focuses on Tier-2/3 technical support for enterprise
                  customers running SingleStore in production — diagnosing
                  replication failures, ingest pipeline stalls, node health
                  issues, and query performance degradation. I lead
                  high-severity incident management (P1/P2) following ITIL
                  processes, collaborate with engineering teams on critical
                  escalations, and author runbooks and knowledge base articles
                  to accelerate resolution. If you're running SingleStore or
                  evaluating it for your stack, I'd love to connect.
                </p>

                {/* CTA */}
                <div className="pt-2 space-y-3">
                  <p className="text-muted-foreground text-sm">
                    Interested in SingleStore or working with similar
                    challenges?{" "}
                    <span className="text-foreground/80">Let's connect.</span>
                  </p>
                  <a
                    href="https://www.linkedin.com/in/shahidmoosa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="company-linkedin-cta"
                  >
                    <Button
                      size="lg"
                      className="glow-primary transition-smooth group"
                    >
                      Connect on LinkedIn
                      <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </a>
                </div>

                {/* Awards note */}
                <p className="text-muted-foreground/50 text-xs font-mono pt-1 tracking-wide">
                  ✦ Gartner Magic Quadrant 2025 · TrustRadius Buyer's Choice
                  2025
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
