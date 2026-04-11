"use client";

type BreakdownGridProps = {
  results: {
    hoursSavedPerMonth: number;
    hoursSavedPerYear: number;
    additionalMonthlyRevenue: number;
    additionalYearlyRevenue: number;
    toolCostSavings: number;
  };
  currentToolCost: number;
  clients: number;
  additionalClientCapacity: number;
  projectedClients: number;
  formatCurrency: (value: number) => string;
  formatNumber: (value: number) => string;
};

export default function BreakdownGrid({
  results,
  currentToolCost,
  clients,
  additionalClientCapacity,
  projectedClients,
  formatCurrency,
  formatNumber,
}: BreakdownGridProps) {
  return (
    <section className="v10-breakdown-grid" aria-label="ROI breakdown metrics">
      <article className="v10-breakdown-card v10-breakdown-card-positive">
        <span className="v10-breakdown-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10.6 4.2 2.4-1 1.8L11 13.7V7h2v5.6Z" />
          </svg>
        </span>
        <p className="v10-breakdown-label">Time Saved Monthly</p>
        <p className="v10-breakdown-value">{formatNumber(results.hoursSavedPerMonth)} hours</p>
        <p className="v10-breakdown-sub">{formatNumber(results.hoursSavedPerYear)} hours per year</p>
      </article>

      <article className="v10-breakdown-card">
        <span className="v10-breakdown-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m4 16 5-5 4 4 6-7 1.5 1.3-7.4 8.6-4.1-4.1-3.6 3.6L4 16Zm14-9h3v3h-2V9h-1V7Z" />
          </svg>
        </span>
        <p className="v10-breakdown-label">Additional Revenue</p>
        <p className="v10-breakdown-value">{formatCurrency(results.additionalMonthlyRevenue)}/mo</p>
        <p className="v10-breakdown-sub">{formatCurrency(results.additionalYearlyRevenue)} per year</p>
      </article>

      <article className="v10-breakdown-card">
        <span className="v10-breakdown-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2H3V7Zm18 4v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-6h18Zm-7 2H9v2h5v-2Z" />
          </svg>
        </span>
        <p className="v10-breakdown-label">Tool Cost Savings</p>
        <p className="v10-breakdown-value">{formatCurrency(results.toolCostSavings)}/mo</p>
        <p className="v10-breakdown-sub">
          Replacing your {formatCurrency(currentToolCost)} tools with our $99 platform
        </p>
      </article>

      <article className="v10-breakdown-card">
        <span className="v10-breakdown-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm-6 2c3.3 0 6 1.8 6 4v2H3v-2c0-2.2 2.7-4 6-4Zm8.4 1.2c2.1.4 3.6 1.7 3.6 3.3V20h-4v-1.5c0-1.1-.4-2.2-1.1-3.1.5-.1 1-.2 1.5-.2Z" />
          </svg>
        </span>
        <p className="v10-breakdown-label">Extra Clients per Month</p>
        <p className="v10-breakdown-value">+{formatNumber(additionalClientCapacity)} clients</p>
        <p className="v10-breakdown-sub">
          From {formatNumber(clients)} to {formatNumber(projectedClients)} active clients
        </p>
      </article>
    </section>
  );
}
