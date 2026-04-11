"use client";

import { useEffect, useState } from "react";

type HourlyRateInputProps = {
  value: number;
  onChange: (value: number) => void;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function HourlyRateInput({ value, onChange }: HourlyRateInputProps) {
  const min = 25;
  const max = 500;
  const step = 5;
  const percentage = ((value - min) / (max - min)) * 100;

  const [draftValue, setDraftValue] = useState(String(value));

  useEffect(() => {
    setDraftValue(String(value));
  }, [value]);

  const commitDraftValue = () => {
    const parsed = Number(draftValue);
    if (Number.isNaN(parsed)) {
      setDraftValue(String(value));
      return;
    }
    const normalized = clamp(Math.round(parsed / step) * step, min, max);
    onChange(normalized);
    setDraftValue(String(normalized));
  };

  const handleManualChange = (input: string) => {
    setDraftValue(input);
  };

  return (
    <section className="v10-control-section" aria-label="Average hourly rate">
      <h3 className="v10-control-title">
        <svg className="v10-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3c3.3 0 6 2.2 6 5h-2c0-1.7-1.8-3-4-3s-4 1.3-4 3c0 1.5 1.2 2.3 4.5 2.8 3.4.6 5.5 1.9 5.5 4.6 0 2.6-2.4 4.6-5.5 5V22h-2v-1.6c-3.1-.4-5.5-2.5-5.5-5h2c0 1.9 1.8 3.3 4.5 3.3s4.5-1.4 4.5-3.1c0-1.7-1.4-2.5-4.8-3.1C8.8 11.9 6 10.8 6 8c0-2.5 2.1-4.4 5-4.9V1h2v2Z" />
        </svg>
        Average Hourly Rate
      </h3>

      <div className="v10-slider-value-row">
        <span className="v10-control-value v10-control-value-accent">${value}/hour</span>
      </div>

      <input
        id="v10-hourly-rate-slider"
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
        aria-label="Average hourly rate slider"
      />

      <div className="v10-slider-labels">
        <span>$25</span>
        <span>$500</span>
      </div>

      <label className="v10-input-shell" htmlFor="v10-hourly-rate-input">
        <span className="v10-input-label">Custom rate</span>
        <input
          id="v10-hourly-rate-input"
          className="v10-input v10-input-inline"
          type="number"
          min={min}
          max={max}
          step={step}
          value={draftValue}
          onChange={(event) => handleManualChange(event.target.value)}
          onBlur={commitDraftValue}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              commitDraftValue();
            }
          }}
          aria-label="Custom average hourly rate input"
        />
      </label>
    </section>
  );
}
