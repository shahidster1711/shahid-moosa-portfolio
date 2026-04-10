import { Card, CardContent } from "@/components/ui/card";
import { philosophyPillars } from "@/data/portfolio";
import type { PhilosophyPillar } from "@/types";
import { BookOpen, Database, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

const ICON_MAP: Record<string, React.ElementType> = {
  Database,
  Zap,
  Shield,
  BookOpen,
};

const ICON_COLORS = [
  "text-primary",
  "text-accent",
  "text-primary",
  "text-accent",
];

const GLOW_CLASSES = [
  "hover:shadow-glow-sm hover:border-primary/40",
  "hover:shadow-[0_0_16px_oklch(var(--accent)/0.2),_0_0_32px_oklch(var(--accent)/0.07)] hover:border-accent/40",
  "hover:shadow-glow-sm hover:border-primary/40",
  "hover:shadow-[0_0_16px_oklch(var(--accent)/0.2),_0_0_32px_oklch(var(--accent)/0.07)] hover:border-accent/40",
];

function PillarCard({
  pillar,
  index,
}: { pillar: PhilosophyPillar; index: number }) {
  const Icon = ICON_MAP[pillar.icon] ?? Database;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`philosophy-pillar-${pillar.id}`}
    >
      <Card
        className={`h-full bg-card border-border transition-smooth group ${GLOW_CLASSES[index % GLOW_CLASSES.length]}`}
      >
        <CardContent className="p-6">
          <div
            className={`w-11 h-11 rounded-lg bg-muted/60 flex items-center justify-center mb-5 transition-smooth group-hover:scale-105 ${ICON_COLORS[index % ICON_COLORS.length]}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-foreground mb-3">
            {pillar.title}
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed">
            {pillar.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 bg-muted/20">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-sm mb-3 tracking-widest uppercase">
            {"// How I Think"}
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Engineering Philosophy
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            The principles that guide every system design decision — from schema
            choices to 3 AM incident responses.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {philosophyPillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Quote highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 border-l-4 border-primary pl-6 py-2"
        >
          <blockquote className="text-foreground/80 text-xl font-display font-medium italic leading-relaxed">
            "The right abstraction is one that keeps working when you've
            forgotten how it works."
          </blockquote>
          <p className="font-mono text-sm text-muted-foreground mt-3">
            — Shahid Moosa
          </p>
        </motion.div>
      </div>
    </section>
  );
}
