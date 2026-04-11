"use client";

interface NavigationButtonsProps {
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function NavigationButtons({
  canGoBack,
  canGoNext,
  isLastStep,
  onBack,
  onNext,
}: NavigationButtonsProps) {
  return (
    <div className="v12-nav-buttons">
      <button
        type="button"
        className="v12-btn v12-btn-outline"
        onClick={onBack}
        disabled={!canGoBack}
        aria-label="Go back to previous question"
      >
        ← Back
      </button>

      <button
        type="button"
        className="v12-btn v12-btn-primary"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label={isLastStep ? "Get my recommendation" : "Go to next question"}
      >
        {isLastStep ? "Get My Recommendation →" : "Next →"}
      </button>
    </div>
  );
}
