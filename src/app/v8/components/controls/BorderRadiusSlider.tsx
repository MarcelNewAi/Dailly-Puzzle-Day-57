"use client";

type BorderRadiusSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function BorderRadiusSlider({ value, onChange }: BorderRadiusSliderProps) {
  const min = 0;
  const max = 24;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <section className="v8-control-section" aria-label="Border radius settings">
      <h3 className="v8-control-title">
        <svg className="v8-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h8a6 6 0 0 1 6 6v8H4V6a2 2 0 0 1 2-2Zm10 10V10a2 2 0 0 0-2-2h-6v6h8Z" />
        </svg>
        Border Radius
      </h3>
      <div className="v8-slider-value-row">
        <span className="v8-control-value">{value}px</span>
      </div>
      <input
        id="v8-radius-slider"
        className="v8-slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--v8-accent) 0%, var(--v8-accent) ${percentage}%, var(--v8-border) ${percentage}%, var(--v8-border) 100%)`,
        }}
        aria-label="Border radius slider"
      />
      <div className="v8-slider-labels">
        <span>Sharp</span>
        <span>Rounded</span>
      </div>
    </section>
  );
}

