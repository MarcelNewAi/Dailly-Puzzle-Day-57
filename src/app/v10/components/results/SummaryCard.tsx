"use client";

import { useEffect, useRef, useState } from "react";

type SummaryCardProps = {
  roiPercentage: number;
  totalYearlySavings: number;
  paybackPeriodDays: number | null;
  formatCurrency: (value: number) => string;
};

function useAnimatedNumber(value: number, duration = 400): number {
  const [animatedValue, setAnimatedValue] = useState(value);
  const animatedValueRef = useRef(value);

  useEffect(() => {
    const startValue = animatedValueRef.current;
    const delta = value - startValue;
    if (delta === 0) {
      animatedValueRef.current = value;
      return;
    }

    const startTime = performance.now();
    let frameId = 0;

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = startValue + delta * eased;
      animatedValueRef.current = nextValue;
      setAnimatedValue(nextValue);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        animatedValueRef.current = value;
        setAnimatedValue(value);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [value, duration]);

  return animatedValue;
}

export default function SummaryCard({
  roiPercentage,
  totalYearlySavings,
  paybackPeriodDays,
  formatCurrency,
}: SummaryCardProps) {
  const animatedRoi = Math.round(useAnimatedNumber(roiPercentage));
  const animatedYearlySavings = Math.round(useAnimatedNumber(totalYearlySavings));

  return (
    <article className="v10-summary-card" aria-label="ROI summary">
      <p className="v10-summary-label">Total Yearly ROI</p>
      <p className="v10-summary-roi">{animatedRoi}%</p>
      <p className="v10-summary-caption">Return on Investment</p>
      <div className="v10-summary-divider" />
      <div className="v10-summary-bottom-row">
        <div className="v10-summary-stat">
          <p className="v10-summary-stat-label">Yearly Savings</p>
          <p className="v10-summary-stat-value v10-summary-stat-value-positive">{formatCurrency(animatedYearlySavings)}</p>
        </div>
        <div className="v10-summary-stat">
          <p className="v10-summary-stat-label">Payback Period</p>
          <p className="v10-summary-stat-value v10-summary-stat-value-accent">
            {paybackPeriodDays === null ? "N/A" : `${paybackPeriodDays} days`}
          </p>
        </div>
      </div>
    </article>
  );
}
