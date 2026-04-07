"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type JSX, type ReactNode } from "react";
import BuilderLayout from "./components/BuilderLayout";
import CommandPalette from "./components/CommandPalette";
import { CommandPaletteProvider } from "./components/CommandPaletteProvider";
import LivePreview from "./components/LivePreview";
import PreviewToolbar from "./components/PreviewToolbar";
import SectionList from "./components/SectionList";
import ContactSection from "./components/sections/ContactSection";
import FAQSection from "./components/sections/FAQSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import FooterSection from "./components/sections/FooterSection";
import HeroSection from "./components/sections/HeroSection";
import PricingSection from "./components/sections/PricingSection";
import StatsSection from "./components/sections/StatsSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import type { CommandActionHandlers } from "./components/useCommands";

const STORAGE_KEY = "v7_section_order";
const DEFAULT_ORDER = ["hero", "features", "stats", "testimonials", "pricing", "faq", "contact", "footer"] as const;

type SectionId = (typeof DEFAULT_ORDER)[number];

type SectionDefinition = {
  id: SectionId;
  name: string;
  description: string;
  icon: ReactNode;
  Component: () => JSX.Element;
};

const SECTION_REGISTRY: Record<SectionId, SectionDefinition> = {
  hero: {
    id: "hero",
    name: "Hero",
    description: "Main banner with title and CTA",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 4 8v8l8 5 8-5V8l-8-5Zm0 2.2 5.9 3.7L12 12.6 6.1 8.9 12 5.2Zm-6 5.4 5 3.1v5.1l-5-3.1v-5.1Zm7 8.2v-5.1l5-3.1v5.1l-5 3.1Z" />
      </svg>
    ),
    Component: HeroSection,
  },
  features: {
    id: "features",
    name: "Features",
    description: "Services grid with icons",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />
      </svg>
    ),
    Component: FeaturesSection,
  },
  stats: {
    id: "stats",
    name: "Stats",
    description: "Performance metrics row",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20V9h3v11H4Zm6 0V4h3v16h-3Zm6 0v-7h3v7h-3Z" />
      </svg>
    ),
    Component: StatsSection,
  },
  testimonials: {
    id: "testimonials",
    name: "Testimonials",
    description: "Client quotes and social proof",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.5 11H4v-1.7C4 6.4 6.4 4 9.3 4H10v2H9.3C7.5 6 6 7.5 6 9.3V9h2.5v6.5ZM20 11h-4.5v-1.7C15.5 6.4 17.9 4 20.8 4h.7v2h-.7C19 6 17.5 7.5 17.5 9.3V9H20v6.5Z" />
      </svg>
    ),
    Component: TestimonialsSection,
  },
  pricing: {
    id: "pricing",
    name: "Pricing",
    description: "Subscription plan comparison",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 3 6v6c0 5.2 3.7 10 9 11 5.3-1 9-5.8 9-11V6l-9-4Zm1 14.7h-2v-1.9H9.1v-1.7H11v-1.6H9.1V9.8H11V8h2v1.8h1.9v1.7H13v1.6h1.9v1.7H13v1.9Z" />
      </svg>
    ),
    Component: PricingSection,
  },
  faq: {
    id: "faq",
    name: "FAQ",
    description: "Common questions and answers",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3Zm-.2 5a3.2 3.2 0 0 0-3.2 3.2h2a1.2 1.2 0 1 1 2.4 0c0 .6-.5 1.1-1 1.5l-.8.6a3.3 3.3 0 0 0-1.4 2.7v.4h2v-.3c0-.5.2-.9.6-1.2l.8-.6a4 4 0 0 0 1.8-3.1A3.2 3.2 0 0 0 11.8 8Zm-.8 10h2v2h-2v-2Z" />
      </svg>
    ),
    Component: FAQSection,
  },
  contact: {
    id: "contact",
    name: "Contact",
    description: "Lead capture contact form",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2v.5l9 5.4 9-5.4V7l-9 5.4L3 7Zm0 2.8V17h18V9.8l-9 5.4-9-5.4Z" />
      </svg>
    ),
    Component: ContactSection,
  },
  footer: {
    id: "footer",
    name: "Footer",
    description: "Links and copyright block",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18v2H3V6Zm0 5h12v2H3v-2Zm0 5h18v2H3v-2Z" />
      </svg>
    ),
    Component: FooterSection,
  },
};

function isValidSectionOrder(value: unknown): value is SectionId[] {
  if (!Array.isArray(value) || value.length !== DEFAULT_ORDER.length) {
    return false;
  }

  const allKnownIds = value.every((entry): entry is SectionId =>
    typeof entry === "string" && DEFAULT_ORDER.includes(entry as SectionId),
  );

  return allKnownIds && new Set(value).size === DEFAULT_ORDER.length;
}

function readInitialOrder(): SectionId[] {
  if (typeof window === "undefined") {
    return [...DEFAULT_ORDER];
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [...DEFAULT_ORDER];
  }

  try {
    const parsed: unknown = JSON.parse(saved);
    return isValidSectionOrder(parsed) ? parsed : [...DEFAULT_ORDER];
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return [...DEFAULT_ORDER];
  }
}

export default function V7Page() {
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>(readInitialOrder);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [isSavedHot, setIsSavedHot] = useState(false);
  const [showResetNotice, setShowResetNotice] = useState(false);
  const [isResetAnimating, setIsResetAnimating] = useState(false);
  const [isSectionListOpen, setIsSectionListOpen] = useState(true);
  const [previewPastTop, setPreviewPastTop] = useState(false);
  const [previewPulsing, setPreviewPulsing] = useState(false);

  const previewRef = useRef<HTMLDivElement | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const previewPulseTimeoutRef = useRef<number | null>(null);

  const triggerSavedState = useCallback(() => {
    setIsSavedHot(true);
    if (saveTimeoutRef.current !== null) {
      window.clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = window.setTimeout(() => {
      setIsSavedHot(false);
    }, 1800);
  }, []);

  const triggerPreviewPulse = useCallback(() => {
    setPreviewPulsing(true);
    if (previewPulseTimeoutRef.current !== null) {
      window.clearTimeout(previewPulseTimeoutRef.current);
    }
    previewPulseTimeoutRef.current = window.setTimeout(() => {
      setPreviewPulsing(false);
    }, 180);
  }, []);

  const persistOrder = useCallback(
    (nextOrder: SectionId[]) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrder));
      triggerSavedState();
      triggerPreviewPulse();
    },
    [triggerPreviewPulse, triggerSavedState],
  );

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current !== null) {
        window.clearTimeout(saveTimeoutRef.current);
      }
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
      if (previewPulseTimeoutRef.current !== null) {
        window.clearTimeout(previewPulseTimeoutRef.current);
      }
    };
  }, []);

  const orderedSections = useMemo(() => sectionOrder.map((id) => SECTION_REGISTRY[id]), [sectionOrder]);

  const handleDropCommit = useCallback(
    (overrideDropIndex?: number) => {
      const commitDropIndex = overrideDropIndex ?? dropIndex;
      if (draggedIndex === null || commitDropIndex === null) {
        setDraggedIndex(null);
        setDropIndex(null);
        return;
      }

      setSectionOrder((previousOrder) => {
        const boundedDrop = Math.max(0, Math.min(commitDropIndex, previousOrder.length));
        const targetIndex = draggedIndex < boundedDrop ? boundedDrop - 1 : boundedDrop;

        if (targetIndex === draggedIndex) {
          return previousOrder;
        }

        const nextOrder = [...previousOrder];
        const [movedSection] = nextOrder.splice(draggedIndex, 1);
        nextOrder.splice(targetIndex, 0, movedSection);
        persistOrder(nextOrder);

        return nextOrder;
      });

      setDraggedIndex(null);
      setDropIndex(null);
    },
    [draggedIndex, dropIndex, persistOrder],
  );

  const handleKeyboardMove = useCallback(
    (index: number, direction: -1 | 1) => {
      const target = index + direction;
      if (target < 0 || target >= sectionOrder.length) {
        return;
      }

      setSectionOrder((previousOrder) => {
        const nextOrder = [...previousOrder];
        const [movedSection] = nextOrder.splice(index, 1);
        nextOrder.splice(target, 0, movedSection);
        persistOrder(nextOrder);
        return nextOrder;
      });
    },
    [persistOrder, sectionOrder.length],
  );

  const handleReset = useCallback(() => {
    const resetOrder = [...DEFAULT_ORDER];
    setSectionOrder(resetOrder);
    setDraggedIndex(null);
    setDropIndex(null);
    setShowResetNotice(true);
    setIsResetAnimating(true);
    persistOrder(resetOrder);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setShowResetNotice(false);
      setIsResetAnimating(false);
    }, 2000);
  }, [persistOrder]);

  const moveSectionByDirection = useCallback(
    (direction: -1 | 1) => {
      setSectionOrder((previousOrder) => {
        if (previousOrder.length < 2) {
          return previousOrder;
        }

        const activeElement = document.activeElement;
        const rowElement =
          activeElement instanceof HTMLElement ? activeElement.closest<HTMLElement>("[data-v7-item-index]") : null;
        const parsedIndex = rowElement?.dataset.v7ItemIndex ? Number(rowElement.dataset.v7ItemIndex) : 0;
        const fromIndex = Number.isFinite(parsedIndex)
          ? Math.max(0, Math.min(parsedIndex, previousOrder.length - 1))
          : 0;
        const targetIndex = fromIndex + direction;

        if (targetIndex < 0 || targetIndex >= previousOrder.length) {
          return previousOrder;
        }

        const nextOrder = [...previousOrder];
        const [movedSection] = nextOrder.splice(fromIndex, 1);
        nextOrder.splice(targetIndex, 0, movedSection);
        persistOrder(nextOrder);
        return nextOrder;
      });
    },
    [persistOrder],
  );

  const handleShuffle = useCallback(() => {
    setDraggedIndex(null);
    setDropIndex(null);

    setSectionOrder((previousOrder) => {
      const nextOrder = [...previousOrder];

      for (let index = nextOrder.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [nextOrder[index], nextOrder[swapIndex]] = [nextOrder[swapIndex], nextOrder[index]];
      }

      persistOrder(nextOrder);
      return nextOrder;
    });
  }, [persistOrder]);

  const handleReverse = useCallback(() => {
    setDraggedIndex(null);
    setDropIndex(null);

    setSectionOrder((previousOrder) => {
      const nextOrder = [...previousOrder].reverse();
      persistOrder(nextOrder);
      return nextOrder;
    });
  }, [persistOrder]);

  const handleClearSavedLayout = useCallback(() => {
    const resetOrder = [...DEFAULT_ORDER];
    window.localStorage.removeItem(STORAGE_KEY);
    setSectionOrder(resetOrder);
    setDraggedIndex(null);
    setDropIndex(null);
    setShowResetNotice(false);
    setIsResetAnimating(false);
    triggerPreviewPulse();
  }, [triggerPreviewPulse]);

  const handleToggleTheme = useCallback(() => {
    const pageRoot = document.querySelector<HTMLElement>(".v7-page");
    pageRoot?.classList.toggle("v7-cmd-theme-light");
  }, []);

  const handleExportLayout = useCallback(async () => {
    if (!navigator.clipboard?.writeText) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(sectionOrder, null, 2));
      return true;
    } catch {
      return false;
    }
  }, [sectionOrder]);

  const commandActions = useMemo<CommandActionHandlers>(
    () => ({
      resetLayout: handleReset,
      moveSectionUp: () => moveSectionByDirection(-1),
      moveSectionDown: () => moveSectionByDirection(1),
      shuffleSections: handleShuffle,
      reverseSections: handleReverse,
      scrollPreviewTop: () => {
        previewRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      },
      scrollPreviewBottom: () => {
        const previewElement = previewRef.current;
        if (!previewElement) {
          return;
        }
        previewElement.scrollTo({ top: previewElement.scrollHeight, behavior: "smooth" });
      },
      toggleSidebar: () => {
        setIsSectionListOpen((open) => !open);
      },
      toggleTheme: handleToggleTheme,
      exportLayout: handleExportLayout,
      clearSavedData: handleClearSavedLayout,
    }),
    [handleClearSavedLayout, handleExportLayout, handleReset, handleReverse, handleShuffle, handleToggleTheme, moveSectionByDirection],
  );

  return (
    <CommandPaletteProvider>
      <BuilderLayout
        isSectionListOpen={isSectionListOpen}
        onToggleSectionList={() => setIsSectionListOpen((open) => !open)}
        sidebar={
          <SectionList
            sections={orderedSections}
            draggedIndex={draggedIndex}
            dropIndex={dropIndex}
            isResetAnimating={isResetAnimating}
            showResetNotice={showResetNotice}
            onDragStart={(index) => {
              setDraggedIndex(index);
              setDropIndex(index);
            }}
            onDragHover={setDropIndex}
            onDrop={handleDropCommit}
            onDragEnd={() => {
              setDraggedIndex(null);
              setDropIndex(null);
            }}
            onKeyboardMove={handleKeyboardMove}
            onReset={handleReset}
          />
        }
        toolbar={
          <>
            <PreviewToolbar
              sectionCount={sectionOrder.length}
              isSavedHot={isSavedHot}
              showScrollTop={previewPastTop}
              onScrollToTop={() => {
                previewRef.current?.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            <CommandPalette actions={commandActions} />
          </>
        }
        preview={
          <LivePreview
            previewRef={previewRef}
            sections={orderedSections}
            previewPulsing={previewPulsing}
            onPreviewScroll={(top) => {
              setPreviewPastTop(top > 24);
            }}
          />
        }
      />
    </CommandPaletteProvider>
  );
}

