"use client";

import BreakdownGrid from "./results/BreakdownGrid";
import ComparisonChart from "./results/ComparisonChart";
import InsightCallout from "./results/InsightCallout";
import SummaryCard from "./results/SummaryCard";

type BusinessType = "agency" | "consulting" | "freelancer" | "studio";

type CalculatorResults = {
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
};

type ResultsPanelProps = {
  results: CalculatorResults;
  inputs: {
    businessType: BusinessType;
    clients: number;
    hourlyRate: number;
    hoursPerClient: number;
    conversionRate: number;
    currentToolCost: number;
  };
  additionalClientCapacity: number;
  projectedClients: number;
  revenueIncreasePercentage: number;
  formatCurrency: (n: number) => string;
  formatNumber: (n: number) => string;
};

export default function ResultsPanel({
  results,
  inputs,
  additionalClientCapacity,
  projectedClients,
  revenueIncreasePercentage,
  formatCurrency,
  formatNumber,
}: ResultsPanelProps) {
  return (
    <section className="v10-panel v10-results-panel v10-panel-animated v10-panel-delay" aria-label="ROI calculation results">
      <header className="v10-panel-header">
        <h2 className="v10-panel-title">Your ROI Results</h2>
        <p className="v10-panel-subtitle">Live calculations based on your inputs. Updates instantly.</p>
      </header>

      <div className="v10-results-stack">
        <SummaryCard
          roiPercentage={results.roiPercentage}
          totalYearlySavings={results.totalYearlySavings}
          paybackPeriodDays={results.paybackPeriodDays}
          formatCurrency={formatCurrency}
        />

        <BreakdownGrid
          results={results}
          clients={inputs.clients}
          currentToolCost={inputs.currentToolCost}
          additionalClientCapacity={additionalClientCapacity}
          projectedClients={projectedClients}
          formatCurrency={formatCurrency}
          formatNumber={formatNumber}
        />

        <ComparisonChart
          currentMonthlyRevenue={results.currentMonthlyRevenue}
          newMonthlyRevenue={results.newMonthlyRevenue}
          revenueIncreasePercentage={revenueIncreasePercentage}
          formatCurrency={formatCurrency}
        />

        <InsightCallout
          results={results}
          inputs={inputs}
          formatCurrency={formatCurrency}
        />
      </div>
    </section>
  );
}
