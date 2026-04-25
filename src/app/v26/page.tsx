"use client";

import type React from "react";
import { Share_Tech_Mono } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import CtaBlock from "./components/CtaBlock";
import MetricRow from "./components/MetricRow";
import { ScanlineOverlay } from "./components/ScanlineOverlay";
import StatusTicker from "./components/StatusTicker";
import TerminalHeader from "./components/TerminalHeader";
import UsageSummary from "./components/UsageSummary";
import {
  getAccountHealth,
  getStatus,
  metrics as seedMetrics,
  plan,
  type AccountHealth,
  type Metric,
} from "./data";

const monoFont = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
});

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatClock(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthLabels[date.getMonth()] ?? "Jan";
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

function getIncrement(metric: Metric): number {
  const min = Math.max(1, Math.floor(metric.limit * 0.002));
  const max = Math.max(min + 1, Math.floor(metric.limit * 0.012));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const bootLines = [
  "Pulse// Marketing Automation System v2.6.0",
  "Initialising...",
  "> Loading user data................ [ok]",
  "> Fetching plan limits............. [ok]",
  "> Connecting to analytics engine... [ok]",
  "> Rendering dashboard.............. [ok]",
  "",
  "Boot complete. Welcome, growth plan user.",
];

export default function V26Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [simulateTick, setSimulateTick] = useState(false);
  const [clockLabel, setClockLabel] = useState("");
  const [metrics, setMetrics] = useState<Metric[]>(seedMetrics);

  useEffect(() => {
    setMounted(true);
    setClockLabel(formatClock(new Date()));

    const bootTimer = window.setTimeout(() => {
      setBootComplete(true);
    }, 600);

    return () => {
      window.clearTimeout(bootTimer);
    };
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const clockTimer = window.setInterval(() => {
      setClockLabel(formatClock(new Date()));
    }, 1000);

    return () => {
      window.clearInterval(clockTimer);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const tickTimer = window.setInterval(() => {
      setMetrics((previous) => {
        const available = previous.filter((metric) => getStatus(metric) !== "crit");
        if (available.length === 0) {
          return previous;
        }

        const target = available[Math.floor(Math.random() * available.length)];
        if (!target) {
          return previous;
        }

        const increment = getIncrement(target);

        return previous.map((metric) => {
          if (metric.id !== target.id) {
            return metric;
          }

          return {
            ...metric,
            used: Math.min(metric.limit, metric.used + increment),
          };
        });
      });

      setSimulateTick((previous) => !previous);
    }, 4000);

    return () => {
      window.clearInterval(tickTimer);
    };
  }, [mounted]);

  const health = useMemo<AccountHealth>(() => getAccountHealth(metrics), [metrics]);

  const warnCount = useMemo(
    () => metrics.filter((metric) => {
      const status = getStatus(metric);
      return status === "warn" || status === "crit";
    }).length,
    [metrics],
  );

  const critCount = useMemo(
    () => metrics.filter((metric) => getStatus(metric) === "crit").length,
    [metrics],
  );

  const memLabel = simulateTick ? "143mb" : "142mb";
  const cpuLabel = simulateTick ? "0.4%" : "0.3%";

  return (
    <>
      <div ref={scrollRef} className="v26-scroll-shell hide-native-scrollbar">
        <main
          className="v26-root v26-page"
          style={{ "--v26-font-mono": monoFont.style.fontFamily } as React.CSSProperties}
        >
          <ScanlineOverlay />

          <TerminalHeader health={health} plan={plan} />

          <div className="v26-sysinfo-bar" role="status" aria-live="polite">
            <div className="v26-sysinfo-left">
              <span>Process: pulse//dash</span>
              <span>Pid: 26140</span>
              <span>User: growth@acme.io</span>
              <span>Uptime: 847h 12m</span>
              <span>Mem: {memLabel}</span>
              <span>Cpu: {cpuLabel}</span>
              <span className={simulateTick ? "v26-status--blink" : undefined}>[live]</span>
            </div>
            <span className="v26-sysinfo-clock">[{clockLabel}]</span>
          </div>

          <section className="v26-metrics-section" aria-label="Usage metrics">
            {metrics.map((metric, index) => (
              <MetricRow key={metric.id} metric={metric} status={getStatus(metric)} index={index} />
            ))}
          </section>

          <UsageSummary metrics={metrics} health={health} plan={plan} />

          <CtaBlock health={health} plan={plan} warnCount={warnCount} critCount={critCount} />

          <StatusTicker metrics={metrics} />

          <ExplanationTriggerButton versionId="v26" />

          <div
            className={`v26-boot-screen ${bootComplete ? "v26-boot-screen--hidden" : ""}`}
            aria-hidden={bootComplete ? "true" : "false"}
          >
            <div className="v26-boot-content">
              {bootLines.map((line, index) => (
                <p key={`${line}-${index}`} className="v26-boot-line">
                  {line}
                  {index === bootLines.length - 1 ? (
                    <span className="v26-cursor" aria-hidden="true">
                      _
                    </span>
                  ) : null}
                </p>
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="v26-scrollbar-host">
        <CustomScrollbar
          scrollContainerRef={scrollRef}
          variant="page"
          className="v26-custom-scrollbar"
          thumbColor="#00ff41"
          thumbHoverColor="#00ff41"
          trackColorLight="rgba(0, 255, 65, 0.08)"
          trackColorDark="rgba(0, 255, 65, 0.08)"
        />
      </div>
    </>
  );
}
