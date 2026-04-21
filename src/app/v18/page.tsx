"use client";

import { Fraunces, Manrope } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import DeveloperTestMode from "./components/DeveloperTestMode";
import EmergencyBanner from "./components/EmergencyBanner";
import HoursHeader from "./components/HoursHeader";
import HoursSchedule from "./components/HoursSchedule";
import NextOpenCountdown from "./components/NextOpenCountdown";
import StatusBadge from "./components/StatusBadge";
import StatusCTA from "./components/StatusCTA";
import { businessHours, businessInfo } from "./data/businessHours";
import { getBusinessStatus, type BusinessStatus } from "./lib/businessStatus";
import { getDateForCurrentWeekDay, getZonedDateParts } from "./lib/timezone";

interface ActiveOverride {
  presetId: string;
  baseMs: number;
  realStartedMs: number;
}

interface TestPreset {
  id: string;
  label: string;
  dayIndexMon0: number;
  hour: number;
  minute: number;
}

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-v18-heading",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-v18-body",
  weight: ["400", "500", "600", "700"],
});

const TEST_PRESETS: TestPreset[] = [
  { id: "mon-open", label: "Monday 10:00 (Open)", dayIndexMon0: 0, hour: 10, minute: 0 },
  { id: "mon-emergency", label: "Monday 19:00 (Emergency)", dayIndexMon0: 0, hour: 19, minute: 0 },
  { id: "mon-closed", label: "Monday 23:00 (Closed)", dayIndexMon0: 0, hour: 23, minute: 0 },
  { id: "sun-emergency", label: "Sunday 14:00 (Emergency Only)", dayIndexMon0: 6, hour: 14, minute: 0 },
  { id: "sun-closed", label: "Sunday 06:00 (Closed)", dayIndexMon0: 6, hour: 6, minute: 0 },
];

export default function V18Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [realNow, setRealNow] = useState(() => new Date());
  const [activeOverride, setActiveOverride] = useState<ActiveOverride | null>(null);
  const [status, setStatus] = useState<BusinessStatus>(() => getBusinessStatus(new Date()));

  const effectiveNow = useMemo(() => {
    if (!activeOverride) {
      return realNow;
    }
    const elapsed = realNow.getTime() - activeOverride.realStartedMs;
    return new Date(activeOverride.baseMs + elapsed);
  }, [activeOverride, realNow]);

  const activePresetId = activeOverride?.presetId ?? null;
  const isTestMode = Boolean(activeOverride);

  const currentDayIndex = useMemo(
    () => getZonedDateParts(effectiveNow, businessInfo.timezone).dayIndexMon0,
    [effectiveNow],
  );

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      setRealNow(new Date());
    }, 1000);

    return () => window.clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    const statusTimer = window.setInterval(() => {
      const nextNow = activeOverride
        ? new Date(activeOverride.baseMs + (Date.now() - activeOverride.realStartedMs))
        : new Date();
      setStatus(getBusinessStatus(nextNow));
    }, 30000);

    return () => window.clearInterval(statusTimer);
  }, [activeOverride]);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} v18-page`}>
          <HoursHeader businessName={businessInfo.name} now={effectiveNow} timezone={businessInfo.timezone} />

          <section className="v18-main">
            <StatusBadge status={status} />

            {status.state === "closed" ? (
              <NextOpenCountdown nextOpen={status.nextOpen} now={effectiveNow} />
            ) : null}

            <StatusCTA status={status} />

            <EmergencyBanner
              show={status.state !== "open-regular"}
              emergencyPhone={businessInfo.emergencyPhone}
            />

            <HoursSchedule schedule={businessHours} currentDayIndex={currentDayIndex} status={status} />

            <DeveloperTestMode
              presets={TEST_PRESETS.map((preset) => ({ id: preset.id, label: preset.label }))}
              activePresetId={activePresetId}
              isTestMode={isTestMode}
              onUseRealTime={() => {
                setActiveOverride(null);
                const now = new Date();
                setRealNow(now);
                setStatus(getBusinessStatus(now));
              }}
              onSelectPreset={(presetId) => {
                const preset = TEST_PRESETS.find((item) => item.id === presetId);
                if (!preset) {
                  return;
                }
                const base = getDateForCurrentWeekDay(
                  new Date(),
                  businessInfo.timezone,
                  preset.dayIndexMon0,
                  preset.hour,
                  preset.minute,
                );
                const startMs = Date.now();
                setActiveOverride({
                  presetId,
                  baseMs: base.getTime(),
                  realStartedMs: startMs,
                });
                setStatus(getBusinessStatus(base));
              }}
            />
          </section>

          <ExplanationTriggerButton versionId="v18" />
        </main>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#0F766E"
        thumbHoverColor="#115E59"
      />
    </>
  );
}
