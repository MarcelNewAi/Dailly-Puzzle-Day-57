"use client";

import { DM_Sans, Inter, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import CalculatorHeader from "./components/CalculatorHeader";
import CalculatorInputs from "./components/CalculatorInputs";
import ResultsPanel from "./components/ResultsPanel";

type BusinessType = "agency" | "consulting" | "freelancer" | "studio";

interface CalculatorInputsState {
  businessType: BusinessType;
  clients: number;
  hourlyRate: number;
  hoursPerClient: number;
  conversionRate: number;
  currentToolCost: number;
}

interface CalculatorResults {
  hoursSavedPerMonth: number;
  hoursSavedPerYear: number;
  currentMonthlyRevenue: number;
  newMonthlyRevenue: number;
  additionalMonthlyRevenue: number;
  additionalYearlyRevenue: number;
  toolCostSavings: number;
  yearlyToolSavings: number;
  totalMonthlySavings: number;
  totalYearlySavings: number;
  roiPercentage: number;
  paybackPeriodDays: number | null;
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const defaultsByType: Record<
  BusinessType,
  Omit<CalculatorInputsState, "businessType">
> = {
  agency: { clients: 15, hourlyRate: 150, hoursPerClient: 25, conversionRate: 30, currentToolCost: 800 },
  consulting: { clients: 8, hourlyRate: 250, hoursPerClient: 30, conversionRate: 35, currentToolCost: 400 },
  freelancer: { clients: 5, hourlyRate: 85, hoursPerClient: 20, conversionRate: 40, currentToolCost: 150 },
  studio: { clients: 12, hourlyRate: 120, hoursPerClient: 30, conversionRate: 25, currentToolCost: 600 },
};

const v8ThemeVars: CSSProperties = {
  "--v8-accent": "#10B981",
  "--v8-accent-light": "rgba(16, 185, 129, 0.12)",
  "--v8-accent-hover": "#0E9F6E",
  "--v8-radius": "12px",
  "--v8-font-size": "16px",
  "--v8-font-family": "var(--font-dm-sans), sans-serif",
  "--v8-spacing": "1",
  "--v8-animation-duration": "250ms",
  "--v8-bg-primary": "#FFFFFF",
  "--v8-bg-secondary": "#F8F9FA",
  "--v8-bg-card": "#FFFFFF",
  "--v8-border": "#E5E7EB",
  "--v8-text-primary": "#111111",
  "--v8-text-secondary": "#6B7280",
  "--v8-text-muted": "#9CA3AF",
  "--v8-shadow": "0 1px 3px rgba(0,0,0,0.1)",
  "--v8-on-accent": "#FFFFFF",
  "--v8-success": "#10B981",
  "--v8-success-soft": "rgba(16, 185, 129, 0.15)",
  "--v8-warning": "#F59E0B",
  "--v8-warning-soft": "rgba(245, 158, 11, 0.15)",
} as CSSProperties;

const PLATFORM_COST = 99;
const TIME_SAVINGS_FACTOR = 0.35;
const CONVERSION_BOOST = 1.4;

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const formatNumber = (n: number) => new Intl.NumberFormat("en-US").format(n);

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function calculateROI(inputs: CalculatorInputsState): CalculatorResults {
  void CONVERSION_BOOST;

  const totalCurrentHours = inputs.clients * inputs.hoursPerClient;
  const hoursSavedPerMonth = Math.round(totalCurrentHours * TIME_SAVINGS_FACTOR);
  const hoursSavedPerYear = hoursSavedPerMonth * 12;

  const currentMonthlyRevenue = inputs.clients * inputs.hoursPerClient * inputs.hourlyRate;
  const additionalClientCapacity = Math.floor(hoursSavedPerMonth / inputs.hoursPerClient);
  const newClients = inputs.clients + additionalClientCapacity;
  const newMonthlyRevenue = newClients * inputs.hoursPerClient * inputs.hourlyRate;
  const additionalMonthlyRevenue = newMonthlyRevenue - currentMonthlyRevenue;
  const additionalYearlyRevenue = additionalMonthlyRevenue * 12;

  const toolCostSavings = Math.max(0, inputs.currentToolCost - PLATFORM_COST);
  const yearlyToolSavings = toolCostSavings * 12;

  const totalMonthlySavings = additionalMonthlyRevenue + toolCostSavings;
  const totalYearlySavings = totalMonthlySavings * 12;
  const yearlyInvestment = PLATFORM_COST * 12;
  const roiPercentage = Math.round((totalYearlySavings / yearlyInvestment) * 100);
  const paybackPeriodDays = totalMonthlySavings > 0 ? Math.ceil((PLATFORM_COST / totalMonthlySavings) * 30) : null;

  return {
    hoursSavedPerMonth,
    hoursSavedPerYear,
    currentMonthlyRevenue,
    newMonthlyRevenue,
    additionalMonthlyRevenue,
    additionalYearlyRevenue,
    toolCostSavings,
    yearlyToolSavings,
    totalMonthlySavings,
    totalYearlySavings,
    roiPercentage,
    paybackPeriodDays,
  };
}

export default function V10Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState<CalculatorInputsState>({
    businessType: "agency",
    ...defaultsByType.agency,
  });
  const [showResetToast, setShowResetToast] = useState(false);

  const inputsRef = useRef(inputs);
  const resetTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    inputsRef.current = inputs;
  }, [inputs]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const cancelAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const animateDefaultsTransition = useCallback((nextBusinessType: BusinessType) => {
    cancelAnimation();
    const start = inputsRef.current;
    const target = defaultsByType[nextBusinessType];
    const duration = 400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = clamp((now - startTime) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const nextClients = Math.round(start.clients + (target.clients - start.clients) * eased);
      const nextHourlyRate = roundToStep(start.hourlyRate + (target.hourlyRate - start.hourlyRate) * eased, 5);
      const nextHoursPerClient = Math.round(start.hoursPerClient + (target.hoursPerClient - start.hoursPerClient) * eased);
      const nextConversionRate = Math.round(start.conversionRate + (target.conversionRate - start.conversionRate) * eased);
      const nextToolCost = roundToStep(start.currentToolCost + (target.currentToolCost - start.currentToolCost) * eased, 50);

      setInputs({
        businessType: nextBusinessType,
        clients: clamp(nextClients, 1, 50),
        hourlyRate: clamp(nextHourlyRate, 25, 500),
        hoursPerClient: clamp(nextHoursPerClient, 1, 100),
        conversionRate: clamp(nextConversionRate, 5, 100),
        currentToolCost: clamp(nextToolCost, 0, 5000),
      });

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(tick);
      } else {
        animationFrameRef.current = null;
        setInputs({
          businessType: nextBusinessType,
          clients: target.clients,
          hourlyRate: target.hourlyRate,
          hoursPerClient: target.hoursPerClient,
          conversionRate: target.conversionRate,
          currentToolCost: target.currentToolCost,
        });
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
  }, [cancelAnimation]);

  const results = useMemo(() => calculateROI(inputs), [inputs]);
  const additionalClientCapacity = Math.floor(results.hoursSavedPerMonth / inputs.hoursPerClient);
  const projectedClients = inputs.clients + additionalClientCapacity;
  const revenueIncreasePercentage = results.currentMonthlyRevenue > 0
    ? Math.round((results.additionalMonthlyRevenue / results.currentMonthlyRevenue) * 100)
    : 0;

  const handleBusinessTypeChange = (businessType: BusinessType) => {
    if (businessType === inputs.businessType) {
      return;
    }
    animateDefaultsTransition(businessType);
  };

  const handleClientsChange = (clients: number) => {
    cancelAnimation();
    setInputs((current) => ({ ...current, clients: clamp(Math.round(clients), 1, 50) }));
  };

  const handleHourlyRateChange = (hourlyRate: number) => {
    cancelAnimation();
    const normalized = clamp(roundToStep(hourlyRate, 5), 25, 500);
    setInputs((current) => ({ ...current, hourlyRate: normalized }));
  };

  const handleHoursPerClientChange = (hoursPerClient: number) => {
    cancelAnimation();
    setInputs((current) => ({ ...current, hoursPerClient: clamp(Math.round(hoursPerClient), 1, 100) }));
  };

  const handleConversionRateChange = (conversionRate: number) => {
    cancelAnimation();
    setInputs((current) => ({ ...current, conversionRate: clamp(Math.round(conversionRate), 5, 100) }));
  };

  const handleCurrentToolCostChange = (currentToolCost: number) => {
    cancelAnimation();
    const normalized = clamp(roundToStep(currentToolCost, 50), 0, 5000);
    setInputs((current) => ({ ...current, currentToolCost: normalized }));
  };

  const handleReset = () => {
    cancelAnimation();
    const defaults = defaultsByType[inputs.businessType];
    setInputs((current) => ({ ...current, ...defaults }));
    setShowResetToast(true);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setShowResetToast(false);
    }, 1800);
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main
          className={`${dmSans.variable} ${inter.variable} ${playfair.variable} ${jetbrains.variable} ${spaceGrotesk.variable} v10-page`}
          style={v8ThemeVars}
        >
          <CalculatorHeader />

          <div className="v10-main-shell">
            <div className="v10-main-grid">
              <CalculatorInputs
                inputs={inputs}
                onBusinessTypeChange={handleBusinessTypeChange}
                onClientsChange={handleClientsChange}
                onHourlyRateChange={handleHourlyRateChange}
                onHoursPerClientChange={handleHoursPerClientChange}
                onConversionRateChange={handleConversionRateChange}
                onCurrentToolCostChange={handleCurrentToolCostChange}
                onReset={handleReset}
              />

              <ResultsPanel
                results={results}
                inputs={inputs}
                additionalClientCapacity={additionalClientCapacity}
                projectedClients={projectedClients}
                revenueIncreasePercentage={revenueIncreasePercentage}
                formatCurrency={formatCurrency}
                formatNumber={formatNumber}
              />
            </div>
          </div>

          <p className={`v10-reset-toast${showResetToast ? " is-visible" : ""}`} role="status" aria-live="polite">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.1 14.3-3.2-3.2 1.4-1.4 1.8 1.8 4.1-4.1 1.4 1.4-5.5 5.5Z" />
            </svg>
            Calculator reset
          </p>

          <ExplanationTriggerButton versionId="v10" />
        </main>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#10B981" thumbHoverColor="#059669" />
    </>
  );
}
