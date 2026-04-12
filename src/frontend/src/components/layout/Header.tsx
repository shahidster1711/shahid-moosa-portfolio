import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Where I Work", href: "/#company" },
  { label: "Writing", href: "/#writing" },
  { label: "Experience", href: "/#experience" },
  { label: "Philosophy", href: "/#philosophy" },
  { label: "L3 Runbook", href: "/runbook", isPage: true },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    return router.subscribe("onLoad", () => setMobileOpen(false));
  }, [router]);

  function handleNavClick(
    href: string,
    isPage: boolean | undefined,
    e: React.MouseEvent,
  ) {
    if (!isPage && href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.replace("/#", "");
      const currentPath = router.state.location.pathname;
      if (currentPath !== "/") {
        window.location.href = href;
      } else {
        scrollToSection(sectionId);
      }
      setMobileOpen(false);
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/90 backdrop-blur-md border-b border-border/60 shadow-lg"
          : "bg-transparent",
      )}
      data-ocid="nav-header"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav-logo"
          >
            <div className="w-8 h-8 rounded flex items-center justify-center transition-all duration-200 group-hover:drop-shadow-[0_0_8px_oklch(0.7_0.22_200/0.7)]">
              <img
                src="/assets/images/logo.svg"
                alt="Shahid Moosa logo"
                width={32}
                height={32}
                decoding="async"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-sm text-foreground tracking-tight block">
                Shahid Moosa
              </span>
              <span className="font-mono text-xs text-primary/70 block">
                {"// db.support"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="nav-links"
          >
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.label}
                  to={link.href as "/runbook"}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                    "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    "[&.active]:text-primary [&.active]:bg-primary/10",
                  )}
                  data-ocid="nav-runbook"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, link.isPage, e)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                    "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href="mailto:connect2shahidmoosa@gmail.com"
              className="ml-3"
              data-ocid="nav-contact-cta"
            >
              <Button
                size="sm"
                className="font-mono text-xs glow-primary transition-smooth bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {"$ contact --me"}
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="nav-mobile-toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border/60">
          <nav
            className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1"
            data-ocid="nav-mobile-links"
          >
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.label}
                  to={link.href as "/runbook"}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors [&.active]:text-primary"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, link.isPage, e)}
                  className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ),
            )}
            <a href="mailto:connect2shahidmoosa@gmail.com" className="mt-2">
              <Button
                size="sm"
                className="w-full font-mono text-xs bg-primary text-primary-foreground"
              >
                {"$ contact --me"}
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
