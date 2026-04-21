"use client";

import { Mulish, Playfair_Display } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import CategoryPanel from "./components/CategoryPanel";
import SummaryPanel from "./components/SummaryPanel";
import ValidationBanner from "./components/ValidationBanner";
import {
  calculateTotals,
  categories,
  type OptionId,
  type ValidationRule,
  validationRules,
} from "./data";
import { decodeSelections, encodeSelections } from "./urlState";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--v24-font-display",
  weight: ["400", "700"],
});

const bodyFont = Mulish({
  subsets: ["latin"],
  variable: "--v24-font-body",
  weight: ["300", "400", "600"],
});

const DEFAULT_SELECTIONS: Record<string, OptionId[]> = {
  design: ["design-ui"],
  development: ["dev-marketing"],
};

function createEmptySelections(): Record<string, OptionId[]> {
  return categories.reduce<Record<string, OptionId[]>>((accumulator, category) => {
    accumulator[category.id] = [];
    return accumulator;
  }, {});
}

function sanitizeSelections(input: Record<string, OptionId[]>): Record<string, OptionId[]> {
  const safe = createEmptySelections();

  categories.forEach((category) => {
    const rawIds = input[category.id] ?? [];
    const allowedIds = new Set(category.options.map((option) => option.id));
    const deduped = rawIds.filter((id, index) => allowedIds.has(id) && rawIds.indexOf(id) === index);
    safe[category.id] = deduped.slice(0, category.maxSelections);
  });

  return safe;
}

function mergeWithDefaults(): Record<string, OptionId[]> {
  return sanitizeSelections({
    ...createEmptySelections(),
    ...DEFAULT_SELECTIONS,
  });
}

function getActiveViolations(selections: Record<string, OptionId[]>): ValidationRule[] {
  const selectedIds = new Set(Object.values(selections).flat());

  return validationRules.filter((rule) => {
    const triggerSelected = selectedIds.has(rule.triggerOptionId);
    if (!triggerSelected) {
      return false;
    }

    const targetSelected = selectedIds.has(rule.targetOptionId);
    if (rule.type === "requires") {
      return !targetSelected;
    }

    return targetSelected;
  });
}

export default function V24Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<{ fadeTimer: number | null; removeTimer: number | null }>({
    fadeTimer: null,
    removeTimer: null,
  });

  const [selections, setSelections] = useState<Record<string, OptionId[]>>(() => mergeWithDefaults());
  const [origin, setOrigin] = useState("");
  const [hasUrlHydrated, setHasUrlHydrated] = useState(false);
  const [toast, setToast] = useState<{ message: string; isExiting: boolean } | null>(null);

  const selectedIds = useMemo(() => new Set(Object.values(selections).flat()), [selections]);

  const violations = useMemo(() => getActiveViolations(selections), [selections]);
  const totals = useMemo(() => calculateTotals(selections), [selections]);

  const isValid = useMemo(() => {
    if (violations.length > 0) {
      return false;
    }

    return categories
      .filter((category) => category.required)
      .every((category) => (selections[category.id] ?? []).length > 0);
  }, [selections, violations]);

  const blockedOptionIds = useMemo(() => {
    const blocked = new Set<OptionId>();
    const hasWebApp = selectedIds.has("dev-webapp");
    const hasScaleHosting = selectedIds.has("hosting-scale");
    const hasEcomm = selectedIds.has("dev-ecomm");

    if ((hasWebApp && !hasScaleHosting) || hasEcomm) {
      blocked.add("hosting-basic");
    }

    violations.forEach((violation) => {
      if (violation.type === "blocks") {
        blocked.add(violation.targetOptionId);
      }
    });

    return blocked;
  }, [selectedIds, violations]);

  const hintedOptionIds = useMemo(() => {
    const hinted = new Set<OptionId>();
    const hasWebApp = selectedIds.has("dev-webapp");
    const hasScaleHosting = selectedIds.has("hosting-scale");
    if (hasWebApp && !hasScaleHosting) {
      hinted.add("hosting-scale");
    }
    return hinted;
  }, [selectedIds]);

  const shareUrl = useMemo(() => {
    const query = encodeSelections(selections);
    if (!origin) {
      return `/v24${query}`;
    }
    return `${origin}/v24${query}`;
  }, [origin, selections]);

  const clearToastTimers = useCallback(() => {
    const { fadeTimer, removeTimer } = toastTimerRef.current;
    if (fadeTimer !== null) {
      window.clearTimeout(fadeTimer);
    }
    if (removeTimer !== null) {
      window.clearTimeout(removeTimer);
    }
  }, []);

  const showToast = useCallback(
    (message: string) => {
      clearToastTimers();

      setToast({ message, isExiting: false });

      toastTimerRef.current.fadeTimer = window.setTimeout(() => {
        setToast((previous) => (previous ? { ...previous, isExiting: true } : null));
      }, 2500);

      toastTimerRef.current.removeTimer = window.setTimeout(() => {
        setToast(null);
      }, 3000);
    },
    [clearToastTimers],
  );

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const parsed = decodeSelections(window.location.search);
      const hasPkg = new URLSearchParams(window.location.search).has("pkg");

      setSelections(hasPkg ? sanitizeSelections(parsed) : mergeWithDefaults());
      setOrigin(window.location.origin);
      setHasUrlHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!hasUrlHydrated) {
      return;
    }

    const query = encodeSelections(selections);
    window.history.replaceState(null, "", `/v24${query}`);
  }, [hasUrlHydrated, selections]);

  useEffect(() => {
    if (!hasUrlHydrated) {
      return;
    }

    if (!(selectedIds.has("dev-ecomm") && selectedIds.has("hosting-basic"))) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setSelections((previous) => ({
        ...previous,
        hosting: (previous.hosting ?? []).filter((id) => id !== "hosting-basic"),
      }));
      showToast("Starter hosting removed - incompatible with E-Commerce");
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [hasUrlHydrated, selectedIds, showToast]);

  useEffect(() => {
    return clearToastTimers;
  }, [clearToastTimers]);

  const handleToggle = useCallback(
    (categoryId: string, optionId: OptionId) => {
      const category = categories.find((item) => item.id === categoryId);
      if (!category) {
        return;
      }

      if (blockedOptionIds.has(optionId)) {
        return;
      }

      setSelections((previous) => {
        const current = previous[categoryId] ?? [];

        if (category.maxSelections === 1) {
          if (current[0] === optionId) {
            return previous;
          }

          return {
            ...previous,
            [categoryId]: [optionId],
          };
        }

        const alreadySelected = current.includes(optionId);

        if (alreadySelected) {
          if (category.required && current.length === 1) {
            return previous;
          }

          return {
            ...previous,
            [categoryId]: current.filter((id) => id !== optionId),
          };
        }

        if (current.length >= category.maxSelections) {
          return previous;
        }

        return {
          ...previous,
          [categoryId]: [...current, optionId],
        };
      });
    },
    [blockedOptionIds],
  );

  return (
    <>
      <div ref={scrollRef} className="v24-scroll-shell hide-native-scrollbar">
        <div className={`${displayFont.variable} ${bodyFont.variable} v24-root`}>
          <div className="v24-atmosphere" aria-hidden="true">
            <span className="v24-atmosphere-orb v24-atmosphere-orb--one" />
            <span className="v24-atmosphere-orb v24-atmosphere-orb--two" />
            <span className="v24-atmosphere-grid" />
          </div>
          <main className="v24-page">
            <header className="v24-header">
              <div className="v24-header-top">
                <p className="v24-studio-name">FORMA STUDIO</p>
                <p className="v24-puzzle-label">Puzzle #92 - Package Builder</p>
              </div>
              <div className="v24-header-rule" aria-hidden="true" />
              <h1>Build your engagement</h1>
              <p>Compose a bespoke project package. Prices update live.</p>
            </header>

            <ValidationBanner violations={violations} />

            <div className="v24-layout">
              <div className="v24-panels-col">
                {categories.map((category) => (
                  <CategoryPanel
                    key={category.id}
                    category={category}
                    selectedIds={selections[category.id] ?? []}
                    onToggle={handleToggle}
                    violations={violations}
                    blockedOptionIds={blockedOptionIds}
                    hintedOptionIds={hintedOptionIds}
                  />
                ))}
              </div>

              <div className="v24-summary-col">
                <SummaryPanel
                  selections={selections}
                  totals={totals}
                  isValid={isValid}
                  shareUrl={shareUrl}
                  categories={categories}
                />
              </div>
            </div>

            <ExplanationTriggerButton versionId="v24" />
          </main>
        </div>
      </div>

      {toast ? <div className={`v24-toast ${toast.isExiting ? "v24-toast--exiting" : ""}`}>{toast.message}</div> : null}

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#2563eb"
        thumbHoverColor="#1d4ed8"
        trackColorLight="rgba(37, 99, 235, 0.12)"
        trackColorDark="rgba(37, 99, 235, 0.12)"
      />
    </>
  );
}
