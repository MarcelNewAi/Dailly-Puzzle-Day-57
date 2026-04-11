"use client";

type ConversionRateSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function ConversionRateSlider({ value, onChange }: ConversionRateSliderProps) {
  const min = 5;
  const max = 100;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <section className="v10-control-section" aria-label="Lead conversion rate">
      <h3 className="v10-control-title">
        <svg className="v10-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 2 7l10 5 10-5-10-5Zm0 8.2-8-4v9.1l8 4 8-4V6.2l-8 4ZM11 13h2v4h-2v-4Zm0-5h2v3h-2V8Z" />
        </svg>
        Lead Conversion Rate
      </h3>

      <div className="v10-slider-value-row">
        <span className="v10-control-value v10-control-value-accent">{value}%</span>
      </div>

      <input
        id="v10-conversion-rate-slider"
        className="v10-slider"
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--v8-accent) 0%, var(--v8-accent) ${percentage}%, var(--v8-border) ${percentage}%, var(--v8-border) 100%)`,
        }}
        aria-label="Lead conversion rate slider"
      />

      <div className="v10-slider-labels">
        <span>5%</span>
        <span>100%</span>
      </div>

      <p className="v10-control-tip">Industry average: 22%</p>
    </section>
  );
}
