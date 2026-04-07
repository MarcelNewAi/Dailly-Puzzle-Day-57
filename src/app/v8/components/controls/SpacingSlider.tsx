"use client";

type SpacingSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

function formatSpacing(value: number): string {
  return `${value.toFixed(2).replace(/\.?0+$/, "")}x`;
}

export default function SpacingSlider({ value, onChange }: SpacingSliderProps) {
  const min = 0.75;
  const max = 1.5;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <section className="v8-control-section" aria-label="Spacing settings">
      <h3 className="v8-control-title">
        <svg className="v8-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h2v18H7V3Zm8 0h2v18h-2V3ZM3 8h18v2H3V8Zm0 6h18v2H3v-2Z" />
        </svg>
        Spacing
      </h3>
      <div className="v8-slider-value-row">
        <span className="v8-control-value">{formatSpacing(value)}</span>
      </div>
      <input
        id="v8-spacing-slider"
        className="v8-slider"
        type="range"
        min={min}
        max={max}
        step={0.05}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--v8-accent) 0%, var(--v8-accent) ${percentage}%, var(--v8-border) ${percentage}%, var(--v8-border) 100%)`,
        }}
        aria-label="Spacing slider"
      />
      <div className="v8-slider-labels">
        <span>Compact</span>
        <span>Comfortable</span>
      </div>
    </section>
  );
}

