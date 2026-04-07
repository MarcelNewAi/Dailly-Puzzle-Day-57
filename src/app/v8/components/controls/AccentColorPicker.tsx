"use client";

type AccentColorPickerProps = {
  value: string;
  presets: string[];
  onChange: (value: string) => void;
};

export default function AccentColorPicker({ value, presets, onChange }: AccentColorPickerProps) {
  return (
    <section className="v8-control-section" aria-label="Accent color settings">
      <h3 className="v8-control-title">
        <svg className="v8-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a9 9 0 0 0-9 9c0 3.1 1.6 5.8 4 7.4.7.4 1 1 .9 1.7-.2.9-.4 1.8-.4 2.1 0 .4.2.8.7.8h3.5a4.8 4.8 0 1 0 0-9.6H6.3a5.7 5.7 0 1 1 11.4 0c0 1.7-.8 3.3-2.2 4.3-.4.3-.7.8-.7 1.3v2h.9a6.1 6.1 0 0 0 6.1-6.1A9 9 0 0 0 12 3Zm-4 8.2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4-2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4 2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" />
        </svg>
        Accent Color
      </h3>

      <div className="v8-swatch-grid" role="radiogroup" aria-label="Accent color presets">
        {presets.map((preset) => {
          const isSelected = preset.toUpperCase() === value.toUpperCase();
          return (
            <button
              key={preset}
              type="button"
              className={`v8-swatch${isSelected ? " selected" : ""}`}
              style={{ backgroundColor: preset }}
              onClick={() => onChange(preset)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select accent color ${preset}`}
              title={preset}
            >
              {isSelected ? <span className="v8-swatch-check">✓</span> : null}
            </button>
          );
        })}
      </div>

      <label className="v8-color-input-shell" htmlFor="v8-accent-color-picker" aria-label="Custom accent color picker">
        <span className="v8-color-input-label">Custom Color</span>
        <input
          id="v8-accent-color-picker"
          className="v8-color-input"
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Choose custom accent color"
        />
      </label>

      <p className="v8-color-value">{value.toUpperCase()}</p>
    </section>
  );
}

