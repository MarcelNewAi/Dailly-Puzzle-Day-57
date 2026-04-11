"use client";

type BusinessType = "agency" | "consulting" | "freelancer" | "studio";

type InsightCalloutProps = {
  results: {
    hoursSavedPerMonth: number;
    totalMonthlySavings: number;
    totalYearlySavings: number;
    roiPercentage: number;
    paybackPeriodDays: number | null;
  };
  inputs: {
    businessType: BusinessType;
    hoursPerClient: number;
  };
  formatCurrency: (value: number) => string;
};

type InsightTone = "positive" | "neutral" | "warning";

function getBusinessLabel(type: BusinessType): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getInsight(
  results: InsightCalloutProps["results"],
  inputs: InsightCalloutProps["inputs"],
  formatCurrency: (value: number) => string,
): { message: string; tone: InsightTone; icon: string } {
  if (results.roiPercentage > 1000) {
    const payback = results.paybackPeriodDays === null ? "N/A" : `${results.paybackPeriodDays} days`;
    return {
      message: `Massive ROI. Your business profile shows exceptional potential. You will recoup your investment in ${payback}.`,
      tone: "positive",
      icon: "M12 2 2 7l10 5 10-5-10-5Zm0 8.2-8-4v9.1l8 4 8-4V6.2l-8 4ZM11 13h2v4h-2v-4Zm0-5h2v3h-2V8Z",
    };
  }

  if (results.roiPercentage > 500) {
    const extraClients = Math.floor(results.hoursSavedPerMonth / inputs.hoursPerClient);
    return {
      message: `Excellent ROI. Your ${getBusinessLabel(inputs.businessType)} business could save ${results.hoursSavedPerMonth} hours every month and reinvest that time into ${extraClients} more clients.`,
      tone: "positive",
      icon: "m4 16 5-5 4 4 6-7 1.5 1.3-7.4 8.6-4.1-4.1-3.6 3.6L4 16Zm14-9h3v3h-2V9h-1V7Z",
    };
  }

  if (results.roiPercentage > 200) {
    return {
      message: `Strong ROI. With ${formatCurrency(results.totalMonthlySavings)} in monthly savings, you will see meaningful business growth within the first quarter.`,
      tone: "neutral",
      icon: "M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm1 13h-2v-2h2v2Zm0-4h-2V7h2v5Z",
    };
  }

  if (results.roiPercentage > 0) {
    return {
      message: `Positive ROI. Even with your current setup, you would save ${formatCurrency(results.totalYearlySavings)} per year and redirect budget into growth.`,
      tone: "neutral",
      icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10.2V6h-2v7h5v-2h-3.1Z",
    };
  }

  return {
    message: "Try increasing your active clients or hours per client to unlock stronger ROI potential.",
    tone: "warning",
    icon: "M11 3h2l8 15v3H3v-3l8-15Zm1 5.2L10.9 14h2.2L12 8.2Zm0 7.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z",
  };
}

export default function InsightCallout({ results, inputs, formatCurrency }: InsightCalloutProps) {
  const insight = getInsight(results, inputs, formatCurrency);

  return (
    <article className={`v10-insight-callout v10-insight-${insight.tone}`} aria-live="polite">
      <span className="v10-insight-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d={insight.icon} />
        </svg>
      </span>
      <p className="v10-insight-text">{insight.message}</p>
    </article>
  );
}
