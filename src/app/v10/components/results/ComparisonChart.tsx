"use client";

type ComparisonChartProps = {
  currentMonthlyRevenue: number;
  newMonthlyRevenue: number;
  revenueIncreasePercentage: number;
  formatCurrency: (value: number) => string;
};

export default function ComparisonChart({
  currentMonthlyRevenue,
  newMonthlyRevenue,
  revenueIncreasePercentage,
  formatCurrency,
}: ComparisonChartProps) {
  const maxRevenue = Math.max(currentMonthlyRevenue, newMonthlyRevenue, 1);
  const currentWidth = (currentMonthlyRevenue / maxRevenue) * 100;
  const nextWidth = (newMonthlyRevenue / maxRevenue) * 100;

  return (
    <section className="v10-comparison-chart" aria-label="Revenue comparison chart">
      <h3 className="v10-results-subtitle">Monthly Revenue Comparison</h3>

      <div className="v10-chart-row">
        <div className="v10-chart-meta">
          <span className="v10-chart-label">Without our platform</span>
          <span className="v10-chart-value">{formatCurrency(currentMonthlyRevenue)}</span>
        </div>
        <div className="v10-chart-track">
          <div className="v10-chart-bar v10-chart-bar-current" style={{ width: `${currentWidth}%` }} />
        </div>
      </div>

      <div className="v10-chart-row">
        <div className="v10-chart-meta">
          <span className="v10-chart-label">With our platform</span>
          <span className="v10-chart-value">{formatCurrency(newMonthlyRevenue)}</span>
        </div>
        <div className="v10-chart-track">
          <div className="v10-chart-bar v10-chart-bar-next" style={{ width: `${nextWidth}%` }} />
        </div>
      </div>

      <p className="v10-chart-increase">+{revenueIncreasePercentage}% revenue increase</p>
    </section>
  );
}
