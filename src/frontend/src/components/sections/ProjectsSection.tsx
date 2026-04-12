import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";
import { Calendar, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-primary/10 text-primary border-primary/30",
  "In Progress": "bg-accent/10 text-accent border-accent/30",
};

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-primary text-sm mb-3 tracking-widest uppercase">
            {"// Side Projects"}
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            Full-stack tools and apps built to solve real problems — from AI
            travel planning to engineering workflow automation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-ocid={`project-${project.id}`}
            >
              <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col hover:border-primary/30 transition-smooth hover:shadow-glow-sm">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-primary/70 font-mono text-xs mt-0.5">
                      {project.type}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded border ${STATUS_STYLES[project.status]}`}
                    >
                      {project.status}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground/60">
                      <Calendar className="w-3 h-3" />
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-base leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs font-mono bg-muted/50 text-muted-foreground border-0"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:text-primary/80 font-mono transition-colors"
                    data-ocid={`project-${project.id}-link`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Project
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
