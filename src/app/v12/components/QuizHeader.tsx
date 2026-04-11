import ProgressBar from "./ProgressBar";

interface QuizHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function QuizHeader({ currentStep, totalSteps }: QuizHeaderProps) {
  return (
    <header className="v12-header">
      <div className="v12-hero-shell">
        <p className="v12-header-badge">V12 - SERVICE FINDER</p>
        <h1 className="v12-hero-title">Find Your Perfect Service</h1>
        <p className="v12-hero-subtitle">
          Answer 5 quick questions and we&apos;ll recommend the best service for your needs.
        </p>
        <div className="v12-step-caption">Step {currentStep} of {totalSteps}</div>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
    </header>
  );
}
