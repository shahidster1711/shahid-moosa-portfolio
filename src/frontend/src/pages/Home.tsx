import { CompanySection } from "@/components/sections/CompanySection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { updateSEO } from "@/lib/seo";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "Shahid Moosa — Senior Database Support Engineer",
      description:
        "Personal engineering portfolio of Shahid Moosa, a Senior Database Support Engineer with nearly 6 years of expertise in Distributed SQL, PostgreSQL internals, and Cloud Infrastructure (AWS/Azure).",
      canonical: "https://www.shahidster.tech",
    });
  }, []);

  return (
    <div className="scroll-smooth">
      <HeroSection />
      <CompanySection />
      <WritingSection />
      <ExperienceSection />
      <ProjectsSection />
      <PhilosophySection />
    </div>
  );
}
