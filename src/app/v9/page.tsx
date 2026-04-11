"use client";

import { DM_Sans, Fraunces, Playfair_Display } from "next/font/google";
import { useMemo, useRef } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import { useActiveSection } from "./components/ScrollTracker";
import StickyCtaBar from "./components/StickyCtaBar";
import FaqSection from "./components/sections/FaqSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import FinalCtaSection from "./components/sections/FinalCtaSection";
import HeroSection from "./components/sections/HeroSection";
import PricingSection from "./components/sections/PricingSection";
import ProblemSection from "./components/sections/ProblemSection";
import SocialProofSection from "./components/sections/SocialProofSection";
import SolutionSection from "./components/sections/SolutionSection";
import SectionWrapper from "./components/ui/SectionWrapper";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-v9-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-v9-fraunces",
  weight: ["500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-v9-playfair",
  weight: ["600", "700"],
});

const sectionIds = ["hero", "problem", "solution", "features", "social-proof", "pricing", "faq", "final-cta"] as const;

export default function V9Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackedSections = useMemo(() => [...sectionIds], []);
  const activeSection = useActiveSection(trackedSections);

  const handleCtaClick = () => {
    const pricingSection = document.getElementById("pricing");
    pricingSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar pb-20">
        <main className={`${dmSans.variable} ${fraunces.variable} ${playfair.variable} v9-page`}>
          <SectionWrapper id="hero" className="v9-surface-primary">
            <HeroSection />
          </SectionWrapper>

          <SectionWrapper id="problem" className="v9-surface-problem">
            <ProblemSection />
          </SectionWrapper>

          <SectionWrapper id="solution" className="v9-surface-primary">
            <SolutionSection />
          </SectionWrapper>

          <SectionWrapper id="features" className="v9-surface-secondary">
            <FeaturesSection />
          </SectionWrapper>

          <SectionWrapper id="social-proof" className="v9-surface-primary">
            <SocialProofSection />
          </SectionWrapper>

          <SectionWrapper id="pricing" className="v9-surface-secondary">
            <PricingSection />
          </SectionWrapper>

          <SectionWrapper id="faq" className="v9-surface-primary">
            <FaqSection />
          </SectionWrapper>

          <SectionWrapper id="final-cta" className="v9-surface-accent">
            <FinalCtaSection />
          </SectionWrapper>

          <footer className="v9-footer">
            <div className="v9-shell v9-footer-inner">
              <p>Built for modern teams. Trusted by 2,000+ product organizations.</p>
              <p>(c) 2026 LaunchFlow. All rights reserved.</p>
            </div>
          </footer>

          <StickyCtaBar activeSection={activeSection} onCtaClick={handleCtaClick} />
          <ExplanationTriggerButton versionId="v9" />
        </main>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#6366F1" thumbHoverColor="#4F46E5" />
    </>
  );
}
