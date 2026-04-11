"use client";

import { useRef } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import Hero from "./components/home/Hero";
import QuickActions from "./components/home/QuickActions";
import SystemStatus from "./components/home/SystemStatus";

export default function V5HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <div className="nq-page">
          <Hero />
          <SystemStatus />
          <QuickActions />
          <ExplanationTriggerButton versionId="v5" />
        </div>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#00F0FF" thumbHoverColor="#00D4E0" />
    </>
  );
}
