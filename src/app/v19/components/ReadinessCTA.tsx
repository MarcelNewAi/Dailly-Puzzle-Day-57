import type { ChecklistItem } from "../data/checklist";

type ReadinessState = "not-started" | "in-progress" | "almost-ready" | "ready";

interface ReadinessCTAProps {
  state: ReadinessState;
  missingRequired: ChecklistItem[];
}

interface CtaConfig {
  disabled: boolean;
  text: string;
  subtitle: string;
  variant: "disabled" | "warning" | "primary" | "success";
}

function getCTA(state: ReadinessState, missingRequired: ChecklistItem[]): CtaConfig {
  if (state === "not-started") {
    return {
      disabled: true,
      text: "Complete Checklist First",
      subtitle: "Start checking items above",
      variant: "disabled",
    };
  }

  if (state === "in-progress") {
    return {
      disabled: true,
      text: `${missingRequired.length} Required Items Left`,
      subtitle: `Missing: ${missingRequired
        .slice(0, 2)
        .map((item) => item.label)
        .join(", ")}${missingRequired.length > 2 ? "..." : ""}`,
      variant: "warning",
    };
  }

  if (state === "almost-ready") {
    return {
      disabled: false,
      text: "Book Your Kickoff Call →",
      subtitle: "All required items complete. Let's talk.",
      variant: "primary",
    };
  }

  return {
    disabled: false,
    text: "Book Your Kickoff Call →",
    subtitle: "You're fully ready. This will be a smooth project.",
    variant: "success",
  };
}

export default function ReadinessCTA({ state, missingRequired }: ReadinessCTAProps) {
  const cta = getCTA(state, missingRequired);

  return (
    <section className="v19-cta-shell" aria-live="polite">
      <div key={`${state}-${missingRequired.length}`} className="v19-cta-card v19-state-swap">
        <button type="button" className={`v19-cta-button is-${cta.variant}`} disabled={cta.disabled}>
          {cta.text}
        </button>
        <p className="v19-cta-subtitle">{cta.subtitle}</p>
      </div>
    </section>
  );
}
