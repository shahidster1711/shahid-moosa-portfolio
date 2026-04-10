import { Separator } from "@/components/ui/separator";
import { personalInfo } from "@/data/portfolio";
import { ExternalLink, Linkedin, Mail, MapPin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "shahidster.tech";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-border/50 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="font-display font-bold text-lg text-foreground tracking-tight">
                {personalInfo.name}
              </span>
              <p className="text-primary font-mono text-sm mt-1">
                {"// "}
                {personalInfo.title}
              </p>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xs">
              Building systems that scale reliably. Writing about distributed
              systems, databases, and engineering culture.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm text-foreground/60 uppercase tracking-widest">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Writing", href: "/#writing" },
                { label: "Experience", href: "/#experience" },
                { label: "Philosophy", href: "/#philosophy" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm text-foreground/60 uppercase tracking-widest">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-base group"
                data-ocid="footer-email"
              >
                <Mail className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-base group"
                data-ocid="footer-linkedin"
              >
                <Linkedin className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                LinkedIn
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <div className="flex items-center gap-2 text-muted-foreground text-base">
                <MapPin className="w-4 h-4 text-primary/60" />
                {personalInfo.location}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border/40 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
