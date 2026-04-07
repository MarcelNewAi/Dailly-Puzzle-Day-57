"use client";

type FontOption = {
  label: string;
  value: string;
};

type FontFamilyPickerProps = {
  value: string;
  options: FontOption[];
  onChange: (value: string) => void;
};

export default function FontFamilyPicker({ value, options, onChange }: FontFamilyPickerProps) {
  return (
    <section className="v8-control-section" aria-label="Font family settings">
      <h3 className="v8-control-title">
        <svg className="v8-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16v2h-7v10h3v2H8v-2h3V8H4V6Z" />
        </svg>
        Font Family
      </h3>
      <div className="v8-font-option-list" role="radiogroup" aria-label="Font family selection">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.label}
              type="button"
              className={`v8-font-option${isSelected ? " selected" : ""}`}
              onClick={() => onChange(option.value)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${option.label} font`}
              style={{ fontFamily: option.value }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

