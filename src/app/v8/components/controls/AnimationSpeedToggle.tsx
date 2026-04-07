"use client";

type AnimationSpeedToggleProps = {
  value: "off" | "normal" | "fast";
  onChange: (value: "off" | "normal" | "fast") => void;
};

export default function AnimationSpeedToggle({ value, onChange }: AnimationSpeedToggleProps) {
  return (
    <section className="v8-control-section" aria-label="Animation speed settings">
      <h3 className="v8-control-title">
        <svg className="v8-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h3v14H4V5Zm5 0h3v14H9V5Zm5 4h6l-3 6-3-6Z" />
        </svg>
        Animation Speed
      </h3>
      <div className="v8-toggle-group v8-toggle-group-triple">
        <button
          type="button"
          className={`v8-toggle-btn${value === "off" ? " active" : ""}`}
          onClick={() => onChange("off")}
          aria-label="Set animation speed to off"
          aria-pressed={value === "off"}
        >
          Off
        </button>
        <button
          type="button"
          className={`v8-toggle-btn${value === "normal" ? " active" : ""}`}
          onClick={() => onChange("normal")}
          aria-label="Set animation speed to normal"
          aria-pressed={value === "normal"}
        >
          Normal
        </button>
        <button
          type="button"
          className={`v8-toggle-btn${value === "fast" ? " active" : ""}`}
          onClick={() => onChange("fast")}
          aria-label="Set animation speed to fast"
          aria-pressed={value === "fast"}
        >
          Fast
        </button>
      </div>
    </section>
  );
}

