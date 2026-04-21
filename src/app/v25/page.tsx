"use client";

import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import CountdownDisplay from "./components/CountdownDisplay";
import LiveIndicator from "./components/LiveIndicator";
import OfferClosedScreen from "./components/OfferClosedScreen";
import OfferDetails from "./components/OfferDetails";
import ScarcityBar from "./components/ScarcityBar";
import {
  getTimeRemaining,
  initOfferState,
  OFFER_DURATION_MS,
  saveOfferState,
  TOTAL_SPOTS,
  type OfferState,
} from "./countdown";

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  variable: "--v25-font-display",
  weight: "400",
});

const bodyFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--v25-font-body",
  weight: ["300", "400"],
});

const INITIAL_OFFER_STATE: OfferState = {
  startedAt: 0,
  spotsRemaining: TOTAL_SPOTS,
};

const INITIAL_TIME_REMAINING = {
  total: OFFER_DURATION_MS,
  hours: 48,
  minutes: 0,
  seconds: 0,
  expired: false,
};

type OfferPhase = "active" | "expired" | "sold-out";

export default function V25Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [offerState, setOfferState] = useState<OfferState>(INITIAL_OFFER_STATE);
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_REMAINING);

  useEffect(() => {
    setMounted(true);

    const persistedOfferState = initOfferState();
    setOfferState(persistedOfferState);
    setTimeRemaining(getTimeRemaining(persistedOfferState.startedAt));
  }, []);

  useEffect(() => {
    if (!mounted || offerState.startedAt <= 0) {
      return;
    }

    const syncTime = () => {
      const next = getTimeRemaining(offerState.startedAt);
      setTimeRemaining(next);
      return next.expired;
    };

    if (syncTime()) {
      return;
    }

    const timer = window.setInterval(() => {
      const hasExpired = syncTime();
      if (hasExpired) {
        window.clearInterval(timer);
      }
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [mounted, offerState.startedAt]);

  const phase = useMemo<OfferPhase>(() => {
    if (timeRemaining.expired) {
      return "expired";
    }

    if (offerState.spotsRemaining === 0) {
      return "sold-out";
    }

    return "active";
  }, [offerState.spotsRemaining, timeRemaining.expired]);

  const elapsedPercent = useMemo(() => {
    const elapsed = OFFER_DURATION_MS - timeRemaining.total;
    const ratio = elapsed / OFFER_DURATION_MS;
    return Math.min(Math.max(ratio, 0), 1) * 100;
  }, [timeRemaining.total]);

  const handleClaim = useCallback(() => {
    if (phase !== "active") {
      return;
    }

    setOfferState((previous) => {
      if (previous.spotsRemaining <= 0) {
        return previous;
      }

      const nextState: OfferState = {
        ...previous,
        spotsRemaining: Math.max(0, previous.spotsRemaining - 1),
      };
      saveOfferState(nextState);
      return nextState;
    });
  }, [phase]);

  if (!mounted) {
    return (
      <div ref={scrollRef} className="v25-scroll-shell hide-native-scrollbar">
        <div className={`${displayFont.variable} ${bodyFont.variable} v25-root`}>
          <main className="v25-page v25-page--skeleton" aria-hidden="true">
            <header className="v25-top-bar v25-top-bar--skeleton" />
            <section className="v25-skeleton-block" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={scrollRef} className="v25-scroll-shell hide-native-scrollbar">
        <div className={`${displayFont.variable} ${bodyFont.variable} v25-root`}>
          <main className="v25-page">
            {phase === "active" ? (
              <>
                <span className="v25-horizon-line" aria-hidden="true" />
                <aside className="v25-editorial-rail" aria-hidden="true">
                  <span>QUANTA_BETA</span>
                  <span>LAUNCH_WINDOW</span>
                  <span>T_MINUS</span>
                </aside>

                <header className="v25-top-bar">
                  <div className="v25-top-bar-left">
                    <LiveIndicator />
                  </div>

                  <div className="v25-top-bar-progress" aria-hidden="true">
                    <span style={{ width: `${elapsedPercent}%` }} />
                  </div>

                  <p className="v25-top-bar-title">QUANTA / LAUNCH</p>
                </header>

                <section className="v25-countdown-section">
                  <div className="v25-countdown-intro">
                    <p className="v25-countdown-word">EARLY</p>
                    <p className="v25-countdown-word v25-countdown-word--offset">ACCESS</p>
                    <p className="v25-countdown-meta">WINDOW 48H // LIVE COHORT</p>
                  </div>

                  <div className="v25-section-divider" />

                  <CountdownDisplay
                    hours={timeRemaining.hours}
                    minutes={timeRemaining.minutes}
                    seconds={timeRemaining.seconds}
                  />

                  <div className="v25-section-divider" />
                  <span className="v25-vertical-marker" aria-hidden="true">
                    48H EARLY ACCESS
                  </span>
                </section>

                <ScarcityBar spotsRemaining={offerState.spotsRemaining} totalSpots={TOTAL_SPOTS} />
                <OfferDetails spotsRemaining={offerState.spotsRemaining} phase={phase} onClaim={handleClaim} />
              </>
            ) : (
              <OfferClosedScreen reason={phase} />
            )}

            <ExplanationTriggerButton versionId="v25" />
          </main>
        </div>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#00e5d4"
        thumbHoverColor="#00e5d4"
        trackColorLight="rgba(0, 229, 212, 0.08)"
        trackColorDark="rgba(0, 229, 212, 0.08)"
      />
    </>
  );
}
