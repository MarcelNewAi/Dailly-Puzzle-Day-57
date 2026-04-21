"use client";

import { Cormorant_Garamond, Outfit } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import ContextualCta from "./components/ContextualCta";
import DotNav from "./components/DotNav";
import ContactSection from "./components/sections/ContactSection";
import HeroSection from "./components/sections/HeroSection";
import PhilosophySection from "./components/sections/PhilosophySection";
import ProcessSection from "./components/sections/ProcessSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import StudioSection from "./components/sections/StudioSection";
import { sections } from "./sections";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--v23-font-display",
  weight: ["300", "600"],
});

const bodyFont = Outfit({
  subsets: ["latin"],
  variable: "--v23-font-body",
  weight: ["300", "400", "500"],
});

export default function V23Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(() => new Set(["hero"]));

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    const sectionElements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-section]"),
    );

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingIds: string[] = [];
        let strongestSectionId: string | null = null;
        let strongestRatio = 0;

        entries.forEach((entry) => {
          const sectionId = (entry.target as HTMLElement).dataset.section;
          if (!sectionId || !entry.isIntersecting) {
            return;
          }

          intersectingIds.push(sectionId);

          if (entry.intersectionRatio > strongestRatio) {
            strongestRatio = entry.intersectionRatio;
            strongestSectionId = sectionId;
          }
        });

        if (intersectingIds.length > 0) {
          setVisibleSections((previous) => {
            let hasChanged = false;
            const next = new Set(previous);

            intersectingIds.forEach((sectionId) => {
              if (!next.has(sectionId)) {
                hasChanged = true;
                next.add(sectionId);
              }
            });

            return hasChanged ? next : previous;
          });
        }

        if (strongestSectionId) {
          setActiveSection(strongestSectionId);
        }
      },
      { threshold: 0.4 },
    );

    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeMeta = useMemo(
    () => sections.find((section) => section.id === activeSection) ?? sections[0],
    [activeSection],
  );

  return (
    <div ref={scrollRef} className="v23-scroll-shell">
      <div className={`${displayFont.variable} ${bodyFont.variable} v23-root`}>
        <main className="v23-page">
          <HeroSection
            isVisible={visibleSections.has("hero")}
            isActive={activeSection === "hero"}
          />
          <StudioSection
            isVisible={visibleSections.has("studio")}
            isActive={activeSection === "studio"}
          />
          <ProcessSection
            isVisible={visibleSections.has("process")}
            isActive={activeSection === "process"}
          />
          <ProjectsSection
            isVisible={visibleSections.has("projects")}
            isActive={activeSection === "projects"}
          />
          <PhilosophySection
            isVisible={visibleSections.has("philosophy")}
            isActive={activeSection === "philosophy"}
          />
          <ContactSection
            isVisible={visibleSections.has("contact")}
            isActive={activeSection === "contact"}
          />
        </main>

        <DotNav sections={sections} activeSection={activeSection} />
        <ContextualCta sectionMeta={activeMeta} />
        <ExplanationTriggerButton versionId="v23" />
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#c9a84c"
        thumbHoverColor="#e2c97e"
        trackColorLight="rgba(255, 255, 255, 0.08)"
        trackColorDark="rgba(255, 255, 255, 0.08)"
      />
    </div>
  );
}
