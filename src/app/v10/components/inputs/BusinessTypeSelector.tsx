"use client";

type BusinessType = "agency" | "consulting" | "freelancer" | "studio";

type BusinessTypeSelectorProps = {
  value: BusinessType;
  onChange: (value: BusinessType) => void;
};

const businessTypeOptions: {
  value: BusinessType;
  label: string;
  iconPath: string;
}[] = [
  { value: "agency", label: "Agency", iconPath: "M4 6h16v12H4V6Zm2 2v8h12V8H6Zm4 10h4v2h-4v-2Z" },
  { value: "consulting", label: "Consulting", iconPath: "M5 5h14v2H5V5Zm0 4h9v2H5V9Zm0 4h14v2H5v-2Zm0 4h9v2H5v-2Z" },
  { value: "freelancer", label: "Freelancer", iconPath: "M12 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 12c4.4 0 8 2 8 4.5V22H4v-1.5C4 18 7.6 16 12 16Z" },
  { value: "studio", label: "Studio", iconPath: "M4 7h6v10H4V7Zm10 0h6v10h-6V7ZM2 19h20v2H2v-2Z" },
];

export default function BusinessTypeSelector({ value, onChange }: BusinessTypeSelectorProps) {
  return (
    <section className="v10-control-section" aria-label="Business type settings">
      <h3 className="v10-control-title">
        <svg className="v10-control-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v11H4V7Zm2 2v7h12V9H6Zm3 10h6v2H9v-2Z" />
        </svg>
        Business Type
      </h3>

      <div className="v10-business-grid" role="radiogroup" aria-label="Business type">
        {businessTypeOptions.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              className={`v10-business-option${isActive ? " active" : ""}`}
              onClick={() => onChange(option.value)}
              role="radio"
              aria-checked={isActive}
              aria-label={`Select ${option.label} business type`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={option.iconPath} />
              </svg>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
