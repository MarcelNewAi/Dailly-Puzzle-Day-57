"use client";

type FontSizeSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function FontSizeSlider({ value, onChange }: FontSizeSliderProps) {
  const min = 12;
  const max = 20;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <section className="v8-control-section" aria-label="Font size settings">
      <h3 className="v8-control-title">
        <svg className="v8-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5h14v3h-2V7h-4v10h2v2H9v-2h2V7H7v1H5V5Z" />
        </svg>
        Font Size
      </h3>
      <div className="v8-slider-value-row">
        <span className="v8-control-value">{value}px</span>
      </div>
      <input
        id="v8-font-size-slider"
        className="v8-slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--v8-accent) 0%, var(--v8-accent) ${percentage}%, var(--v8-border) ${percentage}%, var(--v8-border) 100%)`,
        }}
        aria-label="Font size slider"
      />
      <div className="v8-slider-labels">
        <span>Small</span>
        <span>Large</span>
      </div>
    </section>
  );
}

