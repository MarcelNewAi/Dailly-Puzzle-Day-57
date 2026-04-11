"use client";

import { useRef } from "react";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import ComputeCalculator from "../components/allocator/ComputeCalculator";

function CalculatorPageIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6" />
      <path d="M9 11h2" />
      <path d="M13 11h2" />
      <path d="M9 15h2" />
      <path d="M13 15h2" />
      <path d="M3 6h2" />
      <path d="M3 10h2" />
    </svg>
  );
}

export default function V5AllocatorPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <div className="nq-page">
          <section className="nq-calculator-header nq-anim-rise nq-anim-delay-1">
            <div className="nq-page-icon" aria-hidden="true">
              <CalculatorPageIcon />
            </div>
            <h1 className="nq-page-title">Compute Cost Calculator</h1>
            <p className="nq-page-subtitle">
              Calculate the exact Q-Credits required to deploy and run your AI model with quantum precision.
            </p>
          </section>
          <ComputeCalculator />
        </div>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#00F0FF" thumbHoverColor="#00D4E0" />
    </>
  );
}
