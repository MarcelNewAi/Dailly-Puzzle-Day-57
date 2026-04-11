"use client";

type CurrentToolCostInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function CurrentToolCostInput({ value, onChange }: CurrentToolCostInputProps) {
  const min = 0;
  const max = 5000;
  const step = 50;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <section className="v10-control-section" aria-label="Current monthly tool spend">
      <h3 className="v10-control-title">
        <svg className="v10-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2H3V6Zm18 4v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8h18Zm-7 4h5v-2h-5v2Z" />
        </svg>
        Current Monthly Tool Spend
      </h3>

      <div className="v10-slider-value-row">
        <span className="v10-control-value v10-control-value-accent">${value}/month</span>
      </div>

      <input
        id="v10-tool-cost-slider"
        className="v10-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--v8-accent) 0%, var(--v8-accent) ${percentage}%, var(--v8-border) ${percentage}%, var(--v8-border) 100%)`,
        }}
        aria-label="Current monthly tool spend slider"
      />

      <div className="v10-slider-labels">
        <span>$0</span>
        <span>$5,000+</span>
      </div>

      <p className="v10-control-tip">What you currently pay for tools we&apos;d replace</p>
    </section>
  );
}
