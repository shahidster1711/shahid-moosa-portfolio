import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { experiences } from "@/data/portfolio";
import { Award, Calendar, GraduationCap, MapPin } from "lucide-react";
import { motion } from "motion/react";

const EDUCATION = {
  school: "Jain University",
  degree: "Bachelor of Computer Applications",
  period: "2013 – 2016",
  location: "Bengaluru, India",
};

const CERTIFICATIONS = [
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    note: "Expired Dec 2025",
  },
  { name: "Azure Fundamentals (AZ-900)", issuer: "Microsoft", note: "" },
  {
    name: "Web Application Penetration Testing",
    issuer: "EC-Council",
    note: "",
  },
  {
    name: "Introduction to Cyber Security",
    issuer: "CISCO Networking Academy",
    note: "",
  },
];

const COMPANY_COLORS: Record<string, string> = {
  SingleStore: "text-primary",
  "Amazon Web Services": "text-accent",
  Infosys: "text-foreground/70",
};

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-primary text-sm mb-3 tracking-widest uppercase">
            {"// Professional Journey"}
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            5+ years supporting and operating cloud database infrastructure at
            companies from global enterprise to hyperscaler.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="md:pl-12 relative"
                data-ocid={`experience-${exp.id}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full border-2 border-primary bg-background items-center justify-center hidden md:flex">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-glow-pulse" />
                </div>

                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-smooth hover:shadow-glow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {exp.logo && (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="h-7 w-auto object-contain rounded"
                          />
                        )}
                        <h3
                          className={`font-display text-xl font-bold ${COMPANY_COLORS[exp.company] ?? "text-foreground"}`}
                        >
                          {exp.company}
                        </h3>
                      </div>
                      <p className="text-foreground/80 font-medium mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono text-sm text-muted-foreground flex items-center gap-1 justify-end">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground/60 flex items-center gap-1 justify-end mt-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-base mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-base text-foreground/80"
                      >
                        <span className="text-primary mt-1.5 shrink-0 font-mono text-xs">
                          ▸
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs font-mono bg-muted/50 text-muted-foreground border-0"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="my-14 bg-border/50" />

        {/* Education + Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            data-ocid="education-section"
          >
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="font-display text-xl font-bold text-foreground">
                Education
              </h3>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="font-display font-semibold text-foreground">
                {EDUCATION.school}
              </p>
              <p className="text-muted-foreground text-base mt-1">
                {EDUCATION.degree}
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs font-mono text-muted-foreground/70">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {EDUCATION.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {EDUCATION.location}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            data-ocid="certifications-section"
          >
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-5 h-5 text-accent" />
              <h3 className="font-display text-xl font-bold text-foreground">
                Certifications
              </h3>
            </div>
            <div className="space-y-2">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-card border border-border rounded-lg px-4 py-3 flex items-start gap-3"
                >
                  <span className="text-accent font-mono text-sm mt-0.5 shrink-0">
                    ✓
                  </span>
                  <div>
                    <p className="text-base font-medium text-foreground">
                      {cert.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5 font-mono">
                      {cert.issuer}
                    </p>
                    {cert.note && (
                      <p className="text-xs text-muted-foreground/50 mt-0.5 font-mono">
                        {cert.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
