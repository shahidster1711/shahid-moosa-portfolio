import { CompanySection } from "@/components/sections/CompanySection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { WritingSection } from "@/components/sections/WritingSection";
import { updateSEO } from "@/lib/seo";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "Shahid Moosa — Database Cloud Support Engineer",
      description:
        "Personal engineering portfolio of Shahid Moosa, a Database Cloud Support Engineer specializing in cloud databases, Tier-2/3 enterprise support, incident management, and distributed systems.",
      canonical: "https://www.shahidster.tech",
    });
  }, []);

  return (
    <div className="scroll-smooth">
      <HeroSection />
      <CompanySection />
      <WritingSection />
      <ExperienceSection />
      <PhilosophySection />
    </div>
  );
}
