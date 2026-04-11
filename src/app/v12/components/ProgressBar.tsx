interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const boundedStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const progress = (boundedStep / totalSteps) * 100;

  return (
    <div className="v12-progress-wrap" aria-label={`Progress: step ${boundedStep} of ${totalSteps}`}>
      <div className="v12-progress-dots" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const stateClass =
            step < boundedStep ? "is-complete" : step === boundedStep ? "is-current" : "is-upcoming";

          return <span key={step} className={`v12-progress-dot ${stateClass}`} />;
        })}
      </div>

      <div className="v12-progress-track">
        <div className="v12-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
