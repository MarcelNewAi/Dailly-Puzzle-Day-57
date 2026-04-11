"use client";

type ClientCountSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function ClientCountSlider({ value, onChange }: ClientCountSliderProps) {
  const min = 1;
  const max = 50;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <section className="v10-control-section" aria-label="Active clients per month">
      <h3 className="v10-control-title">
        <svg className="v10-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm-6 2c3.3 0 6 1.8 6 4v2H3v-2c0-2.2 2.7-4 6-4Zm8.4 1.2c2.1.4 3.6 1.7 3.6 3.3V20h-4v-1.5c0-1.1-.4-2.2-1.1-3.1.5-.1 1-.2 1.5-.2Z" />
        </svg>
        Active Clients per Month
      </h3>

      <div className="v10-slider-value-row">
        <span className="v10-control-value v10-control-value-accent">{value} clients</span>
      </div>

      <input
        id="v10-clients-slider"
        className="v10-slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--v8-accent) 0%, var(--v8-accent) ${percentage}%, var(--v8-border) ${percentage}%, var(--v8-border) 100%)`,
        }}
        aria-label="Active clients per month slider"
      />

      <div className="v10-slider-labels">
        <span>1</span>
        <span>50+</span>
      </div>
    </section>
  );
}
