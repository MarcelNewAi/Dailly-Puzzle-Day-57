"use client";

import { Inter, Syne } from "next/font/google";
import { useRef } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import ExamplesGrid from "./components/ExamplesGrid";
import ShowcaseHeader from "./components/ShowcaseHeader";
import UseCasesSection from "./components/UseCasesSection";

const headingFont = Syne({
  subsets: ["latin"],
  variable: "--font-v16-heading",
  weight: ["600", "700", "800"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v16-body",
  weight: ["400", "500", "600", "700"],
});

export default function V16Page() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} v16-page`}>
          <ShowcaseHeader />
          <ExamplesGrid />
          <UseCasesSection />
          <ExplanationTriggerButton versionId="v16" />
        </main>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#F59E0B"
        thumbHoverColor="#FBBF24"
      />
    </>
  );
}
