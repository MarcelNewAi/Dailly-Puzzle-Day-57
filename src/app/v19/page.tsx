"use client";

import { Fraunces, Inter } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import ChecklistGroup from "./components/ChecklistGroup";
import ReadinessCTA from "./components/ReadinessCTA";
import ReadinessHeader from "./components/ReadinessHeader";
import StatusSummary from "./components/StatusSummary";
import TipsAccordion from "./components/TipsAccordion";
import { checklist, type ChecklistItem as ChecklistDataItem } from "./data/checklist";

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-v19-heading",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v19-body",
  weight: ["400", "500", "600", "700"],
});

const STORAGE_KEY = "v19_checklist_state";
const allItems = checklist.flatMap((category) => category.items);
const requiredList = allItems.filter((item) => item.required);

interface ReadinessStatus {
  completedCount: number;
  totalCount: number;
  completedRequired: number;
  totalRequired: number;
  percentage: number;
  state: "not-started" | "in-progress" | "almost-ready" | "ready";
  missingRequired: ChecklistDataItem[];
}

function calculateReadiness(completed: Record<string, boolean>): ReadinessStatus {
  const completedCount = allItems.filter((item) => completed[item.id]).length;
  const completedRequired = requiredList.filter((item) => completed[item.id]).length;
  const missingRequired = requiredList.filter((item) => !completed[item.id]);
  const percentage = Math.round((completedCount / allItems.length) * 100);

  let state: ReadinessStatus["state"];
  if (completedCount === 0) {
    state = "not-started";
  } else if (completedRequired < requiredList.length) {
    state = "in-progress";
  } else if (completedRequired === requiredList.length && completedCount < allItems.length) {
    state = "almost-ready";
  } else {
    state = "ready";
  }

  return {
    completedCount,
    totalCount: allItems.length,
    completedRequired,
    totalRequired: requiredList.length,
    percentage,
    state,
    missingRequired,
  };
}

export default function V19Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [hasLoadedState, setHasLoadedState] = useState(false);
  const [clearNotice, setClearNotice] = useState(false);

  const categoryStartIndex = useMemo(() => {
    const offsets: Record<string, number> = {};
    let current = 0;
    for (const category of checklist) {
      offsets[category.id] = current;
      current += category.items.length;
    }
    return offsets;
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const frame = window.requestAnimationFrame(() => {
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Record<string, boolean>;
          setCompleted(parsed);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
      setHasLoadedState(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedState) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed, hasLoadedState]);

  useEffect(() => {
    if (!clearNotice) {
      return;
    }
    const timer = window.setTimeout(() => setClearNotice(false), 1600);
    return () => window.clearTimeout(timer);
  }, [clearNotice]);

  const status = useMemo(() => calculateReadiness(completed), [completed]);

  const toggleItem = (id: string) => {
    setCompleted((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  const clearChecklist = () => {
    setCompleted({});
    localStorage.removeItem(STORAGE_KEY);
    setClearNotice(true);
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} v19-page`}>
          <ReadinessHeader />

          <section className="v19-main">
            <StatusSummary
              percentage={status.percentage}
              completedCount={status.completedCount}
              totalCount={status.totalCount}
              completedRequired={status.completedRequired}
              totalRequired={status.totalRequired}
              state={status.state}
              missingRequiredCount={status.missingRequired.length}
            />

            <section className="v19-checklist-area" aria-label="Client readiness checklist categories">
              {checklist.map((category) => (
                <ChecklistGroup
                  key={category.id}
                  category={category}
                  completed={completed}
                  startIndex={categoryStartIndex[category.id] ?? 0}
                  onToggle={toggleItem}
                />
              ))}
            </section>

            <TipsAccordion />

            <ReadinessCTA state={status.state} missingRequired={status.missingRequired} />

            <div className="v19-reset-wrap">
              <button type="button" className="v19-reset-button" onClick={clearChecklist}>
                Clear Checklist
              </button>
              {clearNotice ? <span className="v19-reset-confirmation">Checklist cleared ✓</span> : null}
            </div>
          </section>

          <ExplanationTriggerButton versionId="v19" />
        </main>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#6D28D9"
        thumbHoverColor="#5B21B6"
      />
    </>
  );
}
