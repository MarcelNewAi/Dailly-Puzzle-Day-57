"use client";

type ThemeModeToggleProps = {
  value: "light" | "dark";
  onChange: (mode: "light" | "dark") => void;
};

export default function ThemeModeToggle({ value, onChange }: ThemeModeToggleProps) {
  return (
    <section className="v8-control-section" aria-label="Theme mode settings">
      <h3 className="v8-control-title">
        <span className="v8-control-icon" aria-hidden="true">
          ☀️
        </span>
        Theme Mode
      </h3>
      <div className="v8-toggle-group">
        <button
          type="button"
          className={`v8-toggle-btn${value === "light" ? " active" : ""}`}
          onClick={() => onChange("light")}
          aria-label="Switch to light mode"
          aria-pressed={value === "light"}
        >
          ☀️ Light
        </button>
        <button
          type="button"
          className={`v8-toggle-btn${value === "dark" ? " active" : ""}`}
          onClick={() => onChange("dark")}
          aria-label="Switch to dark mode"
          aria-pressed={value === "dark"}
        >
          🌙 Dark
        </button>
      </div>
    </section>
  );
}

