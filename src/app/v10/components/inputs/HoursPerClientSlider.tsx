"use client";

type HoursPerClientSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function HoursPerClientSlider({ value, onChange }: HoursPerClientSliderProps) {
  const min = 1;
  const max = 100;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <section className="v10-control-section" aria-label="Hours per client per month">
      <h3 className="v10-control-title">
        <svg className="v10-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10.6 4.2 2.4-1 1.8L11 13.7V7h2v5.6Z" />
        </svg>
        Hours per Client (Monthly)
      </h3>

      <div className="v10-slider-value-row">
        <span className="v10-control-value v10-control-value-accent">{value} hours/client</span>
      </div>

      <input
        id="v10-hours-per-client-slider"
        className="v10-slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--v8-accent) 0%, var(--v8-accent) ${percentage}%, var(--v8-border) ${percentage}%, var(--v8-border) 100%)`,
        }}
        aria-label="Hours per client monthly slider"
      />

      <div className="v10-slider-labels">
        <span>1h</span>
        <span>100h+</span>
      </div>
    </section>
  );
}
