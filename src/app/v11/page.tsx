"use client";

import { Inter, Space_Grotesk } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import ContentSections from "./components/ContentSections";
import DebugPanel from "./components/DebugPanel";
import DismissedBanner from "./components/DismissedBanner";
import ExitIntentModal from "./components/ExitIntentModal";
import PageHeader from "./components/PageHeader";
import { useExitIntent } from "./components/hooks/useExitIntent";
import { useIdleDetection } from "./components/hooks/useIdleDetection";

type DismissReason = "closed" | "submitted" | null;
type TriggerSource = "exit" | "idle" | "manual" | null;

interface SessionDismissedPayload {
  reason: Exclude<DismissReason, null>;
  timestamp: number;
}

interface SessionDefaults {
  hasBeenShown: boolean;
  dismissalReason: DismissReason;
  bannerHidden: boolean;
}

const STORAGE_KEY = "v11_modal_dismissed";
const BANNER_STORAGE_KEY = "v11_banner_hidden";
const IDLE_TIME = 30000;

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-v11-heading",
  weight: ["500", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v11-body",
  weight: ["400", "500", "600", "700"],
});

function readSessionDefaults(): SessionDefaults {
  if (typeof window === "undefined") {
    return {
      hasBeenShown: false,
      dismissalReason: null,
      bannerHidden: false,
    };
  }

  try {
    const dismissedRaw = sessionStorage.getItem(STORAGE_KEY);
    const bannerHidden = sessionStorage.getItem(BANNER_STORAGE_KEY) === "true";
    if (!dismissedRaw) {
      return {
        hasBeenShown: false,
        dismissalReason: null,
        bannerHidden,
      };
    }

    const parsed = JSON.parse(dismissedRaw) as SessionDismissedPayload;
    if (parsed.reason === "closed" || parsed.reason === "submitted") {
      return {
        hasBeenShown: true,
        dismissalReason: parsed.reason,
        bannerHidden,
      };
    }
  } catch {
    // no-op: use defaults
  }

  return {
    hasBeenShown: false,
    dismissalReason: null,
    bannerHidden: false,
  };
}

function readHasFinePointer(): boolean {
  if (typeof window === "undefined") {
    return true;
  }
  return window.matchMedia("(pointer: fine)").matches;
}

export default function V11Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSessionHydrated, setIsSessionHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [dismissalReason, setDismissalReason] = useState<DismissReason>(null);
  const [lastTriggerSource, setLastTriggerSource] = useState<TriggerSource>(null);
  const [bannerHidden, setBannerHidden] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(readHasFinePointer);
  const [mobileDebugExpanded, setMobileDebugExpanded] = useState(false);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);

  useEffect(() => {
    const sessionDefaults = readSessionDefaults();
    setHasBeenShown(sessionDefaults.hasBeenShown);
    setDismissalReason(sessionDefaults.dismissalReason);
    setBannerHidden(sessionDefaults.bannerHidden);
    setIsSessionHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const handlePointerChange = (event: MediaQueryListEvent) => {
      setHasFinePointer(event.matches);
    };

    mediaQuery.addEventListener("change", handlePointerChange);
    return () => mediaQuery.removeEventListener("change", handlePointerChange);
  }, []);

  const triggerModal = useCallback(
    (source: Exclude<TriggerSource, null>, force = false) => {
      if (hasBeenShown && !force) {
        return;
      }
      setLastTriggerSource(source);
      setModalInstanceKey((current) => current + 1);
      setIsModalOpen(true);
      setHasBeenShown(true);
    },
    [hasBeenShown],
  );

  const handleDismiss = useCallback((reason: Exclude<DismissReason, null>) => {
    setIsModalOpen(false);
    setDismissalReason(reason);
    setHasBeenShown(true);
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          reason,
          timestamp: Date.now(),
        } satisfies SessionDismissedPayload),
      );
    } catch {
      // no-op for demo mode when storage is unavailable
    }
  }, []);

  useExitIntent({
    enabled: isSessionHydrated && !hasBeenShown && hasFinePointer,
    onExitIntent: () => triggerModal("exit"),
  });

  const { secondsUntilIdle } = useIdleDetection({
    enabled: isSessionHydrated && !hasBeenShown,
    idleTimeMs: IDLE_TIME,
    onIdle: () => triggerModal("idle"),
  });

  const status = useMemo<"watching" | "triggered" | "dismissed">(() => {
    if (isModalOpen) {
      return "triggered";
    }
    if (dismissalReason) {
      return "dismissed";
    }
    return "watching";
  }, [dismissalReason, isModalOpen]);

  const handleHideBanner = () => {
    setBannerHidden(true);
    try {
      sessionStorage.setItem(BANNER_STORAGE_KEY, "true");
    } catch {
      // no-op for demo mode when storage is unavailable
    }
  };

  const handleResetSession = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(BANNER_STORAGE_KEY);
    } catch {
      // no-op for demo mode when storage is unavailable
    }
    setIsModalOpen(false);
    setHasBeenShown(false);
    setDismissalReason(null);
    setLastTriggerSource(null);
    setBannerHidden(false);
    setMobileDebugExpanded(false);
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} v11-page`}>
          <DismissedBanner
            visible={!isModalOpen && dismissalReason !== null && !bannerHidden}
            onReopen={() => triggerModal("manual", true)}
            onHide={handleHideBanner}
          />

          <PageHeader status={status} onManualTrigger={() => triggerModal("manual")} />
          <ContentSections />

          <ExitIntentModal key={modalInstanceKey} isOpen={isModalOpen} onDismiss={handleDismiss} />

          <DebugPanel
            status={status}
            secondsUntilIdle={secondsUntilIdle}
            lastTriggerSource={lastTriggerSource}
            sessionDismissed={dismissalReason !== null}
            onResetSession={handleResetSession}
            isTouchOnlyDevice={!hasFinePointer}
            mobileExpanded={mobileDebugExpanded}
            onToggleMobileExpanded={() => setMobileDebugExpanded((current) => !current)}
          />
          <ExplanationTriggerButton versionId="v11" />
        </main>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#10B981" thumbHoverColor="#34D399" />
    </>
  );
}
